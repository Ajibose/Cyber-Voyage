import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import JobListingPage from "../pages/JobListingPage";
import JobDetailsPage from "../pages/JobDetails";
import Header from "../components/layout/Header";

const Navigation = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingPage />} /> 
        <Route path="/jobs/:id" element={<JobDetailsPage />} />    
      </Routes>
    </Router>
  )
}

export default Navigation