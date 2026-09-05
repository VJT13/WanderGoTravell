import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tour = await prisma.tour.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!tour) {
      return NextResponse.json({ error: "Không tìm thấy tour" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tour });
  } catch (error) {
    console.error("GET Tour Error:", error);
    return NextResponse.json({ error: "Lỗi lấy thông tin tour" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updatedTour = await prisma.tour.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(destination && { destination }),
        ...(duration && { duration }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(originalPrice !== undefined && { originalPrice: parseFloat(originalPrice) }),
        ...(image && { image }),
        ...(badge !== undefined && { badge }),
        ...(badgeColor !== undefined && { badgeColor }),
        ...(description !== undefined && { description }),
        ...(highlights !== undefined && {
          highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights || []),
        }),
        ...(itinerary !== undefined && {
          itinerary: typeof itinerary === "string" ? itinerary : JSON.stringify(itinerary || []),
        }),
        ...(finalCategoryId && { categoryId: finalCategoryId }),
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, data: updatedTour });
  } catch (error) {
    console.error("PUT Tour Error:", error);
    return NextResponse.json({ error: "Lỗi cập nhật tour" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.tour.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Đã xóa tour thành công" });
  } catch (error) {
    console.error("DELETE Tour Error:", error);
    return NextResponse.json({ error: "Lỗi xóa tour" }, { status: 500 });
  }
}
