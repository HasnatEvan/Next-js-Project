import { FaBed, FaTag, FaCircle, FaDoorOpen, FaListUl } from "react-icons/fa";
import Link from "next/link";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const DetailsPage = async ({ params }) => {
 const res=await fetch(`http://localhost:3000/api/rooms/${params.id}`)

const data = await res.json();

  if (!data) {
    return (
      <div className="p-6 text-center text-lg text-red-600">
        Room not found.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-4 text-gray-700">
      <div className="max-w-4xl mx-auto bg-white p-8 flex flex-col">
        <h1 className="text-4xl font-extrabold mb-6 text-[#3972C1] flex items-center gap-3">
          <FaDoorOpen /> {data.roomName}
        </h1>

        <div className="relative w-full h-72 md:h-96 mb-8 rounded-xl overflow-hidden shadow-md">
          <img
            src={data.image}
            alt={data.roomName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 "></div>
        </div>

        <p className="text-lg leading-relaxed mb-8">{data.description}</p>

        <div className="grid grid-cols-2 gap-8 text-gray-600 text-base md:text-lg mb-10">
          <p className="flex items-center gap-2">
            <FaBed className="text-[#3972C1]" />
            <span className="font-semibold">Type:</span> {data.roomType}
          </p>
          <p className="flex items-center gap-2">
            <FaTag className="text-[#3972C1]" />
            <span className="font-semibold">Price:</span> ৳{data.price}
          </p>
          <p className="flex items-center gap-2">
            <FaBed className="text-[#3972C1]" />
            <span className="font-semibold">Beds:</span> {data.beds}
          </p>
          <p className="flex items-center gap-2">
            <FaCircle
              className={`text-sm ${
                data.status === "Available"
                  ? "text-green-500"
                  : data.status === "Unavailable"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            />
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-semibold ${
                data.status === "Available"
                  ? "text-green-600"
                  : data.status === "Unavailable"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {data.status}
            </span>
          </p>
        </div>

        {data.amenities?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-[#3972C1]">
              <FaListUl /> Amenities
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
              {data.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href={data.status === "Available" ? `/ConfirmBooking/${data._id}` : "#"}
          className={`mt-10 py-3 px-6 rounded-lg text-white text-center text-lg font-semibold transition-colors duration-300 ${
            data.status === "Available"
              ? "bg-[#3972C1] hover:bg-[#2f5ea0] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          Proceed to Booking
        </Link>
      </div>
    </div>
  );
};

export default DetailsPage;
