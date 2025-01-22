
import React from "react";
import { NavLink } from "react-router";
import { Users, BarChart2,IndianRupee, Activity, XCircle,ShieldAlert } from "lucide-react";

// Reusable Card Component
const DashboardCard = ({ to, title, Icon, gradient }) => (
  <NavLink
    to={to}
    className={`p-6 rounded-lg cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl ${gradient}`}
  >
    <div className="flex flex-col items-center">
      <Icon className="text-white text-6xl mb-4" aria-label={title} />
      <p className="text-xl font-semibold text-white">{title}</p>
    </div>
  </NavLink>
);

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-gray-900 min-h-screen">
      <DashboardCard
        to="/Members"
        title="All Members"
        Icon={Users}
        gradient="bg-gradient-to-br from-purple-500 to-blue-500"
      />
      <DashboardCard
        to="/specific/Payment-Matrix"
        title="Payment Matrix"
        Icon={IndianRupee}
        gradient="bg-gradient-to-br from-yellow-400 to-red-600"
      />
      <DashboardCard
        to="/specific/Months-Revenue"
        title="Months Revenue"
        Icon={IndianRupee}
        gradient="bg-gradient-to-br from-green-400 to-green-600"
      />
      <DashboardCard
        to="/specific/Expire-in-3-Days"
        title="Expire in 3 Days"
        Icon={ShieldAlert}
        gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
      />
      <DashboardCard
        to="/specific/Expire-in-4-to-7-Days"
        title="Expire in 4 to 7 Days"
        Icon={Activity}
        gradient="bg-gradient-to-br from-pink-500 to-red-500"
      />
      <DashboardCard
        to="/specific/Total-Revenue"
        title="Total Revenue"
        Icon={BarChart2}
        gradient="bg-gradient-to-br from-teal-400 to-teal-600"
      />
      <DashboardCard
        to="/specific/Expired"
        title="Expired"
        Icon={XCircle}
        gradient="bg-gradient-to-br from-gray-500 to-gray-800"
      />
    </div>

  );
};

export default Dashboard;
