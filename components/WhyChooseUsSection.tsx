import { CheckCircle2 } from "lucide-react";
import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo";

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">
          DevOps That Gets You Hired
        </h2>
        <ul className="space-y-4 mb-12 max-w-2xl mx-auto">
          {[
            "Real-world project-based learning",
            "Resume and LinkedIn optimization",
            "Doubt support from expert engineers",
            "Peer community + Mock interview help",
            "Lifetime access to training materials",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-lg text-gray-800">
              <CheckCircle2 className="text-blue-500 w-6 h-6" />
              {item}
            </li>
          ))}
        </ul>
        {/* Testimonials */}
        <AnimatedTestimonialsDemo />
      </div>
    </section>
  );
} 