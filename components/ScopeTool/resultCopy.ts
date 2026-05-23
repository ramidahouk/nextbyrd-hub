import { formatPrice, hasBudgetUndershoot } from "./pricing";
import type { Country, ResultPath, ScopeAnswers } from "./scoring";

export interface OngoingCost {
  item: string;
  range: string;
}

export interface ResultCopy {
  badge: string;
  headline: string;
  ctaLabel: string;
  ctaButton: string;
  bullets: string[];
  builderComparison: string;
  ongoingCosts: OngoingCost[];
  notIncluded: string[];
}

const gatewayCost: OngoingCost = {
  item: "Payment gateway fees",
  range: "around 2% per transaction",
};

const pathCopy: Record<
  ResultPath,
  Omit<ResultCopy, "bullets" | "ongoingCosts" | "notIncluded">
> = {
  "local-showcase": {
    badge: "Service Website",
    headline: "You need a service website",
    ctaLabel: "Want a proper plan for this?",
    ctaButton: "Get in touch",
    builderComparison:
      "A website builder like Squarespace or Wix can work well for a simple service site. The real cost is year two and beyond - and leaving: Wix does not let you export your site, so moving means rebuilding from scratch. If your needs stay simple, a builder is reasonable. If you ever want custom functionality, you'll pay twice.",
  },
  "local-booking": {
    badge: "Service Website + Booking",
    headline: "You need a service website with online booking",
    ctaLabel: "Ready to scope this properly?",
    ctaButton: "Get in touch",
    builderComparison:
      "Wix and Squarespace both include booking tools in their business plans. The trade-off is lock-in - neither platform lets you export your site if you outgrow them. A custom build costs more upfront but you own the code and can move or modify it without starting over.",
  },
  "local-full": {
    badge: "Service Website + Booking",
    headline: "You need a full service site with showcase and bookings",
    ctaLabel: "Ready to scope this properly?",
    ctaButton: "Get in touch",
    builderComparison: "",
  },
  "ecommerce-standard": {
    badge: "E-commerce Store",
    headline: "You need a standard e-commerce store",
    ctaLabel: "Ready to scope this properly?",
    ctaButton: "Get in touch",
    builderComparison: "",
  },
  "ecommerce-complex": {
    badge: "Custom E-commerce Build",
    headline: "You need a custom e-commerce build",
    ctaLabel: "Ready to scope this properly?",
    ctaButton: "Get in touch",
    builderComparison: "",
  },
  portfolio: {
    badge: "Portfolio Website",
    headline: "You need a portfolio website",
    ctaLabel: "Want a proper plan for this?",
    ctaButton: "Get in touch",
    builderComparison:
      "Framer and Webflow are both used by professional designers and consultants. Framer has no HTML export - you are fully locked in to their platform and pricing. Webflow allows static site export but not CMS content. For a portfolio where design control matters, a custom build owns the code entirely and has no recurring platform fee beyond hosting.",
  },
  "portfolio-booking": {
    badge: "Portfolio + Booking",
    headline: "You need a portfolio site with booking",
    ctaLabel: "Ready to scope this properly?",
    ctaButton: "Get in touch",
    builderComparison: "",
  },
  "client-portal": {
    badge: "Client Portal",
    headline: "You need a site with a client login area",
    ctaLabel: "Ready to scope this properly?",
    ctaButton: "Get in touch",
    builderComparison:
      "No website builder supports a genuine client portal. Wix, Squarespace, Webflow - none of them provide real authentication, role-based access, or secure file handling at this level. Tools like Lovable can prototype app-level functionality, but they are development platforms, not agency replacements. This scope requires a custom build.",
  },
  nonprofit: {
    badge: "Non-profit Website",
    headline: "You need a professional non-profit website",
    ctaLabel: "Want to talk through what's possible?",
    ctaButton: "Get in touch",
    builderComparison:
      "Most builders do not support donation processing and accessibility compliance together at a professional level. Squarespace has basic donation tools; Wix has limited options. For a public-facing organisation where WCAG accessibility is required and donor trust matters, a professional custom build is the right foundation.",
  },
  generic: {
    badge: "Custom Website",
    headline: "You need a custom website",
    ctaLabel: "Want a proper plan for this?",
    ctaButton: "Get in touch",
    builderComparison:
      "Whether a builder is appropriate depends entirely on what your site needs to do. Wix and Squarespace cover simple needs well but lock you in. Webflow gives more design control with medium lock-in. If your needs involve any custom logic - booking, e-commerce, logins - a builder will eventually force a rebuild.",
  },
};

