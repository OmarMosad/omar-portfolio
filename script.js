/* ═══ Omar Shehata — game portfolio engine (vanilla, no deps) ═══ */
'use strict';
const $ = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

/* ─────────── DATA ─────────── */
const PROJECTS = [
  { name: 'Panda Store', type: { en: 'Platform · Telegram Stars Store', ar: 'منصة · متجر نجوم تيليجرام' },
    desc: { en: 'A full e-commerce ecosystem on Telegram: a Stars store, a digital-products store, Mini App, payment verification and voting apps — with OxaPay, Binance Pay, USDT, TON, Vodafone Cash and Stars payments, all running on my own servers.', ar: 'منظومة تجارة كاملة على تيليجرام: متجر نجوم، ومتجر منتجات رقمية، وميني آب، وتحقق من المدفوعات وتطبيقات تصويت — بمدفوعات OxaPay وBinance Pay وUSDT وTON وفودافون كاش والنجوم، وكلها شغالة على سيرفراتي.' },
    tags: ['Node.js', 'PostgreSQL', 'Telegram API', 'TON'], img: 'assets/work-pandastore.webp',
    links: [['Pandastore.store', 'https://Pandastore.store'], ['Product', 'https://Product.Pandastore.store'], ['Mini App', 'https://MiniApp.Pandastore.store']] },
  { name: 'Halfa Antiqe', type: { en: 'Client Website · Clothing Brand', ar: 'موقع عميل · براند ملابس' },
    desc: { en: 'A complete online store for an Egyptian clothing brand — catalogue, offers and a shopping experience tuned for phones.', ar: 'متجر إلكتروني كامل لبراند ملابس مصري — كتالوج وعروض وتجربة شراء متظبطة على الموبايل.' },
    tags: ['E-commerce', 'Web', 'Branding'], img: 'assets/work-halfa.webp',
    links: [['halfaantiqe.com', 'https://halfaantiqe.com']] },
  { name: 'Louver', type: { en: 'Client Website · Brand', ar: 'موقع عميل · براند' },
    desc: { en: 'A brand website with a clean storefront feel and fast, mobile-first pages.', ar: 'موقع براند بواجهة نضيفة وصفحات سريعة مصممة للموبايل أولًا.' },
    tags: ['Web', 'UI'], img: '',
    links: [['Louver.site', 'https://Louver.site']] },
  { name: 'Dr. Mohamed Aboeleneen', type: { en: 'Client Website', ar: 'موقع عميل' },
    desc: { en: 'A personal/professional website for a client — services, content and direct contact, built and deployed end to end.', ar: 'موقع شخصي/مهني لعميل — خدمات ومحتوى وتواصل مباشر، اتبنى واتنشر من الألف للياء.' },
    tags: ['Web', 'Deployment'], img: 'assets/work-dr.webp',
    links: [['Visit', 'https://drmohamedaboeleneen.vercel.app']] },
  { name: 'Lumi & Milo', type: { en: 'Graduation Project · AI Platform', ar: 'مشروع تخرج · منصة ذكاء اصطناعي' },
    desc: { en: 'My graduation project (PC401): a cognitive-training platform for children with ADHD, with a Session LSTM model that adapts each session — full backend, APIs and live deployment.', ar: 'مشروع تخرجي (PC401): منصة تدريب معرفي لأطفال فرط الحركة وتشتت الانتباه، بنموذج Session LSTM بيكيّف كل جلسة — باك إند كامل وAPIs ونشر حي.' },
    tags: ['Python', 'Machine Learning', 'APIs', 'PostgreSQL'], img: '',
    links: [['api.lumi-milo.website', 'https://api.lumi-milo.website']] },
  { name: 'Financial Management System', type: { en: 'Desktop App · Windows', ar: 'تطبيق ديسكتوب · ويندوز' },
    desc: { en: 'A desktop financial-management system built for an agricultural contracting company — records, reports and daily operations.', ar: 'نظام إدارة مالية ديسكتوب اتعمل لشركة مقاولات زراعية — قيود وتقارير وتشغيل يومي.' },
    tags: ['Desktop', 'Windows', 'Database'], img: '', links: [] },
  { name: 'Azkaary', type: { en: 'Web App', ar: 'تطبيق ويب' },
    desc: { en: 'A web app for azkar and daily remembrance, designed to be light and instant on any phone.', ar: 'تطبيق ويب للأذكار والذكر اليومي، مصمم يكون خفيف وفوري على أي موبايل.' },
    tags: ['Web App', 'JavaScript'], img: '',
    links: [['azkaary.netlify.app', 'https://azkaary.netlify.app']] },
];

