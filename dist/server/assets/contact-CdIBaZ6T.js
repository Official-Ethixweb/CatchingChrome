import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { S as SiteFooter, a as SiteHeader, P as PhoneIcon, M as MapPinIcon, F as FacebookIcon, I as InstagramIcon, T as TikTokIcon } from "./SiteFooter-DBOpWQqm.js";
import { useState } from "react";
import "@tanstack/react-router";
function ContactHeader() {
  return /* @__PURE__ */ jsxs("section", { className: "relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx("img", { src: "/nature-forest.jpg", alt: "Forest backdrop", className: "absolute inset-0 h-full w-full object-cover object-center opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink" })
    ] }),
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]", children: "Contact" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-accent" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-[12px] text-cream/70 font-semibold tracking-[0.25em] uppercase", children: "Let's get you on the water" }),
        /* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-accent" })
      ] })
    ] })
  ] });
}
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tripType: "Salmon",
    groupSize: "2",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-ink py-20 md:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "hero-lines absolute inset-0 pointer-events-none opacity-40" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -left-64 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -right-64 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/5 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto max-w-[1440px] px-6 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent", children: "08" }),
          /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-cream/25" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium tracking-[0.3em] text-cream/50", children: "GET IN TOUCH" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-[clamp(2.75rem,5.5vw,4.8rem)] uppercase leading-[0.9] text-cream", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "Plan Your" }),
          /* @__PURE__ */ jsx("span", { className: "block text-accent", children: "excursion" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-lg text-[16px] leading-relaxed text-cream/60", children: "Have questions about run seasons, current conditions, group sizing, or custom multi-boat charters? Feel free to reach out using the form, or contact Captain Ryan directly by phone or email. We are happy to walk you through everything you need to know." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 space-y-6", children: [
          /* @__PURE__ */ jsxs("a", { href: "tel:5039369090", className: "group flex items-center gap-4 text-base text-cream/80 hover:text-cream transition-colors", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/[0.02] text-accent transition-all group-hover:border-accent group-hover:bg-accent/5", children: /* @__PURE__ */ jsx(PhoneIcon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider text-cream/40", children: "Call Captain Ryan" }),
              /* @__PURE__ */ jsx("div", { className: "font-medium mt-0.5 transition-colors group-hover:text-accent", children: "(503) 936-9090" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "mailto:ryanbfishin@gmail.com", className: "group flex items-center gap-4 text-base text-cream/80 hover:text-cream transition-colors", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/[0.02] text-accent transition-all group-hover:border-accent group-hover:bg-accent/5", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: "h-5 w-5", children: [
              /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
              /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider text-cream/40", children: "Email Us" }),
              /* @__PURE__ */ jsx("div", { className: "font-medium mt-0.5 transition-colors group-hover:text-accent", children: "ryanbfishin@gmail.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-base text-cream/80", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/[0.02] text-accent", children: /* @__PURE__ */ jsx(MapPinIcon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider text-cream/40", children: "Home Port & Waters" }),
              /* @__PURE__ */ jsx("div", { className: "font-medium mt-0.5", children: "Columbia River & Coastal Streams, Oregon" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t border-cream/10 pt-8", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-cream/40", children: "Follow Captain Ryan" }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-3", children: [{
            Icon: FacebookIcon,
            label: "Facebook",
            href: "#"
          }, {
            Icon: InstagramIcon,
            label: "Instagram",
            href: "#"
          }, {
            Icon: TikTokIcon,
            label: "TikTok",
            href: "#"
          }].map(({
            Icon,
            label,
            href
          }) => /* @__PURE__ */ jsx("a", { href, "aria-label": label, className: "flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-white/[0.02] text-cream/70 transition-all hover:border-accent hover:bg-accent hover:text-ink", children: /* @__PURE__ */ jsx(Icon, { className: "h-4.5 w-4.5" }) }, label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "relative rounded-sm border border-cream/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm shadow-2xl", children: submitted ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center py-16", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.5, className: "h-8 w-8 animate-pulse", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-6 font-display text-2xl uppercase tracking-wide text-cream", children: "Message Sent!" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 max-w-sm text-sm text-cream/60 leading-relaxed", children: [
          "Thanks for reaching out, ",
          formData.name,
          ". Captain Ryan will review your request and get back to you via email or phone within 24 hours."
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            tripType: "Salmon",
            groupSize: "2",
            message: ""
          });
        }, className: "mt-8 text-xs font-bold uppercase tracking-[0.2em] text-accent border-b border-accent pb-1 hover:text-accent/80 transition-colors", children: "Send another message" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-lg uppercase tracking-wide text-cream mb-6", children: "Request a Trip / Ask a Question" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-[11px] font-bold uppercase tracking-wider text-cream/50 mb-2", children: "Your Name" }),
              /* @__PURE__ */ jsx("input", { type: "text", id: "name", required: true, value: formData.name, onChange: (e) => setFormData({
                ...formData,
                name: e.target.value
              }), placeholder: "John Doe", className: "w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-[11px] font-bold uppercase tracking-wider text-cream/50 mb-2", children: "Email Address" }),
              /* @__PURE__ */ jsx("input", { type: "email", id: "email", required: true, value: formData.email, onChange: (e) => setFormData({
                ...formData,
                email: e.target.value
              }), placeholder: "john@example.com", className: "w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-[11px] font-bold uppercase tracking-wider text-cream/50 mb-2", children: "Phone Number" }),
              /* @__PURE__ */ jsx("input", { type: "tel", id: "phone", required: true, value: formData.phone, onChange: (e) => setFormData({
                ...formData,
                phone: e.target.value
              }), placeholder: "(503) 555-0199", className: "w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "tripType", className: "block text-[11px] font-bold uppercase tracking-wider text-cream/50 mb-2", children: "Trip Interest" }),
              /* @__PURE__ */ jsxs("select", { id: "tripType", value: formData.tripType, onChange: (e) => setFormData({
                ...formData,
                tripType: e.target.value
              }), className: "w-full bg-[#0E2A3B] border border-cream/10 rounded-sm px-4 py-3 text-cream/80 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm", children: [
                /* @__PURE__ */ jsx("option", { value: "Salmon", children: "Salmon Fishing (Peak: Spring/Fall)" }),
                /* @__PURE__ */ jsx("option", { value: "Steelhead", children: "Steelhead (Peak: Winter/Summer)" }),
                /* @__PURE__ */ jsx("option", { value: "Shad", children: "Shad & Crabbing (Family Action)" }),
                /* @__PURE__ */ jsx("option", { value: "Other", children: "Custom Excursion / Charter" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "groupSize", className: "block text-[11px] font-bold uppercase tracking-wider text-cream/50 mb-2", children: "Group Size" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 sm:gap-3", children: ["1", "2", "3", "4", "5+"].map((num) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setFormData({
              ...formData,
              groupSize: num
            }), className: `flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-sm border transition-all ${formData.groupSize === num ? "border-accent bg-accent text-ink" : "border-cream/10 bg-white/[0.02] text-cream/70 hover:border-cream/20"}`, children: num }, num)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "message", className: "block text-[11px] font-bold uppercase tracking-wider text-cream/50 mb-2", children: [
              "Preferred Dates or Message",
              /* @__PURE__ */ jsx("span", { className: "text-cream/30 font-normal lowercase ml-1", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsx("textarea", { id: "message", rows: 4, value: formData.message, onChange: (e) => setFormData({
              ...formData,
              message: e.target.value
            }), placeholder: "Let us know when you'd like to fish and if you have any questions...", className: "w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm resize-none" })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "group w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110", children: [
            "Send Message",
            /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5", children: [
              /* @__PURE__ */ jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
              /* @__PURE__ */ jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
            ] })
          ] })
        ] })
      ] }) }) })
    ] }) })
  ] });
}
function ContactPage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ContactHeader, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(ContactSection, {}) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  ContactPage as component
};
