"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  User,
  Send,
} from "lucide-react";
import { useState } from "react";

export interface TourData {
  id: number;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string | null;
  badgeColor?: string | null;
  highlights?: string[];
  itinerary?: { day: string; title: string; content: string }[];
  includes?: string[];
}

interface TourDetailModalProps {
  tour: TourData | null;
  onClose: () => void;
  onBookNow: (tour: TourData) => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function TourDetailModal({
  tour,
  onClose,
  onBookNow,
}: TourDetailModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "itinerary" | "policy" | "reviews"
  >("overview");

  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [userName, setUserName] = useState("");
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "Nguyễn Văn Hùng",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      rating: 5,
      date: "15/07/2024",
      comment:
        "Tour thiết kế rất hợp lý, không bị gấp vội. Hướng dẫn viên vui tính, tư vấn chỗ ăn uống địa phương cực kỳ ngon và rẻ!",
    },
    {
      id: 2,
      name: "Trần Thu Trang",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
      rating: 5,
      date: "02/07/2024",
      comment:
        "Khách sạn sạch đẹp ngay trung tâm, xe đưa đón mới tinh và êm ái. Gia đình mình đi cùng bé nhỏ rất thoải mái.",
    },
    {
      id: 3,
      name: "Lê Minh Tuấn",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      rating: 4,
      date: "20/06/2024",
      comment:
        "Dịch vụ tốt, đồ ăn ngon hợp khẩu vị. Lần sau đến Miền Trung sẽ tiếp tục đặt tour bên WanderGoTravel.",
    },
  ]);

  if (!tour) return null;

  let sampleHighlights: string[] = [
    "Khám phá cảnh quan thiên nhiên tráng lệ Miền Trung Việt Nam",
    "Thưởng thức ẩm thực đặc sản địa phương đậm đà hương vị",
    "Khách sạn tiêu chuẩn 3-4 sao trung tâm, đầy đủ tiện nghi",
    "Hướng dẫn viên chuyên nghiệp, tận tâm suốt hành trình",
    "Xe ô tô du lịch đời mới đưa đón an toàn, thoải mái",
  ];

  if (Array.isArray(tour.highlights)) {
    sampleHighlights = tour.highlights;
  } else if (typeof tour.highlights === "string") {
    try {
      const parsed = JSON.parse(tour.highlights);
      if (Array.isArray(parsed) && parsed.length > 0) {
        sampleHighlights = parsed;
      }
    } catch (e) {
      // fallback to sampleHighlights
    }
  }

  let sampleItinerary = [
    {
      day: "Ngày 1",
      title: "Đón khách - Khám phá điểm đến đầu tiên",
      content:
        "Xe và HDV đón quý khách tại điểm hẹn/sân bay. Di chuyển về khách sạn nhận phòng nghỉ ngơi. Chiều tham quan các danh thắng nổi tiếng, chụp hình check-in. Tối thưởng thức đặc sản địa phương.",
    },
    {
      day: "Ngày 2",
      title: "Trải nghiệm văn hóa & Danh thắng nổi tiếng",
      content:
        "Dùng điểm tâm sáng tại khách sạn. Khởi hành tham quan các địa danh du lịch hàng đầu. Trải nghiệm các hoạt động vui chơi giải trí ngoài trời. Ăn trưa tại nhà hàng địa phương.",
    },
    {
      day: "Ngày 3",
      title: "Vui chơi mua sắm - Tiễn khách",
      content:
        "Quý khách tự do tắm biển/dạo phố mua sắm quà lưu niệm đặc sản Miền Trung. Làm thủ tục trả phòng khách sạn. Xe đưa quý khách ra sân bay/bến xe, kết thúc chương trình tour.",
    },
  ];

  if (Array.isArray(tour.itinerary)) {
    sampleItinerary = tour.itinerary;
  } else if (typeof tour.itinerary === "string") {
    try {
      const parsed = JSON.parse(tour.itinerary);
      if (Array.isArray(parsed) && parsed.length > 0) {
        sampleItinerary = parsed;
      }
    } catch (e) {
      // fallback
    }
  }

  const includesList = [
    "Xe du lịch chất lượng cao đưa đón suốt tuyến",
    "Khách sạn tiêu chuẩn 3-4 sao (2-3 khách/phòng)",
    "Các bữa ăn theo chương trình (Ăn sáng + Ăn chính)",
    "Vé tham quan tất cả các điểm theo lịch trình",
    "Hướng dẫn viên tiếng Việt nhiệt tình, giàu kinh nghiệm",
    "Bảo hiểm du lịch mức bồi thường tối đa 50.000.000đ",
    "Nước uống đóng chai 1 chai/người/ngày",
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userComment) return;
    const newRev = {
      id: Date.now(),
      name: userName,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      rating: userRating,
      date: "Hôm nay",
      comment: userComment,
    };
    setReviewsList([newRev, ...reviewsList]);
    setUserName("");
    setUserComment("");
  };

  return (
    <AnimatePresence>
      <div
        key={`tour-detail-modal-${tour.id}`}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(8px)",
          }}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "860px",
            maxHeight: "90vh",
            background: "white",
            borderRadius: "28px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              color: "white",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <X size={20} />
          </button>

          {/* Header Banner Image */}
          <div
            style={{
              position: "relative",
              height: "220px",
              width: "100%",
              flexShrink: 0,
            }}
          >
            <img
              src={tour.image}
              alt={tour.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(15,23,42,0.85) 100%)",
              }}
            />

            {/* Banner Info */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 24,
                right: 24,
                color: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                {tour.badge && (
                  <span
                    style={{
                      background: tour.badgeColor || "#0B74D1",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {tour.badge}
                  </span>
                )}
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(6px)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Clock size={13} /> {tour.duration}
                </span>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(6px)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MapPin size={13} /> {tour.destination}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.3,
                }}
              >
                {tour.title}
              </h2>
            </div>
          </div>

          {/* Navigation Tabs (4 Tabs) */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #E2E8F0",
              background: "#F8FBFD",
              padding: "0 16px",
              overflowX: "auto",
            }}
          >
            {[
              { id: "overview", label: "Nổi bật & Tổng quan" },
              { id: "itinerary", label: "Lịch trình chi tiết" },
              { id: "policy", label: "Dịch vụ bao gồm" },
              { id: "reviews", label: `Đánh giá của khách hàng (${reviewsList.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "14px 18px",
                  fontSize: "0.9rem",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? "#0B74D1" : "#64748B",
                  border: "none",
                  background: "transparent",
                  borderBottom:
                    activeTab === tab.id ? "3px solid #0B74D1" : "3px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body Content (Scrollable) */}
          <div
            style={{
              padding: "24px",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stats Summary Bar */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                    background: "#F1F5F9",
                    padding: "16px",
                    borderRadius: "16px",
                    marginBottom: "24px",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Thời gian</div>
                    <div style={{ fontWeight: 700, color: "#0F172A", marginTop: "2px" }}>
                      {tour.duration}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Đánh giá</div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#0F172A",
                        marginTop: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                    >
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      {tour.rating} / 5
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Khởi hành</div>
                    <div style={{ fontWeight: 700, color: "#0B74D1", marginTop: "2px" }}>
                      Hàng ngày
                    </div>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "14px",
                    color: "#0F172A",
                  }}
                >
                  Điểm Nổi Bật Của Tour
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {sampleHighlights.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "0.92rem",
                        color: "#334155",
                        lineHeight: 1.5,
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        color="#16A34A"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "itinerary" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", flexDirection: "column", gap: "18px" }}
              >
                {sampleItinerary.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      borderLeft: "3px solid #0B74D1",
                      paddingLeft: "16px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#0B74D1",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "4px",
                      }}
                    >
                      {item.day}
                    </div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#0F172A",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "#475569",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.content}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "policy" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "14px",
                    color: "#0F172A",
                  }}
                >
                  Giá Tour Bao Gồm
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {includesList.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "0.9rem",
                        color: "#334155",
                      }}
                    >
                      <ShieldCheck size={18} color="#0B74D1" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 4: Đánh giá của khách hàng */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Rating Summary Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    background: "#F8FBFD",
                    border: "1px solid #E2E8F0",
                    padding: "20px",
                    borderRadius: "20px",
                    marginBottom: "24px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#0B74D1", lineHeight: 1 }}>
                      {tour.rating}
                    </div>
                    <div style={{ display: "flex", gap: "2px", margin: "6px 0 2px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                      {reviewsList.length} nhận xét
                    </div>
                  </div>

                  <div style={{ flex: 1, borderLeft: "1px solid #E2E8F0", paddingLeft: "20px" }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                      Đánh Giá Từ Du Khách Thực Tế
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748B" }}>
                      100% đánh giá từ khách hàng đã trải nghiệm chuyến đi cùng WanderGoTravel
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        background: "white",
                        border: "1px solid #F1F5F9",
                        borderRadius: "16px",
                        padding: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0F172A" }}>
                              {rev.name}
                            </div>
                            <div style={{ display: "flex", gap: "2px" }}>
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{rev.date}</span>
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6 }}>
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <form
                  onSubmit={handleAddReview}
                  style={{
                    background: "#F8FBFD",
                    border: "1px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                    Viết Đánh Giá Của Bạn
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", marginBottom: "12px" }}>
                    <input
                      type="text"
                      placeholder="Họ và tên của bạn *"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="input"
                      style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                    />

                    {/* Rating selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "white", padding: "0 12px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          fill={star <= userRating ? "#F59E0B" : "none"}
                          color="#F59E0B"
                          style={{ cursor: "pointer" }}
                          onClick={() => setUserRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Chia sẻ trải nghiệm của bạn về tour này..."
                    required
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="input"
                    style={{ padding: "10px 14px", fontSize: "0.88rem", resize: "none", marginBottom: "12px" }}
                  />

                  <button
                    type="submit"
                    className="btn-gradient"
                    style={{
                      padding: "8px 24px",
                      fontSize: "0.88rem",
                      borderRadius: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Send size={14} /> Gửi Đánh Giá
                  </button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div
            style={{
              padding: "18px 24px",
              borderTop: "1px solid #E2E8F0",
              background: "#F8FBFD",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Giá trọn gói từ</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#0B74D1",
                  }}
                >
                  {formatPrice(tour.price)}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#94A3B8",
                    textDecoration: "line-through",
                  }}
                >
                  {formatPrice(tour.originalPrice)}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={onClose}
                className="btn-outline"
                style={{
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  borderRadius: "12px",
                }}
              >
                Đóng
              </button>
              <button
                onClick={() => onBookNow(tour)}
                className="btn-gradient"
                style={{
                  padding: "10px 28px",
                  fontSize: "0.95rem",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 15px rgba(11, 116, 209, 0.3)",
                }}
              >
                <span>Đặt Ngay</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
