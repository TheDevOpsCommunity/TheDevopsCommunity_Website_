"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon, CurrencyRupeeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type PriceResponse = {
  amount: number;
  currency: string;
  appliedPromo: string | null;
  originalAmount: number;
};

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3 hover:bg-blue-100 transition-colors">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div>
        <div className="text-xs md:text-sm text-blue-600 font-medium">{title}</div>
        <div className="text-sm md:text-base font-semibold text-blue-900">{value}</div>
      </div>
    </div>
  );
}

export default function DockerKubernetesCheckoutPage() {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(5999);
  const [original, setOriginal] = useState<number>(5999);
  const [isApplying, setIsApplying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formattedPrice = useMemo(() => `₹${price.toLocaleString("en-IN")}`, [price]);

  const fetchPrice = useCallback(async (code?: string) => {
    setIsApplying(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/docker-kubernetes/compute-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode: code || "" }),
      });
      const data = (await res.json()) as PriceResponse | { error: string };
      if (!res.ok || (data as any).error) throw new Error((data as any).error || "Failed to compute price");
      const pr = data as PriceResponse;
      setPrice(pr.amount);
      setAppliedPromo(pr.appliedPromo);
      setOriginal(pr.originalAmount || 5999);
    } catch (e) {
      setError((e as Error)?.message || "Failed to compute price");
    } finally {
      setIsApplying(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  const handleApplyPromo = async () => {
    await fetchPrice(promoCode.trim());
  };

  const handlePay = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      
      // Collect customer info
      const name = (document.getElementById("cust-name") as HTMLInputElement)?.value?.trim();
      const email = (document.getElementById("cust-email") as HTMLInputElement)?.value?.trim();
      const contact = (document.getElementById("cust-contact") as HTMLInputElement)?.value?.trim();
      
      if (!name || !email || !contact) {
        setError("Please enter name, email, and contact");
        return;
      }

      // Create order on server (backend-only promo validation)
      const orderRes = await fetch("/api/checkout/docker-kubernetes/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode: appliedPromo || promoCode, customer: { name, email, contact } }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData?.error || "Failed to create order");

      // Load Razorpay checkout script if not present
      const scriptId = "razorpay-checkout-js";
      if (!document.getElementById(scriptId)) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.id = scriptId;
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Failed to load Razorpay"));
          document.body.appendChild(s);
        });
      }

      const options: any = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DevOps Community",
        description: "Docker & Kubernetes Mastery – 2-Week Bootcamp",
        order_id: orderData.orderId,
        prefill: { name, email, contact },
        notes: { label: "docker_kubernetes" },
        handler: async function (response: any) {
          try {
            const confirmRes = await fetch("/api/checkout/docker-kubernetes/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const confirmData = await confirmRes.json();
            if (!confirmRes.ok) throw new Error(confirmData?.error || "Payment verification failed");
            alert("Payment successful! You will receive a confirmation email shortly.");
          } catch (err) {
            setError((err as Error)?.message || "Payment verification failed");
          }
        },
        theme: { color: "#0ea5e9" },
      };

      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      setError((e as Error)?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Docker & Kubernetes Mastery
          </h1>
          <p className="text-lg text-blue-700 font-medium">2-Week Live Bootcamp</p>
          <p className="text-sm text-blue-600 mt-2">Secure checkout with server-side validation</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            <span>🔒</span>
            <span>PCI-DSS compliant • Razorpay Secure</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Course Info (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-200"
            >
              <h2 className="text-xl font-bold text-blue-900 mb-4">Course Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard 
                  icon={<CalendarIcon className="w-5 h-5" />}
                  title="Dates"
                  value="6th–17th October, 2025"
                />
                <InfoCard 
                  icon={<ClockIcon className="w-5 h-5" />}
                  title="Time"
                  value="10:00 AM – 11:00 AM IST (Daily)"
                />
                <InfoCard 
                  icon={<UserIcon className="w-5 h-5" />}
                  title="Duration"
                  value="2 weeks, 1 hour each day"
                />
                <InfoCard 
                  icon={<CurrencyRupeeIcon className="w-5 h-5" />}
                  title="Mode"
                  value="Live Zoom Sessions"
                />
              </div>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-200"
            >
              <h2 className="text-xl font-bold text-blue-900 mb-4">What You'll Learn</h2>
              <ul className="space-y-2 text-blue-900">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span>Docker fundamentals & containerization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span>Kubernetes architecture & deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span>Production-ready container orchestration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span>CI/CD pipeline integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span>Real-world projects & hands-on labs</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right side - Checkout (1/3) */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-28 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-200"
            >
              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-blue-900/70">Course Fee</div>
                  <div className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Inclusive of GST</div>
                </div>
                {/* Price display */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-extrabold text-blue-900">
                      {isLoading ? 'Calculating…' : formattedPrice}
                    </span>
                    <span className="text-sm text-blue-700">Payable</span>
                  </div>
                  {appliedPromo && (
                    <div className="text-green-700 text-sm font-medium mt-1">
                      ✅ Promo applied: {appliedPromo}
                    </div>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-blue-900/70 mb-2">Promo Code</div>
                <div className="flex gap-2">
                  <input 
                    id="promo" 
                    value={promoCode} 
                    onChange={(e) => setPromoCode(e.target.value)} 
                    placeholder="Enter promo code" 
                    className="flex-1 rounded-lg border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                  <button 
                    onClick={handleApplyPromo} 
                    disabled={isApplying} 
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isApplying ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                <div className="mt-2 text-xs text-neutral-500">
                  Go to our <a href="https://www.instagram.com/devops__community/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:text-blue-800 underline">Instagram handle</a> and find promo codes.
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-blue-900/70 mb-3">Your Details</div>
                <div className="space-y-3">
                  <input 
                    id="cust-name" 
                    placeholder="Full name" 
                    className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                  <input 
                    id="cust-email" 
                    placeholder="Email address" 
                    type="email" 
                    className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                  <input 
                    id="cust-contact" 
                    placeholder="Contact number" 
                    className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-neutral-600">
                  <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2 py-1 text-center">UPI / Cards</div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2 py-1 text-center">Netbanking</div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-md px-2 py-1 text-center">EMI (Cards)</div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-red-700 text-sm">{error}</div>
                </div>
              )}

              {/* Pay Button */}
              <button 
                onClick={handlePay} 
                disabled={isLoading || isProcessing} 
                className="w-full px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : `Pay Securely`}
              </button>

              <div className="mt-4 text-xs text-neutral-500 text-center">
                <p>✅ Server-side price validation</p>
                <p>🔒 Secure payment via Razorpay</p>
                <p>📧 Confirmation email after payment</p>
              </div>
              <div className="mt-3 text-[11px] text-neutral-500 text-center">
                By paying you agree to our Terms. For support, write to info@devopscommunity.com
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
