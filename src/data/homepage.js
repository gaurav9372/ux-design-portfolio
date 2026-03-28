const PLACEHOLDER = "/images/image-missing.png";

export const homepageContent = {
  nav: {
    links: ["About me", "Contact", "Blogs"],
    cta: "Projects",
    mobileLinks: ["About me", "Contact", "Blogs", "Projects"]
  },
  hero: {
    bgWords: ["UX", "Designer"],
    helloPrefix: "Hello there, I am ",
    helloName: "Shreyansh Gaurav.",
    titlePrefix: "I Design ",
    titleAccent: "Solutions."
  },
  about: {
    heading: "A passion for screens and helping people",
    body: "I'm a UX Designer who turns complex problems into intuitive, user-first experiences. With a background in visual design and a deep curiosity for how people interact with screens, I bridge the gap between what users need and what businesses want. Every pixel I place is backed by research, empathy, and a relentless focus on usability."
  },
  stats: [
    { number: "40+", label: "Projects I worked on." },
    { number: "14+", label: "Years of scrolling web" },
    { number: "5+", label: "Happy clients" },
    { number: "2,050+", label: "Apps installed" },
    { number: "3X", label: "Speed with my ADHD" },
    { number: "100+", label: "Screens designed" }
  ],
  ux: {
    bgText: "User Experience",
    heading: "UX Design fuels my ADHD and I love it.",
    desc: "I thrive at the intersection of user needs, business goals, and technical feasibility. My process starts with listening \u2014 understanding the people who will use the product \u2014 and ends with designs that feel effortless. From research to wireframes to polished interfaces, I own the full design journey.",
    tags: {
      client: { label: "Client", sub: "Critic" },
      users: { label: "Users", sub: "Judge" },
      company: { label: "Company", sub: "Challenger" }
    }
  },
  projects: {
    heading: "My Projects",
    desc: "A selection of projects where I helped brands and startups design experiences that convert, retain, and delight. Each project is a story of constraints, collaboration, and user-centered thinking."
  },
  caseStudies: [
    {
      title: "Care Naturals",
      subtitle: "Natural skincare brand with a clean, organic product line",
      bottom: "Designed a clean e-commerce experience for organic skincare products."
    },
    {
      title: "United Rubber",
      subtitle: "B2B industrial manufacturer serving global OEMs",
      bottom: "Helped URI connect with high-value buyers through clear positioning and UX.",
      cta: "Case Study"
    },
    {
      title: "AdsCult",
      subtitle: "Digital marketing agency \u2014 brand identity and web experience",
      bottom: "Built a conversion-focused website that communicates trust and expertise at first glance."
    },
    {
      title: "FinFlow",
      subtitle: "Fintech startup \u2014 mobile banking experience",
      bottom: "Redesigned the onboarding flow, reducing drop-off by 35% and improving first-transaction time."
    },
    {
      title: "MediTrack",
      subtitle: "Healthcare SaaS \u2014 patient management dashboard",
      bottom: "Simplified a complex data dashboard into an intuitive interface used daily by 200+ clinics."
    },
    {
      title: "Flavor Street",
      subtitle: "Food delivery app \u2014 end-to-end mobile UX",
      bottom: "Designed a seamless ordering experience from discovery to checkout with real-time tracking."
    },
    {
      title: "EduSpark",
      subtitle: "EdTech platform \u2014 learning experience for K-12",
      bottom: "Created an engaging, gamified learning interface that increased student retention by 40%."
    }
  ],
  caseFooter: {
    left: "Every project starts with a question: what does the user actually need? I work backwards from that answer to build experiences that feel natural.",
    right: "View all"
  },
  testimonials: {
    heading: "What everyone is saying",
    bgline: "Real people, real feedback",
    items: [
      { quote: "\"Shreyansh brought clarity to our product vision from day one.\"", name: "Rahul Raj", role: "Developer", avatar: PLACEHOLDER },
      { quote: "\"The flow felt effortless and the layout reads clean on every screen.\"", name: "Aditi Sharma", role: "Product Designer", avatar: PLACEHOLDER },
      { quote: "\"Clear structure, fast decisions, and a sharp visual story.\"", name: "Neel Verma", role: "Founder", avatar: PLACEHOLDER },
      { quote: "\"The UX choices improved comprehension without adding noise.\"", name: "Priya Singh", role: "UX Lead", avatar: PLACEHOLDER },
      { quote: "\"Every screen feels intentional. The hierarchy is spot on.\"", name: "Karan Mehta", role: "PM", avatar: PLACEHOLDER },
      { quote: "\"The experience is calm, structured, and easy to navigate.\"", name: "Rhea Patel", role: "Researcher", avatar: PLACEHOLDER },
      { quote: "\"Strong visual rhythm with just the right amount of contrast.\"", name: "Arjun Nair", role: "Engineer", avatar: PLACEHOLDER }
    ]
  },
  gallery: {
    heading: "\"Your job is not to make the app amazing. Your job is to make the user awesome.\"",
    author: "Kathy Sierra",
    smallQuote: "\"Design is not just what it looks like. Design is how it works.\" \u2014 Steve Jobs"
  },
  footer: {
    location: ["Varanasi,", "india"],
    contactTitle: "Contact me",
    email: "Gauravguptasggs@gmail.com",
    desc: "Open to freelance projects, full-time roles, and collaborations. If you're building something that puts users first, let's talk.",
    navLinks: ["About me", "Contact", "Projects", "Blogs"]
  }
};

export const defaultImages = {
  brandImg: PLACEHOLDER,
  aboutLogo: PLACEHOLDER,
  arrowImg: "/images/icons/arrow-button.svg",
  heroOrn: PLACEHOLDER,
  heroPhoto: "/images/my-photo.png",

  statIcon1: PLACEHOLDER, statIcon2: PLACEHOLDER, statIcon3: PLACEHOLDER,
  statIcon4: PLACEHOLDER, statIcon5: PLACEHOLDER, statIcon6: PLACEHOLDER,

  c1: PLACEHOLDER, c2: PLACEHOLDER, c3: PLACEHOLDER,
  c4: PLACEHOLDER, c5: PLACEHOLDER, c6: PLACEHOLDER,
  uxRings: "/images/ux-dual-rings-center.svg",
  uxRingClient: "/images/ux-smaller-ring.svg",
  uxRingCompany: "/images/ux-smaller-ring.svg",

  logo1: PLACEHOLDER, logo2: PLACEHOLDER, logo3: PLACEHOLDER,
  logo4: PLACEHOLDER, logo5: PLACEHOLDER, logo6: PLACEHOLDER, logo7: PLACEHOLDER,

  pill1: PLACEHOLDER, pill2: PLACEHOLDER, pill3: PLACEHOLDER, pill4: PLACEHOLDER,
  pill5: PLACEHOLDER, pill6: PLACEHOLDER, pill7: PLACEHOLDER, pill8: PLACEHOLDER,

  caseIconA: PLACEHOLDER, caseIconB: PLACEHOLDER, caseIconC: PLACEHOLDER,
  caseArrow: PLACEHOLDER,

  footerOrn: PLACEHOLDER,
  g1: PLACEHOLDER, g2: PLACEHOLDER, g3: PLACEHOLDER, g4: PLACEHOLDER,
  g5: PLACEHOLDER, g6: PLACEHOLDER, g7: PLACEHOLDER, g8: PLACEHOLDER
};
