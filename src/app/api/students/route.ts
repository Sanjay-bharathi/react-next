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
  if (!name || !age || !gender || !job) return sendFResponse("Please enter all the fields")
  const stundent = await Students.create({ name, age, gender, job });
  if (!stundent) return sendFResponse("Something went wrong");
  const stundents = await Students.find();
  return sendSResponse(stundents);
}


export async function DELETE(req: any) {
  await connectMongoDB();
  let { id } = await req.json();
  const stundent = await Students.findByIdAndRemove(id);
  if (!stundent) return sendFResponse("Something went wrong");
  const stundents = await Students.find();
  return sendSResponse(stundents);
}


export async function PUT(req: any) {
  await connectMongoDB();
  let { id, name, age, gender, job } = await req.json();
  if (!name || !age || !gender || !job) return sendFResponse("Please enter all the fields")
  const updatedStudent = await Students.findByIdAndUpdate(id, { name, age, gender, job }, { new: true });
  if (!updatedStudent) return sendFResponse("Something went wrong");
  const stundents = await Students.find();
  return sendSResponse(stundents);
}
