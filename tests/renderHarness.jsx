import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "../src/context/LanguageContext";
import Home from "../src/pages/Home";
import Collection from "../src/pages/Collection";
import Pricing from "../src/pages/Pricing";
import ContactPage from "../src/pages/ContactPage";
import AboutPage from "../src/pages/AboutPage";
import Calculator from "../src/pages/Calculator";
import Legal from "../src/pages/Legal";
import NotFound from "../src/pages/NotFound";
import SiteLayout from "../src/components/SiteLayout";
const pages = {
  Home,
  Collection,
  Pricing,
  ContactPage,
  AboutPage,
  Calculator,
  Legal,
  NotFound,
};
export function renderPage(name, path, props, route) {
  const Page = pages[name];
  return renderToString(
    <HelmetProvider context={{}}>
      <LanguageProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path={route} element={<Page {...props} />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </LanguageProvider>
    </HelmetProvider>,
  );
}
