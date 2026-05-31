// 20 onboarding questions. Each answer becomes a Prolog `user_pref/2` fact.
// `key` = the user_pref key the Prolog engine reasons over.

export interface QOption {
  label: string;
  value: string | number;
}

export interface Question {
  id: number;
  key: string;
  title: string;
  hint?: string;
  options: QOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    key: "budget",
    title: "What is your budget range?",
    hint: "We match products within ~15% of this.",
    options: [
      { label: "Under $500", value: 500 },
      { label: "$500 – $900", value: 900 },
      { label: "$900 – $1400", value: 1400 },
      { label: "$1400 – $2000", value: 2000 },
      { label: "$2000+", value: 4000 },
    ],
  },
  {
    id: 2,
    key: "usetype",
    title: "Is this for personal or professional use?",
    options: [
      { label: "Personal", value: "personal" },
      { label: "Professional", value: "professional" },
      { label: "Both", value: "both" },
    ],
  },
  {
    id: 3,
    key: "usage",
    title: "What is your main usage purpose?",
    options: [
      { label: "Gaming", value: "gaming" },
      { label: "Programming", value: "programming" },
      { label: "AI / Machine Learning", value: "ai" },
      { label: "Design", value: "design" },
      { label: "Video Editing", value: "video" },
      { label: "Office Work", value: "office" },
      { label: "Studying", value: "study" },
      { label: "Browsing", value: "browsing" },
    ],
  },
  {
    id: 4,
    key: "profile",
    title: "Are you a student, gamer, or professional?",
    options: [
      { label: "Student", value: "student" },
      { label: "Gamer", value: "gamer" },
      { label: "Professional", value: "professional" },
    ],
  },
  {
    id: 5,
    key: "career",
    title: "What is your career goal?",
    options: [
      { label: "Software Engineer", value: "software_engineer" },
      { label: "AI Engineer", value: "ai_engineer" },
      { label: "Data Scientist", value: "data_scientist" },
      { label: "Cyber Security Analyst", value: "cyber_security" },
      { label: "Ethical Hacker", value: "ethical_hacker" },
      { label: "Graphic Designer", value: "graphic_designer" },
      { label: "Video Editor", value: "video_editor" },
      { label: "Architect", value: "architect" },
      { label: "Business Professional", value: "business" },
    ],
  },
  {
    id: 6,
    key: "device",
    title: "Do you want a laptop, mobile, or both?",
    options: [
      { label: "Laptop", value: "laptop" },
      { label: "Mobile", value: "mobile" },
      { label: "Both", value: "both" },
    ],
  },
  {
    id: 7,
    key: "portability",
    title: "Do you prefer performance or portability?",
    options: [
      { label: "Performance", value: "performance" },
      { label: "Portability", value: "portable" },
      { label: "Balanced", value: "balanced" },
    ],
  },
  {
    id: 8,
    key: "ram",
    title: "Minimum RAM requirement?",
    options: [
      { label: "8 GB", value: 8 },
      { label: "16 GB", value: 16 },
      { label: "32 GB", value: 32 },
    ],
  },
  {
    id: 9,
    key: "storage",
    title: "Storage preference (SSD size)?",
    options: [
      { label: "256 GB", value: 256 },
      { label: "512 GB", value: 512 },
      { label: "1 TB", value: 1024 },
      { label: "2 TB", value: 2048 },
    ],
  },
  {
    id: 10,
    key: "cpu_pref",
    title: "Intel or AMD preference?",
    options: [
      { label: "Intel", value: "intel" },
      { label: "AMD", value: "amd" },
      { label: "Apple Silicon", value: "apple" },
      { label: "No preference", value: "any" },
    ],
  },
  {
    id: 11,
    key: "gpu",
    title: "Do you need a GPU for gaming or AI tasks?",
    options: [
      { label: "Yes — for gaming", value: "gaming" },
      { label: "Yes — for AI / ML", value: "ai" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 12,
    key: "ai",
    title: "Are you working in AI/ML or data science?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 13,
    key: "battery",
    title: "Battery priority?",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  },
  {
    id: 14,
    key: "light",
    title: "Do you prefer a lightweight device?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 15,
    key: "camera_phone",
    title: "Do you need a camera-focused phone?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 16,
    key: "gaming_phone",
    title: "Do you need a gaming phone?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 17,
    key: "security",
    title: "Do you need fingerprint or face unlock / strong security?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 18,
    key: "touch",
    title: "Do you need touchscreen or stylus support?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 19,
    key: "brand",
    title: "Any brand preference?",
    options: [
      { label: "No preference", value: "any" },
      { label: "Apple", value: "apple" },
      { label: "Asus", value: "asus" },
      { label: "Dell", value: "dell" },
      { label: "Lenovo", value: "lenovo" },
      { label: "HP", value: "hp" },
      { label: "Samsung", value: "samsung" },
      { label: "Google", value: "google" },
    ],
  },
  {
    id: 20,
    key: "future",
    title: "Any special requirement — do you want future-proof specs?",
    options: [
      { label: "Yes, future-proof", value: "yes" },
      { label: "No, just my needs", value: "no" },
    ],
  },
];