const BOTS = [
  ['@PandaStores_bot', '🤖', { en: 'The main Panda Store bot — shop, balance, orders', ar: 'بوت متجر باندا الرئيسي — شراء ورصيد وطلبات' }],
  ['@PandaCall_Bot', '📞', { en: 'Smart contact bot with AI replies, topics & 13 languages', ar: 'بوت تواصل ذكي — ردود AI وتوبيكس و13 لغة' }],
  ['@QuranByPandaBot', '📖', { en: 'Quran bot + Mini App — read, listen, daily wird', ar: 'بوت قرآن + ميني آب — قراءة واستماع وورد يومي' }],
  ['@Panda_StarsBot', '⭐', { en: 'Telegram Stars services', ar: 'خدمات نجوم تيليجرام' }],
  ['@PandaSocialBot', '📣', { en: 'Social media services', ar: 'خدمات سوشيال ميديا' }],
  ['@PandaGiveawaysBot', '🎁', { en: 'Giveaways & rewards', ar: 'سحوبات وجوائز' }],
  ['@Roulette_Panda_Bot', '🎡', { en: 'Reward wheel bot', ar: 'بوت عجلة الحظ والمكافآت' }],
  ['@Panda_votes_bot', '🗳️', { en: 'Voting Mini App', ar: 'ميني آب تصويت' }],
  ['@PandaStoreApiBot', '🔌', { en: 'Panda Store API access bot', ar: 'بوت الوصول لواجهة Panda Store API' }],
  ['@Ton_PricesBot', '💎', { en: 'Live TON prices', ar: 'أسعار TON لحظة بلحظة' }],
  ['@Arab_ton_bot', '🌐', { en: 'TON services in Arabic', ar: 'خدمات TON بالعربي' }],
  ['@ArbTonAKbot', '📈', { en: 'TON tools & alerts', ar: 'أدوات وتنبيهات TON' }],
];

const SKILLS = ['Full-Stack Development', 'Web Application', 'JavaScript', 'Node.js', 'React', 'TypeScript', 'RESTful API', 'Database Development', 'Python', 'Automation', 'Telegram', 'Telegram API', 'Artificial Intelligence', 'Linux', 'Ubuntu', 'SSH', 'Server Administration', 'NGINX', 'PostgreSQL', 'Machine Learning', 'TON Blockchain', 'Web3', 'Git & GitHub'];

const SERVICES = [
  { en: ['Web Apps & Platforms', 'Fast, mobile-first websites and platforms: stores, dashboards and portals that scale on real servers.'], ar: ['تطبيقات ويب ومنصات', 'مواقع ومنصات سريعة مصممة للموبايل أولًا: متاجر ولوحات تحكم وبوابات بتكبر على سيرفرات حقيقية.'] },
  { en: ['Telegram Bots & Mini Apps', 'Bots people love to use: shops, payments, subscriptions, games and automations — my home turf.'], ar: ['بوتات تيليجرام وميني آب', 'بوتات الناس تحب تستخدمها: متاجر ومدفوعات واشتراكات وألعاب وأتمتة — دي ملعبي.'] },
  { en: ['APIs & Backends', 'Solid backends and REST APIs with PostgreSQL, auth, payments and admin tooling — secure and observable.'], ar: ['APIs وباك إند', 'باك إند وواجهات REST قوية مع PostgreSQL ومصادقة ومدفوعات وأدوات إدارة — آمنة وقابلة للمتابعة.'] },
  { en: ['Web3 & TON Integrations', 'Wallets, TON payments, Stars rails and blockchain features wired into real products.'], ar: ['تكاملات Web3 وTON', 'محافظ ومدفوعات TON وخطوط نجوم ومزايا بلوكتشين متوصلين بمنتجات حقيقية.'] },
];

