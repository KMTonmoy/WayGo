
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/connectDB";

export const GET = async () => {
    const db = await connectDB()
    const bannerCollection = db.collection('BannerCollection')
    try {
        const banner = await bannerCollection.find().toArray();
        return NextResponse.json({ banner })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "No Data Found", error })
    }
}