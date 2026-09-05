"use client";

import { motion } from "framer-motion";
import { Map, Briefcase, Hotel, Car } from "lucide-react";

const services = [
  {
    id: "tours-service",
    icon: <Map size={32} />,
    title: "Tour trọn gói",
    description:
      "Trải nghiệm tour du lịch Việt Nam trọn gói từ A-Z. Lịch trình chi tiết, hướng dẫn viên chuyên nghiệp.",
    color: "#0B74D1",
    bg: "rgba(11, 116, 209, 0.08)",
    target: "#tours",
  },
  {
    id: "combos",
    icon: <Briefcase size={32} />,
    title: "Combo du lịch",
    description:
      "Combo tiết kiệm kết hợp vé máy bay, khách sạn và tour. Giá ưu đãi, tiết kiệm đến 40%.",
    color: "#16A34A",
    bg: "rgba(22, 163, 74, 0.08)",
    target: "#contact",
  },
  {
    id: "hotels",
    icon: <Hotel size={32} />,
    title: "Lưu trú & Ăn uống",
    description:
      "Khách sạn, resort, homestay chất lượng tại các điểm du lịch hàng đầu khắp Việt Nam.",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.08)",
    target: "#contact",
  },
  {
    id: "transport",
    icon: <Car size={32} />,
    title: "Vận chuyển & Di chuyển",
    description:
      "Xe đưa đón sân bay, xe du lịch, thuê xe tự lái. Di chuyển thoải mái, an toàn, đúng giờ.",
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.08)",
    target: "#contact",
  },
];

export default function ServiceCards() {
  return (
    <section id="services" className="section" style={{ background: "white" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Dịch Vụ Của Chúng Tôi</h2>
          <p className="section-subtitle">
            WanderGoTravel cung cấp trọn bộ giải pháp du lịch Việt Nam hoàn hảo, đáp ứng mọi nhu cầu của du khách
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service, index) => (
            <motion.div
              id={service.id}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => {
                const el = document.querySelector(service.target);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "32px 24px",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(11, 116, 209, 0.12)";
                e.currentTarget.style.borderColor = service.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)";
                e.currentTarget.style.borderColor = "#E2E8F0";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "16px",
                  background: service.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: service.color,
                  marginBottom: "20px",
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "#0F172A",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#64748B",
                  lineHeight: 1.65,
                }}
              >
                {service.description}
              </p>

              {/* Link CTA */}
              <div
                style={{
                  marginTop: "20px",
                  color: service.color,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Tư vấn ngay →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
