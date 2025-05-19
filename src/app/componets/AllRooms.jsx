import dbConnect from "@/lib/dbConnect";
import Link from "next/link";
import {
    FaBed,
    FaTag,
    FaCircle,
    FaDoorOpen,
} from "react-icons/fa";

const AllRooms = async () => {
    const roomCollection = await dbConnect("rooms");
    const rooms = await roomCollection.find({}).toArray();

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-500">
            <h2 className="text-2xl font-bold text-center text-[#3972C1] mb-8">
                All Rooms
            </h2>

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

                                {/* Booking Now Button */}
                                <Link
                                    href={room.status === "Available" ? `/rooms/${room._id}` : "#"}
                                    className={`mt-auto w-full py-2 rounded-lg text-white font-semibold transition-colors duration-300 text-center
    ${room.status === "Available"
                                            ? "bg-[#3972C1] hover:bg-[#2f5ea0] cursor-pointer"
                                            : "bg-gray-400 cursor-not-allowed pointer-events-none"
                                        }
  `}
                                >
                                    Booking Now
                                </Link>

                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AllRooms;
