# Stripe Integration Setup Guide

## ✅ Completed: Stripe Payment System

### 1. **Dependencies** ✅
- `stripe` - Server-side SDK
- `@stripe/stripe-js` - Client-side library
- `@stripe/react-stripe-js` - React components

### 2. **Configuration** ✅
- `.env.example` updated with Stripe keys
- `src/lib/stripe.ts` - Stripe server client
- Environment variables:
  - `STRIPE_SECRET_KEY` - Server-side secret
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side key
  - `STRIPE_WEBHOOK_SECRET` - Webhook verification

### 3. **Payment Service** ✅
- `src/services/payment.service.ts`
  - `createPaymentIntent()` - Create Stripe Payment Intent
  - `confirmPayment()` - Confirm and update booking
  - `handleFailedPayment()` - Handle payment failures
  - `refundPayment()` - Process refunds

### 4. **API Endpoints** ✅
- `POST /api/checkout/create-payment-intent`
  - Calculates pricing securely on backend
  - Creates Stripe Payment Intent
  - Returns client secret
  
- `POST /api/webhooks/stripe`
  - Handles `payment_intent.succeeded` events
  - Updates booking status to "confirmed"
  - Handles payment failures and refunds

### 5. **Database Migration** ✅
- `supabase/migrations/0002_add_payment_fields.sql`
  - Added `payment_intent_id` column
  - Added `refund_id` column
  - Added `stripe_customer_id` column
  - Created indexes for performance

### 6. **Checkout UI** ✅
- `src/components/CheckoutFlow.tsx`
  - Stripe Elements integration
  - Card input field
  - Customer information form
  - Price breakdown display
  - Payment processing with error handling

---

## 🚀 Setup Instructions

### 1. Get Stripe Credentials
1. Create account at https://stripe.com
2. Go to Dashboard → Developers → API keys
3. Copy:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

### 2. Create Webhook Endpoint
```bash
# Using Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret (starts with whsec_)
```

### 3. Configure Environment
```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 4. Run Database Migrations
```bash
supabase db push
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Start Development Server
```bash
npm run dev

# In separate terminal, run Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 📋 Payment Flow

```
1. User fills checkout form
   ↓
2. Booking created in database
   ↓
3. POST /api/checkout/create-payment-intent
   - Backend calculates secure pricing
   - Creates Stripe Payment Intent
   - Returns client secret
   ↓
4. Frontend shows Stripe Elements card form
   ↓
5. User submits card details
   ↓
6. stripe.confirmCardPayment() processes payment
   ↓
7. Stripe webhook: payment_intent.succeeded
   ↓
8. POST /api/webhooks/stripe confirms booking
   ↓
9. Booking status → "confirmed"
   Payment status → "paid"
```

---

## 🔐 Security Features

✅ **Backend Price Calculation**
- Prices calculated on server, not client
- Prevents price manipulation attacks

✅ **Webhook Signature Verification**
- Every webhook verified with STRIPE_WEBHOOK_SECRET
- Prevents fraudulent webhook requests

✅ **Payment Intent Metadata**
- Booking ID embedded in payment intent
- Links payment to correct booking

✅ **Card Security**
- Cards never touch your server
- Stripe handles PCI compliance
- Client secret used for payment confirmation

---

## 🧪 Testing

### Test Card Numbers (Stripe)
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future date for expiry, any 3-digit CVC.

---

## 📚 API Response Examples

### Create Payment Intent Response
```json
{
  "clientSecret": "pi_1234567890_secret_abcdefg",
  "paymentIntentId": "pi_1234567890",
  "amount": 2999,
  "amountEur": 29.99,
  "breakdown": {
    "basePriceEur": 100,
    "adultTotalEur": 200,
    "childTotalEur": 0,
    "privateGroupSurchargeEur": 0,
    "subtotalEur": 100,
    "seasonalAdjustmentEur": -30,
    "addonsTotalEur": 15,
    "couponDiscountEur": 10,
    "taxesEur": 0,
    "totalEur": 29.99
  }
}
```

---

## ❌ Common Issues

### "STRIPE_SECRET_KEY is not set"
→ Add `STRIPE_SECRET_KEY` to `.env.local`

### Webhook not receiving events
→ Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### "Invalid signature"
→ Ensure `STRIPE_WEBHOOK_SECRET` matches CLI output

### Payment intent not creating
→ Check Stripe dashboard for error logs
→ Verify all required fields in request

---

## 📞 Next Steps

After Stripe setup is complete:

1. ✅ **Email Notifications**
   - Send confirmation emails on payment success
   - Send receipt emails
   - Send payment failure notifications

2. ✅ **Refunds Dashboard**
   - Admin panel to process refunds
   - Refund reason tracking
   - Email customer on refund

3. ✅ **Payment History**
   - Customer payment history view
   - Invoice generation
   - Tax receipts

4. ✅ **Advanced Features**
   - Installment payments
   - Saved payment methods
   - 3D Secure authentication
