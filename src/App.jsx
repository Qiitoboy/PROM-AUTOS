import React, { useRef } from "react";
import HeroSection from "./components/HeroSection";
import Car from "./pages/Car";
import About from "./pages/About";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";

const App = () => {
  // Create refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const carsRef = useRef(null);
  const blogRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ✅ Make sure the entire page takes full height */}
      <div className="h-screen flex flex-col">
        {/* ✅ This pushes the footer down */}
        <main className="flex-grow">
          <HeroSection
            scrollToSection={scrollToSection}
            homeRef={homeRef}
            aboutRef={aboutRef}
            carsRef={carsRef}
            blogRef={blogRef}
          />

          <section ref={carsRef} className="min-h-screen bg-gray-100">
            <Car />
          </section>

          <section ref={aboutRef} className="h-[80vh] bg-gray-200">
            <About />
          </section>

          <section ref={blogRef} className="min-h-screen bg-gray-200">
            <Blog />
          </section>
        </main>

        {/* ✅ Footer now stays at the bottom when resizing */}
        <Footer />
      </div>
    </>
  );
};

export default App;
