import { useState, useEffect } from "react";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [jobs, setJobs] = useState([]);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(), // unique ID
      ...formData,
      requirements: formData.requirements.split(",").map((r) => r.trim()),
    };

    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    setSuccessMessage("Job posted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);

    setFormData({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      requirements: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 py-14 px-6 flex justify-center relative">
      <div className="bg-white w-full max-w-3xl p-10 rounded-3xl shadow-2xl border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Post a New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["title","company","location","salary"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">{field === "title" ? "Job Title" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field === "title" || field === "company"}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder={field === "title" ? "e.g., Senior Software Engineer" : field === "company" ? "e.g., Google" : field === "location" ? "e.g., San Francisco, CA" : "$120,000 - $150,000"}
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Requirements (comma separated)
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Post Job
          </button>
        </form>

        {/* Success Toast */}
        {successMessage && (
          <div className="absolute top-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg animate-fade-in">
            {successMessage}
          </div>
        )}

        {/* Display jobs below the form */}
        {jobs.length > 0 && (
          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Posted Jobs</h2>
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border border-blue-200 rounded-xl bg-blue-50 shadow-sm"
              >
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-700">{job.company} • {job.location}</p>
                <p className="text-blue-700 font-medium">{job.salary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