function addConditional(
  bullets: string[],
  condition: boolean,
  text: string,
): void {
  if (condition) bullets.push(text);
}

function resultBullets(
  path: ResultPath,
  answers: ScopeAnswers,
  country: Country,
): string[] {
  const bullets: string[] = [];

  if (path === "local-showcase") {
    bullets.push("A clean showcase site is the right scope for your needs - no unnecessary complexity");
    bullets.push("No booking system keeps the build focused and the cost predictable");
    addConditional(bullets, answers.updates === "self", "A CMS lets you update your services, photos, and hours without touching code");
    addConditional(bullets, answers.updates === "agency", "Agency-managed updates keep ongoing costs low for a site that rarely changes");
    addConditional(bullets, answers.design === "high-end", "High-end design is fully achievable in this range for a service site");
    addConditional(bullets, answers.design === "professional", "Professional quality is the standard at this scope - credible and clean");
    addConditional(bullets, answers.design === "simple", "A simple, honest site that explains what you do and how to reach you");
  }

  if (path === "local-booking") {
    bullets.push("Booking logic adds real complexity - calendar, availability, notifications, and payment");
    bullets.push("This scope is well-defined and commonly built - a good agency has done it before");
    addConditional(bullets, answers.updates === "self", "A CMS means you manage your content; the booking system handles scheduling");
    addConditional(bullets, answers.updates === "agency", "With the agency managing updates, your team just handles the bookings");
    addConditional(bullets, answers.design === "high-end", "Premium design at this scope is achievable and worth it - first impressions matter for service businesses");
    addConditional(bullets, answers.design === "professional", "Clean, professional design is the right call - it earns trust without over-investing");
  }

  if (path === "local-full") {
    bullets.push("Combining showcase and booking in one build is efficient - one agency, one handover");
    bullets.push("The booking system is the scope driver here - the showcase adds minimal cost");
    addConditional(bullets, answers.updates === "self", "You will be able to update content and manage bookings independently after handover");
    addConditional(bullets, answers.design === "high-end", "High-end design pays back quickly for a service business - it qualifies clients before they even contact you");
    addConditional(bullets, answers.design === "professional", "Professional quality covers everything your clients need to trust you");
  }

  if (path === "ecommerce-standard") {
    bullets.push("Shopify or WooCommerce at this scope is well-tested and fast to launch");
    bullets.push("Cart, checkout, product catalogue, and payment gateway are all covered in this range");
    addConditional(bullets, answers.accounts === "yes", "Customer accounts add order history and returns - a meaningful trust signal for buyers");
    addConditional(bullets, answers.accounts === "no", "Guest checkout keeps the build leaner - you can add accounts later if needed");
    addConditional(bullets, answers.design === "high-end", "Premium store design converts better - a well-designed product page earns its cost back");
    addConditional(bullets, answers.design === "professional", "Clean, professional product presentation is the baseline for a credible store");
    addConditional(bullets, answers.design === "simple", "A simple, functional store gets you selling - you can invest in design once you have revenue data");
  }

  if (path === "ecommerce-complex") {
    bullets.push("Complex catalogues with filters, accounts, and integrations are a different build category");
    bullets.push("ERP or CRM integration, multi-currency, or advanced search significantly increases scope");
    bullets.push("The right agency will spend time in discovery before quoting - that is a good sign, not a delay");
    bullets.push("Cutting budget on a build this complex creates technical debt that is expensive to fix later");
    addConditional(bullets, answers.design === "high-end", "Premium design at this scope is table stakes - complex stores live or die by UX");
  }

  if (path === "portfolio") {
    bullets.push("A portfolio site is well-defined scope - work samples, about, contact, and optionally a blog");
    addConditional(bullets, answers.updates === "self", "A CMS lets you add case studies and update your work without touching code");
    addConditional(bullets, answers.updates === "agency", "If your work rarely changes, agency-managed updates keep cost low");
    addConditional(bullets, answers.design === "high-end", "For a consultant or freelancer, the site IS the pitch - high-end design pays for itself");
    addConditional(bullets, answers.design === "professional", "Professional quality is the right baseline - your site needs to match the quality of your work");
    addConditional(bullets, answers.design === "simple", "Simple and honest - clients hire people, not websites. Content first.");
  }

  if (path === "portfolio-booking") {
    bullets.push("A booking layer turns your portfolio into a sales tool - visitors can book without emailing");
    bullets.push("Calendar logic, availability, and reminders add to scope but are well-understood builds");
    addConditional(bullets, answers.updates === "self", "You manage your content and availability; the booking system handles the scheduling");
    addConditional(bullets, answers.design === "high-end", "Your site qualifies clients before the call - design quality sets the expectation");
    addConditional(bullets, answers.design === "professional", "Professional presentation earns trust before the conversation starts");
  }

  if (path === "client-portal") {
    bullets.push("A client portal requires user authentication, protected pages, and likely file storage or dashboards");
    bullets.push("This is a meaningfully complex build - authentication, security, and access control take real time");
    bullets.push("The right agency will scope this carefully in discovery - do not accept a quote without a detailed spec");
    bullets.push("Security and GDPR compliance are not optional at this scope - budget for them");
    addConditional(bullets, answers.design === "high-end", "For a professional practice, the portal experience IS the product - invest in it");
  }

  if (path === "nonprofit") {
    bullets.push("Non-profit sites often require donation processing, accessible design, and CRM integration - scope adds up fast");
    addConditional(bullets, answers.functionality === "donations", "Payment gateway for donations, recurring giving, and donor acknowledgement are each a real build task");
    addConditional(bullets, answers.functionality === "volunteers", "Application forms, volunteer management, and event calendars each add to scope");
    addConditional(bullets, answers.functionality === "all", "Combining information, donations, and volunteer management is a full build - plan accordingly");
    bullets.push("Accessibility compliance (WCAG) is not optional for a public-facing organisation - budget for it");
    bullets.push("Many non-profits underestimate the scope. A realistic budget upfront prevents a half-built site.");
  }

  if (path === "generic") {
    bullets.push("Your needs don't fit a template - that is fine, but it means careful scoping matters");
    addConditional(bullets, answers.functionality === "booking", "Booking logic adds real complexity - calendar, availability, notifications, and payment");
    addConditional(bullets, answers.functionality === "ecommerce", "E-commerce requires cart, checkout, payment gateway, and product management");
    addConditional(bullets, answers.functionality === "members", "A private login area requires authentication, protected pages, and access control");
    addConditional(bullets, answers.functionality === "showcase", "A showcase site is the most predictable scope - clear, costed, and fast to deliver");
    bullets.push("The right agency starts with a discovery conversation before quoting - that is a good sign");
  }

  if (hasBudgetUndershoot(answers, path, country)) {
    bullets.push("Most builds in this category start above your selected budget - discuss what is realistic before signing");
  }

  return [...new Set(bullets)].slice(0, 3);
}

