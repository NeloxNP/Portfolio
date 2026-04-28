import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/portfolio/Header";
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Projects from "./components/portfolio/Projects";
import Interests from "./components/portfolio/Interests";
import Skills from "./components/portfolio/Skills";
import Contact from "./components/portfolio/Contact";
import Footer from "./components/portfolio/Footer";

const Portfolio = () => {
  return (
    <div className="App bg-paper grain relative overflow-x-hidden">
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Interests />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
