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

    let tours: any[] = [];
    try {
      tours = await prisma.tour.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.warn("DB query failed on serverless, fallback to INITIAL_TOURS:", dbErr);
    }

    if (!tours || tours.length === 0) {
      const { INITIAL_TOURS } = await import("@/data/toursData");
      let fallback = INITIAL_TOURS.map((t, idx) => ({
        id: `seed-tour-${idx + 1}`,
        title: t.title,
        slug: t.slug || `tour-${idx + 1}`,
        destination: t.destination,
        duration: t.duration,
        price: t.price,
        originalPrice: t.originalPrice,
        rating: t.rating,
        reviewsCount: t.reviewsCount || t.reviews || 50,
        image: t.image,
        badge: t.badge,
        badgeColor: t.badgeColor,
        description: t.description || "",
        highlights: JSON.stringify(t.highlights || []),
        isActive: true,
        category: {
          id: `cat-${t.category}`,
          name: t.category === "tay-bac" ? "Tour Tây Bắc - Miền Bắc" : t.category === "tay-nguyen" ? "Tour Tây Nguyên" : "Tour Miền Trung",
          slug: t.category,
        },
      }));

      if (category && category !== "all") {
        fallback = fallback.filter((t) => t.category.slug === category || t.category.slug.includes(category));
      }

      return NextResponse.json({ success: true, count: fallback.length, data: fallback });
    }

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
