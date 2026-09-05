"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Star, Heart, Search, X, SlidersHorizontal, Mountain, Palmtree, Compass, Globe } from "lucide-react";
import { useState, useMemo } from "react";
import TourDetailModal, { TourData } from "../tour/TourDetailModal";
import BookingModal from "../booking/BookingModal";

/* ───────────────────── CATEGORY DEFINITIONS ───────────────────── */
type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
};

const categories: Category[] = [
  {
    id: "all",
    label: "Tất cả",
    icon: <Globe size={16} />,
    color: "#0B74D1",
    bgGradient: "linear-gradient(135deg, #0B74D120, #0284C720)",
  },
  {
    id: "mien-trung",
    label: "Miền Trung",
    icon: <Palmtree size={16} />,
    color: "#F59E0B",
    bgGradient: "linear-gradient(135deg, #F59E0B20, #D9770620)",
  },
  {
    id: "tay-bac",
    label: "Tây Bắc - Miền Bắc",
    icon: <Mountain size={16} />,
    color: "#22C55E",
    bgGradient: "linear-gradient(135deg, #22C55E20, #15803D20)",
  },
  {
    id: "tay-nguyen",
    label: "Tây Nguyên",
    icon: <Compass size={16} />,
    color: "#8B5CF6",
    bgGradient: "linear-gradient(135deg, #8B5CF620, #7C3AED20)",
  },
];

