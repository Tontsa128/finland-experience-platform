'use client';

import React, { useEffect, useState } from 'react';

type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';

type AdminBooking = {
  id: number;
  booking_number: string;
  status: string;
  total_price_eur: number;
  payment_status: PaymentStatus;
};

type RefundReason = 'requested_by_customer' | 'duplicate' | 'fraudulent';

export default function RefundManagement() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [refundReason, setRefundReason] = useState<RefundReason>('requested_by_customer');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchPaidBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/payments?status=paid', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const result: { bookings?: AdminBooking[] } = await response.json();
      setBookings(result.bookings ?? []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setMessage({ type: 'error', text: 'Failed to fetch bookings' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPaidBookings();
  }, []);

  const handleRefund = async () => {
    if (!selectedBooking) return;

    setProcessing(true);
    setMessage(null);

    try {
      const response = await fetch('/api/bookings/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedBooking.id,
          reason: refundReason,
        }),
      });

      const result: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Refund failed');
      }

      setMessage({
        type: 'success',
        text: `Refund processed successfully for booking #${selectedBooking.booking_number}`,
      });

      await fetchPaidBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error('Refund error:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to process refund',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Refund Management</h2>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Paid Bookings</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {bookings.length === 0 ? (
              <p className="text-gray-500">No paid bookings found</p>
            ) : (
              bookings.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`w-full text-left p-3 rounded border transition ${
                    selectedBooking?.id === booking.id
                      ? 'bg-blue-50 border-blue-500'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="font-semibold">#{booking.booking_number}</div>
                  <div className="text-sm text-gray-600">
                    €{booking.total_price_eur.toFixed(2)} · {booking.status}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {selectedBooking && (
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Refund Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Booking Number</label>
                <p className="text-lg font-semibold">#{selectedBooking.booking_number}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Amount to Refund</label>
                <p className="text-lg font-semibold text-green-600">
                  €{selectedBooking.total_price_eur.toFixed(2)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Refund Reason</label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value as RefundReason)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="requested_by_customer">Requested by Customer</option>
                  <option value="duplicate">Duplicate</option>
                  <option value="fraudulent">Fraudulent</option>
                </select>
              </div>

              <button
                onClick={handleRefund}
                disabled={processing}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
              >
                {processing ? 'Processing Refund...' : 'Process Refund'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
