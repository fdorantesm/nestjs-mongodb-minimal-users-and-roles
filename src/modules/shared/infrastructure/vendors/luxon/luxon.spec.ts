import { Test, TestingModule } from '@nestjs/testing';

import { Luxon } from '@/modules/shared/infrastructure/vendors/luxon/luxon';

describe('LuxonService', () => {
  let service: Luxon;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Luxon],
    }).compile();

    service = module.get<Luxon>(Luxon);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create Date time object', () => {
    const now = service.create();
    const now2 = new Date();
    expect(now.toDateString()).toBe(now2.toDateString());
  });

  it('Create Date time christmas object', () => {
    const christmas = '2022-12-25T00:00:00';
    const christmasDate = new Date(christmas);
    const christmasDateTime = service.create(new Date(christmas));
    expect(christmasDate.toDateString()).toBe(christmasDateTime.toDateString());
  });

  it('Create Date range pair', () => {
    const minutes = 5;
    const now = service.create(new Date('2023-01-01 00:00:00'));
    const { from, to } = service.withinRange(now, minutes, 'minutes');
    const minuteDifference = Math.round((to.getTime() - from.getTime()) / 60000);
    expect(minuteDifference).toBe(minutes);
  });

  it('Add 1 day to date object', () => {
    const day = 1;
    const now = service.create(new Date('2023-01-01 00:00:00'));
    const future = service.in(now, day, 'day');
    expect(future.getDate() - now.getDate()).toBe(day);
  });

  it('Add 1 hour to date object', () => {
    const hour = 1;
    const now = service.create(new Date('2023-01-01 00:00:00'));
    const future = service.in(now, hour, 'hour');
    expect(future.getHours() - now.getHours()).toBe(hour);
  });

  it('Diff 1 day to date object', () => {
    const now = service.create(new Date('2023-01-01 00:00:00'));
    const future = service.create(new Date('2023-01-15 00:00:00'));
    expect(service.diff(now, future, 'days')).toBe(14);
  });

  it('Diff 12 hours to date object', () => {
    const now = service.create(new Date('2023-01-01 00:00:00'));
    const future = service.create(new Date('2023-01-01 12:00:00'));
    expect(service.diff(now, future, 'hours')).toBe(12);
  });
});
