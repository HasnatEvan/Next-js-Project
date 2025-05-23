import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";








export const PATCH = async (req, { params }) => {
  try {
    const bookingCollection = await dbConnect(collectionNameObj.bookingCollection);
    const id = params.id;

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ message: "Status is required" }, { status: 400 });
    }

    // Find the booking
    const bookingInfo = await bookingCollection.findOne({ _id: new ObjectId(id) });
    if (!bookingInfo) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    if (bookingInfo.status === status) {
      return NextResponse.json({ message: "Booking status is already updated" }, { status: 400 });
    }

    // Update the status
    const result = await bookingCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ success: true, message: "Booking status updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Failed to update booking status" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const bookingCollection = await dbConnect(collectionNameObj.bookingCollection);

    const query = { _id: new ObjectId(params.id) };

    const result = await bookingCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};



