'use client';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <SmoothScroll>
        <main>
          <Hero />
          <Marquee />
          <Projects />
          <Marquee reverse />
          <About />
          <Skills />
          <Certificates />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
