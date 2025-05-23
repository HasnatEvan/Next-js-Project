"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaBed,
  FaCheckCircle,
  FaClipboardList,
  FaCouch,
  FaHome,
  FaListUl,
  FaMoneyBill,
  FaSpinner,
  FaUpload,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";

const UpdateRoomPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [roomData, setRoomData] = useState(null);
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

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/inventory/${id}`);
        const data = await res.json();
        setRoomData(data);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const amenities = formData.getAll("amenities");
    const newImageFile = formData.get("newImage");

    let imageUrl = roomData.image;

    // Upload image if new one selected
    if (newImageFile && newImageFile.size > 0) {
      try {
        imageUrl = await imageUpload(newImageFile);
      } catch (error) {
        toast.error("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    const updatedRoom = {
      roomName: formData.get("roomName"),
      roomType: formData.get("roomType"),
      price: +formData.get("price"),
      beds: +formData.get("beds"),
      description: formData.get("description"),
      amenities,
      status: formData.get("status"),
      image: imageUrl,
    };

    try {
      const res = await fetch(`https://hotelbookings-system-app.vercel.app/api/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRoom),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Room updated successfully!");
        router.push("/inventory");
      } else {
        toast.error(result.message || "Failed to update room.");
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!roomData) return <p className="text-center mt-10">Loading room data...</p>;

  return (
    <div className="p-6 bg-white text-gray-700">
      <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaHome /> Room Name
          </label>
          <input
            name="roomName"
            type="text"
            defaultValue={roomData.roomName}
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaCouch /> Room Type
          </label>
          <select
            name="roomType"
            defaultValue={roomData.roomType}
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
              defaultValue={roomData.price}
              className="w-full border px-3 py-2 rounded text-black"
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
              defaultValue={roomData.beds}
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
                  defaultChecked={roomData.amenities?.includes(item)}
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
            defaultValue={roomData.description}
            className="w-full border px-3 py-2 rounded text-black"
            placeholder="Short description..."
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaUpload /> Image Preview
          </label>
          <img
            src={roomData.image}
            alt="Room"
            className="w-40 h-24 rounded object-cover mb-2"
          />
          <input
            type="file"
            accept="image/*"
            name="newImage"
            className="mt-2"
          />
          <p className="text-sm text-gray-600">Leave blank to keep existing image.</p>
        </div>

        <div>
          <label className="block font-semibold mb-1 flex items-center gap-2 text-[#3972C1]">
            <FaCheckCircle /> Availability Status
          </label>
          <select
            name="status"
            defaultValue={roomData.status}
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
              <FaCheckCircle /> Update Room
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateRoomPage;
