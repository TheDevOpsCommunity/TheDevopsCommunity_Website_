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
const FREE_PROMO_INR = 1; // Changed to 1 to match compute-price endpoint
const VALID_PROMOS = {
  'KUBEDEAL': PROMO_DEAL_INR,
  'FREETEST': FREE_PROMO_INR, // 100% off for testing
};

export async function POST(request: Request) {
  const requestId = `create-order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log(`[${requestId}] [CREATE_ORDER_REQUEST] Starting order creation`);
    
    const body = (await request.json()) as CreateOrderRequest;
    const promoCode = (body?.promoCode || '').trim();
    const { name, email, contact } = body?.customer || { name: '', email: '', contact: '' };

    console.log(`[${requestId}] [CREATE_ORDER_INPUT]`, {
      promoCode: promoCode || 'NONE',
      customer: { name, email, contact: contact ? `${contact.substring(0, 3)}***` : 'NONE' },
      originalPrice: ORIGINAL_PRICE_INR,
      validPromos: Object.keys(VALID_PROMOS)
    });

    if (!name || !email || !contact) {
      console.log(`[${requestId}] [VALIDATION_FAILED] Missing customer info`, {
        hasName: !!name,
        hasEmail: !!email,
        hasContact: !!contact
      });
      return NextResponse.json({ error: 'Missing customer info' }, { status: 400, headers: corsHeaders });
    }

    let amountInInr = ORIGINAL_PRICE_INR;
    let appliedPromo: string | undefined;
    
    if (promoCode) {
      const upperCode = promoCode.toUpperCase();
      console.log(`[${requestId}] [PROMO_VALIDATION] Checking promo code: "${upperCode}"`);
      
      if (upperCode in VALID_PROMOS) {
        amountInInr = VALID_PROMOS[upperCode as keyof typeof VALID_PROMOS];
        appliedPromo = upperCode;
        console.log(`[${requestId}] [PROMO_APPLIED]`, {
          promoCode: upperCode,
          originalAmount: ORIGINAL_PRICE_INR,
          discountedAmount: amountInInr,
          discount: ORIGINAL_PRICE_INR - amountInInr
        });
      } else {
        console.log(`[${requestId}] [PROMO_INVALID] Promo code "${upperCode}" not found in valid promos`);
      }
    } else {
      console.log(`[${requestId}] [NO_PROMO] No promo code provided, using original price`);
    }

    const keyId = process.env.RAZORPAY_KEY as string;
    const keySecret = process.env.RAZORPAY_SECRET as string;
    
    console.log(`[${requestId}] [RAZORPAY_CREDENTIALS]`, {
      hasKeyId: !!keyId,
      hasKeySecret: !!keySecret,
      keyIdPrefix: keyId ? keyId.substring(0, 8) + '...' : 'NONE'
    });
    
    if (!keyId || !keySecret) {
      console.error(`[${requestId}] [CREDENTIALS_MISSING] Razorpay credentials not found`);
      return NextResponse.json({ error: 'Missing Razorpay credentials' }, { status: 500, headers: corsHeaders });
    }

    const orderPayload = {
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
    };

    console.log(`[${requestId}] [RAZORPAY_ORDER_PAYLOAD]`, {
      amount: orderPayload.amount,
      currency: orderPayload.currency,
      receipt: orderPayload.receipt,
      payment_capture: orderPayload.payment_capture,
      notes: orderPayload.notes
    });

    // Create order via Razorpay Orders API
    console.log(`[${requestId}] [RAZORPAY_API_CALL] Calling Razorpay Orders API`);
    const createOrderRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
      },
      body: JSON.stringify(orderPayload),
    });

    console.log(`[${requestId}] [RAZORPAY_API_RESPONSE]`, {
      status: createOrderRes.status,
      statusText: createOrderRes.statusText,
      ok: createOrderRes.ok
    });

    if (!createOrderRes.ok) {
      const errText = await createOrderRes.text();
      console.error(`[${requestId}] [RAZORPAY_API_ERROR]`, {
        status: createOrderRes.status,
        statusText: createOrderRes.statusText,
        errorText: errText,
        payload: orderPayload
      });
      return NextResponse.json({ error: 'Order creation failed', details: errText }, { status: 502, headers: corsHeaders });
    }

    const order = await createOrderRes.json();
    console.log(`[${requestId}] [ORDER_CREATED_SUCCESS]`, {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      created_at: order.created_at
    });

    const response = {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    };

    console.log(`[${requestId}] [CREATE_ORDER_SUCCESS]`, response);
    
    return NextResponse.json(response, { headers: corsHeaders });
  } catch (error) {
    console.error(`[${requestId}] [CREATE_ORDER_ERROR]`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders });
  }
}


