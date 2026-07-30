import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from '../common/BackToTop';

function Layout() {
  return (
    <div className="app-layout">
      {/* Skip to Main Content accessibility link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Navbar />
      
      <main id="main-content" className="app-main" tabIndex="-1">
        <Outlet />
      </main>
      
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default Layout;
