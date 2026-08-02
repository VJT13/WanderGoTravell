"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  X,
  FileText,
  ListCheck,
  Calendar,
  Sparkles,
} from "lucide-react";
import TourDetailModal, { TourData } from "@/components/tour/TourDetailModal";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPreviewTour, setSelectedPreviewTour] = useState<TourData | null>(null);

  // Expanded Form State for Add Tour with Full Details
  const [formData, setFormData] = useState({
    title: "",
    destination: "Đà Nẵng, Hội An",
    duration: "3N2Đ",
    price: "4500000",
    originalPrice: "5500000",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
    badge: "Mới",
    description: "Hành trình di sản độc đáo đưa quý khách thưởng ngoạn vẻ đẹp thiên nhiên và văn hóa đặc sắc Miền Trung.",
    highlightsText: "Khám phá Quần thể di tích Cố Đô Huế & Đại Nội Cung Đình\nTrải nghiệm cáp treo Bà Nà Hills đạt nhiều kỷ lục thế giới\nCheck-in Cầu Vàng nổi tiếng toàn cầu\nTản bộ ngắm Phố Cổ Hội An lung linh ánh đèn lồng đêm",
    itineraryText: "Ngày 1: Đón khách - Khám phá điểm đến đầu tiên\nXe và HDV đón quý khách tại sân bay/điểm hẹn. Di chuyển về khách sạn nhận phòng. Chiều tham quan các danh thắng nổi tiếng.\n\nNgày 2: Trải nghiệm văn hóa & Tiên cảnh Bà Nà\nDùng điểm tâm sáng. Khởi hành đi Bà Nà Hills, thưởng ngoạn Cầu Vàng & ăn buffet 100 món Á-Âu.\n\nNgày 3: Phố cổ Hội An - Tự do mua sắm - Tiễn khách\nTham quan Phố cổ Hội An. Tự do mua sắm đặc sản Miền Trung và tiễn khách ra sân bay.",
  });

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours");
      const data = await res.json();
      if (data.success) setTours(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse highlights text into Array
    const highlightsArray = formData.highlightsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Parse itinerary text into Day objects
    const itineraryLines = formData.itineraryText.split("\n\n");
    const itineraryArray = itineraryLines.map((block, idx) => {
      const lines = block.split("\n");
      const header = lines[0] || `Ngày ${idx + 1}`;
      const content = lines.slice(1).join(" ") || header;
      return {
        day: header.split(":")[0] || `Ngày ${idx + 1}`,
        title: header.split(":")[1] || header,
        content: content,
      };
    });

    const payload = {
      title: formData.title,
      destination: formData.destination,
      duration: formData.duration,
      price: formData.price,
      originalPrice: formData.originalPrice,
      image: formData.image,
      badge: formData.badge,
      description: formData.description,
      highlights: JSON.stringify(highlightsArray),
      itinerary: JSON.stringify(itineraryArray),
    };

    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        fetchTours();
      }
    } catch (err) {
      alert("Lỗi khi thêm tour");
    }
  };

  const filteredTours = tours.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header & Search Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}>
            Quản Lý Tour Du Lịch Miền Trung
          </h1>
          <p style={{ fontSize: "0.88rem", color: "#64748B", marginTop: "2px" }}>
            Danh sách tất cả các tour trọn gói đang phát hành trên hệ thống
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            background: "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
            color: "white",
            border: "none",
            borderRadius: "14px",
            padding: "12px 24px",
            fontWeight: 700,
            fontSize: "0.92rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 6px 20px rgba(11, 116, 209, 0.3)",
          }}
        >
          <Plus size={18} /> Thêm Tour Mới Đầy Đủ Chi Tiết
        </button>
      </div>

      {/* Filter & Search Input */}
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
          placeholder="Tìm kiếm tour theo tên hoặc điểm đến..."
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

      {/* Tours Data Table */}
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
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>TOUR & ĐIỂM ĐẾN</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>THỜI GIAN</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>GIÁ NIÊM YẾT</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>ĐÁNH GIÁ</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>BADGE</th>
              <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569", textAlign: "right" }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map((tour) => (
              <tr key={tour.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={tour.image}
                      alt={tour.title}
                      style={{ width: 52, height: 52, borderRadius: "12px", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A" }}>
                        {tour.title}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "2px" }}>
                        📍 {tour.destination}
                      </div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: "16px 20px", fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>
                  {tour.duration}
                </td>

                <td style={{ padding: "16px 20px" }}>
                  <div style={{ fontWeight: 800, color: "#0B74D1", fontSize: "0.95rem" }}>
                    {formatPrice(tour.price)}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#94A3B8", textDecoration: "line-through" }}>
                    {formatPrice(tour.originalPrice)}
                  </div>
                </td>

                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.88rem", fontWeight: 700, color: "#0F172A" }}>
                    <Star size={15} fill="#F59E0B" color="#F59E0B" />
                    {tour.rating}
                    <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 400 }}>({tour.reviewsCount})</span>
                  </div>
                </td>

                <td style={{ padding: "16px 20px" }}>
                  {tour.badge ? (
                    <span
                      style={{
                        background: tour.badgeColor || "#0B74D1",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                      }}
                    >
                      {tour.badge}
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>—</span>
                  )}
                </td>

                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                    <button
                      onClick={() => setSelectedPreviewTour(tour)}
                      title="Xem Chi Tiết Tour (User View)"
                      style={{
                        background: "#EFF6FF",
                        border: "1px solid #BFDBFE",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color: "#0B74D1",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Eye size={15} /> Xem chi tiết
                    </button>
                    <button
                      title="Sửa Tour"
                      style={{
                        background: "#F1F5F9",
                        border: "none",
                        padding: "8px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color: "#475569",
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      title="Xóa Tour"
                      style={{
                        background: "#FEE2E2",
                        border: "none",
                        padding: "8px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color: "#EF4444",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Tour Detail Preview Modal (User View) */}
      <TourDetailModal
        tour={selectedPreviewTour}
        onClose={() => setSelectedPreviewTour(null)}
        onBookNow={() => {
          alert("Tính năng đăng ký thử nghiệm dành cho Admin");
        }}
      />

      {/* Expanded Add Tour Modal with Full Details */}
      {isAddModalOpen && (
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
              borderRadius: "28px",
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "32px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0B74D1", textTransform: "uppercase" }}>
                  TẠO TOUR MỚI VÀO DATABASE
                </span>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", marginTop: "2px" }}>
                  Thêm Thông Tin & Lịch Trình Chi Tiết Tour
                </h2>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "#F1F5F9", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTour} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Basic Fields */}
              <div style={{ background: "#F8FBFD", padding: "18px", borderRadius: "18px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0B74D1", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={16} /> 1. Thông Tin Cơ Bản & Giá Cả
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Tên Tour Du Lịch *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ví dụ: Huế - Đà Nẵng - Bà Nà Hills - Hội An 4N3Đ"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.92rem" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Điểm Đến *</label>
                    <input
                      required
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Thời Gian *</label>
                    <input
                      required
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Badge Nhãn Nổi Bật</label>
                    <input
                      type="text"
                      placeholder="Bán chạy / Hot / Mới"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Giá Bán Khuyến Mãi (VNĐ) *</label>
                    <input
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Giá Gốc Niêm Yết (VNĐ)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>URL Ảnh Bìa Tour *</label>
                  <input
                    required
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              {/* Detailed Highlights & Description */}
              <div style={{ background: "#F8FBFD", padding: "18px", borderRadius: "18px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#16A34A", display: "flex", alignItems: "center", gap: "6px" }}>
                  <ListCheck size={16} /> 2. Mô Tả & Các Điểm Nổi Bật Của Tour
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Mô Tả Tổng Quan Tour</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem", resize: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Các Điểm Nổi Bật (Mỗi ý nằm trên 1 dòng) *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.highlightsText}
                    onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                    placeholder="Mỗi điểm nổi bật nhập 1 dòng..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.88rem", fontFamily: "inherit" }}
                  />
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div style={{ background: "#F8FBFD", padding: "18px", borderRadius: "18px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#8B5CF6", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={16} /> 3. Lịch Trình Chi Tiết Từng Ngày
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Nhập Lịch Trình Chi Tiết (Phân chia các ngày bằng 2 dòng trống)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.itineraryText}
                    onChange={(e) => setFormData({ ...formData, itineraryText: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.88rem", fontFamily: "inherit" }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #0B74D1, #16A34A)",
                  color: "white",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(11, 116, 209, 0.3)",
                }}
              >
                ✓ Lưu Tour Đầy Đủ Chi Tiết Vào Database
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
