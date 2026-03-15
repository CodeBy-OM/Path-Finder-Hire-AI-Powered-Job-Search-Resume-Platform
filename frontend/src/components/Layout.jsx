import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut, Search, FileText } from 'lucide-react';
import Footer from "./Footer";
import Sidebar from './Sidebar';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">PathFinderHire</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <Search className="h-4 w-4 mr-1" />
                  Job Search
                </Link>
                {user && (
                  <>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/applications"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      My Applications
                    </Link>
                    <Link
                    to="/my-docs"
                     className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                     >
                    <FileText className="h-4 w-4 mr-1" />
                      My Docs
                    </Link>
                    <Link
                    to="/refer-earn"
                     className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                     >
                    <FileText className="h-4 w-4 mr-1" />
                      Refer & Earn
                    </Link>
                  </>
                )}
              </div>
              
            </div>
            
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

     <main className="max-w-7xl mx-auto px-4 py-6">
  <div className="flex">
    <Sidebar />
    <div className="flex-1 px-6">
      <Outlet />
    </div>
  </div>
</main>

   {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;

