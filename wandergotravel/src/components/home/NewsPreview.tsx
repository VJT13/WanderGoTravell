"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Top 10 điểm check-in đẹp nhất Đà Nẵng 2024",
    excerpt:
      "Khám phá những địa điểm check-in sống ảo đẹp nhất tại thành phố đáng sống Đà Nẵng, từ cầu Vàng đến bán đảo Sơn Trà.",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&q=80",
    category: "Du lịch",
    date: "20 Th7, 2024",
    readTime: "5 phút đọc",
  },
  {
    id: 2,
    title: "Hội An về đêm - Vẻ đẹp phố cổ lung linh ánh đèn lồng",
    excerpt:
      "Phố cổ Hội An khoác lên mình chiếc áo lung linh với hàng nghìn chiếc đèn lồng khi màn đêm buông xuống.",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80",
    category: "Kinh nghiệm",
    date: "15 Th7, 2024",
    readTime: "4 phút đọc",
  },
  {
    id: 3,
    title: "Ẩm thực Huế - Những món ngon phải thử khi đến cố đô",
    excerpt:
      "Từ bún bò Huế, bánh bèo, nem lụi đến các món ăn cung đình - tất cả tạo nên bức tranh ẩm thực đa sắc của Huế.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500&q=80",
    category: "Ẩm thực",
    date: "10 Th7, 2024",
    readTime: "6 phút đọc",
  },
];

export default function NewsPreview() {
  return (
    <section id="news" className="section" style={{ background: "white" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tin tức & Kinh nghiệm</h2>
          <p className="section-subtitle">
            Cập nhật tin tức, kinh nghiệm du lịch và review địa điểm Miền Trung
            mới nhất
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: 200,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                  }}
                >
                  <span
                    className="badge badge-accent"
                    style={{ background: "rgba(34, 197, 94, 0.9)", color: "white" }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                    fontSize: "0.8rem",
                    color: "var(--text-light)",
                  }}
                >
                  <span>{post.date}</span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "10px",
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  {post.excerpt}
                </p>

                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--primary)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = "10px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = "6px";
                  }}
                >
                  Đọc thêm <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "48px" }}
        >
          <a
            href="#"
            className="btn-outline"
            style={{
              padding: "14px 48px",
              fontSize: "1rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Xem tất cả bài viết <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
