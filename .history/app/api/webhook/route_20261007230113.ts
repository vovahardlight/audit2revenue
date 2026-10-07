import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } else {
      event = JSON.parse(payload);
    }
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Signature Error: ${err.message}` }, { status: 400 });
  }

  // Обработка успешной оплаты €19
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Пейлоад в строгом соответствии с ТЗ
    const n8nPayload = {
      customer_email: session.customer_details?.email || 'unknown@client.es',
      customer_name: session.customer_details?.name || 'Cliente España',
      target_url: session.metadata?.target_url,
      payment_status: 'paid',
      amount: session.amount_total || 1900,
      timestamp: new Date().toISOString(),
    };

    // Передаем данные в существующий вебхук n8n
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(n8nPayload),
        });
      } catch (n8nError) {
        console.error('Ошибка отправки вебхука в n8n:', n8nError);
      }
    }
  }

  return NextResponse.json({ received: true });
}