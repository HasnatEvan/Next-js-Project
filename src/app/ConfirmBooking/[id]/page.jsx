import BookingForm from "@/components/forms/BookingForm";
import {
  FaBed,
  FaDoorOpen,
  FaInfoCircle,
  FaMoneyBillWave,
  FaFileAlt,
  FaHome,
  FaExclamationTriangle,
} from "react-icons/fa";

const ConfirmPage = async ({ params }) => {
  const res = await fetch(`https://hotelbookings-system-app.vercel.app/api/rooms/${params.id}`);
  const data = await res.json();

  return (
    <div className="bg-white min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Booking Form Section */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-3xl font-extrabold text-[#3972C1] mb-8 text-center flex items-center justify-center gap-2">
            <FaHome /> Confirm Your Booking
          </h1>
          <BookingForm data={data} />
        </div>

        {/* Sidebar Content Section */}
        <aside className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200 text-gray-700">
          <h2 className="text-2xl font-semibold mb-6 border-b text-center border-gray-300 pb-3 flex items-center justify-center gap-2">
            <FaFileAlt /> Room Details
          </h2>

          <p className="mb-3 flex items-center gap-2">
            <strong className="font-medium text-gray-900 flex items-center gap-2">
              <FaDoorOpen /> Room Name:
            </strong>{" "}
            {data.roomName}
          </p>
          <p className="mb-3 flex items-center gap-2">
            <strong className="font-medium text-gray-900 flex items-center gap-2">
              <FaInfoCircle /> Room Type:
            </strong>{" "}
            {data.roomType}
          </p>
          <p className="mb-3 flex items-center gap-2">
            <strong className="font-medium text-gray-900 flex items-center gap-2">
              <FaBed /> Beds:
            </strong>{" "}
            {data.beds}
          </p>
          <p className="mb-6 flex items-center gap-2">
            <strong className="font-medium text-gray-900 flex items-center gap-2">
              <FaMoneyBillWave /> Price per night:
            </strong>{" "}
            <span className="text-[#3972C1] font-semibold">৳ {data.price}</span>
          </p>

          <div className="overflow-hidden rounded-md mb-6 cursor-pointer hover:scale-105 transition-transform duration-300">
            <img
              src={data.image}
              alt={data.roomName}
              className="w-full object-cover h-48 md:h-64"
              loading="lazy"
            />
          </div>

          <div className="flex items-start gap-2 text-gray-800 mb-4">
            <FaInfoCircle className="mt-1 text-[#3972C1]" />
            <p>{data.description}</p>
          </div>

          <div className="text-sm space-y-4 leading-relaxed text-gray-600">
            <p className="flex gap-2 items-start">
              <FaExclamationTriangle className="mt-1 text-yellow-500" />
              Please fill the booking form carefully to confirm your reservation.
              Ensure your contact details are accurate for smooth communication.
            </p>
            <p className="flex gap-2 items-start">
              <FaExclamationTriangle className="mt-1 text-yellow-500" />
              Cancellation policy applies. For any changes, please contact us
              promptly.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ConfirmPage;
