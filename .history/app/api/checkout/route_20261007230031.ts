import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { targetUrl, country } = await req.json();

    if (!targetUrl) {
      return NextResponse.json({ error: 'URL обязателен' }, { status: 400 });
    }

    const host = req.headers.get('origin') || 'http://localhost:3000';

    // Создаем сессию оплаты Stripe на €19.00
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
        country: country || 'ES',
      },
      success_url: `${host}/report/audit_${Date.now()}?url=${encodeURIComponent(targetUrl)}&payment=success`,
      cancel_url: `${host}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Ошибка Stripe Checkout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}