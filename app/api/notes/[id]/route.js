import dbConnection from "@/lib/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function DELETE(request, {params}){
  try{
    const {id} = await params;
    await dbConnection()
    const note = await Note.findByIdAndDelete(id);

    if(!note){
      return NextResponse.json({success: false, error: "Note not found"}, {status: 404});
    }
    return NextResponse.json({success: true}, {data: {}})
  } catch(error){
    return NextResponse.json({success: false}, {error: error.message}, {status: 400})
  }
}