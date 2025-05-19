import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const loginUser = async ({ email, password }) => {
  const userCollection = await dbConnect(collectionNameObj.userCollection);

  // ইউজার খুঁজে নাও ইমেইল দিয়ে
  const user = await userCollection.findOne({ email });
  if (!user) return null;

  // পাসওয়ার্ড মিলছে কিনা যাচাই করো
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // পাসওয়ার্ড বাদ দিয়ে ইউজার রিটার্ন করো
  const { password: pwd, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
