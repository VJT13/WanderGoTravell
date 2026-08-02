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
} from "lucide-react";
import Link from "next/link";

interface StatsData {
  totalTours: number;
  totalBookings: number;
  totalContacts: number;
  totalUsers: number;
  revenue: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

const monthlyData = [
  { month: "Thg 1", revenue: 45000000, bookings: 12, cost: 27000000, margin: "40%" },
  { month: "Thg 2", revenue: 62000000, bookings: 18, cost: 37000000, margin: "40.3%" },
  { month: "Thg 3", revenue: 58000000, bookings: 15, cost: 34000000, margin: "41.3%" },
  { month: "Thg 4", revenue: 78000000, bookings: 22, cost: 46000000, margin: "41.0%" },
  { month: "Thg 5", revenue: 95000000, bookings: 28, cost: 57000000, margin: "40.0%" },
  { month: "Thg 6", revenue: 125000000, bookings: 36, cost: 75000000, margin: "40.0%" },
  { month: "Thg 7", revenue: 148000000, bookings: 42, cost: 88000000, margin: "40.5%" },
  { month: "Thg 8", revenue: 165000000, bookings: 48, cost: 99000000, margin: "40.0%" },
  { month: "Thg 9", revenue: 110000000, bookings: 30, cost: 66000000, margin: "40.0%" },
  { month: "Thg 10", revenue: 88000000, bookings: 24, cost: 52000000, margin: "40.9%" },
  { month: "Thg 11", revenue: 72000000, bookings: 20, cost: 43000000, margin: "40.2%" },
  { month: "Thg 12", revenue: 105000000, bookings: 32, cost: 63000000, margin: "40.0%" },
];

const destinationShare = [
  { name: "Đà Nẵng - Hội An - Huế", share: 42, color: "#0B74D1", count: "142 tour" },
  { name: "Nha Trang - Đà Lạt", share: 28, color: "#16A34A", count: "96 tour" },
  { name: "Phú Yên - Quy Nhơn", share: 18, color: "#F59E0B", count: "58 tour" },
  { name: "Quảng Bình - Nghệ An", share: 12, color: "#8B5CF6", count: "34 tour" },
];

const customerDemographics = [
  { ageGroup: "25 - 34 tuổi (Gia đình trẻ / Cặp đôi)", percentage: 44, color: "#0B74D1" },
  { ageGroup: "35 - 49 tuổi (Đoàn gia đình / Công ty)", percentage: 32, color: "#16A34A" },
  { ageGroup: "50+ tuổi (Nghỉ dưỡng di sản)", percentage: 16, color: "#F59E0B" },
  { ageGroup: "18 - 24 tuổi (Khám phá trải nghiệm)", percentage: 8, color: "#8B5CF6" },
];

const paymentMethods = [
  { method: "Chuyển khoản QR Mã MBBank", percentage: 68, amount: 112200000, color: "#0B74D1" },
  { method: "Thanh toán Tiền Mặt tại VP", percentage: 22, amount: 36300000, color: "#16A34A" },
  { method: "Thẻ ATM / Visa / Master", percentage: 10, amount: 16500000, color: "#F59E0B" },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "revenue" | "customers">("overview");
  const [stats, setStats] = useState<StatsData>({
    totalTours: 11,
    totalBookings: 24,
    totalContacts: 18,
    totalUsers: 150,
    revenue: 165000000,
  });

  const [activeIdx, setActiveIdx] = useState<number>(7);
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, toursRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/tours"),
        ]);
        const statsData = await statsRes.json();
        const toursData = await toursRes.json();

        if (statsData.success) setStats(statsData.stats);
        if (toursData.success) setTours(toursData.data.slice(0, 5));
      } catch (err) {
        console.error("Dashboard error:", err);
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
    const y = chartHeight - (d.revenue / maxRev) * (chartHeight - 20);
    return { x, y, revenue: d.revenue, month: d.month, bookings: d.bookings };
  });

  const pathD = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = a[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`;
  }, "");

  const areaD = `${pathD} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
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
              ● Core SQLite DB Active
            </span>
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "white", margin: 0 }}>
            Trung Tâm Điều Hành & Báo Cáo Phân Tích Doanh Thu
          </h1>
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
          { id: "overview", label: "📊 Tổng Quan & KPI", color: "#0B74D1" },
          { id: "revenue", label: "💰 Báo Cáo Doanh Thu Chi Tiết", color: "#16A34A" },
          { id: "customers", label: "👥 Phân Tích Xu Hướng Du Khách", color: "#8B5CF6" },
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
              { title: "TỔNG DOANH THU 2024", value: formatPrice(stats.revenue), badge: "+24.8% YoY", icon: <DollarSign size={24} />, bg: "linear-gradient(135deg, #0B74D1 0%, #3B9AE8 100%)" },
              { title: "ĐƠN ĐẶT TOUR THÀNH CÔNG", value: `${stats.totalBookings} đơn`, badge: "Duyệt 92%", icon: <CalendarCheck size={24} />, bg: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)" },
              { title: "PROGRAMS MIỀN TRUNG", value: `${stats.totalTours} tour`, badge: "Hoạt động 100%", icon: <Compass size={24} />, bg: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)" },
              { title: "TƯ VẤN CẦN XỬ LÝ", value: `${stats.totalContacts} khách`, badge: "< 15 Phút", icon: <MessageSquareText size={24} />, bg: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)" },
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
                    Biểu Đồ Xu Hướng Doanh Thu Tương Tác 12 Tháng (2024)
                  </h2>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "2px" }}>
                  Đường cong xu hướng tăng trưởng doanh thu & số đơn book thực tế
                </p>
              </div>

              <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", padding: "10px 18px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#15803D", fontWeight: 700 }}>Tháng Đang Chọn: </span>
                  <strong style={{ color: "#0F172A" }}>{monthlyData[activeIdx].month}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#15803D", fontWeight: 700 }}>Doanh Thu: </span>
                  <strong style={{ color: "#0B74D1", fontSize: "1.05rem" }}>{formatPrice(monthlyData[activeIdx].revenue)}</strong>
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
                  Cơ Cấu Kênh Thanh Toán Du Khách
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
                      Tổng tiền nhận: <strong style={{ color: "#0F172A" }}>{formatPrice(p.amount)}</strong>
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
                </div>

                <div style={{ background: "#FEF2F2", padding: "16px", borderRadius: "16px", border: "1px solid #FCA5A5" }}>
                  <div style={{ fontSize: "0.8rem", color: "#DC2626", fontWeight: 700 }}>CHI PHÍ VẬN HÀNH TOUR & XE (60%)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#DC2626", marginTop: "4px" }}>
                    {formatPrice(stats.revenue * 0.6)}
                  </div>
                </div>

                <div style={{ background: "#EFF6FF", padding: "16px", borderRadius: "16px", border: "1px solid #BFDBFE" }}>
                  <div style={{ fontSize: "0.8rem", color: "#0B74D1", fontWeight: 700 }}>LỢI NHUẬN RÒNG SAU THUẾ (NET MARGIN 40%)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0B74D1", marginTop: "4px" }}>
                    {formatPrice(stats.revenue * 0.4)}
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
                  <th style={{ padding: "12px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>LỢI NHUẬN</th>
                  <th style={{ padding: "12px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>BIÊN LỢI NHUẬN</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "#0F172A" }}>{m.month} / 2024</td>
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
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0B74D1", marginTop: "4px" }}>
                    Trung bình 14 - 21 ngày trước ngày khởi hành
                  </div>
                </div>

                <div style={{ background: "#F8FBFD", padding: "14px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>THỜI LƯỢNG TOUR ĐƯỢC ƯA THÍCH NHẤT</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16A34A", marginTop: "4px" }}>
                    Tour 3N2Đ và 4N3Đ (Chiếm 78% tổng đơn)
                  </div>
                </div>

                <div style={{ background: "#F8FBFD", padding: "14px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>THIẾT BỊ TRUY CẬP ĐẶT TOUR</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#8B5CF6", marginTop: "4px" }}>
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
