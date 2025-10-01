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
const VALID_PROMOS = {
  'KUBEDEAL': PROMO_DEAL_INR,
};

export async function POST(request: Request) {
  const requestId = `compute-price-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log(`[${requestId}] [COMPUTE_PRICE_REQUEST] Starting price computation`);
    
    const body = (await request.json()) as ComputePriceRequest;
    const promoCode = (body?.promoCode || '').trim();
    
    console.log(`[${requestId}] [COMPUTE_PRICE_INPUT]`, {
      promoCode: promoCode || 'NONE',
      originalPrice: ORIGINAL_PRICE_INR,
      validPromos: Object.keys(VALID_PROMOS)
    });

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

    const response = {
      amount: amountInInr,
      currency: 'INR',
      appliedPromo: appliedPromo || null,
      originalAmount: ORIGINAL_PRICE_INR,
    };

    console.log(`[${requestId}] [COMPUTE_PRICE_SUCCESS]`, response);
    
    return NextResponse.json(response, { headers: corsHeaders });
  } catch (error) {
    console.error(`[${requestId}] [COMPUTE_PRICE_ERROR]`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: corsHeaders }
    );
  }
}


