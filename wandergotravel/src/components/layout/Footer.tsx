"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  Map,
  Shield,
  Clock,
  CreditCard,
  CheckCircle2,
  Heart,
  Users,
  Lock,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";

const quickLinks = [
  { label: "Trang chủ", href: "#home" },
  { label: "Tour du lịch", href: "#tours" },
  { label: "Combo tiết kiệm", href: "#combos" },
  { label: "Tin tức", href: "#news" },
  { label: "Liên hệ", href: "#contact" },
];

const destinations = [
  "Đà Nẵng",
  "Hội An",
  "Huế",
  "Quảng Bình",
  "Nha Trang",
  "Phú Yên",
  "Quy Nhơn",
  "Đà Lạt",
  "Tây Nguyên",
];

const commitments = [
  { icon: <Shield size={16} />, text: "Giá minh bạch" },
  { icon: <CheckCircle2 size={16} />, text: "Không phát sinh chi phí" },
  { icon: <Clock size={16} />, text: "Hỗ trợ 24/7" },
  { icon: <Map size={16} />, text: "Tour đúng lịch trình" },
  { icon: <Users size={16} />, text: "Đối tác uy tín" },
  { icon: <CreditCard size={16} />, text: "Hoàn tiền theo chính sách" },
  { icon: <Lock size={16} />, text: "Thanh toán an toàn" },
  { icon: <Heart size={16} />, text: "Bảo mật thông tin khách hàng" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Commitments Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {commitments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  padding: "8px 0",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer
        style={{
          background: "#0A1628",
          color: "rgba(255,255,255,0.8)",
          paddingTop: "64px",
          paddingBottom: "24px",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "48px",
              marginBottom: "48px",
            }}
          >
            {/* Company Info */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src="/logo.png"
                  alt="WanderGoTravel Logo"
                  style={{
                    height: "50px",
                    width: "auto",
                    objectFit: "contain",
                    background: "white",
                    padding: "4px",
                    borderRadius: "12px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      lineHeight: 1.1,
                      color: "white",
                    }}
                  >
                    WanderGo<span style={{ color: "#22C55E" }}>Travel</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginTop: "2px",
                    }}
                  >
                    KHÁM PHÁ MIỀN TRUNG
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Đưa bạn khám phá Miền Trung với trải nghiệm chất lượng, giá
                hợp lý và dịch vụ tận tâm. Hành trình chạm đến tinh hoa Miền
                Trung.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <a
                  href="tel:0977393425"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#22C55E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                  }
                >
                  <Phone size={16} color="#0B74D1" /> 0977 393 425
                </a>
                <a
                  href="mailto:wandergotravel18@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#22C55E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                  }
                >
                  <Mail size={16} color="#0B74D1" /> wandergotravel18@gmail.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "20px",
                  position: "relative",
                  paddingBottom: "12px",
                }}
              >
                Menu nhanh
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 3,
                    background:
                      "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
                    borderRadius: 2,
                  }}
                />
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "var(--transition)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#22C55E";
                      e.currentTarget.style.paddingLeft = "8px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    › {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div>
              <h4
                style={{
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "20px",
                  position: "relative",
                  paddingBottom: "12px",
                }}
              >
                Điểm đến
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 3,
                    background:
                      "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
                    borderRadius: 2,
                  }}
                />
              </h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {destinations.map((dest) => (
                  <span
                    key={dest}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.6)",
                      transition: "var(--transition)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(11, 116, 209, 0.3)";
                      e.currentTarget.style.borderColor = "#0B74D1";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.15)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* Social & Connect */}
            <div>
              <h4
                style={{
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "20px",
                  position: "relative",
                  paddingBottom: "12px",
                }}
              >
                Kết nối
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 3,
                    background:
                      "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
                    borderRadius: 2,
                  }}
                />
              </h4>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {[
                  {
                    icon: <Globe size={20} />,
                    href: "https://www.facebook.com/profile.php?id=61592688420184",
                    bg: "#1877F2",
                    label: "Facebook",
                  },
                  {
                    icon: <MessageCircle size={20} />,
                    href: "https://zalo.me/0977393425",
                    bg: "#0068FF",
                    label: "Zalo",
                  },
                  {
                    icon: <MapPin size={20} />,
                    href: "#",
                    bg: "#EA4335",
                    label: "Google Maps",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      transition: "var(--transition)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = social.bg;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                }}
              >
                Theo dõi chúng tôi trên mạng xã hội để cập nhật những tour mới
                nhất và ưu đãi hấp dẫn!
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              margin: "16px 0 24px",
            }}
          />

          {/* Copyright */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              © {new Date().getFullYear()} WanderGoTravel. All rights reserved.
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Đi để yêu hơn miền Trung Việt Nam ❤️
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: 100,
              left: 24,
              width: 44,
              height: 44,
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
              color: "white",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(11, 116, 209, 0.3)",
              zIndex: 90,
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

