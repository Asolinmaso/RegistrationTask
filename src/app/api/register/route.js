// File: app/api/register/route.ts

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();

    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), "details.json");

    // Read the existing data from the file
    const fileData = await fs.readFile(filePath, "utf-8");
    const existingDetails = JSON.parse(fileData);

    // Generate a new ID (assuming incremental IDs based on the last entry)
    const newId = existingDetails.length > 0
      ? existingDetails[existingDetails.length - 1].id + 1
      : 1;

    // Add the new entry with the generated ID
    const newEntry = { id: newId, ...data };
    const updatedDetails = [...existingDetails, newEntry];

    // Save the updated details back to the file
    await fs.writeFile(filePath, JSON.stringify(updatedDetails, null, 2), "utf-8");

    return NextResponse.json({ message: "Details saved successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error saving details", error }, { status: 500 });
  }
}
