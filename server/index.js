import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect, useRef } from "react";
import { MotionConfig, motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function MotionProvider({ children }) {
  return /* @__PURE__ */ jsx(MotionConfig, { children });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(MotionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    const handleAnchorClick = (e) => {
      var _a;
      const target = e.target;
      if (target.tagName === "A" && ((_a = target.getAttribute("href")) == null ? void 0 : _a.startsWith("#"))) {
        e.preventDefault();
        const href = target.getAttribute("href");
        const sectionId = href == null ? void 0 : href.substring(1);
        if (sectionId) {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    motion.header,
    {
      className: `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-3" : "py-5"}`,
      initial: { y: -100 },
      animate: { y: 0 },
      transition: { duration: 0.5 },
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-2xl font-bold text-[#800000] dark:text-white", children: "IA" }),
        /* @__PURE__ */ jsx("nav", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("ul", { className: "flex space-x-8", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#about", className: "text-gray-700 hover:text-[#800000] dark:text-gray-300 dark:hover:text-white transition-colors", children: "About" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#projects", className: "text-gray-700 hover:text-[#800000] dark:text-gray-300 dark:hover:text-white transition-colors", children: "Projects" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#tech-stack", className: "text-gray-700 hover:text-[#800000] dark:text-gray-300 dark:hover:text-white transition-colors", children: "Tech Stack" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#prompt-kit", className: "text-gray-700 hover:text-[#800000] dark:text-gray-300 dark:hover:text-white transition-colors", children: "Prompt Kit" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#contact", className: "text-gray-700 hover:text-[#800000] dark:text-gray-300 dark:hover:text-white transition-colors", children: "Contact" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("button", { className: "text-gray-700 dark:text-gray-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }) })
      ] })
    }
  );
};
const Hero = () => {
  const heroRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".neural-path",
        { strokeDashoffset: 1e3, strokeDasharray: 1e3 },
        { strokeDashoffset: 0, duration: 2, stagger: 0.1, ease: "power2.inOut" }
      );
      gsap.to(".gear-1", { rotation: 360, duration: 20, repeat: -1, ease: "linear" });
      gsap.to(".gear-2", { rotation: -360, duration: 15, repeat: -1, ease: "linear" });
    }, heroRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-20 px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-full h-full bg-cover bg-center opacity-20 dark:opacity-10",
        style: { backgroundImage: 'url("/images/background.jpg")' }
      }
    ) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "z-10 text-center",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.5 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/isaac.png",
              alt: "Isaac Akinladejo",
              className: "w-40 h-40 rounded-full border-4 border-[#800000] dark:border-[#C0C0C0] object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#800000] dark:text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "block", children: "Isaac Akinladejo" }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-[#C0C0C0] block mt-2", children: "AI Builder & Systems Architect" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-10 text-gray-700 dark:text-[#C0C0C0]", children: "I build AI systems that think, automate, and assist — beautifully." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#about",
                className: "px-6 py-3 bg-[#800000] text-white rounded-md hover:bg-opacity-90 transition-all",
                children: "About Me"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#projects",
                className: "px-6 py-3 border border-[#800000] text-[#800000] dark:border-[#C0C0C0] dark:text-[#C0C0C0] rounded-md hover:bg-[#800000] hover:bg-opacity-10 transition-all",
                children: "View Projects"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute bottom-10 left-1/2 transform -translate-x-1/2",
        animate: {
          y: [0, 10, 0]
        },
        transition: {
          repeat: Infinity,
          duration: 1.5
        },
        children: /* @__PURE__ */ jsx("svg", { width: "40", height: "40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M7 13l5 5 5-5M7 7l5 5 5-5" }) })
      }
    )
  ] });
};
const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const timelineEvents = [
    {
      year: "2018",
      title: "Started Architecture Journey",
      description: "Began exploring design and systems development."
    },
    {
      year: "2021",
      title: "First AI Project",
      description: "Developed a prompt to model a simple GUI app for email generation in Python"
    },
    {
      year: "2022",
      title: "Prompt Engineering",
      description: "Specialized in creating advanced prompt systems for business applications."
    },
    {
      year: "2023",
      title: "Systems Architecture",
      description: "Began prototyping full AI systems architecture and integration."
    },
    {
      year: "2025",
      title: "Portfolio Growth",
      description: "Established presence on Fiverr from the Alx Africa Freelancer Academy."
    }
  ];
  const philosophyCards = [
    {
      title: "Hephaestus",
      value: "Tenacity",
      description: "Like the craftsman god, I forge solutions with persistence and skill."
    },
    {
      title: "Stoicism",
      value: "Clarity",
      description: "I approach problems with calm rationality and focused purpose."
    },
    {
      title: "Innovation",
      value: "Creativity",
      description: "Finding novel approaches to complex problems through creative thinking."
    }
  ];
  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".timeline-item",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }
        );
        gsap.fromTo(
          ".philosophy-card",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, delay: 0.5, ease: "back.out(1.2)" }
        );
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [isInView]);
  return /* @__PURE__ */ jsx("section", { id: "about", ref: sectionRef, className: "py-20 px-4 bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.h2,
      {
        className: "text-3xl md:text-4xl font-bold text-center mb-16 text-[#800000] dark:text-white",
        initial: { opacity: 0, y: -20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5 },
        children: "About Me"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center lg:col-span-1", children: /* @__PURE__ */ jsx("div", { className: "w-64 h-64 rounded-full border-4 border-[#800000] dark:border-[#C0C0C0] overflow-hidden bg-[#C0C0C0] dark:bg-gray-800 flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", width: "80%", height: "80%", children: [
        /* @__PURE__ */ jsx("circle", { cx: "50", cy: "35", r: "25", className: "fill-maroon dark:fill-silver" }),
        /* @__PURE__ */ jsx("path", { d: "M25,90 Q50,110 75,90", className: "fill-none stroke-maroon dark:stroke-silver", strokeWidth: "2" }),
        /* @__PURE__ */ jsx("rect", { x: "35", y: "60", width: "30", height: "40", rx: "5", className: "fill-maroon dark:fill-silver" })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6 text-gray-800 dark:text-[#C0C0C0]", children: "My Journey" }),
        /* @__PURE__ */ jsx("div", { className: "relative border-l-2 border-[#800000] dark:border-[#C0C0C0] pl-8 pb-8", children: timelineEvents.map((event, index) => /* @__PURE__ */ jsxs("div", { className: "timeline-item mb-8 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -left-10 w-5 h-5 rounded-full bg-[#800000] dark:bg-[#C0C0C0]" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-[#800000] dark:text-[#FFD700]", children: event.year }),
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-800 dark:text-white", children: event.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: event.description })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-8 text-center text-gray-800 dark:text-[#C0C0C0]", children: "Personal Philosophy" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: philosophyCards.map((card, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "philosophy-card p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md border-t-4 border-[#800000] dark:border-[#C0C0C0]",
          children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-2 text-[#800000] dark:text-[#FFD700]", children: card.title }),
            /* @__PURE__ */ jsx("div", { className: "text-sm uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400", children: card.value }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300", children: card.description })
          ]
        },
        index
      )) })
    ] })
  ] }) });
};
const projectsData = [
  {
    id: 1,
    title: "AI Lead Generation Assistant",
    description: "Automated system for real estate agents to qualify and follow up with leads.",
    tags: ["AI", "Automation", "Business"],
    category: "Prompt Kits",
    image: "/images/project1.svg",
    // Placeholder for SVG
    links: {
      github: "https://github.com/isaac-akinladejo/lead-gen-ai",
      fiverr: "https://fiverr.com/isaac_akinladejo/create-ai-lead-generation-systems",
      notion: "https://notion.so/isaac-akinladejo/lead-gen-case-study"
    },
    techStack: ["Python", "OpenAI", "Twilio"]
  },
  {
    id: 2,
    title: "WhatsDoc Automator",
    description: "Python application that converts WhatsApp voice notes and chats into professional documents.",
    tags: ["Voice Note Transcription", "Document Templates", "Automation Panel"],
    category: "Transcription",
    image: "/images/project2.svg",
    // Placeholder for SVG
    links: {
      github: "https://github.com/IsaacGridGainsDev/WhatsDoc",
      fiverr: "https://www.fiverr.com/sellers/god_is_a_ble"
    },
    techStack: ["CustomTkinter", "Python", "OpenAI"]
  },
  {
    id: 3,
    title: "Auto Fonts Installer",
    description: "Interactive Python application that automates installing fonts from ZIP files or folders.",
    tags: ["GUI", "Dashboard", "Automation"],
    category: "AI Tools",
    image: "/images/project3.svg",
    // Placeholder for SVG
    links: {
      github: "https://github.com/IsaacGridGainsDev/Font_Auto_Installer",
      notion: "https://www.notion.so/7b9b6948f785419a9d47036cdff2fcec?pvs=66&qid&origin"
    },
    techStack: ["CustomTkinter", "Python", "GUI"]
  },
  {
    id: 4,
    title: "Automated Twitter Data Miner",
    description: " Python application for mining, analyzing, and visualizing Twitter data using both historical scraping and real-time streaming capabilities.",
    tags: ["Data Mining", "Automation", "Business"],
    category: "Business Systems",
    image: "/images/project4.svg",
    // Placeholder for SVG
    links: {
      github: "https://github.com/IsaacGridGainsDev/Tweet-Harvester-GUI"
    },
    techStack: ["Python", "FastAPI", "PostgreSQL"]
  }
];
const categories = [
  "All",
  "AI Tools",
  "GUIs",
  "Business Systems",
  "Prompt Kits"
];
const Projects = ({ id = "projects" }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const filteredProjects = activeCategory === "All" ? projectsData : projectsData.filter((project) => project.category === activeCategory);
  const openProject = (project) => {
    setSelectedProject(project);
  };
  const closeProject = () => {
    setSelectedProject(null);
  };
  return /* @__PURE__ */ jsx("section", { id, ref: sectionRef, className: "py-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.h2,
      {
        className: "text-3xl md:text-4xl font-bold text-center mb-16 text-[#800000] dark:text-white",
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.5 },
        children: "Projects Gallery"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-12", children: categories.map((category, index) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveCategory(category),
        className: `px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ? "bg-[#800000] text-white" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"}`,
        children: category
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: /* @__PURE__ */ jsx(AnimatePresence, { children: filteredProjects.map((project) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.4 },
        className: "bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer",
        onClick: () => openProject(project),
        children: [
          /* @__PURE__ */ jsx("div", { className: "h-48 bg-[#C0C0C0] dark:bg-gray-700 flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { className: "w-24 h-24 text-[#800000] dark:text-[#C0C0C0]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", children: [
            project.category === "AI Tools" && /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z M12 6v6l4 2" }),
            project.category === "GUIs" && /* @__PURE__ */ jsx("path", { d: "M4 4h16v12H4V4zm4 16h8m-4-4v4" }),
            project.category === "Business Systems" && /* @__PURE__ */ jsx("path", { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }),
            project.category === "Prompt Kits" && /* @__PURE__ */ jsx("path", { d: "M8 10h8m-8 4h8m-8-8h8M5 6v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6a1 1 0 00-1 1z" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-gray-800 dark:text-white", children: project.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: project.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: project.tags.map((tag, index) => /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded", children: tag }, index)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Tech:" }),
              project.techStack.map((tech, index) => /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-gray-50 dark:bg-gray-900 rounded text-xs", children: tech }, index))
            ] })
          ] })
        ]
      },
      project.id
    )) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedProject && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4",
        onClick: closeProject,
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            className: "bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx("div", { className: "h-64 bg-[#C0C0C0] dark:bg-gray-700 flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { className: "w-32 h-32 text-[#800000] dark:text-[#C0C0C0]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", children: [
                selectedProject.category === "AI Tools" && /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z M12 6v6l4 2" }),
                selectedProject.category === "GUIs" && /* @__PURE__ */ jsx("path", { d: "M4 4h16v12H4V4zm4 16h8m-4-4v4" }),
                selectedProject.category === "Business Systems" && /* @__PURE__ */ jsx("path", { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }),
                selectedProject.category === "Prompt Kits" && /* @__PURE__ */ jsx("path", { d: "M8 10h8m-8 4h8m-8-8h8M5 6v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6a1 1 0 00-1 1z" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3 text-gray-800 dark:text-white", children: selectedProject.title }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-6", children: selectedProject.description }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: selectedProject.tags.map((tag, index) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full", children: tag }, index)) }),
                /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold mb-2 text-gray-800 dark:text-white", children: "Technologies Used" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: selectedProject.techStack.map((tech, index) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gray-50 dark:bg-gray-900 rounded text-sm text-[#800000] dark:text-[#C0C0C0]", children: tech }, index)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
                  selectedProject.links.github && /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: selectedProject.links.github,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2 hover:bg-gray-700 transition-colors",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }) }),
                        "GitHub"
                      ]
                    }
                  ),
                  selectedProject.links.fiverr && /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: selectedProject.links.fiverr,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "px-4 py-2 bg-[#800000] text-white rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-colors",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M16.25 16.25v-10h-10v10h10m0-11.667c.917 0 1.667.75 1.667 1.667v10c0 .917-.75 1.667-1.667 1.667h-10c-.917 0-1.667-.75-1.667-1.667v-10c0-.917.75-1.667 1.667-1.667h10m-7.5 8.333h5v1.667h-5v-1.667m0-3.333h5v1.667h-5V9.583m0-3.333h5v1.667h-5V6.25" }) }),
                        "Fiverr"
                      ]
                    }
                  ),
                  selectedProject.links.notion && /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: selectedProject.links.notion,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" }) }),
                        "Notion Doc"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white",
                  onClick: closeProject,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
                }
              )
            ]
          }
        )
      }
    ) })
  ] }) });
};
const techStackData = [
  {
    category: "AI & ML",
    items: [
      { name: "OpenAI", icon: "🧠", description: "GPT models for text generation and processing" },
      { name: "Whisper", icon: "🎤", description: "Speech-to-text transcription" },
      { name: "Anthropic", icon: "🤖", description: "Claude models for reasoning tasks" },
      { name: "Hugging Face", icon: "🤗", description: "Open-source ML models" }
    ]
  },
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "🐍", description: "Primary language for AI systems and automation" },
      { name: "JavaScript", icon: "📜", description: "Web development and frontend interfaces" },
      { name: "TypeScript", icon: "📘", description: "Type-safe JavaScript for robust applications" },
      { name: "SQL", icon: "🗃️", description: "Database queries and data management" }
    ]
  },
  {
    category: "Frameworks",
    items: [
      { name: "React", icon: "⚛️", description: "Frontend UI development" },
      { name: "FastAPI", icon: "⚡", description: "High-performance API development" },
      { name: "TailwindCSS", icon: "🎨", description: "Utility-first CSS framework" },
      { name: "CustomTkinter", icon: "🖼️", description: "Modern UI toolkit for Python" }
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "📊", description: "Version control and collaboration" },
      { name: "Docker", icon: "🐳", description: "Containerization for deployment" },
      { name: "Notion", icon: "📝", description: "Documentation and knowledge management" },
      { name: "Figma", icon: "🎭", description: "UI/UX design and prototyping" }
    ]
  }
];
const TechStack = ({ id = "tech-stack" }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeItem, setActiveItem] = useState(null);
  return /* @__PURE__ */ jsx("section", { id, ref: sectionRef, className: "py-20 px-4 bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.h2,
      {
        className: "text-3xl md:text-4xl font-bold text-center mb-16 text-[#800000] dark:text-white",
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.5 },
        children: "Tech Stack"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-16", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "w-32 h-32 rounded-full bg-[#800000] dark:bg-[#C0C0C0] flex items-center justify-center text-white dark:text-gray-900 text-xl font-bold shadow-lg",
          initial: { scale: 0.8, opacity: 0 },
          animate: isInView ? { scale: 1, opacity: 1 } : {},
          transition: { duration: 0.5, delay: 0.2 },
          children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "AI" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm", children: "Systems" })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: techStackData.map((category, categoryIndex) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md",
          initial: { y: 50, opacity: 0 },
          animate: isInView ? { y: 0, opacity: 1 } : {},
          transition: { duration: 0.5, delay: 0.1 * categoryIndex },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-[#800000] dark:text-[#FFD700]", children: category.category }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: category.items.map((item, itemIndex) => /* @__PURE__ */ jsxs(
              motion.li,
              {
                className: `p-3 rounded-md transition-all cursor-pointer flex items-center gap-3 ${activeItem === `${categoryIndex}-${itemIndex}` ? "bg-[#800000] bg-opacity-10 dark:bg-opacity-20" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`,
                onClick: () => setActiveItem(activeItem === `${categoryIndex}-${itemIndex}` ? null : `${categoryIndex}-${itemIndex}`),
                whileHover: { x: 5 },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-2xl", children: item.icon }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800 dark:text-white", children: item.name })
                ]
              },
              itemIndex
            )) })
          ]
        },
        categoryIndex
      )) }),
      /* @__PURE__ */ jsx(AnimatedDescription, { activeItem, techStackData })
    ] })
  ] }) });
};
const AnimatedDescription = ({ activeItem, techStackData: techStackData2 }) => {
  if (!activeItem) return null;
  const [categoryIndex, itemIndex] = activeItem.split("-").map(Number);
  const item = techStackData2[categoryIndex].items[itemIndex];
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 max-w-md w-full",
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 50, opacity: 0 },
      transition: { type: "spring", damping: 25 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl", children: item.icon }),
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-[#800000] dark:text-[#FFD700]", children: item.name })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300", children: item.description })
      ]
    }
  );
};
const PromptKit = ({ id = "prompt-kit" }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [promptInput, setPromptInput] = useState("");
  const [promptResult, setPromptResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const samplePrompt = `Hello [Client Name],

I noticed you were interested in properties in [Neighborhood]. I have some new listings that match your criteria for [Property Type] homes in the [Price Range] range.

Would you be available for a quick call this week to discuss these options?

Best regards,
[Agent Name]`;
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const personalized = promptInput.split(",").reduce((result, item, index) => {
        const values = ["Client Name", "Neighborhood", "Property Type", "Price Range", "Agent Name"];
        if (index < values.length) {
          return result.replace(`[${values[index]}]`, item.trim());
        }
        return result;
      }, samplePrompt);
      setPromptResult(personalized);
      setIsLoading(false);
    }, 1500);
  };
  return /* @__PURE__ */ jsx("section", { id, ref: sectionRef, className: "py-20 px-4 bg-white dark:bg-gray-950", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.h2,
      {
        className: "text-3xl md:text-4xl font-bold text-center mb-6 text-[#800000] dark:text-white",
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.5 },
        children: "Live Prompt Kit Demo"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        className: "text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto",
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay: 0.2 },
        children: "Try out this sample prompt template for real estate agent follow-ups. Enter your details below to see how AI can personalize communication."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md",
          initial: { opacity: 0, x: -30 },
          animate: isInView ? { opacity: 1, x: 0 } : {},
          transition: { duration: 0.5, delay: 0.3 },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-gray-800 dark:text-white", children: "Input Your Details" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-gray-700 dark:text-gray-300 mb-2 text-sm", children: "Enter values separated by commas:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white",
                    placeholder: "John Doe, Downtown, Condo, $300-400k, Jane Smith",
                    value: promptInput,
                    onChange: (e) => setPromptInput(e.target.value),
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 mb-4", children: "Format: Client Name, Neighborhood, Property Type, Price Range, Agent Name" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full py-3 bg-[#800000] text-white rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center",
                  disabled: isLoading,
                  children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                      /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                    ] }),
                    "Processing..."
                  ] }) : "Generate Personalized Prompt"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md",
          initial: { opacity: 0, x: 30 },
          animate: isInView ? { opacity: 1, x: 0 } : {},
          transition: { duration: 0.5, delay: 0.4 },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-gray-800 dark:text-white", children: "Generated Prompt" }),
            /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-700 p-4 rounded-md min-h-[200px] whitespace-pre-line", children: promptResult || "Your personalized prompt will appear here..." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mt-12 text-center",
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.5, delay: 0.6 },
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: "This is just one example from my extensive prompt engineering toolkit." }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#contact",
              className: "inline-block px-6 py-3 bg-[#800000] text-white rounded-md hover:bg-opacity-90 transition-all",
              children: "Discuss Custom Prompt Systems"
            }
          )
        ]
      }
    )
  ] }) });
};
const Contact = ({ id = "contact" }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    reaction: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const reactions = [
    { emoji: "👍", label: "Sounds Good" },
    { emoji: "🚀", label: "Let's Build" },
    { emoji: "💡", label: "I Have Ideas" },
    { emoji: "🤝", label: "Partnership" }
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const handleReaction = (reaction) => {
    setFormState((prev) => ({ ...prev, reaction }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        message: "",
        reaction: ""
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5e3);
    }, 1500);
  };
  return /* @__PURE__ */ jsx("section", { id, ref: sectionRef, className: "py-20 px-4 bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.h2,
      {
        className: "text-3xl md:text-4xl font-bold text-center mb-6 text-[#800000] dark:text-white",
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.5 },
        children: "Let's Build Together"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        className: "text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto",
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay: 0.2 },
        children: "Have a project in mind or want to discuss how AI can transform your workflow? I'd love to hear from you."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "p-6 md:p-8",
          initial: { opacity: 0, x: -30 },
          animate: isInView ? { opacity: 1, x: 0 } : {},
          transition: { duration: 0.5, delay: 0.3 },
          children: isSubmitted ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4", children: "✅" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-gray-800 dark:text-white", children: "Message Sent!" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Thank you for reaching out. I'll get back to you soon." })
          ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-gray-700 dark:text-gray-300 mb-2 text-sm", children: "Your Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "name",
                  className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white",
                  placeholder: "John Doe",
                  value: formState.name,
                  onChange: handleChange,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-gray-700 dark:text-gray-300 mb-2 text-sm", children: "Email Address" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white",
                  placeholder: "john@example.com",
                  value: formState.email,
                  onChange: handleChange,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-gray-700 dark:text-gray-300 mb-2 text-sm", children: "Your Message" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "message",
                  rows: 4,
                  className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white",
                  placeholder: "Tell me about your project or idea...",
                  value: formState.message,
                  onChange: handleChange,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-gray-700 dark:text-gray-300 mb-3 text-sm", children: "How would you describe your inquiry?" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: reactions.map((reaction, index) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: `flex flex-col items-center p-3 rounded-md transition-all ${formState.reaction === reaction.emoji ? "bg-[#800000] bg-opacity-10 dark:bg-opacity-20 border border-[#800000] dark:border-[#C0C0C0]" : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"}`,
                  onClick: () => handleReaction(reaction.emoji),
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-2xl mb-1", children: reaction.emoji }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700 dark:text-gray-300", children: reaction.label })
                  ]
                },
                index
              )) })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "w-full py-3 bg-[#800000] text-white rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center",
                disabled: isSubmitting,
                children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                  ] }),
                  "Sending..."
                ] }) : "Send Message"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "bg-[#800000] text-white p-6 md:p-8 flex flex-col justify-center",
          initial: { opacity: 0, x: 30 },
          animate: isInView ? { opacity: 1, x: 0 } : {},
          transition: { duration: 0.5, delay: 0.4 },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-6", children: "Connect With Me" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
                /* @__PURE__ */ jsx("a", { href: "mailto:isaac_akinladejo@hotmail.com", className: "hover:underline", children: "isaac_akinladejo@hotmail.com" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) }),
                /* @__PURE__ */ jsx("a", { href: "https://github.com/IsaacGridGainsDev", target: "_blank", rel: "noopener noreferrer", className: "hover:underline", children: "GitHub" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                /* @__PURE__ */ jsx("a", { href: "https://www.notion.so/7b9b6948f785419a9d47036cdff2fcec?pvs=66&qid&origin", target: "_blank", rel: "noopener noreferrer", className: "hover:underline", children: "Notion" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
                /* @__PURE__ */ jsx("a", { href: "https://www.fiverr.com/sellers/god_is_a_ble", target: "_blank", rel: "noopener noreferrer", className: "hover:underline", children: "Fiverr" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "bg-[#800000] text-white p-6 md:p-8 flex flex-col justify-between",
          initial: { opacity: 0, x: 30 },
          animate: isInView ? { opacity: 1, x: 0 } : {},
          transition: { duration: 0.5, delay: 0.4 },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-6", children: "My Location" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" }) }),
                  /* @__PURE__ */ jsx("span", { children: "Isaac Grid Gains" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" }) }),
                  /* @__PURE__ */ jsx("span", { children: "Remote / Global" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Find Me On" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.linkedin.com/in/isaac-akinladejo-425b09162/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all",
                    "aria-label": "LinkedIn",
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: "/images/linkedin.svg",
                        alt: "LinkedIn",
                        className: "w-5 h-5"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://github.com/IsaacGridGainsDev",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all",
                    "aria-label": "GitHub",
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: "/images/github.svg",
                        alt: "GitHub",
                        className: "w-5 h-5"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.fiverr.com/sellers/god_is_a_ble",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all",
                    "aria-label": "Fiverr",
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: "/images/fiverr.svg",
                        alt: "Fiverr",
                        className: "w-5 h-5"
                      }
                    )
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }) })
  ] }) });
};
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white py-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 md:mb-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#800000] dark:text-[#C0C0C0]", children: "Isaac Akinladejo" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "AI Builder & Systems Architect" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-6 mb-6 md:mb-0", children: [
        /* @__PURE__ */ jsx("a", { href: "#about", className: "text-gray-300 hover:text-white transition-colors", children: "About" }),
        /* @__PURE__ */ jsx("a", { href: "#projects", className: "text-gray-300 hover:text-white transition-colors", children: "Projects" }),
        /* @__PURE__ */ jsx("a", { href: "#tech-stack", className: "text-gray-300 hover:text-white transition-colors", children: "Tech Stack" }),
        /* @__PURE__ */ jsx("a", { href: "#prompt-kit", className: "text-gray-300 hover:text-white transition-colors", children: "Prompt Kit" }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "text-gray-300 hover:text-white transition-colors", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-opacity-90 transition-all",
          onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
          "aria-label": "Back to top",
          children: "Back to Top"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mb-4 md:mb-0", children: [
        "© ",
        currentYear,
        " Isaac Akinladejo. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          className: "text-gray-500 text-sm italic",
          initial: { opacity: 0.5 },
          whileHover: { opacity: 1 },
          children: `"Building tomorrow's AI solutions with today's technology."`
        }
      )
    ] })
  ] }) });
};
function meta({}) {
  return [{
    title: "Isaac Akinladejo – AI Builder & Systems Architect Portfolio"
  }, {
    name: "description",
    content: "Portfolio of Isaac Akinladejo, AI Builder and Systems Architect specializing in AI systems, prompt engineering, and technical creativity."
  }, {
    name: "theme-color",
    content: "#800000"
  }, {
    property: "og:title",
    content: "Isaac Akinladejo – AI Builder & Systems Architect"
  }, {
    property: "og:description",
    content: "Building AI systems that think, automate, and assist — beautifully."
  }, {
    property: "og:type",
    content: "website"
  }];
}
const home = withComponentProps(function Home() {
  const mainRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
    }, mainRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    ref: mainRef,
    className: "bg-white dark:bg-gray-950 text-gray-900 dark:text-white",
    children: [/* @__PURE__ */ jsx(Navigation, {}), /* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(About, {}), /* @__PURE__ */ jsx(Projects, {
      id: "projects"
    }), /* @__PURE__ */ jsx(TechStack, {
      id: "tech-stack"
    }), /* @__PURE__ */ jsx(PromptKit, {
      id: "prompt-kit"
    }), /* @__PURE__ */ jsx(Contact, {
      id: "contact"
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-SQZkSKxz.js", "imports": ["/assets/chunk-D4RADZKF-BXVSF3ox.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BAWGMfky.js", "imports": ["/assets/chunk-D4RADZKF-BXVSF3ox.js", "/assets/filter-props-u_SuM1wp.js"], "css": ["/assets/root--MQGoCBg.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-dLC1T9Ao.js", "imports": ["/assets/filter-props-u_SuM1wp.js", "/assets/chunk-D4RADZKF-BXVSF3ox.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c9471108.js", "version": "c9471108", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
