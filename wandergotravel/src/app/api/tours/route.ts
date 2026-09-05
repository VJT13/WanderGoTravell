import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get("destination");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: any = { isActive: true };
    if (destination) {
      where.destination = { contains: destination };
    }
    if (category && category !== "all") {
      where.category = {
        OR: [
          { slug: category },
          { slug: `tour-${category}` },
          { id: category },
        ],
      };
    }
    if (featured === "true") {
      where.isFeatured = true;
    }

    const tours = await prisma.tour.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: tours.length, data: tours });
  } catch (error) {
    console.error("GET Tours Error:", error);
    return NextResponse.json({ error: "Lỗi lấy danh sách tour" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      destination,
      duration,
      price,
      originalPrice,
      image,
      badge,
      badgeColor,
      description,
      highlights,
      itinerary,
      categoryId,
      categorySlug,
    } = body;

    if (!title || !destination || !duration || !price || !image) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ thông tin bắt buộc" },
        { status: 400 }
      );
    }

    let finalCategoryId = categoryId;
    if (!finalCategoryId && categorySlug) {
      const cat = await prisma.category.findFirst({
        where: {
          OR: [
            { slug: categorySlug },
            { slug: `tour-${categorySlug}` },
          ],
        },
      });
      if (cat) finalCategoryId = cat.id;
    }

    const slug =
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-") +
      "-" +
      Date.now();

    const newTour = await prisma.tour.create({
      data: {
        title,
        slug,
        destination,
        duration,
        price: parseFloat(price),
        originalPrice: parseFloat(originalPrice || price),
        image,
        badge,
        badgeColor,
        description,
        highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights || []),
        itinerary: typeof itinerary === "string" ? itinerary : JSON.stringify(itinerary || []),
        categoryId: finalCategoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ success: true, data: newTour }, { status: 201 });
  } catch (error) {
    console.error("POST Tour Error:", error);
    return NextResponse.json({ error: "Lỗi tạo tour mới" }, { status: 500 });
  }
}
