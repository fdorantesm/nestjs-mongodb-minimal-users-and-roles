import { Day } from '@/core/domain/enums/days.enum';
import { WorkingDay } from '@/modules/keepers/domain/interfaces/working-day.interface';

export const workingDaysMock: WorkingDay[] = [
  {
    day: Day.MONDAY,
    blocks: [
      {
        start: {
          label: '09:00',
          value: 540,
        },
        end: {
          label: '17:00',
          value: 1020,
        },
      },
    ],
  },
  {
    day: Day.TUESDAY,
    blocks: [
      {
        start: {
          label: '09:00',
          value: 540,
        },
        end: {
          label: '17:00',
          value: 1020,
        },
      },
    ],
  },
  {
    day: Day.WEDNESDAY,
    blocks: [
      {
        start: {
          label: '09:00',
          value: 540,
        },
        end: {
          label: '17:00',
          value: 1020,
        },
      },
    ],
  },
  {
    day: Day.THURSDAY,
    blocks: [
      {
        start: {
          label: '09:00',
          value: 540,
        },
        end: {
          label: '17:00',
          value: 1020,
        },
      },
    ],
  },
  {
    day: Day.FRIDAY,
    blocks: [
      {
        start: {
          label: '09:00',
          value: 540,
        },
        end: {
          label: '13:00',
          value: 780,
        },
      },
    ],
  },
];
