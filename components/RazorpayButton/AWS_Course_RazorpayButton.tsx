"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    __rzp__?: {
      init: () => void;
    };
  }
}

type RazorpayButtonProps = {
  url: string;
  text: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  className?: string;
};

export default function RazorpayButton({ url, text, color, size, className }: RazorpayButtonProps) {
  useEffect(() => {
    const scriptId = 'razorpay-embed-btn-js';
    
    const initializeRazorpay = () => {
      if (window.__rzp__ && window.__rzp__.init) {
        window.__rzp__.init();
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.razorpay.com/static/embed_btn/bundle.js';
      script.defer = true;
      script.onload = initializeRazorpay;
      document.body.appendChild(script);
    } else {
      initializeRazorpay();
    }
  }, []);

  return (
    <div 
      className={`razorpay-embed-btn flex items-center justify-center ${className || ''}`}
      data-url={url}
      data-text={text}
      data-color={color}
      data-size={size}
    />
  );
} 