function moneyRange(country: Country, low: number, high: number): string {
  return `${formatPrice(country, low)} - ${formatPrice(country, high)}`;
}

function monthlyRange(country: Country, low: number, high: number): string {
  return `${moneyRange(country, low, high)}/month`;
}

function monthlyPrice(country: Country, amount: number): string {
  return `${formatPrice(country, amount)}/month`;
}

function builderComparison(path: ResultPath, country: Country): string {
  if (path === "local-full") {
    return `Builders cover showcase + booking at ${monthlyRange(country, 40, 60)}. The lock-in risk is real: Wix and Squarespace cannot be migrated without rebuilding. For a business where the website is a primary sales tool, owning the code is worth the upfront investment.`;
  }

  if (path === "ecommerce-standard") {
    return `Shopify (${monthlyRange(country, 25, 66)}) is a legitimate choice for standard e-commerce - it's the most mature platform at this scale and the ecosystem is deep. The trade-off is ongoing fees plus 0.5-2% transaction fees if you use a third-party payment provider. A custom build makes sense when you need logic Shopify's templates can't support.`;
  }

  if (path === "ecommerce-complex") {
    return `No builder handles this scope reliably. Complex catalogue filtering, custom user accounts, ERP integrations - these require a custom build. Shopify Plus exists for enterprise scale but starts at around ${monthlyPrice(country, 2300)}. At your scope, a custom agency build is the correct path.`;
  }

  if (path === "portfolio-booking") {
    return `Squarespace or Wix covers portfolio + booking at ${monthlyRange(country, 18, 40)}. The lock-in risk: neither exports properly. For a consultant whose site is their primary business tool, owning the code means you can grow, change, or move without rebuilding.`;
  }

  return pathCopy[path].builderComparison;
}

