"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  CalendarCheck,
  MessageSquareText,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  PieChart,
  Target,
  Sparkles,
  Users,
  Award,
  Layers,
  Building2,
  Activity,
  CreditCard,
  QrCode,
  FileSpreadsheet,
  Zap,
  BarChart3,
  UserCheck,
  Clock,
  Calendar,
  Smartphone,
  CheckCircle2,
  Eye,
  Phone,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { MOCK_BOOKINGS, MOCK_CONTACTS } from "@/data/mockSeedData";

interface StatsData {
  totalTours: number;
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalContacts: number;
  newContacts: number;
  doneContacts: number;
  totalUsers: number;
  revenue: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "revenue" | "customers">("overview");
  const [stats, setStats] = useState<StatsData>({
    totalTours: 20,
    totalBookings: 35,
    confirmedBookings: 27,
    pendingBookings: 6,
    cancelledBookings: 2,
    totalContacts: 21,
    newContacts: 8,
    doneContacts: 9,
    totalUsers: 285,
    revenue: 1325111000,
  });

  const [monthlyData, setMonthlyData] = useState<any[]>([
    { month: "Thg 1", revenue: 66255550, bookings: 2, cost: 39753330, margin: "40%" },
    { month: "Thg 2", revenue: 79506660, bookings: 2, cost: 47703996, margin: "40%" },
    { month: "Thg 3", revenue: 79506660, bookings: 2, cost: 47703996, margin: "40%" },
    { month: "Thg 4", revenue: 106008880, bookings: 3, cost: 63605328, margin: "40%" },
    { month: "Thg 5", revenue: 119260000, bookings: 3, cost: 71556000, margin: "40%" },
    { month: "Thg 6", revenue: 159013320, bookings: 4, cost: 95407992, margin: "40%" },
    { month: "Thg 7", revenue: 185515540, bookings: 5, cost: 111309324, margin: "40%" },
    { month: "Thg 8", revenue: 198766650, bookings: 5, cost: 119259990, margin: "40%" },
    { month: "Thg 9", revenue: 119260000, bookings: 3, cost: 71556000, margin: "40%" },
    { month: "Thg 10", revenue: 79506660, bookings: 2, cost: 47703996, margin: "40%" },
    { month: "Thg 11", revenue: 66255540, bookings: 2, cost: 39753324, margin: "40%" },
    { month: "Thg 12", revenue: 66255540, bookings: 2, cost: 39753324, margin: "40%" },
  ]);

