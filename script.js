/* ═══ Omar Shehata — game portfolio engine (vanilla, no deps) ═══ */
'use strict';
const $ = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

/* ─────────── CODED CHARACTER (pure SVG + CSS animation, no images) ─────────── */
/* ── Pixel Omar: tiny hand-drawn sprites (walk cycle + front + talk) ── */
const PX_WALK = ['assets/char-px-walk-1.png', 'assets/char-px-walk-2.png', 'assets/char-px-walk-3.png', 'assets/char-px-walk-4.png'];
const PX_FRONT = 'assets/char-px-front.png', PX_TALK = 'assets/char-px-talk.png';
[...PX_WALK, PX_FRONT, PX_TALK].forEach(f => { const i = new Image(); i.src = f; });
$$('.char-slot').forEach(el => {
  const side = el.dataset.char === 'side';
  el.innerHTML = `<img class="char-px${side ? ' px-walk' : ''}" src="${side ? PX_WALK[0] : PX_FRONT}" alt="Pixel Omar">`;
});
/* loader walk cycle */
(function () {
  let fi = 0;
  const iv = setInterval(() => {
    const L = $('#loader');
    if (!L || L.classList.contains('done')) { clearInterval(iv); return; }
    const img = $('#loaderChar img');
    if (img) { fi = (fi + 1) % 4; img.src = PX_WALK[fi]; }
  }, 140);
})();

