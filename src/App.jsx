// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./Pages/Landing";
import JobsPage from "./Pages/Jobs";
import JobDetails from "./Pages/JobDetails";
import PostJob from "./Pages/PostJob";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/postjob" element={<PostJob />} />
      </Routes>
    </Router>
  );
}
