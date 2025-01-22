import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="sticky top-0 flex justify-between items-center p-6 bg-gray-800 shadow-md">
        <div className="text-2xl font-bold text-indigo-500">
          <Link to="/">GymMetrics</Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition duration-300"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center text-center py-20 space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-indigo-500">
          Welcome to GymMetrics
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl">
          Take control of your gym management with GymMetrics. Manage members, track payments, and optimize revenue all in one place.
        </p>
        <Link
          to="/signup"
          className="px-8 py-3 bg-indigo-500 text-lg rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 sm:px-12 bg-gray-800">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-500 mb-10">
          Why Choose GymMetrics?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-indigo-400 mb-3">Effortless Member Management</h3>
            <p className="text-gray-300">
              Easily track member information, manage subscriptions, and send reminders.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-indigo-400 mb-3">Detailed Revenue Tracking</h3>
            <p className="text-gray-300">
              Gain insights into daily, weekly, and monthly revenue to optimize your business.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-indigo-400 mb-3">Modern and Intuitive Design</h3>
            <p className="text-gray-300">
              Enjoy a user-friendly interface designed for seamless navigation and productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} GymMetrics. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
