// // src/components/Members.js


import React, { useState, useEffect } from "react";
import Card from "./Card";
import Loader from "../Loader";
import ConfirmationAlert from "../ConfirmationAlert"; // Import the confirmation alert component
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // Fetch all members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("https://www.abhifitness.me/members/get-members", {
          withCredentials: true,
        });
        // toast.success(res.data.message);
        setMembers(res.data.members);
        setFilteredMembers(res.data.members);
        setCount(res.data.count);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch members");
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredMembers(members);
    } else {
      const lowercasedSearch = searchText.toLowerCase();
      const filtered = members.filter((member) => {
        return (
          member.name.toLowerCase().includes(lowercasedSearch) ||
          member.email.toLowerCase().includes(lowercasedSearch) ||
          member.phone.toString().includes(searchText)
        );
      });
      setFilteredMembers(filtered);
    }
  }, [searchText, members]);

  // Handle search input
  const handleSearch = (query) => {
    setSearchText(query);
  };



  // Handle card click for member details page
  const handleCardClick = (member) => {
    navigate(`/member/${member._id}`);
  };


  // Open confirmation alert
  const confirmDelete = (id) => {
    setMemberToDelete(id);
    setIsAlertOpen(true);
  };

  // Handle member deletion
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://www.abhifitness.me/members/delete-member/${memberToDelete}`,
        {
          withCredentials: true,
        }
      );
      const updatedMembers = members.filter((member) => member._id !== memberToDelete);
      setMembers(updatedMembers);
      setFilteredMembers(updatedMembers);
      toast.success(res.data.message);
      setIsAlertOpen(false); // Close the confirmation alert
      setMemberToDelete(null);
    } catch (error) {
      toast.error("Failed to delete member");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4 h-full">
      <div className='mb-4'>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>
      {/* Search Box */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="pb-4 md:pr-5 w-full md:w-1/3 flex items-center gap-y-4">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search by name, email, or phone"
            className="px-4 py-2 rounded bg-gray-800 text-white w-full focus:outline-none"
          />
        </div>

        <div>
          <p className="text-xl text-textPrimary">Total members: {count}</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div key={member._id} onClick={() => handleCardClick(member)}>
            <Card
              member={member}
              onDelete={() => confirmDelete(member._id)} // Open confirmation dialog
            />
          </div>
        ))}
        {filteredMembers.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No members found.
          </p>
        )}

      </div>

      {/* Confirmation Alert */}
      <ConfirmationAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)} // Close confirmation dialog
        onConfirm={handleDelete} // Perform delete action
      />
      <ToastContainer />
    </div>
  );
};

export default Members;

