import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { S as SiteFooter, a as SiteHeader } from "./SiteFooter-DBOpWQqm.js";
import { S as SignatureTripsSection } from "./SignatureTripsSection-ChiZzIDH.js";
import "@tanstack/react-router";
import "react";
function ExcursionsHeader() {
  return /* @__PURE__ */ jsxs("section", { className: "relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx("img", { src: "/nature-river.jpg", alt: "River boat view backdrop", className: "absolute inset-0 h-full w-full object-cover object-center opacity-45" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink" })
    ] }),
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]", children: "Excursions" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-accent" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-[12px] text-cream/70 font-semibold tracking-[0.25em] uppercase", children: "Signature Guided Trips" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-accent" })
      ] })
    ] })
  ] });
}
function ExcursionsPage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ExcursionsHeader, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(SignatureTripsSection, { className: "bg-white" }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  ExcursionsPage as component
};
