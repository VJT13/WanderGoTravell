"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thanh Hà",
    location: "Hà Nội",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    rating: 5,
    content:
      "Tour Đà Nẵng - Hội An 4N3Đ rất xuất sắc! Lịch trình hợp lý, hướng dẫn viên tận tâm am hiểu từng di tích. Cả gia đình tôi đều rất ưng ý dịch vụ WanderGoTravel.",
    tour: "Đà Nẵng - Bà Nà Hills - Phố Cổ Hội An",
    date: "Tháng 7, 2024",
  },
  {
    id: 2,
    name: "Trần Minh Đức",
    location: "TP. Hồ Chí Minh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    rating: 5,
    content:
      "Chuyến đi Nha Trang - Đà Lạt 5N4Đ cùng công ty vô cùng tuyệt vời. Khách sạn 4 sao sạch đẹp, xe đưa đón mới và đúng giờ. Rất hài lòng!",
    tour: "Nha Trang - Đà Lạt - Ninh Thuận",
    date: "Tháng 6, 2024",
  },
  {
    id: 3,
    name: "Lê Thị Mai Anh",
    location: "Hải Phòng",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
    rating: 5,
    content:
      "Cảnh Kỳ Co - Eo Gió đẹp đến ngỡ ngàng! Nhờ sự hỗ trợ nhiệt tình từ tư vấn viên WanderGo, chuyến đi của 2 vợ chồng diễn ra mượt mà tuyệt đối.",
    tour: "Phú Yên - Quy Nhơn - Kỳ Co - Eo Gió",
    date: "Tháng 5, 2024",
  },
  {
    id: 4,
    name: "Phạm Văn Hoàng",
    location: "Đà Nẵng",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    rating: 5,
    content:
      "Hệ thống hang động Quảng Bình thực sự hoành tráng. Lịch trình khoa học không lo mệt. 10/10 điểm cho chất lượng dịch vụ của WanderGo!",
    tour: "Quảng Bình - Huế - Đà Nẵng - Hội An",
    date: "Tháng 4, 2024",
  },
  {
    id: 5,
    name: "Hoàng Thị Lan",
    location: "Cần Thơ",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80",
    rating: 5,
    content:
      "Trải nghiệm Tây Nguyên cùng gia đình rất mới lạ và nhiều kỉ niệm. Hướng dẫn viên thân thiện, chăm sóc khách chu đáo từng bữa ăn.",
    tour: "Du lịch Tây Nguyên huyền thoại",
    date: "Tháng 3, 2024",
  },
];

export default function TestimonialSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  // Helper to calculate card position index (-1 = left, 0 = center, 1 = right)
  const getCardStatus = (index: number) => {
    const total = testimonials.length;
    const diff = (index - activeIdx + total) % total;
    if (diff === 0) return "center";
    if (diff === 1 || (diff === total - 1 && total === 2)) return "right";
    if (diff === total - 1) return "left";
    return "hidden";
  };

  return (
    <section
      id="testimonials"
      className="section"
      style={{
        background: "linear-gradient(180deg, #F8FBFD 0%, #EEF5FC 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "90px 0",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Đánh Giá Từ Khách Hàng</h2>
          <p className="section-subtitle">
            Hơn 10.000+ du khách đã trải nghiệm và trao gửi niềm tin trọn vẹn cho WanderGoTravel
          </p>
        </motion.div>

        {/* 3-Card Carousel Container */}
        <div
          style={{
            position: "relative",
            minHeight: "380px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1100px",
              position: "relative",
            }}
          >
            {testimonials.map((item, index) => {
              const status = getCardStatus(index);
              if (status === "hidden") return null;

              const isCenter = status === "center";
              const isLeft = status === "left";
              const isRight = status === "right";

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIdx(index)}
                  initial={false}
                  animate={{
                    scale: isCenter ? 1 : 0.84,
                    opacity: isCenter ? 1 : 0.55,
                    x: isLeft ? "-90%" : isRight ? "90%" : "0%",
                    zIndex: isCenter ? 10 : 2,
                  }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: isCenter ? "relative" : "absolute",
                    width: "100%",
                    maxWidth: "520px",
                    background: "white",
                    borderRadius: "24px",
                    padding: isCenter ? "36px 32px" : "28px 24px",
                    boxShadow: isCenter
                      ? "0 20px 50px rgba(11, 116, 209, 0.14)"
                      : "0 8px 20px rgba(0,0,0,0.06)",
                    cursor: isCenter ? "default" : "pointer",
                    border: isCenter
                      ? "2px solid rgba(11, 116, 209, 0.25)"
                      : "1px solid #E2E8F0",
                    userSelect: "none",
                  }}
                >
                  <Quote
                    size={36}
                    color={isCenter ? "rgba(11, 116, 209, 0.15)" : "rgba(0,0,0,0.06)"}
                    style={{ position: "absolute", top: 20, right: 24 }}
                  />

                  {/* Stars */}
                  <div
                    style={{
                      display: "flex",
                      gap: "3px",
                      marginBottom: "16px",
                    }}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p
                    style={{
                      fontSize: isCenter ? "0.98rem" : "0.88rem",
                      color: isCenter ? "#1E293B" : "#64748B",
                      lineHeight: 1.7,
                      marginBottom: "24px",
                      fontStyle: "italic",
                      minHeight: "76px",
                    }}
                  >
                    &ldquo;{item.content}&rdquo;
                  </p>

                  {/* Customer Info */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      borderTop: "1px solid #F1F5F9",
                      paddingTop: "16px",
                    }}
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{
                        width: isCenter ? 50 : 42,
                        height: isCenter ? 50 : 42,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #0B74D1",
                      }}
                    />
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: isCenter ? "1rem" : "0.9rem",
                          color: "#0F172A",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "#0B74D1",
                          fontWeight: 600,
                        }}
                      >
                        {item.tour}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "36px",
          }}
        >
          <button
            onClick={handlePrev}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "white",
              border: "1px solid #CBD5E1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E293B",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0B74D1";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "#0B74D1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#1E293B";
              e.currentTarget.style.borderColor = "#CBD5E1";
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div style={{ display: "flex", gap: "8px" }}>
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                style={{
                  width: activeIdx === idx ? 28 : 9,
                  height: 9,
                  borderRadius: "6px",
                  background:
                    activeIdx === idx
                      ? "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)"
                      : "#CBD5E1",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "white",
              border: "1px solid #CBD5E1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E293B",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0B74D1";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "#0B74D1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#1E293B";
              e.currentTarget.style.borderColor = "#CBD5E1";
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
