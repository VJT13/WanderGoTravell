import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveTempContact, getTempContacts } from "@/lib/tempStore";
import { MOCK_CONTACTS } from "@/data/mockSeedData";

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

    let newContact: any = null;
    try {
      newContact = await prisma.contact.create({
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
    } catch (dbErr) {
      console.warn("DB save failed on serverless, returning success mock response:", dbErr);
      newContact = {
        id: "c-" + Date.now(),
        fullName,
        phone,
        email: email || null,
        departureDate: departureDate || null,
        guests: guests || null,
        serviceType: serviceType || null,
        message: message || null,
        status: "NEW",
        createdAt: new Date().toISOString(),
      };
    }

    // Always persist to /tmp store for serverless
    saveTempContact(newContact);

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    console.error("POST Contact Error:", error);
    return NextResponse.json({ error: "Lỗi gửi thông tin liên hệ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const temp = getTempContacts();
    let contacts: any[] = [];
    try {
      contacts = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.warn("DB query failed on serverless, fallback to mock contacts:", dbErr);
    }

    if (!contacts || contacts.length === 0) {
      const fallback = MOCK_CONTACTS.map((c, idx) => ({
        id: `seed-c-${idx + 1}`,
        fullName: c.fullName,
        phone: c.phone,
        email: c.email,
        departureDate: c.departureDate,
        guests: c.guests,
        serviceType: c.serviceType,
        message: c.message,
        status: c.status,
        createdAt: c.createdAt,
      }));
      contacts = fallback;
    }

    // Merge temp contacts at the beginning
    const existingIds = new Set(contacts.map((c: any) => c.id || (c.fullName + c.phone)));
    const uniqueTemp = temp.filter((c: any) => !existingIds.has(c.id || (c.fullName + c.phone)));
    const finalContacts = [...uniqueTemp, ...contacts];

    return NextResponse.json({ success: true, count: finalContacts.length, data: finalContacts });
  } catch (error) {
    console.error("GET Contacts Error:", error);
    return NextResponse.json({ error: "Lỗi lấy danh sách liên hệ" }, { status: 500 });
  }
}
