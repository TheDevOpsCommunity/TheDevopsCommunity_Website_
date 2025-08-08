-- Sample blog posts data for testing
-- Run this in your Supabase SQL editor to add more blog posts

INSERT INTO blog_posts (title, slug, summary, category, reading_time, cover_image, content, code_snippets, images, tags, authors) VALUES 

-- AWS Blog Post
(
  'AWS EKS vs Self-Managed Kubernetes: Complete Comparison',
  'aws-eks-vs-self-managed-kubernetes',
  'Compare AWS EKS with self-managed Kubernetes clusters to make informed decisions for your cloud infrastructure.',
  'AWS',
  10,
  'https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png',
  '# AWS EKS vs Self-Managed Kubernetes: Complete Comparison

Choosing between AWS EKS and self-managed Kubernetes is a critical decision for your cloud infrastructure. Let''s compare both approaches comprehensively.

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
- **Operational Overhead**: Time and resources for management',
  '[
    {
      "language": "bash",
      "code": "# Create EKS cluster with eksctl\neksctl create cluster   --name my-cluster   --version 1.21   --region us-west-2   --nodegroup-name standard-workers   --node-type t3.medium   --nodes 3   --nodes-min 1   --nodes-max 4",
      "description": "EKS cluster creation"
    },
    {
      "language": "yaml",
      "code": "# EKS managed node group\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\nmetadata:\n  name: my-cluster\n  region: us-west-2\nmanagedNodeGroups:\n- name: managed-ng\n  instanceType: t3.medium\n  minSize: 1\n  maxSize: 10\n  desiredCapacity: 3",
      "description": "EKS managed node group configuration"
    }
  ]'::jsonb,
  ARRAY['https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png'],
  ARRAY['AWS', 'EKS', 'Kubernetes', 'Cloud', 'Comparison'],
  ARRAY['Cloud Architecture Team']
),

-- Infrastructure Blog Post
(
  'Terraform Best Practices for Infrastructure as Code',
  'terraform-best-practices-iac',
  'Learn essential Terraform best practices for managing infrastructure as code effectively and safely in production environments.',
  'Infrastructure',
  7,
  'https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png',
  '# Terraform Best Practices for Infrastructure as Code

Terraform is a powerful tool for managing infrastructure as code. Following best practices ensures maintainable, secure, and scalable infrastructure deployments.

## Project Structure

Organize your Terraform code with a clear structure:

```
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
```

## State Management

### Remote State Configuration

Always use remote state for team collaboration and state locking.',
  '[
    {
      "language": "hcl",
      "code": "terraform {\n  backend \"s3\" {\n    bucket         = \"my-terraform-state\"\n    key            = \"prod/terraform.tfstate\"\n    region         = \"us-west-2\"\n    encrypt        = true\n    dynamodb_table = \"terraform-state-lock\"\n  }\n}",
      "description": "Remote state configuration"
    },
    {
      "language": "hcl",
      "code": "variable \"environment\" {\n  description = \"Environment name\"\n  type        = string\n  validation {\n    condition     = contains([\"dev\", \"staging\", \"prod\"], var.environment)\n    error_message = \"Environment must be dev, staging, or prod.\"\n  }\n}",
      "description": "Variable validation"
    }
  ]'::jsonb,
  ARRAY['https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png'],
  ARRAY['Terraform', 'Infrastructure as Code', 'DevOps', 'AWS'],
  ARRAY['Infrastructure Team']
),

