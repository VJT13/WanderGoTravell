"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";

const menuItems = [
  { label: "Trang chủ", href: "#home" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Tour Du Lịch", href: "#tours" },
  { label: "Combo Du Lịch", href: "#combos" },
  { label: "Tin Tức", href: "#news" },
  { label: "Liên Hệ", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);

      const sections = menuItems.map((item) => item.href);
      for (const sectionId of sections) {
        const el = document.querySelector(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const headerOffset = 74;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #0A1628 0%, #0B74D1 50%, #16A34A 100%)",
          color: "white",
          fontSize: "0.8rem",
          fontWeight: 500,
          padding: "6px 0",
          transition: "transform 0.3s ease",
          transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22C55E",
                  boxShadow: "0 0 8px #22C55E",
                  display: "inline-block",
                }}
              />
              Hotline 24/7: <strong>0977 393 425</strong>
            </span>
            <span
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
              className="topbar-email"
            >
              <Mail size={13} /> wandergotravel18@gmail.com
            </span>
          </div>
          <div style={{ fontSize: "0.78rem", opacity: 0.9 }}>
            🌊 Đi để yêu hơn vẻ đẹp Việt Nam
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: isScrolled ? 0 : 32,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled
            ? "rgba(255, 255, 255, 0.97)"
            : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isScrolled
            ? "0 10px 30px rgba(11, 116, 209, 0.08)"
            : "0 4px 20px rgba(0,0,0,0.03)",
          transition: "all 0.3s ease",
          borderBottom: "1px solid rgba(11, 116, 209, 0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: isScrolled ? "68px" : "78px",
            transition: "height 0.3s ease",
          }}
        >
          {/* Official Brand Logo + Typography */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="WanderGoTravel Logo"
              style={{
                height: "44px",
                width: "auto",
                objectFit: "contain",
              }}
            />
            <div style={{ whiteSpace: "nowrap" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.3px",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "#0A2540" }}>Wander</span>
                <span style={{ color: "#0B74D1" }}>Go</span>
                <span style={{ color: "#16A34A", marginLeft: "2px", fontWeight: 700 }}>Travel</span>
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "#64748B",
                  fontWeight: 700,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  marginTop: "2px",
                  whiteSpace: "nowrap",
                }}
              >
                Khám Phá Việt Nam
              </div>
            </div>
          </a>

          {/* Nav Menu */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: "#F8FBFD",
              padding: "4px 6px",
              borderRadius: "40px",
              border: "1px solid #E2E8F0",
              flexShrink: 0,
            }}
            className="desktop-nav"
          >
            {menuItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  style={{
                    padding: "8px 15px",
                    borderRadius: "30px",
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#0B74D1" : "#475569",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    background: isActive ? "white" : "transparent",
                    boxShadow: isActive ? "0 2px 8px rgba(11, 116, 209, 0.12)" : "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <a
              href="tel:0977393425"
              className="desktop-hotline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 15px",
                borderRadius: "30px",
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                color: "#16A34A",
                fontSize: "0.83rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              <Phone size={14} color="#16A34A" />
              <span style={{ whiteSpace: "nowrap" }}>0977 393 425</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="btn-gradient desktop-cta"
              style={{
                fontSize: "0.88rem",
                padding: "10px 20px",
                borderRadius: "30px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 6px 18px rgba(11, 116, 209, 0.28)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>Đặt Tour</span>
              <ArrowRight size={14} />
            </a>

            {/* Mobile Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "10px",
                color: "#0F172A",
              }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 999,
            }}
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "82%",
                maxWidth: "340px",
                height: "100%",
                background: "white",
                padding: "90px 20px 32px",
                boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
                overflowY: "auto",
              }}
            >
              <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "14px",
                      fontSize: "0.95rem",
                      fontWeight: activeSection === item.href ? 700 : 500,
                      color:
                        activeSection === item.href
                          ? "#0B74D1"
                          : "#334155",
                      textDecoration: "none",
                      background:
                        activeSection === item.href
                          ? "#F4F8FC"
                          : "transparent",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div style={{ marginTop: "28px" }}>
                <a
                  href="tel:0977393425"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px",
                    borderRadius: "14px",
                    background: "#F0FDF4",
                    color: "#16A34A",
                    fontWeight: 700,
                    textDecoration: "none",
                    marginBottom: "12px",
                    fontSize: "0.92rem",
                  }}
                >
                  <Phone size={16} /> Hotline: 0977 393 425
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="btn-gradient"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    padding: "14px 20px",
                    borderRadius: "14px",
                  }}
                >
                  Đặt Tour Ngay
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .topbar-email {
          display: flex !important;
        }
        .desktop-nav {
          display: flex !important;
        }
        .desktop-hotline {
          display: inline-flex !important;
        }
        .desktop-cta {
          display: inline-flex !important;
        }
        .mobile-toggle {
          display: none !important;
        }

        @media (max-width: 1200px) {
          .desktop-hotline {
            display: none !important;
          }
        }

        @media (max-width: 1040px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }

        @media (max-width: 640px) {
          .topbar-email {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
