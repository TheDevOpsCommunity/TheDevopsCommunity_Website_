import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Rocket, Zap, Globe, Lightbulb } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function FeaturesSection() {
  return (
    <div className="relative z-20 py-10 lg:py-10 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black">
          Why DevOps Skills Matter in 2025
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal">
          DevOps is no longer optional-it's the backbone of modern software delivery, powering innovation, speed, and career growth in the digital age.
        </p>
      </div>

      <div className="mt-16 px-4">
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Rocket className="h-4 w-4 text-black" />}
            title="🚀 Explosive Demand & Career Growth"
            description="The global DevOps market is projected to grow from $10.4 billion in 2023 to $25.5 billion by 2028, making DevOps one of the fastest-growing fields in tech."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Zap className="h-4 w-4 text-black" />}
            title="⚡ Powering Modern Business & Technology"
            description="99% of companies using DevOps report faster releases, fewer bugs, and smoother workflows-DevOps is now a core strategy for staying competitive."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Globe className="h-4 w-4 text-black" />}
            title="🌐 Essential for Cloud & Automation-Driven Teams"
            description="By 2025, most companies will run the majority of their services on cloud platforms-multi-cloud and automation skills are indispensable."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Lightbulb className="h-4 w-4 text-black" />}
            title="💡 Gateway to New-Age Tech Roles & Higher Salaries"
            description="DevOps professionals are in short supply but high demand, leading to excellent job security and some of the highest pay scales in IT."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Rocket className="h-4 w-4 text-black" />}
            title="🎯 Future-Proof Career Path"
            description="Roles like DevOps Engineer, DevOps Architect, and DevOps Security Engineer are among the best-paid and most future-proof careers in tech."
          />
        </ul>
      </div>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border-2 border-gray-200 p-2 md:rounded-3xl md:p-3 bg-ghostwhite">
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
            <div className="w-fit rounded-lg border-2 border-gray-300 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

