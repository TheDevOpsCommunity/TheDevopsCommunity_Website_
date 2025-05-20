// File: app/courses/azure-devops/page.tsx

"use client";
import { useState } from "react";
import { FaCloud, FaLock, FaDatabase, FaServer, FaUserShield, FaClipboardList, FaCogs, FaKey, FaTools, FaUserTie } from "react-icons/fa";
import { SiTerraform, SiApachespark } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { MdStorage, MdBackup, MdDns, MdOutlineMonitor, MdOutlineApi, MdOutlineWeb } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";

// You can adjust these icons as you see fit for each topic.
const modules = [
  {
    title: "Cloud Computing & Azure Fundamentals",
    topics: [
      {
        icon: <FaCloud className="text-blue-500" size={28} />,
        title: "Cloud Computing Introduction",
        desc: "Characteristics, service models (IaaS, PaaS, SaaS), deployment models, pros/cons, Azure certifications.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Getting Started with Azure",
        desc: "Portal navigation, subscriptions, hosting models, key services, resource groups.",
      },
    ],
  },
  {
    title: "Azure Networking",
    topics: [
      {
        icon: <MdDns className="text-blue-400" size={28} />,
        title: "Virtual Networks",
        desc: "VNet creation, subnets, IP addressing, NICs (public/private IPs), VM setup.",
      },
      {
        icon: <FaLock className="text-purple-500" size={28} />,
        title: "Network Security",
        desc: "NSG creation, rules, association, inbound/outbound, Azure Firewall.",
      },
      {
        icon: <MdDns className="text-blue-400" size={28} />,
        title: "DNS & Connectivity",
        desc: "Azure DNS, public/private zones, VNet peering, VNet-to-VNet, VPN, ExpressRoute.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-500" size={28} />,
        title: "Monitoring & Troubleshooting",
        desc: "Network Watcher, connectivity monitoring, troubleshooting tools.",
      },
    ],
  },
  {
    title: "Advanced Virtual Networking",
    topics: [
      {
        icon: <FaServer className="text-blue-500" size={28} />,
        title: "Load Balancing & Availability",
        desc: "External/internal load balancers, availability sets/zones, Application Gateway, Traffic Manager.",
      },
      {
        icon: <FaServer className="text-blue-400" size={28} />,
        title: "Hybrid Networking",
        desc: "Site-to-site VPN, on-premises integration, ExpressRoute.",
      },
    ],
  },
  {
    title: "Azure Storage Services",
    topics: [
      {
        icon: <MdStorage className="text-yellow-500" size={28} />,
        title: "Storage Accounts & Blobs",
        desc: "Account creation, blob types (block, append, page), containers, CDN, custom domains.",
      },
      {
        icon: <FaKey className="text-purple-400" size={28} />,
        title: "Data Management & Security",
        desc: "AzCopy, encryption, access management, SAS, Key Vault integration.",
      },
      {
        icon: <MdStorage className="text-yellow-400" size={28} />,
        title: "Table, Queue, File Storage",
        desc: "NoSQL tables, queues, SMB file storage, Azure File Sync.",
      },
    ],
  },
  {
    title: "Resource Management & Automation",
    topics: [
      {
        icon: <FaClipboardList className="text-pink-400" size={28} />,
        title: "Resource Groups & Policies",
        desc: "Policies, locks, tagging, resource movement and deletion.",
      },
      {
        icon: <FaTools className="text-blue-400" size={28} />,
        title: "Automation Tools",
        desc: "Azure PowerShell, CLI, ARM templates (export/import, deployment).",
      },
    ],
  },
  {
    title: "Compute & Virtual Machines",
    topics: [
      {
        icon: <FaServer className="text-blue-500" size={28} />,
        title: "VM Creation & Management",
        desc: "Windows VM via portal, PowerShell, ARM; disk management, snapshots, extensions.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-500" size={28} />,
        title: "Scaling & Monitoring",
        desc: "VM scale sets, disk encryption, configuration, monitoring, alerts.",
      },
    ],
  },
  {
    title: "Databases & App Services",
    topics: [
      {
        icon: <FaDatabase className="text-blue-700" size={28} />,
        title: "Azure SQL Database",
        desc: "Setup, migration, security, backup/recovery, monitoring, elastic pools, auditing.",
      },
      {
        icon: <MdOutlineWeb className="text-pink-400" size={28} />,
        title: "App Services (Web, API, Functions)",
        desc: "Deploying web apps, app service plans, scaling, deployment slots, configuration, monitoring, custom domains, SSL.",
      },
      {
        icon: <SiApachespark className="text-yellow-500" size={28} />,
        title: "Serverless & Logic Apps",
        desc: "Azure Functions (triggers, bindings, event processing), Logic Apps (triggers/actions, integration, custom connectors).",
      },
    ],
  },
  {
    title: "Advanced Cloud Services",
    topics: [
      {
        icon: <MdOutlineApi className="text-blue-400" size={28} />,
        title: "API Management",
        desc: "API creation, management, policies, protection, caching.",
      },
      {
        icon: <VscAzure className="text-blue-500" size={28} />,
        title: "Service Bus, Event Grid, Event Hub",
        desc: "Messaging, event routing, monitoring, integration.",
      },
      {
        icon: <FaKey className="text-purple-400" size={28} />,
        title: "Key Vault, Redis, CosmosDB, Azure Search",
        desc: "Secrets management, caching, NoSQL databases, search services.",
      },
    ],
  },
  {
    title: "Identity, Access & Security",
    topics: [
      {
        icon: <FaUserShield className="text-blue-700" size={28} />,
        title: "Azure Active Directory (AD)",
        desc: "User/group management, custom domains, on-premises sync, Azure AD Connect, SSO, MFA, conditional access, PIM.",
      },
      {
        icon: <FaUserShield className="text-blue-400" size={28} />,
        title: "RBAC & Policies",
        desc: "Role-based access control, custom roles, managing identities for apps, SaaS integration.",
      },
    ],
  },
  {
    title: "Monitoring, Backup & Migration",
    topics: [
      {
        icon: <MdOutlineMonitor className="text-green-500" size={28} />,
        title: "Azure Monitor & Log Analytics",
        desc: "Metrics, logs, diagnostics, alerts, Application Insights.",
      },
      {
        icon: <MdBackup className="text-blue-400" size={28} />,
        title: "Backup & Site Recovery",
        desc: "VM backup, Recovery Services Vault, backup policies, restoring VMs, migration strategies.",
      },
    ],
  },
  {
    title: "DevOps on Azure",
    topics: [
      {
        icon: <VscAzure className="text-blue-500" size={28} />,
        title: "DevOps Fundamentals",
        desc: "DevOps practices, Agile, CI/CD concepts, benefits over traditional IT.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Azure DevOps Tools",
        desc: "Boards (work items, sprints), Repos (Git, branching, pull requests), Pipelines (classic/YAML, CI/CD, test integration), Artifacts (package management).",
      },
      {
        icon: <SiTerraform className="text-purple-600" size={28} />,
        title: "Infrastructure as Code",
        desc: "ARM Templates, Terraform, Ansible for automated deployments.",
      },
      {
        icon: <FaCogs className="text-pink-400" size={28} />,
        title: "Integration & Automation",
        desc: "Pipeline integration with Teams, SQL deployments, multi-stage approvals, agent pools, secure files.",
      },
    ],
  },
  {
    title: "Job Readiness & Interview Prep",
    topics: [
      {
        icon: <FaUserTie className="text-blue-700" size={28} />,
        title: "Resume & LinkedIn Optimization",
        desc: "Resume building, LinkedIn profile updates, job guidance.",
      },
      {
        icon: <BsFillPersonLinesFill className="text-pink-400" size={28} />,
        title: "Mock Interviews & Q&A",
        desc: "Technical and behavioral interview practice, expert tips, real-world scenarios.",
      },
    ],
  },
];

function CurriculumCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="relative border-2 border-gray-200 rounded-3xl p-2 bg-transparent overflow-hidden">
      <div className="bg-[ghostwhite] border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_2px_16px_0_rgba(200,200,200,0.10)]">
        {/* Lamp-like gradient accent at top left */}
        <div className="absolute top-0 left-8 h-0.5 w-16 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 rounded-full z-20" />
        <div className="absolute top-[-8px] left-6 w-24 h-6 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 opacity-40 blur-2xl rounded-full z-10" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shadow-[0_2px_16px_0_rgba(236,72,153,0.08)]">
            {icon}
          </div>
          <div className="font-bold text-black text-lg">{title}</div>
        </div>
        <div className="text-neutral-500 text-base leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default function AzureDevopsCurriculumPage() {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const headingWords = "Azure DevOps";
  const subheadingWords = "View our curriculum";
  const descriptionWords = "Master Azure DevOps with our comprehensive curriculum covering cloud computing, networking, security, and more. Learn from industry experts and get hands-on experience with real-world projects.";

  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Modules (70%) */}
          <div className="lg:w-[70%]">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <VscAzure className="text-blue-600" size={55} />
                </motion.div>
                <div className="text-3xl lg:text-5xl lg:leading-tight font-medium text-black">
                  <TextGenerateEffect 
                    words={headingWords} 
                    onComplete={() => setShowSubheading(true)}
                  />
                </div>
              </motion.div>
              {showSubheading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-xl lg:text-3xl lg:leading-tight mt-2 font-light text-black">
                    <TextGenerateEffect 
                      words={subheadingWords} 
                      onComplete={() => setShowDescription(true)}
                    />
                  </div>
                </motion.div>
              )}
              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-base lg:text-base lg:leading-tight mt-1 font-extralight text-gray-500">
                    <TextGenerateEffect 
                      words={descriptionWords} 
                      onComplete={() => setShowContent(true)}
                    />
                  </div>
                </motion.div>
              )}
            </div>
            {showContent && modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-600 text-white text-sm font-medium rounded-full shadow-sm">
                    Module {i + 1}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-4">{mod.title}</div>
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
            <div className="sticky top-42 bg-gradient-to-b from-transparent via-[#F1F2FF] to-transparent rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Unlock your learning journey now!</h3>
                <p className="text-sm text-gray-600">Take the first step towards becoming a DevOps expert. Our team will guide you through the enrollment process.</p>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="Tell us about your goals..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-black border-2 border-black transition-colors duration-200"
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