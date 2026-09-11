import { differenceInYears, startOfWeek, format } from 'date-fns';
import type { AgeGroupId } from '@/types/child';

export function ageFromDob(dob: string): number {
  return differenceInYears(new Date(), new Date(dob));
}

export function suggestAgeGroup(dob: string): AgeGroupId {
  const age = ageFromDob(dob);
  if (age < 8) return '3-8';
  if (age < 13) return '8-13';
  return '13-18';
}

export function isoWeekStart(date: Date = new Date()): string {
  return format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');
}

export function formatFriendlyDate(iso: string): string {
  return format(new Date(iso), 'MMM d, yyyy');
}
