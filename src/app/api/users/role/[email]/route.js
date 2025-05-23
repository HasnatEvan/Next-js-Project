import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // তোমার ডাটাবেজ কানেকশন ফাইল
import { collectionNameObj } from "@/lib/dbConnect"; // collections এখানে define করা আছে ধরে নিচ্ছি

export const GET = async (req, { params }) => {
    const email = params.email;

    try {
        const userCollection = await dbConnect(collectionNameObj.userCollection);
        const user = await userCollection.findOne({ email });

        return NextResponse.json({ role: user?.role || null });
    } catch (error) {
        console.error("Error fetching user role:", error);
        return NextResponse.json(
            { message: "Failed to fetch user role" },
            { status: 500 }
        );
    }
};