/* ───────────────────── ALL TOUR DATA ───────────────────── */
const allTours: (TourData & { category: string })[] = [
  // ── MIỀN TRUNG ──
  {
    id: 1,
    title: "Huế - Đà Nẵng - Bà Nà Hills - Hội An",
    destination: "Huế, Đà Nẵng, Hội An",
    duration: "4N3Đ",
    price: 1988000,
    originalPrice: 2500000,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
    badge: "Bán chạy",
    badgeColor: "#EF4444",
    category: "mien-trung",
  },
  {
    id: 2,
    title: "Đà Nẵng - Bà Nà Hills - Phố Cổ Hội An",
    destination: "Đà Nẵng, Hội An",
    duration: "3N2Đ",
    price: 5588000,
    originalPrice: 6500000,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80",
    badge: "Hot",
    badgeColor: "#F59E0B",
    category: "mien-trung",
  },
  {
    id: 3,
    title: "Quảng Bình - Huế - Đà Nẵng - Hội An",
    destination: "Quảng Bình, Huế, Đà Nẵng",
    duration: "4N3Đ",
    price: 7988000,
    originalPrice: 9200000,
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80",
    badge: "Mới",
    badgeColor: "#22C55E",
    category: "mien-trung",
  },
  {
    id: 4,
    title: "Quảng Trị - Quảng Bình - Nghệ An",
    destination: "Quảng Trị, Quảng Bình, Nghệ An",
    duration: "4N3Đ",
    price: 8988000,
    originalPrice: 10500000,
    rating: 4.6,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1464817739973-0128fe77aed1?w=600&q=80",
    badge: null,
    badgeColor: null,
    category: "mien-trung",
  },
  {
    id: 5,
    title: "Nha Trang - Hang Rái - VinWonders",
    destination: "Nha Trang",
    duration: "3N2Đ",
    price: 3888000,
    originalPrice: 4800000,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    badge: "Bán chạy",
    badgeColor: "#EF4444",
    category: "mien-trung",
  },
  {
    id: 6,
    title: "Nha Trang - Đà Lạt - Ninh Thuận",
    destination: "Nha Trang, Đà Lạt, Ninh Thuận",
    duration: "5N4Đ",
    price: 6888000,
    originalPrice: 8200000,
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&q=80",
    badge: "Hot",
    badgeColor: "#F59E0B",
    category: "mien-trung",
  },
  {
    id: 7,
    title: "Phú Yên - Quy Nhơn - Kỳ Co - Eo Gió",
    destination: "Phú Yên, Quy Nhơn",
    duration: "3N2Đ",
    price: 6988000,
    originalPrice: 8500000,
    rating: 4.7,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
    badge: "Mới",
    badgeColor: "#22C55E",
    category: "mien-trung",
  },
  {
    id: 8,
    title: "Nha Trang - Phú Yên - Quy Nhơn",
    destination: "Nha Trang, Phú Yên, Quy Nhơn",
    duration: "4N3Đ",
    price: 8988000,
    originalPrice: 10800000,
    rating: 4.8,
    reviews: 61,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    badge: null,
    badgeColor: null,
    category: "mien-trung",
  },
  {
    id: 9,
    title: "Phú Yên - Quy Nhơn - Kỳ Co - Pleiku",
    destination: "Phú Yên, Quy Nhơn, Gia Lai",
    duration: "5N4Đ",
    price: 9988000,
    originalPrice: 11500000,
    rating: 4.6,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    badge: null,
    badgeColor: null,
    category: "mien-trung",
  },

  // ── TÂY BẮC - MIỀN BẮC ──
  {
    id: 101,
    title: "Tour Mai Châu - Mộc Châu 3 ngày 2 đêm",
    destination: "Hòa Bình, Sơn La",
    duration: "3N2Đ",
    price: 2700000,
    originalPrice: 3500000,
    rating: 4.8,
    reviews: 96,
    image: "/images/tours/mai-chau.jpg",
    badge: "Bán chạy",
    badgeColor: "#EF4444",
    category: "tay-bac",
  },
  {
    id: 102,
    title: "Tour Tây Bắc 6N5Đ Mùa Hoa Cải Vàng | Hà Nội - Hạ Long - Trạm Tấu",
    destination: "Hà Nội, Quảng Ninh, Yên Bái",
    duration: "6N5Đ",
    price: 8999000,
    originalPrice: 10500000,
    rating: 4.9,
    reviews: 112,
    image: "/images/tours/tay-bac-hoa-cai.jpg",
    badge: "Hot",
    badgeColor: "#F59E0B",
    category: "tay-bac",
  },
  {
    id: 103,
    title: "Tour Tây Bắc 6N5Đ | Hạ Long - Trạm Tấu - Suối Giàng - Mù Cang Chải",
    destination: "Hà Nội, Quảng Ninh, Yên Bái",
    duration: "6N5Đ",
    price: 8999000,
    originalPrice: 10800000,
    rating: 4.7,
    reviews: 87,
    image: "/images/tours/ha-long-tay-bac.jpg",
    badge: "Đặc biệt",
    badgeColor: "#8B5CF6",
    category: "tay-bac",
  },
  {
    id: 104,
    title: "Tour Miền Bắc Mùa Hè 3N2Đ | Hà Nội - Sapa - Fansipan",
    destination: "Hà Nội, Lào Cai",
    duration: "3N2Đ",
    price: 5999000,
    originalPrice: 7200000,
    rating: 4.9,
    reviews: 203,
    image: "/images/tours/sapa-fansipan.jpg",
    badge: "Bán chạy",
    badgeColor: "#EF4444",
    category: "tay-bac",
  },
  {
    id: 105,
    title: "Tour Tây Bắc Mùa Hè 6N5Đ | Mộc Châu - Điện Biên - Sapa - Đền Hùng",
    destination: "Sơn La, Điện Biên, Lào Cai, Phú Thọ",
    duration: "6N5Đ",
    price: 9599000,
    originalPrice: 11500000,
    rating: 4.8,
    reviews: 74,
    image: "/images/tours/moc-chau-dien-bien.jpg",
    badge: "Premium",
    badgeColor: "#0B74D1",
    category: "tay-bac",
  },
  {
    id: 106,
    title: "Tour Tây Bắc Mùa Hè 5N4Đ | Mộc Châu - Điện Biên - Sapa - Fansipan",
    destination: "Sơn La, Điện Biên, Lào Cai",
    duration: "5N4Đ",
    price: 8499000,
    originalPrice: 9800000,
    rating: 4.8,
    reviews: 65,
    image: "/images/tours/tay-bac-dien-bien.jpg",
    badge: "Mới",
    badgeColor: "#22C55E",
    category: "tay-bac",
  },
  {
    id: 107,
    title: "Tour Sapa Mùa Thu 2N1Đ | Hà Nội - Sapa - Cát Cát - Fansipan",
    destination: "Hà Nội, Lào Cai",
    duration: "2N1Đ",
    price: 2145000,
    originalPrice: 2800000,
    rating: 4.7,
    reviews: 189,
    image: "/images/tours/sapa-mua-thu.jpg",
    badge: "Giá tốt",
    badgeColor: "#10B981",
    category: "tay-bac",
  },
  {
    id: 108,
    title: "Tour Sapa 3N2Đ | Hà Nội - Sapa - Cát Cát - Lao Chải - Tả Van - Fansipan",
    destination: "Hà Nội, Lào Cai",
    duration: "3N2Đ",
    price: 2970000,
    originalPrice: 3600000,
    rating: 4.8,
    reviews: 145,
    image: "/images/tours/sapa-cat-cat.jpg",
    badge: "Bán chạy",
    badgeColor: "#EF4444",
    category: "tay-bac",
  },
  {
    id: 109,
    title: "Tour Tây Bắc 4N3Đ | Hà Nội - Fansipan - Điện Biên - Mộc Châu - Mai Châu",
    destination: "Hà Nội, Lào Cai, Điện Biên, Sơn La, Hòa Bình",
    duration: "4N3Đ",
    price: 5314000,
    originalPrice: 6500000,
    rating: 4.9,
    reviews: 92,
    image: "/images/tours/moc-chau-dien-bien.jpg",
    badge: "Hot",
    badgeColor: "#F59E0B",
    category: "tay-bac",
  },

  // ── TÂY NGUYÊN ──
  {
    id: 201,
    title: "Du lịch Tây Nguyên huyền thoại",
    destination: "Đắk Lắk, Gia Lai, Kon Tum",
    duration: "4N3Đ",
    price: 8988000,
    originalPrice: 10500000,
    rating: 4.7,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    badge: "Đặc biệt",
    badgeColor: "#8B5CF6",
    category: "tay-nguyen",
  },
  {
    id: 202,
    title: "Liên tuyến các tỉnh Tây Nguyên",
    destination: "Đắk Lắk, Gia Lai, Kon Tum, Lâm Đồng",
    duration: "5N4Đ",
    price: 9988000,
    originalPrice: 12000000,
    rating: 4.8,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    badge: "Premium",
    badgeColor: "#0B74D1",
    category: "tay-nguyen",
  },
];

