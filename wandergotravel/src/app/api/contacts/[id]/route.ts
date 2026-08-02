import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    await prisma.contact.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Contact Error:", error);
    return NextResponse.json({ error: "Lỗi xóa yêu cầu liên hệ" }, { status: 500 });
  }
}
