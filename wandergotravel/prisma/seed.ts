import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { INITIAL_TOURS } from "../src/data/toursData";
import { MOCK_BOOKINGS, MOCK_CONTACTS } from "../src/data/mockSeedData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding WanderGoTravel database...");

  // 1. Create Default Admin User (admin / 1234)
  const hashedPassword = await bcrypt.hash("1234", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@wandergotravel.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@wandergotravel.com",
      password: hashedPassword,
      name: "Quản Trị Viên WanderGo",
      phone: "0977393425",
      role: "ADMIN",
    },
  });
  console.log("👤 Admin user created:", adminUser.email);

  // 2. Create Categories
  const catMienTrung = await prisma.category.upsert({
    where: { slug: "tour-mien-trung" },
    update: { name: "Tour Miền Trung" },
    create: {
      name: "Tour Miền Trung",
      slug: "tour-mien-trung",
      type: "TOUR",
    },
  });

  const catTayBac = await prisma.category.upsert({
    where: { slug: "tour-tay-bac" },
    update: { name: "Tour Tây Bắc - Miền Bắc" },
    create: {
      name: "Tour Tây Bắc - Miền Bắc",
      slug: "tour-tay-bac",
      type: "TOUR",
    },
  });

  const catTayNguyen = await prisma.category.upsert({
    where: { slug: "tour-tay-nguyen" },
    update: { name: "Tour Tây Nguyên" },
    create: {
      name: "Tour Tây Nguyên",
      slug: "tour-tay-nguyen",
      type: "TOUR",
    },
  });

  const catCombo = await prisma.category.upsert({
    where: { slug: "combo-tiet-kiem" },
    update: {},
    create: {
      name: "Combo Tiết Kiệm",
      slug: "combo-tiet-kiem",
      type: "COMBO",
    },
  });

  console.log("📂 Categories created/updated:", {
    mienTrung: catMienTrung.id,
    tayBac: catTayBac.id,
    tayNguyen: catTayNguyen.id,
  });

  // Map category slugs to category ids
  const categoryMap: Record<string, string> = {
    "mien-trung": catMienTrung.id,
    "tay-bac": catTayBac.id,
    "tay-nguyen": catTayNguyen.id,
  };

  // 3. Create All 20 Tours (Full Web Sync)
  const seededTourMap = new Map<string, string>(); // slug -> id

  for (const t of INITIAL_TOURS) {
    const slug = t.slug || t.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-");

    const categoryId = categoryMap[t.category] || catMienTrung.id;

    const savedTour = await prisma.tour.upsert({
      where: { slug },
      update: {
        title: t.title,
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
        highlights: typeof t.highlights === "string" ? t.highlights : JSON.stringify(t.highlights || []),
        categoryId: categoryId,
        isActive: true,
      },
      create: {
        title: t.title,
        slug,
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
        highlights: typeof t.highlights === "string" ? t.highlights : JSON.stringify(t.highlights || []),
        categoryId: categoryId,
        isActive: true,
      },
    });
    seededTourMap.set(slug, savedTour.id);
  }
  console.log(`🏞️ All ${INITIAL_TOURS.length} Tours across all regions seeded successfully!`);

  // 4. Seed Realistic Bookings (Matches ERP Revenue & Dashboard)
  console.log("🎫 Seeding realistic bookings...");
  for (const b of MOCK_BOOKINGS) {
    let tourId = seededTourMap.get(b.tourSlug);
    if (!tourId) {
      const found = await prisma.tour.findFirst({
        where: { OR: [{ slug: b.tourSlug }, { title: b.tourTitle }] },
      });
      if (found) tourId = found.id;
    }

    const finalNotes = `[Tour: ${b.tourTitle}] | ${b.notes}`;

    await prisma.booking.upsert({
      where: { bookingCode: b.bookingCode },
      update: {
        tourId: tourId || null,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        customerEmail: b.customerEmail,
        departureDate: new Date(b.departureDate),
        guests: b.guests,
        totalPrice: b.totalPrice,
        status: b.status,
        paymentStatus: b.paymentStatus,
        notes: finalNotes,
        createdAt: new Date(b.createdAt),
      },
      create: {
        bookingCode: b.bookingCode,
        tourId: tourId || null,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        customerEmail: b.customerEmail,
        departureDate: new Date(b.departureDate),
        guests: b.guests,
        totalPrice: b.totalPrice,
        status: b.status,
        paymentStatus: b.paymentStatus,
        notes: finalNotes,
        createdAt: new Date(b.createdAt),
      },
    });
  }
  console.log(`✅ Seeded ${MOCK_BOOKINGS.length} realistic bookings!`);

  // 5. Seed Realistic Contacts / Inquiries
  console.log("💬 Seeding realistic customer inquiries (Contacts)...");
  for (const c of MOCK_CONTACTS) {
    const existing = await prisma.contact.findFirst({
      where: {
        fullName: c.fullName,
        phone: c.phone,
      },
    });

    if (existing) {
      await prisma.contact.update({
        where: { id: existing.id },
        data: {
          email: c.email,
          departureDate: c.departureDate,
          guests: c.guests,
          serviceType: c.serviceType,
          message: c.message,
          status: c.status,
          createdAt: new Date(c.createdAt),
        },
      });
    } else {
      await prisma.contact.create({
        data: {
          fullName: c.fullName,
          phone: c.phone,
          email: c.email,
          departureDate: c.departureDate,
          guests: c.guests,
          serviceType: c.serviceType,
          message: c.message,
          status: c.status,
          createdAt: new Date(c.createdAt),
        },
      });
    }
  }
  console.log(`✅ Seeded ${MOCK_CONTACTS.length} realistic customer inquiries!`);

  // 6. Create Site Settings
  const settingsData = [
    { key: "site_name", value: "WanderGoTravel", group: "GENERAL" },
    { key: "site_title", value: "WanderGoTravel – Khám phá trọn vẹn vẻ đẹp Việt Nam", group: "SEO" },
    { key: "hotline", value: "0977 393 425", group: "CONTACT" },
    { key: "email", value: "wandergotravel18@gmail.com", group: "CONTACT" },
    { key: "zalo", value: "0977393425", group: "CONTACT" },
    { key: "facebook", value: "https://www.facebook.com/profile.php?id=61592688420184", group: "CONTACT" },
  ];

  for (const s of settingsData) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log("⚙️ Settings seeded!");
  console.log("🎉 All enterprise database records seeded and synchronized successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
