import type {
  NavBarLink,
  SocialLink,
  Identity,
  AboutPageContent,
  ProjectPageContent,
  BlogPageContent,
  HomePageContent,
  WorkPageContent,
  ReadingItem,
} from "./types/config";

export const identity: Identity = {
  name: "Zayneb Cherif",
  logo: "/photo.png",
  email: "zaynebcheriff@gmail.com",
};

export const navBarLinks: NavBarLink[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Work",
    url: "/work",
  },
  {
    title: "Projects",
    url: "/projects",
  },
{
    title: "Mind",
    url: "/mind",
  },
  {
    title: "Bookshelf",
    url: "/books",
  },
];

export const socialLinks: SocialLink[] = [
  {
    title: "GitHub",
    url: "https://github.com/zcher-20",
    icon: "mdi:github",
    external: true,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/zayneb-cherif-830294251/",
    icon: "mdi:linkedin",
    external: true,
  },
  {
    title: "Mail",
    url: "mailto:zaynebcheriff@gmail.com",
    icon: "mdi:email",
    external: true,
  },
];

// Home (/)
export const homePageContent: HomePageContent = {
  seo: {
    title: "Zayneb Cherif",
    description:
      "Columbia CS & Design student building at the intersection of AI research and thoughtful software.",
    image: identity.logo,
  },
  role: "CS & Design @ Columbia | AI Researcher & Developer",
  description:
    "I'm Zayneb Cherif, a Computer Science & Design student at Columbia University. I build AI systems, publish ML research, and design interfaces that make complex things feel simple.",
  socialLinks: socialLinks,
  links: [
    {
      title: "Projects",
      url: "/projects",
    },
    {
      title: "Bookshelf",
      url: "/books",
    },
    {
      title: "Mind",
      url: "/mind",
    },
  ],
  currentlyReading: [
    {
      title: "East of Eden",
      author: "John Steinbeck",
    },
    {
      title: "The Goldfinch",
      author: "Donna Tartt",
    },
    {
      title: "Just Kids",
      author: "Patti Smith",
    },
  ],
};

// About (/about)
export const aboutPageContent: AboutPageContent = {
  seo: {
    title: "About | Zayneb Cherif",
    description:
      "Columbia CS & Design student building at the intersection of AI research and thoughtful software.",
    image: identity.logo,
  },
  subtitle: "",
  about: {
    description: `
I'm Zayneb Cherif, a B.A. Computer Science & Design student at Columbia University (Class of 2028), previously at NYU. I work at the intersection of AI research, full-stack engineering, and human-centered design.

&nbsp;

My research spans analog in-memory computing, RAG systems, agentic AI pipelines, and quantum-classical ML — with publications at ICLR 2024 (Notable) and IJCAI 2024. On the engineering side I build everything from FastAPI backends and LLM applications to multimodal AI civic platforms.

&nbsp;

I speak English, Arabic, Italian, and Spanish, and I'm driven by the belief that the best technology is both rigorous and humane.

&nbsp;

Recognized at ICLR 2024 (Notable), IBM/IEEE AICS 2023, Best Research Award at the University of Sharjah, Genius Olympiad Finalist, and WESEF Finalist.

&nbsp;

<a href="/work" style="font-weight: bold; text-decoration: none; color: inherit;">Learn more →</a>
`,
    image_l: {
      url: "/openai.webp",
      alt: "OpenAI",
      link: "https://openai.com",
    },
    image_r: {
      url: "/ibm.webp",
      alt: "IBM Research",
      link: "https://research.ibm.com",
    },
  },
  connect: {
    description: `You can reach out to me at <a href="mailto:zaynebcheriff@gmail.com" style="font-weight: bold; text-decoration: none; color: inherit;">zaynebcheriff@gmail.com</a>.`,
    links: [],
  },
};

// Projects (/projects)
export const projectsPageContent: ProjectPageContent = {
  seo: {
    title: "Projects | Zayneb Cherif",
    description: "AI research, full-stack apps, and systems that push the edge.",
    image: identity.logo,
  },
  subtitle: "AI research, full-stack apps, and systems that push the edge.",
  projects: [
    {
      title: "Multi-Agent Investment Research System",
      description:
        "5-agent LLM pipeline on Azure AI Foundry — Research, Financial Analysis, Risk, News, and Memo agents producing a full investment thesis from a single stock ticker. Microsoft Agents League Hackathon.",
      image: "/project-investment.jpg",
      url: "https://github.com/zcher-20",
    },
    {
      title: "RICER — AI Forest Fire Risk Prediction",
      description:
        "ML models for wildfire risk assessment in Morocco using satellite imagery, GIS, and Earth Observation data. Built with Al Akhawayn University Digital Innovation Lab.",
      image: "/project-ricer.jpg",
      url: "https://github.com/zcher-20",
    },
    {
      title: "Hybrid Quantum-Classical Medical Image Segmentation",
      description:
        "Hybrid quantum-classical U-Net replacing the CNN bottleneck with a 4-qubit PennyLane variational circuit. 95% IoU at 60% fewer parameters (2M vs 5M). NYU Abu Dhabi Hackathon — Quantum Track.",
      image: "/project-quantum.jpg",
      url: "https://github.com/zcher-20",
    },
    {
      title: "Analog In-Memory Computing with Uncertainty Quantification for Edge Medical Imaging",
      description:
        "Published at ICLR 2024 (Notable). Designed and benchmarked a deep learning inference pipeline on IBM analog in-memory computing hardware for medical image segmentation at the edge, with uncertainty quantification methods to measure prediction reliability.",
      image: "/project-aimc.jpg",
      year: "2024",
      url: "https://arxiv.org/search/?searchtype=author&query=Cherif+Z",
    },
    {
      title: "Medical Neural Architecture Search: Survey and Taxonomy",
      description:
        "Published at IJCAI 2024, pp. 7932–7940. Co-authored a comprehensive survey and taxonomy of Neural Architecture Search methods in medical imaging, systematically categorizing 100+ papers. Presented to 200+ researchers at IBM/IEEE AICS 2023.",
      image: "/project-survey.jpg",
      year: "2024",
      url: "https://www.ijcai.org/proceedings/2024/877",
    },
  ],
};

