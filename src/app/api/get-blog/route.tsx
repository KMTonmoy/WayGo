
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/connectDB";

export const GET = async () => {
    const db = await connectDB()
    const blogCollection = db.collection('blogCollection')
    try {
        const banner = await blogCollection.find().toArray();
        return NextResponse.json({ banner })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "No Data Found", error })
    }
}