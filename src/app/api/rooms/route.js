import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";













export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  if (session) {
    const email = session.user?.email;

    const bookingCollection = await dbConnect(collectionNameObj.bookingCollection);

    // Correct way to query nested fields
    const result = await bookingCollection.find({ "customer.email": email }).toArray();

    return NextResponse.json(result);
  }

  return NextResponse.json([]);
};
export const POST = async (req) => {
  try {
    const body = await req.json();
    const bookingCollection = await dbConnect(collectionNameObj.bookingCollection);
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
