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
    subject: 'Welcome to AWS DevOps Course - Registration Confirmed',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AWS DevOps Course Registration</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f3f4f6;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:8px;">
                <tr>
                  <td align="left" style="background-color:#1d4ed8; padding:24px; color:#ffffff;">
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; text-transform:uppercase; font-weight:bold; letter-spacing:0.5px; opacity:0.95;">Registration Confirmed</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:24px; font-weight:800; line-height:1.25; margin-top:6px;">AWS DevOps Course</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; margin-top:6px;">Welcome to your DevOps journey, ${firstName}!</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom:16px;">
                          <div style="font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:700; color:#111827;">Payment Successful</div>
                          <div style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#6b7280;">Your enrollment is now active and confirmed.</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,Helvetica,sans-serif; font-size:15px; color:#374151; line-height:1.6;">
                          <p style="margin:0 0 12px 0;">Hi <strong style="color:#111827;">${firstName}</strong>,</p>
                          <p style="margin:0 0 12px 0;">Thank you for registering for our <strong style="color:#1d4ed8;">AWS DevOps Training Program</strong>. We're excited to have you on board and can't wait to get started.</p>
                          <p style="margin:0 0 16px 0;">Your registration and payment have been successfully confirmed.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8fafc; border:1px solid #e5e7eb; border-radius:6px;">
                            <tr>
                              <td style="padding:16px; font-family:Arial,Helvetica,sans-serif;">
                                <div style="font-size:16px; font-weight:700; color:#111827; margin-bottom:6px;">What's Next</div>
                                <div style="font-size:14px; color:#111827; margin-bottom:8px;">Our team will be reaching out shortly with:</div>
                                <ul style="padding-left:20px; margin:0; color:#374151; font-size:14px;">
                                  <li style="margin-bottom:6px;">Course schedule and joining details</li>
                                  <li style="margin-bottom:6px;">Access instructions for sessions and materials</li>
                                  <li style="margin-bottom:6px;">Support information in case you need help</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0 0 0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;">
                            <tr>
                              <td style="padding:16px; font-family:Arial,Helvetica,sans-serif;">
                                <div style="font-size:12px; color:#6b7280;">Payment Details</div>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:6px; font-size:14px; color:#111827;">
                                  <tr>
                                    <td width="50%" style="padding:4px 0;">Transaction ID</td>
                                    <td width="50%" style="padding:4px 0; font-family:Consolas,'Courier New',monospace;">${id}</td>
                                  </tr>
                                  <tr>
                                    <td width="50%" style="padding:4px 0;">Amount Paid</td>
                                    <td width="50%" style="padding:4px 0; font-weight:700;">₹${amountInRupees}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:12px; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#374151; line-height:1.6;">
                          <p style="margin:0 0 12px 0;">This program is designed by real DevOps Engineers, and we're committed to giving you hands‑on, practical knowledge that will help you grow your career.</p>
                          <p style="margin:0 0 0 0;">If you have any questions, reply to this email or reach out to us at <a href="mailto:info@thedevopscommunity" style="color:#1d4ed8; text-decoration:none;">info@thedevopscommunity</a>.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:24px; border-top:1px solid #e5e7eb; font-family:Arial,Helvetica,sans-serif; text-align:center;">
                          <div style="font-size:14px; color:#111827; font-weight:600;">Best regards,<br />The DevOps Community Team</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="background-color:#f8fafc; padding:16px; border-top:1px solid #e5e7eb;">
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#6b7280;">© 2025 The DevOps Community. Empowering careers through hands‑on learning.</div>
                    <div style="font-family:Arial,Helvetica,sans-serif; font-size:11px; color:#6b7280; margin-top:4px;">This email was sent because you enrolled in our AWS DevOps course.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
