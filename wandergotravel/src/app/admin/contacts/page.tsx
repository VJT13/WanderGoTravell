"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Phone, Mail, Calendar, Users, CheckCircle2, Trash2 } from "lucide-react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);

  const sampleContacts = [
    {
      id: "c1",
      fullName: "Phạm Văn Hoàng",
      phone: "0905 112 233",
      email: "hoang.pham@gmail.com",
      departureDate: "2024-09-10",
      guests: "3-5",
      serviceType: "Tour trọn gói",
      message: "Tư vấn cho mình tour Đà Nẵng - Hội An cho gia đình 4 người lớn 1 trẻ em.",
      createdAt: "2024-08-02",
    },
    {
      id: "c2",
      fullName: "Hoàng Thị Lan",
      phone: "0934 556 778",
      email: "lan.hoang@gmail.com",
      departureDate: "2024-08-25",
      guests: "10+",
      serviceType: "Combo du lịch",
      message: "Đoàn công ty 15 người muốn đi Nha Trang 4N3Đ vào cuối tháng 8.",
      createdAt: "2024-08-01",
    },
  ];

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/contacts");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setContacts(data.data);
        } else {
          setContacts(sampleContacts);
        }
      } catch (err) {
        setContacts(sampleContacts);
      }
    }
    fetchContacts();
  }, []);

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu tư vấn này khỏi hệ thống?")) return;
    try {
      if (!id.startsWith("c")) {
        await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      }
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete contact error:", err);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>
          Yêu Cầu Tư Vấn & Liên Hệ
        </h1>
        <p style={{ fontSize: "0.88rem", color: "#64748B", marginTop: "2px" }}>
          Danh sách khách hàng để lại thông tin tư vấn qua Form Đăng Ký
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {contacts.map((c) => (
          <div
            key={c.id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0F172A" }}>
                  {c.fullName}
                </div>
                <span style={{ background: "#EFF6FF", color: "#0B74D1", padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>
                  {c.serviceType || "Tư vấn Tour"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "#475569", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Phone size={15} color="#16A34A" />
                  <a href={`tel:${c.phone}`} style={{ color: "#16A34A", fontWeight: 700, textDecoration: "none" }}>
                    {c.phone}
                  </a>
                </div>
                {c.email && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Mail size={15} color="#0B74D1" />
                    <span>{c.email}</span>
                  </div>
                )}
                {c.departureDate && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Calendar size={15} color="#F59E0B" />
                    <span>Ngày đi dự kiến: {c.departureDate}</span>
                  </div>
                )}
                {c.guests && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Users size={15} color="#8B5CF6" />
                    <span>Số lượng: {c.guests} khách</span>
                  </div>
                )}
              </div>

              {c.message && (
                <div
                  style={{
                    background: "#F8FBFD",
                    borderRadius: "12px",
                    padding: "12px",
                    fontSize: "0.85rem",
                    color: "#334155",
                    fontStyle: "italic",
                    border: "1px solid #F1F5F9",
                    marginBottom: "16px",
                  }}
                >
                  &ldquo;{c.message}&rdquo;
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid #F1F5F9", paddingTop: "14px", marginTop: "8px" }}>
              <button
                onClick={() => handleDeleteContact(c.id)}
                style={{
                  background: "#FEE2E2",
                  color: "#DC2626",
                  border: "1px solid #FCA5A5",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <Trash2 size={15} /> Xóa Yêu Cầu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
