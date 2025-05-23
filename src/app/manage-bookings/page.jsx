'use client';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { FaSpinner, FaCalendarAlt, FaMoneyBillWave, FaHourglassHalf } from "react-icons/fa";

const ManageBookingsPage = () => {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totals, setTotals] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingCount: 0,
  });

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(true);
      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);

          const totalBookings = data.length;
          const totalRevenue = data.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
          const pendingCount = data.filter((b) => b.status === "Pending").length;

          setTotals({ totalBookings, totalRevenue, pendingCount });
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
          setLoading(false);
        });
    }
  }, [status]);

  const handleStatusChange = (bookingId, newStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking._id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);

    fetch(`https://hotelbookings-system-app.vercel.app/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(async (res) => {
        const data = await res.json();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: res.ok ? "success" : "error",
          title: data.message || (res.ok ? "Status updated" : "Failed to update"),
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to update status",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDelete = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      fetch(`https://hotelbookings-system-app.vercel.app/api/bookings/${bookingId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setBookings(bookings.filter((b) => b._id !== bookingId));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Booking deleted successfully",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          } else {
            Swal.fire("Error", "Failed to delete booking.", "error");
          }
        })
        .catch(() => {
          Swal.fire("Error", "Failed to delete booking.", "error");
        });
    }
  };

  if (status === "loading") return <p className="p-4 text-center">Loading session...</p>;
  if (status === "unauthenticated") return <p className="p-4">Please login to see bookings.</p>;

  return (
    <div className="p-4 min-h-screen bg-white text-gray-700">
      {loading && (
        <div className="flex items-center justify-center h-48">
          <FaSpinner className="animate-spin text-blue-600 text-3xl" />
          <span className="ml-2 text-gray-600 text-lg">Loading...</span>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="mb-8 flex flex-col sm:flex-row gap-6 justify-center">
          <div className="bg-blue-100 text-blue-800 p-4 rounded shadow flex-1 text-center flex flex-col items-center gap-2">
            <FaCalendarAlt className="text-4xl" />
            <h3 className="text-2xl font-bold">{totals.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded shadow flex-1 text-center flex flex-col items-center gap-2">
            <FaMoneyBillWave className="text-4xl" />
            <h3 className="text-2xl font-bold">৳{totals.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow flex-1 text-center flex flex-col items-center gap-2">
            <FaHourglassHalf className="text-4xl" />
            <h3 className="text-2xl font-bold">{totals.pendingCount}</h3>
            <p>Pending Bookings</p>
          </div>
        </div>
      )}

      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      {!loading && bookings.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-[1000px] w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Room Name</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Beds</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Customer</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Check-In</th>
                  <th className="p-2 border">Check-Out</th>
                  <th className="p-2 border">Days</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Booked On</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t bg-white">
                    <td className="p-2 border">{booking.roomName}</td>
                    <td className="p-2 border">{booking.roomType}</td>
                    <td className="p-2 border">৳{booking.price}</td>
                    <td className="p-2 border">{booking.beds}</td>
                    <td className="p-2 border">
                      <img
                        src={booking.roomImage}
                        alt={booking.roomName}
                        className="w-20 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="p-2 border">{booking.customer?.name || "-"}</td>
                    <td className="p-2 border">{booking.phone}</td>
                    <td className="p-2 border">{booking.address}</td>
                    <td className="p-2 border">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">{booking.totalDays}</td>
                    <td className="p-2 border">৳{booking.totalPrice}</td>
                    <td className="p-2 border">
                      <select
                        className={`p-1 rounded text-xs font-medium`}
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                      >
                        <option value="Pending">⏳ Pending</option>
                        <option value="Processing">🔧 Processing</option>
                        <option value="Confirm">✅ Confirm</option>
                        <option value="Canceled">❌ Canceled</option>
                      </select>
                    </td>
                    <td className="p-2 border">
                      {new Date(booking.bookingDate).toLocaleString()}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="rounded p-4 shadow-sm bg-white">
                <div className="flex gap-4">
                  <img
                    src={booking.roomImage}
                    alt={booking.roomName}
                    className="w-28 h-20 rounded object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">{booking.roomName}</h2>
                    <p>{booking.roomType} • ৳{booking.price} • {booking.beds} beds</p>
                    <p><span className="font-semibold">Customer:</span> {booking.customer?.name || "-"}</p>
                    <p><span className="font-semibold">Phone:</span> {booking.phone}</p>
                    <p><span className="font-semibold">Address:</span> {booking.address}</p>
                    <p><span className="font-semibold">Check-In:</span> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Check-Out:</span> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Days:</span> {booking.totalDays}</p>
                    <p><span className="font-semibold">Total:</span> ৳{booking.totalPrice}</p>
                    <p><span className="font-semibold">Booked On:</span> {new Date(booking.bookingDate).toLocaleString()}</p>
                    <div>
                      <select
                        className="p-1 rounded text-xs font-medium"
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                      >
                        <option value="Pending">⏳ Pending</option>
                        <option value="Processing">🔧 Processing</option>
                        <option value="Confirm">✅ Confirm</option>
                        <option value="Canceled">❌ Canceled</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageBookingsPage;