-- Data Science Blog Post
(
  'Python Data Analysis: From Pandas to Machine Learning',
  'python-data-analysis-pandas-ml',
  'Master Python data analysis using Pandas, NumPy, and Scikit-learn for comprehensive data science workflows.',
  'Data Science',
  12,
  'https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png',
  '# Python Data Analysis: From Pandas to Machine Learning

Python has become the go-to language for data analysis and machine learning. This comprehensive guide covers the entire data science workflow using popular Python libraries.

## Setting Up Your Environment

First, let''s set up a proper data science environment:

```bash
# Create virtual environment
python -m venv data-env
source data-env/bin/activate  # On Windows: data-env\Scripts\activate

# Install essential packages
pip install pandas numpy matplotlib seaborn scikit-learn jupyter
```

## Data Loading and Exploration with Pandas

### Loading Different Data Formats

Load data from various sources including CSV, Excel, JSON, and databases.',
  '[
    {
      "language": "python",
      "code": "import pandas as pd\nimport numpy as np\n\n# Load and explore data\ndf = pd.read_csv(''data.csv'')\nprint(df.info())\nprint(df.describe())\n\n# Handle missing values\ndf[''column''].fillna(df[''column''].mean(), inplace=True)\n\n# Create features\ndf[''log_feature''] = np.log(df[''numeric_column''] + 1)",
      "description": "Basic data loading and preprocessing"
    },
    {
      "language": "python",
      "code": "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\n\n# Prepare data\nX = df.drop(''target'', axis=1)\ny = df[''target'']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\n# Evaluate\ny_pred = model.predict(X_test)\nprint(classification_report(y_test, y_pred))",
      "description": "Machine learning workflow"
    }
  ]'::jsonb,
  ARRAY['https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png'],
  ARRAY['Python', 'Data Science', 'Pandas', 'Machine Learning', 'Analytics'],
  ARRAY['Data Science Team']
),

-- Azure Blog Post
(
  'Azure DevOps Pipelines: CI/CD Best Practices',
  'azure-devops-pipelines-cicd-best-practices',
  'Master Azure DevOps Pipelines for efficient CI/CD workflows with best practices for deployment automation and testing.',
  'Azure',
  9,
  'https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png',
  '# Azure DevOps Pipelines: CI/CD Best Practices

Azure DevOps Pipelines provide powerful CI/CD capabilities for automating your software delivery process. This guide covers best practices for building efficient and reliable pipelines.

## Pipeline Fundamentals

### YAML Pipeline Structure

Build your pipelines using YAML for version control and reproducibility.

## Multi-Stage Pipeline Design

### Environment-Based Deployment

Structure your pipelines to deploy across multiple environments with proper approvals and gates.',
  '[
    {
      "language": "yaml",
      "code": "trigger:\n  branches:\n    include:\n    - main\n    - develop\n\nstages:\n- stage: Build\n  jobs:\n  - job: BuildJob\n    pool:\n      vmImage: ''ubuntu-latest''\n    steps:\n    - task: DotNetCoreCLI@2\n      inputs:\n        command: ''build''\n        projects: ''**/*.csproj''",
      "description": "Basic Azure Pipeline structure"
    },
    {
      "language": "yaml",
      "code": "- deployment: DeployToProd\n  environment: ''production''\n  strategy:\n    runOnce:\n      deploy:\n        steps:\n        - task: AzureWebApp@1\n          inputs:\n            azureSubscription: ''Azure-Prod''\n            appName: ''myapp-prod''\n            package: ''$(Pipeline.Workspace)/drop/**/*.zip''",
      "description": "Deployment job configuration"
    }
  ]'::jsonb,
  ARRAY['https://portworx.com/wp-content/uploads/2022/10/kubernetes-k8s-portworx-overview-1.png'],
  ARRAY['Azure', 'DevOps', 'CI/CD', 'Pipelines', 'Automation'],
  ARRAY['Azure DevOps Team']
);

-- Update published_at to have different dates for testing
UPDATE blog_posts SET published_at = NOW() - INTERVAL '1 day' WHERE slug = 'kubernetes-deployment-strategies';
UPDATE blog_posts SET published_at = NOW() - INTERVAL '2 days' WHERE slug = 'aws-eks-vs-self-managed-kubernetes';
UPDATE blog_posts SET published_at = NOW() - INTERVAL '3 days' WHERE slug = 'terraform-best-practices-iac';
UPDATE blog_posts SET published_at = NOW() - INTERVAL '4 days' WHERE slug = 'python-data-analysis-pandas-ml';
UPDATE blog_posts SET published_at = NOW() - INTERVAL '5 days' WHERE slug = 'azure-devops-pipelines-cicd-best-practices';