import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import TeamPage from "@/pages/TeamPage";
import News from "@/pages/News";
import FaqPage from "@/pages/FaqPage";
import Contact from "@/pages/Contact";
import Referrals from "@/pages/Referrals";
import Policies from "@/pages/Policies";
import TestimonialsPage from "@/pages/TestimonialsPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/news" element={<News />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/referrals" element={<Referrals />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
