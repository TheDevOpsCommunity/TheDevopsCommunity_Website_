"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import Link from "next/link";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const AwsLogo = () => (
  <div className="w-12 h-12 relative">
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
      alt="AWS Logo"
      fill
      className="object-contain"
    />
  </div>
);

const AzureLogo = () => (
  <div className="w-12 h-12 relative">
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
      alt="Azure Logo"
      fill
      className="object-contain"
    />
  </div>
);

export default function Courses() {
  const timelineData = [
    {
      title: "AWS DevOps Certification Course",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <div className="bg-ghostwhite rounded-xl p-6 border-2 border-gray-200 h-full">
              <div className="flex items-center gap-4 mb-6">
                <AwsLogo />
                <div>
                  <h3 className="text-xl font-semibold text-black">AWS DevOps Certification Course</h3>
                  <p className="text-neutral-600">Master DevOps fundamentals and cloud automation on AWS.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-2">Core Technologies</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li>• Linux, Git, Jenkins</li>
                      <li>• Docker, Kubernetes</li>
                      <li>• AWS EC2, S3, IAM</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-2">Advanced Skills</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li>• CodePipeline, Terraform</li>
                      <li>• CI/CD Implementation</li>
                      <li>• Infrastructure as Code</li>
                    </ul>
                  </div>
                </div>
                <Link 
                  href="/courses/aws-devops/"
                  className="inline-block mt-4 px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="relative h-full rounded-xl border-2 border-gray-200 p-2 md:p-3">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                  <div className="space-y-3">
                    <h4 className="font-medium text-lg">Course Highlights</h4>
                    <ul className="space-y-3 text-sm text-neutral-600">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Hands-on Labs
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Real-world Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Certification Prep
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        24/7 Support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Azure DevOps with Azure Admin",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <div className="bg-ghostwhite rounded-xl p-6 border-2 border-gray-200 h-full">
              <div className="flex items-center gap-4 mb-6">
                <AzureLogo />
                <div>
                  <h3 className="text-xl font-semibold text-black">Azure DevOps with Azure Admin</h3>
                  <p className="text-neutral-600">Build expertise in Azure cloud, networking, and DevOps pipelines.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-2">Azure Services</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li>• VNet, Storage, VMs</li>
                      <li>• SQL, App Services</li>
                      <li>• Azure DevOps Pipelines</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-2">DevOps Tools</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li>• ARM Templates</li>
                      <li>• Terraform</li>
                      <li>• Monitoring & Security</li>
                    </ul>
                  </div>
                </div>
                <Link 
                  href="/courses/azure-devops/"
                  className="inline-block mt-4 px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="relative h-full rounded-xl border-2 border-gray-200 p-2 md:p-3">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                  <div className="space-y-3">
                    <h4 className="font-medium text-lg">Course Highlights</h4>
                    <ul className="space-y-3 text-sm text-neutral-600">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Hands-on Labs
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Real-world Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Certification Prep
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        24/7 Support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="courses" className="relative w-full overflow-clip">
      <Timeline data={timelineData} />
    </section>
  );
}
