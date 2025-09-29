import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Types for webhook payload
interface RazorpayPaymentEntity {
  id: string;
  amount: number;
  email: string;
  contact?: string;
  payment_page?: string;
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

// Payment page ID mappings
const PAYMENT_PAGE_IDS = {
  WEBINAR: 'pl_RMI4kw9wUDVfWG',
  AWS_DEVOPS: 'pl_Qh23UMxKat9LKQ',
  AZURE_DEVOPS: 'pl_RDakh7O49L14YT',
  DOCKER_K8S: 'pl_QyuVjAdAPl6lAo'
} as const;

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
    subject: 'Registration Confirmed - Terraform Webinar Series (Azure Focus)',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); min-height: 100vh;">
        
        <!-- Main Container -->
        <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e9ecef;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 32px; text-align: center; border-bottom: 3px solid #1e40af;">
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.01em;">Registration Confirmed</h1>
            <p style="color: #dbeafe; font-size: 16px; margin: 0; font-weight: 400;">Hello ${userName}</p>
          </div>

          <!-- Content Container -->
          <div style="padding: 32px;">
            
            <!-- Confirmation Details -->
            <div style="margin-bottom: 32px;">
              <h2 style="color: #212529; font-size: 20px; font-weight: 600; margin: 0 0 8px 0; line-height: 1.3;">Terraform Webinar Series</h2>
              <p style="color: #6c757d; font-size: 16px; margin: 0 0 4px 0; font-weight: 500;">Azure Infrastructure as Code (5 Days)</p>
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
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">6th - 10th October, 2025</div>
                </div>
                <div style="padding: 16px 20px; border-bottom: 1px solid #e9ecef; background-color: #ffffff;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Time</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">7:00 PM - 8:30 PM IST (Daily)</div>
                </div>
                <div style="padding: 16px 20px; border-bottom: 1px solid #e9ecef; background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Duration</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">5 days, 1.5 hours each day</div>
                </div>
                <div style="padding: 16px 20px; background-color: #ffffff;">
                  <div style="color: #6c757d; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Format</div>
                  <div style="color: #212529; font-size: 15px; font-weight: 600;">Live Zoom Sessions</div>
                </div>
              </div>
            </div>

            <!-- Course Curriculum -->
            <div style="margin-bottom: 32px; border: 2px solid #2563eb; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(37, 99, 235, 0.08);">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 20px; border-bottom: 1px solid #1e40af;">
                <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">What You'll Learn</h3>
                <p style="color: #dbeafe; font-size: 14px; line-height: 1.5; margin: 0;">Complete Terraform mastery with Azure focus, from basics to production deployment.</p>
              </div>
              
              <div style="background-color: #ffffff; padding: 24px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 16px;">
                    <div style="color: #212529; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Day 1-2: Fundamentals</div>
                    <div style="color: #6c757d; font-size: 12px; line-height: 1.4;">IaC concepts, Terraform basics, Azure demos</div>
                  </div>
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 16px;">
                    <div style="color: #212529; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Day 3-4: Advanced</div>
                    <div style="color: #6c757d; font-size: 12px; line-height: 1.4;">Modules, workspaces, Azure resources</div>
                  </div>
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 16px;">
                    <div style="color: #212529; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Day 5: CI/CD</div>
                    <div style="color: #6c757d; font-size: 12px; line-height: 1.4;">Azure DevOps, pipelines, best practices</div>
                  </div>
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 16px;">
                    <div style="color: #212529; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Capstone Project</div>
                    <div style="color: #6c757d; font-size: 12px; line-height: 1.4;">3-tier Azure app deployment</div>
                  </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; text-align: center;">
                  <div style="color: #0c4a6e; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Certificate of Completion Included</div>
                  <div style="color: #0369a1; font-size: 12px;">Lifetime access to recordings and materials</div>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #212529; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #e9ecef;">Next Steps</h3>
              
              <div style="margin-bottom: 16px; background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; border-left: 4px solid #2563eb; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);">
                <div style="color: #212529; font-size: 15px; font-weight: 600; margin-bottom: 6px;">Zoom Meeting Link</div>
                <div style="color: #6c757d; font-size: 13px; line-height: 1.4;">Will be shared 24 hours before the webinar series starts</div>
              </div>
              
              <div style="background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; border-left: 4px solid #2563eb; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);">
                <div style="color: #212529; font-size: 15px; font-weight: 600; margin-bottom: 6px;">WhatsApp Community</div>
                <div style="color: #6c757d; font-size: 13px; line-height: 1.4;">You will be added to our Terraform learners group soon</div>
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

    // Mark as processed immediately to prevent race conditions
    processedPayments.add(paymentId);

    // Log payment details
    logEvent('PAYMENT_DETAILED', {
      requestId,
      fullPaymentData: data.payload.payment,
      paymentEntity: payment,
      availablePaymentFields: Object.keys(payment || {}),
      availableNotesFields: Object.keys(payment.notes || {}),
      paymentPageId: payment.payment_page,
      timestamp: new Date().toISOString()
    });
    
    logEvent('PAYMENT_CAPTURED', {
      requestId,
      paymentId: payment.id,
      amount: payment.amount,
      email: payment.email,
      contact: payment.contact || 'Not provided',
      paymentPageId: payment.payment_page,
      notes: payment.notes
    });

    // Route based on payment page ID
    const paymentPageId = payment.payment_page;
    
    if (paymentPageId === PAYMENT_PAGE_IDS.WEBINAR) {
      // Handle webinar payment (current handler)
      logEvent('ROUTING_TO_WEBINAR', { requestId, paymentPageId });
      
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
          handler: 'webinar',
          timestamp: new Date().toISOString()
        });

        return NextResponse.json(
          { message: 'Webinar payment processed and email sent successfully' },
          { status: 200, headers: corsHeaders }
        );
      } catch (emailError) {
        logEvent('EMAIL_SEND_FAILED', {
          requestId,
          paymentId: payment.id,
          handler: 'webinar',
          error: emailError instanceof Error ? emailError.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });

        return NextResponse.json(
          { message: 'Webinar payment processed but email failed' },
          { status: 200, headers: corsHeaders }
        );
      }
    } else if (paymentPageId === PAYMENT_PAGE_IDS.AWS_DEVOPS) {
      // Route to AWS DevOps course handler
      logEvent('ROUTING_TO_AWS_DEVOPS', { requestId, paymentPageId });
      
      try {
        // Create a new Request object with the raw body for signature verification
        const newRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: rawBody
        });
        
        // Import and call AWS DevOps handler directly with timeout
        const { POST: awsHandler } = await import('../courses/aws-devops/route');
        const awsResponse = await Promise.race([
          awsHandler(newRequest),
          new Promise<Response>((_, reject) => 
            setTimeout(() => reject(new Error('AWS DevOps handler timeout')), 30000)
          )
        ]);
        
        // Check if the handler processed successfully
        if (!awsResponse.ok) {
          const errorText = await awsResponse.text();
          logEvent('AWS_DEVOPS_HANDLER_ERROR', {
            requestId,
            paymentId: payment.id,
            status: awsResponse.status,
            error: errorText,
            timestamp: new Date().toISOString()
          });
          throw new Error(`AWS DevOps handler failed: ${awsResponse.status} - ${errorText}`);
        }
        
        logEvent('AWS_DEVOPS_ROUTED', {
          requestId,
          paymentId: payment.id,
          status: awsResponse.status,
          timestamp: new Date().toISOString()
        });

        return NextResponse.json(
          { message: 'Payment routed to AWS DevOps handler' },
          { status: 200, headers: corsHeaders }
        );
      } catch (routingError) {
        logEvent('AWS_DEVOPS_ROUTING_FAILED', {
          requestId,
          paymentId: payment.id,
          error: routingError instanceof Error ? routingError.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });

        return NextResponse.json(
          { error: 'Failed to route to AWS DevOps handler' },
          { status: 500, headers: corsHeaders }
        );
      }
    } else if (paymentPageId === PAYMENT_PAGE_IDS.AZURE_DEVOPS) {
  } else if (paymentPageId === PAYMENT_PAGE_IDS.DOCKER_K8S) {
    // Route to Docker & Kubernetes bootcamp handler
    logEvent('ROUTING_TO_DOCKER_K8S', { requestId, paymentPageId });
    try {
      const newRequest = new Request(request.url, {
        method: request.method,
        headers: request.headers,
        body: rawBody
      });
      const { POST: dkHandler } = await import('../courses/docker-kubernetes/route');
      const dkResponse = await Promise.race([
        dkHandler(newRequest),
        new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('Docker K8s handler timeout')), 30000))
      ]);
      if (!dkResponse.ok) {
        const errorText = await dkResponse.text();
        logEvent('DOCKER_K8S_HANDLER_ERROR', { requestId, paymentId: payment.id, status: dkResponse.status, error: errorText });
        throw new Error(`Docker K8s handler failed: ${dkResponse.status} - ${errorText}`);
      }
      logEvent('DOCKER_K8S_ROUTED', { requestId, paymentId: payment.id, status: dkResponse.status });
      return dkResponse;
    } catch (error) {
      logEvent('DOCKER_K8S_ROUTING_ERROR', { requestId, error: error instanceof Error ? error.message : 'Unknown error' });
      return NextResponse.json({ message: 'Docker K8s handler error' }, { status: 500, headers: corsHeaders });
    }
      // Route to Azure DevOps course handler
      logEvent('ROUTING_TO_AZURE_DEVOPS', { requestId, paymentPageId });
      
      try {
        // Create a new Request object with the raw body for signature verification
        const newRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: rawBody
        });
        
        // Import and call Azure DevOps handler directly with timeout
        const { POST: azureHandler } = await import('../courses/azure-devops/route');
        const azureResponse = await Promise.race([
          azureHandler(newRequest),
          new Promise<Response>((_, reject) => 
            setTimeout(() => reject(new Error('Azure DevOps handler timeout')), 30000)
          )
        ]);
        
        // Check if the handler processed successfully
        if (!azureResponse.ok) {
          const errorText = await azureResponse.text();
          logEvent('AZURE_DEVOPS_HANDLER_ERROR', {
            requestId,
            paymentId: payment.id,
            status: azureResponse.status,
            error: errorText,
            timestamp: new Date().toISOString()
          });
          throw new Error(`Azure DevOps handler failed: ${azureResponse.status} - ${errorText}`);
        }
        
        logEvent('AZURE_DEVOPS_ROUTED', {
          requestId,
          paymentId: payment.id,
          status: azureResponse.status,
          timestamp: new Date().toISOString()
        });

        return NextResponse.json(
          { message: 'Payment routed to Azure DevOps handler' },
          { status: 200, headers: corsHeaders }
        );
      } catch (e) {
        const errMsg = (e as Error)?.message ?? 'Unknown error';
        logEvent('AZURE_DEVOPS_ROUTING_FAILED', {
          requestId,
          paymentId: payment.id,
          error: errMsg,
          timestamp: new Date().toISOString()
        });

        return NextResponse.json(
          { error: 'Failed to route to Azure DevOps handler' },
          { status: 500, headers: corsHeaders }
        );
      }
    } else {
      // Unknown payment page ID
      logEvent('UNKNOWN_PAYMENT_PAGE', {
        requestId,
        paymentId: payment.id,
        paymentPageId: paymentPageId,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { error: 'Unknown payment page ID' },
        { status: 400, headers: corsHeaders }
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
