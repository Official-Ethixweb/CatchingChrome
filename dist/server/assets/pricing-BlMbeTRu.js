import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as ArrowUpRight, P as PhoneIcon, S as SiteFooter, a as SiteHeader } from "./SiteFooter-DBOpWQqm.js";
import { useState, useRef, useEffect } from "react";
import "@tanstack/react-router";
const PRICING_ITEMS = [
  {
    name: "Salmon Trips",
    price: "Full Day $250 / Half Day $175",
    subtext: "Targeting hard-fighting Chinook and Coho on the Columbia and coastal rivers."
  },
  {
    name: "Steelhead Trips",
    price: "$200 / person",
    subtext: "Chasing legendary winter and summer runs with light tackle or fly rods."
  },
  {
    name: "Shad & Crabbing Trips",
    price: "Call for pricing",
    subtext: "Non-stop action for the family, or ocean-fresh crabbing on the bays.",
    isCallForPricing: true
  },
  {
    name: "Booking Deposit",
    price: "$50 / person",
    subtext: "Required to reserve your date. Remaining balance settled on the day of the trip."
  }
];
function PricingRow({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(200);
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  const rodX = 28;
  const rodY = isHovered ? 14 : 8;
  const hookX = width - 12;
  const hookY = isHovered ? 21 : 16;
  const pathD = isHovered ? `M ${rodX} ${rodY} L ${hookX} ${hookY}` : `M ${rodX} ${rodY} Q ${rodX + (hookX - rodX) * 0.45} ${rodY + 28} ${hookX} ${hookY}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group flex flex-col justify-between py-6 border-b border-cream/10 md:flex-row md:items-center cursor-pointer",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "md:max-w-[35%] shrink-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-xl uppercase tracking-wide text-cream transition-colors duration-300 group-hover:text-accent md:text-2xl", children: item.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-cream/50 leading-relaxed", children: item.subtext })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: containerRef,
            className: "hidden md:block flex-1 relative h-12 mx-6 overflow-visible",
            children: [
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  width: "36",
                  height: "36",
                  viewBox: "0 0 36 36",
                  fill: "none",
                  className: "absolute left-0 bottom-1 pointer-events-none",
                  children: [
                    /* @__PURE__ */ jsx("path", { d: "M 3 33 L 10 26", stroke: "#C4A484", strokeWidth: "4.5", strokeLinecap: "round" }),
                    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "27", r: "4.5", fill: "#7F8C8D", stroke: "#0E2A3B", strokeWidth: "1.5" }),
                    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "27", r: "2", fill: "#BDC3C7" }),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: isHovered ? "M 9 27 Q 20 22 28 14" : "M 9 27 L 28 8",
                        stroke: "#BDC3C7",
                        strokeWidth: "2.2",
                        strokeLinecap: "round",
                        className: "transition-all duration-300"
                      }
                    ),
                    /* @__PURE__ */ jsx("circle", { cx: "16", cy: "20", r: "1.5", stroke: "#F5A623", strokeWidth: "1" }),
                    /* @__PURE__ */ jsx("circle", { cx: "22", cy: "14", r: "1", stroke: "#F5A623", strokeWidth: "1" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "absolute inset-0 w-full h-full pointer-events-none overflow-visible", children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: pathD,
                  stroke: isHovered ? "#F5A623" : "#B9C4CC",
                  strokeWidth: isHovered ? "1.8" : "1",
                  fill: "none",
                  className: `transition-all duration-300 ${isHovered ? "animate-line-shudder" : ""}`,
                  strokeDasharray: isHovered ? "none" : "2 2"
                }
              ) }),
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  width: "16",
                  height: "24",
                  viewBox: "0 0 16 24",
                  fill: "none",
                  style: {
                    position: "absolute",
                    left: `${width - 20}px`,
                    top: `${hookY - 3}px`
                  },
                  className: `pointer-events-none transition-all duration-300 text-cream/70 group-hover:text-accent ${isHovered ? "animate-hook-bob" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx("circle", { cx: "8", cy: "3", r: "2.5", stroke: "currentColor", strokeWidth: "1.5" }),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M 8 5.5 V 17 C 8 20.5 5 22.5 2 20.5 C 0.5 19.5 0 17.5 0 16.5 L 1.8 15.5",
                        stroke: "currentColor",
                        strokeWidth: "1.8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    ),
                    /* @__PURE__ */ jsx("circle", { cx: "8", cy: "9", r: "2", fill: "#E74C3C", className: "group-hover:fill-accent" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-4 md:mt-0 shrink-0 text-left md:text-right", children: item.isCallForPricing ? /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:5039369090",
            className: "inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-5 py-2 text-[14px] font-bold tracking-wider text-accent transition-all duration-300 hover:bg-accent hover:text-ink",
            children: [
              /* @__PURE__ */ jsx(PhoneIcon, { className: "h-4 w-4" }),
              item.price
            ]
          }
        ) : /* @__PURE__ */ jsx("div", { className: "font-display text-xl text-accent transition-all duration-300 group-hover:scale-105 md:text-2xl", children: item.price }) })
      ]
    }
  );
}
function PricingSection() {
  return /* @__PURE__ */ jsxs("section", { id: "pricing", className: "relative overflow-hidden bg-ink py-24 md:py-28", children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes lineShudder {
          0%, 100% { transform: translateY(0) scaleY(1); }
          25% { transform: translateY(-0.8px) skewX(0.2deg); }
          50% { transform: translateY(1.2px) scaleY(0.99); }
          75% { transform: translateY(-0.4px) skewX(-0.1deg); }
        }
        @keyframes hookBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(4px) rotate(-4deg); }
        }
        .animate-line-shudder {
          animation: lineShudder 0.14s linear infinite;
        }
        .animate-hook-bob {
          animation: hookBob 0.5s ease-in-out infinite;
        }
      ` }),
    /* @__PURE__ */ jsx("div", { className: "hero-lines absolute inset-0 pointer-events-none opacity-40" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -left-64 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -right-64 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/5 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[1440px] px-6 md:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "07" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-cream/25" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-cream/50", children: "PRICING OPTIONS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-display text-[clamp(2.75rem,6vw,5.2rem)] uppercase leading-[0.9] text-cream", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "Fair Rates," }),
          /* @__PURE__ */ jsx("span", { className: "block leading-[0.9] text-accent", children: "No Hidden Fees" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-md text-base leading-relaxed text-cream/60 lg:mb-2", children: "Choose your next Pacific Northwest adventure. All gear, bait, and clean-up are fully covered." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-2", children: PRICING_ITEMS.map((item, idx) => /* @__PURE__ */ jsx(PricingRow, { item, index: idx }, item.name)) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-sm border border-cream/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm shadow-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -translate-y-1/2 translate-x-3 rounded-full bg-accent px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink", children: "Booking Info" }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-lg uppercase tracking-wide text-cream", children: "Trip Policies" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-6 text-sm leading-relaxed text-cream/70", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-accent uppercase tracking-wider text-[11px]", children: "Deposit & Payment" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-cream/60 leading-relaxed", children: "A $50 deposit per person is required to secure your booking date. The remaining balance is due on the day of your trip." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-cream/10" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-accent uppercase tracking-wider text-[11px]", children: "Cancelation Policy" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-cream/60 leading-relaxed", children: "Cancel 14+ days in advance for a full refund or to reschedule. Cancellations made within 14 days forfeit the deposit." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-cream/10" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-accent uppercase tracking-wider text-[11px]", children: "Captain's Guarantee" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-cream/60 leading-relaxed", children: "If the captain has to cancel due to weather, river safety conditions, or unforeseen events, you receive a full refund or rescheduling options." })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 flex flex-col items-center justify-center gap-6 rounded-sm border border-cream/5 bg-white/[0.01] p-8 text-center md:flex-row md:justify-between md:text-left", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-display text-xl uppercase text-cream", children: "Ready to lock in your dates?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-cream/55", children: "Calendar fills up fast during peak salmon and steelhead runs." })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:5039369090",
            className: "group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110",
            children: [
              "Book Your Trip Now",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function PricingHeader() {
  return /* @__PURE__ */ jsxs("section", { className: "relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx("img", { src: "/nature-river.jpg", alt: "River background", className: "absolute inset-0 h-full w-full object-cover object-center opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink" })
    ] }),
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]", children: "Pricing" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-accent" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-[12px] text-cream/70 font-semibold tracking-[0.25em] uppercase", children: "Guided Trips & Rates" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-accent" })
      ] })
    ] })
  ] });
}
function PricingPage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PricingHeader, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(PricingSection, {}) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  PricingPage as component
};
