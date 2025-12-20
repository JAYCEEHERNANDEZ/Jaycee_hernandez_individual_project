import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobs as staticJobs } from "../data/jobs";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs([...staticJobs, ...storedJobs]);
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 px-6 md:px-20 pt-12">
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

      {/* Jobs Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20 flex-1">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-full text-center bg-white shadow-xl rounded-3xl p-10 border border-blue-100">
            <p className="text-xl font-semibold text-gray-700">No matching jobs found</p>
            <p className="text-sm text-gray-500 mt-2">Try another search or remove filters.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black/90 text-white mt-10">
        <div className="px-6 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Career Portal. All rights reserved.</p>
          <div className="flex gap-6">
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
    <div className="group relative bg-white border border-blue-200 rounded-3xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Basic info */}
      <Link
        to={`/jobs/${job.id}`}
        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition"
      >
        {job.title}

      <p className="text-sm text-gray-600 mt-1">{job.company} • {job.location}</p>
      {job.workType && (
        <span className="mt-2 inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {job.workType}
        </span>
      )}
      <p className="mt-2 text-blue-700 font-semibold">{job.salary ? `${job.salary}` : "Salary not listed"}</p>
      </Link>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between rounded-3xl">
        {/* Top: Description + requirements */}
        <div>
          {job.description && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">{job.description}</p>
          )}
          {job.requirements && job.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {job.requirements.slice(0, 3).map((req, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
                  {req}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <Link
            to={`/jobs/${job.id}`}
            className="text-center bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
