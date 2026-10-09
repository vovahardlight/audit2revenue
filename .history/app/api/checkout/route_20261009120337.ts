import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(req: Request) {
  try {
    const { targetUrl } = await req.json();

    if (!targetUrl) {
      return NextResponse.json({ error: 'URL обязателен' }, { status: 400 });
    }

    const host = req.headers.get('origin') || 'http://localhost:3000';

    // Если ключи Stripe настроены — создаем боевую платежную сессию на €19.00
    if (stripe) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Полный ИИ-аудит сайта (LSSI-CE + Google Maps + Воронка)',
                description: `Глубокий анализ для сайта: ${targetUrl}`,
              },
              unit_amount: 1900, // €19.00
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: {
          target_url: targetUrl,
        },
        success_url: `${host}/report/audit_${Date.now()}?url=${encodeURIComponent(targetUrl)}&payment=success`,
        cancel_url: `${host}?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Фоллбек для мгновенного перехода к отчету без ключей
    return NextResponse.json({ url: null });
  } catch (error: any) {
    console.error('Ошибка Stripe Checkout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}