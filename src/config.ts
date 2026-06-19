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
  { title: "About", url: "/" },
  { title: "Design", url: "/design" },
  { title: "Photography", url: "/photography" },
];

export const socialLinks: SocialLink[] = [
  { title: "GitHub", url: "https://github.com/zcher-20", icon: "mdi:github", external: true },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/zayneb-cherif-830294251/", icon: "mdi:linkedin", external: true },
  { title: "Mail", url: "mailto:zaynebcheriff@gmail.com", icon: "mdi:email", external: true },
];

// Home (/)
export const homePageContent: HomePageContent = {
  seo: {
    title: "Zayneb Cherif",
    description: "Columbia CS & Design student building at the intersection of AI research and thoughtful software.",
    image: identity.logo,
  },
  role: "CS & Design @ Columbia | AI Researcher & Developer",
  description: "I'm Zayneb Cherif, a Computer Science & Design student at Columbia University. I build AI systems, publish ML research, and design interfaces that make complex things feel simple.",
  socialLinks: socialLinks,
  links: [
    { title: "Projects", url: "/projects" },
    { title: "Bookshelf", url: "/books" },
    { title: "Mind", url: "/mind" },
  ],
  currentlyReading: [
    { title: "East of Eden", author: "John Steinbeck" },
    { title: "The Goldfinch", author: "Donna Tartt" },
    { title: "Just Kids", author: "Patti Smith" },
  ],
};

