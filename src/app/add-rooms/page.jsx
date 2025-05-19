"use client";

import React from "react";

import { motion } from "framer-motion";
import RoomForm from "./components/RoomForm";

const AddRoomsPage = () => {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instruction Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#f0f8ff]  rounded-lg p-6 text-sm leading-relaxed shadow-sm h-full"
        >
          <h2 className="text-xl font-semibold mb-3 text-[#3972C1]">
            📝 Room Submission Instructions
          </h2>
          <ul className="space-y-4 list-disc list-inside text-gray-700">
            <li>
              <strong>Room Name:</strong> Provide a clear and catchy name.
              <br />
              <span className="text-gray-600">Example: “Premium Deluxe Suite”</span>
            </li>
            <li>
              <strong>Room Type:</strong> Select the appropriate type from the dropdown.
              <br />
              <span className="text-gray-600">Options: Single, Double, Twin, Suite, Family</span>
            </li>
            <li>
              <strong>Price Per Night (৳):</strong> Set a fair and competitive price for your room.
              <br />
              <span className="text-gray-600">Example: ৳3500</span>
            </li>
            <li>
              <strong>Number of Beds:</strong> Mention the total number of beds in the room.
              <br />
              <span className="text-gray-600">Example: 1 King Bed + 1 Sofa Bed</span>
            </li>
            <li>
              <strong>Maximum Occupancy:</strong> Indicate how many people can stay in the room.
              <br />
              <span className="text-gray-600">Example: Up to 3 Adults + 1 Child</span>
            </li>
            <li>
              <strong>Amenities:</strong> Check all the features included in the room.
              <br />
              <span className="text-gray-600">Wi-Fi, AC, TV, Mini Fridge, Hair Dryer, Balcony</span>
            </li>
            <li>
              <strong>Room Description:</strong> Write 2–3 lines highlighting room benefits, comfort, and uniqueness.
              <br />
              <span className="text-gray-600">
                Example: “A spacious suite with a private balcony and a stunning lake view. Perfect for couples and small families.”
              </span>
            </li>
            <li>
              <strong>Upload Room Image:</strong> Add a clear image of the actual room.
              <br />
              <span className="text-gray-600">Supported formats: JPG, PNG. Max size: 2MB</span>
            </li>
            <li>
              <strong>Room Status:</strong> Choose the current availability status.
              <br />
              <span className="text-gray-600">Available, Unavailable, Maintenance</span>
            </li>
            <li>
              <strong>Final Step:</strong> Double-check all inputs, then click <span className="text-[#3972C1] font-medium">“Add Room”</span> to save.
            </li>
          </ul>
        </motion.div>

        {/* Room Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6">Add a New Room</h1>
          <RoomForm />
        </motion.div>
      </div>
    </div>
  );
};

export default AddRoomsPage;
