import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
function PhoneIcon(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" })
    }
  );
}
function FacebookIcon(props) {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.05-1.56-.14-2.86-.14C11.93 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z" }) });
}
function TikTokIcon(props) {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "M16.5 3c.26 2.06 1.42 3.3 3.5 3.44v2.42c-1.2.12-2.26-.27-3.5-1.02v6.05c0 3.08-2.28 5.11-5.2 5.11-2.66 0-4.8-1.97-4.8-4.77 0-2.9 2.32-4.86 5.2-4.72v2.52c-.36-.06-.74-.06-1.1.02-1.1.24-1.86 1.1-1.76 2.3.1 1.1 1 1.9 2.1 1.86 1.24-.04 2.06-.99 2.06-2.4V3h2.5z" }) });
}
function InstagramIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
        /* @__PURE__ */ jsx("circle", { cx: "17.5", cy: "6.5", r: "1", fill: "currentColor", stroke: "none" })
      ]
    }
  );
}
function QuoteIcon(props) {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" }) });
}
function MapPinIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
      ]
    }
  );
}
function UsersIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
        /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" }),
        /* @__PURE__ */ jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
        /* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
      ]
    }
  );
}
function RulerIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" }),
        /* @__PURE__ */ jsx("path", { d: "m14.5 12.5 2-2" }),
        /* @__PURE__ */ jsx("path", { d: "m11.5 9.5 2-2" }),
        /* @__PURE__ */ jsx("path", { d: "m8.5 6.5 2-2" }),
        /* @__PURE__ */ jsx("path", { d: "m17.5 15.5 2-2" })
      ]
    }
  );
}
function BoltIcon(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: /* @__PURE__ */ jsx("path", { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" })
    }
  );
}
function RadarIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "5" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor", stroke: "none" })
      ]
    }
  );
}
function AnchorIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "5", r: "3" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "22", x2: "12", y2: "8" }),
        /* @__PURE__ */ jsx("path", { d: "M5 12H2a10 10 0 0 0 20 0h-3" })
      ]
    }
  );
}
function MoveIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M5 9l-3 3 3 3" }),
        /* @__PURE__ */ jsx("path", { d: "M9 5l3-3 3 3" }),
        /* @__PURE__ */ jsx("path", { d: "M15 19l-3 3-3-3" }),
        /* @__PURE__ */ jsx("path", { d: "M19 9l3 3-3 3" }),
        /* @__PURE__ */ jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "2", x2: "12", y2: "22" })
      ]
    }
  );
}
function AwardIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "8", r: "6" }),
        /* @__PURE__ */ jsx("path", { d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" })
      ]
    }
  );
}
function ShieldCheckIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }),
        /* @__PURE__ */ jsx("path", { d: "m9 12 2 2 4-4" })
      ]
    }
  );
}
function FishIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" }),
        /* @__PURE__ */ jsx("path", { d: "M18 12v.5" }),
        /* @__PURE__ */ jsx("path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86" }),
        /* @__PURE__ */ jsx("path", { d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" }),
        /* @__PURE__ */ jsx("path", { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" }),
        /* @__PURE__ */ jsx("path", { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" })
      ]
    }
  );
}
function ArrowRight(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M5 12h14" }),
        /* @__PURE__ */ jsx("path", { d: "m13 6 6 6-6 6" })
      ]
    }
  );
}
function ArrowUpRight(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M7 17 17 7" }),
        /* @__PURE__ */ jsx("path", { d: "M8 7h9v9" })
      ]
    }
  );
}
const NAV_ITEMS = [
  "About Us",
  "Excursions",
  "Pricing",
  "Gallery",
  "Order Merch",
  "Contact"
];
const LOGO = "/Catching-Chrome-logo_color-1536x1533.png";
function SiteHeader() {
  return /* @__PURE__ */ jsx("header", { className: "absolute inset-x-0 top-0 z-30", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 pt-5 md:px-10", children: [
    /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: LOGO,
        alt: "Catching Chrome Guide Service",
        className: "h-14 w-auto object-contain drop-shadow-lg md:h-[4.5rem]"
      }
    ) }),
    /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-8 text-[13px] font-medium tracking-[0.16em] text-white/90 lg:flex", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsx(
      "a",
      {
        href: "#",
        className: "uppercase drop-shadow transition-colors duration-200 hover:text-white",
        children: item
      },
      item
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:5039369090",
          className: "hidden items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-[13px] tracking-wide text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 sm:flex",
          children: [
            /* @__PURE__ */ jsx(PhoneIcon, { className: "h-4 w-4" }),
            "(503) 936-9090"
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: [
        { Icon: FacebookIcon, label: "Facebook" },
        { Icon: InstagramIcon, label: "Instagram" },
        { Icon: TikTokIcon, label: "TikTok" }
      ].map(({ Icon, label }) => /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          "aria-label": label,
          className: "flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20",
          children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
        },
        label
      )) })
    ] })
  ] }) });
}
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
  return /* @__PURE__ */ jsx("section", { className: "bg-paper py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20", children: [
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
                style: { fontSize: "22vw" },
                children: "CUSTOM · CUSTOM · CUSTOM · CUSTOM"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "02" }),
              /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-cream/25" }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-cream/50", children: "CUSTOM MERCH" })
            ] }),
            /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.75rem,6.4vw,6rem)] uppercase leading-[0.86] text-cream", children: [
              /* @__PURE__ */ jsx("span", { className: "block", children: "Create Your" }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-baseline gap-[0.14em]", children: [
                /* @__PURE__ */ jsx("span", { children: "Custom" }),
                /* @__PURE__ */ jsx("span", { className: "text-accent", children: "merch" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "max-w-lg text-lg leading-relaxed text-cream/60", children: "Bring your ideas to life with high-quality custom merchandise tailored to your brand or personal style from apparel to promo products, quick and hassle-free." }),
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
function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "#120F17",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#120F17",
  borderColor = "#fff"
}) {
  return /* @__PURE__ */ jsx("div", { className: "menu-wrap", style: { backgroundColor: bgColor }, children: /* @__PURE__ */ jsx("nav", { className: "menu", children: items.map((item, idx) => /* @__PURE__ */ jsx(
    MenuItem,
    {
      ...item,
      speed,
      textColor,
      marqueeBgColor,
      marqueeTextColor,
      borderColor
    },
    idx
  )) }) });
}
function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);
  const gsapRef = useRef(null);
  const animationDefaults = { duration: 0.6, ease: "expo" };
  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };
  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };
  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector(".marquee__part");
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [text, image]);
  useEffect(() => {
    let cancelled = false;
    let timer = null;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      gsapRef.current = gsap;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = setTimeout(() => {
        const inner = marqueeInnerRef.current;
        if (!inner) return;
        const marqueeContent = inner.querySelector(".marquee__part");
        if (!marqueeContent) return;
        const contentWidth = marqueeContent.offsetWidth;
        if (contentWidth === 0) return;
        if (animationRef.current) {
          animationRef.current.kill();
        }
        animationRef.current = gsap.to(inner, {
          x: -contentWidth,
          duration: speed,
          ease: "none",
          repeat: -1
        });
      }, 50);
    });
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);
  const handleMouseEnter = (ev) => {
    const g = gsapRef.current;
    if (!g) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);
    g.timeline({ defaults: animationDefaults }).set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0).set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0).to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };
  const handleMouseLeave = (ev) => {
    const g = gsapRef.current;
    if (!g) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);
    g.timeline({ defaults: animationDefaults }).to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0).to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };
  return /* @__PURE__ */ jsxs("div", { className: "menu__item", ref: itemRef, style: { borderColor }, children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "menu__item-link",
        href: link,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: { color: textColor },
        children: text
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "marquee", ref: marqueeRef, style: { backgroundColor: marqueeBgColor }, children: /* @__PURE__ */ jsx("div", { className: "marquee__inner-wrap", children: /* @__PURE__ */ jsx("div", { className: "marquee__inner", ref: marqueeInnerRef, "aria-hidden": "true", children: [...Array(repetitions)].map((_, idx) => /* @__PURE__ */ jsxs("div", { className: "marquee__part", style: { color: marqueeTextColor }, children: [
      /* @__PURE__ */ jsx("span", { children: text }),
      /* @__PURE__ */ jsx("div", { className: "marquee__img", style: { backgroundImage: `url(${image})` } })
    ] }, idx)) }) }) })
  ] });
}
const TRIPS = [
  {
    index: "01",
    season: "AUG – OCT",
    title: "Fall Chinook",
    image: "/fallchinook.png",
    body: "Our best pure king fishery. Season opens in August and runs through late October — the most powerful, chrome-bright kings of the year."
  },
  {
    index: "02",
    season: "MID-MAR – MID-JUN",
    title: "Spring Chinook",
    image: "/summerchinook.png",
    body: "Columbia River spring chinook — prized worldwide for their flavor. Anglers travel across the country for this run."
  },
  {
    index: "03",
    season: "MID-MAY – MID-JUN",
    title: "American Shad",
    image: "/wintersteelhead.png",
    body: "Warm-weather, light-gear action. Non-stop bites make this the perfect trip for kids or first-time anglers."
  }
];
const DESTINATIONS = [
  { link: "#", text: "Columbia River", image: "/nature-river.jpg" },
  { link: "#", text: "Deschutes River", image: "/nature-mountain.jpg" },
  { link: "#", text: "Willamette River", image: "/nature-valley.jpg" },
  { link: "#", text: "Coastal Tributaries", image: "/nature-forest.jpg" }
];
function SignatureTripsSection() {
  return /* @__PURE__ */ jsx("section", { className: "bg-paper py-24 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1440px] px-6 md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "03" }),
      /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" }),
      /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-ink/70", children: "SIGNATURE TRIPS" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-[clamp(3rem,6.2vw,5.6rem)] uppercase leading-[0.9] text-ink", children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "Our Signature" }),
        /* @__PURE__ */ jsx("span", { className: "block leading-[0.85] text-accent", children: "trips" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-sm text-[17px] leading-relaxed text-ink/55 lg:mb-3", children: "Our most popular fishing adventures on Oregon's pristine waters — each one guided personally by Captain Ryan." })
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "mt-10 border-t border-ink/15" }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8", children: TRIPS.map((trip) => /* @__PURE__ */ jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 aspect-[4/3] w-full overflow-hidden rounded-sm", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: trip.image,
          alt: trip.title,
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-accent", children: trip.index }),
        /* @__PURE__ */ jsx("span", { className: "text-[11px] tracking-[0.2em] text-ink/45", children: trip.season })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-5 font-display text-4xl uppercase leading-none text-ink lg:text-[2.6rem]", children: trip.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm text-[15px] leading-relaxed text-ink/55", children: trip.body }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#",
          className: "mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:text-ink/60",
          children: [
            "Book Now",
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
          ]
        }
      )
    ] }, trip.index)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 flex justify-center md:mt-20", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "#",
        className: "group inline-flex items-center gap-4 rounded-full border border-ink/80 py-2 pl-8 pr-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:bg-ink/5",
        children: [
          "View All Excursions",
          /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cream", children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-24 w-full border-t border-ink/15 pt-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "03.B" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-ink/70", children: "DESTINATIONS" })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            height: "500px",
            position: "relative",
            width: "100%",
            borderRadius: "1rem",
            overflow: "hidden"
          },
          children: /* @__PURE__ */ jsx(
            FlowingMenu,
            {
              items: DESTINATIONS,
              bgColor: "#F7F6F2",
              textColor: "#0E2A3B",
              marqueeBgColor: "#167A8E",
              marqueeTextColor: "#F7F6F2",
              borderColor: "#B9C4CC"
            }
          )
        }
      )
    ] })
  ] }) });
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
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "04" }),
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
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "05" }),
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
  { id: "bonneville", name: "Bonneville Dam", coords: "45.64°N 121.94°W", x: 455, y: 215 },
  { id: "cascade", name: "Cascade Locks", coords: "45.67°N 121.90°W", x: 95, y: 135 },
  { id: "dalles", name: "The Dalles", coords: "45.60°N 121.18°W", x: 545, y: 190 },
  { id: "hood", name: "Hood River", coords: "45.71°N 121.52°W", x: 490, y: 172 },
  { id: "portland", name: "Portland", coords: "45.52°N 122.68°W", x: 240, y: 268 },
  { id: "astoria", name: "Astoria", coords: "46.19°N 123.83°W", x: 610, y: 235 }
];
const TEAL_RIVER = "M-10 240 C 120 200 230 258 350 262 C 470 266 560 322 690 340 C 725 345 760 346 775 347";
const GREY_RIVER = "M-10 253 C 120 213 230 271 350 275 C 470 279 560 335 690 353 C 725 358 760 359 775 360";
function BoatRampsSection() {
  const [selected, setSelected] = useState("bonneville");
  return /* @__PURE__ */ jsx("section", { className: "bg-night py-24 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1440px] px-6 md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "06" }),
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
            onClick: () => setSelected(p.id),
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
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-sm border border-cream/10 bg-[#06181a] lg:col-span-2", children: [
        /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 760 460", "aria-hidden": "true", className: "block w-full", children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
            "pattern",
            {
              id: "mapgrid",
              width: "38",
              height: "38",
              patternUnits: "userSpaceOnUse",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M38 0H0V38",
                  fill: "none",
                  stroke: "rgba(236,230,214,0.06)",
                  strokeWidth: "1"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("rect", { width: "760", height: "460", fill: "url(#mapgrid)" }),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: GREY_RIVER,
              fill: "none",
              stroke: "#98a2a1",
              strokeOpacity: "0.55",
              strokeWidth: "3"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: TEAL_RIVER,
              fill: "none",
              stroke: "#3f8296",
              strokeWidth: "3"
            }
          ),
          LAUNCH_POINTS.map((p) => {
            const active = p.id === selected;
            return /* @__PURE__ */ jsxs(
              "g",
              {
                onClick: () => setSelected(p.id),
                style: { cursor: "pointer" },
                children: [
                  /* @__PURE__ */ jsx("circle", { cx: p.x, cy: p.y, r: "18", fill: "transparent" }),
                  active && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: p.x,
                        y: p.y - 20,
                        textAnchor: "middle",
                        fill: "#ece6d6",
                        fontSize: "11",
                        letterSpacing: "1.5",
                        fontFamily: "Inter, sans-serif",
                        children: p.name.toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "circle",
                      {
                        cx: p.x,
                        cy: p.y,
                        r: "13",
                        fill: "none",
                        stroke: "#e89a2b",
                        strokeOpacity: "0.4"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx: p.x,
                      cy: p.y,
                      r: active ? 7 : 5,
                      fill: active ? "#e89a2b" : "#ffffff",
                      stroke: active ? "#ffffff" : "rgba(255,255,255,0.3)",
                      strokeWidth: active ? 2 : 1.5
                    }
                  )
                ]
              },
              p.id
            );
          })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-5 top-4 text-[11px] tracking-[0.25em] text-cream/40", children: "OREGON · PNW" }),
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute bottom-4 right-5 text-[11px] tracking-[0.25em] text-cream/40" })
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
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "bg-paper py-24 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "07" }),
      /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-ink/30" }),
      /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-ink/70", children: "CLIENT LOG" })
    ] }),
    /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.75rem,5.5vw,4.8rem)] uppercase leading-[0.9] text-ink", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-baseline gap-[0.22em]", children: [
        /* @__PURE__ */ jsx("span", { children: "In Their" }),
        /* @__PURE__ */ jsx("span", { className: "text-accent", children: "own" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "block", children: "Words" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mt-16 min-h-[320px] sm:min-h-[260px]", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxs(
      "figure",
      {
        "aria-hidden": i !== active,
        className: `mx-auto max-w-3xl text-center transition-opacity duration-700 ease-in-out ${i === active ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`,
        children: [
          /* @__PURE__ */ jsx(QuoteIcon, { className: "mx-auto h-9 w-9 text-accent" }),
          /* @__PURE__ */ jsx("blockquote", { className: "mt-6 text-2xl leading-relaxed text-ink/85 md:text-[1.7rem] md:leading-relaxed", children: t.quote }),
          /* @__PURE__ */ jsxs("figcaption", { className: "mt-8 flex items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-8 bg-accent" }),
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold uppercase tracking-[0.2em] text-ink/60", children: t.author })
          ] })
        ]
      },
      t.author
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center gap-2.5", children: TESTIMONIALS.map((_, i) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setActive(i),
        "aria-label": `Show testimonial ${i + 1}`,
        className: `h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-accent" : "w-4 bg-ink/20 hover:bg-ink/40"}`
      },
      i
    )) })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-ink py-12 md:py-16 text-cream", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1440px] px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center md:items-start gap-4", children: /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center", children: /* @__PURE__ */ jsx("img", { src: "/Catching-Chrome-logo_color-1536x1533.png", alt: "Catching Chrome", className: "h-20 w-auto object-contain" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-end gap-6", children: [
        /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-6 text-[13px] font-medium tracking-[0.18em] text-cream/80", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "uppercase transition-colors duration-200 hover:text-cream", children: "About" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "uppercase transition-colors duration-200 hover:text-cream", children: "Excursions" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "uppercase transition-colors duration-200 hover:text-cream", children: "Contact" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:5039369090",
              className: "flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[13px] tracking-wide text-cream transition-colors duration-200 hover:border-cream/60",
              children: [
                /* @__PURE__ */ jsx(PhoneIcon, { className: "h-4 w-4" }),
                "(503) 936-9090"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-cream/80", children: [
            /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Facebook", className: "transition-colors duration-200 hover:text-cream", children: /* @__PURE__ */ jsx(FacebookIcon, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Instagram", className: "transition-colors duration-200 hover:text-cream", children: /* @__PURE__ */ jsx(InstagramIcon, { className: "h-4 w-4" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1440px] px-6 md:px-10 mt-12 pt-6 border-t border-cream/10 text-center text-[11px] tracking-[0.1em] text-cream/40", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Catching Chrome Guide Service. All rights reserved."
    ] })
  ] });
}
function Home() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(WelcomeSection, {}),
      /* @__PURE__ */ jsx(CustomMerchSection, {}),
      /* @__PURE__ */ jsx(SignatureTripsSection, {}),
      /* @__PURE__ */ jsx(MeetCaptainSection, {}),
      /* @__PURE__ */ jsx(FleetSection, {}),
      /* @__PURE__ */ jsx(BoatRampsSection, {}),
      /* @__PURE__ */ jsx(TestimonialsSection, {})
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  Home as component
};
