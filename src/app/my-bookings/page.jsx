"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaBed,
  FaTags,
  FaCalendarCheck,
  FaCalendarTimes,
  FaClock,
  FaMoneyBillWave,
  FaInfoCircle,
  FaSpinner,
  FaListAlt,
  FaRegCalendarPlus,
  FaWallet,
} from "react-icons/fa";
import DeleteBookingButton from "./components/DeleteBookingButton";

const MyBookingsPage = () => {
  const {
    data: { user } = {},
    status,
  } = useSession();

  const [bookings, setBookings] = useState([]);
  const [summary, setSummary] = useState({
    totalBookings: 0,
    totalDays: 0,
    totalSpending: 0,
  });

  useEffect(() => {
    if (status === "authenticated") {
      const fetchMyBookings = async () => {
        try {
          const res = await fetch(
            `https://hotelbookings-system-app.vercel.app/api/rooms?email=${user?.email}`
          );
          const data = await res.json();
          setBookings(data);

          // Calculate summary stats
          const totalBookings = data.length;
          const totalDays = data.reduce((sum, b) => sum + (b.totalDays || 0), 0);
          const totalSpending = data.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
          setSummary({ totalBookings, totalDays, totalSpending });
        } catch (err) {
          console.error("Error fetching bookings:", err);
        }
      };

      fetchMyBookings();
    }
  }, [status, user?.email]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-48">
        <FaSpinner className="animate-spin text-blue-600 text-3xl" />
        <span className="ml-2 text-gray-600 text-lg">Loading...</span>
      </div>
    );
  }

  const formatBDDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (status === "Available") return "text-green-600 font-semibold";
    if (status === "Unavailable") return "text-red-600 font-semibold";
    return "text-yellow-600 font-semibold";
  };

  const handleDelete = (deletedId) => {
    setBookings((prev) => prev.filter((b) => b._id !== deletedId));
    setSummary((prev) => ({
      ...prev,
      totalBookings: prev.totalBookings - 1,
    }));
  };

  return (
    <div className="w-full min-h-screen p-6 bg-white text-gray-700">
      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
          <FaListAlt className="mx-auto text-2xl mb-1" />
          <h3 className="text-2xl font-bold">{summary.totalBookings}</h3>
          <p>Total Bookings</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow text-center">
          <FaRegCalendarPlus className="mx-auto text-2xl mb-1" />
          <h3 className="text-2xl font-bold">{summary.totalDays}</h3>
          <p>Total Days</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center">
          <FaWallet className="mx-auto text-2xl mb-1" />
          <h3 className="text-2xl font-bold">৳{summary.totalSpending.toLocaleString()}</h3>
          <p>Total Spending</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto w-full">
            <table className="w-full border border-gray-300 text-sm text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">#</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Room</th>
                  <th className="border p-3">Type</th>
                  <th className="border p-3">Check-In</th>
                  <th className="border p-3">Check-Out</th>
                  <th className="border p-3">Total Days</th>
                  <th className="border p-3">Total Price</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">{booking.customer?.name}</td>
                    <td className="border p-3">{booking.roomName}</td>
                    <td className="border p-3">{booking.roomType}</td>
                    <td className="border p-3">{formatBDDate(booking.checkInDate)}</td>
                    <td className="border p-3">{formatBDDate(booking.checkOutDate)}</td>
                    <td className="border p-3">{booking.totalDays}</td>
                    <td className="border p-3">৳{booking.totalPrice}</td>
                    <td className="border p-3">
                      <span className={getStatusClass(booking.status)}>{booking.status}</span>
                    </td>
                    <td className="border p-3">
                      <DeleteBookingButton id={booking._id} onDelete={handleDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking, index) => (
              <div
                key={booking._id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm space-y-2"
              >
                <p className="text-sm">
                  <strong>#</strong> {index + 1}
                </p>
                <p><FaUser className="inline mr-1" /> <strong>Name:</strong> {booking.customer?.name}</p>
                <p><FaBed className="inline mr-1" /> <strong>Room:</strong> {booking.roomName}</p>
                <p><FaTags className="inline mr-1" /> <strong>Type:</strong> {booking.roomType}</p>
                <p><FaCalendarCheck className="inline mr-1" /> <strong>Check-In:</strong> {formatBDDate(booking.checkInDate)}</p>
                <p><FaCalendarTimes className="inline mr-1" /> <strong>Check-Out:</strong> {formatBDDate(booking.checkOutDate)}</p>
                <p><FaClock className="inline mr-1" /> <strong>Total Days:</strong> {booking.totalDays}</p>
                <p><FaMoneyBillWave className="inline mr-1" /> <strong>Total Price:</strong> ৳{booking.totalPrice}</p>
                <p>
                  <FaInfoCircle className="inline mr-1" /> <strong>Status:</strong>{" "}
                  <span className={getStatusClass(booking.status)}>{booking.status}</span>
                </p>
                <div className="text-right">
                  <DeleteBookingButton id={booking._id} onDelete={handleDelete} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
