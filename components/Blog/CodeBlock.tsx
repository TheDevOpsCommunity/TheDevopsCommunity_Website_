"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

interface CodeBlockProps {
  language: string;
  code: string;
  description?: string;
}

export default function CodeBlock({ language, code, description }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-6 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 capitalize">
            {language}
          </span>
          {description && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{description}</span>
            </>
          )}
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors px-3 py-1 rounded hover:bg-gray-100"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#1a1a1a',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
          showLineNumbers={code.split('\n').length > 5}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}