const SOCIALS = [
  ['GitHub', 'https://github.com/OmarMosad'], ['Upwork', 'https://www.upwork.com/freelancers/~012ec916e413d3909f'],
  ['Telegram', 'https://t.me/OMAR_M_SHEHATA'], ['Channel', 'https://t.me/PandaAdds'],
  ['Instagram', 'https://www.instagram.com/omar_shehata_1'], ['TikTok', 'https://www.tiktok.com/@omar_m.shehata'],
  ['Facebook', 'https://www.facebook.com/share/1ALaM4t1YJ/'], ['Discord', 'https://discord.com/users/omar_shehata_1'],
];

const ROTATOR = {
  en: ['Telegram bots', 'online stores', 'Mini Apps', 'REST APIs', 'TON payments', 'full platforms'],
  ar: ['بوتات تيليجرام', 'متاجر إلكترونية', 'ميني آب', 'واجهات APIs', 'مدفوعات TON', 'منصات كاملة'],
};

/* ─────────── I18N ─────────── */
const I18N = {
  en: { pressStart: '▶ PRESS START', loading: 'LOADING…', navWork: 'Work', navBots: 'Bots', navSkills: 'Skills', navServices: 'Services', navCv: 'Résumé', letsTalk: "Let's talk",
    heroBadge: '● Open to freelance — Web, Bots & Platforms', heroHi: "Hi, I'm", heroBuild: 'I build',
    heroSub: 'Full-Stack Web & Telegram Developer from Tanta, Egypt — Web3, APIs & backends. I design, build and run live products end to end: stores, bots, Mini Apps and platforms people actually use.',
    heroWork: 'Explore my work', heroCv: 'View résumé', statBots: 'Telegram bots', statSites: 'Live sites & stores', statPay: 'Payment rails integrated',
    workTitle: 'Selected work', workSub: 'Products people actually use — live, not demos.',
    botsTitle: 'Telegram bots & Mini Apps', botsSub: 'Telegram is my playground — an ecosystem of bots running live for real users.',
    skillsTitle: 'Toolbox', skillsSub: 'The exact skill set on my Upwork profile — plus the stack behind Panda Store.',
    servTitle: 'What I can build for you', servSub: 'Designed, built and launched — end to end.',
    step1: 'Discover — goals, users, scope, a clear plan', step2: 'Design — clean UI that fits your brand', step3: 'Build — fast, tested code on real servers', step4: 'Launch — deploy, payments, support',
    termTitle: 'Secret terminal', termSub: 'Developer? Type help and press Enter.',
    contactTitle: "Let's build something great", contactSub: 'Have a store, a bot or an idea? I usually reply fast.',
    fName: 'Your name', fMsg: 'Tell me about your project', fSend: 'Send on WhatsApp ↗',
    footHi: 'Hi! 👋', footTag: 'Building technology that ships — stores, bots and platforms.', footMade: 'Designed & engineered by Omar Shehata', toTop: 'Back to top ↑',
    tourBtn: 'TOUR', back: 'Back', skip: 'Skip ⏭', next: 'Next ▶', finish: 'Finish 🏁',
    achTitle: '🏆 ACHIEVEMENT UNLOCKED — Explorer', achSub: "You found every hidden coin. Respect! Now let's build something together.",
    gameHint: 'SPACE / ↑ / TAP to jump · dodge bugs · grab coins', coinToast: 'Coin collected!', locked: '🔒 Collect all 6 hidden coins to unlock the game!',
    visit: 'Open ↗' },
  ar: { pressStart: '▶ ابدأ اللعب', loading: 'جاري التحميل…', navWork: 'أعمالي', navBots: 'البوتات', navSkills: 'مهاراتي', navServices: 'خدماتي', navCv: 'السيرة', letsTalk: 'يلا نتكلم',
    heroBadge: '● متاح لشغل حر — ويب وبوتات ومنصات', heroHi: 'أهلًا، أنا', heroBuild: 'أنا ببني',
    heroSub: 'مطور ويب وتيليجرام Full-Stack من طنطا، مصر — Web3 وواجهات وباك إند. بصمم وببني وبشغّل منتجات حية من الألف للياء: متاجر وبوتات وميني آب ومنصات الناس بتستخدمها فعلًا.',
    heroWork: 'شوف شغلي', heroCv: 'شوف السيرة', statBots: 'بوت تيليجرام', statSites: 'مواقع ومتاجر حية', statPay: 'وسائل دفع متكاملة',
    workTitle: 'أعمال مختارة', workSub: 'منتجات الناس بتستخدمها — حية، مش عروض تجريبية.',
    botsTitle: 'بوتات تيليجرام وميني آب', botsSub: 'تيليجرام ملعبي — منظومة بوتات شغالة حية لمستخدمين حقيقيين.',
    skillsTitle: 'صندوق الأدوات', skillsSub: 'نفس مهاراتي المكتوبة على Upwork بالحرف — وزيادة عليها ستاك Panda Store.',
    servTitle: 'أقدر أبني لك إيه', servSub: 'تصميم وبناء وإطلاق — من الألف للياء.',
    step1: 'اكتشاف — أهداف ومستخدمين ونطاق وخطة واضحة', step2: 'تصميم — واجهة نضيفة على هوية براندك', step3: 'بناء — كود سريع ومتجرب على سيرفرات حقيقية', step4: 'إطلاق — نشر ومدفوعات ودعم',
    termTitle: 'الترمينال السري', termSub: 'مطور؟ اكتب help ودوس Enter.',
    contactTitle: 'يلا نبني حاجة عظيمة', contactSub: 'عندك متجر أو بوت أو فكرة؟ غالبًا برد بسرعة.',
    fName: 'اسمك', fMsg: 'احكي لي عن مشروعك', fSend: 'ابعت على واتساب ↗',
    footHi: 'أهلًا! 👋', footTag: 'ببني تقنية بتتنفذ فعلًا — متاجر وبوتات ومنصات.', footMade: 'تصميم وهندسة عمر شحاتة', toTop: 'ارجع لفوق ↑',
    tourBtn: 'الجولة', back: 'رجوع', skip: 'تخطي ⏭', next: 'التالي ▶', finish: 'إنهاء 🏁',
    achTitle: '🏆 إنجاز انفتح — المستكشف', achSub: 'لقيت كل العملات المخفية. احترام! يلا نبني حاجة سوا.',
    gameHint: 'مسافة / ↑ / دوس للقفز · تجنب الحشرات · اجمع العملات', coinToast: 'عملة اتجمعت!', locked: '🔒 اجمع العملات الستة المخفية عشان تفتح اللعبة!',
    visit: 'افتح ↗' },
};
let lang = localStorage.getItem('omar-lang') || 'en';
const T = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

