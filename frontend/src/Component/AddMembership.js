// src/components/AddMembership.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const AddMembership = () => {
  const [memberships, setMemberships] = useState([]); // List of memberships
  const [formData, setFormData] = useState({ month: "", price: "" });
  const [triggerFetch, setTriggerFetch] = useState(false);


  const fetchmemberships = async () => {
    await axios.get("http://localhost:4000/plans/getmembership", { withCredentials: true }).then((res) => {
      setMemberships(res.data.membership);
    }).catch((err) => {
      toast.error("Failed to fetch memberships!");
    });
  }

  useEffect(() => {
    fetchmemberships();
  }, [triggerFetch]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add a new membership
  const handleAddMembership = async (e) => {
    e.preventDefault();
    if (!formData.month || !formData.price) {
      alert("Please fill in both fields!");
      return;
    }
    await axios.post("http://localhost:4000/plans/addmembership", formData, { withCredentials: true }).then((res) => {
      console.log(res.data.message);
      toast.success(res.data.message);
      setFormData({ month: "", price: "" }); // Reset form
    }).catch((err) => { console.log(err); });
    // setFormData({ months: "", price: "" }); // Reset form
    setTriggerFetch(!triggerFetch); // Toggle the state to trigger useEffect

  };

  // Delete a membership
  const handleDeleteMembership = async (id) => {

    try {
      const res = await axios.delete(`http://localhost:4000/plans/deletemembership/${id}`, { withCredentials: true });
      console.log(res.data.message);
      toast.success(res.data.message); // Success message
    } catch (error) {
      console.log(error);
      
    }
    setTriggerFetch(!triggerFetch); // Toggle the state to trigger useEffect
  };

  return (
    <div className="min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Membership</h2>

      {/* Form */}
      <form
        onSubmit={handleAddMembership}
        className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-md mx-auto mb-6"
      >
        <div className="mb-4">
          <label htmlFor="months" className="block text-sm font-medium mb-1">
            Number of Months
          </label>
          <input
            type="number"
            id="month"
            name="month"
            placeholder="Enter number of months"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.month}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Add Membership
        </button>
      </form>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership) => (
          <div
            key={membership._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold mb-2">Membership</h3>
              <p className="text-sm text-gray-400">
                <strong>Months:</strong> {membership.month}
              </p>
              <p className="text-sm text-gray-400">
                <strong> Price:</strong> ₹ {membership.price}
              </p>
            </div>
            <button
              onClick={() => handleDeleteMembership(membership._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
        {memberships.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No memberships added yet.
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembership;
