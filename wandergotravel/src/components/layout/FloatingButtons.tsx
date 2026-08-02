"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, FileText, X, Sparkles, Globe } from "lucide-react";

export default function FloatingButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttons = [
    {
      icon: <MessageCircle size={22} />,
      label: "Chat Zalo",
      href: "https://zalo.me/0977393425",
      bg: "#0068FF",
      delay: 0.08,
    },
    {
      icon: <Globe size={22} />,
      label: "Fanpage Facebook",
      href: "https://www.facebook.com/profile.php?id=61592688420184",
      bg: "#1877F2",
      delay: 0.12,
    },
    {
      icon: <Phone size={22} />,
      label: "Gọi hotline",
      href: "tel:0977393425",
      bg: "#22C55E",
      delay: 0.16,
    },
    {
      icon: <FileText size={22} />,
      label: "Đăng ký tư vấn",
      href: "#contact",
      bg: "#0B74D1",
      delay: 0.2,
      onClick: true,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
      }}
    >
      {/* Expanded Buttons */}
      <AnimatePresence>
        {isExpanded &&
          buttons.map((btn, i) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target={btn.onClick ? undefined : "_blank"}
              rel={btn.onClick ? undefined : "noopener noreferrer"}
              onClick={
                btn.onClick
                  ? (e) => {
                      e.preventDefault();
                      setIsExpanded(false);
                      document
                        .querySelector(btn.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  : undefined
              }
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: btn.delay, type: "spring", stiffness: 300 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {/* Label */}
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: btn.delay + 0.1 }}
                style={{
                  background: "white",
                  color: "var(--text-primary)",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  whiteSpace: "nowrap",
                }}
              >
                {btn.label}
              </motion.span>

              {/* Icon Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  background: btn.bg,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 15px ${btn.bg}55`,
                  cursor: "pointer",
                }}
              >
                {btn.icon}
              </motion.div>
            </motion.a>
          ))}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 25px rgba(11, 116, 209, 0.4)",
          transition: "var(--transition)",
        }}
        className={isExpanded ? "" : "animate-pulse-glow"}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <X size={24} /> : <Sparkles size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
