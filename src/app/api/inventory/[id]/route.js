import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";




// DELETE a room by ID
export const DELETE = async (req, { params }) => {
  try {
    const roomCollection = await dbConnect(collectionNameObj.roomCollection);

    const query = { _id: new ObjectId(params.id) };

    const result = await roomCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Room deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json({ message: "Failed to delete room" }, { status: 500 });
  }
};


export const GET = async (req, { params }) => {
  try {
    const roomCollection = await dbConnect(collectionNameObj.roomCollection); // ✅ await added

    const singleRoom = await roomCollection.findOne({ _id: new ObjectId(params.id) });

    if (!singleRoom) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(singleRoom, { status: 200 });
  } catch (error) {
    console.error("Error fetching single room:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const roomCollection = await dbConnect(collectionNameObj.roomCollection);
    const id = params.id;

    const body = await req.json();

    const query = { _id: new ObjectId(id) };

    const updateDoc = {
      $set: {
        roomName: body.roomName,
        roomType: body.roomType,
        price: body.price,
        beds: body.beds,
        description: body.description,
        amenities: body.amenities,
        status: body.status,
        image: body.image,
      },
    };

    const result = await roomCollection.updateOne(query, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Room updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json({ message: "Failed to update room" }, { status: 500 });
  }
};