// Work (/work)
export const workPageContent: WorkPageContent = {
  seo: {
    title: "Work | Zayneb Cherif",
    description: "My experience across AI research labs, startups, and enterprise teams.",
    image: identity.logo,
  },
  subtitle: "My professional journey and work experience.",
  description: `I've worked across AI research labs, startups, and enterprise teams — building systems that range from analog hardware benchmarks to production RAG pipelines.`,
  items: [
    {
      title: "AI Model Trainer — Codex / Project Vox",
      company: {
        name: "OpenAI",
        image: "/openai.webp",
        url: "https://openai.com",
      },
      date: "Jun 2026 - Present",
      description:
        "Training Codex by crafting targeted prompts and adversarial edge-case sets; providing structured feedback to improve code generation, reasoning, and instruction-following capabilities.",
    },
    {
      title: "Advanced AI Extern",
      company: {
        name: "Pfizer",
        image: "/pfizer.svg",
        url: "https://pfizer.com",
      },
      date: "Jun 2026 - Present",
      description:
        "Building intelligent document processing pipelines with Python and layout-aware OCR; developing RAG systems for enterprise document search; prototyping an internal AI chatbot using Gradio.",
    },
    {
      title: "Agentic AI & ML Intern",
      company: {
        name: "MIT-Incubated Stealth AI Startup",
        image: "/startup.webp",
        url: "#",
      },
      date: "Jun - Aug 2026",
      description:
        "Building RAG pipelines with FAISS, LangChain, and LlamaIndex; developing FastAPI backend services for document ingestion and semantic search across SharePoint and SQL data sources.",
    },
    {
      title: "AI / ML Research Intern",
      company: {
        name: "Al Akhawayn University",
        image: "/akhawayn.png",
        url: "https://www.aui.ma",
      },
      date: "Jul 2026",
      description:
        "Conducting AI/ML research as part of a competitive remote internship, applying machine learning methods to structured research problems under faculty supervision.",
    },
    {
      title: "Career Fellow — Tech / SWE Track",
      company: {
        name: "SEO (Sponsors for Educational Opportunity)",
        image: "/seo.jpg",
        url: "https://seofellows.org",
      },
      date: "2026 - Present",
      description:
        "Selected for SEO's competitive Career Fellowship; receiving mentorship, technical interview preparation, and recruiting support targeting top-tier SWE roles.",
    },
    {
      title: "Director of Development",
      company: {
        name: "Columbia General Studies Business Society",
        image: "/columbia.webp",
        url: "https://www.columbia.edu",
      },
      date: "Feb 2026 - Present",
      description:
        "Lead growth initiatives to expand engagement; built alumni and external partner pipeline for sponsorships and events.",
    },
    {
      title: "Student Researcher — HCI & Wearable Systems",
      company: {
        name: "Cornell University — Hybrid Body Lab",
        image: "/cornell.webp",
        url: "https://cornell.edu",
      },
      date: "Mar 2026",
      description:
        "Prototyped modular flexible PCB wearables for continuous physiological monitoring, applying embedded hardware and HCI design principles to on-body interaction applications.",
    },
    {
      title: "Data Analytics Research Intern",
      company: {
        name: "New York University",
        image: "/nyu.webp",
        url: "https://nyu.edu",
      },
      date: "Oct - Dec 2025",
      description:
        "Built end-to-end ML classification pipelines in scikit-learn processing 500K+ records; applied STL time-series decomposition to denoise sensor signals and improve downstream model F1 score.",
    },
    {
      title: "AI Analytics Researcher",
      company: {
        name: "IBM Research",
        image: "/ibm.webp",
        url: "https://research.ibm.com",
      },
      date: "Sep 2023 - May 2024",
      description:
        "Co-authored 2 peer-reviewed papers (ICLR 2024 Notable, IJCAI 2024); benchmarked ResNet and U-Net inference on IBM analog in-memory computing chips across 6 hardware configurations.",
    },
    {
      title: "Mind Brain Behavior Mentorship",
      company: {
        name: "Harvard University",
        image: "/harvard.svg",
        url: "https://mbb.harvard.edu",
      },
      date: "Sep 2021 - Jun 2023",
      description:
        "Apprenticeship under the Mind Brain Behavior Interfaculty Initiative; conducted research bridging neuroscience and behavioral science under faculty mentorship.",
    },
    {
      title: "Research Analyst",
      company: {
        name: "Boston Children's Hospital",
        image: "/bch.webp",
        url: "https://research.childrenshospital.org",
      },
      date: "Sep 2021 - May 2023",
      description:
        "Analyzed behavioral and clinical datasets at the Arnett Lab; cleaned and validated study records; independently authored a research paper under faculty mentorship.",
    },
  ],
};
// Blog (/blog)
export const blogPageContent: BlogPageContent = {
  seo: {
    title: "Blog | Zayneb Cherif",
    description: "Thoughts on AI, research, design, and building things.",
    image: identity.logo,
  },
  subtitle: "Thoughts on AI, research, design, and building things.",
};
