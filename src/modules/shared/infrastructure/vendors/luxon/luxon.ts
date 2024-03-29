import { DateTime, DurationUnit } from 'luxon';

import { DateService } from '@/modules/shared/domain/contracts/date.service.contract';

export class Luxon implements DateService {
  public create(date?: Date): Date {
    const instance = (date ? DateTime.fromJSDate(date) : DateTime.now()).toUTC();

    return instance.toJSDate();
  }

  public createFromString(date: string): Date {
    return DateTime.fromISO(date).toUTC().toJSDate();
  }

  public createInstance(date?: Date): DateTime {
    return date ? DateTime.fromJSDate(date).toUTC() : DateTime.now().toUTC();
  }

  public withinRange(date: Date, value: number, unit: string): { from: Date; to: Date } {
    const from = this.create(date);
    const to = DateTime.fromJSDate(from)
      .plus({ [unit]: value })
      .toJSDate();
    return { from, to };
  }

  public in(date: Date, value: number, unit: string): Date {
    const now = DateTime.fromJSDate(date);
    return now.plus({ [unit]: value }).toJSDate();
  }

  public substract(date: Date, value: number, unit: string): Date {
    const now = this.createInstance(date);
    return now.minus({ [unit]: value }).toJSDate();
  }

  public diff(initial: Date, final: Date, unit: DurationUnit): number {
    const now = this.createInstance(initial);
    const compare = DateTime.fromJSDate(final);
    return compare.diff(now).as(unit);
  }

  public getClockTime(date: Date): string {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  public getDayName(date: Date): string {
    return this.createInstance(date).weekdayLong.toLocaleLowerCase();
  }

  public getDayNameFromISO(date: string): string {
    return DateTime.fromISO(date).weekdayLong.toLocaleLowerCase();
  }

  public getSqlDate(date: Date): string {
    return this.createInstance(date).toSQLDate();
  }

  public getSqlDateFromISO(date: string): string {
    return DateTime.fromISO(date).toSQLDate();
  }

  public setTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':');
    return this.createInstance(date)
      .set({ hour: Number(hours), minute: Number(minutes) })
      .toJSDate();
  }

  public timeToUTC(time: string): string {
    return DateTime.fromFormat(time, 'HH:mm').toUTC().toFormat('HH:mm');
  }

  public timeWithTimezone(time: string, timezone: string): string {
    return DateTime.fromFormat(time, 'HH:mm', { zone: 'utc' })
      .setZone(timezone)
      .toFormat('HH:mm');
  }

  public toISO(date: Date, timezone?: string): string {
    const instance = this.createInstance(date);
    return timezone ? instance.setZone(timezone).toISO() : instance.toISO();
  }

  public clockTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
  }
}
