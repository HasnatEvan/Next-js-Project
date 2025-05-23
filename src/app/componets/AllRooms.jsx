"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBed,
  FaTag,
  FaCircle,
  FaDoorOpen,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const AllRooms = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      setRooms(data);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleBooking = (roomId, isAvailable) => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (isAvailable) {
      router.push(`/rooms/${roomId}`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-500">
      <h2 className="text-2xl font-bold text-center text-[#3972C1] mb-8">
        All Rooms
      </h2>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => {
            const isAvailable = room.status === "Available";

            return (
              <li
                key={room._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4 space-y-3 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FaDoorOpen className="text-[#3972C1]" /> {room.roomName}
                  </h3>

                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaBed className="text-[#3972C1]" />
                    Type: {room.roomType}
                  </p>

                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaTag className="text-[#3972C1]" />
                    Price: ৳{room.price}
                  </p>

                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaCircle
                      className={`text-xs ${isAvailable
                        ? "text-green-500"
                        : room.status === "Unavailable"
                          ? "text-red-500"
                          : "text-yellow-500"
                        }`}
                    />
                    Status:{" "}
                    <span
                      className={`font-medium ${isAvailable
                        ? "text-green-600"
                        : room.status === "Unavailable"
                          ? "text-red-500"
                          : "text-yellow-600"
                        }`}
                    >
                      {room.status}
                    </span>
                  </p>

                  <button
                    onClick={() => handleBooking(room._id, isAvailable)}
                    className={`mt-auto w-full py-2 rounded-lg text-white font-semibold transition-colors duration-300 text-center
                      ${isAvailable
                        ? "bg-[#3972C1] hover:bg-[#2f5ea0]"
                        : "bg-gray-400 cursor-not-allowed pointer-events-none"
                      }`}
                  >
                    Booking Now
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AllRooms;
