"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { useState, useEffect } from "react";
import { TourData } from "../tour/TourDetailModal";

interface BookingModalProps {
  tour: TourData | null;
  onClose: () => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function BookingModal({ tour, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    departureDate: "",
    guests: "2",
    note: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form state whenever a new tour is opened
  useEffect(() => {
    if (tour) {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        departureDate: "",
        guests: "2",
        note: "",
      });
    }
  }, [tour]);

  if (!tour) return null;

  const guestsCount = parseInt(formData.guests) || 1;
  const totalPrice = tour.price * guestsCount;

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      departureDate: "",
      guests: "2",
      note: "",
    });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id ? String(tour.id) : undefined,
          tourTitle: tour.title,
          customerName: formData.fullName,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          departureDate: formData.departureDate,
          guests: formData.guests,
          totalPrice: totalPrice,
          notes: formData.note,
        }),
      });

      // Save to localStorage for instant client sync with Admin Dashboard
      try {
        const localRecord = {
          id: "usr-b-" + Date.now(),
          bookingCode: "WGT-" + Math.floor(100000 + Math.random() * 900000),
          customerName: formData.fullName,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          tourName: tour.title,
          departureDate: formData.departureDate ? new Date(formData.departureDate).toLocaleDateString("vi-VN") : "Linh hoạt",
          guests: formData.guests,
          totalPrice: totalPrice,
          status: "PENDING",
          notes: formData.note || "",
          createdAt: new Date().toLocaleDateString("vi-VN"),
        };
        const stored = JSON.parse(localStorage.getItem("wandergo_submitted_bookings") || "[]");
        localStorage.setItem("wandergo_submitted_bookings", JSON.stringify([localRecord, ...stored]));
      } catch (storageErr) {}
    } catch (err) {
      console.error("Booking API error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      <div
        key={`booking-modal-${tour.id}`}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(8px)",
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "760px",
            maxHeight: "92vh",
            background: "white",
            borderRadius: "28px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 20,
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#F1F5F9",
              color: "#475569",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
              color: "white",
              padding: "24px 28px",
            }}
          >
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", opacity: 0.85, fontWeight: 700 }}>
              Form Đăng Ký Đặt Tour
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "4px", color: "white" }}>
              {tour.title}
            </h2>
            <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "0.85rem", opacity: 0.9 }}>
              <span>⏱️ Thời gian: {tour.duration}</span>
              <span>📍 {tour.destination}</span>
            </div>
          </div>

          {/* Content Body */}
          <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: "center", padding: "30px 10px" }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#DCFCE7",
                    color: "#16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <CheckCircle2 size={42} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", marginBottom: "8px" }}>
                  Đặt Tour Thành Công!
                </h3>
                <p style={{ color: "#475569", fontSize: "0.92rem", maxWidth: "480px", margin: "0 auto 24px" }}>
                  Cảm ơn bạn đã đăng ký tour tại WanderGoTravel. Chuyên viên tư vấn sẽ gọi lại cho bạn qua SĐT{" "}
                  <strong>{formData.phone}</strong> trong vòng 30 phút để xác nhận.
                </p>

                {/* Official Bank Transfer VietQR Display */}
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "24px",
                    padding: "20px",
                    maxWidth: "340px",
                    margin: "0 auto",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0B74D1", marginBottom: "14px", textAlign: "center" }}>
                    📲 Mã QR Chuyển Khoản Đặt Cọc
                  </div>

                  <img
                    src="/qr-payment.png"
                    alt="Mã VietQR Thanh Toán MBBank - PHAM HA LY"
                    style={{
                      width: "100%",
                      maxWidth: "280px",
                      height: "auto",
                      display: "block",
                      borderRadius: "16px",
                      margin: "0 auto 14px",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                      objectFit: "contain",
                    }}
                  />

                  <div style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.6, textAlign: "center" }}>
                    Chủ tài khoản: <strong style={{ color: "#0F172A" }}>PHẠM HÀ LY</strong> <br />
                    Số điện thoại: <strong style={{ color: "#0B74D1", fontSize: "1rem" }}>0977 393 425</strong> <br />
                    Ngân hàng: <strong>MBBank</strong> · VietQR / Napas 247
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="btn-gradient"
                  style={{ marginTop: "24px", padding: "12px 32px", fontSize: "0.95rem" }}
                >
                  Hoàn Tất & Quay Về Trang Chủ
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                  className="modal-form-grid"
                >
                  {/* Full Name */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px", color: "#334155" }}>
                      Họ và tên *
                    </label>
                    <div style={{ position: "relative" }}>
                      <User size={18} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        style={{ paddingLeft: "42px" }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px", color: "#334155" }}>
                      Số điện thoại *
                    </label>
                    <div style={{ position: "relative" }}>
                      <Phone size={18} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        required
                        type="tel"
                        placeholder="0977 393 425"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input"
                        style={{ paddingLeft: "42px" }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px", color: "#334155" }}>
                      Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <Mail size={18} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        style={{ paddingLeft: "42px" }}
                      />
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px", color: "#334155" }}>
                      Ngày dự kiến đi *
                    </label>
                    <div style={{ position: "relative" }}>
                      <Calendar size={18} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        required
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                        className="input"
                        style={{ paddingLeft: "42px" }}
                      />
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px", color: "#334155" }}>
                      Số lượng khách
                    </label>
                    <div style={{ position: "relative" }}>
                      <Users size={18} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="input"
                        style={{ paddingLeft: "42px" }}
                      >
                        <option value="1">1 người</option>
                        <option value="2">2 người</option>
                        <option value="3">3 người</option>
                        <option value="4">4 người</option>
                        <option value="5">5 người</option>
                        <option value="10">Đoàn trên 10 người</option>
                      </select>
                    </div>
                  </div>

                  {/* Price Calculation Box */}
                  <div
                    style={{
                      background: "#F8FBFD",
                      border: "1px solid #E2E8F0",
                      borderRadius: "16px",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Tạm tính tổng tiền</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0B74D1" }}>
                        {formatPrice(totalPrice)}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#16A34A", fontWeight: 600 }}>
                      ✓ Giá chuẩn niêm yết
                    </div>
                  </div>
                </div>

                {/* Special Note */}
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px", color: "#334155" }}>
                    Yêu cầu thêm
                  </label>
                  <div style={{ position: "relative" }}>
                    <MessageSquare size={18} color="#94A3B8" style={{ position: "absolute", left: 14, top: 14 }} />
                    <textarea
                      rows={2}
                      placeholder="Ghi chú về trẻ em, ăn chay, phòng đơn..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="input"
                      style={{ paddingLeft: "42px", resize: "none" }}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient"
                  style={{
                    width: "100%",
                    padding: "15px",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    borderRadius: "16px",
                    marginTop: "8px",
                    boxShadow: "0 8px 25px rgba(11, 116, 209, 0.35)",
                  }}
                >
                  {isSubmitting ? "Đang gửi đăng ký..." : "Xác Nhận Đăng Ký Tour"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .modal-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
