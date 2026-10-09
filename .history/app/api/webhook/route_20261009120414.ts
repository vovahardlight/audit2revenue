import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(req: Request) {
  if (!stripe || !endpointSecret) {
    return NextResponse.json({ received: true, mode: 'test_no_stripe' });
  }

  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (sig) {
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

    // Пейлоад строго по ТЗ для передачи в n8n пайплайн
    const n8nPayload = {
      customer_email: session.customer_details?.email || 'client@empresa.es',
      customer_name: session.customer_details?.name || 'Cliente España',
      target_url: session.metadata?.target_url,
      payment_status: 'paid',
      amount: session.amount_total || 1900,
      timestamp: new Date().toISOString(),
    };

    if (process.env.N8N_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(n8nPayload),
        });
      } catch (n8nError) {
        console.error('Ошибка отправки в n8n:', n8nError);
      }
    }
  }

  return NextResponse.json({ received: true });
}