import { Students } from "models/students";
import connectMongoDB from "db/connection";
import { NextResponse } from "next/server";
import { encrypt } from "utils/cryptojs";

const sendSResponse = (data: any) =>
  NextResponse.json(encrypt({ status: true, data }));

const sendFResponse = (error: string) =>
  NextResponse.json(encrypt({ status: false, error }));

export async function GET() {
  await connectMongoDB();
  const stundents = await Students.find();
  if (!stundents) return sendFResponse("Stundents not found");
  return sendSResponse(stundents);
}

export async function POST(req: any) {
  let { name, age, gender, job } = await req.json();
  await connectMongoDB();
  const stundents = await Students.create({ name, age, gender, job });
  if (!stundents) return sendFResponse("Something went wrong");
  return sendSResponse(stundents);
}
