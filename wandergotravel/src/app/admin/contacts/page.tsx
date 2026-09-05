"use client";

import { useEffect, useState, useMemo } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle2,
  Trash2,
  Search,
  X,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";
import { MOCK_CONTACTS } from "@/data/mockSeedData";

function getInitialContacts(): any[] {
  return MOCK_CONTACTS.map((c: any, idx: number) => ({
    id: `seed-c-${idx + 1}`,
    fullName: c.fullName,
    phone: c.phone,
    email: c.email || "",
    departureDate: c.departureDate || "",
    guests: c.guests || "",
    serviceType: c.serviceType || "",
    message: c.message || "",
    status: c.status || "NEW",
    createdAt: c.createdAt || new Date().toISOString(),
  }));
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>(getInitialContacts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const mergeLocalContacts = (list: any[]): any[] => {
    try {
      const local: any[] = JSON.parse(localStorage.getItem("wandergo_submitted_contacts") || "[]");
      if (Array.isArray(local) && local.length > 0) {
        const existingIds = new Set(list.map((c) => c.id || (c.fullName + c.phone)));
        const unique = local.filter((c) => !existingIds.has(c.id || (c.fullName + c.phone)));
        return [...unique, ...list];
      }
    } catch (e) {}
    return list;
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setContacts(mergeLocalContacts(data.data));
      } else {
        setContacts(mergeLocalContacts(getInitialContacts()));
      }
    } catch (err) {
      console.error("Fetch contacts error, using fallback seed data:", err);
      setContacts(mergeLocalContacts(getInitialContacts()));
    }
  };

  useEffect(() => {
    // Immediate load from local storage
    setContacts((prev) => mergeLocalContacts(prev));
    fetchContacts();
  }, []);

  // Summary counts
  const summary = useMemo(() => {
    let newCount = 0;
    let contactedCount = 0;
    let doneCount = 0;

    contacts.forEach((c) => {
      const s = c.status || "NEW";
      if (s === "NEW") newCount++;
      else if (s === "CONTACTED") contactedCount++;
      else if (s === "DONE") doneCount++;
    });

    return {
      total: contacts.length,
      newCount,
      contactedCount,
      doneCount,
    };
  }, [contacts]);

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu tư vấn này khỏi hệ thống?")) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete contact error:", err);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "NEW" | "CONTACTED" | "DONE") => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );

    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      // Status filter
      if (statusFilter !== "ALL" && (c.status || "NEW") !== statusFilter) return false;

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = c.fullName?.toLowerCase().includes(q);
        const matchPhone = c.phone?.includes(q);
        const matchEmail = c.email?.toLowerCase().includes(q);
        const matchService = c.serviceType?.toLowerCase().includes(q);
        const matchMessage = c.message?.toLowerCase().includes(q);
        return matchName || matchPhone || matchEmail || matchService || matchMessage;
      }
      return true;
    });
  }, [contacts, statusFilter, search]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.02em" }}>
            Yêu Cầu Tư Vấn & Khách Hàng Tiềm Năng
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
            {contacts.length} Yêu Cầu
          </span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "#64748B", marginTop: "4px" }}>
          Danh sách khách hàng để lại thông tin tư vấn qua Website và Form Đăng Ký
        </p>
      </div>

      {/* 4 Summary KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ background: "white", padding: "18px 20px", borderRadius: "18px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>
            TỔNG YÊU CẦU
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0F172A", marginTop: "4px" }}>
            {summary.total} khách
          </div>
          <div style={{ fontSize: "0.76rem", color: "#94A3B8", marginTop: "2px" }}>
            Toàn bộ lead từ website
          </div>
        </div>

        <div style={{ background: "#EFF6FF", padding: "18px 20px", borderRadius: "18px", border: "1px solid #BFDBFE", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#0B74D1", textTransform: "uppercase" }}>
            MỚI TIẾP NHẬN (NEW)
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0B74D1", marginTop: "4px" }}>
            {summary.newCount} khách
          </div>
          <div style={{ fontSize: "0.76rem", color: "#3B82F6", marginTop: "2px" }}>
            Cần gọi lại tư vấn ngay
          </div>
        </div>

        <div style={{ background: "#FEFCE8", padding: "18px 20px", borderRadius: "18px", border: "1px solid #FDE047", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#CA8A04", textTransform: "uppercase" }}>
            ĐANG TƯ VẤN (CONTACTED)
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#A16207", marginTop: "4px" }}>
            {summary.contactedCount} khách
          </div>
          <div style={{ fontSize: "0.76rem", color: "#854D0E", marginTop: "2px" }}>
            Đang báo giá & chốt lịch
          </div>
        </div>

        <div style={{ background: "#F0FDF4", padding: "18px 20px", borderRadius: "18px", border: "1px solid #86EFAC", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#16A34A", textTransform: "uppercase" }}>
            ĐÃ CHỐT TOUR (DONE)
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#15803D", marginTop: "4px" }}>
            {summary.doneCount} khách
          </div>
          <div style={{ fontSize: "0.76rem", color: "#16A34A", marginTop: "2px" }}>
            Đã chuyển thành booking
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
          {[
            { id: "ALL", label: "Tất cả", count: summary.total, color: "#0B74D1" },
            { id: "NEW", label: "Mới tiếp nhận", count: summary.newCount, color: "#0B74D1" },
            { id: "CONTACTED", label: "Đang tư vấn", count: summary.contactedCount, color: "#D97706" },
            { id: "DONE", label: "Đã chốt tour", count: summary.doneCount, color: "#16A34A" },
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
              placeholder="Tìm theo tên khách, số điện thoại, email, dịch vụ quan tâm hoặc nội dung ghi chú..."
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
            Hiển thị <strong style={{ color: "#0F172A" }}>{filteredContacts.length}</strong> / {contacts.length} khách
          </div>
        </div>
      </div>

      {/* Contacts Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
        {filteredContacts.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", padding: "40px", textAlign: "center", color: "#94A3B8", background: "white", borderRadius: "20px", border: "1px solid #E2E8F0" }}>
            Không tìm thấy yêu cầu tư vấn nào phù hợp với bộ lọc
          </div>
        ) : (
          filteredContacts.map((c) => {
            const status = c.status || "NEW";
            return (
              <div
                key={c.id}
                style={{
                  background: "white",
                  borderRadius: "22px",
                  padding: "24px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "#0F172A" }}>
                        {c.fullName}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginTop: "2px" }}>
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString("vi-VN") : "Gần đây"}
                      </div>
                    </div>

                    <span
                      style={{
                        background: "#EFF6FF",
                        color: "#0B74D1",
                        border: "1px solid #BFDBFE",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {c.serviceType || "Tư vấn Tour"}
                    </span>
                  </div>

                  {/* Customer details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "#475569", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Phone size={15} color="#16A34A" />
                      <a href={`tel:${c.phone}`} style={{ color: "#16A34A", fontWeight: 800, textDecoration: "none" }}>
                        {c.phone}
                      </a>
                    </div>
                    {c.email && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Mail size={15} color="#0B74D1" />
                        <span style={{ color: "#334155" }}>{c.email}</span>
                      </div>
                    )}
                    {c.departureDate && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Calendar size={15} color="#F59E0B" />
                        <span>Khởi hành dự kiến: <strong>{c.departureDate}</strong></span>
                      </div>
                    )}
                    {c.guests && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Users size={15} color="#8B5CF6" />
                        <span>Số lượng đoàn: <strong>{c.guests} khách</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Customer message */}
                  {c.message && (
                    <div
                      style={{
                        background: "#F8FBFD",
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: "1px solid #E2E8F0",
                        fontSize: "0.85rem",
                        color: "#334155",
                        lineHeight: "1.45",
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "#0B74D1" }}>Nội dung yêu cầu: </span>
                      {c.message}
                    </div>
                  )}
                </div>

                {/* Footer Actions & Status Selector */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid #F1F5F9", gap: "10px" }}>
                  {/* Status Dropdown */}
                  <select
                    value={status}
                    onChange={(e) => handleUpdateStatus(c.id, e.target.value as any)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      border: "none",
                      background: status === "DONE" ? "#DCFCE7" : status === "CONTACTED" ? "#FEF3C7" : "#EFF6FF",
                      color: status === "DONE" ? "#16A34A" : status === "CONTACTED" ? "#D97706" : "#0B74D1",
                    }}
                  >
                    <option value="NEW">🔵 Mới tiếp nhận</option>
                    <option value="CONTACTED">🟡 Đang tư vấn</option>
                    <option value="DONE">🟢 Đã chốt tour</option>
                  </select>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <a
                      href={`tel:${c.phone}`}
                      style={{
                        background: "#16A34A",
                        color: "white",
                        padding: "7px 12px",
                        borderRadius: "8px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Phone size={13} /> Gọi ngay
                    </a>

                    <button
                      onClick={() => handleDeleteContact(c.id)}
                      title="Xóa yêu cầu"
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
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
