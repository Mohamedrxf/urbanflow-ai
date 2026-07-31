type Tone = "green" | "yellow" | "orange" | "red" | "blue" | "gray";

const TONE_BADGE_CLASSES: Record<Tone, string> = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  orange: "bg-orange-100 text-orange-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  gray: "bg-gray-100 text-gray-800",
};

const CONGESTION_TONES: Record<string, Tone> = { low: "green", medium: "yellow", high: "red" };
const SEVERITY_TONES: Record<string, Tone> = { low: "yellow", medium: "orange", high: "red" };
const FLEET_EFFICIENCY_TONES: Record<string, Tone> = { low: "red", medium: "yellow", high: "green" };
const PRIORITY_TONES: Record<string, Tone> = {
  low: "gray",
  normal: "blue",
  high: "orange",
  critical: "red",
};

export const LEVEL_VALUES: Record<string, number> = { low: 1, medium: 2, high: 3 };

export const normalizeLevel = (level: unknown): string => String(level ?? "").toLowerCase();

const toneOf = (tones: Record<string, Tone>, level: unknown): Tone =>
  tones[normalizeLevel(level)] ?? "gray";

export const getCongestionBadgeClasses = (level: unknown) =>
  TONE_BADGE_CLASSES[toneOf(CONGESTION_TONES, level)];

export const getFleetEfficiencyBadgeClasses = (level: unknown) =>
  TONE_BADGE_CLASSES[toneOf(FLEET_EFFICIENCY_TONES, level)];

export const getEmergencyPriorityBadgeClasses = (level: unknown) =>
  TONE_BADGE_CLASSES[toneOf(PRIORITY_TONES, level)];

export const getCongestionMapColor = (level: unknown) => toneOf(CONGESTION_TONES, level);

export const getSeverityMapColor = (level: unknown) => toneOf(SEVERITY_TONES, level);

export const getCongestionValue = (level: unknown) => LEVEL_VALUES[normalizeLevel(level)] ?? 0;

export const countByLevel = <T,>(items: T[], field: keyof T, level: string) =>
  items.filter((item) => normalizeLevel(item[field]) === normalizeLevel(level)).length;
