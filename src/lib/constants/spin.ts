
export const SPIN_REWARD_THEMES = [
  {
    id: "blue_gradient",
    label: "Blue Gradient",
    color: "url(#blueGradientSegment)",
    textColour: "#FFFFFF",
    previewBg: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)", // Approximation for UI
    previewText: "#FFFFFF",
  },
  {
    id: "purple_text_gradient",
    label: "Purple Text (Gradient)",
    color: "#FFFFFF",
    textColour: "url(#purpleGradient2)",
    previewBg: "#FFFFFF",
    previewText: "#8B7FD9", // Fallback/Approx
  },
  {
    id: "purple_gradient",
    label: "Purple Gradient",
    color: "url(#purpleGradient1)",
    textColour: "#FFFFFF",
    previewBg: "linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)", // Approx
    previewText: "#FFFFFF",
  },
  {
    id: "blue_solid",
    label: "Blue Solid",
    color: "#42C5F5",
    textColour: "#FFFFFF",
    previewBg: "#42C5F5",
    previewText: "#FFFFFF",
  },
  {
    id: "purple_text_solid",
    label: "Purple Text (Solid)",
    color: "#FFFFFF",
    textColour: "#8B7FD9",
    previewBg: "#FFFFFF",
    previewText: "#8B7FD9",
  },
];

export const REWARD_TYPES = [
  { value: "airtime", label: "Airtime" },
  { value: "discount", label: "Discount" },
  { value: "cash", label: "Cash" },
  { value: "bonus", label: "Bonus" },
  { value: "none", label: "None (Try Again)" },
];
