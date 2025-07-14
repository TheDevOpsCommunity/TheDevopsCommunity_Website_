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
  const { email, amount, id, name } = paymentData.entity;
  const amountInRupees = (amount / 100).toFixed(2);
  const userName = name || 'Student';

  logEvent('EMAIL_ATTEMPT', {
    to: email,
    name: userName,
    amount: amountInRupees,
    paymentId: id
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Linux for DevOps Webinar Registration Confirmed! 🎉🐧',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <h1 style="color: #1447E6; text-align: center; margin-bottom: 10px;">Registration Confirmed!</h1>
          <p style="text-align: center; color: #666; margin-bottom: 30px;">Hello ${userName}! 👋</p>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #1447E6;">
            <h2 style="color: #1447E6; margin: 0 0 15px 0; font-size: 24px;">Linux for DevOps – 5-Day Live Demo</h2>
            
            <p style="margin: 8px 0; color: #333;"><strong>🗓️ Date:</strong> July 21st to 25th</p>
            <p style="margin: 8px 0; color: #333;"><strong>💻 Mode:</strong> Online (Live Zoom Sessions)</p>
            <p style="margin: 8px 0; color: #333;"><strong>💰 Fee:</strong> Only ₹${amountInRupees}</p>
            <p style="margin: 8px 0; color: #333;"><strong>🎁 Bonus:</strong> Free DevOps Roadmap + Career Guidance</p>
            <p style="margin: 8px 0; color: #333;"><strong>📧 Transaction ID:</strong> ${id}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

          <div style="margin-bottom: 25px;">
            <h3 style="color: #333; margin-bottom: 15px;">🔥 Why Attend This Demo?</h3>
            <p style="margin: 5px 0; color: #555;">✔️ Master Linux from Scratch – Tailored for DevOps roles</p>
            <p style="margin: 5px 0; color: #555;">✔️ Hands-on Practice – Real-time terminal usage</p>
            <p style="margin: 5px 0; color: #555;">✔️ Essential Commands – Files, permissions, processes, networking</p>
            <p style="margin: 5px 0; color: #555;">✔️ Shell Scripting Basics – Automate tasks</p>
            <p style="margin: 5px 0; color: #555;">✔️ Practical for DevOps Projects – Not just theory</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

          <div style="margin-bottom: 25px;">
            <h3 style="color: #333; margin-bottom: 15px;">👥 Who Should Join?</h3>
            <p style="margin: 5px 0; color: #555;">✅ Beginners with zero tech background</p>
            <p style="margin: 5px 0; color: #555;">✅ Career switchers from non-IT fields</p>
            <p style="margin: 5px 0; color: #555;">✅ Freshers or students looking to upskill</p>
            <p style="margin: 5px 0; color: #555;">✅ Anyone interested in DevOps, Cloud, or Linux Admin</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

          <div style="margin-bottom: 25px;">
            <h3 style="color: #333; margin-bottom: 15px;">🎁 Bonus Session Included!</h3>
            
            <h4 style="color: #1447E6; margin: 15px 0 10px 0;">🧭 Free DevOps Roadmap:</h4>
            <p style="margin: 5px 0; color: #555;">Learn the exact tools & skills needed to become a DevOps engineer</p>
            <p style="margin: 5px 0; color: #555;">Step-by-step roadmap from beginner to expert</p>
            <p style="margin: 5px 0; color: #555;">Toolstack breakdown (Linux → Git → Docker → Kubernetes → AWS → CI/CD)</p>
            
            <h4 style="color: #1447E6; margin: 15px 0 10px 0;">💬 Live Q&A Session:</h4>
            <p style="margin: 5px 0; color: #555;">Get personalized career suggestions</p>
            <p style="margin: 5px 0; color: #555;">Ask us anything about DevOps jobs, interviews, certifications, and more!</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

          <div style="margin-bottom: 25px;">
            <h3 style="color: #333; margin-bottom: 15px;">💸 Registration Fee: ₹${amountInRupees} Only</h3>
            <p style="margin: 5px 0; color: #555;">✅ 5-Day Live Linux Training</p>
            <p style="margin: 5px 0; color: #555;">✅ Free DevOps Career Roadmap</p>
            <p style="margin: 5px 0; color: #555;">✅ Personalized Career Q&A</p>
            <p style="margin: 5px 0; color: #555;">✅ Recordings Access (if applicable)</p>
            <p style="margin: 5px 0; color: #555;">✅ Certificate of Participation (Optional)</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="color: #333; margin: 0 0 15px 0;">After payment, you will receive:</h3>
            <p style="margin: 5px 0; color: #555;">📩 Confirmation Email</p>
            <p style="margin: 5px 0; color: #555;">📆 Joining Link + Schedule</p>
            <p style="margin: 5px 0; color: #555;">🎁 Free DevOps Career PDF</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #f0f8ff; border-radius: 8px;">
            <p style="color: #1447E6; font-weight: bold; margin: 0;">🚀 Get ready to master Linux for DevOps!</p>
            <p style="color: #666; margin: 5px 0; font-size: 14px;">Need help? Contact us at support@devopscommunity.com</p>
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
    if (data.event === 'payment.captured') {
      logEvent('PAYMENT_CAPTURED', {
        requestId,
        paymentId: data.payload.payment.entity.id,
        amount: data.payload.payment.entity.amount,
        email: data.payload.payment.entity.email,
        name: data.payload.payment.entity.name || 'Not provided'
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
