import { NextRequest, NextResponse } from "next/server";
import { createPaymentIntent } from "@/services/payment.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingId = Number(body.bookingId);
    const amount = Number(body.amount);
    const customerEmail = String(body.customerEmail || "");
    const customerName = String(body.customerName || "");

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return NextResponse.json({ error: "Valid bookingId is required" }, { status: 400 });
    }
    if (!Number.isInteger(amount) || amount < 50 || amount > 10000000) {
      return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
    }
    if (!customerEmail || !/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return NextResponse.json({ error: "Valid customer email is required" }, { status: 400 });
    }
    if (!customerName.trim()) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }

    const payment = await createPaymentIntent({
      bookingId,
      amount,
      customerEmail,
      customerName,
      description: body.description ? String(body.description).slice(0, 500) : undefined,
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create payment" },
      { status: 500 }
    );
  }
}
