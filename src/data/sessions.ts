export interface Session {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  instructor: string;
  date: string;
  time: string;
  price: number;
}

export const SESSIONS_DATA: Session[] = [
  {
    id: 1,
    title: "AI Foundations",
    shortDescription: "Understand the core concepts of AI and machine learning.",
    fullDescription: "This introductory session is perfect for beginners. We'll explore the history of AI, demystify terms like 'machine learning' and 'neural networks', and discuss real-world applications that are changing our lives. No prior experience required.",
    instructor: "Dr. Ada Lovelace",
    date: "October 15, 2025",
    time: "10:00 AM - 12:00 PM",
    price: 49.99
  },
  {
    id: 2,
    title: "Creative AI Workshop",
    shortDescription: "Learn how AI can be a partner in your creative process.",
    fullDescription: "Unleash your creativity with AI tools. In this hands-on workshop, you'll learn to generate art, write poetry, and compose music with the help of advanced AI models. We will cover prompt engineering and how to co-create with technology.",
    instructor: "Leo da Vinci",
    date: "October 18, 2025",
    time: "2:00 PM - 5:00 PM",
    price: 79.99
  },
  {
    id: 3,
    title: "AI for Business Leaders",
    shortDescription: "Strategize how to implement AI in your organization.",
    fullDescription: "This executive-level session focuses on strategy and implementation. Discover how to identify opportunities for AI integration, manage AI projects, and understand the ethical considerations for deploying AI in a business environment.",
    instructor: "Grace Hopper",
    date: "October 22, 2025",
    time: "9:00 AM - 1:00 PM",
    price: 199.99
  }
];
