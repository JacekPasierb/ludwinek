import {NextResponse} from "next/server";
import {connectToDatabase} from "../../../lib/mongo";
import Payment from "../../../models/Payment";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const data = await req.json();
    const payment = await Payment.create(data);
    return NextResponse.json({success: true, payment});
  } catch (error) {
    return NextResponse.json({success: false, error}, {status: 500});
  }
};

export const GET = async ()=>{
    try {
        await connectToDatabase();
        const payments = await Payment.find().sort({createdAt:-1})
        return NextResponse.json({success: true, payments});
    } catch (error) {
        return NextResponse.json({success: false, error}, {status: 500});

    }
}