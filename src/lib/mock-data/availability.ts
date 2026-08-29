import type { Availability } from '@/types';

function generateAvailability(experienceId: number, startDate: Date, daysToGenerate: number) {
  const availability: Availability[] = [];
  let id = 1;

  for (let i = 0; i < daysToGenerate; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    availability.push({
      id: id++,
      experienceId,
      availableDate: date,
      capacity: 8,
      booked: Math.floor(Math.random() * 5),
      timeSlot: i % 2 === 0 ? '14:00' : null,
      isInstantBooking: true,
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return availability;
}

const today = new Date();
const nextYear = new Date();
nextYear.setFullYear(nextYear.getFullYear() + 1);

export const MOCK_AVAILABILITY: Availability[] = [
  ...generateAvailability(1, today, 365),
  ...generateAvailability(2, today, 365),
  ...generateAvailability(3, today, 365),
];
