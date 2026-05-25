import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog - hub.nextbyrd.com",
  description: "Guides and articles for business owners building or improving their web presence.",
  alternates: { canonical: "https://hub.nextbyrd.com/blog" },
  openGraph: {
    title: "Blog - hub.nextbyrd.com",
    description: "Guides and articles for business owners building or improving their web presence.",
    url: "https://hub.nextbyrd.com/blog",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - hub.nextbyrd.com",
    description: "Guides and articles for business owners building or improving their web presence.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

const posts = [
  {
    href: "/blog/how-much-does-a-website-cost-for-a-small-business",
    title: "How Much Does a Website Cost for a Small Business? (2026 Guide)",
    description:
      "73% of small businesses have a website in 2026. Here's what it actually costs: from $200/year DIY to $35,000+ agency, and what drives the difference.",
    date: "May 24, 2026",
    dateTime: "2026-05-24",
    readTime: "9 min read",
    image: "/img/blog1.webp",
    imageAlt: "Web designer at dual-monitor workstation showing code and a portfolio website",
  },
];

export default function BlogPage() {
  return (
    <div
      className="mx-auto max-w-320 px-container"
      style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      <h1 className="text-2xl font-semibold text-hub-navy mb-2">Blog</h1>
      <p className="text-sm text-hub-gray mb-12">
        Guides and articles for business owners building or improving their web presence.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group flex flex-col overflow-hidden rounded-card border border-hub-border bg-white shadow-hub-whisper transition-shadow hover:shadow-hub-subtle"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-center gap-2 text-xs text-hub-muted">
                <time dateTime={post.dateTime}>{post.date}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mb-2 text-base font-semibold text-hub-navy leading-snug group-hover:text-hub-aqua transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-hub-gray leading-relaxed line-clamp-3">
                {post.description}
              </p>
              <div className="mt-4 text-xs font-medium text-hub-aqua">
                Read article →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
