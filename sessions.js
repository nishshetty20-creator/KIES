/*
 * KIES 2026 — data model (v2)
 * Content sourced from KIES_2026_Big_Questions_Discussion_Guide.md.
 * v2: no elevated mainQuestion — every discussion question is an equal peer (one orbiting card).
 * Core and contrarian questions are deliberately MIXED with no distinction (see brief §4).
 * "upvotes" is only a seed/fallback; live counts come from Supabase (see votes.js).
 *
 * ART pools: real, openly-licensed traditional artworks (Wikimedia Commons / museum open access),
 * downloaded and downscaled locally. title/artist/license/source recorded per work.
 */

window.ART = {
  "Indian": [
    {
      "url": "assets/art_100.jpg",
      "title": "Bhairavi Ragini, Manley Ragamala",
      "artist": "Unknown (Mughal, c.1610)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Bhairavi_Ragini,_Manley_Ragamala,_an_album_painting_in_gouache_on_paper.jpg"
    },
    {
      "url": "assets/art_101.jpg",
      "title": "Asavari Ragini",
      "artist": "Unknown (c.1750, Honolulu Museum of Art)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Asavari_Ragini,_1750,_watercolor_on_paper,_Honolulu_Museum_of_Art_.JPG"
    },
    {
      "url": "assets/art_02.jpg",
      "title": "Kama and Rati Witness the Reunion of Krishna and Radha (Gita Govinda)",
      "artist": "Unknown (Brooklyn Museum)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_Kama_and_Rati_Witness_the_Reunion_of_Krishna_and_Radha_Page_from_a_Gita_Govinda_Series.jpg"
    },
    {
      "url": "assets/art_03.jpg",
      "title": "A Lady Gazing at Doves",
      "artist": "Unknown (Metropolitan Museum of Art)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Anonymous_-_A_Lady_Gazing_at_Doves_-_1986.501.1_-_Metropolitan_Museum_of_Art.jpg"
    },
    {
      "url": "assets/art_04.jpg",
      "title": "Arjuna and His Charioteer Krishna Confront Karna",
      "artist": "Unknown (Himachal Pradesh)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Arjuna_and_His_Charioteer_Krishna_Confront_Karna.jpg"
    },
    {
      "url": "assets/art_05.jpg",
      "title": "Alhaiya Raga, Ragamala",
      "artist": "Unknown (c.1720)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Alhaiya_raga,_Ragamala,_c1720.jpg"
    },
    {
      "url": "assets/art_06.jpg",
      "title": "A Hero Approaches a Heroine (Rasamanjari)",
      "artist": "Unknown (Arthur M. Sackler Museum)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Anonymous_-_A_Hero_Approaches_a_Heroine_and_Her_Attendant,_Folio_from_a_Rasamajari_(%E2%80%9CA_Bouquet_of_Delights%E2%80%9D)_Series_-_1992.6_-_Arthur_M._Sackler_Museum.jpg"
    },
    {
      "url": "assets/art_07.jpg",
      "title": "Brahma on Hamsa, Pahari school",
      "artist": "Unknown (Mankot, c.1720)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:1720_CE_Brahma_on_hamsa,_Pahari_school_of_chitra,_Mankot_Himachal_Pradesh.jpg"
    },
    {
      "url": "assets/art_08.jpg",
      "title": "Arjuna Chooses Krishna",
      "artist": "Unknown (Himachal Pradesh)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Arjuna_chooses_Krishna.jpg"
    },
    {
      "url": "assets/art_102.jpg",
      "title": "Vishnu as Varaha, the Boar Avatar",
      "artist": "Unknown (Metropolitan Museum of Art)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Anonymous_-_Vishnu_as_Varaha,_the_Boar_Avatar,_Slays_Banasur,_A_Demon_General,_Page_from_an_Unknown_Manuscript_-_1974.221_-_Metropolitan_Museum_of_Art.jpg"
    }
  ],
  "Vietnamese": [
    {
      "url": "assets/art_103.jpg",
      "title": "The Mice's Wedding (Đông Hồ folk print)",
      "artist": "Vietnam National Museum of Fine Arts",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Mice%27s_wedding,_Dong_Ho_picture,_paper_-_Vietnam_National_Museum_of_Fine_Arts_-_Hanoi,_Vietnam_-_DSC05290.JPG"
    },
    {
      "url": "assets/art_104.jpg",
      "title": "Phù Đổng Thiên Vương (Đông Hồ folk print)",
      "artist": "Traditional Đông Hồ artisan",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Tranh_%C4%90%C3%B4ng_H%E1%BB%93_v%E1%BA%BD_Ph%C3%B9_%C4%90%E1%BB%95ng_Thi%C3%AAn_V%C6%B0%C6%A1ng.jpg"
    },
    {
      "url": "assets/art_12.jpg",
      "title": "Lady Triệu on an Elephant (Đông Hồ folk print)",
      "artist": "Traditional Đông Hồ artisan",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Ba_trieu_cuoi_voi.jpg"
    },
    {
      "url": "assets/art_105.jpg",
      "title": "Five Tigers (Hàng Trống painting)",
      "artist": "Vietnam National Museum of Fine Arts",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Five_tigers,_Hang_Trong_painting,_Hanoi,_paper,_view_1_-_Vietnam_National_Museum_of_Fine_Arts_-_Hanoi,_Vietnam_-_DSC05281.JPG"
    },
    {
      "url": "assets/art_14.jpg",
      "title": "White Tiger (Hàng Trống painting)",
      "artist": "Traditional Hàng Trống artisan",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:White_tiger_Hang_Trong.jpg"
    },
    {
      "url": "assets/art_15.jpg",
      "title": "Tứ Bình (four-panel folk painting)",
      "artist": "Traditional Vietnamese artisan",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Tu_binh.JPG"
    },
    {
      "url": "assets/art_16.jpg",
      "title": "Vietnamese folk painting",
      "artist": "Traditional Vietnamese artisan",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Vietpic1.jpg"
    },
    {
      "url": "assets/art_17.jpg",
      "title": "Vietnamese folk painting",
      "artist": "Traditional Vietnamese artisan",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Vietpic2.jpg"
    },
    {
      "url": "assets/art_18.jpg",
      "title": "Vietnamese folk painting",
      "artist": "Traditional Vietnamese artisan",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Vietpic3.jpg"
    },
    {
      "url": "assets/art_19.jpg",
      "title": "Court scene at Huế (silk painting)",
      "artist": "Nguyễn-dynasty court painters",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Tranh_l%E1%BB%A5a_v%E1%BA%BD_quang_c%E1%BA%A3nh_tri%E1%BB%81u_%C4%91%C3%ACnh_Hu%E1%BA%BF.jpg"
    }
  ],
  "Filipino": [
    {
      "url": "assets/art_106.jpg",
      "title": "Las Damas Romanas",
      "artist": "Juan Luna (1882)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Luna_damas-romanas.jpg"
    },
    {
      "url": "assets/art_21.jpg",
      "title": "Bay of Biscay",
      "artist": "Juan Luna",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Bay_of_Biscay_by_Juan_Luna.jpg"
    },
    {
      "url": "assets/art_22.jpg",
      "title": "Chula",
      "artist": "Juan Luna",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Chula_by_Juan_Luna.jpg"
    },
    {
      "url": "assets/art_23.jpg",
      "title": "En el Balcón",
      "artist": "Juan Luna",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:En_el_Balcon_by_Juan_Luna.jpg"
    },
    {
      "url": "assets/art_24.jpg",
      "title": "Después del Baile",
      "artist": "Juan Luna",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Despues_del_Baile_by_Juan_Luna.jpg"
    },
    {
      "url": "assets/art_25.jpg",
      "title": "El Violinista",
      "artist": "Juan Luna (Lopez Museum)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:El_Violinista_by_Juan_Luna_Lopez_Museum_and_Library.jpg"
    },
    {
      "url": "assets/art_26.jpg",
      "title": "A Lady in the Moonlight",
      "artist": "Félix Resurrección Hidalgo",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:A_lady_in_the_moonlight_F%C3%A9lix_Resurrecci%C3%B3n_Hidalgo.jpg"
    },
    {
      "url": "assets/art_107.jpg",
      "title": "After the Typhoon",
      "artist": "Félix Resurrección Hidalgo",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:After_the_Typhoon_by_F%C3%A9lix_Resurrecci%C3%B3n_Hidalgo.jpg"
    },
    {
      "url": "assets/art_28.jpg",
      "title": "Seascape",
      "artist": "Félix Resurrección Hidalgo",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Resurreccion_Hidalgo_y_Padilla_(1857-1915)_-_Seascape_-_334_-_Blackburn_Museum_and_Art_Gallery.jpg"
    },
    {
      "url": "assets/art_29.jpg",
      "title": "Still Life (Flowers in a Vase)",
      "artist": "Félix Resurrección Hidalgo",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Resurreccion_Hidalgo_y_Padilla_(1857-1915)_-_Still_Life_(Flowers_in_a_Vase)_-_335_-_Blackburn_Museum_and_Art_Gallery.jpg"
    }
  ],
  "Thai": [
    {
      "url": "assets/art_108.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_06.jpg"
    },
    {
      "url": "assets/art_109.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_04.jpg"
    },
    {
      "url": "assets/art_110.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_13.jpg"
    },
    {
      "url": "assets/art_111.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_07.jpg"
    },
    {
      "url": "assets/art_112.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_09.jpg"
    },
    {
      "url": "assets/art_113.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_15.jpg"
    },
    {
      "url": "assets/art_114.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_01.jpg"
    },
    {
      "url": "assets/art_115.jpg",
      "title": "Ramakien mural",
      "artist": "Wat Phra Kaew, Bangkok (photo: Prof Ranga Sai)",
      "license": "CC0",
      "page": "https://commons.wikimedia.org/wiki/File:Ramakien_00.jpg"
    },
    {
      "url": "assets/art_38.png",
      "title": "The Construction of Ayutthaya",
      "artist": "Nai Im (1887)",
      "license": "Public domain",
      "page": "https://commons.wikimedia.org/wiki/File:Construction_of_Ayutthaya_Painting_by_Nai_Im_1887.png"
    },
    {
      "url": "assets/art_116.jpg",
      "title": "Ramakien mural, detail (Wat Phra Kaew)",
      "artist": "Photo: Jorge Láscar",
      "license": "CC BY 2.0",
      "page": "https://commons.wikimedia.org/wiki/File:Lascar_Detail_of_one_of_the_Ramakien_murals_-_Wat_Phra_Kaew_(4509758126).jpg"
    }
  ]
};

