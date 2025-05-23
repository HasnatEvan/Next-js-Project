import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const GET = async (req) => {
  const bookingCollection = await dbConnect(collectionNameObj.bookingCollection);
  const result = await bookingCollection.find({}).toArray();
  console.log("Bookings fetched:", result);
  return NextResponse.json(result);
};



