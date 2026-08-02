"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Star, Heart } from "lucide-react";
import { useState } from "react";
import TourDetailModal, { TourData } from "../tour/TourDetailModal";
import BookingModal from "../booking/BookingModal";

const tours: TourData[] = [
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
  },
  {
    id: 10,
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
  },
  {
    id: 11,
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
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function FeaturedTours() {
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDetailTour, setSelectedDetailTour] = useState<TourData | null>(null);
  const [selectedBookingTour, setSelectedBookingTour] = useState<TourData | null>(null);

  const displayedTours = showAll ? tours : tours.slice(0, 6);

  const toggleFav = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="tours"
      className="section"
      style={{ background: "var(--background)" }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tour Nổi Bật Miền Trung</h2>
          <p className="section-subtitle">
            Khám phá những hành trình du lịch tuyệt vời nhất tại Miền Trung Việt Nam với mức giá ưu đãi trọn gói
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {displayedTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
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
        </div>

        {/* Show More Button */}
        {!showAll && tours.length > 6 && (
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
              Xem Tất Cả {tours.length} Tour Miền Trung →
            </button>
          </motion.div>
        )}
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
