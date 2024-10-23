import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const entry = await prisma.entry.create({
      data: {
        date: body.date,
        service: body.service,
        maleZeroToFour: body.maleZeroToFour,
        femaleZeroToFour: body.femaleZeroToFour,
        maleFiveToNine: body.maleFiveToNine,
        femaleFiveToNine: body.femaleFiveToNine,
        maleTenToFourteen: body.maleTenToFourteen,
        femaleTenToFourteen: body.femaleTenToFourteen,
        maleFifteenToNineteen: body.maleFifteenToNineteen,
        femaleFifteenToNineteen: body.femaleFifteenToNineteen,
        maleTwentyToTwentyFour: body.maleTwentyToTwentyFour,
        femaleTwentyToTwentyFour: body.femaleTwentyToTwentyFour,
        maleTwentyFiveToTwentyNine: body.maleTwentyFiveToTwentyNine,
        femaleTwentyFiveToTwentyNine: body.femaleTwentyFiveToTwentyNine,
        maleThirtyToThirtyFour: body.maleThirtyToThirtyFour,
        femaleThirtyToThirtyFour: body.femaleThirtyToThirtyFour,
        maleThirtyFiveToThirtyNine: body.maleThirtyFiveToThirtyNine,
        femaleThirtyFiveToThirtyNine: body.femaleThirtyFiveToThirtyNine,
        maleFortyToFortyFour: body.maleFortyToFortyFour,
        femaleFortyToFortyFour: body.femaleFortyToFortyFour,
        maleFortyFiveToFortyNine: body.maleFortyFiveToFortyNine,
        femaleFortyFiveToFortyNine: body.femaleFortyFiveToFortyNine,
        maleFiftyToFiftyFour: body.maleFiftyToFiftyFour,
        femaleFiftyToFiftyFour: body.femaleFiftyToFiftyFour,
        maleFiftyFiveToFiftyNine: body.maleFiftyFiveToFiftyNine,
        femaleFiftyFiveToFiftyNine: body.femaleFiftyFiveToFiftyNine,
        maleSixtyToSixtyFour: body.maleSixtyToSixtyFour,
        femaleSixtyToSixtyFour: body.femaleSixtyToSixtyFour,
        maleSixtyFiveToSixtyNine: body.maleSixtyFiveToSixtyNine,
        femaleSixtyFiveToSixtyNine: body.femaleSixtyFiveToSixtyNine,
        maleSeventyToSeventyFour: body.maleSeventyToSeventyFour,
        femaleSeventyToSeventyFour: body.femaleSeventyToSeventyFour,
        maleSeventyFiveToSeventyNine: body.maleSeventyFiveToSeventyNine,
        femaleSeventyFiveToSeventyNine: body.femaleSeventyFiveToSeventyNine,
        maleEightyToEightyFour: body.maleEightyToEightyFour,
        femaleEightyToEightyFour: body.femaleEightyToEightyFour,
        maleEightyFiveToEightyNine: body.maleEightyFiveToEightyNine,
        femaleEightyFiveToEightyNine: body.femaleEightyFiveToEightyNine,
        maleNinetyToNinetyFour: body.maleNinetyToNinetyFour,
        femaleNinetyToNinetyFour: body.femaleNinetyToNinetyFour,
        maleNinetyFivePlus: body.maleNinetyFivePlus,
        femaleNinetyFivePlus: body.femaleNinetyFivePlus,
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
