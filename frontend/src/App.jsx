import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobSearch from "./pages/JobSearch";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import "./App.css";
import CoverLetterBuilder from "./pages/CoverLetterBuilder";
import CVBuilder from "./pages/CVBuilder";
import ApplicationWizard from "./pages/ApplicationWizard";
import MyDocs from "./pages/MyDocs";
import ReferEarn from "./pages/ReferEarn";
import Pricing from "./pages/Pricing";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* PUBLIC ROUTES */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="jobs" element={<JobSearch />} />
            <Route path="jobs/:id" element={<JobDetails />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="cv-builder"
              element={
                <PrivateRoute>
                  <CVBuilder />
                </PrivateRoute>
              }
            />
            <Route path="/cover-letter" 
            element={<CoverLetterBuilder />} />
            
            <Route path="/application-wizard" 
            element={<ApplicationWizard />} />

            <Route path="/my-docs" 
            element={<MyDocs />} />

            <Route path="/refer-earn" 
            element={<ReferEarn />} />

            <Route path="/pricing" 
            element={<Pricing />} />

            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="profile/edit"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />

            <Route
              path="applications"
              element={
                <PrivateRoute>
                  <MyApplications />
                </PrivateRoute>
              }
            />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