/* ─────────── TOUR SCRIPT ─────────── */
const TOUR = [
  { target: '#hero', en: "Ah, fresh eyes! I'm Omar — a human, in pixels. Welcome to my corner of the internet. Short on time? My stats are right here: 12+ live Telegram bots, 8+ sites and stores, 6 payment rails. Let's walk!", ar: 'عيون جديدة! أنا عمر — إنسان، بالبكسل. أهلًا بيك في ركني على الإنترنت. مستعجل؟ أرقامي قدامك: 12+ بوت تيليجرام حي، و8+ مواقع ومتاجر، و6 وسائل دفع. يلا نمشي!' },
  { target: '#work', en: 'Selected work — products people actually use. The big one is Panda Store: a whole Telegram commerce ecosystem I designed, built and still run on my own servers.', ar: 'أعمال مختارة — منتجات الناس بتستخدمها فعلًا. أكبرها Panda Store: منظومة تجارة كاملة على تيليجرام صممتها وبنيتها ولسه مشغّلها على سيرفراتي.' },
  { target: '#bots', en: 'My bot army. Stores, stars, giveaways, votes, TON prices, a Quran bot and even a smart contact bot that speaks 13 languages. All live, all mine.', ar: 'جيش البوتات بتاعي. متاجر ونجوم وسحوبات وتصويت وأسعار TON وبوت قرآن وبوت تواصل ذكي بيتكلم 13 لغة. كله حي وكله بتاعي.' },
  { target: '#skills', en: "The toolbox — exactly the skills on my Upwork profile, plus the TON/Web3 stack behind the store. If it's on this list, I've shipped with it.", ar: 'صندوق الأدوات — نفس مهارات بروفايل Upwork بالحرف، وزيادة عليها ستاك TON/Web3 اللي ورا المتجر. أي حاجة في الليستة دي شحنت بيها شغل فعلي.' },
  { target: '#services', en: 'What I can build for you: web platforms, Telegram bots & Mini Apps, APIs & backends, Web3 integrations. Discover → Design → Build → Launch.', ar: 'أقدر أبني لك: منصات ويب، بوتات تيليجرام وميني آب، APIs وباك إند، وتكاملات Web3. اكتشاف ← تصميم ← بناء ← إطلاق.' },
  { target: '#terminal', en: "Psst — two secrets: 6 gold coins are hidden on this page; collect them all to unlock my mini-game. And this terminal is real — try 'help', then 'coffee'.", ar: "همسة — سرّين: 6 عملات دهب مخبيين في الصفحة؛ اجمعهم كلهم عشان تفتح لعبتي الصغيرة. والترمينال ده حقيقي — جرّب 'help' وبعدين 'coffee'." },
  { target: '#contact', en: "Last stop! Tell me about your project here, or reach me on Telegram @OmarPanda. Thanks for playing — Houston, we have a developer.", ar: 'آخر محطة! احكي لي عن مشروعك هنا، أو كلمني تيليجرام @OmarPanda. شكرًا على اللعب — هيوستن، عندنا مطور.' },
];

