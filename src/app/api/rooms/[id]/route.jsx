import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export const DELETE = async (req, { params }) => {
  const bookingCollection = await dbConnect(collectionNameObj.bookingCollection);

  const query = { _id: new ObjectId(params.id) };
  const session = await getServerSession(authOptions);

  const currentBooking = await bookingCollection.findOne(query);
  if (!currentBooking) {
    return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
  }

  const isOwnerOk = session?.user?.email === currentBooking.customer.email;

  if (isOwnerOk) {
    const deleteResponse = await bookingCollection.deleteOne(query);
    if (deleteResponse.deletedCount === 1) {
      return NextResponse.json({ success: true, message: "Booking deleted successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Failed to delete booking" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ success: false, message: "Forbidden Action" }, { status: 401 });
  }
};



export const GET = async (req, { params }) => {
  const roomCollection = await dbConnect(collectionNameObj.roomCollection);
  const data = await roomCollection.findOne({ _id: new ObjectId(params.id) });

  if (!data) {
    return NextResponse.json({ message: "Room not found" }, { status: 404 });
  }

  return NextResponse.json(data);
};


