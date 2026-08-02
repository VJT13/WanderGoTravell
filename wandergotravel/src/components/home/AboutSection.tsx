"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section"
      style={{
        background: "linear-gradient(180deg, var(--background) 0%, white 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(11, 116, 209, 0.03)",
          transform: "translate(50%, -50%)",
        }}
      />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left - Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: 280,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80"
                  alt="Cầu Vàng Đà Nẵng"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: 280,
                  marginTop: 40,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80"
                  alt="Phố cổ Hội An"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              style={{
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
                color: "white",
                padding: "20px 30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(11, 116, 209, 0.3)",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
                5+
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, opacity: 0.9 }}>
                Năm kinh nghiệm
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="badge badge-primary"
              style={{ marginBottom: "16px" }}
            >
              Về chúng tôi
            </span>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                marginBottom: "16px",
                lineHeight: 1.3,
              }}
            >
              Giới thiệu{" "}
              <span
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                WanderGoTravel
              </span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "28px",
                fontSize: "0.95rem",
              }}
            >
              WanderGoTravel ra đời với sứ mệnh đưa du khách khám phá trọn vẹn
              vẻ đẹp Miền Trung Việt Nam. Từ những bãi biển xanh ngắt Đà Nẵng,
              phố cổ lung linh Hội An, cố đô trầm mặc Huế đến hang động kỳ vĩ
              Quảng Bình – chúng tôi cam kết mang đến trải nghiệm chất lượng
              với mức giá hợp lý nhất.
            </p>

            {/* Values */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {[
                {
                  icon: <Target size={22} />,
                  title: "Sứ mệnh",
                  desc: "Khám phá Miền Trung, kết nối trải nghiệm",
                },
                {
                  icon: <Eye size={22} />,
                  title: "Tầm nhìn",
                  desc: "Thương hiệu du lịch Miền Trung số 1",
                },
                {
                  icon: <Heart size={22} />,
                  title: "Giá trị cốt lõi",
                  desc: "Tận tâm – Chất lượng – Uy tín",
                },
                {
                  icon: <Shield size={22} />,
                  title: "Cam kết",
                  desc: "Dịch vụ 5 sao, giá tốt nhất",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    padding: "18px",
                    borderRadius: "14px",
                    background: "var(--background)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
