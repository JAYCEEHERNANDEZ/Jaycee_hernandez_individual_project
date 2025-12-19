import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaPaperPlane, FaChartLine } from "react-icons/fa";

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
  }, [index, typing]);

  const beforeSpan = displayedText.split("next career")[0];
  const highlighted = displayedText.includes("next career") ? "next career" : "";

  const stats = [
    { label: "Jobs Available", value: "10,000+", color: "from-blue-400 to-gray-400" },
    { label: "Companies Hiring", value: "1,500+", color: "from-green-400 to-blue-600" },
    { label: "Successful Hires", value: "250,000+", color: "from-purple-400 to-blue-600" },
  ];

  const features = [
    { title: "Smart Job Matching", desc: "Find jobs tailored to your skills, experience, and location.", icon: <FaBolt size={28} className="text-blue-500" /> },
    { title: "One-Click Apply", desc: "Send resumes and applications instantly to employers.", icon: <FaPaperPlane size={28} className="text-green-500" /> },
    { title: "Career Growth", desc: "Track applications, interviews, and offers in one place.", icon: <FaChartLine size={28} className="text-purple-500" /> },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-32 text-center relative">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          {beforeSpan}
          <span className="text-blue-600">{highlighted}</span>
          <span className="animate-pulse">|</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover opportunities from trusted companies. Apply in minutes,
          track applications, and build your future with confidence.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            to="/jobs"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg hover:shadow-blue-400/60 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
          >
            Find Jobs
          </Link>
          <Link
            to="/postjob"
            className="px-8 py-4 rounded-xl bg-white text-gray-800 font-semibold shadow hover:shadow-gray-300 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Post a Job
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-3xl p-10 shadow-xl transform hover:-translate-y-2 transition duration-300`}
            >
              <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
              <p className="mt-2 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <h2 className="text-3xl md:text-4xl font-bold">Why choose Jobly?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center gap-4"
              >
                {f.icon}
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/90 text-white mt-20">
        <div className="px-6 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Career Portal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/" className="hover:underline">About</a>
            <a href="/" className="hover:underline">Contact</a>
            <a href="/" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
