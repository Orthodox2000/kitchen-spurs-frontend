// lib/date.ts

/**
 * Extracts YYYY-MM-DD from ISO timestamp
 * Example: 2025-06-24T15:00:00 -> 2025-06-24
 */
export function extractDate(iso: string): string {
  return iso.split("T")[0]
}

/**
 * Checks if ISO timestamp lies within date range
 */
export function isWithinRange(
  iso: string,
  start?: string,
  end?: string
): boolean {
  const date = extractDate(iso)
  if (start && date < start) return false
  if (end && date > end) return false
  return true
}