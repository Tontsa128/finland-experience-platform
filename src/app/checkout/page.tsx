'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ExperienceService } from '@/services/experience';
import { PricingCalculator } from '@/domain/pricing';
import { AvailabilityService } from '@/services/availability';
import { BookingService } from '@/domain/booking';
import { CouponService } from '@/services/coupon';
import { formatCurrency } from '@/lib/utils';
import { ChevronRight, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

interface BookingState {
  step: 'selection' | 'details' | 'payment' | 'confirmation';
  experience: any;
  date: string;
  time: string;
  adults: number;
  children: number;
  privateGroup: boolean;
  selectedAddons: Array<{ id: number; quantity: number }>;
  couponCode: string;
  couponValid: boolean;
  couponDiscount: number;
  pricing: any;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingNumber: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<BookingState>({
    step: 'selection',
    experience: null,
    date: '',
    time: '',
    adults: parseInt(searchParams.get('adults') || '1'),
    children: parseInt(searchParams.get('children') || '0'),
    privateGroup: false,
    selectedAddons: [],
    couponCode: '',
    couponValid: false,
    couponDiscount: 0,
    pricing: null,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingNumber: '',
  });

  const [language, setLanguage] = useState<'es' | 'fi'>('es');
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  const experienceId = parseInt(searchParams.get('experience') || '1');

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const exp = await ExperienceService.getExperienceById(experienceId);
        if (exp) {
          setState((prev) => ({
            ...prev,
            experience: exp,
          }));
          const dates = await AvailabilityService.getForRange(
            experienceId,
            new Date(),
            new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          );
          setAvailableDates(dates);
        }
      } catch (error) {
        console.error('Error loading experience:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, [experienceId]);

  const calculatePricing = (updatedState: Partial<BookingState>) => {
    const s = { ...state, ...updatedState };
    if (!s.experience?.pricing) return null;

    const pricing = PricingCalculator.calculateBreakdown({
      basePriceEur: s.experience.pricing.basePriceEur,
      adultCount: s.adults,
      childCount: s.children,
      adultPriceEur: s.experience.pricing.adultPriceEur || s.experience.pricing.basePriceEur,
      childPriceEur: s.experience.pricing.childPriceEur || s.experience.pricing.basePriceEur * 0.5,
      privateGroup: s.privateGroup,
      privateGroupMultiplier: s.experience.pricing.privateGroupMultiplier || 1.5,
      seasonalMultiplier: 1.0,
      addons: s.selectedAddons
        .map((addon) => {
          const addonData = s.experience.addons.find((a: any) => a.id === addon.id);
          return { quantity: addon.quantity, priceEur: addonData?.priceEur || 0 };
        })
        .filter((a) => a.priceEur > 0),
      couponDiscountEur: s.couponDiscount,
    });

    return pricing;
  };

  const handleDateSelect = (date: string) => {
    const newState = { ...state, date };
    const pricing = calculatePricing(newState);
    setState((prev) => ({
      ...prev,
      date,
      pricing,
    }));
    setErrors([]);
  };

  const handleTravelerChange = (type: 'adults' | 'children', change: number) => {
    const newCount = Math.max(type === 'children' ? 0 : 1, state[type] + change);
    const newState = { ...state, [type]: newCount };
    const pricing = calculatePricing(newState);
    setState((prev) => ({
      ...prev,
      [type]: newCount,
      pricing,
    }));
  };

  const handleAddonToggle = (addonId: number, quantity: number) => {
    const newAddons = state.selectedAddons.filter((a) => a.id !== addonId);
    if (quantity > 0) {
      newAddons.push({ id: addonId, quantity });
    }
    const newState = { ...state, selectedAddons: newAddons };
    const pricing = calculatePricing(newState);
    setState((prev) => ({
      ...prev,
      selectedAddons: newAddons,
      pricing,
    }));
  };

  const handleCouponApply = async () => {
    const validation = await CouponService.validate(
      state.couponCode,
      state.pricing?.subtotalEur || 0
    );

    if (!validation.valid) {
      setErrors([validation.error || 'Coupon invalid']);
      setState((prev) => ({ ...prev, couponValid: false, couponDiscount: 0 }));
      return;
    }

    const coupon = await CouponService.getByCode(state.couponCode);
    if (coupon) {
      const discount = CouponService.calculateDiscount(coupon, state.pricing?.subtotalEur || 0);
      const newState = { ...state, couponValid: true, couponDiscount: discount, couponCode: state.couponCode };
      const pricing = calculatePricing(newState);
      setState((prev) => ({
        ...prev,
        couponValid: true,
        couponDiscount: discount,
        pricing,
      }));
      setSuccess(`Coupon applied! Discount: ${formatCurrency(discount)}`);
      setErrors([]);
    }
  };

  const handleProceedToDetails = () => {
    const newErrors: string[] = [];
    if (!state.date) newErrors.push(language === 'es' ? 'Please select a date' : 'Valitse päivämäärä');
    if (state.adults < 1) newErrors.push(language === 'es' ? 'At least 1 adult required' : 'Vähintään 1 aikuinen vaaditaan');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setState((prev) => ({ ...prev, step: 'details' }));
    setErrors([]);
  };

  const handleProceedToPayment = () => {
    const newErrors: string[] = [];
    if (!state.customerName) newErrors.push(language === 'es' ? 'Name required' : 'Nimi vaaditaan');
    if (!state.customerEmail) newErrors.push(language === 'es' ? 'Email required' : 'Sähköposti vaaditaan');
    if (!state.customerPhone) newErrors.push(language === 'es' ? 'Phone required' : 'Puhelin vaaditaan');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setState((prev) => ({ ...prev, step: 'payment' }));
    setErrors([]);
  };

  const handleCompleteBooking = async () => {
    const bookingNumber = BookingService.generateBookingNumber();
    setState((prev) => ({
      ...prev,
      step: 'confirmation',
      bookingNumber,
    }));
    setSuccess(language === 'es' ? 'Booking created successfully!' : 'Varaus luotu onnistuneesti!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aurora"></div>
      </div>
    );
  }

  if (!state.experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-midnight mb-4">
            {language === 'es' ? 'Experience not found' : 'Kokemusta ei löytynyt'}
          </h1>
          <Link href="/experiencias" className="text-aurora hover:underline">
            {language === 'es' ? 'Back to experiences' : 'Takaisin kokemuksiin'}
          </Link>
        </div>
      </div>
    );
  }

  const getText = (es: string, fi: string) => (language === 'es' ? es : fi);

  return (
    <div className="min-h-screen bg-snow">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === 'es' ? 'fi' : 'es')}
          className="bg-aurora text-midnight px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {language === 'es' ? 'FI' : 'ES'}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-between max-w-2xl mx-auto">
          {['selection', 'details', 'payment', 'confirmation'].map((step, idx) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                  ['selection', 'details', 'payment', 'confirmation'].indexOf(state.step) >= idx
                    ? 'bg-aurora text-midnight'
                    : 'bg-slate/20 text-slate'
                }`}
              >
                {idx + 1}
              </div>
              {idx < 3 && <div className="flex-1 h-1 bg-slate/10 mx-2" />}
            </div>
          ))}
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            {errors.map((error, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            ))}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* STEP 1: Selection */}
            {state.step === 'selection' && (
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-midnight mb-4">
                    {getText('Seleccionar fecha y viajeros', 'Valitse päivämäärä ja matkailijat')}
                  </h2>
                  <p className="text-slate">
                    {getText(
                      'Elige la fecha perfecta para tu experiencia',
                      'Valitse täydellinen päivämäärä kokemuksellesi'
                    )}
                  </p>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block font-semibold text-midnight mb-4">
                    {getText('Fecha', 'Päivämäärä')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableDates.slice(0, 9).map((avail) => {
                      const dateStr = avail.availableDate.toISOString().split('T')[0];
                      const isSelected = state.date === dateStr;
                      const isFull = avail.booked >= avail.capacity;
                      return (
                        <button
                          key={dateStr}
                          onClick={() => !isFull && handleDateSelect(dateStr)}
                          disabled={isFull}
                          className={`p-4 rounded-lg border-2 transition font-semibold ${
                            isSelected
                              ? 'border-aurora bg-aurora/10 text-aurora'
                              : isFull
                              ? 'border-slate/20 bg-slate/5 text-slate/50 cursor-not-allowed'
                              : 'border-slate/20 hover:border-aurora text-midnight'
                          }`}
                        >
                          <div className="text-sm">
                            {new Date(avail.availableDate).toLocaleDateString(language === 'es' ? 'es-ES' : 'fi-FI')}
                          </div>
                          <div className="text-xs text-slate mt-1">
                            {avail.capacity - avail.booked} {getText('spots', 'paikkaa')}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Travelers */}
                <div>
                  <label className="block font-semibold text-midnight mb-4">
                    {getText('Viajeros', 'Matkailijat')}
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate">{getText('Adultos', 'Aikuiset')}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTravelerChange('adults', -1)}
                          className="w-10 h-10 border border-slate/20 rounded hover:bg-slate/5"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{state.adults}</span>
                        <button
                          onClick={() => handleTravelerChange('adults', 1)}
                          className="w-10 h-10 border border-slate/20 rounded hover:bg-slate/5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate">{getText('Niños', 'Lapset')}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTravelerChange('children', -1)}
                          className="w-10 h-10 border border-slate/20 rounded hover:bg-slate/5"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{state.children}</span>
                        <button
                          onClick={() => handleTravelerChange('children', 1)}
                          className="w-10 h-10 border border-slate/20 rounded hover:bg-slate/5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Private Group */}
                <div className="flex items-center gap-3 p-4 bg-aurora/10 rounded-lg">
                  <input
                    type="checkbox"
                    id="privateGroup"
                    checked={state.privateGroup}
                    onChange={(e) => {
                      const newState = { ...state, privateGroup: e.target.checked };
                      const pricing = calculatePricing(newState);
                      setState((prev) => ({
                        ...prev,
                        privateGroup: e.target.checked,
                        pricing,
                      }));
                    }}
                    className="w-5 h-5"
                  />
                  <label htmlFor="privateGroup" className="font-semibold text-midnight cursor-pointer">
                    {getText('Grupo privado', 'Yksityinen ryhmä')}
                  </label>
                </div>

                {/* Add-ons */}
                {state.experience.addons && state.experience.addons.length > 0 && (
                  <div>
                    <label className="block font-semibold text-midnight mb-4">
                      {getText('Servicios adicionales', 'Lisäpalvelut')}
                    </label>
                    <div className="space-y-2">
                      {state.experience.addons.map((addon: any) => {
                        const selected = state.selectedAddons.find((a) => a.id === addon.id);
                        return (
                          <div key={addon.id} className="flex items-center justify-between p-3 border border-slate/20 rounded-lg">
                            <div>
                              <p className="font-semibold text-midnight">
                                {language === 'es' ? addon.nameEs : addon.nameFi}
                              </p>
                              <p className="text-sm text-slate">
                                {language === 'es' ? addon.descriptionEs : addon.descriptionFi}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-aurora">{formatCurrency(addon.priceEur)}</span>
                              <input
                                type="number"
                                min="0"
                                max={addon.maxQuantity || 10}
                                value={selected?.quantity || 0}
                                onChange={(e) => handleAddonToggle(addon.id, parseInt(e.target.value) || 0)}
                                className="w-12 px-2 py-1 border border-slate/20 rounded"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleProceedToDetails}
                  className="w-full bg-aurora text-midnight py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  {getText('Continuar', 'Jatka')}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* STEP 2: Customer Details */}
            {state.step === 'details' && (
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-midnight mb-4">
                    {getText('Tus datos', 'Sinun tietosi')}
                  </h2>
                  <p className="text-slate">
                    {getText(
                      'Proporciona tu información de contacto',
                      'Anna yhteystietosi'
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-midnight mb-2">
                      {getText('Nombre completo', 'Koko nimi')}
                    </label>
                    <input
                      type="text"
                      value={state.customerName}
                      onChange={(e) => setState((prev) => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
                      placeholder={getText('John Doe', 'Matti Meikäläinen')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-midnight mb-2">
                      {getText('Email', 'Sähköposti')}
                    </label>
                    <input
                      type="email"
                      value={state.customerEmail}
                      onChange={(e) => setState((prev) => ({ ...prev, customerEmail: e.target.value }))}
                      className="w-full px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-midnight mb-2">
                      {getText('Teléfono', 'Puhelin')}
                    </label>
                    <input
                      type="tel"
                      value={state.customerPhone}
                      onChange={(e) => setState((prev) => ({ ...prev, customerPhone: e.target.value }))}
                      className="w-full px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
                      placeholder="+34 123 456 789"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setState((prev) => ({ ...prev, step: 'selection' }))}
                    className="flex-1 border-2 border-slate/20 text-midnight py-3 rounded-lg font-bold hover:border-slate/40 transition"
                  >
                    {getText('Atrás', 'Takaisin')}
                  </button>
                  <button
                    onClick={handleProceedToPayment}
                    className="flex-1 bg-aurora text-midnight py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    {getText('Continuar', 'Jatka')}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {state.step === 'payment' && (
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-midnight mb-4">
                    {getText('Pago', 'Maksu')}
                  </h2>
                  <p className="text-slate">
                    {getText(
                      'Ingresa tu información de pago',
                      'Anna maksuasi'
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Coupon */}
                  <div>
                    <label className="block text-sm font-semibold text-midnight mb-2">
                      {getText('Código de cupón (opcional)', 'Kuponkikoodi (valinnainen)')}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={state.couponCode}
                        onChange={(e) => setState((prev) => ({ ...prev, couponCode: e.target.value.toUpperCase() }))}
                        placeholder="EARLYBIRD20"
                        className="flex-1 px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
                      />
                      <button
                        onClick={handleCouponApply}
                        className="px-6 py-2 bg-slate/10 hover:bg-slate/20 rounded-lg font-semibold text-midnight transition"
                      >
                        {getText('Aplicar', 'Käytä')}
                      </button>
                    </div>
                  </div>

                  {/* Card Details (Demo) */}
                  <div>
                    <label className="block text-sm font-semibold text-midnight mb-2">
                      {getText('Tarjeta de crédito', 'Luottokortti')}
                    </label>
                    <input
                      type="text"
                      placeholder="4111 1111 1111 1111"
                      className="w-full px-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora"
                    />
                  </div>

                  <div className="bg-aurora/10 p-4 rounded-lg">
                    <p className="text-sm text-slate">
                      {getText(
                        '💡 Esto es una demostración. Usa 4111 1111 1111 1111 para simular un pago exitoso.',
                        '💡 Tämä on esittely. Käytä 4111 1111 1111 1111 simuloidaksesi onnistuneen maksun.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setState((prev) => ({ ...prev, step: 'details' }))}
                    className="flex-1 border-2 border-slate/20 text-midnight py-3 rounded-lg font-bold hover:border-slate/40 transition"
                  >
                    {getText('Atrás', 'Takaisin')}
                  </button>
                  <button
                    onClick={handleCompleteBooking}
                    className="flex-1 bg-aurora text-midnight py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    {getText('Confirmar reserva', 'Vahvista varaus')}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmation */}
            {state.step === 'confirmation' && (
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-midnight mb-2">
                    {getText('¡Reserva confirmada!', '¡Varaus vahvistettu!')}
                  </h2>
                  <p className="text-slate text-lg">
                    {getText(
                      'Tu experiencia está confirmada. Te hemos enviado un correo de confirmación.',
                      'Kokemuksesi on vahvistettu. Olemme lähettäneet vahvistussähköpostin.'
                    )}
                  </p>
                </div>

                <div className="bg-slate/5 p-6 rounded-lg space-y-4">
                  <h3 className="font-bold text-midnight text-lg">
                    {getText('Número de reserva', 'Varausnumero')}
                  </h3>
                  <p className="text-2xl font-bold text-aurora">{state.bookingNumber}</p>
                </div>

                <div className="space-y-2 text-sm text-slate">
                  <p>
                    <span className="font-semibold text-midnight">{getText('Experiencia:', 'Kokemus:')} </span>
                    {language === 'es' ? state.experience.titleEs : state.experience.titleFi}
                  </p>
                  <p>
                    <span className="font-semibold text-midnight">{getText('Fecha:', 'Päivämäärä:')} </span>
                    {new Date(state.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'fi-FI')}
                  </p>
                  <p>
                    <span className="font-semibold text-midnight">{getText('Viajeros:', 'Matkailijat:')} </span>
                    {state.adults} {getText('adultos', 'aikuista')}
                    {state.children > 0 && `, ${state.children} ${getText('niños', 'lasta')}`}
                  </p>
                  <p>
                    <span className="font-semibold text-midnight">{getText('Total:', 'Yhteensä:')} </span>
                    {formatCurrency(state.pricing?.totalEur || 0)}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link
                    href="/experiencias"
                    className="flex-1 bg-slate/10 text-midnight py-3 rounded-lg font-bold hover:bg-slate/20 transition text-center"
                  >
                    {getText('Ver más experiencias', 'Näytä lisää kokemuksia')}
                  </Link>
                  <Link
                    href="/admin/bookings"
                    className="flex-1 bg-aurora text-midnight py-3 rounded-lg font-bold hover:opacity-90 transition text-center"
                  >
                    {getText('Ir a mis reservas', 'Mene varauksiini')}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Pricing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8 space-y-6">
              <h3 className="text-xl font-bold text-midnight">
                {getText('Resumen del pedido', 'Tilauksen yhteenveto')}
              </h3>

              {/* Experience Info */}
              <div className="pb-6 border-b border-slate/10">
                <p className="text-sm text-slate mb-2">{getText('Experiencia', 'Kokemus')}</p>
                <p className="font-semibold text-midnight">
                  {language === 'es' ? state.experience.titleEs : state.experience.titleFi}
                </p>
                {state.date && (
                  <p className="text-sm text-slate mt-2">
                    {new Date(state.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'fi-FI')}
                  </p>
                )}
              </div>

              {/* Pricing Breakdown */}
              {state.pricing && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">
                      {state.adults} {getText('adultos', 'aikuista')}
                    </span>
                    <span className="font-semibold text-midnight">
                      {formatCurrency(state.pricing.adultTotalEur)}
                    </span>
                  </div>
                  {state.children > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">
                        {state.children} {getText('niños', 'lasta')}
                      </span>
                      <span className="font-semibold text-midnight">
                        {formatCurrency(state.pricing.childTotalEur)}
                      </span>
                    </div>
                  )}
                  {state.pricing.addonsTotalEur > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">{getText('Servicios adicionales', 'Lisäpalvelut')}</span>
                      <span className="font-semibold text-midnight">
                        {formatCurrency(state.pricing.addonsTotalEur)}
                      </span>
                    </div>
                  )}
                  {state.pricing.privateGroupSurchargeEur > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">{getText('Grupo privado', 'Yksityinen ryhmä')}</span>
                      <span className="font-semibold text-midnight">
                        {formatCurrency(state.pricing.privateGroupSurchargeEur)}
                      </span>
                    </div>
                  )}
                  {state.pricing.seasonalAdjustmentEur > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">{getText('Ajuste estacional', 'Kausimuutos')}</span>
                      <span className="font-semibold text-midnight">
                        {formatCurrency(state.pricing.seasonalAdjustmentEur)}
                      </span>
                    </div>
                  )}
                  {state.pricing.couponDiscountEur > 0 && (
                    <div className="flex justify-between text-sm bg-green-50 p-2 rounded">
                      <span className="text-green-700">{getText('Descuento con cupón', 'Kupongialennus')}</span>
                      <span className="font-semibold text-green-700">
                        -{formatCurrency(state.pricing.couponDiscountEur)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg border-t border-slate/10 pt-3">
                    <span className="font-bold text-midnight">{getText('Total', 'Yhteensä')}</span>
                    <span className="font-bold text-aurora text-xl">
                      {formatCurrency(state.pricing.totalEur)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