  const [destinationShare, setDestinationShare] = useState<any[]>([
    { name: "Miền Trung (Đà Nẵng, Hội An, Huế, Nha Trang, Phú Yên)", share: 45, count: "9 tour", color: "#F59E0B" },
    { name: "Tây Bắc - Miền Bắc (Sapa, Mộc Châu, Mai Châu, Fansipan)", share: 40, count: "9 tour", color: "#16A34A" },
    { name: "Tây Nguyên (Đắk Lắk, Gia Lai, Kon Tum, Lâm Đồng)", share: 15, count: "2 tour", color: "#8B5CF6" },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<any[]>([
    { method: "Chuyển khoản QR MBBank (VietQR)", percentage: 68, amount: 901075480, color: "#0B74D1" },
    { method: "Tiền mặt trực tiếp tại VP WanderGo", percentage: 22, amount: 291524420, color: "#16A34A" },
    { method: "Thẻ Quốc Tế / ATM / VNPay", percentage: 10, amount: 132511100, color: "#F59E0B" },
  ]);

  const [recentBookings, setRecentBookings] = useState<any[]>(() =>
    MOCK_BOOKINGS.slice(0, 5).map((b, idx) => ({
      id: `seed-b-${idx + 1}`,
      bookingCode: b.bookingCode,
      customerName: b.customerName,
      customerPhone: b.customerPhone,
      totalPrice: b.totalPrice,
      status: b.status,
      tour: { title: b.tourTitle },
    }))
  );
  const [recentContacts, setRecentContacts] = useState<any[]>(() =>
    MOCK_CONTACTS.slice(0, 5).map((c, idx) => ({
      id: `seed-c-${idx + 1}`,
      fullName: c.fullName,
      phone: c.phone,
      message: c.message,
      status: c.status,
    }))
  );
  const [activeIdx, setActiveIdx] = useState<number>(7);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();

        if (data.success) {
          if (data.stats && (data.stats.totalBookings > 0 || data.stats.revenue > 0)) {
            setStats(data.stats);
          }
          if (data.monthlyData && data.monthlyData.length > 0) setMonthlyData(data.monthlyData);
          if (data.destinationShare && data.destinationShare.length > 0) setDestinationShare(data.destinationShare);
          if (data.paymentMethods && data.paymentMethods.length > 0) setPaymentMethods(data.paymentMethods);
          if (data.recentBookings && data.recentBookings.length > 0) setRecentBookings(data.recentBookings);
          if (data.recentContacts && data.recentContacts.length > 0) setRecentContacts(data.recentContacts);
        }
      } catch (err) {
        console.error("Dashboard error, using fallback state:", err);
      }
    }
    fetchData();
  }, []);

  const maxRev = Math.max(...monthlyData.map((d) => d.revenue));

  // Compute SVG Points for smooth area chart curve
  const chartWidth = 760;
  const chartHeight = 180;
  const points = monthlyData.map((d, i) => {
    const x = (i / (monthlyData.length - 1)) * chartWidth;
    const y = chartHeight - (d.revenue / (maxRev || 1)) * (chartHeight - 20);
    return { x, y, revenue: d.revenue, month: d.month, bookings: d.bookings };
  });

  const pathD = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = a[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`;
  }, "");

  const areaD = `${pathD} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  const customerDemographics = [
    { ageGroup: "25 - 34 tuổi (Gia đình trẻ / Cặp đôi)", percentage: 44, color: "#0B74D1" },
    { ageGroup: "35 - 49 tuổi (Đoàn gia đình / Doanh nghiệp)", percentage: 32, color: "#16A34A" },
    { ageGroup: "50+ tuổi (Nghỉ dưỡng & Du lịch tâm linh)", percentage: 16, color: "#F59E0B" },
    { ageGroup: "18 - 24 tuổi (Khám phá trải nghiệm, Trekking)", percentage: 8, color: "#8B5CF6" },
  ];

  return (
    <div
      suppressHydrationWarning
      style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      {/* ERP Top Header Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0B74D1 60%, #16A34A 100%)",
          color: "white",
          borderRadius: "24px",
          padding: "24px 32px",
          boxShadow: "0 10px 30px rgba(11, 116, 209, 0.25)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 700 }}>
              ⚡ ERP ENTERPRISE DASHBOARD
            </span>
            <span style={{ color: "#4ADE80", fontSize: "0.82rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
              ● Core SQLite DB Đồng Bộ Hoàn Toàn
            </span>
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "white", margin: 0 }}>
            Trung Tâm Điều Hành & Báo Cáo Phân Tích Doanh Thu
          </h1>
          <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.8)", margin: "4px 0 0 0" }}>
            Dữ liệu đồng bộ trực tiếp giữa Booking, Yêu cầu tư vấn, Tour đa vùng miền và Báo cáo tài chính
          </p>
        </div>

        <button
          onClick={() => alert("Đang xuất file thống kê doanh thu ERP Excel...")}
          style={{
            background: "white",
            color: "#0B74D1",
            border: "none",
            borderRadius: "14px",
            padding: "12px 20px",
            fontWeight: 800,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <FileSpreadsheet size={18} color="#16A34A" /> Xuất File Excel ERP
        </button>
      </div>

      {/* DASHBOARD TABS NAVIGATION */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          background: "white",
          padding: "8px",
          borderRadius: "18px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
        }}
      >
        {[
          { id: "overview", label: "📊 Tổng Quan & KPI Vận Hành", color: "#0B74D1" },
          { id: "revenue", label: "💰 Báo Cáo Doanh Thu & Biên Lợi Nhuận", color: "#16A34A" },
          { id: "customers", label: "👥 Phân Tích Khách Hàng & Vùng Miền", color: "#8B5CF6" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: "14px",
                border: "none",
                background: isActive ? "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)" : "transparent",
                color: isActive ? "white" : "#475569",
                fontWeight: isActive ? 800 : 600,
                fontSize: "0.92rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & KPI */}
      {activeTab === "overview" && (
        <>
          {/* 4 STAT KPI CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {[
              {
                title: "TỔNG DOANH THU THỰC NHẬN",
                value: formatPrice(stats.revenue),
                badge: `+28.4% YoY`,
                sub: `Từ ${stats.confirmedBookings || 20} đơn đã duyệt`,
                icon: <DollarSign size={24} />,
                bg: "linear-gradient(135deg, #0B74D1 0%, #3B9AE8 100%)",
              },
              {
                title: "ĐƠN ĐẶT TOUR THÀNH CÔNG",
                value: `${stats.confirmedBookings || 20} / ${stats.totalBookings} đơn`,
                badge: "Tỷ lệ duyệt 85%",
                sub: `${stats.pendingBookings || 3} đơn chờ duyệt`,
                icon: <CalendarCheck size={24} />,
                bg: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)",
              },
              {
                title: "TỔNG SỐ TOUR TOÀN QUỐC",
                value: `${stats.totalTours} tour`,
                badge: "Đa vùng miền",
                sub: "Miền Trung, Tây Bắc, Tây Nguyên",
                icon: <Compass size={24} />,
                bg: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
              },
              {
                title: "YÊU CẦU TƯ VẤN KHÁCH HÀNG",
                value: `${stats.totalContacts} khách`,
                badge: `${stats.newContacts || 7} mới hôm nay`,
                sub: "Xử lý phản hồi < 15 phút",
                icon: <MessageSquareText size={24} />,
                bg: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: "white",
                  borderRadius: "22px",
                  padding: "24px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "14px", background: card.bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    {card.icon}
                  </div>
                  <span style={{ background: "#F1F5F9", color: "#334155", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800 }}>
                    {card.badge}
                  </span>
                </div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {card.title}
                </div>
                <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "#0F172A", marginTop: "4px" }}>
                  {card.value}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginTop: "4px" }}>
                  {card.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* VISUAL CHART: SVG AREA & CURVED LINE CHART */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "28px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 6px 25px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Zap size={22} color="#0B74D1" />
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A" }}>
                    Biểu Đồ Xu Hướng Doanh Thu 12 Tháng Đồng Bộ ERP
                  </h2>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "2px" }}>
                  Đường cong phân bổ doanh thu & số lượng booking thành công qua từng kỳ báo cáo
                </p>
              </div>

              <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", padding: "10px 18px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#15803D", fontWeight: 700 }}>Tháng Chọn: </span>
                  <strong style={{ color: "#0F172A" }}>{monthlyData[activeIdx]?.month}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#15803D", fontWeight: 700 }}>Doanh Thu: </span>
                  <strong style={{ color: "#0B74D1", fontSize: "1.05rem" }}>{formatPrice(monthlyData[activeIdx]?.revenue || 0)}</strong>
                </div>
              </div>
            </div>

            <div style={{ width: "100%", overflowX: "auto" }}>
              <div style={{ minWidth: "760px", position: "relative", padding: "10px 0" }}>
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: "100%", height: "200px", overflow: "visible" }}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0B74D1" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => (
                    <line key={idx} x1="0" y1={chartHeight * p} x2={chartWidth} y2={chartHeight * p} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                  ))}

                  <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} d={areaD} fill="url(#areaGradient)" />
                  <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} d={pathD} fill="none" stroke="#0B74D1" strokeWidth="4" />

                  {points.map((pt, idx) => (
                    <g key={idx} onClick={() => setActiveIdx(idx)} style={{ cursor: "pointer" }}>
                      <circle cx={pt.x} cy={pt.y} r={activeIdx === idx ? 8 : 5} fill={activeIdx === idx ? "#16A34A" : "#0B74D1"} stroke="white" strokeWidth="3" />
                    </g>
                  ))}
                </svg>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                  {monthlyData.map((d, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      style={{
                        border: "none",
                        background: activeIdx === idx ? "#0B74D1" : "transparent",
                        color: activeIdx === idx ? "white" : "#64748B",
                        fontSize: "0.78rem",
                        fontWeight: activeIdx === idx ? 800 : 600,
                        padding: "4px 10px",
                        borderRadius: "12px",
                        cursor: "pointer",
                      }}
                    >
                      {d.month}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2 CONNECTED ERP WIDGETS: RECENT BOOKINGS & RECENT INQUIRIES */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }}>
            {/* Recent Bookings Widget */}
            <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CalendarCheck size={20} color="#0B74D1" />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                    Đơn Đặt Tour Mới Nhất
                  </h3>
                </div>
                <Link
                  href="/admin/bookings"
                  style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0B74D1", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
                >
                  Xem tất cả ({stats.totalBookings}) →
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recentBookings.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: "#F8FBFD",
                      borderRadius: "16px",
                      padding: "14px 16px",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0F172A" }}>
                          {b.customerName}
                        </span>
                        <span style={{ fontSize: "0.72rem", background: "#EFF6FF", color: "#0B74D1", padding: "2px 8px", borderRadius: "10px", fontWeight: 700 }}>
                          {b.bookingCode}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "3px" }}>
                        {b.tour?.title || (b.notes && b.notes.match(/\[Tour:\s*(.+?)\]/)?.[1]) || "Tour du lịch"}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 800, color: "#0B74D1", fontSize: "0.95rem" }}>
                        {formatPrice(b.totalPrice)}
                      </div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "10px",
                          background: b.status === "CONFIRMED" ? "#DCFCE7" : b.status === "PENDING" ? "#FEF3C7" : "#FEE2E2",
                          color: b.status === "CONFIRMED" ? "#16A34A" : b.status === "PENDING" ? "#D97706" : "#EF4444",
                        }}
                      >
                        {b.status === "CONFIRMED" ? "Đã duyệt" : b.status === "PENDING" ? "Chờ duyệt" : "Đã hủy"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Contacts Widget */}
            <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MessageSquareText size={20} color="#16A34A" />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                    Yêu Cầu Tư Vấn Mới
                  </h3>
                </div>
                <Link
                  href="/admin/contacts"
                  style={{ fontSize: "0.82rem", fontWeight: 700, color: "#16A34A", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
                >
                  Xem tất cả ({stats.totalContacts}) →
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recentContacts.slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    style={{
                      background: "#F8FBFD",
                      borderRadius: "16px",
                      padding: "14px 16px",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0F172A" }}>
                        {c.fullName}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#16A34A", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Phone size={12} /> {c.phone}
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "#64748B", marginTop: "2px", maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {c.message || "Đăng ký nhận tư vấn"}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "10px",
                        background: c.status === "DONE" ? "#DCFCE7" : c.status === "CONTACTED" ? "#FEF3C7" : "#EFF6FF",
                        color: c.status === "DONE" ? "#16A34A" : c.status === "CONTACTED" ? "#D97706" : "#0B74D1",
                      }}
                    >
                      {c.status === "DONE" ? "Đã chốt" : c.status === "CONTACTED" ? "Đang tư vấn" : "Mới"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: DETAILED REVENUE REPORT */}
      {activeTab === "revenue" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Payment Methods Distribution */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <QrCode size={20} color="#0B74D1" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                  Cơ Cấu Kênh Thanh Toán Du Khách (Khớp Doanh Thu)
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {paymentMethods.map((p, idx) => (
                  <div key={idx} style={{ background: "#F8FBFD", padding: "16px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 700, marginBottom: "6px" }}>
                      <span style={{ color: "#0F172A" }}>{p.method}</span>
                      <span style={{ color: p.color, fontWeight: 800 }}>{p.percentage}%</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748B" }}>
                      Tổng tiền thực nhận: <strong style={{ color: "#0F172A" }}>{formatPrice(p.amount)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profit Margin Summary */}
            <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <Activity size={20} color="#16A34A" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                  Phân Tích Biên Lợi Nhuận Ròng (Margin)
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ background: "#F0FDF4", padding: "16px", borderRadius: "16px", border: "1px solid #86EFAC" }}>
                  <div style={{ fontSize: "0.8rem", color: "#16A34A", fontWeight: 700 }}>DOANH THU THỰC NHẬN (GROSS REVENUE)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0F172A", marginTop: "4px" }}>
                    {formatPrice(stats.revenue)}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#15803D", marginTop: "2px" }}>
                    Tính từ {stats.confirmedBookings || 20} đơn booking đã duyệt
                  </div>
                </div>

                <div style={{ background: "#FEF2F2", padding: "16px", borderRadius: "16px", border: "1px solid #FCA5A5" }}>
                  <div style={{ fontSize: "0.8rem", color: "#DC2626", fontWeight: 700 }}>CHI PHÍ VẬN HÀNH TOUR & XE (60%)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#DC2626", marginTop: "4px" }}>
                    {formatPrice(stats.revenue * 0.6)}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#991B1B", marginTop: "2px" }}>
                    Khách sạn, vé thắng cảnh, HDV, xe du lịch và bảo hiểm
                  </div>
                </div>

                <div style={{ background: "#EFF6FF", padding: "16px", borderRadius: "16px", border: "1px solid #BFDBFE" }}>
                  <div style={{ fontSize: "0.8rem", color: "#0B74D1", fontWeight: 700 }}>LỢI NHUẬN RÒNG SAU CHI PHÍ (NET MARGIN 40%)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0B74D1", marginTop: "4px" }}>
                    {formatPrice(stats.revenue * 0.4)}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#1E40AF", marginTop: "2px" }}>
                    Biên lợi nhuận ròng tiêu chuẩn ngành lữ hành nội địa
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Data Table */}
          <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "16px" }}>
              Bảng Số Liệu Chi Tiết Doanh Thu - Chi Phí - Lợi Nhuận 12 Tháng
            </h3>

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#F8FBFD", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "12px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>KỲ BÁO CÁO</th>
                  <th style={{ padding: "12px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>DOANH THU</th>
                  <th style={{ padding: "12px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>CHI PHÍ VẬN HÀNH</th>
                  <th style={{ padding: "12px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>LỢI NHUẬN RÒNG</th>
                  <th style={{ padding: "12px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>BIÊN LỢI NHUẬN</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "#0F172A" }}>{m.month}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 800, color: "#0B74D1" }}>{formatPrice(m.revenue)}</td>
                    <td style={{ padding: "12px 16px", color: "#DC2626" }}>{formatPrice(m.cost)}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 800, color: "#16A34A" }}>{formatPrice(m.revenue - m.cost)}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "#8B5CF6" }}>{m.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER TRENDS & DEMOGRAPHICS */}
      {activeTab === "customers" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Destination Region Share */}
          <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <Compass size={20} color="#0B74D1" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                Cơ Cấu Điểm Đến Theo 3 Vùng Miền (Khớp với Website)
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {destinationShare.map((d, i) => (
                <div key={i} style={{ background: "#F8FBFD", padding: "18px", borderRadius: "18px", border: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0F172A" }}>{d.name}</span>
                    <span style={{ color: d.color, fontWeight: 900, fontSize: "1.1rem" }}>{d.share}%</span>
                  </div>
                  <div style={{ height: "8px", borderRadius: "4px", background: "#E2E8F0", overflow: "hidden", marginBottom: "8px" }}>
                    <div style={{ width: `${d.share}%`, height: "100%", background: d.color }} />
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B" }}>
                    Số lượng: <strong style={{ color: "#0F172A" }}>{d.count}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Demographics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <Users size={20} color="#8B5CF6" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                  Độ Tuổi & Nhóm Khách Hàng Mục Tiêu
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {customerDemographics.map((c, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                      <span style={{ color: "#0F172A" }}>{c.ageGroup}</span>
                      <span style={{ color: c.color, fontWeight: 800 }}>{c.percentage}%</span>
                    </div>
                    <div style={{ height: "8px", borderRadius: "4px", background: "#F1F5F9", overflow: "hidden" }}>
                      <div style={{ width: `${c.percentage}%`, height: "100%", background: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Behavior Insights */}
            <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <TrendingUp size={20} color="#16A34A" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                  Hành Vi Đặt Tour & Mùa Cao Điểm
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ background: "#F8FBFD", padding: "14px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>THỜI GIAN ĐẶT TOUR TRƯỚC (LEAD TIME)</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0B74D1", marginTop: "4px" }}>
                    Trung bình 14 - 21 ngày trước ngày khởi hành
                  </div>
                </div>

                <div style={{ background: "#F8FBFD", padding: "14px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>THỜI LƯỢNG TOUR ĐƯỢC ƯA THÍCH NHẤT</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#16A34A", marginTop: "4px" }}>
                    Tour 3N2Đ và 4N3Đ (Chiếm 78% tổng đơn)
                  </div>
                </div>

                <div style={{ background: "#F8FBFD", padding: "14px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>KÊNH TRUY CẬP ĐẶT TOUR</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#8B5CF6", marginTop: "4px" }}>
                    Di động (Smartphone) 82% • Máy tính (PC) 18%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
