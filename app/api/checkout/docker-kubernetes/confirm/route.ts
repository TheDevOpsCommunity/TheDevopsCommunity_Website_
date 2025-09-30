import { NextResponse } from 'next/server';
import crypto from 'crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

type ConfirmRequest = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(request: Request) {
  const requestId = `confirm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log(`[${requestId}] [CONFIRM_PAYMENT_REQUEST] Starting payment confirmation`);
    
    const body = (await request.json()) as ConfirmRequest;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || ({} as ConfirmRequest);

    console.log(`[${requestId}] [CONFIRM_PAYMENT_INPUT]`, {
      hasOrderId: !!razorpay_order_id,
      hasPaymentId: !!razorpay_payment_id,
      hasSignature: !!razorpay_signature,
      orderId: razorpay_order_id ? razorpay_order_id.substring(0, 8) + '...' : 'NONE',
      paymentId: razorpay_payment_id ? razorpay_payment_id.substring(0, 8) + '...' : 'NONE'
    });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log(`[${requestId}] [VALIDATION_FAILED] Missing payment fields`, {
        hasOrderId: !!razorpay_order_id,
        hasPaymentId: !!razorpay_payment_id,
        hasSignature: !!razorpay_signature
      });
      return NextResponse.json({ error: 'Missing payment fields' }, { status: 400, headers: corsHeaders });
    }

    const secret = process.env.RAZORPAY_SECRET || '';
    console.log(`[${requestId}] [SIGNATURE_VERIFICATION]`, {
      hasSecret: !!secret,
      secretPrefix: secret ? secret.substring(0, 8) + '...' : 'NONE'
    });

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    console.log(`[${requestId}] [SIGNATURE_DETAILS]`, {
      payload: payload,
      expectedSignature: expected,
      receivedSignature: razorpay_signature,
      signaturesMatch: expected === razorpay_signature
    });

    const isValid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
    
    if (!isValid) {
      console.error(`[${requestId}] [SIGNATURE_INVALID] Signature verification failed`, {
        expected: expected,
        received: razorpay_signature,
        payload: payload
      });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400, headers: corsHeaders });
    }

    console.log(`[${requestId}] [SIGNATURE_VALID] Payment signature verified successfully`);

    // At this point, you can optionally persist a quick success record.
    // Actual authoritative status and emails remain handled by webhook.

    console.log(`[${requestId}] [CONFIRM_PAYMENT_SUCCESS] Payment confirmed successfully`);
    
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error(`[${requestId}] [CONFIRM_PAYMENT_ERROR]`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders });
  }
}


