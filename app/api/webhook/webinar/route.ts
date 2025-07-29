import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Types for webhook payload
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

interface RazorpayPaymentLinkEntity {
  id: string;
  amount: number;
  customer: {
    email: string;
    contact: string;
    name?: string;
  };
}

interface RazorpayInvoiceEntity {
  id: string;
  amount: number;
  customer_details: {
    id: string;
    name: string;
    email: string;
    contact: string;
    customer_name: string;
    customer_email: string;
    customer_contact: string;
  };
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity;
    };
    payment_link?: {
      entity: RazorpayPaymentLinkEntity;
    };
    order?: {
      entity: {
        id: string;
        amount: number;
      };
    };
    invoice?: {
      entity: RazorpayInvoiceEntity;
    };
  };
}

// In-memory cache to prevent duplicate processing (in production, use Redis)
const processedPayments = new Set<string>();

// Clean up cache every hour
setInterval(() => {
  processedPayments.clear();
  logEvent('CACHE_CLEANED', { timestamp: new Date().toISOString() });
}, 60 * 60 * 1000);

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
    subject: 'Welcome to Docker & Kubernetes Bootcamp! 🎉🐳',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="background-color: white; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1);">
          
          <!-- Header Section -->
          <div style="background: linear-gradient(135deg, #1447E6 0%, #0066ff 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 20px; right: 20px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px;">🐳</span>
            </div>
            <h1 style="color: white; margin: 0 0 10px 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Welcome Aboard! 🎉</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Hello ${userName}! Ready to master containers? 🚀</p>
          </div>

          <!-- Confirmation Card -->
          <div style="padding: 30px;">
            <div style="background: linear-gradient(135deg, #f8faff 0%, #e8f4fd 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 1px solid #e3f2fd; position: relative;">
              <div style="position: absolute; top: -10px; left: 25px; background: #4CAF50; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                ✅ CONFIRMED
              </div>
              <h2 style="color: #1447E6; margin: 15px 0 20px 0; font-size: 22px; font-weight: 600;">Registration Successful</h2>
              <p style="margin: 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.6;">Your spot in <strong>Docker & Kubernetes Mastery – 2-Week Live Bootcamp</strong> is confirmed!</p>
              
              <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
                <div style="background: white; padding: 12px 16px; border-radius: 10px; flex: 1; min-width: 150px; border-left: 4px solid #1447E6;">
                  <div style="font-size: 12px; color: #666; font-weight: 500;">TRANSACTION ID</div>
                  <div style="font-size: 14px; color: #2c3e50; font-weight: 600; margin-top: 2px;">${id}</div>
                </div>
                <div style="background: white; padding: 12px 16px; border-radius: 10px; flex: 1; min-width: 120px; border-left: 4px solid #4CAF50;">
                  <div style="font-size: 12px; color: #666; font-weight: 500;">AMOUNT PAID</div>
                  <div style="font-size: 16px; color: #4CAF50; font-weight: 700; margin-top: 2px;">₹${amountInRupees}</div>
                </div>
              </div>
            </div>

            <!-- Bootcamp Details -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f7fa 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 1px solid #b3e5fc;">
              <h3 style="color: #0277bd; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                <span style="background: #0277bd; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">📅</span>
                Bootcamp Schedule
              </h3>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div style="font-size: 12px; color: #666; font-weight: 500; margin-bottom: 5px;">DATES</div>
                  <div style="font-size: 14px; color: #0277bd; font-weight: 600;">August 4th-17th, 2025</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div style="font-size: 12px; color: #666; font-weight: 500; margin-bottom: 5px;">TIME</div>
                  <div style="font-size: 14px; color: #0277bd; font-weight: 600;">9:30 AM - 10:30 AM IST</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div style="font-size: 12px; color: #666; font-weight: 500; margin-bottom: 5px;">DURATION</div>
                  <div style="font-size: 14px; color: #0277bd; font-weight: 600;">2 weeks (Mon-Fri only)</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div style="font-size: 12px; color: #666; font-weight: 500; margin-bottom: 5px;">MODE</div>
                  <div style="font-size: 14px; color: #0277bd; font-weight: 600;">Live Zoom Sessions</div>
                </div>
              </div>
            </div>

            <!-- FREE Linux Resources Section -->
            <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffecb3 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 1px solid #ffcc02; position: relative;">
              <div style="position: absolute; top: -10px; left: 25px; background: #ff9800; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                🎁 FREE BONUS
              </div>
              <h3 style="color: #e65100; margin: 15px 0 15px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                <span style="background: #e65100; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">🐧</span>
                Linux for DevOps Resources
              </h3>
              <p style="margin: 0 0 20px 0; color: #bf360c; font-size: 14px; line-height: 1.6;">
                As a bonus, access our complete <strong>Linux for DevOps webinar recordings</strong> and materials from our previous sessions!
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 12px; border: 2px dashed #ffab00;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; box-shadow: 0 4px 12px rgba(255,152,0,0.3);">
                    📁
                  </div>
                  <div style="flex: 1;">
                    <div style="font-size: 16px; font-weight: 600; color: #e65100; margin-bottom: 5px;">Complete Linux Training Archive</div>
                    <div style="font-size: 13px; color: #bf360c; margin-bottom: 12px;">📹 Recordings • 📝 Notes • 💾 VirtualBox Setup • 🖥️ CentOS Installation</div>
                    <a href="https://drive.google.com/drive/folders/1c75JeihmFQdP1Pd48XdKzli9hFu2FR_G?usp=sharing" 
                       style="display: inline-block; background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(255,152,0,0.3); transition: all 0.3s ease;">
                      🚀 Access Resources Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- What's Next Section -->
            <div style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 1px solid #ce93d8;">
              <h3 style="color: #7b1fa2; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                <span style="background: #7b1fa2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">⏭️</span>
                What's Next?
              </h3>
              
              <div style="display: grid; gap: 15px;">
                <div style="background: white; padding: 18px; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div style="background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">
                    🔗
                  </div>
                  <div>
                    <div style="font-weight: 600; color: #7b1fa2; font-size: 15px;">Zoom Meeting Link</div>
                    <div style="font-size: 13px; color: #8e24aa; margin-top: 2px;">Will be shared 24 hours before the bootcamp starts</div>
                  </div>
                </div>
                
                <div style="background: white; padding: 18px; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div style="background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">
                    💬
                  </div>
                  <div>
                    <div style="font-weight: 600; color: #7b1fa2; font-size: 15px;">WhatsApp Community</div>
                    <div style="font-size: 13px; color: #8e24aa; margin-top: 2px;">You'll be added to our exclusive learners group soon</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA Section -->
            <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #1447E6 0%, #0066ff 100%); border-radius: 15px; color: white;">
              <div style="font-size: 20px; margin-bottom: 8px;">🚀</div>
              <div style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Ready to Master Containers?</div>
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 15px;">Prepare yourself for the most comprehensive Docker & Kubernetes journey!</div>
              <div style="font-size: 13px; opacity: 0.8;">Questions? Reach out to <strong>info@devopscommunity.com</strong></div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <div style="font-size: 12px; color: #6c757d; margin-bottom: 8px;">
              This is an automated confirmation email. Please do not reply directly.
            </div>
            <div style="font-size: 14px; color: #495057; font-weight: 500;">
              See you in the bootcamp! 🐳💻 
            </div>
          </div>
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
    
    // Log complete webhook payload for debugging
    logEvent('COMPLETE_WEBHOOK_PAYLOAD', {
      requestId,
      event: data.event,
      fullPayload: data,
      payloadKeys: Object.keys(data.payload || {}),
      timestamp: new Date().toISOString()
    });
    
    // Log ALL events that come through - this will help us see the pattern
    logEvent('ALL_WEBHOOK_EVENTS', {
      requestId,
      event: data.event,
      hasPayment: !!data.payload?.payment,
      hasPaymentLink: !!data.payload?.payment_link,
      hasOrder: !!data.payload?.order,
      hasInvoice: !!data.payload?.invoice,
      paymentId: data.payload?.payment?.entity?.id,
      paymentLinkId: data.payload?.payment_link?.entity?.id,
      orderId: data.payload?.order?.entity?.id,
      invoiceId: data.payload?.invoice?.entity?.id,
      timestamp: new Date().toISOString()
    });

    // Log invoice.paid events with detailed information
    if (data.event === 'invoice.paid' && data.payload.invoice) {
      logEvent('INVOICE_PAID_DETAILED', {
        requestId,
        event: data.event,
        invoiceData: data.payload.invoice.entity,
        customerDetails: data.payload.invoice.entity.customer_details,
        paymentData: data.payload.payment?.entity,
        availableInvoiceFields: Object.keys(data.payload.invoice.entity || {}),
        availableCustomerFields: Object.keys(data.payload.invoice.entity.customer_details || {}),
        timestamp: new Date().toISOString()
      });
    }
    
    // ONLY process payment.captured events - ignore all others
    if (data.event !== 'payment.captured') {
      logEvent('EVENT_IGNORED', {
        requestId,
        event: data.event,
        reason: 'Only payment.captured events are processed',
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        { message: 'Event acknowledged but not processed' },
        { status: 200, headers: corsHeaders }
      );
    }

    // Check if payment data exists
    if (!data.payload.payment) {
      logEvent('PAYMENT_MISSING', {
        requestId,
        event: data.event,
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        { error: 'Payment data missing' },
        { status: 400, headers: corsHeaders }
      );
    }

    const payment = data.payload.payment.entity;
    const paymentId = payment.id;
    
    // Check for duplicates using payment ID
    if (processedPayments.has(paymentId)) {
      logEvent('DUPLICATE_PAYMENT_IGNORED', {
        requestId,
        paymentId,
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        { message: 'Payment already processed' },
        { status: 200, headers: corsHeaders }
      );
    }

    // Mark as processed immediately
    processedPayments.add(paymentId);

    // Log payment details
    logEvent('PAYMENT_DETAILED', {
      requestId,
      fullPaymentData: data.payload.payment,
      paymentEntity: payment,
      availablePaymentFields: Object.keys(payment || {}),
      availableNotesFields: Object.keys(payment.notes || {}),
      timestamp: new Date().toISOString()
    });
    
    logEvent('PAYMENT_CAPTURED', {
      requestId,
      paymentId: payment.id,
      amount: payment.amount,
      email: payment.email,
      contact: payment.contact || 'Not provided',
      notes: payment.notes
    });

    // Send confirmation email using payment data
    try {
      await sendConfirmationEmail({
        email: payment.email,
        amount: payment.amount,
        id: payment.id,
        name: payment.notes?.name,
        contact: payment.contact
      });
      
      logEvent('WEBHOOK_SUCCESS', {
        requestId,
        paymentId: payment.id,
        emailSent: true,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { message: 'Payment processed and email sent successfully' },
        { status: 200, headers: corsHeaders }
      );
    } catch (emailError) {
      logEvent('EMAIL_SEND_FAILED', {
        requestId,
        paymentId: payment.id,
        error: emailError instanceof Error ? emailError.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      
      // Still return success to prevent Razorpay retries
      return NextResponse.json(
        { message: 'Payment processed but email failed' },
        { status: 200, headers: corsHeaders }
      );
    }

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
