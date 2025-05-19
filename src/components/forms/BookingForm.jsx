"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

const BookingForm = ({ data }) => {
  const { data: session } = useSession();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [loading, setLoading] = useState(false);

  const totalDays = Math.max(
    1,
    Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
  );

  const totalPrice = totalDays * data.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const bookingData = {
      customer: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      },
      bookingId: data._id,
      roomName: data.roomName,
      roomType: data.roomType,
      price: data.price,
      beds: data.beds,
      roomImage: data.image,
      checkInDate,
      checkOutDate,
      totalDays,
      totalPrice,
      phone,
      address,
      bookingDate: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      // Delay response for 3 seconds
      setTimeout(() => {
        if (res.ok) {
          toast.success("✅ Booking successful!");
          form.reset();
        } else {
          toast.error("❌ Failed to book. Please try again.");
        }
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        toast.error("❌ Something went wrong.");
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className=" px-4 sm:px-6 lg:px-0  bg-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-6 bg-white text-black p-6 "
      >
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            defaultValue={session?.user?.name || ""}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3972C1]"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            defaultValue={session?.user?.email || ""}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3972C1]"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3972C1]"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Address</label>
          <textarea
            name="address"
            required
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3972C1]"
          />
        </div>

        {/* Dates - Grid for responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Check-in Date</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => {
                setCheckInDate(date);
                if (checkOutDate <= date) {
                  const nextDay = new Date(date);
                  nextDay.setDate(date.getDate() + 1);
                  setCheckOutDate(nextDay);
                }
              }}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Check-out Date</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div className="text-center text-lg font-semibold text-gray-800 mt-4">
          Total Price: <span className="text-[#3972C1]">৳ {totalPrice}</span> (
          {totalDays} night{totalDays > 1 ? "s" : ""})
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3972C1] hover:bg-[#2f5ea0] text-white py-3 rounded-lg font-semibold transition duration-300 flex justify-center items-center gap-2"
        >
          {loading && <FaSpinner className="animate-spin text-white text-lg" />}
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
