import { BlogPost } from "@/types/blog";

export const mockBlogs: BlogPost[] = [
  {
    _id: "1",
    title: "Complete Guide to Docker Containerization in DevOps",
    slug: "docker-containerization-devops-guide",
    summary: "Learn how to leverage Docker containers for efficient application deployment, scaling, and management in modern DevOps workflows.",
    category: "DevOps",
    published_at: "2024-12-15T10:00:00Z",
    reading_time: 8,
    cover_image: "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png",
    content: `# Complete Guide to Docker Containerization in DevOps

Docker has revolutionized how we build, ship, and run applications. In this comprehensive guide, we'll explore Docker from basics to advanced DevOps integration.

## What is Docker?

Docker is a containerization platform that allows you to package applications and their dependencies into lightweight, portable containers. These containers can run consistently across different environments.

## Key Benefits of Docker

- **Consistency**: Applications run the same way across development, testing, and production
- **Scalability**: Easy horizontal scaling with container orchestration
- **Resource Efficiency**: Containers share the host OS kernel, using fewer resources than VMs
- **Rapid Deployment**: Containers start in seconds, not minutes

## Docker Architecture

Docker uses a client-server architecture with three main components:

1. **Docker Client**: Command-line interface for interacting with Docker
2. **Docker Daemon**: Background service that manages containers
3. **Docker Registry**: Repository for storing and sharing container images

## Creating Your First Dockerfile

Here's a simple Dockerfile for a Node.js application:

\`\`\`dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define startup command
CMD ["npm", "start"]
\`\`\`

## Docker Compose for Multi-Container Applications

For complex applications with multiple services, use Docker Compose:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - NODE_ENV=production
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Docker in CI/CD Pipelines

Integrate Docker into your CI/CD workflow:

1. **Build**: Create container images from source code
2. **Test**: Run automated tests in containerized environments
3. **Deploy**: Push images to registry and deploy to production

## Best Practices

- Use multi-stage builds to reduce image size
- Run containers as non-root users
- Use specific image tags, avoid 'latest'
- Implement health checks
- Use .dockerignore to exclude unnecessary files

## Conclusion

Docker containerization is essential for modern DevOps practices. It provides consistency, scalability, and efficiency that traditional deployment methods can't match.`,
    code_snippets: [
      {
        language: "dockerfile",
        code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
        description: "Basic Node.js Dockerfile"
      },
      {
        language: "yaml",
        code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp`,
        description: "Docker Compose configuration"
      }
    ],
    images: ["https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png", "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png"],
    tags: ["Docker", "Containerization", "DevOps", "CI/CD"],
    authors: ["DevOps AI Assistant"]
  },
  {
    _id: "2",
    title: "Kubernetes Deployment Strategies: Rolling Updates vs Blue-Green",
    slug: "kubernetes-deployment-strategies",
    summary: "Explore different Kubernetes deployment strategies to ensure zero-downtime deployments and efficient application updates.",
    category: "Kubernetes",
    published_at: "2024-12-12T14:30:00Z",
    reading_time: 6,
    cover_image: "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png",
    content: `# Kubernetes Deployment Strategies: Rolling Updates vs Blue-Green

Kubernetes offers several deployment strategies to update applications with minimal downtime. Let's explore the most popular approaches.

## Rolling Updates (Default Strategy)

Rolling updates gradually replace old pods with new ones, ensuring continuous availability.

### How Rolling Updates Work

1. Create new pods with updated image
2. Wait for new pods to be ready
3. Terminate old pods
4. Repeat until all pods are updated

### Rolling Update Configuration

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    spec:
      containers:
      - name: app
        image: my-app:v2
\`\`\`

## Blue-Green Deployment

Blue-green deployment runs two identical production environments, switching traffic between them.

### Implementation with Services

\`\`\`yaml
# Blue deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: blue
  template:
    metadata:
      labels:
        app: my-app
        version: blue
    spec:
      containers:
      - name: app
        image: my-app:v1

---
# Service pointing to blue
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
    version: blue
  ports:
  - port: 80
    targetPort: 8080
\`\`\`

## Canary Deployments

Canary deployments gradually shift traffic to the new version, allowing for safe testing.

### Using Istio for Canary

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-app
spec:
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: my-app
        subset: v2
  - route:
    - destination:
        host: my-app
        subset: v1
      weight: 90
    - destination:
        host: my-app
        subset: v2
      weight: 10
\`\`\`

## Choosing the Right Strategy

| Strategy | Pros | Cons | Use Case |
|----------|------|------|----------|
| Rolling Update | Simple, built-in | Temporary mixed versions | Most applications |
| Blue-Green | Instant rollback, no mixed versions | Resource intensive | Critical applications |
| Canary | Safe testing, gradual rollout | Complex setup | High-risk changes |

## Best Practices

1. **Health Checks**: Always configure readiness and liveness probes
2. **Resource Limits**: Set appropriate CPU and memory limits
3. **Monitoring**: Monitor deployment progress and application metrics
4. **Rollback Strategy**: Have a clear rollback plan
5. **Testing**: Test deployment strategies in staging environments

## Conclusion

Choose deployment strategies based on your application requirements, risk tolerance, and resource constraints. Rolling updates work for most cases, while blue-green and canary deployments offer additional safety for critical applications.`,
    code_snippets: [
      {
        language: "yaml",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1`,
        description: "Rolling update configuration"
      },
      {
        language: "bash",
        code: `# Switch traffic to green deployment
kubectl patch service my-app-service -p '{"spec":{"selector":{"version":"green"}}}'

# Rollback to blue if needed
kubectl patch service my-app-service -p '{"spec":{"selector":{"version":"blue"}}}'`,
        description: "Blue-green traffic switching"
      }
    ],
    images: ["https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png", "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png"],
    tags: ["Kubernetes", "Deployment", "DevOps", "Zero-Downtime"],
    authors: ["Kubernetes Expert"]
  },
  {
    _id: "3",
    title: "AWS EKS vs Self-Managed Kubernetes: Complete Comparison",
    slug: "aws-eks-vs-self-managed-kubernetes",
    summary: "Compare AWS EKS with self-managed Kubernetes clusters to make informed decisions for your cloud infrastructure.",
    category: "AWS",
    published_at: "2024-12-10T09:15:00Z",
    reading_time: 10,
    cover_image: "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png",
    content: `# AWS EKS vs Self-Managed Kubernetes: Complete Comparison

Choosing between AWS EKS and self-managed Kubernetes is a critical decision for your cloud infrastructure. Let's compare both approaches comprehensively.

## What is AWS EKS?

Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service that eliminates the need to install, operate, and maintain your own Kubernetes control plane.

## Self-Managed Kubernetes on AWS

Self-managed Kubernetes gives you complete control over your cluster configuration, running on EC2 instances that you manage.

## Cost Comparison

### AWS EKS Costs
- **Control Plane**: $0.10 per hour per cluster
- **Worker Nodes**: Standard EC2 pricing
- **Add-ons**: Additional costs for managed add-ons

### Self-Managed Costs
- **Control Plane**: EC2 costs for master nodes (typically 3 instances)
- **Worker Nodes**: Standard EC2 pricing
- **Operational Overhead**: Time and resources for management

## Management Overhead

### EKS Management
\`\`\`bash
# Create EKS cluster
eksctl create cluster --name my-cluster --region us-west-2

# Update cluster
eksctl update cluster --name my-cluster --region us-west-2

# Delete cluster
eksctl delete cluster --name my-cluster --region us-west-2
\`\`\`

### Self-Managed Setup
\`\`\`bash
# Initialize master node
kubeadm init --pod-network-cidr=10.244.0.0/16

# Join worker nodes
kubeadm join <master-ip>:6443 --token <token> --discovery-token-ca-cert-hash <hash>

# Install CNI plugin
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
\`\`\`

## Security Considerations

### EKS Security Features
- AWS IAM integration
- Managed control plane security
- Automatic security patches
- VPC integration
- AWS security services integration

### Self-Managed Security
- Full control over security configuration
- Manual security updates required
- Custom RBAC implementation
- Network policy management

## Scalability and Performance

### EKS Scaling
\`\`\`yaml
# Cluster Autoscaler for EKS
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.21.0
        name: cluster-autoscaler
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/my-cluster
\`\`\`

## Monitoring and Observability

### EKS Monitoring
- CloudWatch Container Insights
- AWS X-Ray integration
- Managed Prometheus and Grafana

### Self-Managed Monitoring
- Custom Prometheus setup
- Grafana configuration
- Log aggregation setup

## Backup and Disaster Recovery

### EKS Backup
\`\`\`bash
# Using Velero for EKS backup
velero backup create my-backup --include-namespaces default,kube-system

# Restore from backup
velero restore create --from-backup my-backup
\`\`\`

## Decision Matrix

| Factor | EKS | Self-Managed | Winner |
|--------|-----|--------------|--------|
| Setup Time | Fast | Slow | EKS |
| Control | Limited | Full | Self-Managed |
| Maintenance | Low | High | EKS |
| Cost (Small Scale) | Higher | Lower | Self-Managed |
| Cost (Large Scale) | Lower | Higher | EKS |
| Security | Managed | Manual | EKS |
| Customization | Limited | Full | Self-Managed |

## When to Choose EKS

- **Rapid deployment** requirements
- **Limited Kubernetes expertise** in team
- **Compliance** requirements (SOC, PCI DSS)
- **Multi-region** deployments
- **Focus on application development**

## When to Choose Self-Managed

- **Cost optimization** for smaller workloads
- **Custom networking** requirements
- **Specific Kubernetes versions** needed
- **Full control** over cluster configuration
- **Learning and skill development**

## Migration Strategies

### From Self-Managed to EKS
1. **Assessment**: Evaluate current cluster configuration
2. **Planning**: Design EKS architecture
3. **Migration**: Use tools like Velero for workload migration
4. **Validation**: Test applications in new environment

### Hybrid Approach
Consider running both EKS and self-managed clusters for different workloads based on requirements.

## Conclusion

Choose EKS for managed simplicity and enterprise features. Choose self-managed for cost control and customization. Consider your team's expertise, compliance requirements, and long-term strategy when making this decision.`,
    code_snippets: [
      {
        language: "bash",
        code: `# Create EKS cluster with eksctl
eksctl create cluster \
  --name my-cluster \
  --version 1.21 \
  --region us-west-2 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 4`,
        description: "EKS cluster creation"
      },
      {
        language: "yaml",
        code: `# EKS managed node group
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: my-cluster
  region: us-west-2
managedNodeGroups:
- name: managed-ng
  instanceType: t3.medium
  minSize: 1
  maxSize: 10
  desiredCapacity: 3`,
        description: "EKS managed node group configuration"
      }
    ],
    images: ["https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png", "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png"],
    tags: ["AWS", "EKS", "Kubernetes", "Cloud", "Comparison"],
    authors: ["Cloud Architecture Team"]
  },
  {
    _id: "4",
    title: "Terraform Best Practices for Infrastructure as Code",
    slug: "terraform-best-practices-iac",
    summary: "Learn essential Terraform best practices for managing infrastructure as code effectively and safely in production environments.",
    category: "Infrastructure",
    published_at: "2024-12-08T11:45:00Z",
    reading_time: 7,
    cover_image: "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png",
    content: `# Terraform Best Practices for Infrastructure as Code

Terraform is a powerful tool for managing infrastructure as code. Following best practices ensures maintainable, secure, and scalable infrastructure deployments.

## Project Structure

Organize your Terraform code with a clear structure:

\`\`\`
terraform/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── modules/
│   ├── vpc/
│   ├── ec2/
│   └── rds/
├── shared/
└── .terraform/
\`\`\`

## State Management

### Remote State Configuration

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
\`\`\`

### State Locking

Always use state locking to prevent concurrent modifications:

\`\`\`hcl
resource "aws_dynamodb_table" "terraform_state_lock" {
  name           = "terraform-state-lock"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "Terraform State Lock Table"
  }
}
\`\`\`

## Variable Management

### Input Variables

\`\`\`hcl
variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}
\`\`\`

### Local Values

\`\`\`hcl
locals {
  common_tags = {
    Environment = var.environment
    Project     = "my-project"
    ManagedBy   = "terraform"
  }
  
  name_prefix = "\${var.project_name}-\${var.environment}"
}
\`\`\`

## Module Design

### Reusable VPC Module

\`\`\`hcl
# modules/vpc/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(var.tags, {
    Name = "\${var.name_prefix}-vpc"
  })
}

resource "aws_subnet" "public" {
  count = length(var.public_subnet_cidrs)
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = merge(var.tags, {
    Name = "\${var.name_prefix}-public-\${count.index + 1}"
    Type = "public"
  })
}
\`\`\`

## Security Best Practices

### Sensitive Data Handling

\`\`\`hcl
# Use AWS Secrets Manager for sensitive data
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = "prod/database/password"
}

resource "aws_db_instance" "main" {
  password = jsondecode(data.aws_secretsmanager_secret_version.db_password.secret_string)["password"]
  
  # Mark as sensitive
  lifecycle {
    ignore_changes = [password]
  }
}
\`\`\`

### Resource Tagging

\`\`\`hcl
# Consistent tagging strategy
locals {
  required_tags = {
    Environment   = var.environment
    Project       = var.project_name
    Owner         = var.owner
    CostCenter    = var.cost_center
    CreatedBy     = "terraform"
    CreatedDate   = formatdate("YYYY-MM-DD", timestamp())
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  tags = merge(local.required_tags, var.additional_tags, {
    Name = "\${local.name_prefix}-web-server"
  })
}
\`\`\`

## Version Management

### Terraform Version Constraints

\`\`\`hcl
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }
}
\`\`\`

## Testing and Validation

### Pre-commit Hooks

\`\`\`yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.77.0
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_docs
      - id: terraform_tflint
\`\`\`

### Automated Testing

\`\`\`go
// test/terraform_test.go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestTerraformVPC(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../modules/vpc",
        Vars: map[string]interface{}{
            "cidr_block": "10.0.0.0/16",
            "name_prefix": "test",
        },
    }

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    vpcId := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcId)
}
\`\`\`

## CI/CD Integration

### GitHub Actions Workflow

\`\`\`yaml
name: Terraform CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: 1.5.0
    
    - name: Terraform Format
      run: terraform fmt -check
    
    - name: Terraform Init
      run: terraform init
    
    - name: Terraform Validate
      run: terraform validate
    
    - name: Terraform Plan
      run: terraform plan
      if: github.event_name == 'pull_request'
    
    - name: Terraform Apply
      run: terraform apply -auto-approve
      if: github.ref == 'refs/heads/main'
\`\`\`

## Monitoring and Alerting

### Resource Drift Detection

\`\`\`bash
#!/bin/bash
# drift-detection.sh
terraform plan -detailed-exitcode

case $? in
  0)
    echo "No changes detected"
    ;;
  1)
    echo "Error in terraform plan"
    exit 1
    ;;
  2)
    echo "Changes detected - infrastructure drift found!"
    # Send alert to monitoring system
    curl -X POST "\\$WEBHOOK_URL" -d '{"text":"Infrastructure drift detected in production!"}'
    ;;
esac
\`\`\`

## Common Pitfalls to Avoid

1. **Hardcoded Values**: Use variables and data sources
2. **Large State Files**: Split into smaller, focused configurations
3. **No State Locking**: Always use remote state with locking
4. **Ignoring Plan Output**: Always review plans before applying
5. **No Backup Strategy**: Implement state backup and recovery procedures

## Conclusion

Following these Terraform best practices ensures reliable, maintainable, and secure infrastructure as code. Start with proper project structure, implement robust state management, and gradually adopt advanced practices as your infrastructure grows.`,
    code_snippets: [
      {
        language: "hcl",
        code: `terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}`,
        description: "Remote state configuration"
      },
      {
        language: "hcl",
        code: `variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}`,
        description: "Variable validation"
      }
    ],
    images: ["https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png", "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png"],
    tags: ["Terraform", "Infrastructure as Code", "DevOps", "AWS"],
    authors: ["Infrastructure Team"]
  },
  {
    _id: "5",
    title: "Python Data Analysis: From Pandas to Machine Learning",
    slug: "python-data-analysis-pandas-ml",
    summary: "Master Python data analysis using Pandas, NumPy, and Scikit-learn for comprehensive data science workflows.",
    category: "Data Science",
    published_at: "2024-12-05T16:20:00Z",
    reading_time: 12,
    cover_image: "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png",
    content: `# Python Data Analysis: From Pandas to Machine Learning

Python has become the go-to language for data analysis and machine learning. This comprehensive guide covers the entire data science workflow using popular Python libraries.

## Setting Up Your Environment

First, let's set up a proper data science environment:

\`\`\`bash
# Create virtual environment
python -m venv data-env
source data-env/bin/activate  # On Windows: data-env\\Scripts\\activate

# Install essential packages
pip install pandas numpy matplotlib seaborn scikit-learn jupyter
\`\`\`

## Data Loading and Exploration with Pandas

### Loading Different Data Formats

\`\`\`python
import pandas as pd
import numpy as np

# Load CSV data
df_csv = pd.read_csv('data.csv')

# Load Excel data
df_excel = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# Load JSON data
df_json = pd.read_json('data.json')

# Load from database
import sqlite3
conn = sqlite3.connect('database.db')
df_sql = pd.read_sql_query('SELECT * FROM table_name', conn)
\`\`\`

### Initial Data Exploration

\`\`\`python
# Basic information about the dataset
print(df.info())
print(df.describe())
print(df.head())

# Check for missing values
print(df.isnull().sum())

# Data types
print(df.dtypes)

# Shape of the dataset
print(f"Dataset shape: {df.shape}")
\`\`\`

## Data Cleaning and Preprocessing

### Handling Missing Values

\`\`\`python
# Different strategies for missing values
# Drop rows with any missing values
df_clean = df.dropna()

# Drop columns with missing values
df_clean = df.dropna(axis=1)

# Fill missing values with mean
df['column_name'].fillna(df['column_name'].mean(), inplace=True)

# Fill missing values with forward fill
df['column_name'].fillna(method='ffill', inplace=True)

# Fill missing values with custom value
df['column_name'].fillna('Unknown', inplace=True)
\`\`\`

### Data Type Conversion

\`\`\`python
# Convert data types
df['date_column'] = pd.to_datetime(df['date_column'])
df['numeric_column'] = pd.to_numeric(df['numeric_column'], errors='coerce')
df['category_column'] = df['category_column'].astype('category')

# Create dummy variables for categorical data
df_encoded = pd.get_dummies(df, columns=['category_column'])
\`\`\`

## Data Analysis and Visualization

### Statistical Analysis

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Set style for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Correlation analysis
correlation_matrix = df.corr()
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Matrix')
plt.show()

# Distribution analysis
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
df['numeric_column'].hist(bins=30)
plt.title('Distribution of Numeric Column')

plt.subplot(1, 2, 2)
df['category_column'].value_counts().plot(kind='bar')
plt.title('Category Distribution')
plt.tight_layout()
plt.show()
\`\`\`

### Advanced Pandas Operations

\`\`\`python
# GroupBy operations
grouped_data = df.groupby('category_column').agg({
    'numeric_column1': ['mean', 'std', 'count'],
    'numeric_column2': ['sum', 'min', 'max']
})

# Pivot tables
pivot_table = df.pivot_table(
    values='numeric_column',
    index='category1',
    columns='category2',
    aggfunc='mean'
)

# Time series analysis
df['date_column'] = pd.to_datetime(df['date_column'])
df.set_index('date_column', inplace=True)

# Resample time series data
monthly_data = df.resample('M').mean()
\`\`\`

## Feature Engineering

### Creating New Features

\`\`\`python
# Mathematical transformations
df['log_column'] = np.log(df['numeric_column'] + 1)
df['sqrt_column'] = np.sqrt(df['numeric_column'])

# Binning continuous variables
df['age_group'] = pd.cut(df['age'], 
                        bins=[0, 18, 35, 50, 100], 
                        labels=['Young', 'Adult', 'Middle-aged', 'Senior'])

# Date-based features
df['year'] = df['date_column'].dt.year
df['month'] = df['date_column'].dt.month
df['day_of_week'] = df['date_column'].dt.dayofweek

# Interaction features
df['feature_interaction'] = df['feature1'] * df['feature2']
\`\`\`

### Feature Scaling

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# Standard scaling (z-score normalization)
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df[numeric_columns])

# Min-Max scaling
minmax_scaler = MinMaxScaler()
df_minmax = minmax_scaler.fit_transform(df[numeric_columns])

# Robust scaling (less sensitive to outliers)
robust_scaler = RobustScaler()
df_robust = robust_scaler.fit_transform(df[numeric_columns])
\`\`\`

## Machine Learning Implementation

### Supervised Learning - Classification

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import cross_val_score

# Prepare data
X = df.drop('target_column', axis=1)
y = df['target_column']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train model
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier.fit(X_train, y_train)

# Make predictions
y_pred = rf_classifier.predict(X_test)

# Evaluate model
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Cross-validation
cv_scores = cross_val_score(rf_classifier, X, y, cv=5)
print(f"Cross-validation scores: {cv_scores}")
print(f"Average CV score: {cv_scores.mean():.3f}")
\`\`\`

### Supervised Learning - Regression

\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Linear Regression
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
y_pred_lr = lr_model.predict(X_test)

# Random Forest Regression
rf_regressor = RandomForestRegressor(n_estimators=100, random_state=42)
rf_regressor.fit(X_train, y_train)
y_pred_rf = rf_regressor.predict(X_test)

# Evaluate regression models
print(f"Linear Regression - MSE: {mean_squared_error(y_test, y_pred_lr):.3f}")
print(f"Linear Regression - R²: {r2_score(y_test, y_pred_lr):.3f}")
print(f"Random Forest - MSE: {mean_squared_error(y_test, y_pred_rf):.3f}")
print(f"Random Forest - R²: {r2_score(y_test, y_pred_rf):.3f}")
\`\`\`

### Unsupervised Learning - Clustering

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# K-Means Clustering
kmeans = KMeans(n_clusters=3, random_state=42)
cluster_labels = kmeans.fit_predict(X_scaled)

# Add cluster labels to dataframe
df['cluster'] = cluster_labels

# Visualize clusters using PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=cluster_labels, cmap='viridis')
plt.xlabel('First Principal Component')
plt.ylabel('Second Principal Component')
plt.title('K-Means Clustering Visualization')
plt.colorbar(scatter)
plt.show()
\`\`\`

## Model Optimization and Validation

### Hyperparameter Tuning

\`\`\`python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

# Grid Search for Random Forest
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)
print(f"Best parameters: {grid_search.best_params_}")
print(f"Best cross-validation score: {grid_search.best_score_:.3f}")
\`\`\`

### Feature Importance Analysis

\`\`\`python
# Feature importance from Random Forest
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': rf_classifier.feature_importances_
}).sort_values('importance', ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(data=feature_importance.head(10), x='importance', y='feature')
plt.title('Top 10 Feature Importances')
plt.tight_layout()
plt.show()
\`\`\`

## Best Practices and Tips

### Code Organization

\`\`\`python
class DataAnalyzer:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.cleaned_data = None
        self.model = None
    
    def clean_data(self):
        """Clean and preprocess the data"""
        self.cleaned_data = self.data.copy()
        # Add cleaning steps here
        return self
    
    def train_model(self, target_column):
        """Train machine learning model"""
        X = self.cleaned_data.drop(target_column, axis=1)
        y = self.cleaned_data[target_column]
        
        self.model = RandomForestClassifier()
        self.model.fit(X, y)
        return self
    
    def predict(self, new_data):
        """Make predictions on new data"""
        return self.model.predict(new_data)

# Usage
analyzer = DataAnalyzer('data.csv')
analyzer.clean_data().train_model('target')
\`\`\`

### Performance Optimization

\`\`\`python
# Use vectorized operations instead of loops
# Bad
result = []
for value in df['column']:
    result.append(value * 2)

# Good
result = df['column'] * 2

# Use query for filtering
# Bad
filtered_df = df[df['column1'] > 10][df['column2'] == 'value']

# Good
filtered_df = df.query('column1 > 10 and column2 == "value"')

# Use categorical data type for memory efficiency
df['category_column'] = df['category_column'].astype('category')
\`\`\`

## Conclusion

Python provides a comprehensive ecosystem for data analysis and machine learning. By mastering Pandas for data manipulation, NumPy for numerical operations, and Scikit-learn for machine learning, you can build end-to-end data science solutions. Remember to always validate your models, understand your data, and follow best practices for reproducible analysis.`,
    code_snippets: [
      {
        language: "python",
        code: `import pandas as pd
import numpy as np

# Load and explore data
df = pd.read_csv('data.csv')
print(df.info())
print(df.describe())

# Handle missing values
df['column'].fillna(df['column'].mean(), inplace=True)

# Create features
df['log_feature'] = np.log(df['numeric_column'] + 1)`,
        description: "Basic data loading and preprocessing"
      },
      {
        language: "python",
        code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Prepare data
X = df.drop('target', axis=1)
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))`,
        description: "Machine learning workflow"
      }
    ],
    images: ["https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png", "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png"],
    tags: ["Python", "Data Science", "Pandas", "Machine Learning", "Analytics"],
    authors: ["Data Science Team"]
  },
  {
    _id: "6",
    title: "Azure DevOps Pipelines: CI/CD Best Practices",
    slug: "azure-devops-pipelines-cicd-best-practices",
    summary: "Master Azure DevOps Pipelines for efficient CI/CD workflows with best practices for deployment automation and testing.",
    category: "Azure",
    published_at: "2024-12-03T13:10:00Z",
    reading_time: 9,
    cover_image: "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png",
    content: `# Azure DevOps Pipelines: CI/CD Best Practices

Azure DevOps Pipelines provide powerful CI/CD capabilities for automating your software delivery process. This guide covers best practices for building efficient and reliable pipelines.

## Pipeline Fundamentals

### YAML Pipeline Structure

\`\`\`yaml
# azure-pipelines.yml
trigger:
  branches:
    include:
    - main
    - develop
  paths:
    exclude:
    - docs/*
    - README.md

variables:
  buildConfiguration: 'Release'
  vmImageName: 'ubuntu-latest'

stages:
- stage: Build
  displayName: 'Build stage'
  jobs:
  - job: Build
    displayName: 'Build job'
    pool:
      vmImage: $(vmImageName)
    steps:
    - task: DotNetCoreCLI@2
      displayName: 'Build project'
      inputs:
        command: 'build'
        projects: '**/*.csproj'
        arguments: '--configuration $(buildConfiguration)'
\`\`\`

## Multi-Stage Pipeline Design

### Environment-Based Deployment

\`\`\`yaml
stages:
- stage: Build
  displayName: 'Build Application'
  jobs:
  - job: BuildJob
    steps:
    - task: DotNetCoreCLI@2
      inputs:
        command: 'build'
        projects: '**/*.csproj'
    
    - task: DotNetCoreCLI@2
      inputs:
        command: 'publish'
        publishWebProjects: true
        arguments: '--configuration Release --output $(Build.ArtifactStagingDirectory)'
    
    - publish: $(Build.ArtifactStagingDirectory)
      artifact: drop

- stage: DeployDev
  displayName: 'Deploy to Development'
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
  jobs:
  - deployment: DeployToDev
    environment: 'development'
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: drop
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'Azure-Dev'
              appName: 'myapp-dev'
              package: '$(Pipeline.Workspace)/drop/**/*.zip'

- stage: DeployProd
  displayName: 'Deploy to Production'
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: DeployToProd
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: drop
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'Azure-Prod'
              appName: 'myapp-prod'
              package: '$(Pipeline.Workspace)/drop/**/*.zip'
\`\`\`

## Testing Integration

### Comprehensive Testing Pipeline

\`\`\`yaml
- stage: Test
  displayName: 'Test Stage'
  dependsOn: Build
  jobs:
  - job: UnitTests
    displayName: 'Unit Tests'
    steps:
    - task: DotNetCoreCLI@2
      displayName: 'Run Unit Tests'
      inputs:
        command: 'test'
        projects: '**/*Tests.csproj'
        arguments: '--configuration $(buildConfiguration) --collect "Code coverage"'
    
    - task: PublishTestResults@2
      inputs:
        testResultsFormat: 'VSTest'
        testResultsFiles: '**/*.trx'
        mergeTestResults: true

  - job: IntegrationTests
    displayName: 'Integration Tests'
    dependsOn: UnitTests
    steps:
    - task: DockerCompose@0
      displayName: 'Start test dependencies'
      inputs:
        action: 'Run services'
        dockerComposeFile: 'docker-compose.test.yml'
    
    - task: DotNetCoreCLI@2
      displayName: 'Run Integration Tests'
      inputs:
        command: 'test'
        projects: '**/*IntegrationTests.csproj'
    
    - task: DockerCompose@0
      displayName: 'Stop test dependencies'
      inputs:
        action: 'Run services'
        dockerComposeFile: 'docker-compose.test.yml'
        arguments: 'down'
      condition: always()

  - job: SecurityScan
    displayName: 'Security Scanning'
    steps:
    - task: WhiteSource@21
      inputs:
        cwd: '$(System.DefaultWorkingDirectory)'
    
    - task: SonarCloudPrepare@1
      inputs:
        SonarCloud: 'SonarCloud'
        organization: 'myorg'
        scannerMode: 'MSBuild'
        projectKey: 'myproject'
    
    - task: SonarCloudAnalyze@1
    - task: SonarCloudPublish@1
\`\`\`

## Docker Integration

### Container Build and Push

\`\`\`yaml
- stage: ContainerBuild
  displayName: 'Build and Push Container'
  jobs:
  - job: Docker
    steps:
    - task: Docker@2
      displayName: 'Build Docker image'
      inputs:
        containerRegistry: 'ACR-Connection'
        repository: 'myapp'
        command: 'build'
        Dockerfile: '**/Dockerfile'
        tags: |
          $(Build.BuildId)
          latest
    
    - task: Docker@2
      displayName: 'Push Docker image'
      inputs:
        containerRegistry: 'ACR-Connection'
        repository: 'myapp'
        command: 'push'
        tags: |
          $(Build.BuildId)
          latest
    
    - task: HelmDeploy@0
      displayName: 'Package Helm Chart'
      inputs:
        command: 'package'
        chartPath: 'helm/myapp'
        chartVersion: '$(Build.BuildId)'
        destination: '$(Build.ArtifactStagingDirectory)'
\`\`\`

## Infrastructure as Code

### ARM Template Deployment

\`\`\`yaml
- stage: Infrastructure
  displayName: 'Deploy Infrastructure'
  jobs:
  - job: DeployARM
    steps:
    - task: AzureResourceManagerTemplateDeployment@3
      inputs:
        deploymentScope: 'Resource Group'
        azureResourceManagerConnection: 'Azure-Connection'
        subscriptionId: '$(subscriptionId)'
        action: 'Create Or Update Resource Group'
        resourceGroupName: '$(resourceGroupName)'
        location: '$(location)'
        templateLocation: 'Linked artifact'
        csmFile: 'infrastructure/azuredeploy.json'
        csmParametersFile: 'infrastructure/azuredeploy.parameters.json'
        overrideParameters: |
          -appName "$(appName)"
          -environment "$(environment)"
          -sqlServerPassword "$(sqlServerPassword)"
        deploymentMode: 'Incremental'
\`\`\`

### Terraform Integration

\`\`\`yaml
- stage: TerraformDeploy
  displayName: 'Terraform Deployment'
  jobs:
  - job: Terraform
    steps:
    - task: TerraformInstaller@0
      inputs:
        terraformVersion: '1.5.0'
    
    - task: TerraformTaskV3@3
      displayName: 'Terraform Init'
      inputs:
        provider: 'azurerm'
        command: 'init'
        workingDirectory: '$(System.DefaultWorkingDirectory)/terraform'
        backendServiceArm: 'Azure-Connection'
        backendAzureRmResourceGroupName: 'terraform-state-rg'
        backendAzureRmStorageAccountName: 'terraformstatestorage'
        backendAzureRmContainerName: 'tfstate'
        backendAzureRmKey: 'prod.terraform.tfstate'
    
    - task: TerraformTaskV3@3
      displayName: 'Terraform Plan'
      inputs:
        provider: 'azurerm'
        command: 'plan'
        workingDirectory: '$(System.DefaultWorkingDirectory)/terraform'
        environmentServiceNameAzureRM: 'Azure-Connection'
    
    - task: TerraformTaskV3@3
      displayName: 'Terraform Apply'
      inputs:
        provider: 'azurerm'
        command: 'apply'
        workingDirectory: '$(System.DefaultWorkingDirectory)/terraform'
        environmentServiceNameAzureRM: 'Azure-Connection'
      condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
\`\`\`

## Advanced Pipeline Features

### Template Usage

\`\`\`yaml
# templates/build-template.yml
parameters:
- name: buildConfiguration
  type: string
  default: 'Release'
- name: projects
  type: string
  default: '**/*.csproj'

steps:
- task: DotNetCoreCLI@2
  displayName: 'Restore packages'
  inputs:
    command: 'restore'
            projects: \${{ parameters.projects }}

- task: DotNetCoreCLI@2
  displayName: 'Build project'
  inputs:
    command: 'build'
            projects: \${{ parameters.projects }}
            arguments: '--configuration \${{ parameters.buildConfiguration }} --no-restore'

# Main pipeline using template
stages:
- stage: Build
  jobs:
  - job: BuildJob
    steps:
    - template: templates/build-template.yml
      parameters:
        buildConfiguration: 'Release'
        projects: 'src/**/*.csproj'
\`\`\`

### Conditional Deployments

\`\`\`yaml
- stage: DeployToProduction
  displayName: 'Deploy to Production'
  condition: |
    and(
      succeeded(),
      eq(variables['Build.SourceBranch'], 'refs/heads/main'),
      eq(variables['Build.Reason'], 'Manual')
    )
  jobs:
  - deployment: ProductionDeployment
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - script: echo "Deploying to production"
\`\`\`

## Monitoring and Notifications

### Pipeline Monitoring

\`\`\`yaml
- task: AzureMonitor@0
  displayName: 'Create Application Insights Alert'
  inputs:
    azureSubscription: 'Azure-Connection'
    resourceGroupName: '$(resourceGroupName)'
    resourceName: '$(appInsightsName)'
    alertName: 'High Error Rate'
    alertDescription: 'Alert when error rate exceeds 5%'
    metricName: 'exceptions/rate'
    operator: 'GreaterThan'
    threshold: '5'
    timeAggregation: 'Average'
    windowSize: 'PT5M'

- task: Slack@1
  displayName: 'Notify Slack Channel'
  inputs:
    SlackApiToken: '$(slackToken)'
    Channel: '#deployments'
    Message: |
      🚀 Deployment completed successfully!
      
      **Application:** $(appName)
      **Environment:** $(environment)
      **Build:** $(Build.BuildNumber)
      **Commit:** $(Build.SourceVersion)
  condition: succeeded()

- task: Slack@1
  displayName: 'Notify Slack on Failure'
  inputs:
    SlackApiToken: '$(slackToken)'
    Channel: '#deployments'
    Message: |
      ❌ Deployment failed!
      
      **Application:** $(appName)
      **Environment:** $(environment)
      **Build:** $(Build.BuildNumber)
      **Error:** Pipeline failed at stage $(System.StageName)
  condition: failed()
\`\`\`

## Security Best Practices

### Secret Management

\`\`\`yaml
variables:
- group: 'production-secrets'
- name: 'connectionString'
  value: $[variables.prodConnectionString]

steps:
- task: AzureKeyVault@2
  inputs:
    azureSubscription: 'Azure-Connection'
    KeyVaultName: 'my-keyvault'
    SecretsFilter: 'database-password,api-key'
    RunAsPreJob: true

- script: |
    echo "Using secret from Key Vault: \\$(database-password)"
  displayName: 'Use Key Vault Secret'
\`\`\`

### Branch Protection

\`\`\`yaml
# Only allow deployments from specific branches
- stage: Production
  condition: |
    and(
      succeeded(),
      or(
        eq(variables['Build.SourceBranch'], 'refs/heads/main'),
        startsWith(variables['Build.SourceBranch'], 'refs/heads/release/')
      )
    )
\`\`\`

## Performance Optimization

### Parallel Jobs and Caching

\`\`\`yaml
strategy:
  matrix:
    linux:
      imageName: 'ubuntu-latest'
    mac:
      imageName: 'macOS-latest'
    windows:
      imageName: 'windows-latest'
  maxParallel: 3

steps:
- task: Cache@2
  inputs:
    key: 'nuget | "$(Agent.OS)" | **/packages.lock.json,!**/bin/**,!**/obj/**'
    restoreKeys: |
      nuget | "$(Agent.OS)"
      nuget
    path: $(NUGET_PACKAGES)
  displayName: 'Cache NuGet packages'

- task: Cache@2
  inputs:
    key: 'npm | "$(Agent.OS)" | package-lock.json'
    restoreKeys: |
      npm | "$(Agent.OS)"
    path: $(npm_config_cache)
  displayName: 'Cache npm packages'
\`\`\`

## Troubleshooting Common Issues

### Debug Pipeline Issues

\`\`\`yaml
- script: |
    echo "Debug Information:"
    echo "Build.SourceBranch: \\$(Build.SourceBranch)"
    echo "Build.Reason: \\$(Build.Reason)"
    echo "Agent.OS: \\$(Agent.OS)"
    echo "System.DefaultWorkingDirectory: \\$(System.DefaultWorkingDirectory)"
    ls -la \\$(System.DefaultWorkingDirectory)
  displayName: 'Debug Pipeline Variables'
  condition: always()

- task: PublishPipelineArtifact@1
  inputs:
    targetPath: '$(System.DefaultWorkingDirectory)/logs'
    artifactName: 'pipeline-logs'
  condition: always()
\`\`\`

## Conclusion

Azure DevOps Pipelines provide comprehensive CI/CD capabilities. By following these best practices, you can build robust, secure, and efficient pipelines that scale with your organization's needs. Remember to implement proper testing, security measures, and monitoring to ensure reliable software delivery.`,
    code_snippets: [
      {
        language: "yaml",
        code: `trigger:
  branches:
    include:
    - main
    - develop

stages:
- stage: Build
  jobs:
  - job: BuildJob
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - task: DotNetCoreCLI@2
      inputs:
        command: 'build'
        projects: '**/*.csproj'`,
        description: "Basic Azure Pipeline structure"
      },
      {
        language: "yaml",
        code: `- deployment: DeployToProd
  environment: 'production'
  strategy:
    runOnce:
      deploy:
        steps:
        - task: AzureWebApp@1
          inputs:
            azureSubscription: 'Azure-Prod'
            appName: 'myapp-prod'
            package: '$(Pipeline.Workspace)/drop/**/*.zip'`,
        description: "Deployment job configuration"
      }
    ],
    images: ["https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png", "https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png"],
    tags: ["Azure", "DevOps", "CI/CD", "Pipelines", "Automation"],
    authors: ["Azure DevOps Team"]
  }
];

export const mockCategories = [
  "All Categories",
  "DevOps",
  "Kubernetes", 
  "AWS",
  "Infrastructure",
  "Data Science",
  "Azure"
];

export const getBlogsByCategory = (category: string): BlogPost[] => {
  if (category === "All Categories") {
    return mockBlogs;
  }
  return mockBlogs.filter(blog => blog.category === category);
};

export const getBlogById = (id: string): BlogPost | null => {
  return mockBlogs.find(blog => blog._id === id) || null;
};