/*
 * KIES 2026 — voting module
 * One public surface: window.KIESVotes = { init, castVote, getCount, isVoted, onChange }.
 * Backed by Supabase when configured (shared, live across all attendees via Realtime);
 * falls back to a local per-device tally otherwise so the UI always works.
 */
(function () {
  "use strict";
  var TABLE = "question_votes";
  var LS_DEVICE = "kies_device_id";
  var LS_VOTED = "kies_voted_v1";
  var LS_LOCAL_TALLY = "kies_local_tally_v1";

  // --- anonymous device id (no login) ---
  function deviceId() {
    var id = localStorage.getItem(LS_DEVICE);
    if (!id) {
      id = (crypto && crypto.randomUUID) ? crypto.randomUUID()
        : "dev-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(LS_DEVICE, id);
    }
    return id;
  }
  var DEVICE = deviceId();

  // --- local persistence of what THIS device voted for (instant UI, dedupe) ---
  function votedSet() { try { return new Set(JSON.parse(localStorage.getItem(LS_VOTED) || "[]")); } catch (e) { return new Set(); } }
  function saveVoted(set) { localStorage.setItem(LS_VOTED, JSON.stringify([].concat.apply([], [Array.from(set)]))); }
  var voted = votedSet();

  // --- fallback local tally (used only when Supabase is not configured) ---
  function localTally() { try { return JSON.parse(localStorage.getItem(LS_LOCAL_TALLY) || "{}"); } catch (e) { return {}; } }
  function saveLocalTally(t) { localStorage.setItem(LS_LOCAL_TALLY, JSON.stringify(t)); }

  var counts = {};              // questionId -> number
  var listeners = [];           // fn(questionId, count)
  var client = null;            // supabase client or null (fallback)

  function emit(qid) { listeners.forEach(function (fn) { try { fn(qid, counts[qid] || 0); } catch (e) {} }); }

  function seedFromSessions() {
    // start every known question at 0 (seed values in sessions.js are placeholders)
    if (window.SESSIONS) window.SESSIONS.forEach(function (s) {
      s.questions.forEach(function (q) { if (counts[q.id] == null) counts[q.id] = 0; });
    });
  }

  var API = {
    mode: "local",
    deviceId: DEVICE,

    init: function () {
      seedFromSessions();
      var url = window.SUPABASE_URL, key = window.SUPABASE_ANON_KEY;
      var ok = url && key && window.supabase && typeof window.supabase.createClient === "function";
      if (!ok) {
        // fallback: read persisted local tally
        var t = localTally();
        Object.keys(t).forEach(function (k) { counts[k] = t[k]; });
        API.mode = "local";
        Object.keys(counts).forEach(emit);
        return Promise.resolve("local");
      }
      client = window.supabase.createClient(url, key, { realtime: { params: { eventsPerSecond: 5 } } });
      API.mode = "supabase";
      return refreshCounts().then(subscribe).then(function () { return "supabase"; })
        .catch(function (e) { console.warn("Supabase voting unavailable, using local tally:", e); API.mode = "local"; client = null; return "local"; });
    },

    getCount: function (qid) { return counts[qid] || 0; },
    isVoted: function (qid) { return voted.has(qid); },
    onChange: function (fn) { listeners.push(fn); },

    // single entry point referenced by the UI
    castVote: function (qid) {
      if (voted.has(qid)) return Promise.resolve(false);
      // optimistic: mark voted + bump locally so it feels instant
      voted.add(qid); saveVoted(voted);
      counts[qid] = (counts[qid] || 0) + 1; emit(qid);

      if (client) {
        return client.from(TABLE).insert({ question_id: qid, device_id: DEVICE })
          .then(function (res) {
            if (res.error && res.error.code !== "23505") { // 23505 = unique violation = already counted, fine
              console.warn("vote insert error:", res.error);
            }
            return true;
          })
          .catch(function (e) { console.warn("vote failed:", e); return true; });
      }
      // fallback tally persistence
      var t = localTally(); t[qid] = (t[qid] || 0) + 1; saveLocalTally(t);
      return Promise.resolve(true);
    }
  };

  function refreshCounts() {
    // prefer the aggregate view; fall back to reading rows if the view is absent
    return client.from("question_vote_counts").select("question_id,votes")
      .then(function (res) {
        if (res.error) throw res.error;
        (res.data || []).forEach(function (r) { counts[r.question_id] = r.votes; });
        Object.keys(counts).forEach(emit);
      })
      .catch(function () {
        return client.from(TABLE).select("question_id").then(function (res) {
          if (res.error) throw res.error;
          var agg = {}; (res.data || []).forEach(function (r) { agg[r.question_id] = (agg[r.question_id] || 0) + 1; });
          Object.keys(agg).forEach(function (k) { counts[k] = agg[k]; });
          Object.keys(counts).forEach(emit);
        });
      });
  }

  function subscribe() {
    if (!client) return;
    client.channel("question_votes_stream")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: TABLE }, function (payload) {
        var qid = payload.new && payload.new.question_id;
        if (!qid) return;
        // another device voted — increment. (Our own optimistic bump already happened;
        // to avoid double counting our own insert, ignore inserts from this device.)
        if (payload.new.device_id === DEVICE) return;
        counts[qid] = (counts[qid] || 0) + 1; emit(qid);
      })
      .subscribe();
  }

  window.KIESVotes = API;
})();
