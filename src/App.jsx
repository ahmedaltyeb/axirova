import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";
import SiteLayout from "./components/SiteLayout";
import useRichEffects from "./hooks/useRichEffects";
import Home from "./pages/Home";
const Collection = lazy(() => import("./pages/Collection"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/ContactPage"));
const About = lazy(() => import("./pages/AboutPage"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cursor = lazy(() => import("./components/Cursor"));
const Router =
  import.meta.env.VITE_GH_PAGES === "true" ? HashRouter : BrowserRouter;
function AppRoutes() {
  const rich = useRichEffects();
  return (
    <>
      {rich && (
        <Suspense fallback={null}>
          <Cursor />
        </Suspense>
      )}
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          {["services", "products", "industries", "work", "insights"].map(
            (type) => (
              <React.Fragment key={type}>
                <Route path={type} element={<Collection type={type} />} />
                <Route
                  path={`${type}/:slug`}
                  element={<Collection type={type} />}
                />
              </React.Fragment>
            ),
          )}
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="request-demo" element={<Contact demo />} />
          <Route path="about" element={<About />} />
          <Route path="calculator" element={<Calculator />} />
          {["privacy", "terms"].map((type) => (
            <Route key={type} path={type} element={<Legal type={type} />} />
          ))}
          <Route path="blog" element={<Navigate replace to="/insights" />} />
          <Route
            path="case-studies"
            element={<Navigate replace to="/work" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <AppRoutes />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}
