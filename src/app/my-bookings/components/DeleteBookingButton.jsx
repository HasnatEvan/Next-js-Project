"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DeleteBookingButton = ({ id, onDelete }) => {
  const { data: session } = useSession();

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://hotelbookings-system-app.vercel.app/api/rooms/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        MySwal.fire("Canceled!", "Your booking has been canceled.", "success");
        if (onDelete) onDelete(id);
      } else {
        MySwal.fire("Error!", data.message || "Failed to cancel booking.", "error");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      MySwal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
    >
      <FaTrash className="inline mr-1" /> Cancel
    </button>
  );
};

export default DeleteBookingButton;
