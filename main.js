/* KIES 2026 — v2 open-canvas constellation (vanilla JS)
   Scroll zooms INTO each panel + its questions, then dollies out and flies to the next.
   An Overview toggle zooms all the way out to see every panel at a glance. */
(function () {
  "use strict";
  var SESSIONS = window.SESSIONS, ART = window.ART;
  var N = SESSIONS.length;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia("(hover: none)").matches;

  /* node positions on one large shared canvas (px). Scattered, non-overlapping,
     generally descending so scrolling travels down through them. Array order = scroll path. */
  var NODES = [
    { x: 700,  y: 420 },  { x: 1450, y: 720 },  { x: 820,  y: 1120 },
    { x: 1550, y: 1420 }, { x: 720,  y: 1820 }, { x: 1480, y: 2120 },
    { x: 760,  y: 2520 }, { x: 1520, y: 2820 }, { x: 820,  y: 3220 },
    { x: 1420, y: 3520 }
  ];

  /* assign one artwork per question, rotating within each tradition (unchanged art set) */
  var counters = { Indian: 0, Vietnamese: 0, Filipino: 0, Thai: 0 };
  var usedImages = [];
  SESSIONS.forEach(function (s) {
    s.questions.forEach(function (q) {
      var pool = ART[q.artTradition];
      var img = pool[counters[q.artTradition] % pool.length];
      counters[q.artTradition]++;
      q._img = img;
      if (usedImages.indexOf(img) === -1) usedImages.push(img);
      q._alt = q.artTradition + " traditional artwork — " + img.title + ". Illustrating a discussion question from “" + s.title + ".”";
    });
  });

  var stage = document.getElementById("stage");
  var stageFixed = document.getElementById("stage-fixed");
  var spacer = document.getElementById("scroll-spacer");
  var body = document.body;
  var groups = [];            // per session: { el, node, cards, half }
  var badgeByQ = {};          // questionId -> [badge elements] for live vote updates

  /* scattered card offsets (varied radius + angle, cleared from the node card so they read when zoomed) */
  function scatter(k) {
    var out = [], GA = 2.399963; // golden angle
    for (var i = 0; i < k; i++) {
      var ang = i * GA + ((i * 53) % 17) / 17 * 0.5;
      var rad = 176 + (i % 3) * 30 + ((i * 29) % 46);
      out.push({ x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, phase: (i * 1.7) % (Math.PI * 2) });
    }
    return out;
  }

  /* ---- build DOM ---- */
  SESSIONS.forEach(function (s, si) {
    var g = document.createElement("div");
    g.className = "node-group";
    g.style.left = NODES[si].x + "px";
    g.style.top = NODES[si].y + "px";

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "conn");
    g.appendChild(svg);

    var node = document.createElement("div");
    node.className = "node";
    node.innerHTML =
      '<div class="glass">' +
      '<div class="sess-meta">' + s.time + '</div>' +
      '<div class="sess-title">' + s.title + '</div>' +
      '<div class="zoomhint"><span class="ring">+</span> ' + s.questions.length + ' questions · tap one</div>' +
      '</div>';
    node.addEventListener("click", function (e) { e.stopPropagation(); focusNode(si); });
    g.appendChild(node);

    var positions = scatter(s.questions.length);
    var cards = [];
    s.questions.forEach(function (q, qi) {
      var card = document.createElement("div");
      card.className = "card";
      card.style.backgroundImage = "url('" + q._img.url + "')";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", q._alt + " Tap to read and upvote the question.");

      card.innerHTML = '<div class="cap">' + q.artTradition + '</div>';
      var badge = document.createElement("span");
      badge.className = "votes";
      badge.innerHTML = '<span class="tri">▲</span><span class="n">0</span>';
      card.appendChild(badge);
      (badgeByQ[q.id] = badgeByQ[q.id] || []).push(badge);

      var p = positions[qi];
      var line = document.createElementNS(svgNS, "line");
      svg.appendChild(line);

      var obj = { el: card, line: line, bx: p.x, by: p.y, phase: p.phase,
        amp: reduce ? 0 : (4 + (qi % 3) * 2), speed: 0.00015 + (qi % 4) * 0.00004,
        px: p.x, py: p.y, q: q };
      cards.push(obj);

      function highlight(on) {
        body.classList.toggle("linking", on);
        card.classList.toggle("linked", on);
        line.classList.toggle("bright", on);
      }
      card.addEventListener("mouseenter", function () { if (!touch) highlight(true); });
      card.addEventListener("mouseleave", function () { if (!touch) highlight(false); });
      var moved = false;
      card.addEventListener("touchstart", function () { moved = false; highlight(true); }, { passive: true });
      card.addEventListener("touchmove", function () { moved = true; }, { passive: true });
      card.addEventListener("touchend", function (e) {
        if (!moved) { e.preventDefault(); openModal(q, s); }
        setTimeout(function () { highlight(false); }, 140);
      });
      card.addEventListener("click", function (e) { e.stopPropagation(); if (!touch) openModal(q, s); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(q, s); } });

      card.style.transform = "translate(" + p.x + "px," + p.y + "px)";
      g.appendChild(card);
    });

    stage.appendChild(g);
    groups.push({ el: g, node: node, cards: cards, half: 320 });
  });

  /* ---- layout / sizing ---- */
  var STEP, HERO, FOCUS, FLY, OV = { x: 0, y: 0, scale: 0.3 };
  var PANEL = 600;  // approx panel diameter in canvas px (2*maxRadius + card)
  function measure() {
    HERO = window.innerHeight;
    STEP = Math.max(560, window.innerHeight * 1.05);   // scroll distance per panel (room to dwell)
    spacer.style.height = ((N - 1) * STEP + window.innerHeight) + "px";
    var vw = window.innerWidth, vh = window.innerHeight, minv = Math.min(vw, vh);
    FOCUS = Math.min(1.7, 0.92 * minv / PANEL);         // zoomed in on one panel + its cards
    FLY = FOCUS * 0.42;                                 // zoomed out while flying between panels
    // overview: fit the whole constellation
    var minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
    NODES.forEach(function (n) { minx = Math.min(minx, n.x); maxx = Math.max(maxx, n.x); miny = Math.min(miny, n.y); maxy = Math.max(maxy, n.y); });
    var pad = 360;
    OV.x = (minx + maxx) / 2; OV.y = (miny + maxy) / 2;
    OV.scale = Math.min((vw - 60) / (maxx - minx + pad), (vh - 60) / (maxy - miny + pad));
    groups.forEach(function (g) { g.half = g.el.offsetWidth / 2; });
  }

  /* ---- camera ---- */
  var camX = NODES[0].x, camY = NODES[0].y, scale = 0.8, overview = false;

  function scrollProgress() {
    var y = window.scrollY || window.pageYOffset;
    return Math.min(N - 1, Math.max(0, (y - HERO) / STEP));
  }
  function targetCamera() {
    if (overview) return { x: OV.x, y: OV.y, scale: OV.scale };
    var p = scrollProgress(), i = Math.floor(p), f = p - i, j = Math.min(N - 1, i + 1);
    var d = Math.abs(p - Math.round(p));                // 0 = parked on a panel, 0.5 = between
    var s = FOCUS + (FLY - FOCUS) * Math.sin(Math.PI * d);
    return { x: NODES[i].x + (NODES[j].x - NODES[i].x) * f, y: NODES[i].y + (NODES[j].y - NODES[i].y) * f, scale: s };
  }
  function activeIndex() { return Math.round(scrollProgress()); }

  /* ---- render loop ---- */
  function frame(t) {
    var tc = targetCamera();
    var k = reduce ? 1 : 0.11;
    camX += (tc.x - camX) * k; camY += (tc.y - camY) * k;
    scale += (tc.scale - scale) * (reduce ? 1 : 0.11);

    var vw = window.innerWidth, vh = window.innerHeight;
    var offx = vw / 2 - camX * scale, offy = vh / 2 - camY * scale;
    stage.style.transform = "translate(" + offx.toFixed(1) + "px," + offy.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";

    var active = activeIndex();
    var p = scrollProgress();
    var focusAmt = overview ? 0 : (1 - Math.sin(Math.PI * Math.abs(p - Math.round(p)))); // 1 parked, 0 flying
    for (var gi = 0; gi < groups.length; gi++) {
      var g = groups[gi];
      var fan = (gi === active && !overview) ? (1 + focusAmt * 0.28) : 1;
      var half = g.half;
      for (var ci = 0; ci < g.cards.length; ci++) {
        var c = g.cards[ci];
        var dx = c.amp ? Math.sin(t * c.speed + c.phase) * c.amp : 0;
        var dy = c.amp ? Math.cos(t * c.speed * 0.92 + c.phase) * c.amp : 0;
        c.px = c.bx * fan + dx; c.py = c.by * fan + dy;
        c.el.style.transform = "translate(" + c.px.toFixed(1) + "px," + c.py.toFixed(1) + "px)";
        c.line.setAttribute("x1", half); c.line.setAttribute("y1", half);
        c.line.setAttribute("x2", half + c.px); c.line.setAttribute("y2", half + c.py);
      }
    }
    if (dots.length) dots.forEach(function (b, i) { b.classList.toggle("active", i === active); });
    requestAnimationFrame(frame);
  }

  /* ---- scroll chrome ---- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    stageFixed.classList.toggle("on", y > HERO * 0.32);
    body.classList.toggle("past-hero", y > HERO * 0.5);
    var hp = Math.min(1, y / (HERO * 0.7));
    hero.style.opacity = (1 - hp).toFixed(3);
    hero.style.transform = "translateY(" + (-y * 0.14).toFixed(0) + "px)";
    if (overview && Math.abs(y - overviewScrollY) > 40) setOverview(false); // any scroll returns to focused travel
  }

  /* ---- overview toggle ---- */
  var overviewScrollY = 0;
  var ovBtn = document.getElementById("overview"), ovLabel = document.getElementById("overview-label");
  function setOverview(on) {
    overview = on;
    body.classList.toggle("overview", on);
    ovLabel.textContent = on ? "Back to tour" : "Overview";
    overviewScrollY = window.scrollY || window.pageYOffset;
  }
  ovBtn.addEventListener("click", function () { setOverview(!overview); });
  function focusNode(i) {
    setOverview(false);
    window.scrollTo({ top: HERO + i * STEP, behavior: reduce ? "auto" : "smooth" });
  }
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (modal.classList.contains("open")) closeModal(); else if (overview) setOverview(false); }
  });

  /* ---- modal + voting ---- */
  var modal = document.getElementById("modal");
  var mImg = document.getElementById("m-img"), mSess = document.getElementById("m-sess"), mQ = document.getElementById("m-q");
  var mCredit = document.getElementById("m-credit"), mVote = document.getElementById("m-vote");
  var mVoteCount = document.getElementById("m-vote-count"), mVoteLabel = document.getElementById("m-vote-label");
  var currentQ = null;

  function renderVoteButton() {
    if (!currentQ) return;
    var n = window.KIESVotes.getCount(currentQ.id);
    var voted = window.KIESVotes.isVoted(currentQ.id);
    mVoteCount.textContent = n;
    mVote.classList.toggle("voted", voted);
    mVoteLabel.textContent = voted ? "Upvoted" : "Upvote this question";
    mVote.setAttribute("aria-pressed", voted ? "true" : "false");
  }
  mVote.addEventListener("click", function () {
    if (!currentQ || window.KIESVotes.isVoted(currentQ.id)) return;
    window.KIESVotes.castVote(currentQ.id).then(renderVoteButton);
    renderVoteButton();
  });

  function openModal(q, s) {
    currentQ = q;
    mImg.style.backgroundImage = "url('" + q._img.url + "')";
    mImg.setAttribute("aria-label", q._alt);
    mSess.textContent = s.title + "  ·  " + s.time;
    mQ.textContent = q.text;
    mCredit.innerHTML = "<b>" + q._img.title + "</b><br/>" + q._img.artist + " · " + q.artTradition +
      " tradition · " + q._img.license + ' · <a href="' + q._img.page + '" target="_blank" rel="noopener">Source</a>';
    renderVoteButton();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() { modal.classList.remove("open"); currentQ = null; document.body.style.overflow = ""; }
  modal.querySelectorAll("[data-close]").forEach(function (el) { el.addEventListener("click", closeModal); });
  var sheet = modal.querySelector(".sheet"), sy = 0, dragging = false;
  sheet.addEventListener("touchstart", function (e) { sy = e.touches[0].clientY; dragging = true; }, { passive: true });
  sheet.addEventListener("touchmove", function (e) { if (dragging) { var d = e.touches[0].clientY - sy; if (d > 0) sheet.style.transform = "translateY(" + d + "px)"; } }, { passive: true });
  sheet.addEventListener("touchend", function (e) { dragging = false; var d = e.changedTouches[0].clientY - sy; sheet.style.transform = ""; if (d > 90) closeModal(); });

  function updateBadge(qid) {
    var els = badgeByQ[qid]; if (!els) return;
    var n = window.KIESVotes.getCount(qid), has = n > 0;
    els.forEach(function (b) { b.querySelector(".n").textContent = n; b.classList.toggle("has", has); });
    if (currentQ && currentQ.id === qid) renderVoteButton();
  }

  /* ---- progress dots ---- */
  var progress = document.getElementById("progress"), dots = [];
  SESSIONS.forEach(function (s, i) {
    var b = document.createElement("button");
    b.setAttribute("aria-label", "Go to session " + (i + 1) + ": " + s.title);
    b.addEventListener("click", function () { focusNode(i); });
    progress.appendChild(b); dots.push(b);
  });

  /* ---- motif fragments ---- */
  var motifs = document.getElementById("motifs");
  var mset = [ART.Indian[0], ART.Thai[0], ART.Filipino[1], ART.Vietnamese[3], ART.Indian[5], ART.Thai[8]];
  var placements = [[8,14,150,190],[78,10,130,165],[70,66,175,150],[12,62,140,178],[42,30,120,150],[30,74,150,130]];
  mset.forEach(function (img, i) {
    var f = document.createElement("div"); f.className = "frag"; var p = placements[i];
    f.style.left = p[0] + "vw"; f.style.top = p[1] + "vh"; f.style.width = p[2] + "px"; f.style.height = p[3] + "px";
    f.style.backgroundImage = "url('" + img.url + "')"; f.style.transform = "rotate(" + (i % 2 ? -4 : 5) + "deg)";
    motifs.appendChild(f);
  });

  /* ---- credits ---- */
  var totalQ = 0; SESSIONS.forEach(function (s) { totalQ += s.questions.length; });
  document.getElementById("credits-note").innerHTML =
    "<b>Artwork &amp; licensing.</b> Every image is openly-licensed traditional art of the Filipino, Vietnamese, " +
    "Indian, and Thai traditions (Wikimedia Commons / museum open access; Public domain / CC0 / CC BY), bundled " +
    "locally. Full title, artist, license and source accompany each work in its detail view. " + usedImages.length +
    " works illustrate " + totalQ + " discussion questions across " + N + " sessions.";

  /* ---- boot ---- */
  var hero = document.getElementById("hero");
  measure();
  window.addEventListener("resize", function () { measure(); onScroll(); });
  window.addEventListener("scroll", onScroll, { passive: true });

  function gotoHash() {
    var m = /s=(\d+)/.exec(location.hash);
    if (m) {
      var i = Math.min(N, Math.max(1, parseInt(m[1], 10))) - 1;
      camX = NODES[i].x; camY = NODES[i].y; scale = FOCUS;
      body.classList.add("past-hero"); stageFixed.classList.add("on");
      window.scrollTo({ top: HERO + i * STEP, behavior: "auto" });
    }
  }
  window.addEventListener("hashchange", gotoHash);

  window.KIESVotes.onChange(updateBadge);
  window.KIESVotes.init().then(function () { Object.keys(badgeByQ).forEach(updateBadge); });

  gotoHash();
  onScroll();
  requestAnimationFrame(frame);
  setTimeout(function () { body.classList.add("split"); }, reduce ? 0 : 450);
})();