// About (/about)
export const aboutPageContent: AboutPageContent = {
  seo: {
    title: "About | Zayneb Cherif",
    description: "Columbia CS & Design student building at the intersection of AI research and thoughtful software.",
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
    image_l: { url: "/openai.webp", alt: "OpenAI", link: "https://openai.com" },
    image_r: { url: "/ibm.webp", alt: "IBM Research", link: "https://research.ibm.com" },
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
      description: "5-agent LLM pipeline on Azure AI Foundry — Research, Financial Analysis, Risk, News, and Memo agents producing a full investment thesis from a single stock ticker. Microsoft Agents League Hackathon.",
      image: "/project-investment.jpg",
      url: "https://github.com/zcher-20/Alpha-Research-Agent-",
      featured: true,
      venue: "Microsoft Agents League Hackathon",
      tags: ["Multi-Agent", "Azure AI Foundry", "LLMs", "Python"],
      skills: ["Multi-Agent Systems", "Azure AI Foundry", "LLMs", "Python"],
      learnings: "Built the agent workflow, committee logic, and final synthesis layer.",
      focus: ["Agent orchestration", "Financial reasoning", "Evaluation + synthesis"],
    },
    {
      title: "RICER — AI Forest Fire Risk Prediction",
      description: "ML models for wildfire risk assessment in Morocco using satellite imagery, GIS, and Earth Observation data. Built with Al Akhawayn University Digital Innovation Lab.",
      image: "/project-ricer.jpg",
      url: "https://github.com/zcher-20/wildfire_data_pipeline",
      featured: true,
      venue: "Al Akhawayn University Digital Innovation Lab",
      tags: ["Computer Vision", "Earth Observation", "GIS", "Python"],
      skills: ["Computer Vision", "GIS", "Remote Sensing", "Python"],
      learnings: "Built the satellite fusion pipeline and risk prediction models from scratch.",
      focus: ["Satellite data pipelines", "Risk modeling", "GIS integration"],
    },
    {
      title: "SkinKit — On-Skin Interface Prototyping",
      description: "Modular toolkit for prototyping on-skin interfaces using flexible PCB modules assembled directly on the body. Built with Cornell University's Hybrid Body Lab, spanning applications from health monitoring to expressive on-body fashion.",
      image: "/project-skinkit.jpg",
      url: "https://www.hybridbody.human.cornell.edu/#/skinkit/",
      featured: true,
      venue: "Cornell University — Hybrid Body Lab",
      tags: ["Wearables", "HCI", "Flexible PCB", "On-Skin Design"],
      skills: ["Wearable Systems", "HCI", "Flexible PCB", "Prototyping"],
      learnings: "Transformed miniaturized circuit boards into customizable, body-integrated wearables through hands-on prototyping.",
      focus: ["On-skin interaction", "Modular hardware", "Body-integrated design"],
    },
    {
      title: "Hybrid Quantum-Classical Medical Image Segmentation",
      description: "Hybrid quantum-classical U-Net replacing the CNN bottleneck with a 4-qubit PennyLane variational circuit. 95% IoU at 60% fewer parameters (2M vs 5M). NYU Abu Dhabi Hackathon — Quantum Track.",
      image: "/project-quantum.jpg",
      url: "https://github.com/zcher-20/SihaSansFrontieres",
      featured: true,
      venue: "NYU Abu Dhabi Hackathon — Quantum Track",
      tags: ["Quantum ML", "PennyLane", "Medical Imaging", "PyTorch"],
      skills: ["Quantum ML", "PennyLane", "PyTorch", "U-Net"],
      learnings: "Designed the quantum bottleneck circuit and ran all parameter-efficiency experiments.",
      focus: ["Quantum circuit design", "Model compression", "Medical segmentation"],
    },
    {
      title: "Analog In-Memory Computing with Uncertainty Quantification for Edge Medical Imaging",
      description: "Published at ICLR 2024 (Notable). Designed and benchmarked a deep learning inference pipeline on IBM analog in-memory computing hardware for medical image segmentation at the edge, with uncertainty quantification methods to measure prediction reliability.",
      image: "/project-aimc.jpg",
      year: "2024",
      url: "https://openreview.net/forum?id=hvp5I4dDya",
      isPublication: true,
      venue: "ICLR 2024 · Notable Paper",
      tags: ["IBM Research", "Analog Computing", "Medical Imaging", "Uncertainty Quantification"],
      skills: ["Analog Hardware", "Deep Learning", "Edge AI", "Uncertainty Quantification"],
      learnings: "Ran all hardware benchmarks and implemented the uncertainty quantification pipeline.",
      focus: ["Hardware benchmarking", "Uncertainty methods", "Edge deployment"],
    },
    {
      title: "Medical Neural Architecture Search: Survey and Taxonomy",
      description: "Published at IJCAI 2024, pp. 7932–7940. Co-authored a comprehensive survey and taxonomy of Neural Architecture Search methods in medical imaging, systematically categorizing 100+ papers. Presented to 200+ researchers at IBM/IEEE AICS 2023.",
      image: "/project-survey.jpg",
      year: "2024",
      url: "https://www.ijcai.org/proceedings/2024/878",
      isPublication: true,
      venue: "IJCAI 2024 · pp. 7932–7940",
      tags: ["Neural Architecture Search", "Medical Imaging", "Survey", "IBM Research"],
      skills: ["Neural Architecture Search", "Systematic Review", "Medical Imaging"],
      learnings: "Categorized 100+ papers and designed the full taxonomy structure.",
      focus: ["Literature synthesis", "Taxonomy design", "Cross-paper analysis"],
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
      company: { name: "OpenAI", image: "/openai.webp", url: "https://openai.com" },
      date: "Jun 2026 - Present",
      description: "Training Codex by crafting targeted prompts and adversarial edge-case sets; providing structured feedback to improve code generation, reasoning, and instruction-following capabilities.",
    },
    {
      title: "Advanced AI Extern",
      company: { name: "Pfizer", image: "/pfizer.svg", url: "https://www.extern.com/externships/pfizer-advanced-ai-powered-document-intelligence-externship-jun-2026-2" },
      date: "Jun 2026 - Present",
      description: "Building intelligent document processing pipelines with Python and layout-aware OCR; developing RAG systems for enterprise document search; prototyping an internal AI chatbot using Gradio.",
    },
    {
      title: "Agentic AI & ML Intern",
      company: { name: "MIT-Incubated Stealth AI Startup", image: "/startup.webp", url: "#" },
      date: "Jun - Aug 2026",
      description: "Building and evaluating production-facing AI agents with prompt engineering, model evaluation, and workflow design. Running large-scale testing of agentic AI systems and identifying optimization opportunities under <a href=\"https://um6pventures.com/\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">UM6P Ventures</a>. Mentored by <a href=\"https://www.linkedin.com/in/omarbenzit\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">Omar Benzit</a>.",
    },
    {
      title: "AI / ML Research Intern",
      company: { name: "Al Akhawayn University", image: "/akhawayn.png", url: "https://www.aui.ma" },
      date: "Jul 2026",
      description: "Developing an AI-powered forest fire risk prediction framework for Morocco's Middle Atlas region under <a href=\"https://aui.ma/teacher-bio/houda-chakiri\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">Dr. Houda Chakiri</a> as part of the RICER initiative; integrating GIS, Earth Observation data, and IBM/NASA Prithvi foundation models to learn environmental representations directly from satellite imagery.",
    },
    {
      title: "Career Fellow — Tech / SWE Track",
      company: { name: "SEO (Sponsors for Educational Opportunity)", image: "/seo.jpg", url: "https://career.seo-usa.org/" },
      date: "2026 - Present",
      description: "Selected for SEO's competitive Career Fellowship; receiving mentorship, technical interview preparation, and recruiting support targeting top-tier SWE roles.",
    },
    {
      title: "Development Board",
      company: { name: "Columbia General Studies Business Society", image: "/columbia.webp", url: "https://www.columbiagsbs.com/" },
      date: "Feb 2026 - Present",
      description: "Lead growth initiatives to expand engagement; built alumni and external partner pipeline for sponsorships and events.",
    },
    {
      title: "Student Researcher — HCI & Wearable Systems",
      company: { name: "Cornell University — Hybrid Body Lab", image: "/cornell.webp", url: "https://www.hybridbody.human.cornell.edu/#/skinkit/" },
      date: "Mar 2026",
      description: "Prototyped modular flexible PCB wearables for continuous physiological monitoring, applying embedded hardware and HCI design principles to on-body <a href=\"https://www.linkedin.com/posts/zayneb-cherif-830294251_recently-i-had-the-opportunity-to-work-with-ugcPost-7439764313671749633-hyFd/\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">interaction applications</a>.",
    },
    {
      title: "Data Analytics Research Intern",
      company: { name: "New York University", image: "/nyu.webp", url: "https://nyu.edu" },
      date: "Oct - Dec 2025",
      description: "Built end-to-end ML classification pipelines in scikit-learn processing 500K+ records; researched orbital time periods for astrophysics professor <a href=\"https://ilc.fyi/\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">Dr. Isabel Colman</a>; applied STL time-series decomposition to denoise sensor signals and improve downstream model F1 score.",
    },
    {
      title: "AI Analytics Researcher",
      company: { name: "IBM Research", image: "/ibm.webp", url: "https://research.ibm.com" },
      date: "Sep 2023 - May 2024",
      description: "Co-authored 2 peer-reviewed papers (<a href=\"https://openreview.net/forum?id=hvp5I4dDya\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">ICLR 2024 Notable</a>, <a href=\"https://www.ijcai.org/proceedings/2024/878\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">IJCAI 2024</a>); benchmarked ResNet and U-Net inference on IBM analog in-memory computing chips across 6 hardware configurations.",
    },
    {
      title: "Mind Brain Behavior Mentorship",
      company: { name: "Harvard University", image: "/harvard.svg", url: "https://mbb.harvard.edu" },
      date: "Sep 2021 - Jun 2023",
      description: "Apprenticeship under the <a href=\"https://mbb.harvard.edu/\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">Mind Brain Behavior Interfaculty Initiative</a>; conducted research on neurodevelopmental disorders under faculty mentorship <a href=\"https://mbb.harvard.edu/people/anne-arnett\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">Dr. Anne Arnett</a>.",
    },
    {
      title: "Research Analyst",
      company: { name: "Boston Children's Hospital", image: "/bch.webp", url: "https://research.childrenshospital.org" },
      date: "Sep 2021 - May 2023",
      description: "Analyzed behavioral and clinical datasets at the <a href=\"https://research.childrenshospital.org/research-units/arnett-lab-research\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">Arnett Lab</a>; hosted and conducted an in person study at <a href=\"https://research.childrenshospital.org/research-units/arnett-lab-research/research-projects\" target=\"_blank\" style=\"text-decoration:underline; text-underline-offset:2px;\">Boston Museum of Science</a>; independently authored a research paper under faculty mentorship.",
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