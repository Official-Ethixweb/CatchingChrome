import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { a as SiteHeader, A as ArrowUpRight, b as ArrowRight, c as AwardIcon, d as ShieldCheckIcon, e as FishIcon, U as UsersIcon, R as RulerIcon, B as BoltIcon, f as RadarIcon, g as AnchorIcon, h as MoveIcon, M as MapPinIcon, Q as QuoteIcon, S as SiteFooter } from "./SiteFooter-DBOpWQqm.js";
import { S as SignatureTripsSection } from "./SignatureTripsSection-ChiZzIDH.js";
import "@tanstack/react-router";
const SLIDES = [
  "/nature-river.jpg",
  "/nature-forest.jpg",
  "/nature-mountain.jpg",
  "/nature-valley.jpg"
];
function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "relative h-screen min-h-[640px] w-full overflow-hidden bg-ink", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: SLIDES.map((src, i) => /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: "",
        "aria-hidden": "true",
        className: `hero-kenburns absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1600ms] ease-in-out ${i === active ? "opacity-100" : "opacity-0"}`
      },
      src
    )) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/35 to-ink/85" }),
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "hero-fade", children: [
      /* @__PURE__ */ jsx("h1", { className: "mx-auto max-w-5xl font-display text-[clamp(2.4rem,6.4vw,5.6rem)] uppercase leading-[0.98] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]", children: "Experience Oregon's Premier Fishing Adventures" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]", children: "Expert-guided excursions on the Pacific Northwest's most pristine waters." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-wrap items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#",
            className: "group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink shadow-lg transition-all duration-200 hover:brightness-110",
            children: [
              "Book Now",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "inline-flex items-center rounded-full border border-white/60 bg-white/10 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20",
            children: "Explore Trips"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5", children: SLIDES.map((_, i) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setActive(i),
        "aria-label": `Show slide ${i + 1}`,
        className: `h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"}`
      },
      i
    )) })
  ] });
}
const STATS = [
  { value: "40+", label: "Years" },
  { value: "10K+", label: "Fish Landed" },
  { value: "100%", label: "USCG Cert." }
];
function WelcomeSection() {
  return /* @__PURE__ */ jsx("section", { id: "about", className: "bg-paper py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] w-full overflow-hidden rounded-sm", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/20240831_124653-1488x1536.jpg",
          alt: "Guests aboard with a limit of Columbia River salmon",
          className: "h-full w-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 grid grid-cols-3 gap-4", children: STATS.map((stat) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "border border-ink/15 py-6 text-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-4xl leading-none text-ink", children: stat.value }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/50", children: stat.label })
          ]
        },
        stat.label
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "01" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-ink/70", children: "WELCOME" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.5rem,4.6vw,4.2rem)] uppercase leading-[0.9] text-ink", children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "Welcome To" }),
        /* @__PURE__ */ jsxs("span", { className: "block", children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Catching" }),
          " Chrome"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "Guide Service" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 max-w-xl space-y-5 text-[17px] leading-relaxed text-ink/60", children: [
        /* @__PURE__ */ jsx("p", { children: "Premium fishing experiences throughout Oregon's legendary waterways. With over forty years of local knowledge, Captain Ryan delivers exceptional adventures for all skill levels — from the Columbia River Gorge to coastal tributaries." }),
        /* @__PURE__ */ jsx("p", { children: "Safe, comfortable, memorable trips. Every time." })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#",
          className: "group mt-10 inline-flex items-center gap-3 border-b-2 border-ink pb-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:text-ink/70",
          children: [
            "About Us",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" })
          ]
        }
      )
    ] })
  ] }) });
}
const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split("").map((c) => c + c).join("");
  }
  const num = parseInt(color, 16);
  let r = num >> 16 & 255;
  let g = num >> 8 & 255;
  let b = num & 255;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};
