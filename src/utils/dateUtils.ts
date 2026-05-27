/**
 * Calculate age in full years from an ISO date string (YYYY-MM-DD).
 */
export function calculateAge(dateOfBirth: string, asOf: Date = new Date()): number {
  const [year, month, day] = dateOfBirth.split('-').map(Number);
  const birthDate = new Date(year, month - 1, day);

  let age = asOf.getFullYear() - birthDate.getFullYear();
  const monthDiff = asOf.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
