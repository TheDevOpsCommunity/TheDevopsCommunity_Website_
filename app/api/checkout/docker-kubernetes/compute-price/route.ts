import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

type ComputePriceRequest = {
  promoCode?: string;
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
    const body = (await request.json()) as ComputePriceRequest;
    const promoCode = (body?.promoCode || '').trim();

    let amountInInr = ORIGINAL_PRICE_INR;
    let appliedPromo: string | undefined;

    if (promoCode) {
      const upperCode = promoCode.toUpperCase();
      if (upperCode in VALID_PROMOS) {
        amountInInr = VALID_PROMOS[upperCode as keyof typeof VALID_PROMOS];
        appliedPromo = upperCode;
      }
    }

    return NextResponse.json(
      {
        amount: amountInInr,
        currency: 'INR',
        appliedPromo: appliedPromo || null,
        originalAmount: ORIGINAL_PRICE_INR,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: corsHeaders }
    );
  }
}


