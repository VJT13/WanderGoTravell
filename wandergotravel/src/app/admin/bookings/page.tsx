"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Eye,
  Phone,
  Calendar,
  X,
  User,
  Mail,
  Users,
  CreditCard,
  FileText,
  Check,
  Trash2,
} from "lucide-react";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

interface BookingItem {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  tourName: string;
  departureDate: string;
  guests: number;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  notes?: string;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);

  const sampleBookings: BookingItem[] = [
    {
      id: "b1",
      bookingCode: "WGT-882194",
      customerName: "Nguyễn Thanh Hà",
      customerPhone: "0988 123 456",
      customerEmail: "ha.nguyen@gmail.com",
      tourName: "Đà Nẵng - Bà Nà Hills - Phố Cổ Hội An",
      departureDate: "2024-08-15",
      guests: 3,
      totalPrice: 16764000,
      status: "CONFIRMED",
      notes: "Cần hỗ trợ phòng gia đình 1 giường đôi 1 giường đơn. Có bé nhỏ 4 tuổi.",
      createdAt: "2024-08-01",
    },
    {
      id: "b2",
      bookingCode: "WGT-661294",
      customerName: "Trần Minh Đức",
      customerPhone: "0977 888 999",
      customerEmail: "duc.tran@gmail.com",
      tourName: "Phú Yên - Quy Nhơn - Kỳ Co - Eo Gió",
      departureDate: "2024-08-20",
      guests: 2,
      totalPrice: 13976000,
      status: "PENDING",
      notes: "Yêu cầu tư vấn đưa đón sân bay Phù Cát Quy Nhơn.",
      createdAt: "2024-08-02",
    },
    {
      id: "b3",
      bookingCode: "WGT-554102",
      customerName: "Lê Thị Mai Anh",
      customerPhone: "0912 345 678",
      customerEmail: "maianh@gmail.com",
      tourName: "Huế - Đà Nẵng - Bà Nà Hills - Hội An",
      departureDate: "2024-09-01",
      guests: 4,
      totalPrice: 7952000,
      status: "CONFIRMED",
      notes: "Đã chuyển khoản cọc qua QR MBBank 5.000.000đ.",
      createdAt: "2024-07-28",
    },
    {
      id: "b4",
      bookingCode: "WGT-412093",
      customerName: "Hoàng Văn Tuấn",
      customerPhone: "0903 555 777",
      customerEmail: "tuan.hoang@gmail.com",
      tourName: "Nha Trang - Đà Lạt - Ninh Thuận",
      departureDate: "2024-08-28",
      guests: 5,
      totalPrice: 34440000,
      status: "PENDING",
      notes: "Đoàn gia đình có người lớn tuổi, yêu cầu xe đưa đón riêng.",
      createdAt: "2024-08-02",
    },
  ];

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setBookings(data.data);
        } else {
          setBookings(sampleBookings);
        }
      } catch (err) {
        setBookings(sampleBookings);
      }
    }
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đơn đặt tour này khỏi hệ thống?")) return;
    try {
      if (!id.startsWith("b")) {
        await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      }
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(null);
      }
    } catch (err) {
      console.error("Delete booking error:", err);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "CONFIRMED" | "CANCELLED") => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    if (!id.startsWith("b")) {
      try {
        await fetch(`/api/bookings/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.error("Update status API error:", err);
      }
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerPhone.includes(search) ||
      b.bookingCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>
          Quản Lý Đơn Đặt Tour (Bookings)
        </h1>
        <p style={{ fontSize: "0.88rem", color: "#64748B", marginTop: "2px" }}>
          Duyệt đơn, từ chối hoặc xem chi tiết thông tin booking du khách
        </p>
      </div>

      {/* Search Input */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "16px 20px",
          border: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Search size={18} color="#94A3B8" />
        <input
          type="text"
          placeholder="Tìm theo mã đơn WGT, tên khách hàng hoặc SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "0.92rem",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Data Table */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#F8FBFD", borderBottom: "1px solid #E2E8F0" }}>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>MÃ ĐƠN & KHÁCH HÀNG</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>TOUR ĐÃ ĐẶT</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>NGÀY ĐI & SỐ KHÁCH</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>TỔNG TIỀN</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>TRẠNG THÁI</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569", textAlign: "right" }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ fontWeight: 800, color: "#0B74D1", fontSize: "0.85rem" }}>
                    {b.bookingCode}
                  </div>
                  <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem", marginTop: "2px" }}>
                    {b.customerName}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B" }}>
                    📞 {b.customerPhone}
                  </div>
                </td>

                <td style={{ padding: "16px 20px", fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>
                  {b.tourName}
                </td>

                <td style={{ padding: "16px 20px" }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#0F172A" }}>
                    📅 {b.departureDate ? String(b.departureDate).substring(0, 10) : "Chưa chọn"}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "2px" }}>
                    👥 {b.guests} khách
                  </div>
                </td>

                <td style={{ padding: "16px 20px", fontWeight: 800, color: "#16A34A", fontSize: "1rem" }}>
                  {formatPrice(b.totalPrice)}
                </td>

                <td style={{ padding: "16px 20px" }}>
                  {b.status === "CONFIRMED" && (
                    <span
                      style={{
                        background: "#DCFCE7",
                        color: "#16A34A",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CheckCircle2 size={14} /> Đã Duyệt
                    </span>
                  )}
                  {b.status === "PENDING" && (
                    <span
                      style={{
                        background: "#FEF3C7",
                        color: "#D97706",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={14} /> Chờ Duyệt
                    </span>
                  )}
                  {b.status === "CANCELLED" && (
                    <span
                      style={{
                        background: "#FEE2E2",
                        color: "#DC2626",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <XCircle size={14} /> Từ Chối
                    </span>
                  )}
                </td>

                {/* Action Buttons: Xem chi tiết, Duyệt, Từ chối */}
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                    <button
                      onClick={() => setSelectedBooking(b)}
                      style={{
                        background: "#EFF6FF",
                        color: "#0B74D1",
                        border: "1px solid #BFDBFE",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Eye size={14} /> Chi tiết
                    </button>

                    {b.status !== "CONFIRMED" && (
                      <button
                        onClick={() => handleUpdateStatus(b.id, "CONFIRMED")}
                        style={{
                          background: "#DCFCE7",
                          color: "#15803D",
                          border: "1px solid #86EFAC",
                          borderRadius: "8px",
                          padding: "6px 10px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Check size={14} /> Duyệt
                      </button>
                    )}

                    {b.status !== "CANCELLED" && (
                      <button
                        onClick={() => handleUpdateStatus(b.id, "CANCELLED")}
                        style={{
                          background: "#FFF7ED",
                          color: "#C2410C",
                          border: "1px solid #FFEDD5",
                          borderRadius: "8px",
                          padding: "6px 10px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <X size={14} /> Từ chối
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      title="Xóa Đơn"
                      style={{
                        background: "#FEE2E2",
                        color: "#DC2626",
                        border: "1px solid #FCA5A5",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Booking Modal Popup */}
      {selectedBooking && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "620px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0B74D1", textTransform: "uppercase" }}>
                  Chi Tiết Đơn Đặt Tour #{selectedBooking.bookingCode}
                </span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>
                  {selectedBooking.tourName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{
                  background: "#F1F5F9",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Information Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#F8FBFD", padding: "16px", borderRadius: "16px" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Họ và tên khách hàng</div>
                  <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem", marginTop: "2px" }}>
                    👤 {selectedBooking.customerName}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Số điện thoại</div>
                  <div style={{ fontWeight: 700, color: "#16A34A", fontSize: "0.95rem", marginTop: "2px" }}>
                    📞 {selectedBooking.customerPhone}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Email liên hệ</div>
                  <div style={{ fontWeight: 600, color: "#334155", fontSize: "0.88rem", marginTop: "2px" }}>
                    ✉️ {selectedBooking.customerEmail || "Không có"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Ngày khởi hành</div>
                  <div style={{ fontWeight: 700, color: "#0B74D1", fontSize: "0.92rem", marginTop: "2px" }}>
                    📅 {String(selectedBooking.departureDate).substring(0, 10)}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#F8FBFD", padding: "16px", borderRadius: "16px" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Số lượng du khách</div>
                  <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem", marginTop: "2px" }}>
                    👥 {selectedBooking.guests} người
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Tổng tiền đơn hàng</div>
                  <div style={{ fontWeight: 900, color: "#0B74D1", fontSize: "1.1rem", marginTop: "2px" }}>
                    {formatPrice(selectedBooking.totalPrice)}
                  </div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", padding: "14px", borderRadius: "14px" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#D97706", marginBottom: "4px" }}>
                    📝 Ghi chú yêu cầu của khách:
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "#451A03", lineHeight: 1.5 }}>
                    {selectedBooking.notes}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #E2E8F0", paddingTop: "14px" }}>
                <span style={{ fontSize: "0.85rem", color: "#64748B" }}>Trạng thái đơn hiện tại:</span>
                {selectedBooking.status === "CONFIRMED" && (
                  <span style={{ background: "#DCFCE7", color: "#16A34A", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700 }}>
                    ✓ Đã Duyệt Đơn
                  </span>
                )}
                {selectedBooking.status === "PENDING" && (
                  <span style={{ background: "#FEF3C7", color: "#D97706", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700 }}>
                    ⏳ Đang Chờ Xử Lý
                  </span>
                )}
                {selectedBooking.status === "CANCELLED" && (
                  <span style={{ background: "#FEE2E2", color: "#DC2626", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700 }}>
                    ✕ Đã Từ Chối
                  </span>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "1px solid #CBD5E1",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Đóng
              </button>

              {selectedBooking.status !== "CANCELLED" && (
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, "CANCELLED")}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "12px",
                    border: "none",
                    background: "#FEE2E2",
                    color: "#B91C1C",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  Từ Chối Đơn
                </button>
              )}

              {selectedBooking.status !== "CONFIRMED" && (
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, "CONFIRMED")}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #0B74D1, #16A34A)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 15px rgba(11, 116, 209, 0.3)",
                  }}
                >
                  ✓ Duyệt Đơn Ngay
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
