import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Languages: English, Urdu, Pashto, Sindhi, Punjabi, Arabic (4 are RTL)
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

const resources = {
  en: {
    translation: {
      brand: "Smart Tech Buy",
      nav: {
        home: "Home", features: "Features", laptop: "Laptop Advisor",
        mobile: "Mobile Advisor", compare: "Compare", stores: "Nearby Stores",
        assistant: "AI Assistant", dashboard: "Dashboard", career: "Career",
        feedback: "Feedback", contact: "Contact", login: "Login", signup: "Signup",
        logout: "Logout", start: "Start",
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
        laptops: "Laptops", mobiles: "Mobiles", price: "Price", askPlaceholder: "Ask me anything…",
      },
      assistant: { title: "AI Assistant", greeting: "Hi! I can help you choose a device, explain specs (RTX, AMOLED, NVMe, NPU) and guide you around the site. Ask away!" },
    },
  },
  ur: {
    translation: {
      brand: "اسمارٹ ٹیک بائے",
      nav: { home: "ہوم", features: "خصوصیات", laptop: "لیپ ٹاپ مشیر", mobile: "موبائل مشیر", compare: "موازنہ", stores: "قریبی اسٹورز", assistant: "اے آئی اسسٹنٹ", dashboard: "ڈیش بورڈ", career: "کیریئر", feedback: "رائے", contact: "رابطہ", login: "لاگ ان", signup: "سائن اپ", logout: "لاگ آؤٹ", start: "شروع کریں" },
      home: { badge: "اے آئی نالج بیسڈ ایکسپرٹ سسٹم · پرولوگ سے چلتا ہے", title1: "منتخب کریں", title2: "بہترین ڈیوائس", title3: "حقیقی اے آئی استدلال کے ساتھ", subtitle: "20 آسان سوالات کے جواب دیں۔ ہمارا پرولوگ انجن آپ کے بجٹ اور ضروریات کے مطابق بہترین لیپ ٹاپ یا فون تجویز کرتا ہے۔", cta: "مشیر شروع کریں", how: "طریقہ دیکھیں" },
      common: { theme: "تھیم", language: "زبان", startOver: "دوبارہ شروع کریں", back: "واپس", next: "اگلا", cancel: "منسوخ", send: "بھیجیں", laptops: "لیپ ٹاپس", mobiles: "موبائلز", price: "قیمت", askPlaceholder: "کچھ بھی پوچھیں…" },
      assistant: { title: "اے آئی اسسٹنٹ", greeting: "ہائے! میں آپ کو ڈیوائس منتخب کرنے میں مدد دے سکتا ہوں۔ پوچھیں!" },
    },
  },
  ps: {
    translation: {
      brand: "سمارټ ټیک پیر",
      nav: { home: "کور", features: "ځانګړتیاوې", laptop: "د لپ ټاپ مشاور", mobile: "د موبایل مشاور", compare: "پرتله", stores: "نږدې پلورنځي", assistant: "AI مرستندوی", dashboard: "ډشبورډ", career: "کیریر", feedback: "نظر", contact: "اړیکه", login: "ننوتل", signup: "نوم لیکنه", logout: "وتل", start: "پیل" },
      home: { badge: "AI پوهې پر بنسټ سیستم · د پرولوګ په واسطه", title1: "وټاکئ", title2: "غوره وسیله", title3: "د ریښتیني AI استدلال سره", subtitle: "۲۰ پوښتنو ته ځواب ورکړئ. زموږ پرولوګ انجن ستاسو د اړتیا سره سم غوره لپ ټاپ یا فون وړاندیز کوي.", cta: "مشاور پیل کړئ", how: "وګورئ څنګه کار کوي" },
      common: { theme: "تیم", language: "ژبه", startOver: "بیا پیل", back: "شاته", next: "بل", cancel: "لغوه", send: "واستوه", laptops: "لپ ټاپونه", mobiles: "موبایلونه", price: "بیه", askPlaceholder: "هرڅه وپوښتئ…" },
      assistant: { title: "AI مرستندوی", greeting: "سلام! زه تاسو سره د وسیلې په ټاکلو کې مرسته کولی شم. وپوښتئ!" },
    },
  },
  sd: {
    translation: {
      brand: "اسمارٽ ٽيڪ خريد",
      nav: { home: "گھر", features: "خصوصيتون", laptop: "ليپ ٽاپ صلاحڪار", mobile: "موبائل صلاحڪار", compare: "ڀيٽ", stores: "ويجھا اسٽور", assistant: "AI مددگار", dashboard: "ڊيش بورڊ", career: "ڪيريئر", feedback: "راءِ", contact: "رابطو", login: "لاگ ان", signup: "سائن اپ", logout: "لاگ آئوٽ", start: "شروع" },
      home: { badge: "AI ڄاڻ تي ٻڌل ماهر سرشتو · پرولوگ سان", title1: "چونڊيو", title2: "بهترين ڊوائس", title3: "حقيقي AI سوچ سان", subtitle: "20 سوالن جا جواب ڏيو. اسان جو پرولوگ انجڻ توهان جي ضرورتن مطابق بهترين ليپ ٽاپ يا فون تجويز ڪري ٿو.", cta: "صلاحڪار شروع ڪريو", how: "ڏسو ڪيئن ٿو هلي" },
      common: { theme: "ٿيم", language: "ٻولي", startOver: "وري شروع", back: "پوئتي", next: "اڳتي", cancel: "رد", send: "موڪليو", laptops: "ليپ ٽاپ", mobiles: "موبائل", price: "قيمت", askPlaceholder: "ڪجھ به پڇو…" },
      assistant: { title: "AI مددگار", greeting: "سلام! مان توهان کي ڊوائس چونڊڻ ۾ مدد ڪري سگھان ٿو. پڇو!" },
    },
  },
  pa: {
    translation: {
      brand: "ਸਮਾਰਟ ਟੈਕ ਬਾਏ",
      nav: { home: "ਘਰ", features: "ਖ਼ੂਬੀਆਂ", laptop: "ਲੈਪਟਾਪ ਸਲਾਹਕਾਰ", mobile: "ਮੋਬਾਈਲ ਸਲਾਹਕਾਰ", compare: "ਤੁਲਨਾ", stores: "ਨੇੜਲੇ ਸਟੋਰ", assistant: "AI ਸਹਾਇਕ", dashboard: "ਡੈਸ਼ਬੋਰਡ", career: "ਕਰੀਅਰ", feedback: "ਫੀਡਬੈਕ", contact: "ਸੰਪਰਕ", login: "ਲੌਗਇਨ", signup: "ਸਾਈਨ ਅੱਪ", logout: "ਲੌਗਆਉਟ", start: "ਸ਼ੁਰੂ" },
      home: { badge: "AI ਗਿਆਨ ਅਧਾਰਿਤ ਮਾਹਰ ਸਿਸਟਮ · ਪ੍ਰੋਲੋਗ ਨਾਲ", title1: "ਚੁਣੋ", title2: "ਸੰਪੂਰਨ ਡਿਵਾਈਸ", title3: "ਅਸਲੀ AI ਤਰਕ ਨਾਲ", subtitle: "20 ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ। ਸਾਡਾ ਪ੍ਰੋਲੋਗ ਇੰਜਣ ਤੁਹਾਡੀਆਂ ਲੋੜਾਂ ਮੁਤਾਬਕ ਵਧੀਆ ਲੈਪਟਾਪ ਜਾਂ ਫ਼ੋਨ ਸੁਝਾਉਂਦਾ ਹੈ।", cta: "ਸਲਾਹਕਾਰ ਸ਼ੁਰੂ ਕਰੋ", how: "ਵੇਖੋ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ" },
      common: { theme: "ਥੀਮ", language: "ਭਾਸ਼ਾ", startOver: "ਮੁੜ ਸ਼ੁਰੂ", back: "ਪਿੱਛੇ", next: "ਅੱਗੇ", cancel: "ਰੱਦ", send: "ਭੇਜੋ", laptops: "ਲੈਪਟਾਪ", mobiles: "ਮੋਬਾਈਲ", price: "ਕੀਮਤ", askPlaceholder: "ਕੁਝ ਵੀ ਪੁੱਛੋ…" },
      assistant: { title: "AI ਸਹਾਇਕ", greeting: "ਹੈਲੋ! ਮੈਂ ਡਿਵਾਈਸ ਚੁਣਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਪੁੱਛੋ!" },
    },
  },
  ar: {
    translation: {
      brand: "سمارت تك باي",
      nav: { home: "الرئيسية", features: "المميزات", laptop: "مستشار اللابتوب", mobile: "مستشار الجوال", compare: "مقارنة", stores: "متاجر قريبة", assistant: "مساعد AI", dashboard: "لوحة التحكم", career: "المسار المهني", feedback: "ملاحظات", contact: "اتصل", login: "تسجيل الدخول", signup: "إنشاء حساب", logout: "خروج", start: "ابدأ" },
      home: { badge: "نظام خبير قائم على المعرفة · مدعوم بـ Prolog", title1: "اختر", title2: "الجهاز المثالي", title3: "باستدلال ذكاء اصطناعي حقيقي", subtitle: "أجب عن 20 سؤالاً. يقوم محرك Prolog لدينا بترشيح أفضل لابتوب أو هاتف حسب ميزانيتك واحتياجاتك.", cta: "ابدأ المستشار", how: "شاهد كيف يعمل" },
      common: { theme: "السمة", language: "اللغة", startOver: "ابدأ من جديد", back: "رجوع", next: "التالي", cancel: "إلغاء", send: "إرسال", laptops: "لابتوبات", mobiles: "هواتف", price: "السعر", askPlaceholder: "اسألني أي شيء…" },
      assistant: { title: "مساعد AI", greeting: "مرحباً! يمكنني مساعدتك في اختيار جهاز وشرح المواصفات. اسأل!" },
    },
  },
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