function yearlyCareCost(path: ResultPath, country: Country): string {
  const isPortfolio = path === "portfolio" || path === "portfolio-booking";
  const low = isPortfolio ? 600 : 1200;
  const high = isPortfolio ? 3000 : 6000;
  return `${moneyRange(country, low, high)} / year`;
}

function careCost(path: ResultPath, country: Country, answers: ScopeAnswers): OngoingCost {
  if (answers.updates === "agency") {
    return {
      item: "Agency retainer",
      range: yearlyCareCost(path, country),
    };
  }

  return {
    item: "Maintenance",
    range: `${yearlyCareCost(path, country)} optional`,
  };
}

function baseOngoing(
  path: ResultPath,
  country: Country,
  answers: ScopeAnswers,
): OngoingCost[] {
  return [
    { item: "Hosting", range: `${moneyRange(country, 200, 600)} / year` },
    { item: "Domain", range: `${moneyRange(country, 15, 50)} / year` },
    careCost(path, country, answers),
  ];
}

function bookingCost(country: Country): OngoingCost {
  return {
    item: "Booking software",
    range: `${moneyRange(country, 300, 2400)} / year`,
  };
}

function platformCost(country: Country): OngoingCost {
  return {
    item: "Shopify / platform fee",
    range: `${moneyRange(country, 300, 3500)} / year`,
  };
}

function ongoingCosts(
  path: ResultPath,
  country: Country,
  answers: ScopeAnswers,
): OngoingCost[] {
  const base = baseOngoing(path, country, answers);

  if (path === "local-booking" || path === "local-full" || path === "portfolio-booking") {
    return [base[0], base[1], bookingCost(country), base[2]];
  }
  if (path === "ecommerce-standard") {
    return [base[0], base[1], platformCost(country), gatewayCost, base[2]];
  }
  if (path === "ecommerce-complex") {
    return [
      base[0],
      base[1],
      platformCost(country),
      gatewayCost,
      { item: "ERP / CRM integrations", range: "quoted separately" },
      base[2],
    ];
  }
  if (path === "client-portal") {
    return [
      base[0],
      base[1],
      { item: "Auth provider", range: `${moneyRange(country, 0, 600)} / year` },
      { item: "Storage", range: "quoted separately" },
      { item: "Security / compliance", range: "quoted separately" },
      base[2],
    ];
  }
  if (path === "nonprofit") {
    return [
      base[0],
      base[1],
      { item: "Donation platform fees", range: "2-5% per transaction" },
      { item: "CRM", range: "quoted separately" },
      base[2],
    ];
  }
  return base;
}

function notIncluded(path: ResultPath, country: Country): string[] {
  const items = [
    `Copywriting - what the site says is usually quoted separately. Budget ${moneyRange(country, 500, 3000)} depending on page count.`,
    "Photography and video - stock images are often included; custom shoots are not.",
    "SEO content - the build includes technical SEO setup. Ongoing content strategy and articles are separate.",
  ];

  if (path === "local-booking" || path === "local-full" || path === "portfolio-booking") {
    items.push("Booking software subscription - the integration is built in, the monthly platform fee is ongoing.");
  }
  if (path === "ecommerce-standard" || path === "ecommerce-complex") {
    items.push("Product photography - agencies build the catalogue structure; filling it with real photos is your responsibility.");
  }
  if (path === "client-portal") {
    items.push("Security audit - for portals handling sensitive data, a third-party security review is strongly recommended and rarely included in the build quote.");
  }
  if (path === "nonprofit") {
    items.push("Donation platform fees - most processors charge 2-5% per transaction. Budget for this before choosing a provider.");
  }

  return items.slice(0, 4);
}

export function getResultCopy(
  path: ResultPath,
  answers: ScopeAnswers,
  country: Country,
): ResultCopy {
  return {
    ...pathCopy[path],
    builderComparison: builderComparison(path, country),
    bullets: resultBullets(path, answers, country),
    ongoingCosts: ongoingCosts(path, country, answers),
    notIncluded: notIncluded(path, country),
  };
}
