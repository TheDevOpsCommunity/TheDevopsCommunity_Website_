import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

interface RazorpayPaymentEntity {
  id: string;
  amount: number;
  email: string;
  contact?: string;
  notes?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity;
    };
  };
}

const processedPayments = new Set<string>();

setInterval(() => {
  processedPayments.clear();
  logEvent('CACHE_CLEANED', { timestamp: new Date().toISOString() });
}, 60 * 60 * 1000);

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

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://api.razorpay.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-razorpay-signature',
};

function logEvent(type: string, data: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}]`, JSON.stringify(data, null, 2));
}

export async function OPTIONS() {
  logEvent('CORS_PREFLIGHT', { method: 'OPTIONS' });
  return NextResponse.json({}, { headers: corsHeaders });
}

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );

    logEvent('SIGNATURE_VERIFICATION', { isValid });
    return isValid;
  } catch (error) {
    logEvent('SIGNATURE_VERIFICATION_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
}

async function sendConfirmationEmail(emailData: { email: string; amount: number; id: string; name?: string; contact?: string }) {
  const { email, amount, id, name } = emailData;
  const amountInRupees = (amount / 100).toFixed(2);
  const firstName = (name || 'Student').split(' ')[0];

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Confirmed - Azure DevOps Course',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background-color: #f6f8fb;">
        <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(2,6,23,0.06)">
          <div style="background:linear-gradient(90deg,#1e3a8a,#1d4ed8); padding:20px; color:#ffffff;">
            <h1 style="margin:0; font-size:20px; font-weight:800; letter-spacing:0.2px;">Azure DevOps Course</h1>
          </div>
          <div style="padding:24px; color:#111827;">
            <p>Hi ${firstName},</p>
            <p>Thank you for registering for our DevOps Training Program! We’re excited to have you on board and can’t wait to get started.</p>
            <p>Your registration and payment have been successfully confirmed.</p>
            <p style="font-weight:600; margin-top:16px;">What’s Next?</p>
            <ul style="margin:8px 0 16px 18px; color:#374151;">
              <li>Course schedule & joining details</li>
              <li>Access instructions for sessions & materials</li>
              <li>Support information in case you need help</li>
            </ul>
            <p>This program is designed by real DevOps Engineers, and we’re committed to giving you hands-on, practical knowledge that will help you grow your career.</p>
            <p>If you have any questions, feel free to reply to this email or reach out to us at <strong>info@thedevopscommunity</strong>.</p>
            <p>We look forward to learning and building with you.</p>

            <div style="margin-top:16px; padding:12px 16px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
              <div style="font-size:12px; color:#6b7280;">Payment Details</div>
              <div style="font-size:14px; color:#111827; margin-top:4px;">Transaction ID: <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${id}</span></div>
              <div style="font-size:14px; color:#111827;">Amount Paid: ₹${amountInRupees}</div>
            </div>

            <p style="margin-top:24px;">Best regards,<br/>The DevOps Community Team</p>
          </div>
        </div>
      </div>
    `,
  } as const;

  await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  const requestId = crypto.randomBytes(8).toString('hex');
  logEvent('WEBHOOK_RECEIVED', { requestId });

  try {
    const signature = request.headers.get('x-razorpay-signature');
    if (!signature) {
      logEvent('SIGNATURE_MISSING', { requestId });
      return NextResponse.json({ error: 'No signature found' }, { status: 400, headers: corsHeaders });
    }

    const rawBody = await request.text();
    const isValid = verifyWebhookSignature(rawBody, signature, process.env.RAZORPAY_WEBHOOK_SECRET || '');
    if (!isValid) {
      logEvent('SIGNATURE_INVALID', { requestId });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400, headers: corsHeaders });
    }

    const data = JSON.parse(rawBody) as RazorpayWebhookPayload;
    logEvent('PAYLOAD', { requestId, event: data.event });

    if (data.event !== 'payment.captured' || !data.payload?.payment) {
      logEvent('EVENT_IGNORED', { requestId, event: data.event });
      return NextResponse.json({ message: 'Event acknowledged' }, { status: 200, headers: corsHeaders });
    }

    const payment = data.payload.payment.entity;
    const paymentId = payment.id;

    if (processedPayments.has(paymentId)) {
      logEvent('DUPLICATE_PAYMENT_IGNORED', { requestId, paymentId });
      return NextResponse.json({ message: 'Already processed' }, { status: 200, headers: corsHeaders });
    }

    processedPayments.add(paymentId);

    await sendConfirmationEmail({
      email: payment.email,
      amount: payment.amount,
      id: payment.id,
      name: payment.notes?.name,
      contact: payment.contact,
    });

    logEvent('WEBHOOK_SUCCESS', { requestId, paymentId });
    return NextResponse.json({ message: 'Processed' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    logEvent('WEBHOOK_ERROR', { requestId, error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}


