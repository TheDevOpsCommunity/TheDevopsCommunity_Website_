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
    subject: 'Registration Confirmed - Docker & Kubernetes Bootcamp',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); min-height: 100vh;">
        
        <!-- Main Container -->
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e9ecef;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #212529 0%, #343a40 100%); padding: 32px; text-align: center; border-bottom: 3px solid #000000;">
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.01em;">Registration Confirmed</h1>
            <p style="color: #adb5bd; font-size: 16px; margin: 0; font-weight: 400;">Hello ${userName}</p>
          </div>

          <!-- Content Container -->
          <div style="padding: 32px;">
            
            <!-- Confirmation Details -->
            <div style="margin-bottom: 32px;">
              <h2 style="color: #212529; font-size: 20px; font-weight: 600; margin: 0 0 8px 0; line-height: 1.3;">Docker & Kubernetes Mastery</h2>
              <p style="color: #6c757d; font-size: 16px; margin: 0 0 4px 0; font-weight: 500;">2-Week Live Bootcamp</p>
              <p style="color: #495057; font-size: 14px; line-height: 1.5; margin: 0 0 24px 0;">Your registration has been successfully confirmed.</p>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 24px; box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);">
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                  <div style="flex: 1; min-width: 180px;">
                    <span style="color: #6c757d; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Transaction ID</span>
                    <div style="color: #212529; font-size: 15px; font-weight: 600; margin-top: 4px; font-family: 'SF Mono', Monaco, monospace; background-color: #ffffff; padding: 8px 12px; border-radius: 4px; border: 1px solid #dee2e6;">${id}</div>
                  </div>
                  <div style="flex: 1; min-width: 120px;">
                    <span style="color: #6c757d; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Amount Paid</span>
                    <div style="color: #198754; font-size: 18px; font-weight: 700; margin-top: 4px;">₹${amountInRupees}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Schedule -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #e9ecef;">Schedule Details</h3>
              <div style="border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);">
                <div style="padding: 16px 20px; border-bottom: 1px solid #e9ecef; background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Dates</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">22nd August - 4th September, 2025</div>
                </div>
                <div style="padding: 16px 20px; border-bottom: 1px solid #e9ecef; background-color: #ffffff;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Time</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">9:30 AM - 10:30 AM IST (Mon-Fri)</div>
                </div>
                <div style="padding: 16px 20px; border-bottom: 1px solid #e9ecef; background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Duration</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">2 weeks, weekdays only</div>
                </div>
                <div style="padding: 16px 20px; background-color: #ffffff;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Format</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">Live Zoom Sessions</div>
                </div>
              </div>
            </div>

            <!-- Linux Resources -->
            <div style="margin-bottom: 32px; border: 2px solid #212529; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);">
              <div style="background: linear-gradient(135deg, #212529 0%, #343a40 100%); padding: 20px; border-bottom: 1px solid #000000;">
                <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">Bonus: Linux for DevOps Resources</h3>
                <p style="color: #adb5bd; font-size: 14px; line-height: 1.5; margin: 0;">Access our complete Linux for DevOps webinar recordings and materials from previous sessions.</p>
              </div>
              
              <div style="background-color: #ffffff; padding: 24px;">
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                  <div style="color: #212529; font-size: 16px; font-weight: 600; margin-bottom: 6px;">Complete Linux Training Archive</div>
                  <div style="color: #6c757d; font-size: 13px; line-height: 1.4;">Recordings • Notes • VirtualBox Setup • CentOS Installation</div>
                </div>
                
                <a href="https://drive.google.com/drive/folders/1c75JeihmFQdP1Pd48XdKzli9hFu2FR_G?usp=sharing" 
                   style="display: inline-block; background: linear-gradient(135deg, #212529 0%, #343a40 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 6px; box-shadow: 0 2px 8px rgba(33, 37, 41, 0.2); transition: all 0.3s ease; border: 1px solid #000000;">
                  Access Resources
                </a>
              </div>
            </div>

            <!-- Next Steps -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #e9ecef;">Next Steps</h3>
              
              <div style="margin-bottom: 16px; background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; border-left: 4px solid #212529; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);">
                <div style="color: #212529; font-size: 15px; font-weight: 600; margin-bottom: 6px;">Zoom Meeting Link</div>
                <div style="color: #6c757d; font-size: 13px; line-height: 1.4;">Will be shared 24 hours before the bootcamp starts</div>
              </div>
              
              <div style="background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; border-left: 4px solid #212529; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);">
                <div style="color: #212529; font-size: 15px; font-weight: 600; margin-bottom: 6px;">WhatsApp Community</div>
                <div style="color: #6c757d; font-size: 13px; line-height: 1.4;">You will be added to our learners group soon</div>
              </div>
            </div>

            <!-- Support -->
            <div style="text-align: center; padding: 24px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);">
              <p style="color: #212529; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Questions?</p>
              <p style="color: #6c757d; font-size: 14px; margin: 0; font-weight: 500;">Contact us at <span style="color: #212529; font-weight: 600;">info@devopscommunity.com</span></p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%); padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 12px; margin: 0; font-weight: 500;">This is an automated confirmation email.</p>
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
