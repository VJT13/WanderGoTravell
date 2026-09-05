"use client";

import { useEffect, useState, useMemo } from "react";
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
  DollarSign,
  Filter,
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

import { MOCK_BOOKINGS } from "@/data/mockSeedData";

function getInitialBookings(): BookingItem[] {
  return MOCK_BOOKINGS.map((b: any, idx: number) => ({
    id: `seed-b-${idx + 1}`,
    bookingCode: b.bookingCode || "WGT-000000",
    customerName: b.customerName || "Không rõ",
    customerPhone: b.customerPhone || "",
    customerEmail: b.customerEmail || "",
    tourName: b.tourTitle || "Tour trọn gói WanderGo",
    departureDate: b.departureDate ? new Date(b.departureDate).toLocaleDateString("vi-VN") : "Linh hoạt",
    guests: b.guests || 1,
    totalPrice: b.totalPrice || 0,
    status: b.status || "CONFIRMED",
    notes: b.notes || "",
    createdAt: b.createdAt ? new Date(b.createdAt).toLocaleDateString("vi-VN") : "",
  }));
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>(getInitialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);

  const mergeLocalBookings = (list: BookingItem[]): BookingItem[] => {
    try {
      const local: BookingItem[] = JSON.parse(localStorage.getItem("wandergo_submitted_bookings") || "[]");
      if (Array.isArray(local) && local.length > 0) {
        const existingCodes = new Set(list.map((b) => b.bookingCode));
        const unique = local.filter((b) => !existingCodes.has(b.bookingCode));
        return [...unique, ...list];
      }
    } catch (e) {}
    return list;
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const mapped: BookingItem[] = data.data.map((b: any) => {
          let tourName = b.tour?.title || "";
          if (!tourName && b.notes) {
            const match = b.notes.match(/\[Tour:\s*(.+?)\]/);
            if (match) {
              tourName = match[1];
            }
          }
          if (!tourName) tourName = "Tour trọn gói WanderGo";

          return {
            id: b.id,
            bookingCode: b.bookingCode || "WGT-000000",
            customerName: b.customerName || "Không rõ",
            customerPhone: b.customerPhone || "",
            customerEmail: b.customerEmail || "",
            tourName,
            departureDate: b.departureDate ? new Date(b.departureDate).toLocaleDateString("vi-VN") : "Linh hoạt",
            guests: b.guests || 1,
            totalPrice: b.totalPrice || 0,
            status: b.status || "PENDING",
            notes: b.notes ? b.notes.replace(/\[Tour:.*?\]\s*\|?\s*/, "") : "",
            createdAt: b.createdAt ? new Date(b.createdAt).toLocaleDateString("vi-VN") : "",
          };
        });
        setBookings(mergeLocalBookings(mapped));
      } else {
        setBookings(mergeLocalBookings(getInitialBookings()));
      }
    } catch (err) {
      console.error("Fetch bookings error, using fallback seed data:", err);
      setBookings(mergeLocalBookings(getInitialBookings()));
    }
  };

  useEffect(() => {
    // Immediate load from local storage
    setBookings((prev) => mergeLocalBookings(prev));
    fetchBookings();
  }, []);

  // Summary counts
  const summary = useMemo(() => {
    let confirmedCount = 0;
    let pendingCount = 0;
    let cancelledCount = 0;
    let confirmedRevenue = 0;

    bookings.forEach((b) => {
      if (b.status === "CONFIRMED") {
        confirmedCount++;
        confirmedRevenue += b.totalPrice;
      } else if (b.status === "PENDING") {
        pendingCount++;
      } else if (b.status === "CANCELLED") {
        cancelledCount++;
      }
    });

    return {
      total: bookings.length,
      confirmedCount,
      pendingCount,
      cancelledCount,
      confirmedRevenue,
    };
  }, [bookings]);

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đơn đặt tour này khỏi hệ thống?")) return;
    try {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
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

    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Update status API error:", err);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Status filter
      if (statusFilter !== "ALL" && b.status !== statusFilter) return false;

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = b.customerName.toLowerCase().includes(q);
        const matchPhone = b.customerPhone.includes(q);
        const matchCode = b.bookingCode.toLowerCase().includes(q);
        const matchTour = b.tourName.toLowerCase().includes(q);
        return matchName || matchPhone || matchCode || matchTour;
      }
      return true;
    });
  }, [bookings, statusFilter, search]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.02em" }}>
            Quản Lý Đơn Đặt Tour (Bookings)
          </h1>
          <span
            style={{
              background: "linear-gradient(135deg, #0B74D1, #16A34A)",
              color: "white",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: 800,
            }}
          >
            {bookings.length} Đơn
          </span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "#64748B", marginTop: "4px" }}>
          Hệ thống duyệt đơn, quản lý thanh toán và theo dõi doanh thu thực tế đồng bộ ERP
        </p>
      </div>

      {/* 4 Summary KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ background: "white", padding: "18px 20px", borderRadius: "18px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>
            TỔNG SỐ ĐƠN HÀNG
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0F172A", marginTop: "4px" }}>
            {summary.total} đơn
          </div>
          <div style={{ fontSize: "0.76rem", color: "#94A3B8", marginTop: "2px" }}>
            Toàn bộ lịch sử đặt tour
          </div>
        </div>

        <div style={{ background: "#F0FDF4", padding: "18px 20px", borderRadius: "18px", border: "1px solid #86EFAC", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase" }}>
            ĐÃ DUYỆT (CONFIRMED)
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#15803D", marginTop: "4px" }}>
            {summary.confirmedCount} đơn
          </div>
          <div style={{ fontSize: "0.8rem", color: "#16A34A", fontWeight: 700, marginTop: "2px" }}>
            {formatPrice(summary.confirmedRevenue)}
          </div>
        </div>

        <div style={{ background: "#FEFCE8", padding: "18px 20px", borderRadius: "18px", border: "1px solid #FDE047", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#CA8A04", textTransform: "uppercase" }}>
            CHỜ DUYỆT (PENDING)
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#A16207", marginTop: "4px" }}>
            {summary.pendingCount} đơn
          </div>
          <div style={{ fontSize: "0.76rem", color: "#854D0E", marginTop: "2px" }}>
            Cần liên hệ xác nhận
          </div>
        </div>

        <div style={{ background: "#FEF2F2", padding: "18px 20px", borderRadius: "18px", border: "1px solid #FCA5A5", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#DC2626", textTransform: "uppercase" }}>
            ĐÃ HỦY (CANCELLED)
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#991B1B", marginTop: "4px" }}>
            {summary.cancelledCount} đơn
          </div>
          <div style={{ fontSize: "0.76rem", color: "#B91C1C", marginTop: "2px" }}>
            Đã bảo lưu cọc / đổi tour
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Status Tabs */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
          {[
            { id: "ALL", label: "Tất cả", count: summary.total, color: "#0B74D1" },
            { id: "CONFIRMED", label: "Đã xác nhận", count: summary.confirmedCount, color: "#16A34A" },
            { id: "PENDING", label: "Chờ duyệt", count: summary.pendingCount, color: "#D97706" },
            { id: "CANCELLED", label: "Đã hủy", count: summary.cancelledCount, color: "#EF4444" },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 16px",
                  borderRadius: "12px",
                  border: isActive ? `2px solid ${tab.color}` : "1px solid #E2E8F0",
                  background: isActive ? tab.color : "white",
                  color: isActive ? "white" : "#475569",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
                <span
                  style={{
                    padding: "1px 6px",
                    borderRadius: "8px",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    background: isActive ? "rgba(255,255,255,0.25)" : "#F1F5F9",
                    color: isActive ? "white" : "#64748B",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "14px 18px",
            border: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
            <Search size={18} color="#94A3B8" />
            <input
              type="text"
              placeholder="Tìm theo tên khách hàng, số điện thoại, mã booking (WGT-...), tên tour..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "0.9rem",
                fontFamily: "inherit",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                <X size={16} />
              </button>
            )}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>
            Hiển thị <strong style={{ color: "#0F172A" }}>{filteredBookings.length}</strong> / {bookings.length} đơn
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#F8FBFD", borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>MÃ ĐƠN</th>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>KHÁCH HÀNG</th>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>TOUR ĐẶT</th>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>NGÀY KHỞI HÀNH</th>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>KHÁCH</th>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>TỔNG TIỀN</th>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>TRẠNG THÁI</th>
                <th style={{ padding: "14px 18px", fontSize: "0.8rem", fontWeight: 700, color: "#475569", textAlign: "right" }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "36px", textAlign: "center", color: "#94A3B8" }}>
                    Không có đơn đặt tour nào phù hợp với bộ lọc
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0B74D1", fontSize: "0.85rem" }}>
                      {b.bookingCode}
                    </td>

                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0F172A" }}>
                        {b.customerName}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#16A34A", fontWeight: 600, marginTop: "2px" }}>
                        📞 {b.customerPhone}
                      </div>
                    </td>

                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#334155", maxWidth: "260px", lineHeight: "1.3" }}>
                        {b.tourName}
                      </div>
                    </td>

                    <td style={{ padding: "14px 18px", fontSize: "0.86rem", color: "#475569", fontWeight: 600 }}>
                      {b.departureDate}
                    </td>

                    <td style={{ padding: "14px 18px", fontSize: "0.88rem", fontWeight: 700, color: "#0F172A" }}>
                      {b.guests} khách
                    </td>

                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800, color: "#0B74D1", fontSize: "0.95rem" }}>
                        {formatPrice(b.totalPrice)}
                      </div>
                    </td>

                    <td style={{ padding: "14px 18px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          background: b.status === "CONFIRMED" ? "#DCFCE7" : b.status === "PENDING" ? "#FEF3C7" : "#FEE2E2",
                          color: b.status === "CONFIRMED" ? "#16A34A" : b.status === "PENDING" ? "#D97706" : "#EF4444",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {b.status === "CONFIRMED" ? <CheckCircle2 size={12} /> : b.status === "PENDING" ? <Clock size={12} /> : <XCircle size={12} />}
                        {b.status === "CONFIRMED" ? "Đã duyệt" : b.status === "PENDING" ? "Chờ duyệt" : "Đã hủy"}
                      </span>
                    </td>

                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                        <button
                          onClick={() => setSelectedBooking(b)}
                          title="Xem biên nhận"
                          style={{
                            background: "#EFF6FF",
                            border: "1px solid #BFDBFE",
                            padding: "6px 10px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#0B74D1",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Eye size={14} /> Chi tiết
                        </button>

                        {b.status === "PENDING" && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, "CONFIRMED")}
                            title="Duyệt đơn"
                            style={{
                              background: "#DCFCE7",
                              border: "none",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              color: "#16A34A",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Check size={14} /> Duyệt
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          title="Xóa đơn"
                          style={{
                            background: "#FEE2E2",
                            border: "none",
                            padding: "7px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#EF4444",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
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
              maxWidth: "560px",
              padding: "28px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0B74D1", textTransform: "uppercase" }}>
                  CHI TIẾT ĐƠN BOOKING
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", marginTop: "2px" }}>
                  {selectedBooking.bookingCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{ background: "#F1F5F9", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.9rem" }}>
              <div style={{ background: "#F8FBFD", padding: "14px 16px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>TOUR ĐÃ CHỌN</div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>
                  {selectedBooking.tourName}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>KHÁCH HÀNG</div>
                  <div style={{ fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>{selectedBooking.customerName}</div>
                  <div style={{ color: "#16A34A", fontWeight: 700, fontSize: "0.85rem", marginTop: "2px" }}>{selectedBooking.customerPhone}</div>
                  {selectedBooking.customerEmail && (
                    <div style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "2px" }}>{selectedBooking.customerEmail}</div>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>LỊCH TRÌNH & ĐOÀN</div>
                  <div style={{ fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>Khởi hành: {selectedBooking.departureDate}</div>
                  <div style={{ color: "#475569", fontWeight: 700, fontSize: "0.85rem", marginTop: "2px" }}>Số lượng: {selectedBooking.guests} khách</div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div style={{ background: "#FEFCE8", padding: "12px 14px", borderRadius: "12px", border: "1px solid #FEF08A" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#854D0E" }}>GHI CHÚ / YÊU CẦU ĐẶC BIỆT:</div>
                  <div style={{ fontSize: "0.85rem", color: "#713F12", marginTop: "3px" }}>{selectedBooking.notes}</div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#EFF6FF", borderRadius: "14px", border: "1px solid #BFDBFE" }}>
                <span style={{ fontWeight: 700, color: "#1E40AF" }}>Tổng Tiền Thanh Toán:</span>
                <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0B74D1" }}>
                  {formatPrice(selectedBooking.totalPrice)}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                {selectedBooking.status !== "CONFIRMED" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking.id, "CONFIRMED")}
                    style={{
                      flex: 1,
                      background: "#16A34A",
                      color: "white",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    ✓ Duyệt Đơn Này
                  </button>
                )}
                {selectedBooking.status !== "CANCELLED" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking.id, "CANCELLED")}
                    style={{
                      flex: 1,
                      background: "#FEE2E2",
                      color: "#DC2626",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    ✕ Hủy Đơn
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
