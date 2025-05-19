import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();

    // MongoDB collection
    const bookingCollection = await dbConnect(collectionNameObj.bookingCollection);

    // Insert booking data
    const result = await bookingCollection.insertOne(body);

    return NextResponse.json(
      { message: "✅ Booking saved successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Booking error:", error);
    return NextResponse.json(
      { message: "❌ Failed to save booking", error: error.message },
      { status: 500 }
    );
  }
};
