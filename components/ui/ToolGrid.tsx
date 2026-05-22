"use client";
import { motion } from "motion/react";
import { ClipboardList, Layers, BarChart2, Search } from "lucide-react";
import ToolCard from "./ToolCard";

const tools = [
  {
    id: "scope",
    href: "/website-cost-calculator",
    name: "Website Scope + Pricing",
    description: "Find out what kind of website you need and what it should cost.",
    Icon: ClipboardList,
  },
  {
    id: "stack",
    href: "/website-builder-comparison",
    name: "Frontend Stack Decision",
    description: "Wix, Webflow, or custom? Get a recommendation based on your situation.",
    Icon: Layers,
  },
  {
    id: "performance",
    href: "/website-speed-calculator",
    name: "Performance vs. Conversion",
    description: "See how your site speed affects bounce rate and conversions.",
    Icon: BarChart2,
  },
  {
    id: "audit",
    href: "/website-grader",
    name: "Website Audit",
    description: "Enter your URL and get a real technical audit of your site.",
    Icon: Search,
  },
];

export default function ToolGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} {...tool} />
      ))}
    </motion.div>
  );
}