/* ─────────── SVG ICONS ─────────── */
const SVG_PLANE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 3.4 2.8 10.5c-.95.35-.9 1.75.08 2.1l4.7 1.55 1.8 5.6c.23.7 1.17.9 1.85.37l2.45-2 4.65 3.44c.62.46 1.54.1 1.7-.64l2.95-13.9c.18-.88-.62-1.6-1.5-1.32ZM8.6 13.5l9.7-6.1c.22-.14.4.17.21.32l-8.2 7.4-.32 3.05L8.6 13.5Z"/></svg>';
const SVG_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8.5 7H17v8.5"/></svg>';
const SVG_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
const SVG_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const GLYPHS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 2.9-.9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.4 4.6-4.6 4.9.4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>',
  telegram: SVG_PLANE,
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.3 1.9 3.9 4.2 4.1v3c-1.6 0-3-.5-4.2-1.3v6.5c0 3.4-2.4 5.7-5.6 5.7A5.4 5.4 0 0 1 5.6 13c0-3 2.4-5.3 5.4-5.3.3 0 .7 0 1 .1v3.2a2.3 2.3 0 0 0-1-.2 2.28 2.28 0 0 0-2.3 2.3c0 1.3 1 2.3 2.3 2.3 1.4 0 2.4-1 2.4-2.5V3h3.2Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21.5v-7.2h2.5l.4-3h-2.9V9.4c0-.9.3-1.5 1.6-1.5h1.4V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5v7.2h3Z"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M6.3 4.6A13.4 13.4 0 0 1 9.5 4l.2.4c-1.9.3-3.5.9-4.9 1.9C6.2 5.4 9 4.8 12 4.8s5.8.6 7.2 1.5A12.6 12.6 0 0 0 14.3 4.4L14.5 4c1.1.1 2.2.3 3.2.6A14.8 14.8 0 0 1 20.9 14a13.7 13.7 0 0 1-4.2 2.2l-.7-1.1c.5-.2 1-.4 1.4-.7l-.4-.3a11.9 11.9 0 0 1-10 0l-.4.3c.4.3.9.5 1.4.7l-.7 1.1A13.6 13.6 0 0 1 3.1 14 14.7 14.7 0 0 1 6.3 4.6ZM8.7 11.6c-1 0-1.7.9-1.7 1.9s.8 1.9 1.7 1.9c1 0 1.7-.9 1.7-1.9s-.8-1.9-1.7-1.9Zm6.6 0c-1 0-1.7.9-1.7 1.9s.8 1.9 1.7 1.9c1 0 1.7-.9 1.7-1.9s-.8-1.9-1.7-1.9Z"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2M3 13h18"/></svg>',
};
const SERV_ICONS = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6-5 6 5 6M16 6l5 6-5 6"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12l3.5 5L12 21 2.5 8Z"/><path d="M2.5 8h19M9 3l3 5 3-5M12 8v13"/></svg>',
];

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
    tags: ['Web', 'UI'], img: 'assets/work-louver.webp',
    links: [['Louver.site', 'https://Louver.site']] },
  { name: 'Dr. Mohamed Aboeleneen', type: { en: 'Client Website', ar: 'موقع عميل' },
    desc: { en: 'A personal/professional website for a client — services, content and direct contact, built and deployed end to end.', ar: 'موقع شخصي/مهني لعميل — خدمات ومحتوى وتواصل مباشر، اتبنى واتنشر من الألف للياء.' },
    tags: ['Web', 'Deployment'], img: 'assets/work-dr.webp',
    links: [['Visit', 'https://drmohamedaboeleneen.vercel.app']] },
  { name: 'Lumi & Milo', type: { en: 'Graduation Project · AI Platform', ar: 'مشروع تخرج · منصة ذكاء اصطناعي' },
    desc: { en: 'My graduation project (PC401): a cognitive-training platform for children with ADHD, with a Session LSTM model that adapts each session — full backend, APIs and live deployment.', ar: 'مشروع تخرجي (PC401): منصة تدريب معرفي لأطفال فرط الحركة وتشتت الانتباه، بنموذج Session LSTM بيكيّف كل جلسة — باك إند كامل وAPIs ونشر حي.' },
    tags: ['Python', 'Machine Learning', 'APIs', 'PostgreSQL'], img: 'assets/work-lumi.webp',
    links: [['api.lumi-milo.website', 'https://api.lumi-milo.website']] },
  { name: 'Financial Management System', type: { en: 'Desktop App · Windows', ar: 'تطبيق ديسكتوب · ويندوز' },
    desc: { en: 'A desktop financial-management system built for an agricultural contracting company — records, reports and daily operations.', ar: 'نظام إدارة مالية ديسكتوب اتعمل لشركة مقاولات زراعية — قيود وتقارير وتشغيل يومي.' },
    tags: ['Desktop', 'Windows', 'Database'], img: 'assets/work-finance.webp', links: [] },
  { name: 'Azkaary', type: { en: 'Web App', ar: 'تطبيق ويب' },
    desc: { en: 'A web app for azkar and daily remembrance, designed to be light and instant on any phone.', ar: 'تطبيق ويب للأذكار والذكر اليومي، مصمم يكون خفيف وفوري على أي موبايل.' },
    tags: ['Web App', 'JavaScript'], img: 'assets/work-azkaary.webp',
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
  ['GitHub', 'https://github.com/OmarMosad', 'github'], ['Upwork', 'https://www.upwork.com/freelancers/~012ec916e413d3909f', 'briefcase'],
  ['Telegram', 'https://t.me/OmarPanda', 'telegram'], ['Channel', 'https://t.me/PandaStore_org', 'telegram'],
  ['Instagram', 'https://www.instagram.com/omar_shehata_1', 'instagram'], ['TikTok', 'https://www.tiktok.com/@omar_m.shehata', 'tiktok'],
  ['Facebook', 'https://www.facebook.com/share/1ALaM4t1YJ/', 'facebook'], ['Discord', 'https://discord.com/users/omar_shehata_1', 'discord'],
];
const BOT_AVA = new Set(['PandaStores_bot', 'PandaCall_Bot', 'QuranByPandaBot', 'Panda_StarsBot', 'PandaGiveawaysBot', 'Roulette_Panda_Bot', 'Panda_votes_bot', 'PandaStoreApiBot', 'Ton_PricesBot', 'Arab_ton_bot', 'ArbTonAKbot']);

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
  $('#botsList').innerHTML = BOTS.map(b => {
    const u = b[0].slice(1);
    const ava = BOT_AVA.has(u)
      ? `<img class="bot-ava" src="assets/bots/${u}.jpg" alt="" loading="lazy">`
      : `<span class="bot-ava-fb">${SVG_PLANE}</span>`;
    return `<a class="bot-row" href="https://t.me/${u}" target="_blank" rel="noopener">${ava}
      <span class="bot-info"><b>${b[0]}</b><span>${b[2][lang]}</span></span>
      <span class="bot-open">${lang === 'ar' ? 'افتح' : 'Open'} ${SVG_ARROW}</span></a>`;
  }).join('');
  $('#skillsWrap').innerHTML = SKILLS.map(s => `<span class="skill-chip">${s}</span>`).join('');
  $('#servGrid').innerHTML = SERVICES.map((s, i) => `
    <div class="serv-card"><span class="serv-ic">${SERV_ICONS[i]}</span><span class="serv-num">0${i + 1}</span><h3>${s[lang][0]}</h3><p>${s[lang][1]}</p></div>`).join('');
  const soc = SOCIALS.map(s => `<a href="${s[1]}" target="_blank" rel="noopener">${GLYPHS[s[2]] || ''}${s[0]}</a>`).join('');
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
let pendingAchieve = false;
function showAchieve() {
  const a = $('#achieve'); a.hidden = false; confetti();
  clearTimeout(a._h); a._h = setTimeout(() => { a.hidden = true; }, 9000);
}
(function loader() {
  let p = 0;
  const fill = $('#loaderFill'), pct = $('#loaderPct'), ch = $('#loaderChar');
  const iv = setInterval(() => {
    p = Math.min(100, p + Math.random() * 16 + 6);
    fill.style.width = p + '%'; pct.textContent = Math.floor(p);
    ch.style.left = `calc(${p}% - ${p * 0.59}px)`;
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
function setTalk(on) { const img = $('#dialog .char-px'); if (img) img.src = on ? PX_TALK : PX_FRONT; }
function startTour(i) {
  tourIdx = i;
  $('#dialog').hidden = false;
  $('#tourBtn').hidden = true;
  const s = $('#dialog .char-px');
  if (s) { s.classList.add('waving'); setTimeout(() => s.classList.remove('waving'), 2600); }
  showLine();
}
function showLine() {
  const line = TOUR[tourIdx];
  const el = $(line.target);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }
  $('#dlgChapter').textContent = `${tourIdx + 1}/${TOUR.length}`;
  $('#dlgDots').innerHTML = TOUR.map((_, i) => `<i class="${i === tourIdx ? 'on' : ''}"></i>`).join('');
  $('#dlgBack').style.visibility = tourIdx === 0 ? 'hidden' : 'visible';
  $('#dlgNext').innerHTML = tourIdx === TOUR.length - 1 ? T('finish') : T('next');
  const text = line[lang];
  const p = $('#dlgText'); p.textContent = '';
  clearInterval(typing);
  setTalk(true);
  let i = 0;
  typing = setInterval(() => {
    p.textContent = text.slice(0, ++i);
    if (i >= text.length) { clearInterval(typing); setTalk(false); }
  }, 16);
  p.onclick = () => { clearInterval(typing); setTalk(false); p.textContent = text; };
}
function endTour() {
  clearInterval(typing);
  setTalk(false);
  $('#dialog').hidden = true;
  $('#tourBtn').hidden = false;
  confetti();
  if (pendingAchieve) { pendingAchieve = false; showAchieve(); }
}
$('#dlgNext').addEventListener('click', () => {
  const full = TOUR[tourIdx][lang];
  if ($('#dlgText').textContent.length < full.length) { clearInterval(typing); setTalk(false); $('#dlgText').textContent = full; return; }
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
  if (coins.length === 6) {
    if ($('#dialog').hidden) showAchieve(); else pendingAchieve = true;
  }
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
/* the runner is drawn entirely with code — mini Omar: hair, hoodie, orange jacket, swinging legs */
function drawRunner(px, base, phase) {
  const sw = Math.sin(phase) * 0.55, sw2 = Math.sin(phase + Math.PI) * 0.55;
  const hipY = base - 30;
  cx.save(); cx.translate(px + 20, hipY);
  cx.save(); cx.rotate(sw2); cx.fillStyle = '#1b2230'; cx.fillRect(-5, 0, 10, 26); cx.fillStyle = '#141922'; cx.fillRect(-5, 24, 16, 6); cx.restore();
  cx.save(); cx.rotate(sw); cx.fillStyle = '#232a38'; cx.fillRect(-4, 0, 10, 26); cx.fillStyle = '#141922'; cx.fillRect(-4, 24, 16, 6); cx.restore();
  cx.restore();
  const by = base - 64;
  cx.fillStyle = '#26355e'; cx.beginPath(); cx.arc(px + 7, by + 9, 8, 0, 7); cx.fill();
  cx.fillStyle = '#e8722a';
  if (cx.roundRect) { cx.beginPath(); cx.roundRect(px + 3, by, 31, 36, 6); cx.fill(); } else cx.fillRect(px + 3, by, 31, 36);
  cx.fillStyle = '#c85a1d'; cx.fillRect(px + 5, by + 11, 27, 2.5); cx.fillRect(px + 5, by + 22, 27, 2.5);
  cx.fillStyle = '#26355e'; cx.fillRect(px + 28, by, 5, 36);
  cx.save(); cx.translate(px + 16, by + 6); cx.rotate(sw2 * 0.9);
  cx.fillStyle = '#e8722a'; cx.fillRect(-4, 0, 8, 23); cx.fillStyle = '#f0b28c'; cx.beginPath(); cx.arc(0, 26, 4, 0, 7); cx.fill(); cx.restore();
  cx.fillStyle = '#f0b28c'; cx.beginPath(); cx.arc(px + 19, by - 9, 10.5, 0, 7); cx.fill();
  cx.fillStyle = '#20242e'; cx.beginPath(); cx.arc(px + 19, by - 12, 10.5, Math.PI, 0); cx.fill();
  cx.beginPath(); cx.arc(px + 12, by - 19, 4, 0, 7); cx.arc(px + 19, by - 21, 4.6, 0, 7); cx.arc(px + 26, by - 19, 4, 0, 7); cx.fill();
  cx.fillStyle = '#20242e'; cx.beginPath(); cx.arc(px + 24.5, by - 9, 1.7, 0, 7); cx.fill();
}
let gRun = false, gScore = 0, gTick = 0, py = 0, vy = 0, obs = [], gCoins = [], raf = null;
const GROUND = 238, PH = 74;
function openGame() {
  if (coins.length < 6) { toast(T('locked')); return; }
  if (!$('#dialog').hidden) endTour();
  $('#achieve').hidden = true;
  $('#gameModal').hidden = false;
  $('#gameBest').textContent = 'TOP ' + (localStorage.getItem('omar-best') || 0);
  drawGame(true);
}
function closeGame() { $('#gameModal').hidden = true; gRun = false; cancelAnimationFrame(raf); }
$('#gameClose').addEventListener('click', closeGame);
$('#gameModal').addEventListener('click', (e) => { if (e.target.id === 'gameModal') closeGame(); });
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
  drawRunner(58, 298 + py, idle ? 0 : gTick * 0.32);
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
  themeBtn.innerHTML = th === 'light' ? SVG_SUN : SVG_MOON;
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

/* ─────────── SKILLS RUNNER: Pixel Omar runs the line above the toolbox, turns to face you at each end ─────────── */
(function initRunner() {
  const track = document.querySelector('.runner-track'), img = $('#runnerChar');
  if (!track || !img) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    img.src = PX_FRONT; img.style.left = '50%'; img.style.transform = 'translateX(-50%)';
    return;
  }
  let x = 0, dir = 1, mode = 'run', pauseEnd = 0, fi = 0, fLast = 0, last = performance.now(), active = false;
  new IntersectionObserver(en => { active = en[0].isIntersecting; last = performance.now(); }, { threshold: 0.05 }).observe(track);
  function tick(now) {
    requestAnimationFrame(tick);
    if (!active) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const maxX = Math.max(0, track.clientWidth - img.clientWidth - 4);
    if (mode === 'pause') {
      if (now >= pauseEnd) { mode = 'run'; img.src = PX_WALK[0]; }
      return;
    }
    x += dir * (track.clientWidth / 6.5) * dt;
    if (x >= maxX || x <= 0) {
      x = Math.min(Math.max(x, 0), maxX);
      dir *= -1; mode = 'pause'; pauseEnd = now + 1500;
      img.src = PX_FRONT; img.style.transform = `translateX(${x}px)`;
      return;
    }
    if (now - fLast > 130) { fLast = now; fi = (fi + 1) % 4; img.src = PX_WALK[fi]; }
    img.style.transform = `translateX(${x}px) scaleX(${dir})`;
  }
  requestAnimationFrame(tick);
})();
