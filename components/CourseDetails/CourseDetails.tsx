"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function CourseDetails() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {courseContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className="text-xl mb-4 font-semibold">
              {item.title}
            </p>

            <div className="text-sm prose prose-sm dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.subtext}
              </p>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Key Technologies & Tools:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {item.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Focus:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {item.focus.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const courseContent = [
  {
    title: "AWS DevOps Certification Course",
    subtext: "Master DevOps fundamentals and cloud automation on AWS. Become job-ready for modern DevOps roles.",
    badge: "AWS",
    technologies: [
      "Linux, Bash/Shell Scripting",
      "Git, GitHub/GitLab/Bitbucket",
      "Jenkins, Maven, Nexus",
      "Ansible, Docker, Kubernetes",
      "AWS Cloud (EC2, S3, IAM, RDS, VPC, ELB, CloudFront, Route 53, CloudWatch, Auto Scaling, SNS, CodeCommit, CodeBuild, CodeDeploy, CodePipeline)",
      "Terraform (Infrastructure as Code)"
    ],
    focus: [
      "Complete DevOps lifecycle (CI/CD, automation, monitoring)",
      "Hands-on with AWS services and modern DevOps tools",
      "Prepares for real-world DevOps job roles and interviews"
    ]
  },
  {
    title: "Microsoft Azure with DevOps & Azure Administration",
    subtext: "Build expertise in Azure cloud, networking, storage, and DevOps pipelines for enterprise environments.",
    badge: "Azure",
    technologies: [
      "Azure Cloud (Virtual Networks, Storage, VMs, SQL, App Services, Functions, Logic Apps, API Management, CosmosDB, Event Hub, Key Vault, RBAC)",
      "Azure DevOps (Boards, Repos, Pipelines, Artifacts, CI/CD)",
      "Git & GitHub",
      "ARM Templates, Terraform, Ansible",
      "Monitoring & Log Analytics"
    ],
    focus: [
      "Deep dive into Azure administration and automation",
      "End-to-end DevOps pipeline creation and management on Azure",
      "Resume prep, job guidance, and interview readiness for Azure DevOps roles"
    ]
  }
]; 