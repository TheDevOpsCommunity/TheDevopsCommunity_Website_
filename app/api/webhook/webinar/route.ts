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
    name?: string;
    contact?: string;
  };
}

interface RazorpayPaymentLinkEntity {
  id: string;
  amount: number;
  customer: {
    email: string;
    contact: string;
    name?: string;
  };
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment?: RazorpayPaymentEntity;
    payment_link?: {
      entity: RazorpayPaymentLinkEntity;
    };
    order?: {
      entity: {
        id: string;
        amount: number;
      };
    };
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
async function sendConfirmationEmail(emailData: { email: string; amount: number; id: string; name?: string; contact?: string }) {
  const { email, amount, id, name, contact } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const userName = name || 'Student';

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    name: userName,
    contact: contact || 'Not provided',
    amount: amountInRupees,
    paymentId: id
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Linux for DevOps Webinar! 🎉🐧',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <h1 style="color: #1447E6; text-align: center; margin-bottom: 10px;">Welcome to Our Webinar! 🎉</h1>
          <p style="text-align: center; color: #666; margin-bottom: 30px;">Hello ${userName}! 👋</p>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #1447E6;">
            <h2 style="color: #1447E6; margin: 0 0 15px 0; font-size: 24px;">Registration Confirmed ✅</h2>
            <p style="margin: 8px 0; color: #333;">Your registration for <strong>Linux for DevOps – 5-Day Live Demo</strong> has been confirmed!</p>
            <p style="margin: 8px 0; color: #333;"><strong>📧 Transaction ID:</strong> ${id}</p>
            <p style="margin: 8px 0; color: #333;"><strong>💰 Amount Paid:</strong> ₹${amountInRupees}</p>
          </div>

          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #333; margin: 0 0 15px 0;">📅 What's Next?</h3>
            <p style="margin: 8px 0; color: #555;">🔗 <strong>Zoom Link:</strong> Will be provided soon</p>
            <p style="margin: 8px 0; color: #555;">💬 <strong>WhatsApp Group:</strong> Link will be shared soon</p>
            <p style="margin: 8px 0; color: #555;">📚 <strong>Materials:</strong> You'll receive all resources before the sessions</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #f0f8ff; border-radius: 8px;">
            <p style="color: #1447E6; font-weight: bold; margin: 0 0 10px 0;">🚀 Get ready to master Linux for DevOps!</p>
            <p style="color: #666; margin: 5px 0; font-size: 14px;">Need help? Contact us at <strong>info@devopscommunity.com</strong></p>
          </div>

        </div>
        
        <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
          <p>This is an automated email. Please do not reply directly to this message.</p>
          <p>See you in the live sessions! 🐧💻</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logEvent('EMAIL_SUCCESS', {
      to: email,
      name: userName,
      paymentId: id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logEvent('EMAIL_ERROR', {
      to: email,
      name: userName,
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
    if (data.event === 'payment.captured' && data.payload.payment) {
      const payment = data.payload.payment;
      logEvent('PAYMENT_CAPTURED', {
        requestId,
        paymentId: payment.entity.id,
        amount: payment.entity.amount,
        email: payment.entity.email,
        name: payment.entity.name || 'Not provided'
      });

      // Send confirmation email
      await sendConfirmationEmail({
        email: payment.entity.email,
        amount: payment.entity.amount,
        id: payment.entity.id,
        name: payment.entity.name,
        contact: payment.entity.contact
      });
      
      logEvent('WEBHOOK_SUCCESS', {
        requestId,
        paymentId: payment.entity.id
      });

      return NextResponse.json(
        { message: 'Payment processed and email sent successfully' },
        { status: 200, headers: corsHeaders }
      );
    }

    // Check if it's a payment_link.paid event
    if (data.event === 'payment_link.paid' && data.payload.payment_link && data.payload.order) {
      const paymentLink = data.payload.payment_link.entity;
      const order = data.payload.order.entity;
      
      logEvent('PAYMENT_LINK_PAID', {
        requestId,
        paymentLinkId: paymentLink.id,
        orderId: order.id,
        amount: paymentLink.amount,
        email: paymentLink.customer.email,
        contact: paymentLink.customer.contact,
        name: paymentLink.customer.name || 'Not provided'
      });

      // Send confirmation email
      await sendConfirmationEmail({
        email: paymentLink.customer.email,
        amount: paymentLink.amount,
        id: paymentLink.id,
        name: paymentLink.customer.name,
        contact: paymentLink.customer.contact
      });
      
      logEvent('WEBHOOK_SUCCESS', {
        requestId,
        paymentLinkId: paymentLink.id
      });

      return NextResponse.json(
        { message: 'Payment link processed and email sent successfully' },
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
