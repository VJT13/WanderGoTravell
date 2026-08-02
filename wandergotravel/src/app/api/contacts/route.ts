import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, email, departureDate, guests, serviceType, message } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Vui lòng nhập họ tên và số điện thoại" },
        { status: 400 }
      );
    }

    const newContact = await prisma.contact.create({
      data: {
        fullName,
        phone,
        email: email || null,
        departureDate: departureDate || null,
        guests: guests || null,
        serviceType: serviceType || null,
        message: message || null,
      },
    });

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    console.error("POST Contact Error:", error);
    return NextResponse.json({ error: "Lỗi gửi thông tin liên hệ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error("GET Contacts Error:", error);
    return NextResponse.json({ error: "Lỗi lấy danh sách liên hệ" }, { status: 500 });
  }
}
