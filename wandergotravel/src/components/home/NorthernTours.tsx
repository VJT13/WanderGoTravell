"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Star, Heart, Mountain } from "lucide-react";
import { useState } from "react";
import TourDetailModal, { TourData } from "../tour/TourDetailModal";
import BookingModal from "../booking/BookingModal";

const northernTours: TourData[] = [
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
  },
  {
    id: 102,
    title: "Tour Tây Bắc 6N5Đ Mùa Hoa Cải Vàng | Hà Nội - Vịnh Hạ Long - Suối Khoáng Trạm Tấu",
    destination: "Hà Nội, Quảng Ninh, Yên Bái",
    duration: "6N5Đ",
    price: 8999000,
    originalPrice: 10500000,
    rating: 4.9,
    reviews: 112,
    image: "/images/tours/tay-bac-hoa-cai.jpg",
    badge: "Hot",
    badgeColor: "#F59E0B",
  },
  {
    id: 103,
    title: "Tour Tây Bắc 6N5Đ | Hà Nội - Vịnh Hạ Long - Suối Khoáng Trạm Tấu - Suối Giàng - Mù Cang Chải",
    destination: "Hà Nội, Quảng Ninh, Yên Bái",
    duration: "6N5Đ",
    price: 8999000,
    originalPrice: 10800000,
    rating: 4.7,
    reviews: 87,
    image: "/images/tours/ha-long-tay-bac.jpg",
    badge: "Đặc biệt",
    badgeColor: "#8B5CF6",
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
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function NorthernTours() {
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDetailTour, setSelectedDetailTour] = useState<TourData | null>(null);
  const [selectedBookingTour, setSelectedBookingTour] = useState<TourData | null>(null);

  const displayedTours = showAll ? northernTours : northernTours.slice(0, 6);

  const toggleFav = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="northern-tours"
      className="section"
      style={{
        background: "linear-gradient(180deg, var(--background) 0%, rgba(34, 197, 94, 0.03) 50%, var(--background) 100%)",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #22C55E20, #15803D20)",
              border: "1px solid #22C55E40",
              padding: "8px 20px",
              borderRadius: "30px",
              marginBottom: "20px",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#15803D",
            }}
          >
            <Mountain size={16} />
            Khám phá vùng cao
          </motion.div>

          <h2 className="section-title">Tour Tây Bắc - Miền Bắc</h2>
          <p className="section-subtitle">
            Chinh phục đỉnh Fansipan, khám phá ruộng bậc thang Mù Cang Chải, ngắm hoa cải vàng rực rỡ và trải nghiệm văn hóa bản địa độc đáo
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
                  <MapPin size={14} color="#22C55E" />
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
        {!showAll && northernTours.length > 6 && (
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
              Xem Tất Cả {northernTours.length} Tour Tây Bắc →
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
