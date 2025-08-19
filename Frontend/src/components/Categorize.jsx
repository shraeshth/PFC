// Map your fine-grained tags to broader categories
export const CATEGORY_LABELS = [
  "All",
  "Nature",
  "Urban",
  "People",
  "Art",
  "Travel",
];

// Basic keyword buckets (extend as needed)
const BUCKETS = {
  Nature: [
    "nature",
    "forest",
    "landscape",
    "mountains",
    "water",
    "ocean",
    "beach",
    "sunset",
    "winter",
    "snow",
    "desert",
  ],
  Urban: [
    "urban",
    "city",
    "architecture",
    "night",
    "lights",
    "street",
    "temple",
    "mandir",
  ],
  People: ["people", "portrait", "studio", "street"],
  Art: ["abstract", "geometry", "art", "fineart", "minimal"],
  Travel: ["travel", "place", "temple", "mandir", "city", "coastal"],
};

export function mapTagsToCategory(tags = []) {
  if (!Array.isArray(tags) || tags.length === 0) return "Art"; // safe default
  const lower = tags.map((t) => String(t).toLowerCase());

  // count hits per bucket
  const scores = {};
  for (const [cat, keys] of Object.entries(BUCKETS)) {
    scores[cat] = keys.some((k) => lower.includes(k)) ? 1 : 0;
  }

  // pick first with score
  const winner = Object.entries(scores).find(([, s]) => s > 0)?.[0];
  return winner || "Art";
}

export function buildCategoryCounts(images = []) {
  const counts = {
    All: images.length,
    Nature: 0,
    Urban: 0,
    People: 0,
    Art: 0,
    Travel: 0,
  };
  images.forEach((img) => {
    const cat = mapTagsToCategory(img.tags);
    if (counts[cat] != null) counts[cat] += 1;
  });
  return counts;
}
