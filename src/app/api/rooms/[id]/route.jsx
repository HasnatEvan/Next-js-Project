import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const roomCollection = await dbConnect(collectionNameObj.roomCollection);
  const data = await roomCollection.findOne({ _id: new ObjectId(params.id) });

  if (!data) {
    return NextResponse.json({ message: "Room not found" }, { status: 404 });
  }

  return NextResponse.json(data);
};

