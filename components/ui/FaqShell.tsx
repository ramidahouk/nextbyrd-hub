export const websiteCostFaqItems = [
  {
    question: "Why is there such a big price range?",
    answer:
      "Because two websites that look similar on the surface can be completely different builds underneath. A showcase site with a contact form and a showcase site with online booking, a CMS, and multilingual support are not the same project. The range reflects the real spread across professional agencies in your market. The more specific your answers, the narrower the estimate gets.",
  },
  {
    question: "Why not just use Wix or Squarespace?",
    answer:
      "For a simple site that will not change much, a builder can work. The problem is what happens later. Wix, Squarespace, and Framer do not let you export your site. If you outgrow the platform or want custom functionality, you rebuild from scratch and lose your SEO history in the process. A custom build costs more upfront. You own the code, you own the hosting decision, and you are not locked into anyone's pricing.",
  },
  {
    question: "What does website maintenance actually cost?",
    answer:
      "Most agencies charge between 1,200 and 6,000 euros per year for ongoing maintenance, depending on the complexity of the site and how often content changes. This covers security updates, plugin or dependency updates, small content edits, and performance monitoring. Some agencies bundle it into a monthly retainer. Others quote it separately. Always ask before signing.",
  },
  {
    question: "What is not included in a typical agency quote?",
    answer:
      "Three things that almost always get quoted separately: copywriting, photography, and ongoing SEO content. Agencies build the structure, not the photos or the article strategy. For e-commerce sites, product photography is also separate. For client portals handling sensitive data, a third-party security audit is rarely included but strongly recommended.",
  },
  {
    question: "How do I know if my budget is realistic?",
    answer:
      "The ranges in this tool come from real agency pricing data across France, the UK, the US, and the UAE in 2026. If your budget is below the floor for your project type, it does not mean it is impossible. It means you need to be upfront about it with any agency you speak with. Scope can be adjusted: fewer pages, a simpler CMS, phased delivery. A good agency will tell you what is achievable in your range instead of over-promising and under-delivering.",
  },
  {
    question: "Does Nextbyrd build all these types of sites?",
    answer:
      "Yes. The tool covers the full range of what we build: service sites, booking-enabled sites, e-commerce stores, portfolios, client portals, and non-profit sites across European markets. If your project is more complex or does not fit neatly into a category, the best next step is a scoping call. No commitment, no sales pitch. Just a conversation about what you actually need.",
  },
];

export const websiteCostFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: websiteCostFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqShell() {
  return (
    <section
      className="bg-hub-surface py-16"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto w-full max-w-[1200px] px-container">
        <h2
          id="faq-heading"
          className="text-xl font-semibold tracking-normal text-hub-navy"
        >
          Common questions
        </h2>
        <div className="mt-8 max-w-[760px]">
          {websiteCostFaqItems.map((item) => (
            <article key={item.question} className="mb-8 last:mb-0">
              <h3 className="text-base font-semibold leading-snug text-hub-navy">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-hub-gray">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
