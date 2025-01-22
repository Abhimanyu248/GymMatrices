import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RenewMembershipDialog = ({ onClose, onRenew }) => {
  const [formData, setFormData] = useState({
    renewDate: new Date().toISOString().split("T")[0],
    membership: "",
    payment: "Online",
  });
  const [membershiplist, setMembershiplist] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);



  //fetching membership
  const fetchmemberships = async () => {
    await axios.get("https://www.abhifitness.me/plans/getmembership", { withCredentials: true }).then((res) => {
      setMembershiplist(res.data.membership);
      if(res.data.membership.length === 0){
        toast.error("No memberships found!");
      }else{
        const defaultMembership = res.data.membership[0];
        setSelectedMembership(defaultMembership);
        setFormData({ ...formData, membership: defaultMembership });
      }

    }).catch((err) => {
      toast.error("Error fetching memberships.");
    });
  }

  useEffect(() => {
    fetchmemberships();
  }, []);

  const handleMembershipChange = (e) => {
    const selected = membershiplist.find((item) => item._id === e.target.value);
    setSelectedMembership(selected);
    setFormData({ ...formData, membership: selected });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleRenew =  () => {
    onRenew(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Renew Membership</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Membership Option</label>
          <select
            name="membership"
            value={selectedMembership?._id || ""}
            onChange={handleMembershipChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
          >
            {membershiplist.map((item, index) => (
              <option key={index} value={item._id}>
                {item.month} Months Membership - ₹{item.price}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="renewDate" className="block text-gray-300 mb-1">Renew Date</label>
          <input
            type="date"
            name="renewDate"
            value={formData.renewDate}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 rounded text-white focus:outline-none"
          />
        </div>
        {/* Payment */}
        <div className="mb-4">
          <label htmlFor="payment" className="block text-textPrimary font-medium mb-1">Payment Method</label>
          <select
            name="payment" 
            id="payment"
            value={formData.payment}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            required
          >
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
            </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleRenew}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded shadow-md"
          >
            Renew
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default RenewMembershipDialog;
