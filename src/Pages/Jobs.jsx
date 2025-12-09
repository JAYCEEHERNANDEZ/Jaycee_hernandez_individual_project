import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Import your static jobs if any
import { jobs as staticJobs } from "../data/jobs";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  // Load jobs from localStorage + static jobs
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs([...staticJobs, ...storedJobs]);
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 px-20 pt-12">
        <h1 className="text-3xl font-bold text-blue-600">Explore Career Opportunities</h1>

        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search job titles..."
            className="w-full px-4 py-3 rounded-xl border border-blue-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="absolute right-4 top-3.5 text-blue-500 font-semibold">🔍</span>
        </div>
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-20 flex-1">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-full text-center bg-white shadow-xl rounded-3xl p-10 border border-blue-100">
            <p className="text-xl font-semibold text-gray-700">No matching jobs found</p>
            <p className="text-sm text-gray-500 mt-2">Try another search or remove filters.</p>
          </div>
        )}
      </section>

      <footer className="bg-black/90 text-white mt-5">
        <div className="px-20 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Career Portal. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="group bg-white border border-blue-200 rounded-3xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{job.company} • {job.location}</p>
      <p className="mt-3 text-blue-700 font-semibold">{job.salary}</p>
      <Link
        to={`/jobs/${job.id}`}
        className="inline-block mt-4 text-blue-600 font-semibold group-hover:underline"
      >
        View details →
      </Link>
    </div>
  );
}
