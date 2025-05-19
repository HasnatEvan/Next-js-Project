"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  FaBed,
  FaMoneyBill,
  FaUpload,
  FaCheckCircle,
  FaHome,
  FaCouch,
  FaClipboardList,
  FaListUl,
  FaSpinner,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { addedRooms } from "@/app/action/backend/addedRooms";
import toast from "react-hot-toast";

const RoomForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const imgbbApiKey = "ec0fdcea3e71115db6d53c28044fd152";

  const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );

    return data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const roomName = form.roomName.value;
    const roomType = form.roomType.value;
    const price = form.price.value;
    const beds = form.beds.value;
    const description = form.description.value;
    const status = form.status.value;
    const imageFile = form.image.files[0];
    const amenities = Array.from(form.amenities)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    try {
      setLoading(true);
      toast.loading("Uploading image...", { id: "upload" });

      const imageUrl = await imageUpload(imageFile);

      const user = session?.user;

      const formData = {
        roomName,
        roomType,
        price,
        beds,
        description,
        status,
        amenities,
        image: imageUrl,
        admin: {
          name: user?.name || "Unknown",
          email: user?.email || "Unknown",
        },
      };

      toast.loading("Saving room...", { id: "save" });

      const result = await addedRooms(formData);
      console.log("Room added:", result);

      form.reset();
      toast.dismiss("save");
      toast.success("Room added successfully!", { id: "upload" });
    } catch (error) {
      console.error("Room submission failed:", error);
      toast.dismiss("upload");
      toast.dismiss("save");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-6 px-4 sm:px-6 md:px-8">
      <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaHome /> Room Name
          </label>
          <input
            name="roomName"
            type="text"
            placeholder="e.g. Deluxe Room"
            className="w-full border px-3 py-2 rounded text-black placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaCouch /> Room Type
          </label>
          <select
            name="roomType"
            className="w-full border px-3 py-2 rounded text-black"
          >
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
            <option>Family</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
              <FaMoneyBill /> Price per Night (৳)
            </label>
            <input
              name="price"
              type="number"
              placeholder="e.g. 3500"
              className="w-full border px-3 py-2 rounded text-black placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
              <FaBed /> Number of Beds
            </label>
            <input
              name="beds"
              type="number"
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaListUl /> Amenities
          </label>
          <div className="flex gap-3 flex-wrap text-black">
            {["Wi-Fi", "AC", "TV", "Balcony", "Minibar"].map((item) => (
              <label key={item} className="flex items-center">
                <input
                  type="checkbox"
                  name="amenities"
                  value={item}
                  className="mr-1"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaClipboardList /> Room Description
          </label>
          <textarea
            name="description"
            rows="4"
            className="w-full border px-3 py-2 rounded text-black placeholder-gray-400"
            placeholder="Short description..."
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaUpload /> Upload Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full text-black"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaCheckCircle /> Availability Status
          </label>
          <select
            name="status"
            className="w-full border px-3 py-2 rounded text-black"
          >
            <option>Available</option>
            <option>Unavailable</option>
            <option>Maintenance</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#3972C1] text-white px-6 py-2 rounded hover:bg-[#2f5ea0] flex items-center justify-center gap-2 w-full disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin text-white text-lg" />
              Processing...
            </>
          ) : (
            <>
              <FaCheckCircle /> Add Room
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
