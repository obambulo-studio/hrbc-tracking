import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const entry = await prisma.entry.create({
      data: {
        date: body.date,
        zeroToFour: body.zeroToFour,
        fiveToNine: body.fiveToNine,
        tenToFourteen: body.tenToFourteen,
        fifteenToNineteen: body.fifteenToNineteen,
        twentyToTwentyFour: body.twentyToTwentyFour,
        twentyFiveToTwentyNine: body.twentyFiveToTwentyNine,
        thirtyToThirtyFour: body.thirtyToThirtyFour,
        thirtyFiveToThirtyNine: body.thirtyFiveToThirtyNine,
        fortyToFortyFour: body.fortyToFortyFour,
        fortyFiveToFortyNine: body.fortyFiveToFortyNine,
        fiftyToFiftyFour: body.fiftyToFiftyFour,
        fiftyFiveToFiftyNine: body.fiftyFiveToFiftyNine,
        sixtyToSixtyFour: body.sixtyToSixtyFour,
        sixtyFiveToSixtyNine: body.sixtyFiveToSixtyNine,
        seventyToSeventyFour: body.seventyToSeventyFour,
        seventyFiveToSeventyNine: body.seventyFiveToSeventyNine,
        eightyToEightyFour: body.eightyToEightyFour,
        eightyFiveToEightyNine: body.eightyFiveToEightyNine,
        ninetyToNinetyFour: body.ninetyToNinetyFour,
        ninetyFivePlus: body.ninetyFivePlus,
        total: body.total,
      },
    });

    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    console.error("Error submitting data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit data" },
      { status: 500 },
    );
  }
}
