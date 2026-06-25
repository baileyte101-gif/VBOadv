/**
 * Client-safe blog utility functions.
 * No Node.js built-ins (fs, path) — safe to import in both Server and Client components.
 * File-system access lives in blog.ts (server-only).
 */

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
