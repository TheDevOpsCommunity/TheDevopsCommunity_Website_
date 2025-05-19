"use client";
import { FaLinux, FaGitAlt, FaAws, FaDocker, FaJenkins, FaLinkedin, FaCloud } from "react-icons/fa";
import { SiApachemaven, SiKubernetes, SiTerraform, SiAnsible } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { motion } from "motion/react";
import { GradientBadge } from "@/components/ui/gradient-badge";

// Lamp effect for card (top left)
function CardLamp() {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.8 }}
      whileInView={{ opacity: 0.7, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute -top-3 left-4 w-16 h-4 bg-cyan-300 blur-xl opacity-60 rounded-full pointer-events-none z-10"
    />
  );
}

const modules = [
  {
    title: "DevOps & Cloud Foundations",
    topics: [
      {
        icon: <FaCloud className="text-blue-500" size={28} />,
        title: "DevOps Introduction",
        desc: "Application software overview, DevOps core concepts, SDLC (Waterfall vs Agile), Dev and Ops roles in Agile.",
      },
      {
        icon: <FaCloud className="text-yellow-500" size={28} />,
        title: "Cloud Introduction",
        desc: "AWS, GCP, Azure overview, cloud computing concepts, service models (SaaS, PaaS, IaaS), client-server basics.",
      },
    ],
  },
  {
    title: "Linux Fundamentals",
    topics: [
      {
        icon: <FaLinux className="text-gray-700" size={28} />,
        title: "Operating System Concepts",
        desc: "OS and kernel basics, VirtualBox and CentOS 7 installation, Linux OS management.",
      },
      {
        icon: <FaLinux className="text-green-500" size={28} />,
        title: "Command Line & Administration",
        desc: "User/group management, file system, permissions, package management, process control, networking.",
      },
    ],
  },
  {
    title: "Shell Scripting",
    topics: [
      {
        icon: <MdOutlineDescription className="text-green-500" size={28} />,
        title: "Shell Basics",
        desc: "Shell types, script writing, naming conventions, variables, command-line arguments.",
      },
      {
        icon: <MdOutlineDescription className="text-blue-500" size={28} />,
        title: "Scripting Concepts",
        desc: "Control structures, functions, pipes, real-world automation examples for DevOps tasks.",
      },
    ],
  },
  {
    title: "Version Control with Git",
    topics: [
      {
        icon: <FaGitAlt className="text-orange-500" size={28} />,
        title: "Git Fundamentals",
        desc: "GitHub/GitLab/Bitbucket setup, VCS concepts, branching, SSH keys, cloning, merging.",
      },
      {
        icon: <FaGitAlt className="text-red-500" size={28} />,
        title: "Collaboration & Best Practices",
        desc: "Forking, README files, release management, commit best practices, pull requests.",
      },
    ],
  },
  {
    title: "Build & Artifact Management",
    topics: [
      {
        icon: <SiApachemaven className="text-purple-500" size={28} />,
        title: "Maven",
        desc: "Installation, environment setup, pom.xml, repositories, lifecycle, multi-module builds.",
      },
      {
        icon: <SiApachemaven className="text-blue-500" size={28} />,
        title: "Nexus",
        desc: "Artifact repository management, EC2 installation, Maven & Jenkins integration, release management.",
      },
    ],
  },
  {
    title: "Continuous Integration & Delivery",
    topics: [
      {
        icon: <FaJenkins className="text-red-500" size={28} />,
        title: "Jenkins Core",
        desc: "CI/CD concepts, installation, project setup, plugin management, security, pipeline creation.",
      },
      {
        icon: <FaJenkins className="text-blue-500" size={28} />,
        title: "Advanced Jenkins",
        desc: "Master/slave setup, Blue Ocean, shared libraries, integrations, notifications, job parameters.",
      },
    ],
  },
  {
    title: "Configuration Management",
    topics: [
      {
        icon: <SiAnsible className="text-yellow-600" size={28} />,
        title: "Ansible Basics",
        desc: "Architecture, host inventory, installation, basic commands and concepts.",
      },
      {
        icon: <SiAnsible className="text-red-600" size={28} />,
        title: "Playbooks & Automation",
        desc: "Writing playbooks, tags, handlers, variables, loops, conditionals, vault for secrets.",
      },
    ],
  },
  {
    title: "Containerization with Docker",
    topics: [
      {
        icon: <FaDocker className="text-blue-400" size={28} />,
        title: "Docker Fundamentals",
        desc: "VM vs containers, installation, CLI, image building, Dockerfile, multi-stage builds.",
      },
      {
        icon: <FaDocker className="text-blue-600" size={28} />,
        title: "Container Management",
        desc: "Docker Hub, ECR, networking, volumes, Docker Compose setup and commands.",
      },
    ],
  },
  {
    title: "Orchestration with Kubernetes",
    topics: [
      {
        icon: <SiKubernetes className="text-blue-600" size={28} />,
        title: "Kubernetes Core",
        desc: "Architecture, installation, core objects (Pods, Deployments, Services), ConfigMaps, Secrets.",
      },
      {
        icon: <SiKubernetes className="text-blue-800" size={28} />,
        title: "Kubernetes Operations",
        desc: "Resource quotas, ingress, load balancing, RBAC, monitoring with Prometheus/Grafana.",
      },
    ],
  },
  {
    title: "AWS Cloud Platform",
    topics: [
      {
        icon: <FaAws className="text-yellow-500" size={28} />,
        title: "Core AWS Services",
        desc: "EC2, IAM, S3, EBS, RDS, VPC, ELB, Auto Scaling, Route 53, CloudFront, CloudWatch, SNS.",
      },
      {
        icon: <FaAws className="text-yellow-400" size={28} />,
        title: "Service Configuration",
        desc: "Instance management, security groups, storage options, networking, monitoring, and automation.",
      },
    ],
  },
  {
    title: "DevOps on AWS Cloud",
    topics: [
      {
        icon: <FaAws className="text-blue-500" size={28} />,
        title: "AWS DevOps Tools",
        desc: "CodeCommit for repositories, CodeBuild for automation, CodeDeploy for deployments.",
      },
      {
        icon: <FaAws className="text-blue-700" size={28} />,
        title: "Pipeline Management",
        desc: "CodePipeline setup, scheduling, management, and integration with other AWS services.",
      },
    ],
  },
  {
    title: "Infrastructure as Code",
    topics: [
      {
        icon: <SiTerraform className="text-purple-600" size={28} />,
        title: "Terraform Fundamentals",
        desc: "IaC concepts, terminology, resource creation in AWS, state management.",
      },
      {
        icon: <SiTerraform className="text-purple-400" size={28} />,
        title: "Practical Automation",
        desc: "Real-world Terraform scenarios, best practices, and interview-level implementations.",
      },
    ],
  },
  {
    title: "Capstone Project",
    topics: [
      {
        icon: <FaCloud className="text-green-500" size={28} />,
        title: "End-to-End DevOps Project",
        desc: "3-tier application deployment (UI, backend, MySQL DB) using all tools and practices learned.",
      },
    ],
  },
  {
    title: "Interview & Career Preparation",
    topics: [
      {
        icon: <FaLinkedin className="text-blue-700" size={28} />,
        title: "Resume & LinkedIn",
        desc: "Craft a DevOps-ready resume, optimize LinkedIn profile, prepare for technical interviews.",
      },
      {
        icon: <BsFillPersonLinesFill className="text-pink-400" size={28} />,
        title: "Mock Interviews & Q&A",
        desc: "Practice with real DevOps scenarios, expert guidance, and job search strategies.",
      },
    ],
  },
];

function CurriculumCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="relative border-2 border-gray-200 rounded-3xl p-2 bg-transparent overflow-hidden">
      <div className="bg-[ghostwhite] border border-gray-100 rounded-2xl p-6 flex flex-col gap-4  shadow-[0_2px_16px_0_rgba(200,200,200,0.10)]">
        {/* Lamp-like gradient accent at top left */}
        <div className="absolute top-0 left-8 h-0.5 w-16 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 rounded-full z-20" />
        <div className="absolute top-[-8px] left-6 w-24 h-6 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 opacity-40 blur-2xl rounded-full z-10" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shadow-[0_2px_16px_0_rgba(236,72,153,0.08)]">
            {icon}
          </div>
          <div className="font-bold text-black text-lg ">{title}</div>
        </div>
        <div className="text-neutral-500 text-base leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default function AwsDevopsCurriculumPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-4 pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <GradientBadge text="AWS DevOps" className="mb-4" />
        <h1 className="text-4xl font-bold mb-2">View our curriculum</h1>
        <div className="text-gray-500 mb-2">The entire program takes 6 months full-time or 8 months part-time to complete</div>
      </div>
      <div className="max-w-5xl mx-auto">
        {modules.map((mod, i) => (
          <div key={mod.title} className="mb-10">
            <div className="text-pink-500 font-semibold mb-2">Module {i + 1}</div>
            <div className="text-2xl font-bold mb-4">{mod.title}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mod.topics.map((topic) => (
                <CurriculumCard key={topic.title} {...topic} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 