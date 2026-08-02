"use client";

import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Users,
  Route,
  Headphones,
  CreditCard,
  Star,
} from "lucide-react";

const reasons = [
  {
    icon: <BadgeDollarSign size={28} />,
    title: "Giá tốt nhất",
    description: "Cam kết giá tốt nhất thị trường, không phát sinh chi phí ẩn",
  },
  {
    icon: <Users size={28} />,
    title: "Đội ngũ chuyên nghiệp",
    description: "HDV giàu kinh nghiệm, am hiểu văn hóa Miền Trung",
  },
  {
    icon: <Route size={28} />,
    title: "Lịch trình hấp dẫn",
    description: "Lịch trình được thiết kế tối ưu, trải nghiệm trọn vẹn",
  },
  {
    icon: <Headphones size={28} />,
    title: "Hỗ trợ 24/7",
    description: "Luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi",
  },
  {
    icon: <CreditCard size={28} />,
    title: "Thanh toán an toàn",
    description: "Đa dạng hình thức thanh toán, bảo mật tuyệt đối",
  },
  {
    icon: <Star size={28} />,
    title: "Đánh giá 5 sao",
    description: "Hơn 10.000 khách hàng hài lòng, đánh giá 4.9/5 sao",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="section" style={{ background: "white" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Vì sao chọn WanderGoTravel?</h2>
          <p className="section-subtitle">
            Chúng tôi tự hào mang đến trải nghiệm du lịch Miền Trung chất
            lượng, uy tín và tận tâm nhất
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              style={{
                display: "flex",
                gap: "18px",
                padding: "28px 24px",
                borderRadius: "16px",
                border: "1px solid transparent",
                transition: "var(--transition)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--background)";
                e.currentTarget.style.borderColor = "rgba(11, 116, 209, 0.1)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(11,116,209,0.1), rgba(22,163,74,0.1))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  flexShrink: 0,
                }}
              >
                {reason.icon}
              </div>

              {/* Text */}
              <div>
                <h4
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "6px",
                    color: "var(--text-primary)",
                  }}
                >
                  {reason.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
