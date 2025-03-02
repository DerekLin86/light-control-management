
/**
 * Convert a string to pascal case string;
 * @param str
 * @returns formatted string of pascal case.
 */
export function toPascalCase(str: string) {
  return str
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
