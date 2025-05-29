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
    <div className="relative border-2 border-blue-200 rounded-3xl p-2 bg-transparent overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
        {/* Lamp-like gradient accent at top left */}
        <div className="absolute top-0 left-8 h-0.5 w-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full z-20" />
        <div className="absolute top-[-8px] left-6 w-24 h-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-30 blur-2xl rounded-full z-10" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shadow-md">
            {icon}
          </div>
          <div className="font-bold text-blue-900 text-lg">{title}</div>
        </div>
        <div className="text-neutral-600 text-base leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function CourseInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          type: 'course',
          courseId: 'azure-devops',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2 text-blue-900">Thank you!</h2>
        <p className="text-blue-700">Your inquiry has been submitted. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors"
          placeholder="Your Name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-blue-800 mb-1">Phone (Optional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors"
          placeholder="+1 (555) 000-0000"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-blue-800 mb-1">Your Message</label>
        <textarea
          id="message"
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 backdrop-blur-sm transition-colors min-h-[100px]"
          placeholder="Ask us anything about the course..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Send Inquiry'}
      </button>
    </form>
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
                  <VscAzure className="text-blue-600" size={55} />
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
                <h3 className="text-2xl font-bold mb-2 text-blue-900">Start Your Azure Journey!</h3>
                <p className="text-sm text-neutral-600">Questions? Fill out the form, and our Azure experts will guide you.</p>
              </div>
              <CourseInquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}