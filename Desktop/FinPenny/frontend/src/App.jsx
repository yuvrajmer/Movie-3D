import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Essentials from './pages/Essentials.jsx';
import Contact from './pages/Contact.jsx';
import MutualFunds from './components/services/MutualFunds.jsx';
import SIPPlanning from './components/services/SIPPlanning';
import ELSS from './components/services/ELSS.jsx';
import GoalBasedInvestments from './components/services/GoalBasedInvestments.jsx';
import Disclaimer from './components/footermenu/Disclaimer.jsx';
import PrivacyPolicy from './components/footermenu/PrivacyPolicy.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen flex flex-col bg-white">
        <ScrollToTop />
        <TopBar />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/essentials" element={<Essentials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mutual-funds" element={<MutualFunds />} />
            <Route path="/sip-planning" element={<SIPPlanning />} />
            <Route path="/elss-tax-saving" element={<ELSS />} />
            <Route path="/goal-based-investments" element={<GoalBasedInvestments />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* ── Blog Routes ── */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
