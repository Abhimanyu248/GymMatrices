
// import React from 'react';

// const Revenue = ({ member }) => {
//     return (
//         <div className="bg-gradient-to-br from-purple-500 to-blue-500 shadow-md rounded-lg p-6 max-w-sm w-full">
//             {/* Name */}
//             <div className="text-center mb-4">
//                 <p className="text-2xl font-semibold text-gray-200">{member.name}</p>
//             </div>

//             {/* Membership Details */}
//             <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                     <span className="font-semibold text-white">Membership:</span>
//                     <span className="text-white">{member.membership.month} Months</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                     <span className="font-semibold text-white">Payment Date:</span>
//                     <span className="text-white">{member.joiningdate.slice(0,10)}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                     <span className="font-semibold text-white">Membership Fee:</span>
//                     <span className="text-white">Rs: {member.membership.price}</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Revenue;


import React, { useState } from 'react';

const Revenue = ({ member }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg rounded-lg p-6 max-w-sm w-full cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Name */}
      <div className="text-center mb-4">
        <p className="text-2xl font-semibold text-gray-200">{member.name}</p>
      </div>

      {/* Membership Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-white">Membership:</span>
          <span className="text-white">{member.membership.month} Months</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-white">Membership Fee:</span>
          <span className="text-white">Rs: {member.membership.price}</span>
        </div>

        {showDetails && (
          <>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">Payment Date:</span>
              <span className="text-white">
                {member.joiningdate.slice(0, 10)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">Payment Method:</span>
              <span className="text-white">{member.payment}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Revenue;
