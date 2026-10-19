import agencyImage from "../../assets/images/industry-agencies.png";
import clinicImage from "../../assets/images/industry-clinics.png";
import homeServicesImage from "../../assets/images/industry-home-services.png";
import lawImage from "../../assets/images/industry-law-firms.png";

export const capabilityMarquee = [
  "Natural conversations",
  "Appointment booking",
  "Lead qualification",
  "Live call transfer",
  "24/7 coverage",
  "Multiple languages",
  "Call summaries",
];

export const featureCards = [
  {
    key: "intelligence",
    title: "Understands what callers actually need",
    description:
      "Jubala identifies intent, urgency, frustration, and follow-up needs so the right conversation reaches the right workflow.",
  },
  {
    key: "booking",
    title: "Books while you work",
    description:
      "Schedule, reschedule, and cancel appointments against the rules and availability you define.",
  },
  {
    key: "coverage",
    title: "Ready at 2:13 AM",
    description:
      "Peak hours, busy lines, nights, and weekends all receive the same composed response.",
  },
  {
    key: "configuration",
    title: "Trained around your business",
    description:
      "Services, pricing, FAQs, hours, tone, qualification questions, and escalation rules are configured for you.",
  },
  {
    key: "actions",
    title: "Turns conversation into completed work",
    description:
      "Every call can create a lead, book a time, send a confirmation, transfer to staff, and leave a useful summary.",
  },
];

export const workflowSteps = [
  {
    step: "Sign up",
    title: "Create your workspace",
    description:
      "Start with your business email. No phone setup, contracts, or technical configuration required.",
  },
  {
    step: "Share your business",
    title: "Give Jubala the context",
    description:
      "Add your website and operating details. Jubala learns your services, tone, FAQs, hours, and caller workflows.",
  },
  {
    step: "Test it free",
    title: "Call your agent in the browser",
    description:
      "Run real conversations, try difficult questions, and refine the voice before a customer ever hears it.",
  },
  {
    step: "Choose a plan",
    title: "Match your call volume",
    description:
      "Pick the included minutes that fit today. Upgrade as your business and call traffic grow.",
  },
  {
    step: "Go live",
    title: "Connect a business number",
    description:
      "Route calls to Jubala and stay in control with recordings, transcripts, summaries, and human transfers.",
  },
];

export const industries = [
  {
    name: "Law firms",
    headline: "Intake without the voicemail delay",
    description:
      "Capture new-matter details, qualify case types, book consultations, and route urgent calls to attorneys or staff.",
    bullets: ["New client intake", "Case qualification", "After-hours lead capture"],
    image: lawImage,
  },
  {
    name: "Clinics & med spas",
    headline: "A calmer front desk, around the clock",
    description:
      "Answer patient questions, book or reschedule appointments, collect intake details, and send confirmations.",
    bullets: ["Appointment coordination", "Office FAQs", "Provider routing"],
    image: clinicImage,
  },
  {
    name: "Home services",
    headline: "Every job request reaches the team",
    description:
      "Capture job details, qualify service requests, schedule estimates, and escalate urgent calls while crews are in the field.",
    bullets: ["Job qualification", "Estimate scheduling", "Urgent routing"],
    image: homeServicesImage,
  },
  {
    name: "Agencies & advisors",
    headline: "Faster follow-up on high-intent leads",
    description:
      "Qualify enquiries in your brand voice, answer service questions, and send each opportunity to the right owner.",
    bullets: ["Lead qualification", "Consultation booking", "CRM-ready summaries"],
    image: agencyImage,
  },
];

export const plans = [
  {
    name: "Starter",
    price: "$99",
    minutes: "500 minutes included",
    description: "Dependable call coverage for a small practice or focused team.",
    features: [
      "AI voice agent for inbound calls",
      "Appointment booking and routing",
      "Call summaries and transcripts",
      "Custom setup available",
    ],
    cta: "Start with Starter",
  },
  {
    name: "Essential",
    price: "$199",
    minutes: "1,000 minutes included",
    description: "More follow-up and support for a growing professional-services team.",
    features: [
      "Everything in Starter",
      "SMS and email follow-ups",
      "Priority support",
      "Custom setup available",
    ],
    cta: "Choose Essential",
  },
  {
    name: "Professional",
    price: "$299",
    minutes: "2,000 minutes included",
    description: "Advanced workflows for a busy, multi-service operation.",
    features: [
      "Everything in Essential",
      "Multi-workflow automation",
      "Advanced call routing rules",
      "Dedicated onboarding support",
    ],
    cta: "Choose Professional",
    featured: true,
  },
  {
    name: "Custom",
    price: "Custom",
    minutes: "Custom minute package",
    description: "Tailored capacity, integrations, and reporting for complex teams.",
    features: [
      "Custom workflows and scripts",
      "Custom integrations and automations",
      "Custom routing and analytics",
      "Dedicated account support",
    ],
    cta: "Talk to our team",
  },
];

export const faqs = [
  {
    question: "What is the Jubala AI Voice Agent?",
    answer:
      "Jubala is a customized AI receptionist that answers inbound calls in a natural voice, handles questions, captures leads, books appointments, and transfers callers according to your business rules.",
  },
  {
    question: "How does Jubala manage bookings automatically?",
    answer:
      "Your agent follows the services, availability, booking rules, and calendar connections configured for your business. It can book, reschedule, or cancel while keeping the caller informed.",
  },
  {
    question: "Can Jubala handle multiple callers at once?",
    answer:
      "Yes. Jubala can manage simultaneous conversations, so a busy line does not force a high-intent caller into voicemail.",
  },
  {
    question: "Does Jubala work for different industries?",
    answer:
      "Yes. Each agent is configured around the vocabulary, qualification logic, FAQs, escalation rules, and workflows of its business.",
  },
  {
    question: "Is technical setup required to start using Jubala?",
    answer:
      "No. Share your website and business details, then test the agent through free browser calls. The Jubala team handles agent configuration and phone setup.",
  },
  {
    question: "What happens after each call?",
    answer:
      "Your dashboard keeps the recording, transcript, structured summary, caller details, and any booking or lead information captured during the conversation.",
  },
];

export const contactDetails = {
  phoneDisplay: "516-967-8065",
  phoneHref: "tel:+15169678065",
  email: "info@finitysystems.com",
};
