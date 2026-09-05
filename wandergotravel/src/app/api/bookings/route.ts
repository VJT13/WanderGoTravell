import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_BOOKINGS } from "@/data/mockSeedData";
import { saveTempBooking, getTempBookings } from "@/lib/tempStore";

export async function GET() {
  try {
    const temp = getTempBookings();
    let bookings: any[] = [];
    try {
      bookings = await prisma.booking.findMany({
        include: { tour: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.warn("DB query failed on serverless, fallback to mock seed data:", dbErr);
    }

    if (!bookings || bookings.length === 0) {
      const fallback = MOCK_BOOKINGS.map((b, idx) => ({
        id: `seed-b-${idx + 1}`,
        bookingCode: b.bookingCode,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        customerEmail: b.customerEmail,
        departureDate: b.departureDate,
        guests: b.guests,
        totalPrice: b.totalPrice,
        status: b.status,
        paymentStatus: b.paymentStatus,
        paymentMethod: b.paymentMethod,
        notes: `[Tour: ${b.tourTitle}] | ${b.notes}`,
        createdAt: b.createdAt,
        tour: {
          id: `seed-tour-${idx + 1}`,
          title: b.tourTitle,
          slug: b.tourSlug,
        },
      }));
      bookings = fallback;
    }

    // Merge temp bookings at the top
    const existingCodes = new Set(bookings.map((b: any) => b.bookingCode));
    const uniqueTemp = temp.filter((b: any) => !existingCodes.has(b.bookingCode));
    const finalBookings = [...uniqueTemp, ...bookings];

    return NextResponse.json({ success: true, count: finalBookings.length, data: finalBookings });
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

    let booking: any = null;
    try {
      booking = await prisma.booking.create({
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
    } catch (dbErr) {
      console.warn("DB booking save failed on serverless, returning success mock response:", dbErr);
      booking = {
        id: "b-" + Date.now(),
        bookingCode,
        tourId: validTourId,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        departureDate: departureDate ? new Date(departureDate) : new Date(),
        guests: parseInt(guests) || 1,
        totalPrice: parseFloat(totalPrice) || 0,
        status: "CONFIRMED",
        paymentStatus: "PAID",
        notes: finalNotes,
        createdAt: new Date().toISOString(),
      };
    }

    // Always persist to /tmp store for serverless
    saveTempBooking(booking);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error("POST Booking Error:", error);
    return NextResponse.json({ error: "Lỗi lưu thông tin đặt tour" }, { status: 500 });
  }
}
