// File: app/courses/azure-devops/page.tsx

"use client";
import { useState } from "react";
import { FaCloud, FaLock, FaDatabase, FaServer, FaUserShield, FaClipboardList, FaCogs, FaKey, FaTools, FaUserTie } from "react-icons/fa";
import { SiTerraform, SiApachespark } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { MdStorage, MdBackup, MdDns, MdOutlineMonitor, MdOutlineApi, MdOutlineWeb } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import RazorpayButton from "@/components/RazorpayButton/AWS_Course_RazorpayButton";
import { motion } from "motion/react";

// Updated curriculum per provided outline
const modules = [
  {
    title: "Fundamentals (Basics for Everyone)",
    topics: [
      {
        icon: <FaCloud className="text-blue-500" size={28} />,
        title: "Introduction to Cloud Computing",
        desc: "IaaS, PaaS, SaaS; Public, Private, Hybrid models and core benefits.",
      },
      {
        icon: <FaCogs className="text-blue-600" size={28} />,
        title: "Introduction to DevOps",
        desc: "Culture, principles and benefits; collaboration and automation mindset.",
      },
      {
        icon: <FaServer className="text-green-600" size={28} />,
        title: "Basic Linux Fundamentals",
        desc: "Shell, commands, file system, users and permissions for DevOps work.",
      },
      {
        icon: <FaTools className="text-purple-600" size={28} />,
        title: "Version Control with Git & GitHub",
        desc: "Git basics, branching, pull requests, GitHub workflows.",
      },
    ],
  },
  {
    title: "Azure Fundamentals",
    topics: [
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Azure Overview & Global Infrastructure",
        desc: "Regions, Availability Zones and resiliency fundamentals.",
      },
      {
        icon: <FaClipboardList className="text-pink-500" size={28} />,
        title: "Subscriptions, Resource Groups & Management",
        desc: "Structure, access and governance for Azure resources.",
      },
      {
        icon: <MdDns className="text-blue-500" size={28} />,
        title: "Azure Networking",
        desc: "VNet, Subnet, NSG, Firewall, VPN Gateway and ExpressRoute.",
      },
      {
        icon: <FaServer className="text-blue-600" size={28} />,
        title: "Compute Services",
        desc: "Virtual Machines, VM Scale Sets, App Services and Azure Functions.",
      },
      {
        icon: <MdStorage className="text-yellow-500" size={28} />,
        title: "Storage Services",
        desc: "Blob, Queue, Table, File Storage and Azure Disk options.",
      },
      {
        icon: <FaDatabase className="text-blue-700" size={28} />,
        title: "Databases",
        desc: "Azure SQL, Cosmos DB, PostgreSQL and MySQL on Azure.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-600" size={28} />,
        title: "Monitoring & Management",
        desc: "Azure Monitor, Log Analytics and Application Insights.",
      },
      {
        icon: <FaUserShield className="text-blue-700" size={28} />,
        title: "Identity & Security",
        desc: "Azure AD, RBAC, Managed Identity and Key Vault integration.",
      },
      {
        icon: <MdOutlineApi className="text-blue-400" size={28} />,
        title: "Messaging & Integration",
        desc: "Event Grid, Event Hub and Service Bus patterns.",
      },
      {
        icon: <SiApachespark className="text-yellow-500" size={28} />,
        title: "Data & Analytics",
        desc: "Data Factory, Synapse Analytics and Azure Databricks overview.",
      },
      {
        icon: <VscAzure className="text-blue-600" size={28} />,
        title: "Containers & Serverless",
        desc: "Azure Container Instances and Azure Kubernetes Service (AKS).",
      },
    ],
  },
  {
    title: "Azure DevOps",
    topics: [
      {
        icon: <VscAzure className="text-blue-600" size={28} />,
        title: "Azure DevOps Overview",
        desc: "Core services and end‑to‑end delivery workflows.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Azure Repos (Git & TFVC)",
        desc: "Source control, branching strategies and PR reviews.",
      },
      {
        icon: <VscAzure className="text-blue-500" size={28} />,
        title: "Azure Boards",
        desc: "Agile project management with work items and sprints.",
      },
      {
        icon: <VscAzure className="text-indigo-600" size={28} />,
        title: "Azure Pipelines",
        desc: "CI/CD using YAML and Classic pipelines across environments.",
      },
      {
        icon: <VscAzure className="text-blue-500" size={28} />,
        title: "Azure Test Plans",
        desc: "Manual and exploratory testing for quality gates.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Azure Artifacts",
        desc: "Package feeds and dependency management.",
      },
      {
        icon: <FaCogs className="text-pink-500" size={28} />,
        title: "Integrations",
        desc: "GitHub Actions and third‑party toolchain integrations.",
      },
    ],
  },
  {
    title: "DevOps Tools & Practices",
    topics: [
      {
        icon: <SiTerraform className="text-purple-600" size={28} />,
        title: "Infrastructure as Code — Terraform",
        desc: "Terraform on Azure for repeatable environment provisioning.",
      },
      {
        icon: <FaTools className="text-blue-500" size={28} />,
        title: "Configuration Management",
        desc: "Ansible, Chef and Puppet — where they fit (overview).",
      },
      {
        icon: <FaServer className="text-blue-600" size={28} />,
        title: "Containerization — Docker",
        desc: "Images, containers, Dockerfile and Compose fundamentals.",
      },
      {
        icon: <VscAzure className="text-blue-700" size={28} />,
        title: "Orchestration — Kubernetes",
        desc: "Pods, Services, Deployments and Helm basics.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-600" size={28} />,
        title: "Monitoring & Logging",
        desc: "Prometheus, Grafana and ELK stack patterns.",
      },
      {
        icon: <FaUserShield className="text-blue-700" size={28} />,
        title: "Security in DevOps",
        desc: "DevSecOps, SAST/DAST and securing CI/CD pipelines.",
      },
    ],
  },
  {
    title: "Cloud Networking & Security",
    topics: [
      {
        icon: <MdDns className="text-blue-500" size={28} />,
        title: "VNet Peering & Service Endpoints",
        desc: "Patterns for secure and performant network design.",
      },
      {
        icon: <FaLock className="text-purple-600" size={28} />,
        title: "Private Link & Private Endpoints",
        desc: "Private connectivity to PaaS services.",
      },
      {
        icon: <FaServer className="text-blue-600" size={28} />,
        title: "Load Balancing & Traffic",
        desc: "LB (public/private), Application Gateway and Traffic Manager.",
      },
      {
        icon: <MdDns className="text-blue-400" size={28} />,
        title: "DNS, Firewall & WAF",
        desc: "Name resolution, perimeter security and web protection.",
      },
      {
        icon: <FaUserShield className="text-blue-700" size={28} />,
        title: "Zero Trust & Governance",
        desc: "Best practices for access, policy and guardrails.",
      },
    ],
  },
  {
    title: "Capstone & Next Steps",
    topics: [
      {
        icon: <FaClipboardList className="text-pink-500" size={28} />,
        title: "Real‑Time Project",
        desc: "Deploy a multi‑tier app on Azure using DevOps practices.",
      },
      {
        icon: <MdOutlineMonitor className="text-green-600" size={28} />,
        title: "Integrations",
        desc: "Wire up monitoring, security and automation end‑to‑end.",
      },
      {
        icon: <FaUserTie className="text-blue-700" size={28} />,
        title: "Career Path",
        desc: "Roadmap for Azure DevOps & Cloud Engineering roles.",
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

  const headingWords = "Azure DevOps Course";
  const subheadingWords = "Curriculum & roadmap — everything you'll master";
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
          {/* Right side - Sticky Payment (30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-28 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-200">
              {/* Pricing */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-blue-900/70">Course Fee</div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-neutral-500 line-through text-lg">₹25,000</span>
                  <span className="text-2xl font-extrabold text-blue-900">₹22,000</span>
                </div>
              </div>

              {/* Benefits bullets */}
              <ul className="mb-6 space-y-2 text-sm text-blue-900/80">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Lifetime access with recordings</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Capstone project on Azure</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Free previews, secure streaming</li>
              </ul>

              {/* Razorpay Button */}
              <RazorpayButton
                url="https://rzp.io/rzp/Xq2joSL"
                text="Enroll Now — ₹22,000"
                color="#1d4ed8"
                size="large"
                className="w-full"
              />

              <div className="mt-3 text-[12px] text-neutral-500 text-center">Payments powered by Razorpay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}