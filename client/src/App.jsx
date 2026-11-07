import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Work from "./pages/Work.jsx";
import WorkDetail from "./pages/WorkDetail.jsx";
import Journey from "./pages/Journey.jsx";
import Awards from "./pages/Awards.jsx";
import Contact from "./pages/Contact.jsx";
import Expertise from "./pages/Expertise.jsx";

export default function App() {
  const location = useLocation();
  const [boot, setBoot] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {boot && (
        <div className="preloader">
          <div className="bar">Digital studio · Lahore</div>
          <h1>FAROOQ</h1>
        </div>
      )}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
