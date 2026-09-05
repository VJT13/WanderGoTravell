"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  X,
  Sparkles,
  ListCheck,
  Calendar,
  Globe,
  Palmtree,
  Mountain,
  Compass,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import TourDetailModal, { TourData } from "@/components/tour/TourDetailModal";
import { TOUR_CATEGORIES, INITIAL_TOURS } from "@/data/toursData";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

// Category mapping helper
function getCategoryInfo(tour: any) {
  const catSlug = tour.category?.slug || tour.categorySlug || tour.category || "";
  if (catSlug.includes("tay-bac") || catSlug.includes("bac")) {
    return {
      id: "tay-bac",
      label: "Tây Bắc - Miền Bắc",
      color: "#16A34A",
      bg: "rgba(22, 163, 74, 0.12)",
      borderColor: "rgba(22, 163, 74, 0.25)",
    };
  }
  if (catSlug.includes("tay-nguyen") || catSlug.includes("nguyen")) {
    return {
      id: "tay-nguyen",
      label: "Tây Nguyên",
      color: "#8B5CF6",
      bg: "rgba(139, 92, 246, 0.12)",
      borderColor: "rgba(139, 92, 246, 0.25)",
    };
  }
  return {
    id: "mien-trung",
    label: "Miền Trung",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.25)",
  };
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<any[]>(INITIAL_TOURS);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any | null>(null);
  const [selectedPreviewTour, setSelectedPreviewTour] = useState<TourData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form State for Adding / Editing
  const initialFormData = {
    title: "",
    category: "mien-trung",
    destination: "Đà Nẵng, Hội An",
    duration: "3N2Đ",
    price: "4500000",
    originalPrice: "5500000",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
    badge: "Mới",
    badgeColor: "#22C55E",
    description: "Hành trình di sản độc đáo đưa quý khách thưởng ngoạn vẻ đẹp thiên nhiên và văn hóa đặc sắc.",
    highlightsText: "Khám phá danh thắng nổi tiếng\nTrải nghiệm dịch vụ chất lượng cao\nThưởng thức ẩm thực đặc sắc địa phương",
    itineraryText: "Ngày 1: Đón khách - Tham quan điểm đến đầu tiên\nXe và HDV đón quý khách tại sân bay/điểm hẹn. Nhận phòng và tự do khám phá.\n\nNgày 2: Trải nghiệm văn hóa & Tiên cảnh\nĂn sáng tại khách sạn. Khởi hành tham quan các địa danh nổi tiếng.\n\nNgày 3: Mua sắm đặc sản - Tiễn khách\nTự do mua sắm và xe đưa ra sân bay/bến xe.",
  };

  const [formData, setFormData] = useState(initialFormData);

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours");
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setTours(data.data);
      }
    } catch (err) {
      console.error("Fetch tours failed, using default tours data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Category counts
  const counts = useMemo(() => {
    const res = {
      all: tours.length,
      "mien-trung": 0,
      "tay-bac": 0,
      "tay-nguyen": 0,
    };
    tours.forEach((t) => {
      const info = getCategoryInfo(t);
      if (info.id === "mien-trung") res["mien-trung"]++;
      else if (info.id === "tay-bac") res["tay-bac"]++;
      else if (info.id === "tay-nguyen") res["tay-nguyen"]++;
    });
    return res;
  }, [tours]);

  // Open Edit Modal
  const handleOpenEdit = (tour: any) => {
    setEditingTour(tour);
    const catInfo = getCategoryInfo(tour);

    let hlText = "";
    if (Array.isArray(tour.highlights)) {
      hlText = tour.highlights.join("\n");
    } else if (typeof tour.highlights === "string") {
      try {
        const parsed = JSON.parse(tour.highlights);
        hlText = Array.isArray(parsed) ? parsed.join("\n") : tour.highlights;
      } catch {
        hlText = tour.highlights;
      }
    }

    let itinText = "";
    if (Array.isArray(tour.itinerary)) {
      itinText = tour.itinerary.map((i: any) => `${i.day || ""}: ${i.title || ""}\n${i.content || ""}`).join("\n\n");
    } else if (typeof tour.itinerary === "string") {
      try {
        const parsed = JSON.parse(tour.itinerary);
        if (Array.isArray(parsed)) {
          itinText = parsed.map((i: any) => `${i.day || ""}: ${i.title || ""}\n${i.content || ""}`).join("\n\n");
        } else {
          itinText = tour.itinerary;
        }
      } catch {
        itinText = tour.itinerary;
      }
    }

    setFormData({
      title: tour.title || "",
      category: catInfo.id,
      destination: tour.destination || "",
      duration: tour.duration || "3N2Đ",
      price: String(tour.price || 0),
      originalPrice: String(tour.originalPrice || tour.price || 0),
      image: tour.image || "",
      badge: tour.badge || "",
      badgeColor: tour.badgeColor || "#0B74D1",
      description: tour.description || "",
      highlightsText: hlText || initialFormData.highlightsText,
      itineraryText: itinText || initialFormData.itineraryText,
    });
  };

  // Create or Update Tour
  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();

    const highlightsArray = formData.highlightsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const itineraryLines = formData.itineraryText.split("\n\n");
    const itineraryArray = itineraryLines.map((block, idx) => {
      const lines = block.split("\n");
      const header = lines[0] || `Ngày ${idx + 1}`;
      const content = lines.slice(1).join(" ") || header;
      return {
        day: header.split(":")[0]?.trim() || `Ngày ${idx + 1}`,
        title: header.split(":")[1]?.trim() || header,
        content: content,
      };
    });

    const categorySlugMap: Record<string, string> = {
      "mien-trung": "tour-mien-trung",
      "tay-bac": "tour-tay-bac",
      "tay-nguyen": "tour-tay-nguyen",
    };

    const payload = {
      title: formData.title,
      destination: formData.destination,
      duration: formData.duration,
      price: formData.price,
      originalPrice: formData.originalPrice,
      image: formData.image,
      badge: formData.badge || null,
      badgeColor: formData.badgeColor || "#0B74D1",
      description: formData.description,
      highlights: JSON.stringify(highlightsArray),
      itinerary: JSON.stringify(itineraryArray),
      categorySlug: categorySlugMap[formData.category] || "tour-mien-trung",
    };

    try {
      if (editingTour && editingTour.id) {
        // PUT update
        const res = await fetch(`/api/tours/${editingTour.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(`✅ Đã cập nhật thành công tour "${formData.title}"`);
          setEditingTour(null);
          fetchTours();
        } else {
          showToast(`❌ Lỗi cập nhật tour: ${data.error || "Không xác định"}`);
        }
      } else {
        // POST create
        const res = await fetch("/api/tours", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(`✅ Đã thêm tour mới thành công!`);
          setIsAddModalOpen(false);
          setFormData(initialFormData);
          fetchTours();
        } else {
          showToast(`❌ Lỗi thêm tour: ${data.error || "Không xác định"}`);
        }
      }
    } catch (err) {
      showToast("❌ Không thể kết nối tới máy chủ.");
    }
  };

  // Delete Tour
  const handleDeleteTour = async (tour: any) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tour "${tour.title}"?`)) return;

    try {
      if (tour.id) {
        const res = await fetch(`/api/tours/${tour.id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          showToast(`🗑️ Đã xóa tour "${tour.title}"`);
          fetchTours();
          return;
        }
      }
      // Fallback state filter
      setTours((prev) => prev.filter((t) => t.id !== tour.id));
      showToast(`🗑️ Đã xóa tour "${tour.title}"`);
    } catch (err) {
      showToast("❌ Lỗi khi xóa tour.");
    }
  };

  // Filtered tours
  const filteredTours = useMemo(() => {
    return tours.filter((t) => {
      // Category match
      if (activeCategory !== "all") {
        const catInfo = getCategoryInfo(t);
        if (catInfo.id !== activeCategory) return false;
      }
      // Search match
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = t.title?.toLowerCase().includes(q);
        const matchDest = t.destination?.toLowerCase().includes(q);
        return matchTitle || matchDest;
      }
      return true;
    });
  }, [tours, activeCategory, search]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {statusMessage && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 9999,
            background: "#0F172A",
            color: "white",
            padding: "14px 24px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            fontSize: "0.92rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {statusMessage}
        </div>
      )}

      {/* Header & Main Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.02em" }}>
              Quản Lý Danh Sách Tour Du Lịch
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
              {tours.length} Tour
            </span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "#64748B", marginTop: "4px" }}>
            Hệ thống quản lý tất cả các tour du lịch đa vùng miền (Miền Trung, Tây Bắc - Miền Bắc, Tây Nguyên)
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(initialFormData);
            setIsAddModalOpen(true);
          }}
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
            transition: "all 0.2s ease",
          }}
        >
          <Plus size={18} /> Thêm Tour Mới Đầy Đủ Chi Tiết
        </button>
      </div>

      {/* Category Tabs (Synchronized with Website UI) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        <button
          onClick={() => setActiveCategory("all")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "14px",
            border: activeCategory === "all" ? "2px solid #0B74D1" : "1px solid #E2E8F0",
            background: activeCategory === "all" ? "#0B74D1" : "white",
            color: activeCategory === "all" ? "white" : "#475569",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: activeCategory === "all" ? "0 4px 14px rgba(11, 116, 209, 0.25)" : "none",
          }}
        >
          <Globe size={16} />
          Tất cả
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "0.74rem",
              fontWeight: 800,
              background: activeCategory === "all" ? "rgba(255,255,255,0.25)" : "#F1F5F9",
              color: activeCategory === "all" ? "white" : "#64748B",
            }}
          >
            {counts.all}
          </span>
        </button>

        <button
          onClick={() => setActiveCategory("mien-trung")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "14px",
            border: activeCategory === "mien-trung" ? "2px solid #F59E0B" : "1px solid #E2E8F0",
            background: activeCategory === "mien-trung" ? "#F59E0B" : "white",
            color: activeCategory === "mien-trung" ? "white" : "#475569",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: activeCategory === "mien-trung" ? "0 4px 14px rgba(245, 158, 11, 0.25)" : "none",
          }}
        >
          <Palmtree size={16} />
          Miền Trung
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "0.74rem",
              fontWeight: 800,
              background: activeCategory === "mien-trung" ? "rgba(255,255,255,0.25)" : "#FEF3C7",
              color: activeCategory === "mien-trung" ? "white" : "#D97706",
            }}
          >
            {counts["mien-trung"]}
          </span>
        </button>

        <button
          onClick={() => setActiveCategory("tay-bac")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "14px",
            border: activeCategory === "tay-bac" ? "2px solid #16A34A" : "1px solid #E2E8F0",
            background: activeCategory === "tay-bac" ? "#16A34A" : "white",
            color: activeCategory === "tay-bac" ? "white" : "#475569",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: activeCategory === "tay-bac" ? "0 4px 14px rgba(22, 163, 74, 0.25)" : "none",
          }}
        >
          <Mountain size={16} />
          Tây Bắc - Miền Bắc
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "0.74rem",
              fontWeight: 800,
              background: activeCategory === "tay-bac" ? "rgba(255,255,255,0.25)" : "#DCFCE7",
              color: activeCategory === "tay-bac" ? "white" : "#15803D",
            }}
          >
            {counts["tay-bac"]}
          </span>
        </button>

        <button
          onClick={() => setActiveCategory("tay-nguyen")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "14px",
            border: activeCategory === "tay-nguyen" ? "2px solid #8B5CF6" : "1px solid #E2E8F0",
            background: activeCategory === "tay-nguyen" ? "#8B5CF6" : "white",
            color: activeCategory === "tay-nguyen" ? "white" : "#475569",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: activeCategory === "tay-nguyen" ? "0 4px 14px rgba(139, 92, 246, 0.25)" : "none",
          }}
        >
          <Compass size={16} />
          Tây Nguyên
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "0.74rem",
              fontWeight: 800,
              background: activeCategory === "tay-nguyen" ? "rgba(255,255,255,0.25)" : "#EDE9FE",
              color: activeCategory === "tay-nguyen" ? "white" : "#7C3AED",
            }}
          >
            {counts["tay-nguyen"]}
          </span>
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
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "260px" }}>
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Tìm kiếm tour theo tên, điểm đến (Hà Nội, Sapa, Đà Nẵng, Pleiku...)"
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
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>
          Hiển thị <strong style={{ color: "#0F172A" }}>{filteredTours.length}</strong> / {tours.length} tour
        </div>
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
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#F8FBFD", borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
                  TOUR & ĐIỂM ĐẾN
                </th>
                <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
                  VÙNG MIỀN
                </th>
                <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
                  THỜI GIAN
                </th>
                <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
                  GIÁ NIÊM YẾT
                </th>
                <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
                  ĐÁNH GIÁ
                </th>
                <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>
                  BADGE
                </th>
                <th style={{ padding: "16px 20px", fontSize: "0.82rem", fontWeight: 700, color: "#475569", textAlign: "right" }}>
                  THAO TÁC
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "40px 20px", textAlign: "center", color: "#94A3B8" }}>
                    Không tìm thấy tour phù hợp với điều kiện tìm kiếm
                  </td>
                </tr>
              ) : (
                filteredTours.map((tour) => {
                  const catInfo = getCategoryInfo(tour);
                  return (
                    <tr key={tour.id || tour.title} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      {/* Tour Info */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <img
                            src={tour.image}
                            alt={tour.title}
                            style={{
                              width: 54,
                              height: 54,
                              borderRadius: "12px",
                              objectFit: "cover",
                              background: "#F1F5F9",
                              border: "1px solid #E2E8F0",
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A", maxWidth: "340px", lineHeight: "1.35" }}>
                              {tour.title}
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "3px" }}>
                              📍 {tour.destination}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Region / Category */}
                      <td style={{ padding: "16px 20px" }}>
                        <span
                          style={{
                            background: catInfo.bg,
                            color: catInfo.color,
                            border: `1px solid ${catInfo.borderColor}`,
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "0.78rem",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {catInfo.label}
                        </span>
                      </td>

                      {/* Duration */}
                      <td style={{ padding: "16px 20px", fontSize: "0.9rem", fontWeight: 700, color: "#334155" }}>
                        {tour.duration}
                      </td>

                      {/* Pricing */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 800, color: "#0B74D1", fontSize: "0.95rem" }}>
                          {formatPrice(tour.price)}
                        </div>
                        {tour.originalPrice && tour.originalPrice > tour.price && (
                          <div style={{ fontSize: "0.78rem", color: "#94A3B8", textDecoration: "line-through" }}>
                            {formatPrice(tour.originalPrice)}
                          </div>
                        )}
                      </td>

                      {/* Rating */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.88rem", fontWeight: 700, color: "#0F172A" }}>
                          <Star size={15} fill="#F59E0B" color="#F59E0B" />
                          {tour.rating || 5.0}
                          <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 400 }}>
                            ({tour.reviewsCount || tour.reviews || 50})
                          </span>
                        </div>
                      </td>

                      {/* Badge */}
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

                      {/* Actions */}
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                          <button
                            onClick={() => setSelectedPreviewTour(tour)}
                            title="Xem Chi Tiết Tour (Giao diện khách hàng)"
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
                            onClick={() => handleOpenEdit(tour)}
                            title="Sửa Tour"
                            style={{
                              background: "#F1F5F9",
                              border: "none",
                              padding: "8px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              color: "#475569",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTour(tour)}
                            title="Xóa Tour"
                            style={{
                              background: "#FEE2E2",
                              border: "none",
                              padding: "8px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              color: "#EF4444",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tour Detail Preview Modal (User View) */}
      <TourDetailModal
        tour={selectedPreviewTour}
        onClose={() => setSelectedPreviewTour(null)}
        onBookNow={() => {
          alert("Chế độ xem trước dành cho Quản Trị Viên");
        }}
      />

      {/* Add / Edit Tour Modal */}
      {(isAddModalOpen || editingTour) && (
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
                  {editingTour ? "CẬP NHẬT THÔNG TIN TOUR" : "TẠO TOUR MỚI VÀO HỆ THỐNG"}
                </span>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", marginTop: "2px" }}>
                  {editingTour ? `Chỉnh Sửa: ${editingTour.title}` : "Thêm Thông Tin & Lịch Trình Chi Tiết Tour"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingTour(null);
                }}
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
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTour} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Basic Fields */}
              <div style={{ background: "#F8FBFD", padding: "18px", borderRadius: "18px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0B74D1", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={16} /> 1. Thông Tin Cơ Bản & Phân Loại
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Tên Tour Du Lịch *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ví dụ: Tour Tây Bắc 6N5Đ Mùa Hoa Cải Vàng | Hà Nội - Hạ Long..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.92rem" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Vùng Miền / Danh Mục *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem", background: "white" }}
                    >
                      <option value="mien-trung">🌴 Miền Trung</option>
                      <option value="tay-bac">🏔️ Tây Bắc - Miền Bắc</option>
                      <option value="tay-nguyen">🧭 Tây Nguyên</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Điểm Đến *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ví dụ: Hà Nội, Lào Cai, Sapa"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Thời Gian *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ví dụ: 3N2Đ, 4N3Đ..."
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Badge Nhãn Nổi Bật
                    </label>
                    <input
                      type="text"
                      placeholder="Bán chạy / Hot / Mới"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Màu Nhãn (Hex Code)
                    </label>
                    <input
                      type="text"
                      placeholder="#EF4444 hoặc #F59E0B"
                      value={formData.badgeColor}
                      onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Giá Bán Khuyến Mãi (VNĐ) *
                    </label>
                    <input
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Giá Gốc Niêm Yết (VNĐ)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    URL hoặc Đường Dẫn Ảnh Bìa Tour *
                  </label>
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
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Mô Tả Tổng Quan Tour
                  </label>
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
                  transition: "all 0.2s ease",
                }}
              >
                {editingTour ? "✓ Lưu Cập Nhật Tour Vào Hệ Thống" : "✓ Thêm Tour Mới Vào Hệ Thống"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
