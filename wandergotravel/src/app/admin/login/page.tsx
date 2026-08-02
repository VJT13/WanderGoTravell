"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("wandergo_admin_token", data.token);
        localStorage.setItem("wandergo_admin_user", JSON.stringify(data.user));
        router.push("/admin");
      } else {
        setError(data.error || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0A1628 0%, #0B74D1 50%, #16A34A 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "28px",
          padding: "40px 32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        {/* Brand Logo */}
        <div style={{ marginBottom: "24px" }}>
          <img
            src="/logo.png"
            alt="WanderGoTravel Logo"
            style={{
              height: "56px",
              width: "auto",
              margin: "0 auto 12px",
              objectFit: "contain",
            }}
          />
          <h1
            style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "4px",
            }}
          >
            Trang Quản Trị Admin
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#64748B" }}>
            WanderGoTravel System Management
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#FEE2E2",
              border: "1px solid #FCA5A5",
              color: "#DC2626",
              padding: "10px 14px",
              borderRadius: "12px",
              fontSize: "0.85rem",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Tài khoản Admin
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={18}
                color="#94A3B8"
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập tên tài khoản / email"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  borderRadius: "14px",
                  border: "1px solid #CBD5E1",
                  fontSize: "0.92rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Mật khẩu
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                color="#94A3B8"
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  borderRadius: "14px",
                  border: "1px solid #CBD5E1",
                  fontSize: "0.92rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #0B74D1 0%, #16A34A 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 8px 25px rgba(11, 116, 209, 0.35)",
            }}
          >
            <span>{isLoading ? "Đang xác thực..." : "Đăng Nhập Admin"}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid #F1F5F9",
            fontSize: "0.8rem",
            color: "#64748B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <ShieldCheck size={16} color="#16A34A" />
          <span>Tài khoản thử nghiệm: <strong>admin</strong> / Pass: <strong>1234</strong></span>
        </div>
      </motion.div>
    </div>
  );
}
