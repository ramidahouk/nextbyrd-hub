export const websiteCostFaqItems = [
  {
    question: "How much does a small business website cost?",
    answer:
      "A small business website cost depends on country, functionality, design level, and who maintains the site after launch. A simple service website is usually the lower end of the range, while booking systems, e-commerce, customer accounts, multilingual content, and high-end design increase the cost.",
  },
  {
    question: "Why is there such a big price range?",
    answer:
      "Website price ranges are large because functionality, content management, booking, e-commerce, and design quality change the amount of work behind the site. Two websites can look similar on the surface but be completely different builds underneath. The range reflects the real spread across professional agencies in your market.",
  },
  {
    question: "Why not just use Wix or Squarespace?",
    answer:
      "Wix or Squarespace can work for a simple website that will not change much. The trade-off is lock-in: Wix, Squarespace, and Framer do not let you export your site. If you outgrow the platform or need custom functionality, moving usually means rebuilding from scratch. A custom build costs more upfront, but you own the code and hosting decision.",
  },
  {
    question: "How much does website maintenance cost per year?",
    answer:
      "Website maintenance usually costs between 1,200 and 6,000 euros per year for ongoing agency support, depending on site complexity and update frequency. This can cover security updates, plugin or dependency updates, small content edits, and performance monitoring. Some agencies bundle it into a monthly retainer. Others quote it separately.",
  },
  {
    question: "What is not included in a typical agency quote?",
    answer:
      "Agency website quotes often exclude copywriting, photography, and ongoing SEO content. Agencies usually build the structure, not the photos or article strategy. For e-commerce sites, product photography is also separate. For client portals handling sensitive data, a third-party security audit is rarely included but strongly recommended.",
  },
  {
    question: "How do I know if my budget is realistic?",
    answer:
      "Your website budget is realistic if it matches the country, scope, and complexity of the site you need. The ranges in this tool come from agency pricing data across France, the UK, the US, and the UAE in 2026. If your budget is below the floor for your project type, scope can still be adjusted through fewer pages, a simpler CMS, or phased delivery.",
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
  name: "Website Cost Calculator common questions",
  description:
    "Answers to common questions about website pricing, maintenance, builders, budgets, and what agency quotes usually include.",
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