const Folder = ({ color = "#70a1ff", size = 1, items = [], className = "" }) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }
  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";
  const handleClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };
  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };
  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };
  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3
  };
  const folderClassName = `folder ${open ? "open" : ""}`.trim();
  const scaleStyle = { transform: `scale(${size})`, transformOrigin: "center center" };
  return /* @__PURE__ */ jsx("div", { style: scaleStyle, className, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: folderClassName,
      style: folderStyle,
      onClick: handleClick,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      },
      tabIndex: 0,
      role: "button",
      "aria-expanded": open,
      "aria-label": open ? "Close folder" : "Open folder",
      children: /* @__PURE__ */ jsxs("div", { className: "folder__back", children: [
        papers.map((item, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `paper paper-${i + 1}`,
            onMouseMove: (e) => handlePaperMouseMove(e, i),
            onMouseLeave: (e) => handlePaperMouseLeave(e, i),
            style: open ? {
              "--magnet-x": `${paperOffsets[i]?.x || 0}px`,
              "--magnet-y": `${paperOffsets[i]?.y || 0}px`
            } : {},
            children: item
          },
          i
        )),
        /* @__PURE__ */ jsx("div", { className: "folder__front" }),
        /* @__PURE__ */ jsx("div", { className: "folder__front right" })
      ] })
    }
  ) });
};
function CustomMerchSection() {
  const sectionRef = useRef(null);
  const markRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const mark = markRef.current;
    if (!section || !mark) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const AMPLITUDE = 420;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight || 1;
      const progress = (rect.top + rect.height / 2 - winH / 2) / winH;
      const x = -progress * AMPLITUDE;
      mark.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      id: "merch",
      className: "relative overflow-hidden bg-night py-28 md:py-36",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
            children: /* @__PURE__ */ jsx(
              "div",
              {
                ref: markRef,
                className: "whitespace-nowrap font-display uppercase leading-none text-cream/[0.04] will-change-transform",
                style: { fontSize: "18vw", transition: "transform 0.1s linear" },
                children: "CUSTOM · CUSTOM · CUSTOM · CUSTOM"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center lg:items-end lg:pr-12 order-2 lg:order-1", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center lg:-translate-x-[150px] lg:translate-y-[90px]", children: [
            /* @__PURE__ */ jsx(
              Folder,
              {
                size: 1.5,
                color: "#1e293b",
                items: [
                  /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500 font-semibold uppercase tracking-wider", children: "Caps" }, "1"),
                  /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500 font-semibold uppercase tracking-wider", children: "Tees" }, "2"),
                  /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500 font-semibold uppercase tracking-wider", children: "Hoodies" }, "3")
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "mt-8 text-[11px] font-semibold tracking-[0.2em] text-cream/40 uppercase", children: "Click to Open" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "order-1 lg:order-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "02" }),
              /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-cream/25" }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-cream/50", children: "CUSTOM MERCH" })
            ] }),
            /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.2rem,5.1vw,4.8rem)] uppercase leading-[0.86] text-cream", children: [
              /* @__PURE__ */ jsx("span", { className: "block", children: "Create Your" }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-baseline gap-[0.14em]", children: [
                /* @__PURE__ */ jsx("span", { children: "Custom" }),
                /* @__PURE__ */ jsx("span", { className: "text-accent", children: "merch" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-8 max-w-lg text-lg leading-relaxed text-cream/60", children: "Bring your ideas to life with high-quality custom merchandise tailored to your brand or personal style from apparel to promo products, quick and hassle-free." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#",
                className: "group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110",
                children: [
                  "Start Designing",
                  /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const SEASONS = [
  {
    id: "spring",
    label: "Spring",
    months: "MAR – MAY",
    headline: "The river wakes up",
    description: "Spring chinook pour into the Columbia, prized worldwide for their rich, high-fat meat. Sturgeon fishing stays hot in the deep holes, and the tail end of the winter steelhead run still rewards early risers.",
    fish: [
      {
        name: "Spring Chinook",
        months: "MAR – JUN",
        level: "PEAK RUN",
        pct: 95,
        image: "/summerchinook.png"
      },
      {
        name: "Sturgeon",
        months: "ALL SEASON",
        level: "STRONG",
        pct: 75,
        image: "/nature-river.jpg"
      },
      {
        name: "Winter Steelhead",
        months: "MAR – APR",
        level: "FAIR",
        pct: 45,
        image: "/wintersteelhead.png"
      }
    ]
  },
  {
    id: "summer",
    label: "Summer",
    months: "JUN – AUG",
    headline: "Non-stop light-gear action",
    description: "Millions of shad flood the river for the fastest fishing of the year, perfect for kids and first-timers. Summer steelhead and sockeye run strong through the warm months, with walleye filling in the slow tides.",
    fish: [
      {
        name: "American Shad",
        months: "JUN – JUL",
        level: "PEAK RUN",
        pct: 95,
        image: "/20240831_124653-1488x1536.jpg"
      },
      {
        name: "Summer Steelhead",
        months: "JUN – SEP",
        level: "STRONG",
        pct: 80,
        image: "/wintersteelhead.png"
      },
      {
        name: "Sockeye Salmon",
        months: "JUN – JUL",
        level: "STRONG",
        pct: 70,
        image: "/nature-mountain.jpg"
      }
    ]
  },
  {
    id: "fall",
    label: "Fall",
    months: "SEP – NOV",
    headline: "The kings of the year",
    description: "Our best pure king fishery. Fall chinook arrive chrome-bright and full of fight, joined by aggressive coho on the tides. This is the season anglers travel across the country for, and dates go fast.",
    fish: [
      {
        name: "Fall Chinook",
        months: "AUG – OCT",
        level: "PEAK RUN",
        pct: 100,
        image: "/fallchinook.png"
      },
      {
        name: "Coho Salmon",
        months: "SEP – NOV",
        level: "STRONG",
        pct: 85,
        image: "/rsw_1280h_1118.webp"
      },
      {
        name: "Sturgeon",
        months: "ALL SEASON",
        level: "FAIR",
        pct: 50,
        image: "/nature-river.jpg"
      }
    ]
  },
  {
    id: "winter",
    label: "Winter",
    months: "DEC – FEB",
    headline: "Chrome in the cold",
    description: "Winter steelhead are the hardest-earned and most rewarding fish of the year, sea-bright and strong in the coastal tributaries. Sturgeon keep the big-fish action going on the mainstem between storms.",
    fish: [
      {
        name: "Winter Steelhead",
        months: "DEC – MAR",
        level: "PEAK RUN",
        pct: 90,
        image: "/wintersteelhead.png"
      },
      {
        name: "Sturgeon",
        months: "ALL SEASON",
        level: "STRONG",
        pct: 70,
        image: "/nature-river.jpg"
      },
      {
        name: "Cutthroat Trout",
        months: "DEC – FEB",
        level: "FAIR",
        pct: 40,
        image: "/nature-forest.jpg"
      }
    ]
  }
];
const LEVEL_COLOR = {
  "PEAK RUN": "text-accent",
  STRONG: "text-primary",
  FAIR: "text-cream/70"
};
function SeasonsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const season = SEASONS[active];
  const slideClass = dir >= 0 ? "season-in-right" : "season-in-left";
  const select = (i) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-ink py-24 md:py-28", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0 flex items-end justify-start overflow-hidden",
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `whitespace-nowrap font-display uppercase leading-[0.8] text-cream/[0.04] ${slideClass}`,
            style: { fontSize: "20vw" },
            children: season.label
          },
          season.id
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[1440px] px-6 md:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "04" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-cream/25" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-cream/50", children: "SEASONAL CATALOGUE" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 grid grid-cols-1 gap-14 lg:grid-cols-[400px_1fr] lg:gap-16", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-[clamp(2.6rem,4.5vw,4rem)] uppercase leading-[0.9] text-cream", children: /* @__PURE__ */ jsxs("span", { className: "flex flex-wrap items-baseline gap-x-[0.22em]", children: [
            /* @__PURE__ */ jsx("span", { children: "What's" }),
            /* @__PURE__ */ jsx("span", { className: "text-accent", children: "running" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { role: "tablist", "aria-label": "Season", className: "mt-10", children: SEASONS.map((s, i) => {
            const isActive = i === active;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": isActive,
                onClick: () => select(i),
                className: `group flex w-full items-baseline justify-between border-b py-3.5 text-left transition-all duration-300 ${isActive ? "border-accent pl-3" : "border-cream/12 pl-0 hover:border-cream/35"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `font-display text-lg uppercase tracking-wide transition-colors duration-300 md:text-xl ${isActive ? "text-accent" : "text-cream/55 group-hover:text-cream"}`,
                      children: s.label
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `text-[10px] tracking-[0.25em] transition-colors duration-300 ${isActive ? "text-cream/70" : "text-cream/35"}`,
                      children: s.months
                    }
                  )
                ]
              },
              s.id
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: `mt-10 ${slideClass}`, children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl uppercase leading-[1.05] text-cream md:text-[1.7rem]", children: season.headline }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-md text-[15.5px] leading-relaxed text-cream/60", children: season.description }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#",
                className: "group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110",
                children: [
                  "Book a ",
                  season.label,
                  " Trip",
                  /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
                ]
              }
            )
          ] }, season.id)
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex flex-col gap-4 md:-mx-10 md:h-[34rem] md:flex-row md:gap-3 lg:mx-0 lg:-mr-16 lg:pl-6",
            children: season.fish.map((f, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "season-panel-in relative h-52 md:h-auto md:flex-1",
                style: { animationDelay: `${0.1 + i * 0.13}s` },
                children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -skew-x-12 overflow-hidden rounded-sm border border-cream/10 bg-night", children: [
                  /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/70 to-transparent" }),
                  /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 skew-x-12 px-10 pb-6 md:px-12", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `text-[10px] font-bold tracking-[0.22em] ${LEVEL_COLOR[f.level]}`,
                        children: f.level
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "mt-1.5 font-display text-lg uppercase leading-tight text-cream md:text-xl", children: f.name }),
                    /* @__PURE__ */ jsx("div", { className: "mt-1 text-[10px] tracking-[0.22em] text-cream/50", children: f.months }),
                    /* @__PURE__ */ jsx("div", { className: "mt-3 h-1 w-full max-w-[9rem] overflow-hidden rounded-full bg-cream/15", children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "season-bar h-full rounded-full bg-gradient-to-r from-primary to-accent",
                        style: {
                          width: `${f.pct}%`,
                          animationDelay: `${0.35 + i * 0.13}s`
                        }
                      }
                    ) })
                  ] })
                ] })
              },
              f.name
            ))
          },
          season.id
        ) })
      ] })
    ] })
  ] });
}
const BADGES = [
  { icon: AwardIcon, label: "USCG CAPTAIN" },
  { icon: ShieldCheckIcon, label: "FIRST AID + CPR" },
  { icon: FishIcon, label: "40+ YEARS" }
];
function MeetCaptainSection() {
  return /* @__PURE__ */ jsx("section", { className: "overflow-hidden bg-night py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "05" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-cream/25" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-cream/50", children: "YOUR GUIDE" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.75rem,5.4vw,4.8rem)] uppercase leading-[0.88] text-cream", children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "Meet" }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-baseline gap-[0.28em]", children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Captain" }),
          /* @__PURE__ */ jsx("span", { children: "Ryan" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 max-w-xl space-y-5 text-[17px] leading-relaxed text-cream/60", children: [
        /* @__PURE__ */ jsx("p", { children: "With over 40 years of fishing experience across Oregon's waterways, Captain Ryan brings unparalleled expertise to every trip. A certified U.S. Coast Guard captain — first aid and CPR trained — safety is always first." }),
        /* @__PURE__ */ jsx("p", { children: "His passion is matched only by his commitment to client satisfaction. Patient with beginners, invaluable to experienced anglers, and always invested in your success on the water." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap items-center gap-x-8 gap-y-4", children: BADGES.map((badge) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsx(badge.icon, { className: "h-5 w-5 text-accent" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.18em] text-cream/80", children: badge.label })
      ] }, badge.label)) }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#",
          className: "group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110",
          children: [
            "Book Now",
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[500px]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rotate-[-2deg] rounded-[3px] border border-cream/10" }),
      /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] rotate-[4deg] overflow-hidden rounded-[3px] shadow-2xl shadow-black/40", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/rsw_1280h_1118.webp",
          alt: "Captain Ryan holding a Columbia River chinook",
          className: "h-full w-full object-cover"
        }
      ) })
    ] }) })
  ] }) });
}
const VESSELS = [
  {
    index: "01",
    tag: "FLAGSHIP",
    featured: true,
    title: "22-FT River Wild Sled",
    body: "Our flagship sled seats up to 4 anglers with ample gear and cooler space. State-of-the-art electronics for finding fish in any water.",
    specs: [
      { icon: UsersIcon, label: "4 PASSENGERS" },
      { icon: RulerIcon, label: "22 FEET" },
      { icon: BoltIcon, label: "150 HP MOTOR" },
      { icon: RadarIcon, label: "GARMIN LIVE SCOPE" }
    ]
  },
  {
    index: "02",
    tag: "SMALL-WATER",
    featured: false,
    title: "18-FT Clackacraft",
    body: "Spacious Clackamax with walk-around seating for three. Ideal for winter steelhead, fall chinook, and coho on smaller rivers.",
    specs: [
      { icon: UsersIcon, label: "3 PASSENGERS" },
      { icon: RulerIcon, label: "18 FEET" },
      { icon: AnchorIcon, label: "SHALLOW DRAFT" },
      { icon: MoveIcon, label: "WALK-AROUND" }
    ]
  }
];
function BoatOutline(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 400 150",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M150 55 L192 55 L216 92 L120 92 Z" }),
        /* @__PURE__ */ jsx("path", { d: "M70 92 L330 92 L298 120 L102 120 Z" }),
        /* @__PURE__ */ jsx("line", { x1: "48", y1: "133", x2: "352", y2: "133", strokeDasharray: "4 9" })
      ]
    }
  );
}
function VesselCard({ vessel }) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: `rounded-sm border bg-[#faf8f2] p-6 md:p-8 ${vessel.featured ? "border-accent" : "border-ink/12"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: vessel.index }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] tracking-[0.25em] text-ink/45", children: vessel.tag })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-6 flex aspect-[5/2] items-center justify-center bg-[#d9e1e2]", children: [
          /* @__PURE__ */ jsx(BoatOutline, { "aria-hidden": "true", className: "w-1/2 text-ink/35" }),
          /* @__PURE__ */ jsx("span", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-[0.25em] text-ink/40" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-6 font-display text-3xl uppercase leading-none text-ink", children: vessel.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed text-ink/55", children: vessel.body }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 grid grid-cols-2 gap-x-8", children: vessel.specs.map((spec) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 border-t border-ink/10 py-3.5",
            children: [
              /* @__PURE__ */ jsx(spec.icon, { className: "h-4 w-4 shrink-0 text-accent" }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.1em] text-ink/70", children: spec.label })
            ]
          },
          spec.label
        )) })
      ]
    }
  );
}
function FleetSection() {
  return /* @__PURE__ */ jsx("section", { className: "bg-paper py-24 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "06" }),
      /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" }),
      /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-ink/70", children: "THE FLEET" })
    ] }),
    /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.75rem,6vw,5.2rem)] uppercase leading-[0.9] text-ink", children: [
      /* @__PURE__ */ jsx("span", { className: "block", children: "Premium Fishing" }),
      /* @__PURE__ */ jsx("span", { className: "block leading-[0.9] text-accent", children: "vessels" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2", children: VESSELS.map((vessel) => /* @__PURE__ */ jsx(VesselCard, { vessel }, vessel.index)) })
  ] }) });
}
const LAUNCH_POINTS = [
  { id: "bonneville", name: "Bonneville Dam", coords: "45.64°N 121.94°W", x: 45.6445, y: -121.9406 },
  { id: "cascade", name: "Cascade Locks", coords: "45.67°N 121.90°W", x: 45.672, y: -121.8953 },
  { id: "dalles", name: "The Dalles", coords: "45.60°N 121.18°W", x: 45.601, y: -121.1837 },
  { id: "hood", name: "Hood River", coords: "45.71°N 121.52°W", x: 45.7107, y: -121.5238 },
  { id: "portland", name: "Portland", coords: "45.52°N 122.68°W", x: 45.5152, y: -122.6784 },
  { id: "astoria", name: "Astoria", coords: "46.19°N 123.83°W", x: 46.1879, y: -123.8313 }
];
function BoatRampsSection() {
  const [selected, setSelected] = useState("bonneville");
  const [mapActive, setMapActive] = useState(false);
  const selectRamp = (id) => {
    setSelected(id);
    setMapActive(false);
  };
  return /* @__PURE__ */ jsx("section", { className: "bg-night py-24 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1440px] px-6 md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "07" }),
      /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-cream/45", children: "LAUNCH POINTS" })
    ] }),
    /* @__PURE__ */ jsxs("h2", { className: "mt-5 flex items-baseline gap-[0.16em] font-display text-[clamp(3rem,6vw,5.2rem)] uppercase leading-[0.9] text-cream", children: [
      /* @__PURE__ */ jsx("span", { children: "Boat" }),
      /* @__PURE__ */ jsx("span", { className: "text-accent", children: "ramps" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-14", children: [
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-cream/10 border-b border-cream/10 lg:col-span-1", children: LAUNCH_POINTS.map((p) => {
        const active = p.id === selected;
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => selectRamp(p.id),
            className: "group flex w-full items-center justify-between py-5 text-left",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `font-display text-xl uppercase tracking-wide transition-colors duration-200 ${active ? "text-accent" : "text-cream group-hover:text-cream/70"}`,
                    children: p.name
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-[12px] tracking-[0.15em] text-cream/40", children: p.coords })
              ] }),
              /* @__PURE__ */ jsx(
                MapPinIcon,
                {
                  className: `h-5 w-5 shrink-0 transition-colors duration-200 ${active ? "text-accent" : "text-cream/40"}`
                }
              )
            ]
          }
        ) }, p.id);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-sm border border-cream/10 bg-[#06181a] lg:col-span-2 h-[400px] lg:h-[500px]", children: [
        LAUNCH_POINTS.map((p) => {
          const active = p.id === selected;
          return /* @__PURE__ */ jsx(
            "iframe",
            {
              className: `absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ease-in-out ${active ? "opacity-100 z-10" : "opacity-0 z-0"}`,
              style: {
                filter: "invert(100%) hue-rotate(180deg) sepia(20%) saturate(120%) brightness(70%) contrast(110%) hue-rotate(-10deg)",
                pointerEvents: active && mapActive ? "auto" : "none"
              },
              src: `https://maps.google.com/maps?q=${p.x},${p.y}&t=&z=12&ie=UTF8&iwloc=&output=embed`,
              allowFullScreen: true,
              loading: active ? "eager" : "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              title: `Map for ${p.name}`
            },
            p.id
          );
        }),
        !mapActive && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setMapActive(true),
            "aria-label": "Activate map to zoom and pan",
            className: "group absolute inset-0 z-20 flex items-end justify-center bg-transparent pb-6",
            children: /* @__PURE__ */ jsx("span", { className: "rounded-full bg-night/75 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-cream/85 uppercase backdrop-blur-sm transition-colors duration-200 group-hover:bg-night/90", children: "Click to interact" })
          }
        )
      ] })
    ] })
  ] }) });
}
const TESTIMONIALS = [
  {
    quote: '"One of the best guides in Oregon. Ryan is your guy hands down. One of the best people I know."',
    author: "KEEP_UPWITHJEN"
  },
  {
    quote: `"We hooked up early and caught our limits. My son lost three fish and was worried he'd go home empty-handed. Ryan reassured us that at tide change we'd get another chance. Ryan was right — Randy ended up catching the biggest fish, weighing in at 29 lb."`,
    author: "KATIE HEMINGWAY"
  },
  {
    quote: '"The perfect day on the water. Everything from the gear to the boat was top notch. Captain Ryan put us on the fish immediately and kept us there all day."',
    author: "MARK TOMLINSON"
  },
  {
    quote: '"An unforgettable experience! If you want to catch big fish and have a great time doing it, Catching Chrome is the only way to go."',
    author: "SARAH JENKINS"
  }
];
const AUTOPLAY_MS = 5e3;
function TestimonialsSection() {
  const n = TESTIMONIALS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef(null);
  const go = useCallback(
    (dir) => setActive((a) => (a + dir + n) % n),
    [n]
  );
  const goTo = useCallback((i) => setActive((i % n + n) % n), [n]);
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, n]);
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (dragStartX.current == null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    dragStartX.current = null;
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative z-10 overflow-hidden bg-paper py-24 md:py-28", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-6 text-center md:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "08" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-ink/70", children: "CLIENT LOG" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.75rem,5.5vw,4.8rem)] uppercase leading-[0.9] text-ink", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-baseline justify-center gap-[0.22em]", children: [
          /* @__PURE__ */ jsx("span", { children: "In Their" }),
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "own" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "Words" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg md:leading-relaxed", children: "Across every entry in the log, the same story surfaces: Captain Ryan doesn't just take you fishing, he puts you on fish. Guests come back season after season for his uncanny read of the tides, the top-notch boats and gear, and the calm, reassuring way he turns a slow morning into a 29-pound catch. From a first-timer's son to seasoned anglers, the verdict never changes. This is the crew the Pacific Northwest trusts on the water." })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "relative mt-14 flex touch-pan-y select-none items-center justify-center",
        onMouseEnter: () => setPaused(true),
        onMouseLeave: () => setPaused(false),
        onFocusCapture: () => setPaused(true),
        onBlurCapture: () => setPaused(false),
        onPointerDown,
        onPointerUp,
        children: /* @__PURE__ */ jsx("div", { className: "relative h-[24rem] w-full max-w-6xl sm:h-[22rem]", children: TESTIMONIALS.map((t, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const abs = Math.abs(rel);
          const isCenter = rel === 0;
          const isNeighbor = abs === 1;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-hidden": !isCenter,
              tabIndex: isCenter ? 0 : -1,
              onClick: () => !isCenter && goTo(i),
              style: {
                transform: `translate(-50%, -50%) translateX(${rel * 58}%) scale(${isCenter ? 1 : 0.82})`,
                opacity: isCenter ? 1 : isNeighbor ? 0.45 : 0,
                zIndex: 20 - abs,
                pointerEvents: abs <= 1 ? "auto" : "none",
                cursor: isCenter ? "default" : "pointer"
              },
              className: "absolute left-1/2 top-1/2 w-[86%] max-w-2xl text-left transition-[transform,opacity,filter] duration-700 ease-out will-change-transform motion-reduce:transition-none sm:w-[70%] md:w-[60%]",
              children: /* @__PURE__ */ jsxs("figure", { className: "flex h-[22rem] flex-col items-center justify-center rounded-[2.5rem] bg-white px-6 py-10 text-center shadow-2xl sm:h-[20rem] md:px-12", children: [
                /* @__PURE__ */ jsx(QuoteIcon, { className: "h-10 w-10 shrink-0 text-accent opacity-50" }),
                /* @__PURE__ */ jsx("blockquote", { className: "mt-6 overflow-hidden text-lg font-medium leading-relaxed text-ink/90 md:text-[1.45rem] md:leading-relaxed", children: t.quote }),
                /* @__PURE__ */ jsxs("figcaption", { className: "mt-8 flex items-center justify-center gap-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-accent" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[13px] font-bold uppercase tracking-[0.2em] text-ink/70", children: t.author })
                ] })
              ] })
            },
            i
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center justify-center gap-6", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => go(-1),
          "aria-label": "Previous testimonial",
          className: "flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-200 hover:border-accent hover:text-accent",
          children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 rotate-180" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5", children: TESTIMONIALS.map((_, i) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => goTo(i),
          "aria-label": `Go to testimonial ${i + 1}`,
          "aria-current": i === active,
          className: `h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-accent" : "w-2 bg-ink/25 hover:bg-ink/40"}`
        },
        i
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => go(1),
          "aria-label": "Next testimonial",
          className: "flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-200 hover:border-accent hover:text-accent",
          children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
const FAQS = [
  {
    q: "What's included in a guided trip?",
    a: "All rods, reels, tackle, bait, and safety gear are provided, along with cleaning and bagging of your catch. Just bring weather-appropriate clothing, a valid fishing license, and any food or drinks you want for the day."
  },
  {
    q: "Do I need a fishing license?",
    a: "Yes, every angler must carry a valid Oregon (or Washington, depending on the water) license with the appropriate tags. We are happy to point you to the nearest vendor or the online portal before your trip."
  },
  {
    q: "What should I bring?",
    a: "Dress in layers for the weather and bring polarized sunglasses, a hat, sunscreen, and rain gear in the cooler months. Non-slip footwear and a cooler for your catch are strongly recommended."
  },
  {
    q: "How many people can join a trip?",
    a: "Our flagship 22-ft sled comfortably fishes up to four anglers, while the 18-ft Clackacraft is ideal for groups of three. Larger parties can be split across multiple boats, just ask when you book."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, all major credit and debit cards, and digital wallets like Venmo and Zelle. A deposit is due at booking to lock in your date, with the balance settled on the day of your trip."
  },
  {
    q: "What's your cancellation policy?",
    a: "A deposit reserves your date. Cancellations made seven or more days out are fully refundable or reschedulable. Weather calls are made by the captain, safety first, and always come with a rain check."
  },
  {
    q: "Are trips kid-friendly?",
    a: "Absolutely. Warm-weather shad trips are perfect for kids and first-timers, with non-stop action on light gear. Let us know ages ahead of time so we can tailor the day to your group."
  }
];
function AccordionItem({
  faq,
  open,
  onToggle
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `overflow-hidden rounded-2xl border transition-all duration-300 ${open ? "border-accent/40 bg-white shadow-xl shadow-ink/5" : "border-ink/10 bg-white/60 hover:border-ink/20 hover:bg-white"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            "aria-expanded": open,
            className: "flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `font-display text-base uppercase tracking-wide transition-colors duration-300 md:text-lg ${open ? "text-accent" : "text-ink"}`,
                  children: faq.q
                }
              ),
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: `relative h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full transition-colors duration-300 ${open ? "bg-accent" : "bg-ink/70"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded-full transition-colors duration-300 ${open ? "bg-accent" : "bg-ink/70"}`
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `grid transition-all duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
            children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "px-6 pb-6 text-[15px] leading-relaxed text-ink/60 md:px-8", children: faq.a }) })
          }
        )
      ]
    }
  );
}
function FaqSection() {
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ jsx("section", { className: "bg-cream py-24 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-6 md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "09" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-ink/70", children: "FAQ" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.5rem,5vw,4.4rem)] uppercase leading-[0.9] text-ink", children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "Frequently" }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-baseline justify-center gap-[0.2em]", children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "asked" }),
          /* @__PURE__ */ jsx("span", { children: "Questions" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-ink/60", children: "Everything you need to know before you step aboard. Still have something on your mind? Give us a call, we're happy to help." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 space-y-3", children: FAQS.map((faq, i) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        faq,
        open: open === i,
        onToggle: () => setOpen(open === i ? -1 : i)
      },
      faq.q
    )) })
  ] }) });
}
function Home() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(WelcomeSection, {}),
      /* @__PURE__ */ jsx(CustomMerchSection, {}),
      /* @__PURE__ */ jsx(SignatureTripsSection, {}),
      /* @__PURE__ */ jsx(SeasonsSection, {}),
      /* @__PURE__ */ jsx(MeetCaptainSection, {}),
      /* @__PURE__ */ jsx(FleetSection, {}),
      /* @__PURE__ */ jsx(BoatRampsSection, {}),
      /* @__PURE__ */ jsx(TestimonialsSection, {}),
      /* @__PURE__ */ jsx(FaqSection, {})
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  Home as component
};
