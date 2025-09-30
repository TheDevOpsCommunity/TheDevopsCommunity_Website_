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
  try {
    const body = (await request.json()) as ConfirmRequest;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || ({} as ConfirmRequest);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment fields' }, { status: 400, headers: corsHeaders });
    }

    const secret = process.env.RAZORPAY_SECRET || '';
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    const isValid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400, headers: corsHeaders });
    }

    // At this point, you can optionally persist a quick success record.
    // Actual authoritative status and emails remain handled by webhook.

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders });
  }
}


