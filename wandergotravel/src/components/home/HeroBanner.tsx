"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { useState } from "react";

const destinations = [
  "Đà Nẵng",
  "Hội An",
  "Huế",
  "Quảng Bình",
  "Quảng Trị",
  "Nghệ An",
  "Nha Trang",
  "Phú Yên",
  "Quy Nhơn",
  "Đà Lạt",
  "Tây Nguyên",
  "Ninh Thuận",
];

export default function HeroBanner() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(11, 116, 209, 0.85) 0%, rgba(10, 94, 176, 0.65) 40%, rgba(22, 163, 74, 0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Decorative Circles */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(34, 197, 94, 0.08)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          paddingTop: "130px",
          paddingBottom: "70px",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            padding: "8px 22px",
            borderRadius: "30px",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "24px",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <span>🌴</span>
          <span>Chuyên Tour Du Lịch Khắp Việt Nam</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.1rem, 5.2vw, 3.6rem)",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            maxWidth: "860px",
            margin: "0 auto 20px",
            letterSpacing: "-0.5px",
          }}
        >
          Khám Phá Vẻ Đẹp{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FFE259 0%, #FFA751 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Việt Nam
          </span>{" "}
          Cùng WanderGoTravel
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            color: "rgba(255,255,255,0.92)",
            maxWidth: "640px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Tour trọn gói • Combo tiết kiệm • Khách sạn • Xe đưa đón
        </motion.p>

        {/* Modern Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "12px",
            maxWidth: "920px",
            margin: "0 auto",
            boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <div
            className="hero-search-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {/* Field 1: Destination */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderRadius: "16px",
                background: "#F4F8FC",
                border: "1px solid #E2E8F0",
                transition: "all 0.2s ease",
              }}
              className="search-field-box"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "rgba(11, 116, 209, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0B74D1",
                  flexShrink: 0,
                }}
              >
                <MapPin size={19} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "2px",
                  }}
                >
                  Điểm đến
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: "#1E293B",
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <option value="">Tất cả điểm đến</option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 2: Date */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderRadius: "16px",
                background: "#F4F8FC",
                border: "1px solid #E2E8F0",
                transition: "all 0.2s ease",
              }}
              className="search-field-box"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "rgba(11, 116, 209, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0B74D1",
                  flexShrink: 0,
                }}
              >
                <Calendar size={19} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "2px",
                  }}
                >
                  Ngày khởi hành
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: "#1E293B",
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Field 3: Guests */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderRadius: "16px",
                background: "#F4F8FC",
                border: "1px solid #E2E8F0",
                transition: "all 0.2s ease",
              }}
              className="search-field-box"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "rgba(11, 116, 209, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0B74D1",
                  flexShrink: 0,
                }}
              >
                <Users size={19} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "2px",
                  }}
                >
                  Số khách
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: "#1E293B",
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <option value="">Chọn số khách</option>
                  <option value="1">1 khách</option>
                  <option value="2">2 khách</option>
                  <option value="3-5">3 - 5 khách</option>
                  <option value="6-10">6 - 10 khách</option>
                  <option value="10+">Trên 10 khách</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              className="btn-gradient"
              style={{
                height: "100%",
                minHeight: "62px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "0 32px",
                fontSize: "1rem",
                fontWeight: 700,
                whiteSpace: "nowrap",
                boxShadow: "0 8px 25px rgba(11, 116, 209, 0.35)",
              }}
              onClick={() => {
                document
                  .querySelector("#tours")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Search size={20} />
              <span>Tìm Tour</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "48px",
            marginTop: "48px",
            flexWrap: "wrap",
          }}
        >
          {[
            { number: "500+", label: "Tour đã tổ chức" },
            { number: "10K+", label: "Khách hàng hài lòng" },
            { number: "20+", label: "Điểm đến Việt Nam" },
            { number: "4.9★", label: "Đánh giá trung bình" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.8)",
                  marginTop: "6px",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          cursor: "pointer",
        }}
        onClick={() =>
          document
            .querySelector("#services")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown size={28} color="rgba(255,255,255,0.7)" />
      </motion.div>

      <style jsx global>{`
        .search-field-box:focus-within {
          border-color: #0B74D1 !important;
          background: white !important;
          box-shadow: 0 0 0 3px rgba(11, 116, 209, 0.1) !important;
        }
        @media (max-width: 900px) {
          .hero-search-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .hero-search-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
