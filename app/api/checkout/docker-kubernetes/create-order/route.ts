import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

type CreateOrderRequest = {
  promoCode?: string;
  customer: { name: string; email: string; contact: string };
};

const ORIGINAL_PRICE_INR = 5999;
const PROMO_DEAL_INR = 2999;
const FREE_PROMO_INR = 0;
const VALID_PROMOS = {
  'KUBEDEAL': PROMO_DEAL_INR,
  'FREETEST': FREE_PROMO_INR, // 100% off for testing
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequest;
    const promoCode = (body?.promoCode || '').trim();
    const { name, email, contact } = body?.customer || { name: '', email: '', contact: '' };

    if (!name || !email || !contact) {
      return NextResponse.json({ error: 'Missing customer info' }, { status: 400, headers: corsHeaders });
    }

    let amountInInr = ORIGINAL_PRICE_INR;
    let appliedPromo: string | undefined;
    if (promoCode) {
      const upperCode = promoCode.toUpperCase();
      if (upperCode in VALID_PROMOS) {
        amountInInr = VALID_PROMOS[upperCode as keyof typeof VALID_PROMOS];
        appliedPromo = upperCode;
      }
    }

    const keyId = process.env.RAZORPAY_KEY as string;
    const keySecret = process.env.RAZORPAY_SECRET as string;
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Missing Razorpay credentials' }, { status: 500, headers: corsHeaders });
    }

    // Create order via Razorpay Orders API
    const createOrderRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
      },
      body: JSON.stringify({
        amount: amountInInr * 100,
        currency: 'INR',
        receipt: `dkb_${Date.now()}`,
        payment_capture: 1,
        notes: {
          label: 'docker_kubernetes',
          promo: appliedPromo || 'NONE',
          customer_name: name,
          customer_email: email,
          customer_contact: contact,
        },
      }),
    });

    if (!createOrderRes.ok) {
      const errText = await createOrderRes.text();
      return NextResponse.json({ error: 'Order creation failed', details: errText }, { status: 502, headers: corsHeaders });
    }

    const order = await createOrderRes.json();

    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
      },
      { headers: corsHeaders }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders });
  }
}


