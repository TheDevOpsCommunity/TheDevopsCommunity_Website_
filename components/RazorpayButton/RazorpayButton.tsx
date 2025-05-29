"use client";

import { useEffect } from 'react';

export default function RazorpayButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.razorpay.com/static/embed_btn/bundle.js';
    script.defer = true;
    script.id = 'razorpay-embed-btn-js';
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('razorpay-embed-btn-js');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div 
      className="razorpay-embed-btn flex items-center justify-center" 
      data-url="https://pages.razorpay.com/pl_QagyuudF7fb68H/view"
      data-text="Pay Now & Register"
      data-color="#528FF0"
      data-size="large"
    />
  );
} 