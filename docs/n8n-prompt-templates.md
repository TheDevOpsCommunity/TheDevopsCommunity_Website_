# N8N Prompt Templates for Different Topics

## 🎯 Base Prompt Template

```
You are an expert technical writer. Create a comprehensive blog post about "{{TOPIC}}" following these specifications:

**RESPONSE FORMAT**: Return ONLY a valid JSON object - no additional text outside the JSON.

**TOPIC**: {{TOPIC}}
**CATEGORY**: {{CATEGORY}} (must be one of: DevOps, Kubernetes, AWS, Azure, Infrastructure, Data Science, Security, Monitoring)

**REQUIREMENTS**:
- Title: Max 100 characters, SEO-friendly, include main keywords
- Slug: lowercase-with-hyphens, max 60 characters
- Summary: 150-200 characters, value-focused, no ending period
- Content: 1000+ words in markdown format with H1/H2/H3 structure
- Reading Time: Calculate as (word_count ÷ 200) rounded up
- Code Snippets: 3-4 practical examples with language, code, and description
- Tags: 5-7 relevant tags with proper capitalization
- Authors: ["{{AUTHOR_TYPE}}"]

**MARKDOWN FORMATTING RULES** (CRITICAL):
- Use double line breaks (\n\n) between ALL sections
- Use single hyphen (-) for bullet points, never asterisks (*)
- Use single space after numbers: "1. Item" not "1.  Item"
- Always add blank line before and after lists
- Code blocks must include actual commands, not just comments
- Format: "```language\nactual command here\n```"

**CONTENT FOCUS**:
- Practical, actionable advice
- Real-world examples and scenarios
- Best practices and common pitfalls
- Step-by-step instructions where applicable
- Professional, informative tone

**EXAMPLE CORRECT FORMAT**:
"## Prerequisites\n\nYou'll need:\n\n- Item 1\n- Item 2\n\n## Installation\n\nRun these commands:\n\n```bash\nkubectl create namespace argocd\nkubectl apply -f manifest.yaml\n```\n\nNext section here."

Return only the JSON response matching the provided structure.
```

## 🔧 Topic-Specific Prompts

### DevOps Topics
```
TOPIC: "GitOps Workflow Implementation with ArgoCD and Kubernetes"
CATEGORY: "DevOps"
AUTHOR_TYPE: "DevOps Expert"
```

### AWS Topics
```
TOPIC: "AWS Lambda Cost Optimization Strategies for Serverless Applications"
CATEGORY: "AWS"
AUTHOR_TYPE: "Cloud Architecture Team"
```

### Security Topics
```
TOPIC: "Zero Trust Architecture Implementation in Cloud Environments"
CATEGORY: "Security"
AUTHOR_TYPE: "Security Team"
```

### Data Science Topics
```
TOPIC: "MLOps Pipeline Automation with Python and Docker"
CATEGORY: "Data Science"
AUTHOR_TYPE: "Data Science Team"
```

## 📋 N8N Workflow Steps

### 1. HTTP Request Node (Optional - for topic suggestions)
```json
{
  "method": "GET",
  "url": "https://api.example.com/trending-topics",
  "headers": {
    "Authorization": "Bearer {{API_KEY}}"
  }
}
```

### 2. Set Node (Topic Configuration)
```json
{
  "topic": "Docker Multi-Stage Builds for Production Applications",
  "category": "DevOps",
  "author_type": "DevOps Expert"
}
```

### 3. AI Node (OpenAI/Claude)
- **Model**: GPT-4 or Claude-3
- **Temperature**: 0.7
- **Max Tokens**: 4000
- **Prompt**: Use the base template with variables

### 4. Code Node (JSON Validation)
```javascript
// Validate and clean the AI response
const response = $json.choices[0].message.content;

try {
  // Remove any markdown formatting if present
  const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
  
  // Parse JSON
  const blogData = JSON.parse(cleanJson);
  
  // Validate required fields
  const required = ['title', 'slug', 'summary', 'category', 'content', 'reading_time', 'code_snippets', 'tags', 'authors'];
  const missing = required.filter(field => !blogData[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  // Validate category
  const validCategories = ['DevOps', 'Kubernetes', 'AWS', 'Azure', 'Infrastructure', 'Data Science', 'Security', 'Monitoring'];
  if (!validCategories.includes(blogData.category)) {
    throw new Error(`Invalid category: ${blogData.category}`);
  }
  
  return [{ json: blogData }];
  
} catch (error) {
  throw new Error(`JSON parsing failed: ${error.message}`);
}
```

### 5. HTTP Request Node (Supabase Insert)
```json
{
  "method": "POST",
  "url": "{{SUPABASE_URL}}/rest/v1/blog_posts",
  "headers": {
    "apikey": "{{SUPABASE_ANON_KEY}}",
    "Authorization": "Bearer {{SUPABASE_SERVICE_KEY}}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  },
  "body": {
    "title": "{{$json.title}}",
    "slug": "{{$json.slug}}",
    "summary": "{{$json.summary}}",
    "category": "{{$json.category}}",
    "content": "{{$json.content}}",
    "reading_time": "{{$json.reading_time}}",
    "cover_image": "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png",
    "code_snippets": "{{JSON.stringify($json.code_snippets)}}",
    "images": "[]",
    "tags": "{{JSON.stringify($json.tags)}}",
    "authors": "{{JSON.stringify($json.authors)}}"
  }
}
```

## 🎲 Random Topic Generator

### Topics Array for Variety
```javascript
const topics = [
  { topic: "Terraform State Management Best Practices", category: "Infrastructure", author: "DevOps Expert" },
  { topic: "Kubernetes Horizontal Pod Autoscaling Deep Dive", category: "Kubernetes", author: "Cloud Architecture Team" },
  { topic: "AWS Cost Optimization with Reserved Instances", category: "AWS", author: "Cloud Architecture Team" },
  { topic: "Container Security Scanning in CI/CD Pipelines", category: "Security", author: "Security Team" },
  { topic: "Monitoring Microservices with Prometheus and Grafana", category: "Monitoring", author: "DevOps Expert" },
  { topic: "Azure DevOps Pipeline Optimization Strategies", category: "Azure", author: "Cloud Architecture Team" },
  { topic: "Machine Learning Model Deployment with Kubernetes", category: "Data Science", author: "Data Science Team" },
  { topic: "Infrastructure as Code Testing with Terratest", category: "Infrastructure", author: "DevOps Expert" },
  { topic: "Service Mesh Implementation with Istio", category: "Kubernetes", author: "Cloud Architecture Team" },
  { topic: "AWS Lambda Performance Optimization", category: "AWS", author: "Cloud Architecture Team" }
];

// Select random topic
const randomTopic = topics[Math.floor(Math.random() * topics.length)];
return [{ json: randomTopic }];
```

## 🔍 Error Handling

### Error Node Configuration
```javascript
// Handle AI response errors
if ($json.error) {
  return [{
    json: {
      error: true,
      message: $json.error.message || 'AI generation failed',
      timestamp: new Date().toISOString(),
      topic: $('Set').first().$json.topic
    }
  }];
}

// Handle Supabase insertion errors  
if ($json.code && $json.code !== '201') {
  return [{
    json: {
      error: true,
      message: 'Database insertion failed',
      details: $json.message,
      timestamp: new Date().toISOString()
    }
  }];
}
```

This setup gives you a complete n8n workflow for automated blog generation with proper error handling and validation! 🚀