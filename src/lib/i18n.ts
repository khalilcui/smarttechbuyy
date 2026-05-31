import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Languages: English, Urdu, Pashto, Sindhi, Punjabi, Arabic
export const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ur", label: "اردو", dir: "rtl" },
  { code: "ps", label: "پښتو", dir: "rtl" },
  { code: "sd", label: "سنڌي", dir: "rtl" },
  { code: "pa", label: "ਪੰਜਾਬੀ", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export function dirFor(code: string): "ltr" | "rtl" {
  return (LANGUAGES.find((l) => l.code === code)?.dir as "ltr" | "rtl") ?? "ltr";
}

// Master English dictionary — all other languages mirror this structure.
const en = {
  brand: "Smart Tech Buy",
  nav: {
    home: "Home", features: "Features", laptop: "Advisor", mobile: "Mobile Advisor",
    compare: "Compare", stores: "Nearby Stores", assistant: "AI Assistant",
    dashboard: "Dashboard", career: "Career", feedback: "Feedback", contact: "Contact",
    about: "About", login: "Login", signup: "Signup", logout: "Logout", start: "Start",
  },
  home: {
    badge: "AI Knowledge-Based Expert System · Powered by Prolog",
    title1: "Choose the", title2: "perfect device", title3: "with real AI reasoning",
    subtitle: "Answer 20 quick questions. Our SWI-Prolog inference engine scores 100+ attributes and recommends the best laptop or phone for your budget, career and needs.",
    cta: "Start the Advisor", how: "See how it works",
  },
  common: {
    theme: "Theme", language: "Language", startOver: "Start over",
    back: "Back", next: "Next", cancel: "Cancel", send: "Send",
    laptops: "Laptops", mobiles: "Mobiles", price: "Price",
    askPlaceholder: "Ask me anything…",
    loading: "Loading…", running: "Running Prolog inference…",
  },
  compare: {
    title: "Compare", subtitle: "Scores below are computed by the Prolog engine.",
    pickLeft: "Choose first device", pickRight: "Choose second device",
    gaming: "Gaming", ai: "AI", camera: "Camera", battery: "Battery",
    empty: "Loading catalog from Prolog…",
  },
  career: {
    title: "Career Advisor",
    subtitle: "Pick your career — Prolog reasons about the best laptops for it.",
    fullAdvisor: "Full Advisor",
    noMatch: "No matches found. Try the full Advisor for finer control.",
    match: "Match",
    careers: {
      software_engineer: "Software Engineer", ai_engineer: "AI Engineer",
      data_scientist: "Data Scientist", cyber_security: "Cyber Security Analyst",
      ethical_hacker: "Ethical Hacker", graphic_designer: "Graphic Designer",
      video_editor: "Video Editor", architect: "Architect",
      business: "Business Professional",
    },
  },
  stores: {
    title: "Nearby Stores",
    subtitle: "Trusted retailers ranked by distance from your current location.",
    locate: "Use my location", locating: "Finding your location…",
    locationOff: "Location off — showing all stores. Tap above for distance ranking.",
    denied: "Location permission denied. Showing all stores.",
    kmAway: "{{km}} km away", directions: "Get directions",
  },
  advisor: {
    title: "AI Advisor",
    questionOf: "Question {{cur}} of {{total}}",
    running: "Running Prolog inference…", scoring: "Scoring & ranking devices for your profile",
    yourRecs: "Your", recommendations: "recommendations",
    reasoned: "Reasoned & ranked by the Prolog engine.",
    bestLaptops: "Best Laptops", bestMobiles: "Best Mobiles",
    noMatch: "No devices matched your budget. Try increasing the budget and run again.",
    why: "Why this product?", matchScore: "Match score",
  },
  assistant: { title: "AI Assistant", greeting: "Hi! I can help you choose a device, explain specs (RTX, AMOLED, NVMe, NPU) and guide you around the site. Ask away!" },
};

// Translation helper — for languages that only need partial coverage we
// fall back to English keys automatically via i18next's fallbackLng.
const ur = {
  brand: "اسمارٹ ٹیک بائے",
  nav: { home: "ہوم", features: "خصوصیات", laptop: "مشیر", mobile: "موبائل مشیر", compare: "موازنہ", stores: "قریبی اسٹورز", assistant: "اے آئی اسسٹنٹ", dashboard: "ڈیش بورڈ", career: "کیریئر", feedback: "رائے", contact: "رابطہ", about: "متعلق", login: "لاگ ان", signup: "سائن اپ", logout: "لاگ آؤٹ", start: "شروع" },
  home: { badge: "اے آئی ایکسپرٹ سسٹم · پرولوگ", title1: "منتخب کریں", title2: "بہترین ڈیوائس", title3: "حقیقی اے آئی استدلال کے ساتھ", subtitle: "20 آسان سوالات کے جواب دیں۔ ہمارا پرولوگ انجن آپ کے بجٹ اور ضروریات کے مطابق بہترین لیپ ٹاپ یا فون تجویز کرتا ہے۔", cta: "مشیر شروع کریں", how: "طریقہ دیکھیں" },
  common: { theme: "تھیم", language: "زبان", startOver: "دوبارہ شروع", back: "واپس", next: "اگلا", cancel: "منسوخ", send: "بھیجیں", laptops: "لیپ ٹاپس", mobiles: "موبائلز", price: "قیمت", askPlaceholder: "کچھ بھی پوچھیں…", loading: "لوڈ ہو رہا ہے…", running: "پرولوگ چل رہا ہے…" },
  compare: { title: "موازنہ", subtitle: "اسکور پرولوگ انجن سے حاصل کیے گئے ہیں۔", pickLeft: "پہلی ڈیوائس چنیں", pickRight: "دوسری ڈیوائس چنیں", gaming: "گیمنگ", ai: "اے آئی", camera: "کیمرا", battery: "بیٹری", empty: "کیٹلاگ لوڈ ہو رہا ہے…" },
  career: { title: "کیریئر مشیر", subtitle: "اپنا کیریئر چنیں — پرولوگ آپ کے لیے بہترین لیپ ٹاپ تجویز کرے گا۔", fullAdvisor: "مکمل مشیر", noMatch: "کوئی نتیجہ نہیں ملا۔", match: "میچ", careers: { software_engineer: "سافٹ ویئر انجینئر", ai_engineer: "اے آئی انجینئر", data_scientist: "ڈیٹا سائنسدان", cyber_security: "سائبر سیکیورٹی ماہر", ethical_hacker: "ایتھیکل ہیکر", graphic_designer: "گرافک ڈیزائنر", video_editor: "ویڈیو ایڈیٹر", architect: "آرکیٹیکٹ", business: "بزنس پروفیشنل" } },
  stores: { title: "قریبی اسٹورز", subtitle: "آپ کے قریبی اسٹورز فاصلے کے حساب سے۔", locate: "میری لوکیشن استعمال کریں", locating: "لوکیشن تلاش کر رہے ہیں…", locationOff: "لوکیشن بند ہے — سب اسٹورز دکھائے جا رہے ہیں۔", denied: "اجازت نہیں دی گئی۔", kmAway: "{{km}} کلومیٹر دور", directions: "راستہ حاصل کریں" },
  advisor: { title: "اے آئی مشیر", questionOf: "سوال {{cur}} از {{total}}", running: "پرولوگ چل رہا ہے…", scoring: "ڈیوائسز کی درجہ بندی ہو رہی ہے", yourRecs: "آپ کی", recommendations: "تجاویز", reasoned: "پرولوگ انجن سے درجہ بند۔", bestLaptops: "بہترین لیپ ٹاپس", bestMobiles: "بہترین موبائلز", noMatch: "آپ کے بجٹ میں کوئی ڈیوائس نہیں ملی۔", why: "یہ پروڈکٹ کیوں؟", matchScore: "میچ اسکور" },
  assistant: { title: "اے آئی اسسٹنٹ", greeting: "ہائے! میں ڈیوائس چننے میں مدد کر سکتا ہوں۔" },
};

const ar = {
  brand: "سمارت تك باي",
  nav: { home: "الرئيسية", features: "المميزات", laptop: "المستشار", mobile: "مستشار الجوال", compare: "مقارنة", stores: "متاجر قريبة", assistant: "المساعد", dashboard: "لوحة التحكم", career: "المهنة", feedback: "ملاحظات", contact: "اتصل", about: "حول", login: "دخول", signup: "تسجيل", logout: "خروج", start: "ابدأ" },
  home: { badge: "نظام خبير قائم على المعرفة · Prolog", title1: "اختر", title2: "الجهاز المثالي", title3: "باستدلال ذكاء اصطناعي حقيقي", subtitle: "أجب عن 20 سؤالاً. يرشّح محرك Prolog أفضل لابتوب أو هاتف حسب ميزانيتك واحتياجاتك.", cta: "ابدأ المستشار", how: "شاهد كيف يعمل" },
  common: { theme: "السمة", language: "اللغة", startOver: "ابدأ من جديد", back: "رجوع", next: "التالي", cancel: "إلغاء", send: "إرسال", laptops: "لابتوبات", mobiles: "هواتف", price: "السعر", askPlaceholder: "اسألني…", loading: "جارٍ التحميل…", running: "محرك Prolog يعمل…" },
  compare: { title: "مقارنة", subtitle: "النتائج محسوبة بواسطة Prolog.", pickLeft: "اختر الجهاز الأول", pickRight: "اختر الجهاز الثاني", gaming: "ألعاب", ai: "ذكاء", camera: "كاميرا", battery: "بطارية", empty: "تحميل…" },
  career: { title: "مستشار المهنة", subtitle: "اختر مهنتك — سيوصي Prolog بأفضل لابتوب.", fullAdvisor: "المستشار الكامل", noMatch: "لا توجد نتائج.", match: "مطابقة", careers: { software_engineer: "مهندس برمجيات", ai_engineer: "مهندس ذكاء", data_scientist: "عالم بيانات", cyber_security: "أمن سيبراني", ethical_hacker: "هاكر أخلاقي", graphic_designer: "مصمم", video_editor: "محرر فيديو", architect: "معماري", business: "محترف أعمال" } },
  stores: { title: "متاجر قريبة", subtitle: "متاجر موثوقة مرتبة حسب البعد.", locate: "استخدم موقعي", locating: "جارٍ تحديد الموقع…", locationOff: "الموقع متوقف.", denied: "تم رفض الإذن.", kmAway: "{{km}} كم", directions: "الاتجاهات" },
  advisor: { title: "المستشار", questionOf: "سؤال {{cur}} من {{total}}", running: "محرك Prolog…", scoring: "ترتيب الأجهزة", yourRecs: "نتائجك", recommendations: "التوصيات", reasoned: "مرتبة بواسطة Prolog.", bestLaptops: "أفضل لابتوبات", bestMobiles: "أفضل هواتف", noMatch: "لا توجد أجهزة ضمن ميزانيتك.", why: "لماذا هذا المنتج؟", matchScore: "درجة المطابقة" },
  assistant: { title: "المساعد", greeting: "مرحباً! أستطيع المساعدة في اختيار جهاز." },
};

const ps = {
  brand: "سمارټ ټیک",
  nav: { home: "کور", features: "ځانګړتیاوې", laptop: "مشاور", mobile: "د موبایل مشاور", compare: "پرتله", stores: "نږدې پلورنځي", assistant: "AI مرستندوی", dashboard: "ډشبورډ", career: "کیریر", feedback: "نظر", contact: "اړیکه", about: "په اړه", login: "ننوتل", signup: "نوم لیکنه", logout: "وتل", start: "پیل" },
  home: { badge: "AI پر بنسټ سیستم · پرولوګ", title1: "وټاکئ", title2: "غوره وسیله", title3: "د ریښتیني AI سره", subtitle: "۲۰ پوښتنو ته ځواب ورکړئ. پرولوګ ستاسو لپاره غوره لپ ټاپ یا فون وړاندیز کوي.", cta: "مشاور پیل کړئ", how: "وګورئ" },
  common: { theme: "تیم", language: "ژبه", startOver: "بیا پیل", back: "شاته", next: "بل", cancel: "لغوه", send: "واستوه", laptops: "لپ ټاپونه", mobiles: "موبایلونه", price: "بیه", askPlaceholder: "وپوښتئ…", loading: "روان دی…", running: "پرولوګ روان دی…" },
  compare: { title: "پرتله", subtitle: "نمرې د پرولوګ څخه دي.", pickLeft: "لومړۍ وسیله", pickRight: "دویمه وسیله", gaming: "لوبه", ai: "AI", camera: "کیمره", battery: "بیټرۍ", empty: "لوډ کیږي…" },
  career: { title: "د کیریر مشاور", subtitle: "خپل کیریر وټاکئ.", fullAdvisor: "بشپړ مشاور", noMatch: "هیڅ نتیجه ونه موندل شوه.", match: "میچ", careers: { software_engineer: "د سافټویر انجنیر", ai_engineer: "د AI انجنیر", data_scientist: "د ډیټا ساینسپوه", cyber_security: "سایبر امنیت", ethical_hacker: "اخلاقي هیکر", graphic_designer: "ګرافیک ډیزاینر", video_editor: "ویډیو ایډیټر", architect: "انجنیر", business: "د سوداګرۍ متخصص" } },
  stores: { title: "نږدې پلورنځي", subtitle: "د واټن له مخې ترتیب شوي.", locate: "زما موقعیت", locating: "موقعیت لټول…", locationOff: "موقعیت بند دی.", denied: "اجازه ونه ورکړل شوه.", kmAway: "{{km}} کیلومتر لرې", directions: "لاره ترلاسه کړئ" },
  advisor: { title: "AI مشاور", questionOf: "پوښتنه {{cur}} له {{total}}", running: "پرولوګ روان دی…", scoring: "د وسایلو درجه بندي…", yourRecs: "ستاسو", recommendations: "وړاندیزونه", reasoned: "د پرولوګ له مخې.", bestLaptops: "غوره لپ ټاپونه", bestMobiles: "غوره موبایلونه", noMatch: "هیڅ وسیله ونه موندل شوه.", why: "ولې دا توکی؟", matchScore: "د میچ نمره" },
  assistant: { title: "AI مرستندوی", greeting: "سلام! زه مرسته کولی شم." },
};

const sd = {
  brand: "اسمارٽ ٽيڪ",
  nav: { home: "گھر", features: "خصوصيتون", laptop: "صلاحڪار", mobile: "موبائل صلاحڪار", compare: "ڀيٽ", stores: "ويجھا اسٽور", assistant: "AI مددگار", dashboard: "ڊيش بورڊ", career: "ڪيريئر", feedback: "راءِ", contact: "رابطو", about: "بابت", login: "لاگ ان", signup: "سائن اپ", logout: "لاگ آئوٽ", start: "شروع" },
  home: { badge: "AI سرشتو · پرولوگ", title1: "چونڊيو", title2: "بهترين ڊوائس", title3: "حقيقي AI سان", subtitle: "20 سوالن جا جواب ڏيو. اسان جو پرولوگ انجڻ توهان لاءِ بهترين ڊوائس تجويز ڪندو.", cta: "صلاحڪار شروع ڪريو", how: "ڏسو" },
  common: { theme: "ٿيم", language: "ٻولي", startOver: "وري شروع", back: "پوئتي", next: "اڳتي", cancel: "رد", send: "موڪليو", laptops: "ليپ ٽاپ", mobiles: "موبائل", price: "قيمت", askPlaceholder: "پڇو…", loading: "لوڊ پيو ٿئي…", running: "پرولوگ هلي رهيو آهي…" },
  compare: { title: "ڀيٽ", subtitle: "سکور پرولوگ کان حاصل ڪيل.", pickLeft: "پهرين ڊوائس", pickRight: "ٻي ڊوائس", gaming: "گيمنگ", ai: "AI", camera: "ڪئميرا", battery: "بيٽري", empty: "لوڊ پيو ٿئي…" },
  career: { title: "ڪيريئر صلاحڪار", subtitle: "پنهنجو ڪيريئر چونڊيو.", fullAdvisor: "مڪمل صلاحڪار", noMatch: "ڪو نتيجو نه مليو.", match: "ميچ", careers: { software_engineer: "سافٽ ويئر انجنيئر", ai_engineer: "AI انجنيئر", data_scientist: "ڊيٽا سائنسدان", cyber_security: "سائبر سيڪيورٽي", ethical_hacker: "اخلاقي هيڪر", graphic_designer: "گرافڪ ڊيزائنر", video_editor: "وڊيو ايڊيٽر", architect: "آرڪيٽڪٽ", business: "ڪاروباري" } },
  stores: { title: "ويجھا اسٽور", subtitle: "فاصلي موجب ترتيب.", locate: "منهنجي لوڪيشن", locating: "لوڪيشن ڳولي رهيا آهيون…", locationOff: "لوڪيشن بند آهي.", denied: "اجازت نه ملي.", kmAway: "{{km}} ڪلوميٽر پري", directions: "رستو حاصل ڪريو" },
  advisor: { title: "AI صلاحڪار", questionOf: "سوال {{cur}} مان {{total}}", running: "پرولوگ هلي رهيو آهي…", scoring: "ڊوائيسز جي درجه بندي…", yourRecs: "توهان جون", recommendations: "تجويزون", reasoned: "پرولوگ کان ترتيب ڏنل.", bestLaptops: "بهترين ليپ ٽاپ", bestMobiles: "بهترين موبائل", noMatch: "ڪا ڊوائس نه ملي.", why: "هي پراڊڪٽ ڇو؟", matchScore: "ميچ سکور" },
  assistant: { title: "AI مددگار", greeting: "سلام! مان مدد ڪري سگھان ٿو." },
};

const pa = {
  brand: "ਸਮਾਰਟ ਟੈਕ",
  nav: { home: "ਘਰ", features: "ਖ਼ੂਬੀਆਂ", laptop: "ਸਲਾਹਕਾਰ", mobile: "ਮੋਬਾਈਲ ਸਲਾਹਕਾਰ", compare: "ਤੁਲਨਾ", stores: "ਨੇੜਲੇ ਸਟੋਰ", assistant: "AI ਸਹਾਇਕ", dashboard: "ਡੈਸ਼ਬੋਰਡ", career: "ਕਰੀਅਰ", feedback: "ਫੀਡਬੈਕ", contact: "ਸੰਪਰਕ", about: "ਬਾਰੇ", login: "ਲੌਗਇਨ", signup: "ਸਾਈਨ ਅੱਪ", logout: "ਲੌਗਆਉਟ", start: "ਸ਼ੁਰੂ" },
  home: { badge: "AI ਮਾਹਰ ਸਿਸਟਮ · ਪ੍ਰੋਲੋਗ", title1: "ਚੁਣੋ", title2: "ਸੰਪੂਰਨ ਡਿਵਾਈਸ", title3: "ਅਸਲੀ AI ਨਾਲ", subtitle: "20 ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ। ਪ੍ਰੋਲੋਗ ਤੁਹਾਡੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਡਿਵਾਈਸ ਸੁਝਾਏਗਾ।", cta: "ਸ਼ੁਰੂ ਕਰੋ", how: "ਵੇਖੋ" },
  common: { theme: "ਥੀਮ", language: "ਭਾਸ਼ਾ", startOver: "ਮੁੜ ਸ਼ੁਰੂ", back: "ਪਿੱਛੇ", next: "ਅੱਗੇ", cancel: "ਰੱਦ", send: "ਭੇਜੋ", laptops: "ਲੈਪਟਾਪ", mobiles: "ਮੋਬਾਈਲ", price: "ਕੀਮਤ", askPlaceholder: "ਪੁੱਛੋ…", loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…", running: "ਪ੍ਰੋਲੋਗ ਚੱਲ ਰਿਹਾ ਹੈ…" },
  compare: { title: "ਤੁਲਨਾ", subtitle: "ਅੰਕ ਪ੍ਰੋਲੋਗ ਤੋਂ ਆਏ ਹਨ।", pickLeft: "ਪਹਿਲੀ ਡਿਵਾਈਸ", pickRight: "ਦੂਜੀ ਡਿਵਾਈਸ", gaming: "ਗੇਮਿੰਗ", ai: "AI", camera: "ਕੈਮਰਾ", battery: "ਬੈਟਰੀ", empty: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…" },
  career: { title: "ਕਰੀਅਰ ਸਲਾਹਕਾਰ", subtitle: "ਆਪਣਾ ਕਰੀਅਰ ਚੁਣੋ।", fullAdvisor: "ਪੂਰਾ ਸਲਾਹਕਾਰ", noMatch: "ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ।", match: "ਮੈਚ", careers: { software_engineer: "ਸਾਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ", ai_engineer: "AI ਇੰਜੀਨੀਅਰ", data_scientist: "ਡਾਟਾ ਸਾਇੰਟਿਸਟ", cyber_security: "ਸਾਈਬਰ ਸਿਕਿਉਰਿਟੀ", ethical_hacker: "ਨੈਤਿਕ ਹੈਕਰ", graphic_designer: "ਗ੍ਰਾਫਿਕ ਡਿਜ਼ਾਈਨਰ", video_editor: "ਵੀਡੀਓ ਐਡੀਟਰ", architect: "ਆਰਕੀਟੈਕਟ", business: "ਬਿਜ਼ਨਸ ਪ੍ਰੋਫੈਸ਼ਨਲ" } },
  stores: { title: "ਨੇੜਲੇ ਸਟੋਰ", subtitle: "ਦੂਰੀ ਮੁਤਾਬਕ ਕ੍ਰਮਬੱਧ।", locate: "ਮੇਰੀ ਲੋਕੇਸ਼ਨ", locating: "ਲੋਕੇਸ਼ਨ ਲੱਭ ਰਹੇ ਹਾਂ…", locationOff: "ਲੋਕੇਸ਼ਨ ਬੰਦ ਹੈ।", denied: "ਇਜਾਜ਼ਤ ਨਹੀਂ ਮਿਲੀ।", kmAway: "{{km}} ਕਿਮੀ ਦੂਰ", directions: "ਰਾਹ ਦੇਖੋ" },
  advisor: { title: "AI ਸਲਾਹਕਾਰ", questionOf: "ਸਵਾਲ {{cur}} / {{total}}", running: "ਪ੍ਰੋਲੋਗ ਚੱਲ ਰਿਹਾ ਹੈ…", scoring: "ਡਿਵਾਈਸਾਂ ਦੀ ਦਰਜਾਬੰਦੀ…", yourRecs: "ਤੁਹਾਡੀਆਂ", recommendations: "ਸਿਫਾਰਸ਼ਾਂ", reasoned: "ਪ੍ਰੋਲੋਗ ਦੁਆਰਾ।", bestLaptops: "ਸਭ ਤੋਂ ਵਧੀਆ ਲੈਪਟਾਪ", bestMobiles: "ਸਭ ਤੋਂ ਵਧੀਆ ਮੋਬਾਈਲ", noMatch: "ਕੋਈ ਡਿਵਾਈਸ ਨਹੀਂ ਮਿਲੀ।", why: "ਇਹ ਪ੍ਰੋਡਕਟ ਕਿਉਂ?", matchScore: "ਮੈਚ ਅੰਕ" },
  assistant: { title: "AI ਸਹਾਇਕ", greeting: "ਹੈਲੋ! ਮੈਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।" },
};

const resources = {
  en: { translation: en },
  ur: { translation: ur },
  ps: { translation: ps },
  sd: { translation: sd },
  pa: { translation: pa },
  ar: { translation: ar },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
