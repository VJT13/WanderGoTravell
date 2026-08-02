import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
  const catTour = await prisma.category.upsert({
    where: { slug: "tour-mien-trung" },
    update: {},
    create: {
      name: "Tour Miền Trung",
      slug: "tour-mien-trung",
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

  console.log("📂 Categories created");

  // 3. Create All 11 Central Vietnam Tours
  const toursData = [
    {
      title: "Huế - Đà Nẵng - Bà Nà Hills - Hội An",
      slug: "hue-da-nang-ba-na-hills-hoi-an-4n3d",
      destination: "Huế, Đà Nẵng, Hội An",
      duration: "4N3Đ",
      price: 1988000,
      originalPrice: 2500000,
      rating: 4.8,
      reviewsCount: 124,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
      badge: "Bán chạy",
      badgeColor: "#EF4444",
      categoryId: catTour.id,
      description: "Hành trình di sản 4 ngày 3 đêm đưa quý khách tham quan Cố Đô Huế trầm mặc, thành phố trẻ Đà Nẵng, Bà Nà Hills nguy nga và phố cổ Hội An rực rỡ đèn lồng.",
      highlights: JSON.stringify([
        "Khám phá Quần thể di tích Cố Đô Huế & Đại Nội Cung Đình",
        "Trải nghiệm cáp treo Bà Nà Hills đạt nhiều kỷ lục thế giới",
        "Check-in Cầu Vàng nổi tiếng toàn cầu",
        "Tản bộ ngắm Phố Cổ Hội An lung linh ánh đèn lồng đêm",
      ]),
    },
    {
      title: "Đà Nẵng - Bà Nà Hills - Phố Cổ Hội An",
      slug: "da-nang-ba-na-hills-pho-co-hoi-an-3n2d",
      destination: "Đà Nẵng, Hội An",
      duration: "3N2Đ",
      price: 5588000,
      originalPrice: 6500000,
      rating: 4.9,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80",
      badge: "Hot",
      badgeColor: "#F59E0B",
      categoryId: catTour.id,
      description: "Tour du lịch Đà Nẵng 3 ngày 2 đêm tinh gọn, trọn gói dịch vụ khách sạn 4 sao trung tâm biển Mỹ Khê.",
      highlights: JSON.stringify([
        "Thưởng ngoạn cảnh sắc tiên cảnh tại đỉnh Bà Nà",
        "Thưởng thức buffet 100 món ăn Á - Âu tại đỉnh núi",
        "Tắm biển Mỹ Khê - 1 trong 6 bãi biển đẹp nhất hành tinh",
      ]),
    },
    {
      title: "Quảng Bình - Huế - Đà Nẵng - Hội An",
      slug: "quang-binh-hue-da-nang-hoi-an-4n3d",
      destination: "Quảng Bình, Huế, Đà Nẵng",
      duration: "4N3Đ",
      price: 7988000,
      originalPrice: 9200000,
      rating: 4.7,
      reviewsCount: 67,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80",
      badge: "Mới",
      badgeColor: "#22C55E",
      categoryId: catTour.id,
      description: "Khám phá Vương quốc hang động Phong Nha - Kẻ Bàng Quảng Bình cùng chuỗi di sản miền Duyên Hải.",
      highlights: JSON.stringify([
        "Thuyền rồng du ngoạn Động Phong Nha huyền ảo",
        "Chiêm bái Chùa Thiên Mụ & Lăng Khải Định Cố Đô Huế",
        "Vượt đèo Hải Vân ngắm vịnh Lăng Cô tuyệt đẹp",
      ]),
    },
    {
      title: "Quảng Trị - Quảng Bình - Nghệ An",
      slug: "quang-tri-quang-binh-nghe-an-4n3d",
      destination: "Quảng Trị, Quảng Bình, Nghệ An",
      duration: "4N3Đ",
      price: 8988000,
      originalPrice: 10500000,
      rating: 4.6,
      reviewsCount: 45,
      image: "https://images.unsplash.com/photo-1464817739973-0128fe77aed1?w=600&q=80",
      badge: "Tâm Linh & Lịch Sử",
      badgeColor: "#8B5CF6",
      categoryId: catTour.id,
      description: "Hành trình tri ân & tìm về cội nguồn lịch sử đất Việt: Thành Cổ Quảng Trị, Nghĩa Trang Trường Sơn, Quê Bác Nam Đàn Nghệ An.",
      highlights: JSON.stringify([
        "Dâng hương Nghĩa Trang Quốc Gia Trường Sơn & Đường 9",
        "Viếng mộ Đại Tướng Võ Nguyên Giáp tại Vũng Chùa - Đảo Yến",
        "Tham quan Quê Bác Nam Đàn Nghệ An & Làng Sen",
      ]),
    },
    {
      title: "Nha Trang - Hang Rái - VinWonders",
      slug: "nha-trang-hang-rai-vinwonders-3n2d",
      destination: "Nha Trang",
      duration: "3N2Đ",
      price: 3888000,
      originalPrice: 4800000,
      rating: 4.9,
      reviewsCount: 156,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
      badge: "Bán chạy",
      badgeColor: "#EF4444",
      categoryId: catTour.id,
      description: "Tour biển đảo Nha Trang kết hợp khám phá công viên giải trí kỷ lục VinWonders & Hang Rái Ninh Thuận.",
      highlights: JSON.stringify([
        "Quậy tung công viên giải trí đỉnh cao VinWonders Đảo Hòn Tre",
        "Check-in vách đá san hô cổ Hang Rái kỳ vĩ",
        "Du ngoạn đảo Hòn Mun lặn ngắm san hô thiên nhiên",
      ]),
    },
    {
      title: "Nha Trang - Đà Lạt - Ninh Thuận",
      slug: "nha-trang-da-lat-ninh-thuan-5n4d",
      destination: "Nha Trang, Đà Lạt, Ninh Thuận",
      duration: "5N4Đ",
      price: 6888000,
      originalPrice: 8200000,
      rating: 4.8,
      reviewsCount: 98,
      image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&q=80",
      badge: "Hot",
      badgeColor: "#F59E0B",
      categoryId: catTour.id,
      description: "Hành trình biển xanh & hoa ngàn: Kết hợp thiên đường biển Nha Trang và thành phố mộng mơ Đà Lạt.",
      highlights: JSON.stringify([
        "Tắm biển Nha Trang & ngắm hoàng hôn ngàn hoa Đà Lạt",
        "Tham quan Tháp Ba Ponagar & Vườn hoa thành phố Đà Lạt",
        "Trải nghiệm hái nho tươi tại vườn nho Ninh Thuận",
      ]),
    },
    {
      title: "Phú Yên - Quy Nhơn - Kỳ Co - Eo Gió",
      slug: "phu-yen-quy-nhon-ky-co-eo-gio-3n2d",
      destination: "Phú Yên, Quy Nhơn",
      duration: "3N2Đ",
      price: 6988000,
      originalPrice: 8500000,
      rating: 4.7,
      reviewsCount: 73,
      image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
      badge: "Mới",
      badgeColor: "#22C55E",
      categoryId: catTour.id,
      description: "Khám phá miền đất Hoa Vàng Trên Cỏ Xanh Phú Yên và thiên đường biển xanh Kỳ Co Eo Gió Quy Nhơn.",
      highlights: JSON.stringify([
        "Đón bình minh tại Mũi Điện - Nơi đón ánh nắng đầu tiên trên đất liền Việt Nam",
        "Check-in Gành Đá Đĩa độc nhất vô nhị",
        "Đi cano siêu tốc ra bãi biển Kỳ Co trong xanh như Maldives",
      ]),
    },
    {
      title: "Nha Trang - Phú Yên - Quy Nhơn",
      slug: "nha-trang-phu-yen-quy-nhon-4n3d",
      destination: "Nha Trang, Phú Yên, Quy Nhơn",
      duration: "4N3Đ",
      price: 8988000,
      originalPrice: 10800000,
      rating: 4.8,
      reviewsCount: 61,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      badge: "Phổ Biến",
      badgeColor: "#0B74D1",
      categoryId: catTour.id,
      description: "Cung đường biển đảo duyên hải Nam Trung Bộ quyến rũ qua 3 tỉnh thành đẹp nhất Việt Nam.",
      highlights: JSON.stringify([
        "Thưởng thức hải sản tươi sống Tháp Bà & Đầm O Loan",
        "Tham quan Chùa Long Khánh & Tháp Tháp Chăm Bánh Ít",
      ]),
    },
    {
      title: "Phú Yên - Quy Nhơn - Kỳ Co - Pleiku",
      slug: "phu-yen-quy-nhon-ky-co-pleiku-5n4d",
      destination: "Phú Yên, Quy Nhơn, Gia Lai",
      duration: "5N4Đ",
      price: 9988000,
      originalPrice: 11500000,
      rating: 4.6,
      reviewsCount: 38,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
      badge: "Liên Tuyến",
      badgeColor: "#16A34A",
      categoryId: catTour.id,
      description: "Hành trình nối biển và đại ngàn: Từ rạn đá Phú Yên đến đại ngàn Tây Nguyên Biển Hồ Pleiku.",
      highlights: JSON.stringify([
        "Chiêm ngưỡng Biển Hồ T’nưng Pleiku - Đôi mắt Pleiku",
        "Tham quan Quảng trường Đại Đoàn Kết & Chùa Minh Thành",
      ]),
    },
    {
      title: "Du lịch Tây Nguyên huyền thoại",
      slug: "du-lich-tay-nguyen-huyen-thoai-4n3d",
      destination: "Đắk Lắk, Gia Lai, Kon Tum",
      duration: "4N3Đ",
      price: 8988000,
      originalPrice: 10500000,
      rating: 4.7,
      reviewsCount: 52,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      badge: "Đặc biệt",
      badgeColor: "#8B5CF6",
      categoryId: catTour.id,
      description: "Khám phá không gian văn hóa cồng chiêng Tây Nguyên, thủ phủ cà phê Buôn Ma Thuột & Thác Dray Nur hùng vĩ.",
      highlights: JSON.stringify([
        "Tham quan Bảo tàng thế giới Cà Phê Buôn Ma Thuột",
        "Cưỡi voi dạo cảnh Hồ Lắk & Giao lưu cồng chiêng bản địa",
        "Check-in Nhà thờ gỗ Kon Tum hàng trăm năm tuổi",
      ]),
    },
    {
      title: "Liên tuyến các tỉnh Tây Nguyên",
      slug: "lien-tuyen-cac-tinh-tay-nguyen-5n4d",
      destination: "Đắk Lắk, Gia Lai, Kon Tum, Lâm Đồng",
      duration: "5N4Đ",
      price: 9988000,
      originalPrice: 12000000,
      rating: 4.8,
      reviewsCount: 41,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
      badge: "Premium",
      badgeColor: "#0B74D1",
      categoryId: catTour.id,
      description: "Chương trình khám phá trọn vẹn Nam & Bắc Tây Nguyên qua 4 tỉnh thành Đắk Lắk, Gia Lai, Kon Tum, Lâm Đồng.",
      highlights: JSON.stringify([
        "Hành trình đèo dốc đại ngàn thơ mộng",
        "Thưởng thức cà phê nguyên chất Buôn Ma Thuột",
      ]),
    },
  ];

  for (const t of toursData) {
    await prisma.tour.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }
  console.log("🏞️ 11 Central Vietnam Tours seeded successfully!");

  // 4. Create Site Settings
  const settingsData = [
    { key: "site_name", value: "WanderGoTravel", group: "GENERAL" },
    { key: "site_title", value: "WanderGoTravel – Khám phá trọn vẹn vẻ đẹp Miền Trung", group: "SEO" },
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
  console.log("✅ Seeding completed successfully!");
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
