# N8N AI Blog Creation Prompt

## 🤖 Main Prompt for AI Node

```
You are an expert technical writer specializing in DevOps, Cloud, and Infrastructure topics. Create a comprehensive blog post about "CI/CD Pipeline Best Practices with Jenkins and Docker" following these exact specifications:

**RESPONSE FORMAT**: Return ONLY a valid JSON object with the following structure - no additional text, explanations, or markdown formatting outside the JSON.

**REQUIREMENTS**:

1. **Title**: 
   - Maximum 100 characters
   - Include main keywords
   - SEO-friendly and descriptive
   - Use title case

2. **Slug**: 
   - Convert title to lowercase
   - Replace spaces with hyphens
   - Remove special characters
   - Only letters, numbers, and hyphens
   - Maximum 60 characters

3. **Summary**: 
   - Exactly 150-200 characters
   - Explain the value proposition
   - Include primary keywords
   - No ending period
   - Action-oriented (Learn, Master, Discover)

4. **Category**: 
   - MUST be exactly one of: "DevOps", "Kubernetes", "AWS", "Azure", "Infrastructure", "Data Science", "Security", "Monitoring"
   - Use exact capitalization

5. **Content**: 
   - Minimum 1000 words
   - Use proper markdown formatting
   - Structure: H1 (title), H2 (main sections), H3 (subsections)
   - Include practical examples and best practices
   - Add bullet points and numbered lists where appropriate
   - Use **bold** for important terms
   - Include real-world scenarios
   - End with a conclusion section

6. **Reading Time**: 
   - Calculate as: (total_words ÷ 200) rounded up to nearest integer
   - Return as number only

7. **Code Snippets**: 
   - Include 3-4 practical code examples
   - Each must have: language, code, description
   - Use proper language identifiers: bash, dockerfile, yaml, json, python, javascript, etc.
   - Code should be real, working examples
   - Include line breaks as \n in JSON

8. **Tags**: 
   - Provide 5-7 relevant tags
   - Use proper capitalization (Docker, not docker)
   - Include technology names, methodologies, and cloud providers
   - Examples: ["Jenkins", "Docker", "CI/CD", "DevOps", "Pipeline", "Automation"]

9. **Authors**: 
   - Use ["DevOps Expert"] for technical topics
   - Use ["Cloud Architecture Team"] for cloud-focused content
   - Use ["Security Team"] for security topics

**CONTENT GUIDELINES**:
- Focus on practical, actionable advice
- Include common pitfalls and how to avoid them
- Provide step-by-step instructions where applicable
- Use real-world examples and scenarios
- Maintain professional, informative tone
- Include best practices and industry standards

**JSON STRUCTURE**: Use the exact field names and structure shown in the example. Ensure all JSON is properly escaped and valid.

Create the blog post now and return only the JSON response.
```

## 🔧 Example JSON Response Structure

