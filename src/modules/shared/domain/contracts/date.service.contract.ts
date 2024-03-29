export const DATE_SERVICE_TOKEN = 'DateService';

export interface DateService {
  create(date?: Date): Date;
  createFromString(date: string): Date;
  withinRange(date: Date, value: number, unit: string): { from: Date; to: Date };
  in(date: Date, value: number, unit: string): Date;
  substract(date: Date, value: number, unit: string): Date;
  diff(date: Date, date2: Date, unit: string): number;
  getClockTime(date: Date): string;
  getDayName(date: Date): string;
  getSqlDate(date: Date): string;
  setTime(date: Date, time: string): Date;
  timeToUTC(time: string): string;
  timeWithTimezone(time: string, timezone: string): string;
  toISO(date: Date, timezone?: string): string;
  getSqlDateFromISO(date: string): string;
  getDayNameFromISO(date: string): string;
  clockTimeToMinutes(time: string): number;
}
