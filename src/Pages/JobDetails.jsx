import { useParams } from "react-router-dom";
import { jobs as staticJobs } from "../data/jobs";

export default function JobDetails() {
  const { id } = useParams();

  const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const allJobs = [...staticJobs, ...storedJobs];

  const job = allJobs.find((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Job not found
      </div>
    );
  }

  const emailLink = job.email
    ? `mailto:${job.email}?subject=Application for ${encodeURIComponent(
        job.title
      )}&body=${encodeURIComponent(
        `Good day,\n\nI would like to apply for the ${job.title} position at ${job.company}.\n\nPlease find my resume attached.\n\nThank you.\n\nBest regards,\n[Your Name]`
      )}`
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-1 py-14 px-6 lg:px-20 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-2 text-gray-600 text-lg">
            {job.company} • {job.location} • {job.workType || "Work type not specified"}
          </p>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {job.description || "No description provided."}
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Requirements</h3>
            <div className="flex flex-wrap gap-3">
              {job.requirements && job.requirements.length > 0 ? (
                job.requirements.map((req, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {req}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No specific requirements.</span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col gap-6 sticky top-20 h-fit">
          <div className="text-center">
            <div className="text-sm text-gray-500">Salary</div>
            <div className="text-3xl font-bold text-blue-700">{job.salary}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-500">Location</div>
            <div className="font-medium">{job.location}</div>
          </div>

          {/* Apply via Email */}
          {emailLink && (
            <a
              href={emailLink}
              className="block text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition"
            >
              Apply via Email
            </a>
          )}

          {/* Apply via Website */}
          {job.applyUrl && (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              Visit Website
            </a>
          )}

          {/* Save Job Button */}
          <button className="border rounded-xl px-6 py-3 hover:bg-gray-50 hover:shadow-md transition">
            Save Job
          </button>

          <p className="text-xs text-gray-400 text-center">
            Applications are sent directly to the employer.
          </p>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-black/90 text-white">
        <div className="px-6 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Career Portal</p>
          <div className="flex gap-6">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
