/**
 * Bejubaan Ann Seva Foundation – Class Name Utility
 *
 * Merges class names, filtering out falsy values.
 * Lightweight replacement for clsx/classnames.
 *
 * @param  {...(string|boolean|null|undefined)} args
 * @returns {string}
 */
export function cn(...args) {
  return args.filter(Boolean).join(' ').trim();
}
