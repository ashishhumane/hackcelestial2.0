import { useState } from "react";

function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#111827" />
          <path
            d="M5 15 L12 6 L19 15"
            stroke="#ff6b6b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <h1 className="text-xl font-bold">Vivid Spatial Arts</h1>
          <p className="text-sm text-gray-400">Single-file demo</p>
        </div>
      </div>
      <nav className="space-x-4 font-semibold text-gray-400">
        <a href="#about">About</a>
        <a href="#works">Works</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  const [demoMsg, setDemoMsg] = useState("");

  return (
    <section
      id="about"
      className="grid gap-6 mt-6 md:grid-cols-[1fr_420px] items-center"
    >
      <div className="p-5 rounded-xl shadow-lg bg-white/5">
        <h2 className="text-lg font-bold">About the Project</h2>
        <p className="text-gray-400 leading-relaxed">
          This is a single-page React/TypeScript demo version. Replace the
          content with your actual project details.
        </p>

        <div className="mt-4">
          <button
            onClick={() =>
              setDemoMsg("Demo clicked at " + new Date().toLocaleTimeString())
            }
            className="px-4 py-2 rounded-lg font-bold text-slate-900 bg-gradient-to-r from-pink-400 to-orange-300"
          >
            Click demo
          </button>
          <div className="mt-2 text-gray-400">{demoMsg}</div>
        </div>
      </div>

      <aside className="p-5 rounded-xl shadow-lg bg-white/5 space-y-3">
        <div className="font-semibold">Project Details</div>
        <p className="text-gray-400 text-sm">
          - Replace Tailwind classes with your design. <br />
          - Add interactivity from your repo. <br />- Include gallery/artwork
          here.
        </p>
      </aside>
    </section>
  );
}

function Gallery() {
  return (
    <section id="works" className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">Works / Gallery</h3>
      <div className="grid gap-3 p-4 rounded-xl shadow bg-white/5 md:grid-cols-2 lg:grid-cols-3">
        {["Artwork 1", "Artwork 2", "Artwork 3", "Artwork 4"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-center h-40 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-gray-400 font-semibold"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Message prepared (not sent in demo).");
  };

  return (
    <section id="contact" className="mt-6">
      <div className="p-5 rounded-xl shadow-lg bg-white/5">
        <h4 className="font-semibold mb-2">Contact</h4>
        <p className="text-gray-400 text-sm mb-3">
          Author: Shrutika Tavale
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Your name"
            className="p-2 rounded-md bg-transparent border border-white/10"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-md bg-transparent border border-white/10"
          />
          <textarea
            placeholder="Message"
            rows={3}
            className="p-2 rounded-md bg-transparent border border-white/10"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-bold text-slate-900 bg-gradient-to-r from-cyan-300 to-blue-400"
          >
            Send
          </button>
          <div className="text-sm text-gray-400">{status}</div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} Vivid Spatial Arts — single-file preview
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen px-4 py-8 text-white bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <Header />
        <Hero />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
