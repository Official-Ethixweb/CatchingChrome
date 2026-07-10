import { jsx, jsxs } from "react/jsx-runtime";
import { A as ArrowUpRight, b as ArrowRight } from "./SiteFooter-DBOpWQqm.js";
import { useRef, useEffect, useState } from "react";
function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "#120F17",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#120F17",
  borderColor = "#fff"
}) {
  const menuRef = useRef(null);
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!menuRef.current) return;
        const items2 = menuRef.current.querySelectorAll(".menu__item");
        if (!items2.length) return;
        gsap.fromTo(
          items2,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: menuRef.current,
              start: "top 85%",
              once: true
            }
          }
        );
      });
    });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "menu-wrap", style: { backgroundColor: bgColor }, ref: menuRef, children: /* @__PURE__ */ jsx("nav", { className: "menu", children: items.map((item, idx) => /* @__PURE__ */ jsx(
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
function SignatureTripsSection({ className = "bg-paper" } = {}) {
  return /* @__PURE__ */ jsx("section", { id: "excursions", className: `${className} py-24 md:py-28`, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1440px] px-6 md:px-10", children: [
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
export {
  SignatureTripsSection as S
};
