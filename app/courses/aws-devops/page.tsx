"use client";
import { FaLinux, FaGitAlt, FaAws, FaDocker, FaJenkins, FaLinkedin, FaCloud } from "react-icons/fa";
import { SiApachemaven, SiKubernetes, SiTerraform, SiAnsible } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import { useState } from "react";


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
    <div className="relative border-2 border-blue-200 rounded-3xl p-2 bg-transparent overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
        {/* Lamp-like gradient accent at top left */}
        <div className="absolute top-0 left-8 h-0.5 w-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full z-20" />
        <div className="absolute top-[-8px] left-6 w-24 h-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-30 blur-2xl rounded-full z-10" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shadow-md">
            {icon}
          </div>
          <div className="font-bold text-blue-900 text-lg ">{title}</div>
        </div>
        <div className="text-neutral-600 text-base leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default function AwsDevopsCurriculumPage() {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const headingWords = "AWS DevOps";
  const subheadingWords = "View our curriculum";
  const descriptionWords = "Master AWS DevOps with our comprehensive curriculum. This program takes approximately 6 months full-time or 8 months part-time to complete, covering everything from cloud foundations to advanced IaC and CI/CD on AWS.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 py-10 px-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side - Modules (70%) */}
          <div className="lg:w-[70%]">
            <div className="mb-12 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-1"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FaAws className="text-orange-500" size={55} />
                </motion.div>
                <div className="text-3xl lg:text-5xl lg:leading-tight font-bold text-blue-900">
                  <TextGenerateEffect 
                    words={headingWords} 
                    onComplete={() => setShowSubheading(true)}
                  />
                </div>
              </motion.div>
              
              {showSubheading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl lg:text-2xl lg:leading-tight mt-2 font-medium text-blue-700 pl-1"
                >
                  <TextGenerateEffect 
                    words={subheadingWords} 
                    onComplete={() => setShowDescription(true)}
                  />
                </motion.div>
              )}

              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base lg:text-lg lg:leading-relaxed mt-3 text-neutral-600 pl-1"
                >
                  <TextGenerateEffect 
                    words={descriptionWords} 
                    onComplete={() => setShowContent(true)}
                  />
                </motion.div>
              )}
            </div>

            {showContent && modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 90 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-10 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-md">
                    Module {i + 1}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-5 text-blue-900">{mod.title}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mod.topics.map((topic) => (
                    <CurriculumCard key={topic.title} {...topic} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Sticky Inquiry Form (30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-28 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-200">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-blue-900">Start Your AWS Journey!</h3>
                <p className="text-sm text-neutral-600">Questions? Fill out the form, and our AWS experts will guide you.</p>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-blue-800 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-800 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors min-h-[100px]"
                    placeholder="Ask us anything about the course..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 