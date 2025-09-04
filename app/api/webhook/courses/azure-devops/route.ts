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
    subject: '🎉 Welcome to Azure DevOps Course - Registration Confirmed!',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Azure DevOps Course Registration</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,system-ui,sans-serif;">
        <div style="max-width:600px; margin:0 auto; background-color:#ffffff;">
          
          <!-- Header with gradient -->
          <div style="background:linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%); padding:32px 24px; text-align:center; position:relative; overflow:hidden;">
            <!-- Decorative elements -->
            <div style="position:absolute; top:-20px; right:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%; opacity:0.6;"></div>
            <div style="position:absolute; bottom:-30px; left:-30px; width:120px; height:120px; background:rgba(255,255,255,0.08); border-radius:50%;"></div>
            
            <div style="position:relative; z-index:2;">
              <div style="display:inline-block; padding:8px 16px; background:rgba(255,255,255,0.15); border-radius:20px; margin-bottom:16px; backdrop-filter:blur(10px);">
                <span style="color:#ffffff; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Registration Confirmed</span>
              </div>
              <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:800; line-height:1.2;">Azure DevOps Course</h1>
              <p style="margin:8px 0 0 0; color:rgba(255,255,255,0.9); font-size:16px;">Welcome to your DevOps journey, ${firstName}!</p>
            </div>
          </div>

          <!-- Main content -->
          <div style="padding:32px 24px;">
            <!-- Welcome section -->
            <div style="text-align:center; margin-bottom:32px;">
              <div style="display:inline-block; width:60px; height:60px; background:linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius:50%; margin-bottom:16px; position:relative;">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:#1d4ed8; font-size:24px;">✓</div>
              </div>
              <h2 style="margin:0 0 8px 0; color:#1e293b; font-size:22px; font-weight:700;">Payment Successful!</h2>
              <p style="margin:0; color:#64748b; font-size:16px;">Your enrollment is now active and confirmed.</p>
            </div>

            <!-- Message content -->
            <div style="color:#374151; font-size:16px; line-height:1.6; margin-bottom:32px;">
              <p style="margin:0 0 16px 0;">Hi <strong style="color:#1e293b;">${firstName}</strong>,</p>
              <p style="margin:0 0 16px 0;">Thank you for registering for our <strong style="color:#1d4ed8;">Azure DevOps Training Program</strong>! We're excited to have you on board and can't wait to get started.</p>
              <p style="margin:0 0 24px 0;">Your registration and payment have been successfully confirmed.</p>
              
              <!-- What's Next section -->
              <div style="background:linear-gradient(135deg, #f8fafc, #f1f5f9); border-left:4px solid #1d4ed8; padding:20px; border-radius:8px; margin:24px 0;">
                <h3 style="margin:0 0 12px 0; color:#1e293b; font-size:18px; font-weight:600;">🚀 What's Next?</h3>
                <p style="margin:0 0 12px 0; color:#1e293b; font-weight:500;">Our team will be reaching out shortly with:</p>
                <ul style="margin:0; padding-left:20px; color:#475569;">
                  <li style="margin-bottom:6px;">Course schedule & joining details</li>
                  <li style="margin-bottom:6px;">Access instructions for sessions & materials</li>
                  <li style="margin-bottom:6px;">Support information in case you need help</li>
                </ul>
              </div>

              <p style="margin:24px 0 16px 0;">This program is designed by <strong style="color:#1d4ed8;">real DevOps Engineers</strong>, and we're committed to giving you hands-on, practical knowledge that will help you grow your career.</p>
              <p style="margin:0 0 16px 0;">If you have any questions, feel free to reply to this email or reach out to us at <a href="mailto:info@thedevopscommunity" style="color:#1d4ed8; text-decoration:none; font-weight:500;">info@thedevopscommunity</a>.</p>
            </div>

            <!-- Payment details card -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin:24px 0;">
              <div style="display:flex; align-items:center; margin-bottom:12px;">
                <div style="width:8px; height:8px; background:#10b981; border-radius:50%; margin-right:8px;"></div>
                <h4 style="margin:0; color:#1e293b; font-size:16px; font-weight:600;">Payment Confirmation</h4>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:14px;">
                <div>
                  <div style="color:#64748b; margin-bottom:4px;">Transaction ID</div>
                  <div style="color:#1e293b; font-family:ui-monospace,SFMono-Regular,'SF Mono',Consolas,monospace; font-weight:500;">${id}</div>
                </div>
                <div>
                  <div style="color:#64748b; margin-bottom:4px;">Amount Paid</div>
                  <div style="color:#1e293b; font-weight:600; font-size:16px;">₹${amountInRupees}</div>
                </div>
              </div>
            </div>

            <!-- Course highlights -->
            <div style="background:linear-gradient(135deg, #1e3a8a, #1d4ed8); border-radius:12px; padding:24px; margin:24px 0; color:#ffffff;">
              <h3 style="margin:0 0 16px 0; font-size:18px; font-weight:600;">🎯 What You'll Master</h3>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
                <div style="padding:12px; background:rgba(255,255,255,0.1); border-radius:8px; backdrop-filter:blur(10px);">
                  <div style="font-weight:600; margin-bottom:4px;">Azure Fundamentals</div>
                  <div style="font-size:14px; opacity:0.9;">VMs, Storage, Networking</div>
                </div>
                <div style="padding:12px; background:rgba(255,255,255,0.1); border-radius:8px; backdrop-filter:blur(10px);">
                  <div style="font-weight:600; margin-bottom:4px;">DevOps Tools</div>
                  <div style="font-size:14px; opacity:0.9;">Docker, Kubernetes, Terraform</div>
                </div>
                <div style="padding:12px; background:rgba(255,255,255,0.1); border-radius:8px; backdrop-filter:blur(10px);">
                  <div style="font-weight:600; margin-bottom:4px;">CI/CD Pipelines</div>
                  <div style="font-size:14px; opacity:0.9;">Azure DevOps, GitHub Actions</div>
                </div>
              </div>
            </div>

            <!-- Footer message -->
            <div style="text-align:center; margin-top:32px; padding-top:24px; border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px 0; color:#374151; font-size:16px;">We look forward to learning and building with you! 🚀</p>
              <p style="margin:0; color:#1e293b; font-weight:600;">Best regards,<br/>The DevOps Community Team</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f8fafc; padding:24px; text-align:center; border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 8px 0; color:#64748b; font-size:14px;">
              © 2025 The DevOps Community. Empowering careers through hands-on learning.
            </p>
            <p style="margin:0; color:#64748b; font-size:12px;">
              This email was sent because you enrolled in our Azure DevOps course.
            </p>
          </div>
        </div>
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


