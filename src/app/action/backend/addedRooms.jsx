'use server'

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";


export const addedRooms = async ({
  roomName,
  roomType,
  price,
  beds,
  description,
  status,
  amenities,
  image: imageUrl,
  admin,
}) => {
  try {
    const roomCollection = await dbConnect(collectionNameObj.roomCollection);

    const newRoom = {
      roomName,
      roomType,
      price: parseFloat(price),
      beds: parseInt(beds),
      description,
      status,
      amenities,
      image: imageUrl,
      admin,
      createdAt: new Date(),
    };

    const result = await roomCollection.insertOne(newRoom);

    // Convert insertedId to string before returning
    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Failed to add room:", error);
    throw new Error("Room insert failed");
  }
};
