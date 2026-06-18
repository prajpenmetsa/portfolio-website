import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Now from "./components/Now";
import Footer from "./components/Footer";
import { StardustProvider } from "./components/StardustContext";
import StardustField from "./components/StardustField";
import StardustCounter from "./components/StardustCounter";
import StardustIntro from "./components/StardustIntro";

export default function Home() {
  return (
    <StardustProvider>
      <div className="relative">
        <StardustField />
        <StardustCounter />
        <StardustIntro />
        <Cursor />

        {/* Stardust hint text — fixed bottom-right */}
        <p
          className="font-mono fixed z-50"
          style={{
            bottom: 28,
            right: 24,
            fontSize: 9,
            color: "#aaa",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          move star cursor over stardust to collect ✦
        </p>

        <Nav />
        <main>
          <Hero />
          <Now />
          <Projects />
          <Skills />
          <Footer />
        </main>
      </div>
    </StardustProvider>
  );
}
