"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  MessageSquareText,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
  { label: "Quản Lý Tour", href: "/admin/tours", icon: <Compass size={20} /> },
  { label: "Quản Lý Booking", href: "/admin/bookings", icon: <CalendarCheck size={20} /> },
  { label: "Quản Lý Liên Hệ", href: "/admin/contacts", icon: <MessageSquareText size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Skip layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("wandergo_admin_token");
    localStorage.removeItem("wandergo_admin_user");
    router.push("/admin/login");
  };

  if (!mounted) {
    return (
      <div
        suppressHydrationWarning
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#F8FBFD",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Be Vietnam Pro', sans-serif",
        }}
      >
        <div
          suppressHydrationWarning
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#0B74D1",
            fontWeight: 800,
            fontSize: "0.95rem",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              border: "3px solid #BFDBFE",
              borderTopColor: "#0B74D1",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          Đang khởi tạo hệ thống quản trị...
        </div>
      </div>
    );
  }

  return (
    <div
      suppressHydrationWarning
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FBFD",
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: isSidebarOpen ? "260px" : "80px",
          background: "#0A1628",
          color: "white",
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            height: "76px",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: "40px",
              width: "auto",
              background: "white",
              padding: "4px",
              borderRadius: "10px",
            }}
          />
          {isSidebarOpen && (
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "white" }}>
                WanderGo
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "#22C55E",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                ADMIN DASHBOARD
              </div>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div style={{ padding: "20px 12px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  color: isActive ? "white" : "rgba(255,255,255,0.65)",
                  background: isActive ? "linear-gradient(135deg, #0B74D1, #16A34A)" : "transparent",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ flexShrink: 0 }}>{item.icon}</div>
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 16px",
              borderRadius: "12px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            <ExternalLink size={18} />
            {isSidebarOpen && <span>Xem Trang Web</span>}
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 16px",
              borderRadius: "12px",
              color: "#EF4444",
              background: "rgba(239,68,68,0.1)",
              border: "none",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              width: "100%",
            }}
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Đăng Xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: isSidebarOpen ? "260px" : "80px",
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Top Header */}
        <header
          style={{
            height: "76px",
            background: "white",
            borderBottom: "1px solid #E2E8F0",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 90,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                background: "#F1F5F9",
                border: "none",
                borderRadius: "10px",
                padding: "8px",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
              Bảng Quản Trị Hệ Thống
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#F8FBFD",
                border: "1px solid #E2E8F0",
                padding: "6px 14px",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0B74D1, #16A34A)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                }}
              >
                A
              </div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1E293B" }}>
                Admin WanderGo
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main style={{ padding: "32px", flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
