import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;
    const body = await req.json();
    const { status } = body;

    const updated = await prisma.contact.update({
      where: { id },
      data: { ...(status && { status }) },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH Contact Error:", error);
    return NextResponse.json({ error: "Lỗi cập nhật trạng thái liên hệ" }, { status: 500 });
  }
}

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
