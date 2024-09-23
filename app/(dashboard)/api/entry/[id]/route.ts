import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const user = await currentUser();

  const isAdmin = user && user.privateMetadata.admin === true;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  const res = await request.json();

  try {
    await prisma.entry.delete({
      where: {
        id: res.id,
      },
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "success" });
}
