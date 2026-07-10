import { createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const appCss = "/assets/styles-CVNxgz82.css";
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Catching Chrome — PNW Guide Service" },
      {
        name: "description",
        content: "Expert-guided fishing excursions on Oregon and the Pacific Northwest's most pristine waters."
      },
      { name: "theme-color", content: "#0E2A3B" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Catching Chrome" },
      {
        property: "og:title",
        content: "Catching Chrome — PNW Guide Service"
      },
      {
        property: "og:description",
        content: "Expert-guided fishing excursions on Oregon and the Pacific Northwest's most pristine waters."
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Catching Chrome — PNW Guide Service"
      },
      {
        name: "twitter:description",
        content: "Expert-guided fishing excursions on Oregon and the Pacific Northwest's most pristine waters."
      }
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/Catching-Chrome-logo_color-1536x1533.png"
      },
      {
        rel: "apple-touch-icon",
        href: "/Catching-Chrome-logo_color-1536x1533.png"
      },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./pricing-BlMbeTRu.js");
const Route$3 = createFileRoute("/pricing")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./excursions-yiKE8Fio.js");
const Route$2 = createFileRoute("/excursions")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./contact-CdIBaZ6T.js");
const Route$1 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BFKY5yv3.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PricingRoute = Route$3.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$4
});
const ExcursionsRoute = Route$2.update({
  id: "/excursions",
  path: "/excursions",
  getParentRoute: () => Route$4
});
const ContactRoute = Route$1.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  ContactRoute,
  ExcursionsRoute,
  PricingRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent"
  });
  return router;
}
export {
  getRouter
};
