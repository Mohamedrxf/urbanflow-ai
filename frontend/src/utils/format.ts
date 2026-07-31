export const TREND_INTERVAL_MINUTES = 15;

export const formatClockTime = (date: Date): string =>
  isNaN(date.getTime()) ? "N/A" : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const formatMinutes = (value: unknown): string =>
  value != null ? `${value} min` : "N/A";

/** Build `points` evenly spaced samples ending now, one every TREND_INTERVAL_MINUTES. */
export const buildTrendSeries = <T extends object>(
  points: number,
  sample: (index: number) => T,
): Array<T & { time: string }> => {
  const now = Date.now();
  return Array.from({ length: points }, (_, index) => ({
    time: formatClockTime(
      new Date(now - (points - 1 - index) * TREND_INTERVAL_MINUTES * 60 * 1000),
    ),
    ...sample(index),
  }));
};
