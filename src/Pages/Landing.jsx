// Landing.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const fullText = "Find your next career";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (typing) {
      if (index < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + fullText[index]);
          setIndex(index + 1);
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex(index - 1);
        }, 50);
      } else {
        timeout = setTimeout(() => setTyping(true), 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, typing, fullText]);

  const beforeSpan = displayedText.split("next career")[0];
  const highlighted = displayedText.includes("next career") ? "next career" : "";

  const stats = [
    { label: "Jobs Available", value: "10,000+" },
    { label: "Companies Hiring", value: "1,500+" },
    { label: "Successful Hires", value: "250,000+" },
  ];

  const features = [
    {
      title: "Smart Job Matching",
      desc: "Find jobs tailored to your skills, experience, and location.",
    },
    {
      title: "One-Click Apply",
      desc: "Send resumes and applications instantly to employers.",
    },
    {
      title: "Career Growth",
      desc: "Track applications, interviews, and offers in one place.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-300 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        {/* Hero */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          {beforeSpan}
          <span className="text-blue-600">{highlighted}</span>
          <span className="blinking-cursor">|</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover opportunities from trusted companies. Apply in minutes,
          track applications, and build your future with confidence.
        </p>

        {/* CTA Buttons with glowing effect */}
        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/jobs"
            className="px-8 py-4 rounded-xl bg-blue-600 text-white font-medium shadow-lg hover:shadow-blue-500/60 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
          >
            Browse Jobs
          </Link>
          <Link
            to="/postjob"
            className="px-8 py-4 rounded-xl bg-white text-gray-800 font-medium shadow hover:shadow-blue-400/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
          >
            Post a Job
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition"
            >
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold">Why choose Jobly?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <Feature key={i} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>
      </div>
       {/* Footer */}
      <footer className="bg-black/90 text-white mt-5">
        <div className="px-20 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Career Portal. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </section>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-gray-600">{desc}</p>
    </div>
  );
}
