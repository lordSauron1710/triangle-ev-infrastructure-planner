import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const V0CaseStudy = lazy(() => import("../versions/v0/V0CaseStudy"));
const V1Planner = lazy(() => import("../versions/v1/V1Planner"));

function ScrollToLocation() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView();
      });
      return;
    }

    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return null;
}

function RouteFallback() {
  return (
    <main className="route-fallback" aria-live="polite">
      Loading case study…
    </main>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <p>That page is not part of this case study.</p>
      <Link to="/v0">Open the capacity model</Link>
      <Link to="/v1">Open the interactive planner</Link>
    </main>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToLocation />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<V1Planner />} />
          <Route path="/v0" element={<V0CaseStudy />} />
          <Route path="/v1" element={<V1Planner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
