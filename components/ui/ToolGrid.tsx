"use client";
import { motion } from "motion/react";
import { ClipboardList, Layers, BarChart2, Search } from "lucide-react";
import ToolCard from "./ToolCard";

const tools = [
  {
    id: "scope",
    href: "/website-cost-calculator",
    name: "Cost Calculator",
    description: "Find out what kind of website you need and what it should cost.",
    Icon: ClipboardList,
  },
  {
    id: "stack",
    href: "/website-builder-comparison",
    name: "Build Options",
    description: "Wix, Webflow, or custom code? Answer a few questions and get a clear recommendation.",
    Icon: Layers,
  },
  {
    id: "performance",
    href: "/website-speed-calculator",
    name: "Speed Calculator",
    description: "See how your site speed affects bounce rate and conversions.",
    Icon: BarChart2,
  },
  {
    id: "audit",
    href: "/website-grader",
    name: "Website Grader",
    description: "Enter your URL and get a free technical report on what's holding your site back.",
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
