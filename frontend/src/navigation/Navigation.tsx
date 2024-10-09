import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import JobListingPage from "../pages/JobListingPage";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingPage />} /> 
        <Route path="/jobs/:id" element={<JobListingPage />} />    
      </Routes>
    </Router>
  )
}

export default Navigation