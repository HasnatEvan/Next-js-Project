"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
const InventoryPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await fetch("https://hotelbookings-system-app.vercel.app/api/inventory");
                const data = await res.json();
                setRooms(data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);
    const handleDelete = async (_id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`https://hotelbookings-system-app.vercel.app/api/inventory/${_id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Room deleted successfully!");
                setRooms((prevRooms) => prevRooms.filter((room) => room._id !== _id));

                Swal.fire("Deleted!", "The room has been deleted.", "success");
            } else {
                toast.error(data.message || "Failed to delete room.");
            }
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("An error occurred while deleting the room.");
        }
    };
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter((room) => room.status === "Available").length;
    const unavailableRooms = rooms.filter((room) => room.status !== "Available").length;

    return (
        <div className="p-6 bg-white text-gray-700 min-h-screen">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow-md text-center">
                    <p className="text-sm text-gray-600">Total Rooms</p>
                    <h2 className="text-3xl font-bold text-blue-700">{totalRooms}</h2>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-md text-center">
                    <p className="text-sm text-gray-600">Available Rooms</p>
                    <h2 className="text-3xl font-bold text-green-700">{availableRooms}</h2>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-md text-center">
                    <p className="text-sm text-gray-600">Unavailable / Maintenance</p>
                    <h2 className="text-3xl font-bold text-red-700">{unavailableRooms}</h2>
                </div>
            </div>

            {/* Room List */}
            {loading ? (
                <p className="text-center text-lg font-medium">Loading rooms...</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Image</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Room Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Type</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Price</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Beds</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {rooms.map((room) => (
                                    <tr key={room._id}>
                                        <td className="px-4 py-2">
                                            <img
                                                src={room.image}
                                                alt={room.roomName}
                                                className="w-20 h-14 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-2">{room.roomName}</td>
                                        <td className="px-4 py-2">{room.roomType}</td>
                                        <td className="px-4 py-2">৳{room.price}</td>
                                        <td className="px-4 py-2">{room.beds}</td>
                                        <td className="px-4 py-2">{room.status}</td>
                                        <td className="px-4 py-2 space-x-2">
                                            <Link href={`/inventory/${room._id}`}>
                                                <button
                                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                                                >
                                                    Update
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(room._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card Format */}
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {rooms.map((room) => (
                            <div
                                key={room._id}
                                className="border border-gray-300 rounded shadow-sm p-4"
                            >
                                <img
                                    src={room.image}
                                    alt={room.roomName}
                                    className="w-full h-40 object-cover rounded mb-3"
                                />
                                <h3 className="text-xl font-bold text-gray-800">{room.roomName}</h3>
                                <p className="text-sm text-gray-600">Type: {room.roomType}</p>
                                <p className="text-sm text-gray-600">Price: ৳{room.price}</p>
                                <p className="text-sm text-gray-600">Beds: {room.beds}</p>
                                <p className="text-sm text-gray-600 mb-2">
                                    Status:{" "}
                                    <span
                                        className={`font-semibold ${room.status === "Available" ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {room.status}
                                    </span>
                                </p>
                                <div className="flex space-x-2">
                                    <Link href={`/inventory/${room._id}`}>
                                        <button
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                                        >
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default InventoryPage;
