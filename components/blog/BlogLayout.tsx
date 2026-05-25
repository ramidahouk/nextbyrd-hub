import Link from "next/link";
import Image from "next/image";

interface BlogLayoutProps {
  title: string;
  description: string;
  date: string;
  dateTime: string;
  readTime: string;
  heroSrc: string;
  heroAlt: string;
  breadcrumbTitle: string;
  children: React.ReactNode;
}

export default function BlogLayout({
  title,
  description,
  date,
  dateTime,
  readTime,
  heroSrc,
  heroAlt,
  breadcrumbTitle,
  children,
}: BlogLayoutProps) {
  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-320 px-container pt-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-hub-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-hub-aqua transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-hub-aqua transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-hub-gray truncate">{breadcrumbTitle}</span>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <header className="mx-auto max-w-320 px-container pt-10 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 flex items-center gap-3 text-xs text-hub-muted">
            <time dateTime={dateTime}>{date}</time>
            <span>·</span>
            <span>Nextbyrd Team</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
          <h1
            className="font-semibold text-hub-navy leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            {title}
          </h1>
          <p className="mt-4 text-base text-hub-gray leading-relaxed">{description}</p>
        </div>
      </header>

      {/* Hero image */}
      <div className="mx-auto max-w-320 px-container pb-10">
        <div className="relative w-full max-h-120 h-120 overflow-hidden rounded-card">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
          />
        </div>
      </div>

      {/* Article body */}
      <article className="mx-auto max-w-320 px-container pb-20">
        <div className="max-w-3xl mx-auto prose-hub">{children}</div>
      </article>
    </div>
  );
}

export function BlogAuthorBio() {
  return (
    <div className="rounded-card border border-hub-border bg-hub-surface p-5">
      <p className="text-sm font-semibold text-hub-navy">About the author</p>
      <p className="mt-1 text-sm text-hub-gray">
        Written by the{" "}
        <a
          href="https://nextbyrd.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-hub-aqua hover:text-hub-aqua-dark underline underline-offset-2 transition-colors"
        >
          Nextbyrd
        </a>{" "}
        team — a web design and development studio building performance-first websites for businesses
        in France, the UK, the UAE, and the US.
      </p>
    </div>
  );
}
