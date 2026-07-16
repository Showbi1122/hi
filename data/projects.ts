export type ProjectCaseField = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  industry: string;
  image: string;
  imageAlt: string;
  caseStudy: ProjectCaseField[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "modal-portfolio",
    slug: "azul-driving-school",
    title: "Azul Driving School Website",
    description:
      "A driving school that needed to look legitimate online and get found on mobile search.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    industry: "Education",
    image: "/assets/projects/azul-600.webp",
    imageAlt:
      "Azul driving school business website — custom web development by Malik Taleeb Shahbaz",
    caseStudy: [
      {
        label: "Problem",
        value:
          "The driving school had no professional web presence and was losing students to competitors with better online visibility.",
      },
      {
        label: "Solution",
        value:
          "A clean, mobile-first website with clear course information, contact CTAs, and fast load times.",
      },
      {
        label: "Business Impact",
        value:
          "Improved credibility and easier discovery for local students searching on mobile devices.",
      },
      { label: "Industry", value: "Education" },
    ],
  },
  {
    id: "modal-task-manager",
    slug: "peace-college",
    title: "The Peace College Website",
    description:
      "Multi-campus college, parents couldn't find campus info without calling around.",
    tags: ["Bootstrap", "JavaScript", "Responsive"],
    industry: "Education",
    image: "/assets/projects/peace-600.webp",
    imageAlt:
      "The Peace College education website — responsive web development and school management site",
    caseStudy: [
      {
        label: "Problem",
        value:
          "Parents struggled to find campus details, admissions info, and contact paths across multiple locations.",
      },
      {
        label: "Solution",
        value:
          "Structured multi-page site with Bootstrap grid, clear navigation, and mobile-optimized content layout.",
      },
      {
        label: "Features",
        value:
          "Campus sections, program highlights, responsive design, contact integration.",
      },
      { label: "Industry", value: "Education" },
    ],
  },
  {
    id: "modal-landing-page",
    slug: "portfolio-website",
    title: "Portfolio Website Development",
    description:
      "Portfolio site for a freelancer who needed to stand out from template-looking competitors.",
    tags: ["HTML5", "CSS3", "Bootstrap"],
    industry: "Creative / Professional Services",
    image: "/assets/projects/port-folio-600.webp",
    imageAlt:
      "Custom portfolio website development project screenshot",
    caseStudy: [
      {
        label: "Problem",
        value:
          "Freelancers need portfolios that convert visitors into clients, and generic templates fail to differentiate.",
      },
      {
        label: "Solution",
        value:
          "Bespoke portfolio with project showcases, smooth interactions, and professional visual hierarchy.",
      },
      {
        label: "Results",
        value:
          "Stronger first impression for client inquiries and improved personal brand positioning.",
      },
      { label: "Industry", value: "Creative / Professional Services" },
    ],
  },
  {
    id: "modal-weather-dashboard",
    slug: "weather-dashboard",
    title: "Weather Dashboard Web App",
    description:
      "Weather dashboard pulling live API data, a compact demo of frontend work with Vue.js.",
    tags: ["Vue.js", "Tailwind", "REST API"],
    industry: "SaaS / Utility Application",
    image: "/assets/projects/weather-600.webp",
    imageAlt:
      "Vue.js weather dashboard — frontend software development with REST API integration",
    caseStudy: [
      {
        label: "Problem",
        value:
          "Users need quick, visual weather data without cluttered interfaces or slow loads.",
      },
      {
        label: "Solution",
        value:
          "Vue.js SPA with real-time API integration, Tailwind styling, and responsive component architecture.",
      },
      {
        label: "Technologies",
        value:
          "Vue.js, JavaScript, Tailwind CSS, external weather API, async data fetching.",
      },
      { label: "Industry", value: "SaaS / Utility Application" },
    ],
  },
];
