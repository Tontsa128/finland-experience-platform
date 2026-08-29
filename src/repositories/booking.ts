import type { Booking, BookingItem, BookingAddon, BookingStatus } from '@/types';
import { BookingWorkflow } from '@/domain/booking';

export interface IBookingRepository {
  getAll(): Promise<Booking[]>;
  getById(id: number): Promise<Booking | null>;
  getByBookingNumber(bookingNumber: string): Promise<Booking | null>;
  getByCustomerId(customerId: number): Promise<Booking[]>;
  create(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking>;
  update(id: number, data: Partial<Booking>): Promise<Booking>;
  updateStatus(id: number, status: BookingStatus): Promise<Booking>;
  getItems(bookingId: number): Promise<BookingItem[]>;
  addItem(item: Omit<BookingItem, 'id' | 'createdAt'>): Promise<BookingItem>;
}

export class MockBookingRepository implements IBookingRepository {
  private bookings: Booking[] = [];
  private bookingItems: BookingItem[] = [];
  private nextBookingId = 1;
  private nextItemId = 1;

  constructor(initialBookings: Booking[], initialItems: BookingItem[]) {
    this.bookings = initialBookings;
    this.bookingItems = initialItems;
    this.nextBookingId = Math.max(...initialBookings.map((b) => b.id), 0) + 1;
    this.nextItemId = Math.max(...initialItems.map((i) => i.id), 0) + 1;
  }

  async getAll(): Promise<Booking[]> {
    return this.bookings;
  }

  async getById(id: number): Promise<Booking | null> {
    return this.bookings.find((b) => b.id === id) || null;
  }

  async getByBookingNumber(bookingNumber: string): Promise<Booking | null> {
    return this.bookings.find((b) => b.bookingNumber === bookingNumber) || null;
  }

  async getByCustomerId(customerId: number): Promise<Booking[]> {
    return this.bookings.filter((b) => b.customerId === customerId);
  }

  async create(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: this.nextBookingId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  async update(id: number, data: Partial<Booking>): Promise<Booking> {
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) {
      throw new Error(`Booking with id ${id} not found`);
    }
    Object.assign(booking, data, { updatedAt: new Date() });
    return booking;
  }

  async updateStatus(id: number, status: BookingStatus): Promise<Booking> {
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) {
      throw new Error(`Booking with id ${id} not found`);
    }

    if (!BookingWorkflow.canTransition(booking.status, status)) {
      throw new Error(`Cannot transition from ${booking.status} to ${status}`);
    }

    booking.status = status;
    booking.updatedAt = new Date();

    if (status === 'confirmed') {
      booking.confirmedAt = new Date();
    } else if (status === 'completed') {
      booking.completedAt = new Date();
    } else if (status === 'cancelled') {
      booking.cancelledAt = new Date();
    }

    return booking;
  }

  async getItems(bookingId: number): Promise<BookingItem[]> {
    return this.bookingItems.filter((item) => item.bookingId === bookingId);
  }

  async addItem(item: Omit<BookingItem, 'id' | 'createdAt'>): Promise<BookingItem> {
    const newItem: BookingItem = {
      ...item,
      id: this.nextItemId++,
      createdAt: new Date(),
    };
    this.bookingItems.push(newItem);
    return newItem;
  }
}
