"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading components
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 mt-8 first:mt-0 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 mt-8 leading-tight border-b-2 border-blue-100 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-blue-700 mb-3 mt-6 leading-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg md:text-xl font-semibold text-blue-600 mb-2 mt-4">
              {children}
            </h4>
          ),
          
          // Paragraph styling
          p: ({ children }) => (
            <p className="text-neutral-700 leading-relaxed mb-4 text-base md:text-lg">
              {children}
            </p>
          ),
          
          // List styling
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-700 ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-700 ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base md:text-lg leading-relaxed">
              {children}
            </li>
          ),
          
          // Link styling
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
            >
              {children}
            </a>
          ),
          
          // Blockquote styling
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-300 pl-6 py-2 my-6 bg-blue-50 rounded-r-lg italic text-blue-800">
              {children}
            </blockquote>
          ),
          
          // Table styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-blue-50">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900 border-b border-gray-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-neutral-700 border-b border-gray-100">
              {children}
            </td>
          ),
          
          // Code styling
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language) {
              return (
                <div className="my-6">
                  <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
                    <span className="text-sm font-medium capitalize">{language}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                      }}
                      className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={language}
                    PreTag="div"
                    className="!mt-0 rounded-t-none"
                    showLineNumbers={true}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }
            
            return (
              <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          
          // Image styling
          img: ({ src, alt }) => (
            <div className="my-8">
              <Image
                src={src || ''}
                alt={alt || ''}
                width={800}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                style={{ objectFit: 'cover' }}
              />
              {alt && (
                <p className="text-center text-sm text-neutral-500 mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          
          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-t-2 border-blue-100" />
          ),
          
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-blue-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-blue-800">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}