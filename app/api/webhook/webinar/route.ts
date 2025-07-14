import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Types for webhook payload
interface RazorpayPaymentEntity {
  id: string;
  amount: number;
  email: string;
  entity: {
    id: string;
    amount: number;
    email: string;
  };
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment: RazorpayPaymentEntity;
  };
}

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://api.razorpay.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-razorpay-signature',
};

// Logger function
function logEvent(type: string, data: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}]`, JSON.stringify(data, null, 2));
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  logEvent('CORS_PREFLIGHT', { method: 'OPTIONS' });
  return NextResponse.json({}, { headers: corsHeaders });
}

// Verify webhook signature using HMAC SHA256
function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
    
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );

    logEvent('SIGNATURE_VERIFICATION', {
      isValid,
      expectedSignature,
      receivedSignature: signature
    });

    return isValid;
  } catch (error) {
    logEvent('SIGNATURE_VERIFICATION_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
}

// Send confirmation email
async function sendConfirmationEmail(paymentData: RazorpayPaymentEntity) {
  const { email, amount, id } = paymentData.entity;
  const amountInRupees = (amount / 100).toFixed(2);

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    amount: amountInRupees,
    paymentId: id
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "prathamshirbhate1909@gmail.com",
    subject: 'DevOps Roadmap Webinar Registration Confirmed! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1447E6; text-align: center;">Registration Confirmed!</h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333;">Thank you for registering!</h2>
          <p>Your registration for the DevOps Roadmap Webinar has been confirmed.</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #fff; border-radius: 5px; border-left: 4px solid #1447E6;">
            <h3 style="margin: 0 0 10px 0; color: #1447E6;">Registration Details:</h3>
            <p style="margin: 5px 0;"><strong>Webinar:</strong> DevOps Roadmap Webinar – Build a Career That Scales in 2025</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> May 30, 2025</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> 10:00 AM IST</p>
            <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${amountInRupees}</p>
            <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${id}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333;">What's Next?</h3>
            <ol style="color: #555;">
              <li>You will receive the Zoom link 24 hours before the webinar</li>
              <li>Join our WhatsApp group for updates and community support</li>
              <li>Prepare your questions for the Q&A session</li>
            </ol>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666;">Need help? Contact us at support@devopscommunity.com</p>
          </div>
        </div>

        <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
          <p>This is an automated email. Please do not reply directly to this message.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logEvent('EMAIL_SUCCESS', {
      to: email,
      paymentId: id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logEvent('EMAIL_ERROR', {
      to: email,
      paymentId: id,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomBytes(8).toString('hex');
  logEvent('WEBHOOK_RECEIVED', { requestId });

  try {
    // Get the webhook signature from headers
    const signature = request.headers.get('x-razorpay-signature');
    if (!signature) {
      logEvent('SIGNATURE_MISSING', { requestId });
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Get the raw body as string - DO NOT PARSE IT YET
    const rawBody = await request.text();
    
    // Verify webhook signature using raw body
    const isValid = verifyWebhookSignature(
      rawBody,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET || ''
    );

    if (!isValid) {
      logEvent('SIGNATURE_INVALID', { 
        requestId,
        receivedSignature: signature 
      });
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Only parse the body after signature verification
    const data = JSON.parse(rawBody) as RazorpayWebhookPayload;
    logEvent('WEBHOOK_PROCESSING', {
      requestId,
      event: data.event,
      paymentId: data.payload?.payment?.entity?.id
    });

    // Check if it's a payment.captured event
    if (data.event === 'payment.captured') {
      logEvent('PAYMENT_CAPTURED', {
        requestId,
        paymentId: data.payload.payment.entity.id,
        amount: data.payload.payment.entity.amount,
        email: data.payload.payment.entity.email
      });

      // Send confirmation email
      await sendConfirmationEmail(data.payload.payment);
      
      logEvent('WEBHOOK_SUCCESS', {
        requestId,
        paymentId: data.payload.payment.entity.id
      });

      return NextResponse.json(
        { message: 'Payment processed and email sent successfully' },
        { status: 200, headers: corsHeaders }
      );
    }

    // For other events, just acknowledge receipt
    logEvent('WEBHOOK_ACKNOWLEDGED', {
      requestId,
      event: data.event
    });

    return NextResponse.json(
      { message: 'Webhook received' },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    logEvent('WEBHOOK_ERROR', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
