import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { tour: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error("GET Bookings Error:", error);
    return NextResponse.json({ error: "Lỗi lấy danh sách booking" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      tourId,
      tourTitle,
      customerName,
      customerPhone,
      customerEmail,
      departureDate,
      guests,
      totalPrice,
      notes,
    } = body;

    if (!customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Vui lòng nhập họ tên và số điện thoại" },
        { status: 400 }
      );
    }

    // Safely check if tourId exists in Database
    let validTourId: string | null = null;
    let resolvedTourTitle = tourTitle || "";
    if (tourId) {
      const existingTour = await prisma.tour.findFirst({
        where: { OR: [{ id: String(tourId) }, { slug: String(tourId) }] },
      });
      if (existingTour) {
        validTourId = existingTour.id;
        resolvedTourTitle = existingTour.title;
      }
    }

    const bookingCode = "WGT-" + Math.floor(100000 + Math.random() * 900000);

    // Prepend tour title into notes so admin can always see which tour
    const finalNotes = resolvedTourTitle
      ? `[Tour: ${resolvedTourTitle}]${notes ? " | " + notes : ""}`
      : notes || null;

    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        tourId: validTourId,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        departureDate: departureDate ? new Date(departureDate) : new Date(),
        guests: parseInt(guests) || 1,
        totalPrice: parseFloat(totalPrice) || 0,
        notes: finalNotes,
      },
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error("POST Booking Error:", error);
    return NextResponse.json({ error: "Lỗi lưu thông tin đặt tour" }, { status: 500 });
  }
}