window.SESSIONS = [
  {
    id: "human-flourishing", order: 1, day: 1, time: "Day 1 · 09:15", speaker: "Speaker to be announced",
    title: "Keynote: The Case for Human Flourishing",
    questions: [
      { id: "human-flourishing-q0", text: "What does an AI industrial revolution mean at a societal level, and how can our systems best prepare for this transition?", artTradition: "Filipino", upvotes: 0 },
      { id: "hf-1", text: "In an age of intelligent machines, which human capabilities become more valuable, not less?", artTradition: "Filipino", upvotes: 0 },
      { id: "hf-2", text: "Is the climate's impact on learning and societies being overshadowed by the overwhelming wave of AI?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "hf-3", text: "Every tech wave came with the same plea to put humans first, and the market mostly ignored it while living standards still rose. Why should this time be any different?", artTradition: "Indian", upvotes: 0 },
      { id: "hf-4", text: "Foundations poured billions into human-centered education reform and moved the needle a little; tech companies changed how a billion people learn, for free, chasing profit. Should we admit the market is the better tool here?", artTradition: "Thai", upvotes: 0 },
      { id: "hf-5", text: "If AI ends up doing most thinking work better than we do, is keeping humans at the center honest, or is it denial?", artTradition: "Filipino", upvotes: 0 },
    ]
  },
  {
    id: "jobs", order: 2, day: 1, time: "Day 1 · 10:30", speaker: "Speaker to be announced",
    title: "Jobs: What Changes, Stays the Same, Gets Eliminated?",
    questions: [
      { id: "jobs-q0", text: "We keep calling healthcare and hospitality hard to automate. Is that real analysis or wishful thinking, and what is already getting eaten faster than we admit?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "jb-1", text: "Nurses and hospitality workers from India and the Philippines increasingly staff aging economies abroad. Is that mobility for them, or a brain drain we dress up as opportunity?", artTradition: "Filipino", upvotes: 0 },
      { id: "jb-2", text: "Care and green work keep getting called the future while staying low-paid and low-status. How do we make this work more appealing?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "jb-3", text: "Walk us through a training-to-placement pipeline that genuinely scales in these sectors. Where does it usually break: money, curriculum, employers, or regulation?", artTradition: "Thai", upvotes: 0 },
      { id: "jb-4", text: "Is “hard to automate” just a nice way of saying not worth automating yet? What happens when a robot costs less than a wage in Manila or Chennai?", artTradition: "Indian", upvotes: 0 },
      { id: "jb-5", text: "Are we romanticizing care work? A lot of it is backbreaking, badly paid, and churns through people.", artTradition: "Vietnamese", upvotes: 0 },
      { id: "jb-6", text: "Rich aging countries want Asian care workers but will not pay them citizen wages or give them full rights. Is this care-mobility pipeline real opportunity, or well-organized labor extraction we keep applauding?", artTradition: "Filipino", upvotes: 0 },
    ]
  },
  {
    id: "working-women", order: 3, day: 1, time: "Day 1 · 11:45", speaker: "Speaker to be announced",
    title: "Is AI Enabling or Deterring Working Women?",
    questions: [
      { id: "working-women-q0", text: "Play out the optimistic case: AI makes work flexible, remote, and skills-based. What would have to be true for that to genuinely open things up for women?", artTradition: "Indian", upvotes: 0 },
      { id: "ww-1", text: "The industrial era pulled women into work on unequal terms. What did that teach us that we are about to repeat in the AI era if we are not careful?", artTradition: "Indian", upvotes: 0 },
      { id: "ww-2", text: "What if AI automates exactly the roles women are concentrated in — admin, services, entry-level knowledge work? What is the early evidence telling us?", artTradition: "Thai", upvotes: 0 },
      { id: "ww-3", text: "In parts of ASEAN, women work at rates that shame rich countries, yet barely reach the top. What explains the gap between working and leading?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "ww-4", text: "You are a policy maker with one budget line and five years. What do you fund to get women into AI-era leadership, and what do you stop funding tomorrow?", artTradition: "Filipino", upvotes: 0 },
      { id: "ww-5", text: "As AI tools make jobs more accessible, remote, and non-technical, how does that actual change in mechanism speed up the movement of women into productive jobs?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "ww-6", text: "Do women-only programs sometimes backfire, labeling women as a group that needs help rather than talent to compete? Would plain gender-blind, outcomes-based hiring do more?", artTradition: "Indian", upvotes: 0 },
    ]
  },
  {
    id: "ai-transformation", order: 4, day: 1, time: "Day 1 · 14:00", speaker: "Speaker to be announced",
    title: "How to Lead an AI Transformation",
    questions: [
      { id: "ai-transformation-q0", text: "Most corporate AI training is just tool training. Is that reskilling or box-ticking, and what does the deep version actually cost in money and time?", artTradition: "Thai", upvotes: 0 },
      { id: "at-1", text: "Reskill the people you have, or hire AI-native graduates? When the budget tightens, which one are leaders in this room actually choosing, and why?", artTradition: "Thai", upvotes: 0 },
      { id: "at-2", text: "Which roles inside your organizations have you genuinely redesigned around AI, not just bolted it onto? What did change management teach you the hard way?", artTradition: "Filipino", upvotes: 0 },
      { id: "at-3", text: "How do you actually measure whether a workforce or a graduating class is AI-ready? Is there a credible metric?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "at-4", text: "Is AI readiness mostly a consulting product? Maybe the smart move for universities and employers is to teach fundamentals and deliberately not chase AI curricula that expire before graduation.", artTradition: "Indian", upvotes: 0 },
      { id: "at-5", text: "Is AI shrinking or widening the gap between an average employee and an excellent one?", artTradition: "Thai", upvotes: 0 },
    ]
  },
  {
    id: "talent-equation", order: 5, day: 1, time: "Day 1 · 15:30", speaker: "Speaker to be announced",
    title: "Keynote: The New Talent Equation",
    questions: [
      { id: "talent-equation-q0", text: "If AI can pass most of our tests, what are those tests actually measuring anymore, and what is still worth testing for?", artTradition: "Filipino", upvotes: 0 },
      { id: "te-1", text: "What we measure ends up shaping what we teach. What are today's dominant tests quietly optimizing our schools for?", artTradition: "Filipino", upvotes: 0 },
      { id: "te-2", text: "Which human skills — judgment, communication, adaptability — can we actually measure well at scale? And which are we just pretending to measure?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "te-3", text: "If assessment becomes continuous and baked into work and learning, does the big high-stakes exam die? And what fills the signaling job it used to do?", artTradition: "Indian", upvotes: 0 },
      { id: "te-4", text: "If AI can evaluate someone's real work cheaply and continuously, do we need standardized tests at all? Maybe the future of assessment is no test, just watching what people can do.", artTradition: "Thai", upvotes: 0 },
      { id: "te-5", text: "Has high-stakes testing in Asia done more harm than good — warping childhoods, feeding a shadow tutoring economy, rewarding test-taking over ability? If you built ETS for Asia today, would it look anything like the current model?", artTradition: "Filipino", upvotes: 0 },
    ]
  },
  {
    id: "college-worth", order: 6, day: 2, time: "Day 2 · 09:15", speaker: "Speaker to be announced",
    title: "Is College Still Worth It?",
    questions: [
      { id: "college-worth-q0", text: "In 2030, what matters more to a graduate: the brand on the degree, the portfolio they can show, or the people they know?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "cw-1", text: "Students are stacking up internships and micro-gigs to start careers. Is that a real shift in how work begins, or just a symptom of a broken entry-level market?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "cw-2", text: "Studying abroad is a huge export for Australia and the UK and a huge bet for Asian families. How does AI change the return on that plane ticket?", artTradition: "Thai", upvotes: 0 },
      { id: "cw-3", text: "Alternative credentials have had fifteen years — MOOCs, bootcamps, micro-degrees — and the degree premium in Asia has barely moved. At what point do we admit the disruption thesis just failed?", artTradition: "Indian", upvotes: 0 },
      { id: "cw-4", text: "How does an elite institution stay relevant when its core products — curated content and a stamp of approval — are both getting cheap fast?", artTradition: "Filipino", upvotes: 0 },
      { id: "cw-5", text: "If entry-level jobs are vanishing, is the responsible thing to tell Asian families to skip the pricey degree, or the exact opposite, because in a tighter market the brand filter gets stronger, not weaker?", artTradition: "Indian", upvotes: 0 },
    ]
  },
  {
    id: "economic-mobility", order: 7, day: 2, time: "Day 2 · 10:30", speaker: "Speaker to be announced",
    title: "Economic Mobility: What Role Can Investors Play?",
    questions: [
      { id: "economic-mobility-q0", text: "What makes an outcome fundable? What can you measure cleanly enough that a commercial investor, a DFI, and a government all trust the same number?", artTradition: "Indian", upvotes: 0 },
      { id: "em-1", text: "When does concessional capital genuinely de-risk a deal, and when does it just subsidize a deal that had no business existing?", artTradition: "Thai", upvotes: 0 },
      { id: "em-2", text: "For a fund putting commercial money into education and skilling, is blended finance a core strategy, an occasional tool, or a distraction? How does it compare to straight equity deals?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "em-3", text: "Given the distinct time horizons education and skilling require, do standard equity investments create a structural mismatch? Might private debt better align investor exit realities with the industry's actual timelines?", artTradition: "Indian", upvotes: 0 },
    ]
  },
  {
    id: "soft-skills", order: 8, day: 2, time: "Day 2 · 11:45", speaker: "Speaker to be announced",
    title: "Keynote: Yesterday's Soft Skills Are Today's Hard Skills",
    questions: [
      { id: "soft-skills-q0", text: "Where is the hard proof — in wages, in hiring — that human skills are actually rising in value as AI advances? Where is that evidence strongest in Asia, and where is it thin?", artTradition: "Thai", upvotes: 0 },
      { id: "ss-1", text: "Large parts of Asia still have not cracked basic reading and math. How do we get them to also prioritise essential human skills?", artTradition: "Filipino", upvotes: 0 },
      { id: "ss-2", text: "Is there a risk the soft-skills story lets systems off the hook, cheering adaptability while underinvesting in the deep technical mastery that still pays the bills?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "ss-3", text: "For the investors and founders here, is there a real business in teaching and certifying human skills, or is this a public-goods problem the market will never fund?", artTradition: "Thai", upvotes: 0 },
      { id: "ss-4", text: "AI is getting unnervingly good at communication, simulated empathy, even judgment-like reasoning. What if the soft skills we are betting the future on are automating faster than the technical ones we just wrote off?", artTradition: "Indian", upvotes: 0 },
      { id: "ss-5", text: "Soft skills mostly come from family, class, and social capital. Could putting them at the heart of hiring make the market less fair for poor Asian students, whose one real edge has always been measurable technical mastery?", artTradition: "Filipino", upvotes: 0 },
    ]
  },
  {
    id: "ai-native", order: 9, day: 2, time: "Day 2 · 14:00", speaker: "Speaker to be announced",
    title: "How to Raise AI-Native Thinkers",
    questions: [
      { id: "ai-native-q0", text: "Should schools hold AI back to protect thinking, or push it everywhere to build fluency? Both camps claim they are acting in the child's interest. Who is right?", artTradition: "Filipino", upvotes: 0 },
      { id: "an-1", text: "The goal everyone states is agency — kids who steer the tool instead of surrendering to it. Which classroom or home habits actually build that, and which just build familiarity?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "an-2", text: "The last wave of edtech optimized for engagement and gamification, arguably at the cost of real learning. How do we keep AI learning tools from making the same mistake at a bigger scale?", artTradition: "Thai", upvotes: 0 },
      { id: "an-3", text: "Every generation panics that a new technology is rotting young minds — novels, television, calculators, the internet. What makes the AI worry different, or is this just the same moral panic with a bigger budget?", artTradition: "Indian", upvotes: 0 },
      { id: "an-4", text: "The kids who lead in 2040 might be the ones who offloaded to AI earliest, the way the best engineers stopped doing arithmetic by hand. Is protecting thinking really protecting nostalgia?", artTradition: "Filipino", upvotes: 0 },
    ]
  },
  {
    id: "schools-trust", order: 10, day: 2, time: "Day 2 · 15:30", speaker: "Speaker to be announced",
    title: "How to Build Schools That Parents Trust",
    questions: [
      { id: "schools-trust-q0", text: "The last two decades were about improving access to education. What practical steps can make this decade about improving the quality and relevance of education?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "st-1", text: "What creative financing has actually worked to fund expansion without bending the mission — sale-and-leaseback, revenue-linked deals, minority growth capital?", artTradition: "Thai", upvotes: 0 },
      { id: "st-2", text: "Does a premium education brand travel across ASEAN, or do you have to earn trust from zero in every single market?", artTradition: "Vietnamese", upvotes: 0 },
      { id: "st-3", text: "Tell us about a scaling decision you got wrong — an acquisition, a market, a growth target you should not have chased — and what it taught you about the quality trade-off.", artTradition: "Filipino", upvotes: 0 },
      { id: "st-4", text: "Is quality at scale a contradiction the industry refuses to say out loud? McDonald's scales because it standardizes, but there is only one Stanford.", artTradition: "Indian", upvotes: 0 },
      { id: "st-5", text: "The fastest path to quality at scale may not be schools anymore — it is AI tutoring on top of cheap infrastructure. Are the operators here scaling a model that is about to get leapfrogged?", artTradition: "Thai", upvotes: 0 },
    ]
  }
];