/* ─────────── RENDER ─────────── */
function render() {
  $('#workGrid').innerHTML = PROJECTS.map(p => `
    <article class="work-card">
      ${p.img ? `<img class="work-cover" src="${p.img}" alt="${p.name}" loading="lazy">` : `<div class="work-tilecover">${p.name}</div>`}
      <div class="work-body"><span class="work-type">${p.type[lang]}</span><h3>${p.name}</h3><p>${p.desc[lang]}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="work-links">${p.links.map(l => `<a href="${l[1]}" target="_blank" rel="noopener">${l[0]} ↗</a>`).join('')}</div></div>
    </article>`).join('');
  $('#botsGrid').innerHTML = BOTS.map(b => `
    <div class="bot-card"><span class="bot-ic">${b[1]}</span><b>${b[0]}</b><span>${b[2][lang]}</span>
    <a href="https://t.me/${b[0].slice(1)}" target="_blank" rel="noopener">${T('visit')}</a></div>`).join('');
  $('#skillsWrap').innerHTML = SKILLS.map(s => `<span class="skill-chip">${s}</span>`).join('');
  $('#servGrid').innerHTML = SERVICES.map((s, i) => `
    <div class="serv-card"><span class="serv-num">0${i + 1}</span><h3>${s[lang][0]}</h3><p>${s[lang][1]}</p></div>`).join('');
  const soc = SOCIALS.map(s => `<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join('');
  $('#socialsRow').innerHTML = soc; $('#socialsFoot').innerHTML = soc;
  const words = [...SKILLS.slice(0, 10), 'TON', 'Web3'];
  $('#marqueeTrack').innerHTML = (words.map(w => `<span>${w} ✦</span>`).join('')).repeat(2);
}
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach(el => { el.textContent = T(el.dataset.i18n); });
  $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
  localStorage.setItem('omar-lang', lang);
  render();
}

/* ─────────── LOADER ─────────── */
const WALK = ['assets/char-walk-1.png', 'assets/char-walk-2.png', 'assets/char-walk-3.png', 'assets/char-walk-4.png'];
WALK.forEach(s => { const i = new Image(); i.src = s; });
(function loader() {
  let p = 0, f = 0;
  const fill = $('#loaderFill'), pct = $('#loaderPct'), ch = $('#loaderChar');
  const iv = setInterval(() => {
    p = Math.min(100, p + Math.random() * 16 + 6);
    fill.style.width = p + '%'; pct.textContent = Math.floor(p);
    ch.src = WALK[f++ % 4]; ch.style.left = `calc(${p}% - ${p * 0.64}px)`;
    if (p >= 100) {
      clearInterval(iv);
      $('#loaderHint').hidden = true;
      const b = $('#startBtn'); b.hidden = false; b.focus();
    }
  }, 110);
  const start = () => {
    const L = $('#loader'); if (L.classList.contains('done')) return;
    L.classList.add('done'); document.body.style.overflow = '';
    setTimeout(() => { L.remove(); openTourChoice(); }, 480);
  };
  $('#startBtn').addEventListener('click', start);
  document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && $('#loader')) start(); });
  document.body.style.overflow = 'hidden';
})();

/* ─────────── TOUR ─────────── */
let tourIdx = -1, typing = null;
function openTourChoice() { startTour(0); }
function startTour(i) {
  tourIdx = i;
  $('#dialog').hidden = false;
  $('#tourBtn').hidden = true;
  showLine();
}
function showLine() {
  const line = TOUR[tourIdx];
  const el = $(line.target);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }
  $('#dlgChapter').textContent = `${tourIdx + 1}/${TOUR.length}`;
  $('#dlgDots').innerHTML = TOUR.map((_, i) => `<i class="${i === tourIdx ? 'on' : ''}"></i>`).join('');
  $('#dlgBack').style.visibility = tourIdx === 0 ? 'hidden' : 'visible';
  $('#dlgNext').innerHTML = tourIdx === TOUR.length - 1 ? T('finish') : T('next');
  const text = line[lang];
  const p = $('#dlgText'); p.textContent = '';
  clearInterval(typing);
  let i = 0;
  typing = setInterval(() => {
    p.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(typing);
  }, 16);
  p.onclick = () => { clearInterval(typing); p.textContent = text; };
}
function endTour() {
  clearInterval(typing);
  $('#dialog').hidden = true;
  $('#tourBtn').hidden = false;
  confetti();
}
$('#dlgNext').addEventListener('click', () => {
  const full = TOUR[tourIdx][lang];
  if ($('#dlgText').textContent.length < full.length) { clearInterval(typing); $('#dlgText').textContent = full; return; }
  if (tourIdx < TOUR.length - 1) { tourIdx++; showLine(); } else endTour();
});
$('#dlgBack').addEventListener('click', () => { if (tourIdx > 0) { tourIdx--; showLine(); } });
$('#dlgSkip').addEventListener('click', endTour);
$('#tourBtn').addEventListener('click', () => startTour(0));

function confetti() {
  const box = $('#confetti'); const colors = ['#ffc93c', '#6ea8fe', '#e8722a', '#37d67a', '#ff5d5d'];
  for (let i = 0; i < 42; i++) {
    const s = document.createElement('i');
    s.style.left = Math.random() * 100 + 'vw';
    s.style.background = colors[i % colors.length];
    s.style.animationDuration = (1.1 + Math.random() * 1.4) + 's';
    s.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.appendChild(s); setTimeout(() => s.remove(), 2800);
  }
}

/* ─────────── COINS + HUD ─────────── */
let coins = JSON.parse(localStorage.getItem('omar-coins') || '[]');
function paintCoins() {
  $$('.coin').forEach(c => { if (coins.includes(+c.dataset.coin)) c.style.display = 'none'; });
  $('#coinCount').textContent = `${coins.length}/6`;
  $('#coinHud').hidden = false;
  $('#playBtn').hidden = coins.length < 6;
}
$$('.coin').forEach(c => c.addEventListener('click', () => {
  const id = +c.dataset.coin;
  if (coins.includes(id)) return;
  coins.push(id); localStorage.setItem('omar-coins', JSON.stringify(coins));
  c.classList.add('got'); setTimeout(() => { c.style.display = 'none'; }, 460);
  toast(`${T('coinToast')} ${coins.length}/6`);
  paintCoins();
  if (coins.length === 6) { $('#achieve').hidden = false; confetti(); }
}));
$('#coinReset').addEventListener('click', () => {
  coins = []; localStorage.removeItem('omar-coins');
  $$('.coin').forEach(c => { c.style.display = ''; c.classList.remove('got'); });
  paintCoins();
});
$('#achPlay').addEventListener('click', () => { $('#achieve').hidden = true; openGame(); });
$('#playBtn').addEventListener('click', openGame);

/* ─────────── GAME ─────────── */
const cv = $('#gameCanvas'), cx = cv.getContext('2d');
const frames = WALK.map(s => { const i = new Image(); i.src = s; return i; });
let gRun = false, gScore = 0, gTick = 0, py = 0, vy = 0, obs = [], gCoins = [], raf = null;
const GROUND = 238, PH = 74;
function openGame() {
  if (coins.length < 6) { toast(T('locked')); return; }
  $('#gameModal').hidden = false;
  $('#gameBest').textContent = 'TOP ' + (localStorage.getItem('omar-best') || 0);
  drawGame(true);
}
function closeGame() { $('#gameModal').hidden = true; gRun = false; cancelAnimationFrame(raf); }
$('#gameClose').addEventListener('click', closeGame);
$('#gameStart').addEventListener('click', () => { if (!gRun) startGame(); });
function jump() { if (py === 0) vy = -12.5; }
cv.addEventListener('pointerdown', () => { if (gRun) jump(); });
document.addEventListener('keydown', (e) => {
  if (!$('#gameModal').hidden && (e.code === 'Space' || e.code === 'ArrowUp')) { e.preventDefault(); if (gRun) jump(); }
});
function startGame() {
  gRun = true; gScore = 0; gTick = 0; py = 0; vy = 0; obs = []; gCoins = [];
  $('#gameStart').textContent = '…';
  loop();
}
function loop() {
  if (!gRun) return;
  gTick++;
  vy += 0.7; py += vy; if (py > 0) { py = 0; vy = 0; }
  if (gTick % 95 === 0) obs.push({ x: 660 });
  if (gTick % 150 === 0) gCoins.push({ x: 680, y: 150 + Math.random() * 60 });
  const speed = 5 + gTick / 900;
  obs.forEach(o => o.x -= speed); gCoins.forEach(c => c.x -= speed);
  obs = obs.filter(o => o.x > -40); gCoins = gCoins.filter(c => c.x > -30);
  const px = 70, pw = 46, ph = PH;
  for (const o of obs) if (o.x < px + pw - 10 && o.x + 26 > px + 8 && py > -34) return gameOver();
  for (const c of gCoins) if (!c.hit && Math.abs(c.x - (px + 20)) < 34 && Math.abs((GROUND - PH + py + 34) - c.y) < 46) { c.hit = true; gScore += 5; }
  gScore += 0.12;
  drawGame(false);
  $('#gameScore').textContent = 'SCORE ' + Math.floor(gScore);
  raf = requestAnimationFrame(loop);
}
function drawGame(idle) {
  cx.clearRect(0, 0, 640, 300);
  cx.fillStyle = '#274b8f'; cx.fillRect(0, 0, 640, 40);
  cx.fillStyle = '#58b368'; cx.fillRect(0, GROUND + PH - 8, 640, 70);
  cx.fillStyle = '#3f9e4d'; cx.fillRect(0, GROUND + PH - 8, 640, 8);
  cx.fillStyle = '#dfe9f5';
  [60, 300, 520].forEach((x, i) => { const cxp = ((x - (gTick * 0.6) % 700) + 700) % 700 - 40; cx.fillRect(cxp, 30 + i * 18, 64, 14); cx.fillRect(cxp + 14, 20 + i * 18, 36, 14); });
  for (const o of obs) { // pixel bug
    cx.fillStyle = '#e8722a'; cx.fillRect(o.x, GROUND + PH - 30, 28, 22);
    cx.fillStyle = '#8a3c10'; cx.fillRect(o.x + 4, GROUND + PH - 36, 8, 8); cx.fillRect(o.x + 16, GROUND + PH - 36, 8, 8);
    cx.strokeStyle = '#333'; cx.lineWidth = 2;
    cx.beginPath(); cx.moveTo(o.x + 2, GROUND + PH - 8); cx.lineTo(o.x - 3, GROUND + PH); cx.moveTo(o.x + 24, GROUND + PH - 8); cx.lineTo(o.x + 30, GROUND + PH); cx.stroke();
  }
  for (const c of gCoins) if (!c.hit) {
    cx.fillStyle = '#ffc93c'; cx.beginPath(); cx.arc(c.x, c.y, 11, 0, 7); cx.fill();
    cx.fillStyle = '#e0a91f'; cx.beginPath(); cx.arc(c.x, c.y, 6, 0, 7); cx.fill();
  }
  const img = frames[Math.floor(gTick / 6) % 4];
  if (img.complete) cx.drawImage(img, 62, GROUND - 8 + py, 56, PH + 8);
  if (idle) { cx.fillStyle = 'rgba(6,10,20,.55)'; cx.fillRect(0, 0, 640, 300); cx.fillStyle = '#fff'; cx.font = 'bold 20px Courier New'; cx.textAlign = 'center'; cx.fillText('BUG RUNNER', 320, 140); cx.font = '14px Courier New'; cx.fillText(T('gameHint'), 320, 168); }
}
function gameOver() {
  gRun = false;
  const s = Math.floor(gScore);
  const best = Math.max(s, +(localStorage.getItem('omar-best') || 0));
  localStorage.setItem('omar-best', best);
  $('#gameBest').textContent = 'TOP ' + best;
  $('#gameStart').textContent = '↻ ' + s + ' — RETRY';
  cx.fillStyle = 'rgba(6,10,20,.6)'; cx.fillRect(0, 0, 640, 300);
  cx.fillStyle = '#ff5d5d'; cx.font = 'bold 24px Courier New'; cx.textAlign = 'center';
  cx.fillText('GAME OVER — ' + s, 320, 150);
}
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(t._h); t._h = setTimeout(() => t.hidden = true, 2200);
}

/* ─────────── TERMINAL ─────────── */
const termBody = $('#termBody');
function tPrint(txt, cls) {
  const d = document.createElement('div'); if (cls) d.className = cls;
  d.textContent = txt; termBody.appendChild(d); termBody.scrollTop = termBody.scrollHeight;
}
const TERM = {
  help: () => 'Commands: about · skills · projects · bots · contact · socials · cv · game · coffee · theme · clear',
  about: () => 'Omar Shehata — Full-Stack Web & Telegram Developer (Web3, APIs & Backends), based in Tanta, Egypt. Founder of the Panda Store ecosystem.',
  skills: () => SKILLS.join(' · '),
  projects: () => PROJECTS.map(p => '• ' + p.name).join('\n'),
  bots: () => BOTS.map(b => '• ' + b[0]).join('\n'),
  contact: () => 'Telegram: @OmarPanda · WhatsApp: +20 109 917 4529 · Tanta, Egypt (GMT+2)',
  socials: () => SOCIALS.map(s => `${s[0]}: ${s[1]}`).join('\n'),
  cv: () => { location.href = 'cv.html'; return 'Opening résumé…'; },
  coffee: () => '  ( (\n   ) )\n ┌────┐\n │ ☕ │ Coffee break! +10 energy.\n └────┘ Omar codes better with coffee.',
  game: () => { if (coins.length < 6) return T('locked'); openGame(); return 'Launching Bug Runner…'; },
  theme: () => { $('#themeBtn').click(); return 'Theme toggled.'; },
  clear: () => { termBody.innerHTML = ''; return ''; },
};
tPrint("Welcome to omar.sh — type 'help' to see commands.");
$('#termForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const inp = $('#termText'); const cmd = inp.value.trim().toLowerCase(); inp.value = '';
  if (!cmd) return;
  tPrint('$ ' + cmd, 'cmd');
  const fn = TERM[cmd];
  const out = fn ? fn() : `command not found: ${cmd} — try 'help'`;
  if (out) tPrint(out);
});

/* ─────────── HEADER / THEME / MISC ─────────── */
const themeBtn = $('#themeBtn');
function setTheme(th) {
  document.documentElement.dataset.theme = th;
  localStorage.setItem('omar-theme', th);
  themeBtn.textContent = th === 'light' ? '☀' : '☾';
}
setTheme(localStorage.getItem('omar-theme') || 'dark');
themeBtn.addEventListener('click', (e) => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  const x = e.clientX || innerWidth - 40, y = e.clientY || 30;
  document.body.style.setProperty('--wipe-x', x + 'px');
  setTheme(next);
  document.body.animate(
    [{ clipPath: `circle(0 at ${x}px ${y}px)` }, { clipPath: `circle(150% at ${x}px ${y}px)` }],
    { duration: 480, easing: 'ease-out' });
});
$('#langBtn').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; applyLang(); });
const sheet = $('#menuSheet');
$('#menuBtn').addEventListener('click', () => sheet.hidden = false);
sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('a')) sheet.hidden = true; });
$('#toTop').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const n = $('#cfName').value.trim(), m = $('#cfMsg').value.trim();
  const txt = encodeURIComponent(`Hi Omar! I'm ${n}.\n${m}`);
  open(`https://wa.me/201099174529?text=${txt}`, '_blank');
});
/* rotator */
let rIdx = 0;
setInterval(() => {
  const w = $('#rotatorWord'); if (!w) return;
  rIdx = (rIdx + 1) % ROTATOR[lang].length; w.textContent = ROTATOR[lang][rIdx];
}, 2100);

/* init */
$('#heroYear').textContent = new Date().getFullYear();
$('#footYear').textContent = new Date().getFullYear();
applyLang();
paintCoins();
