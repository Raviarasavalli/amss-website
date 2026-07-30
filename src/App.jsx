import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Loader from './components/common/Loader';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy-loaded page routes for code splitting and fast initial page load
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Activities = lazy(() => import('./pages/Activities'));
const Team = lazy(() => import('./pages/Team'));
const Celebrate = lazy(() => import('./pages/Celebrate'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      {/* Scroll to top on route change */}
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="activities" element={<Activities />} />
            <Route path="team" element={<Team />} />
            <Route path="celebrate" element={<Celebrate />} />
            <Route path="sponsor" element={<Contact />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
