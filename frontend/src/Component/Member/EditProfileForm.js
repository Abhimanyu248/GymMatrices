import React, { useState } from "react";
import axios from "axios";
import { ImagePlus } from "lucide-react";

const EditProfileForm = ({ member, onSubmit, onCancel }) => {
  const [editForm, setEditForm] = useState({
    name: member.name,
    age: member.age,
    email: member.email,
    phone: member.phone,
    image_url: member.image_url,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };


  const handleImageChange = async(e) => {
    const image = e.target.files[0] ;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "gym-image");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dvxwt07qk/image/upload", data);
      setEditForm({ ...editForm, image_url: res.data.secure_url });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(editForm);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-gray-800 text-white p-6 mt-4 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto"
    >
      <h2 className="text-xl font-bold  col-span-1 sm:col-span-2">Edit Profile</h2>

      <div className=" flex justify-center relative col-span-1 sm:col-span-2">
        <label className="relative cursor-pointer">
          <div className="w-40 h-40 bg-gray-700 flex items-center justify-center rounded-full overflow-hidden">

            <img src={editForm.image_url} alt="Profile" className="object-cover w-full h-full" />

          </div>
          <input type="file" id="image_input" accept="image/*" onChange={handleImageChange} className="hidden" />

          <div htmlFor="image_input" className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700">
            <ImagePlus size={24} color="#ffffff" />
          </div>
        </label>
      </div>

      <div className="mt-4">
        <label className="block text-gray-300 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={editForm.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-300 mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={editForm.age}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={editForm.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-300 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={editForm.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none"
          required
        />
      </div>
      {/* <div className="mt-4">
        <label className="block text-gray-300 mb-1">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none"
        />
        {editForm.image_url && (
          <img
            src={editForm.image_url}
            alt="Preview"
            className="w-20 h-20 mt-2 rounded"
          />
        )}
      </div> */}
      <div className="flex gap-4 mt-6 justify-center col-span-1 sm:col-span-2">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded shadow-md"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded shadow-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
