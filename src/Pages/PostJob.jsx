import { useState, useEffect } from "react";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    applyUrl: "",
    email: "",
    workType: "Onsite",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format email and salary
    const formattedEmail = formData.email.trim().toLowerCase();
    const formattedSalary = formData.salary.startsWith("₱")
      ? formData.salary
      : `₱${formData.salary}`;

    const newJob = {
      id: Date.now(),
      ...formData,
      email: formattedEmail,
      salary: formattedSalary,
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
      applyUrl: "",
      email: "",
      workType: "Onsite",
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 py-14 px-6 flex justify-center relative">
      <div className="bg-white w-full max-w-5xl p-10 rounded-3xl shadow-2xl border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Post a New Job</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title + Company */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 2: Location + Salary + Work Type */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="₱45,000 – ₱75,000"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Work Type</label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option>Onsite</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          {/* Row 3: Apply URL + Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Company Apply URL</label>
              <input
                type="url"
                name="applyUrl"
                value={formData.applyUrl}
                onChange={handleChange}
                required
                placeholder="https://company.com/careers"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Company Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="careers@company.com"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 4: Description */}
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

          {/* Row 5: Requirements */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Requirements (comma separated)</label>
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

        {/* Success Message */}
        {successMessage && (
          <div className="absolute top-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg">
            {successMessage}
          </div>
        )}

        {/* Posted Jobs */}
        {jobs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Posted Jobs</h2>
            <div className="space-y-4">
              {jobs.map((job) => {
                const formattedEmail = job.email.trim().toLowerCase();
                const formattedSalary = job.salary.startsWith("₱") ? job.salary : `₱${job.salary}`;
                return (
                  <div
                    key={job.id}
                    className="p-4 border border-blue-200 rounded-xl bg-blue-50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-sm text-gray-700">
                        {job.company} • {job.location} • {job.workType}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-blue-700 font-medium">{formattedSalary}</p>
                      <p className="text-sm text-gray-600">{formattedEmail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
