import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import JobListingPage from "../pages/JobListingPage";
import JobDetailsPage from "../pages/JobDetails";
import Header from "../components/layout/Header";
import SearchResultsPage from "../pages/SearchResultsPage";

const Navigation = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingPage />} /> 
        <Route path="/jobs/:id" element={<JobDetailsPage />} />    
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  )
}

export default Navigation