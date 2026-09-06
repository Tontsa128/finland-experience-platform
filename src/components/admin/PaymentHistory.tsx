'use client';

import React, { useEffect, useState } from 'react';

type PaymentFilter = 'all' | 'paid' | 'unpaid' | 'failed' | 'refunded';

type AdminBooking = {
  id: number;
  booking_number: string;
  status: string;
  total_price_eur: number;
  payment_status: PaymentFilter;
  created_at: string;
  payment_intent_id: string | null;
};

/**
 * Admin Payment History Component.
 * Payment data is loaded through a server API so the Supabase service-role key
 * never reaches the browser bundle.
 */
export default function PaymentHistory() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PaymentFilter>('all');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/payments?status=${filter}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }

        const result: { bookings?: AdminBooking[] } = await response.json();
        setBookings(result.bookings ?? []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchBookings();
  }, [filter]);

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: 'bg-green-100 text-green-800',
      unpaid: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filterOptions: Array<{ value: PaymentFilter; label: string }> = [
    { value: 'all', label: 'All Payments' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
  ];

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment History</h2>

      <div className="flex gap-2 flex-wrap">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Booking #</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Payment Intent</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">#{booking.booking_number}</td>
                  <td className="px-6 py-4">€{booking.total_price_eur.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(booking.payment_status)}`}>
                      {booking.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                    {booking.payment_intent_id ? `${booking.payment_intent_id.slice(0, 20)}...` : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            €{bookings.filter((b) => b.payment_status === 'paid').reduce((sum, b) => sum + b.total_price_eur, 0).toFixed(2)}
          </div>
          <div className="text-sm text-green-700">Total Paid</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">
            {bookings.filter((b) => b.payment_status === 'unpaid').length}
          </div>
          <div className="text-sm text-yellow-700">Pending Payments</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">
            {bookings.filter((b) => b.payment_status === 'failed').length}
          </div>
          <div className="text-sm text-red-700">Failed Payments</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            €{bookings.filter((b) => b.payment_status === 'refunded').reduce((sum, b) => sum + b.total_price_eur, 0).toFixed(2)}
          </div>
          <div className="text-sm text-blue-700">Total Refunded</div>
        </div>
      </div>
    </div>
  );
}
