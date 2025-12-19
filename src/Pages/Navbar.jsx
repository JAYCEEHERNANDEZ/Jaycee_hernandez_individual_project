import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-black/90 shadow transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Jobly
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/jobs"
            className="text-blue-600 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/postjob"
            className="text-blue-600 hover:text-blue-600 font-medium transition"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}
