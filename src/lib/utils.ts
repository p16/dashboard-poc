/**
 * Extract the source name from a source string
 * Splits by "-" and returns the first item
 * @param source - The source string (e.g., "o2-2025-11-11")
 * @returns The extracted source name (e.g., "o2")
 */
export function extractSourceName(source?: string): string {
  if (!source) return 'Unknown';
  return source.split('-')[0];
}
