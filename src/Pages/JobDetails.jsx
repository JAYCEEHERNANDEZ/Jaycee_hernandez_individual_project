// JobDetails.jsx
import { useParams } from "react-router-dom";
import { jobs as staticJobs } from "../data/jobs"; // Optional static jobs

export default function JobDetails() {
  const { id } = useParams();

  // Load jobs from localStorage + static jobs
  const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const allJobs = [...staticJobs, ...storedJobs];

  const job = allJobs.find((j) => j.id === Number(id));

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Job not found
      </div>
    );

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="py-14 px-20 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1">
        {/* Main Job Content */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-2 text-gray-600 text-lg">
            {job.company} • {job.location}
          </p>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h3>
            <div className="flex flex-wrap gap-3">
              {job.requirements.map((req, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col gap-6 sticky top-20">
          <div className="text-center">
            <div className="text-sm text-gray-500">Salary</div>
            <div className="text-3xl font-bold text-blue-700 mt-1">{job.salary}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500">Location</div>
            <div className="font-medium text-gray-800 mt-1">{job.location}</div>
          </div>

          <a
            href={`mailto:hr@${job.company.replace(/\s+/g, "").toLowerCase()}.com?subject=Application for ${job.title}`}
            className="block text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Apply Now
          </a>

          <button className="w-full border border-gray-300 rounded-xl px-6 py-3 hover:shadow-md hover:bg-gray-50 transition-all duration-200 font-medium">
            Save Job
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Applications are sent directly to the employer.
          </p>
        </aside>
      </div>

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
    </div>
  );
}
