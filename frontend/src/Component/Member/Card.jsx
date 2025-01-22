// // src/components/Card.jsx

import React from "react";
import { Trash2 } from "lucide-react";

const Card = ({ member, onDelete }) => {


  // Function to determine dot color based on nextpaymentdate
  const getDotColor = () => {
    const today = new Date();
    const paymentDate = new Date(member.nextPaymentDate);
    const diffInDays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24)); // Difference in days
    if (diffInDays <= 3) return "border-red-500"; // Overdue
    if (diffInDays <= 7) return "border-orange-600"; // Due soon
    return "border-green-500"; // Safe
  };

  const daysleft = () =>{
    const today = new Date();
    const paymentDate = new Date(member.nextPaymentDate);
    const diffInDays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24));
    if(diffInDays <=0)
    {
      return 0
    }
    else{
    return diffInDays;
    }
  }

  return (
    <div className="relative bg-gray-800 shadow-lg rounded-xl p-4 flex flex-row md:flex-col cursor-pointer items-center justify-around hover:bg-gray-700 transition-all duration-500 ease-in-out  transform hover:scale-105 hover:shadow-2xl">
      {/* Delete Icon */}
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-white transition duration-300 ease-in-out hover:bg-red-900 rounded-full p-1"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering parent click events
          onDelete(member._id);
        }}
      >
        <Trash2 size={20} />
      </button>


      {/* Image */}
      <div className={`relative w-24 h-24 rounded-full overflow-hidden  - border-4 ${getDotColor()} shadow-xl`}>
        {member.image_url ? (
          <div >
            <img
              src={member.image_url}
              alt={member.name}
              className="w-full h-full object-cover bg-black"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-700">No Image</span>
          </div>
        )}


      </div>
      
      {/* Details */}
      <div className="text-left md:text-center">

        {/* Name */}
        <h2 className="text-lg font-bold text-blue-500">{member.name}</h2>

        {/* Mobile */}
        <p className="text-textPrimary text-sm">{member.phone}</p>

        {/* Batch Timing */}
        <p className="text-textPrimary mt-2 text-left md:text-center">
          <strong>Days Left:</strong> {daysleft()} Days
        </p>

        {/* Membership */}
        <p className="text-textPrimary text-left md:text-center">
          <strong>Membership:</strong> {member.membership.month} Months
        </p>
      </div>

    </div>
  );
};

export default Card;
