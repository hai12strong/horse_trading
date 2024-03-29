import { connectMongoDB } from "@/lib/mongodb";
import HorseGame from "@/models/horseGame";
//import GameData from "@/models/gameData";
import { NextResponse } from "next/server";
import mongoose, {Schema, models} from "mongoose";
export async function POST(req) {
    try {
        const { userwinner, winnerprice, usersurplus } = await req.json();
        console.log("the winner", userwinner);
        await connectMongoDB();
        //const user = await User.findOne({email}).select("_id");
        await HorseGame.updateMany({isactive: "active"}, {isactive: "ended", winner: userwinner, agreedprice: winnerprice, surplus: usersurplus,}); 
        return NextResponse.json(
            {message: "Game ended."}, {status: 201}
        );

    } catch (error) {
        console.log(error);
    }
}