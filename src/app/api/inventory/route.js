import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET all rooms
export const GET = async () => {
  try {
    const roomCollection = await dbConnect(collectionNameObj.roomCollection);
    const result = await roomCollection.find({}).toArray();

    console.log("Rooms fetched:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json({ message: "Failed to fetch rooms" }, { status: 500 });
  }
};
