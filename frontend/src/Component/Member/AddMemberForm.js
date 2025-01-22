import React, { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ImagePlus } from "lucide-react";


const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "Male",
    email: "",
    age: "",
    address: "",
    batch: "Morning",
    emergency_phone: "",
    image_url: "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg",
    joiningdate: new Date().toISOString().split("T")[0], // Current date
    membership: "",
    payment: "Online"
  });
  const [membershiplist, setMembershiplist] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);


  //fetching membership
  const fetchmemberships = async () => {
    await axios.get("http://localhost:4000/plans/getmembership", { withCredentials: true }).then((res) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async(e) => {
    const image = e.target.files[0] ;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "gym-image");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dvxwt07qk/image/upload", data);
      setFormData({ ...formData, image_url: res.data.secure_url });
    } catch (err) {
      console.log(err);
    }
  };

  const handleMembershipChange = (e) => {
    const selected = membershiplist.find((item) => item._id === e.target.value);
    setSelectedMembership(selected);
    setFormData({ ...formData, membership: selected });
  };



  const handleSubmit = async(e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/members/register-member", formData, { withCredentials: true }).then((res) => {
      console.log(formData);
      if(res.status === 200){
        toast.success(res.data.message);
      }else{
      toast(res.data.message);
      }

      setFormData({
        name: "",
        phone: "",
        gender: "Male",
        email: "",
        age: "",
        address: "",
        batch: "Morning",
        emergency_phone: "",
        image_url: "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg",
        joiningdate: new Date().toISOString().split("T")[0], // Current date
        membership: "",
        payment: "Online"
      });
    }).catch((err)=>{
      toast.error(err.response.data.error);
      console.log(err);
    })
  }


  return (
    <div className=" w-full bg-gray-800 p-6 rounded shadow-lg md:w-10/12 mx-auto mt-6">
      <h2 className="text-2xl font-bold text-textPrimary mb-6 text-center">
        Add New Member
      </h2>

      {/* Image Input */}
      <div className="mb-6 flex justify-center relative">
        <label className="relative cursor-pointer">
          <div className="w-40 h-40 bg-gray-700 flex items-center justify-center rounded-full overflow-hidden">
            <img src={formData.image_url} alt="Profile" className="object-cover w-full h-full" />
          </div>
          <input type="file" id="image_input" accept="image/*" onChange={handleImageChange} className="hidden" />

          <div htmlFor="image_input" className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700">
            <ImagePlus size={24} color="#ffffff" />
          </div>
        </label>
      </div>

      <form onSubmit={handleSubmit} className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-textPrimary font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Abhi Fitness"
            value={formData.name}
            onChange={handleChange}
            className=" bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="phone" className="block text-textPrimary font-medium mb-1">Mobile</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="9999999999"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-textPrimary font-medium mb-1">Gender</label>
          <select
          id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-textPrimary font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="abc@xyc.com"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            required
          />
        </div>


        {/* Membership */}
        <div>
          <label htmlFor="membership" className="block text-textPrimary font-medium mb-1">Membership</label>
          <select
            name="membership"
            id="membership"
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

        {/* Payment */}
        <div>
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

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-textPrimary font-medium mb-1">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="00"
            value={formData.age}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-textPrimary font-medium mb-1">Address</label>
          <textarea
            name="address"
            id="address"
            placeholder="140/23 abc,xyz"
            value={formData.address}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            rows="1"
          ></textarea>
        </div>

        {/* Batch Timing */}
        <div>
          <label htmlFor="batch" className="block text-textPrimary font-medium mb-1">Batch Timing</label>
          <select
            name="batch" 
            id="batch"
            value={formData.batch}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            required
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-textPrimary font-medium mb-1">Date</label>
          <input
            type="date"
            id="date"
            name="joiningdate"
            value={formData.joiningdate}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
          />
        </div>
            {/* Emergency Mobile */}
        <div>
          <label htmlFor="emergency_phone" className="block text-textPrimary font-medium mb-1">Emergency Contact</label>
          <input
            type="text"
            id="emergency_phone"
            name="emergency_phone"
            placeholder="9999999999"
            value={formData.emergency_phone}
            onChange={handleChange}
            className="bg-gray-900 text-inputText w-full px-4 py-2 border border-borderLight hover:border-borderHover rounded focus:outline-none focus:ring focus:ring-inputFocus"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-buttonPrimary text-white py-2 px-4 rounded hover:bg-buttonPrimaryHover focus:outline-none focus:ring focus:ring-gray-400"
          >
            Add Member
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddMemberForm;

