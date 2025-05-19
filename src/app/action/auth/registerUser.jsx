'use server'

import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import bcrypt from 'bcryptjs'

export const registerUser = async ({ name, email, password, imageUrl }) => {
    if (!email || !password || !name || !imageUrl) {
        return { success: false, message: "All fields are required" }
    }

    const userCollection = await dbConnect(collectionNameObj.userCollection);

    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
        return { success: false, message: "User already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userCollection.insertOne({
        name,
        email,
        password: hashedPassword,
        image: imageUrl,
        role: "customer",
        createdAt: new Date()
    });

    if (result.insertedId) {
        return { success: true };
    }

    return { success: false, message: "Failed to register" };
};
