import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Loader from "../Loader";
import { Phone, MessageCircle, IndianRupee, Pencil, ArrowLeft } from 'lucide-react';
import EditProfileForm from './EditProfileForm'
import RenewMembershipDialog from './RenewMembershipDialog';
import { ToastContainer, toast } from "react-toastify";

const MemberProfile = () => {

  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showRenewDialog, setShowRenewDialog] = useState(false);
  const [renewbtn, setRenewbtn] = useState(false);

  // Fetch Member By Id
  const fetchMember = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://www.abhifitness.me/members/get-member/${id}`, {
        withCredentials: true,
      });
      setMember(res.data.member);
      
        if(new Date(res.data.member.nextPaymentDate) <= new Date()){
          setRenewbtn(true);
        }
    
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchMember();
    
  },[id,isEditing,showRenewDialog]);


  // const handleWhatsApp = () => {
  //   window.open(`https://wa.me/+91${member.phone}`, "_blank", 'noopener,noreferrer');
  // };

  const handleWhatsApp = () => {
    const phoneNumber = '+91' + member.phone;
    const message = encodeURIComponent("Your membership is expiring soon. Please consider renewing your membership to continue enjoying our services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank", 'noopener,noreferrer');
};

  const onCall = () => {
    window.location.href = `tel:${member.phone}`;
  };


  const handleImageClick = () => {
    setIsImageZoomed(true);
  };

  const closeImageZoom = () => {
    setIsImageZoomed(false);
  };

  // Edit Member Profile
  const handleEditSubmit = async (updatedDetails) => {
    try {
      const res = await axios.put(
        `https://www.abhifitness.me/members/update-member/${member._id}`,
        updatedDetails,
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res.data.message);
      setMember(res.data.member);
      setIsEditing(false);
    } catch (error) {
      toast.error(error);
    }
  };

// Renew Membership of Member
  const handleRenew = async (formData) => {

    try {
      const res = await axios.put(
        `https://www.abhifitness.me/members/renew-membership/${member._id}`,
        formData,
        { withCredentials: true }
      );
      // console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Error renewing membership.");
      console.log(error);
    }
  };

  
  if (loading) {
    return <Loader />;
  }

  if (isEditing) {
    return (
      <EditProfileForm
        member={member}
        onSubmit={handleEditSubmit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }
  else {
    return (
      <div className='flex flex-col '>
        <div className='m-4'>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <img
              src={member.image_url || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
              onClick={handleImageClick}
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{member.name}</h1>
              <p className="text-gray-400">{member.email}</p>
              <p className="text-gray-400">{member.phone}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <span className="font-bold text-gray-300">Membership: </span>
                {member.membership.month} Months
              </p>
              <p>
                <span className="font-bold text-gray-300">Joining Date: </span>
                {member.joiningdate.slice(0, 10)}
              </p>
              <p>
                <span className="font-bold text-gray-300">Next Payment Date: </span>
                {member.nextPaymentDate.slice(0, 10)}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold text-gray-300">Gender: </span>
                {member.gender}
              </p>
              <p>
                <span className="font-bold text-gray-300">Payment Mode: </span> {member.payment}
              </p>
              <p>
                <span className="font-bold text-gray-300">Batch: </span>
                {member.batch}
              </p>

            </div>
            <div className="col-span-full">
            <p>
                <span className="font-bold text-gray-300">Age: </span> {member.age}
              </p>
              <p>
                <span className="font-bold text-gray-300">Address: </span>
                {member.address}
              </p>
              <p>
                <span className="font-bold text-gray-300">Emergency Contact: </span>
                {member.emergency_phone || "Not Provided"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => setShowRenewDialog(true)}
              className={`flex items-center gap-2 px-6 py-2 rounded shadow-md  ${
                renewbtn ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!renewbtn}
            >
              <IndianRupee />
              Renew Membership
            </button>
            <button
              onClick={onCall}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 rounded shadow-md"
            >
              <Phone />
              Call
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-400 rounded shadow-md"
            >
              <MessageCircle />
              WhatsApp
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 rounded shadow-md"
            >
              <Pencil />
              Edit
            </button>
          </div>
          <ToastContainer />

          {/* Image Zoom Modal */}
          {isImageZoomed && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
              onClick={closeImageZoom}
            >
              <img
                src={member.image_url || "https://via.placeholder.com/150"}
                alt="Zoomed Profile"
                className="max-w-full max-h-full rounded shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Renew Membership Dialog */}
        {showRenewDialog && (
          <RenewMembershipDialog
            onClose={() => setShowRenewDialog(false)}
            onRenew={handleRenew}
          />
        )}
      </div>
    )
  }

}

export default MemberProfile
