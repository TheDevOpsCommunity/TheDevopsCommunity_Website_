// N8N Code Node: Markdown Content Post-Processor
// Place this AFTER your AI node and BEFORE your Supabase insert

const blogData = $json;

// Function to fix markdown formatting issues
function fixMarkdownFormatting(content) {
  let fixed = content;
  
  // 1. Fix list formatting: Replace * with - for bullet points
  fixed = fixed.replace(/^\*   /gm, '- ');
  fixed = fixed.replace(/^\* /gm, '- ');
  
  // 2. Fix numbered list spacing: "1.  " -> "1. "
  fixed = fixed.replace(/^(\d+)\.  /gm, '$1. ');
  
  // 3. Ensure double line breaks between sections
  // Fix heading spacing
  fixed = fixed.replace(/(\n)(#{1,6} )/g, '\n\n$2');
  fixed = fixed.replace(/(#{1,6} [^\n]+)(\n)([^#\n])/g, '$1\n\n$3');
  
  // 4. Fix list spacing - ensure blank lines before/after lists
  fixed = fixed.replace(/(\n)([^\n]*:)(\n)([-*] )/g, '$1$2\n\n$4');
  fixed = fixed.replace(/([-*] [^\n]+)(\n)([^-*\n])/g, '$1\n\n$3');
  fixed = fixed.replace(/(\n)(\d+\. )/g, '\n\n$2');
  fixed = fixed.replace(/(\d+\. [^\n]+)(\n)([^\d\n])/g, '$1\n\n$3');
  
  // 5. Fix code block spacing
  fixed = fixed.replace(/(\n)(```)/g, '\n\n$2');
  fixed = fixed.replace(/(```)(\n)([^`])/g, '$1\n\n$3');
  
  // 6. Clean up multiple consecutive newlines (more than 2)
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  
  // 7. Ensure content starts and ends cleanly
  fixed = fixed.trim();
  
  return fixed;
}

// Apply the fixes
if (blogData.content) {
  blogData.content = fixMarkdownFormatting(blogData.content);
  
  console.log('Content processed:', {
    originalLength: $json.content.length,
    processedLength: blogData.content.length,
    hasProperSpacing: blogData.content.includes('\n\n'),
    bulletPointsFixed: !blogData.content.includes('*   ')
  });
}

return [{ json: blogData }];