```json
{
  "title": "Kubernetes Pod Security: Complete Guide to Secure Container Deployment",
  "slug": "kubernetes-pod-security-complete-guide",
  "summary": "Master Kubernetes pod security with comprehensive policies, best practices, and real-world examples for secure container deployments in production environments",
  "category": "Security",
  "content": "# Kubernetes Pod Security: Complete Guide to Secure Container Deployment\n\nKubernetes security is paramount in modern container orchestration. This comprehensive guide covers essential pod security practices that every DevOps engineer should implement.\n\n## Understanding Pod Security Context\n\nPod Security Context defines privilege and access control settings for a Pod or Container. It's your first line of defense against potential security vulnerabilities.\n\n### Key Security Context Fields\n\n- **runAsUser**: Specifies the user ID to run containers\n- **runAsGroup**: Sets the primary group ID\n- **fsGroup**: Defines the filesystem group ownership\n- **runAsNonRoot**: Ensures containers don't run as root\n\n## Security Policies and Standards\n\n### Pod Security Standards\n\nKubernetes 1.23+ introduced Pod Security Standards replacing Pod Security Policies:\n\n1. **Privileged**: Unrestricted policy (not recommended for production)\n2. **Baseline**: Minimally restrictive policy preventing known privilege escalations\n3. **Restricted**: Heavily restricted policy following current pod hardening best practices\n\n### Implementing Security Contexts\n\nAlways configure security contexts to minimize attack surface:\n\n```yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  securityContext:\n    runAsUser: 1000\n    runAsGroup: 1000\n    runAsNonRoot: true\n    fsGroup: 2000\n  containers:\n  - name: app\n    image: nginx:alpine\n    securityContext:\n      allowPrivilegeEscalation: false\n      readOnlyRootFilesystem: true\n      capabilities:\n        drop:\n        - ALL\n        add:\n        - NET_BIND_SERVICE\n```\n\n## Resource Limits and Quotas\n\n### Setting Resource Constraints\n\nPreventing resource exhaustion attacks through proper limits:\n\n```yaml\nresources:\n  limits:\n    cpu: 500m\n    memory: 512Mi\n  requests:\n    cpu: 250m\n    memory: 256Mi\n```\n\n### Network Policies\n\nImplement network segmentation to control pod-to-pod communication:\n\n```yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: deny-all\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\n  - Egress\n```\n\n## Image Security Best Practices\n\n### Using Trusted Registries\n\n- **Private registries**: Use internal container registries\n- **Image scanning**: Implement vulnerability scanning in CI/CD\n- **Signed images**: Use image signing and verification\n- **Minimal base images**: Choose distroless or alpine images\n\n### Image Pull Policies\n\nConfigure appropriate image pull policies:\n\n```yaml\ncontainers:\n- name: app\n  image: myapp:v1.2.3\n  imagePullPolicy: Always  # For latest tags\n  # imagePullPolicy: IfNotPresent  # For specific versions\n```\n\n## Secrets Management\n\n### Kubernetes Secrets\n\nNever hardcode sensitive data in container images:\n\n```yaml\napiVersion: v1\nkind: Secret\nmetadata:\n  name: app-secrets\ntype: Opaque\ndata:\n  database-password: <base64-encoded-password>\n  api-key: <base64-encoded-key>\n```\n\n### External Secret Management\n\nIntegrate with external secret management systems:\n\n- **HashiCorp Vault**\n- **AWS Secrets Manager**\n- **Azure Key Vault**\n- **Google Secret Manager**\n\n## Monitoring and Auditing\n\n### Audit Logging\n\nEnable Kubernetes audit logging for security monitoring:\n\n```yaml\napiVersion: audit.k8s.io/v1\nkind: Policy\nrules:\n- level: Metadata\n  namespaces: [\"production\"]\n  resources:\n  - group: \"\"\n    resources: [\"pods\"]\n```\n\n### Runtime Security\n\nImplement runtime security monitoring:\n\n- **Falco**: Runtime security monitoring\n- **Twistlock/Prisma**: Comprehensive container security\n- **Aqua Security**: Full-stack container security\n- **Sysdig**: Container runtime security and compliance\n\n## Common Security Pitfalls\n\n### Avoid These Mistakes\n\n1. **Running as root**: Always use non-root users\n2. **Privileged containers**: Avoid unless absolutely necessary\n3. **Unrestricted network access**: Implement network policies\n4. **Outdated images**: Regular image updates and scanning\n5. **Overprivileged service accounts**: Follow least privilege principle\n\n### Security Scanning Integration\n\nIntegrate security scanning in your CI/CD pipeline:\n\n```bash\n# Example with Trivy scanner\ntrivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest\n\n# Example with Clair scanner\nclair-scanner --ip $(hostname -I | awk '{print $1}') myapp:latest\n```\n\n## Compliance and Governance\n\n### Policy as Code\n\nImplement policy as code using:\n\n- **Open Policy Agent (OPA)**: Policy engine for cloud-native environments\n- **Gatekeeper**: OPA integration for Kubernetes\n- **Falco Rules**: Runtime security rules\n\n### Compliance Frameworks\n\nAlign with security frameworks:\n\n- **CIS Kubernetes Benchmark**\n- **NIST Cybersecurity Framework**\n- **SOC 2 Compliance**\n- **PCI DSS** (for payment processing)\n\n## Conclusion\n\nKubernetes pod security requires a multi-layered approach combining proper configuration, monitoring, and governance. Implement these practices progressively, starting with basic security contexts and gradually adding more sophisticated controls.\n\n**Key Takeaways:**\n- Always run containers as non-root users\n- Implement resource limits and network policies\n- Use trusted, scanned container images\n- Enable comprehensive monitoring and auditing\n- Follow the principle of least privilege\n- Regularly update and patch your infrastructure\n\nBy following these guidelines, you'll significantly improve your Kubernetes cluster's security posture and protect against common attack vectors.",
  "reading_time": 6,
  "code_snippets": [
    {
      "language": "yaml",
      "code": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  securityContext:\n    runAsUser: 1000\n    runAsGroup: 1000\n    runAsNonRoot: true\n    fsGroup: 2000\n  containers:\n  - name: app\n    image: nginx:alpine\n    securityContext:\n      allowPrivilegeEscalation: false\n      readOnlyRootFilesystem: true\n      capabilities:\n        drop:\n        - ALL\n        add:\n        - NET_BIND_SERVICE",
      "description": "Secure pod configuration with security context"
    },
    {
      "language": "yaml",
      "code": "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: deny-all\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\n  - Egress",
      "description": "Network policy for pod isolation"
    },
    {
      "language": "bash",
      "code": "# Scan container image for vulnerabilities\ntrivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest\n\n# Check for misconfigurations\ntrivy config --exit-code 1 ./k8s-manifests/",
      "description": "Container security scanning with Trivy"
    },
    {
      "language": "yaml",
      "code": "resources:\n  limits:\n    cpu: 500m\n    memory: 512Mi\n    ephemeral-storage: 1Gi\n  requests:\n    cpu: 250m\n    memory: 256Mi\n    ephemeral-storage: 512Mi",
      "description": "Resource limits and requests configuration"
    }
  ],
  "tags": ["Kubernetes", "Security", "Pod Security", "DevOps", "Container Security", "Best Practices"],
  "authors": ["Security Team"]
}
```