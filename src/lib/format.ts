const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Formats an ISO date ("2026-07-03") as "3 Jul 2026".
 * Parsed by hand so the server and browser always agree, regardless of timezone.
 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day || month > 12) return iso
  return `${day} ${MONTHS[month - 1]} ${year}`
}