/* ───────────────────── HELPERS ───────────────────── */
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

/* ───────────────────── COMPONENT ───────────────────── */
export default function AllTours() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDetailTour, setSelectedDetailTour] = useState<TourData | null>(null);
  const [selectedBookingTour, setSelectedBookingTour] = useState<TourData | null>(null);

  // Filter tours based on category + search
  const filteredTours = useMemo(() => {
    let result = allTours;

    if (activeCategory !== "all") {
      result = result.filter((t) => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.duration.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const displayedTours = showAll ? filteredTours : filteredTours.slice(0, 6);

  const toggleFav = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Reset showAll when category or search changes
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setShowAll(false);
  };

  const activeCat = categories.find((c) => c.id === activeCategory)!;

  return (
    <section
      id="tours"
      className="section"
      style={{ background: "var(--background)", paddingBottom: "80px" }}
    >
      <div className="container">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h2 className="section-title">Khám Phá Tour Du Lịch</h2>
          <p className="section-subtitle">
            Trải nghiệm những hành trình tuyệt vời nhất trên khắp Việt Nam với mức giá ưu đãi hấp dẫn
          </p>
        </motion.div>

        {/* ─── Search Bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            maxWidth: "600px",
            margin: "0 auto 36px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "var(--card-bg)",
              border: "2px solid var(--border-light)",
              borderRadius: "16px",
              padding: "6px 6px 6px 20px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(11,116,209,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border-light)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
            }}
          >
            <Search size={20} color="var(--text-light)" />
            <input
              type="text"
              placeholder="Tìm tour theo tên, điểm đến, thời gian..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
              }}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "0.95rem",
                color: "var(--text-primary)",
                padding: "12px 0",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowAll(false);
                }}
                style={{
                  background: "var(--bg-secondary)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "var(--transition)",
                }}
              >
                <X size={16} color="var(--text-secondary)" />
              </button>
            )}
            <button
              style={{
                background: "var(--gradient)",
                border: "none",
                borderRadius: "12px",
                padding: "12px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
                fontWeight: 600,
                fontSize: "0.88rem",
                transition: "var(--transition)",
              }}
            >
              <SlidersHorizontal size={16} />
              Tìm kiếm
            </button>
          </div>
        </motion.div>

        {/* ─── Category Tabs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "44px",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === "all"
                ? allTours.length
                : allTours.filter((t) => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 22px",
                  borderRadius: "30px",
                  border: isActive ? `2px solid ${cat.color}` : "2px solid var(--border-light)",
                  background: isActive ? cat.bgGradient : "var(--card-bg)",
                  color: isActive ? cat.color : "var(--text-secondary)",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: isActive ? `0 4px 16px ${cat.color}20` : "none",
                }}
              >
                {cat.icon}
                {cat.label}
                <span
                  style={{
                    background: isActive ? cat.color : "var(--bg-secondary)",
                    color: isActive ? "white" : "var(--text-light)",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    minWidth: "24px",
                    textAlign: "center",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ─── Active Category Description ─── */}
        <AnimatePresence mode="wait">
          {activeCategory !== "all" && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                textAlign: "center",
                marginBottom: "36px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: activeCat.bgGradient,
                  border: `1px solid ${activeCat.color}30`,
                  padding: "10px 24px",
                  borderRadius: "14px",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: activeCat.color,
                }}
              >
                {activeCat.icon}
                {activeCategory === "mien-trung" && "Khám phá biển xanh, cát trắng và di sản văn hóa Miền Trung"}
                {activeCategory === "tay-bac" && "Chinh phục đỉnh cao, ngắm ruộng bậc thang và hoa cải vàng Tây Bắc"}
                {activeCategory === "tay-nguyen" && "Trải nghiệm văn hóa bản địa và thiên nhiên hùng vĩ Tây Nguyên"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Search Result Info ─── */}
        {searchQuery.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              marginBottom: "24px",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
            }}
          >
            Tìm thấy <strong style={{ color: "var(--primary)" }}>{filteredTours.length}</strong> tour
            {activeCategory !== "all" && (
              <> trong danh mục <strong style={{ color: activeCat.color }}>{activeCat.label}</strong></>
            )}
            {` cho "${searchQuery}"`}
          </motion.div>
        )}

        {/* ─── Tour Grid ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayedTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                className="card"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image Container */}
                <div
                  style={{
                    position: "relative",
                    height: 220,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedDetailTour(tour)}
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />

                  {/* Badge */}
                  {tour.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        background: tour.badgeColor || "#0B74D1",
                        color: "white",
                        padding: "4px 14px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {tour.badge}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 52,
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(4px)",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    {categories.find((c) => c.id === tour.category)?.label || ""}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(tour.id);
                    }}
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "var(--transition)",
                    }}
                  >
                    <Heart
                      size={18}
                      fill={favorites.includes(tour.id) ? "#EF4444" : "none"}
                      color={favorites.includes(tour.id) ? "#EF4444" : "#9CA3AF"}
                    />
                  </button>

                  {/* Duration Badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 14,
                      background: "rgba(0,0,0,0.65)",
                      backdropFilter: "blur(4px)",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Clock size={14} /> {tour.duration}
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Title */}
                  <h3
                    onClick={() => setSelectedDetailTour(tour)}
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      marginBottom: "8px",
                      color: "var(--text-primary)",
                      lineHeight: 1.4,
                      cursor: "pointer",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {tour.title}
                  </h3>

                  {/* Location */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      marginBottom: "12px",
                    }}
                  >
                    <MapPin size={14} color="var(--primary)" />
                    {tour.destination}
                  </div>

                  {/* Rating */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < Math.round(tour.rating) ? "#FBBF24" : "none"}
                          color="#FBBF24"
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {tour.rating}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                      ({tour.reviews} đánh giá)
                    </span>
                  </div>

                  <div style={{ flex: 1 }} />

                  {/* Price + Action Buttons */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      borderTop: "1px solid var(--border-light)",
                      paddingTop: "16px",
                      marginTop: "8px",
                    }}
                  >
                    <div>
                      <div className="price-old">{formatPrice(tour.originalPrice)}</div>
                      <div className="price" style={{ fontSize: "1.28rem" }}>
                        {formatPrice(tour.price)}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="btn-outline"
                        onClick={() => setSelectedDetailTour(tour)}
                        style={{
                          padding: "8px 16px",
                          fontSize: "0.82rem",
                          borderRadius: "10px",
                        }}
                      >
                        Chi tiết
                      </button>
                      <button
                        className="btn-gradient"
                        onClick={() => setSelectedBookingTour(tour)}
                        style={{
                          padding: "8px 16px",
                          fontSize: "0.82rem",
                          borderRadius: "10px",
                        }}
                      >
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ─── Empty State ─── */}
        {filteredTours.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            <Search size={48} color="var(--text-light)" style={{ marginBottom: "16px", opacity: 0.4 }} />
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "8px" }}>
              Không tìm thấy tour nào
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </p>
            <button
              className="btn-outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              style={{ marginTop: "20px", padding: "10px 28px" }}
            >
              Xem tất cả tour
            </button>
          </motion.div>
        )}

        {/* ─── Show More Button ─── */}
        {!showAll && filteredTours.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginTop: "44px" }}
          >
            <button
              className="btn-outline"
              onClick={() => setShowAll(true)}
              style={{ padding: "14px 44px", fontSize: "0.98rem" }}
            >
              Xem tất cả {filteredTours.length} tour
              {activeCategory !== "all" && ` ${activeCat.label}`} →
            </button>
          </motion.div>
        )}

        {/* ─── Stats Bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "32px",
            marginTop: "60px",
            padding: "28px 40px",
            background: "var(--card-bg)",
            borderRadius: "20px",
            border: "1px solid var(--border-light)",
          }}
        >
          {[
            { value: `${allTours.length}+`, label: "Tour hấp dẫn" },
            { value: "20+", label: "Điểm đến" },
            { value: "4.8★", label: "Đánh giá TB" },
            { value: "100%", label: "Hài lòng" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: "100px" }}>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  background: "var(--gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tour Detail Modal */}
      <TourDetailModal
        tour={selectedDetailTour}
        onClose={() => setSelectedDetailTour(null)}
        onBookNow={(tourToBook) => {
          setSelectedDetailTour(null);
          setSelectedBookingTour(tourToBook);
        }}
      />

      {/* Tour Booking Modal */}
      <BookingModal
        tour={selectedBookingTour}
        onClose={() => setSelectedBookingTour(null)}
      />
    </section>
  );
}
