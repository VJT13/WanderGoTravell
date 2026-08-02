import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WanderGoTravel - Khám phá trọn vẹn vẻ đẹp Miền Trung",
  description:
    "WanderGoTravel chuyên cung cấp tour du lịch Miền Trung Việt Nam: Đà Nẵng, Hội An, Huế, Quảng Bình, Nha Trang, Phú Yên, Quy Nhơn, Đà Lạt, Tây Nguyên. Tour trọn gói, combo tiết kiệm, khách sạn, xe đưa đón.",
  keywords: [
    "du lịch miền trung",
    "tour đà nẵng",
    "tour hội an",
    "tour huế",
    "du lịch quảng bình",
    "tour nha trang",
    "du lịch phú yên",
    "tour quy nhơn",
    "du lịch đà lạt",
    "du lịch tây nguyên",
    "wandergotravel",
  ],
  openGraph: {
    title: "WanderGoTravel - Khám phá trọn vẹn vẻ đẹp Miền Trung",
    description:
      "Tour trọn gói, Combo tiết kiệm, Khách sạn, Xe đưa đón - Chuyên du lịch Miền Trung Việt Nam",
    type: "website",
    locale: "vi_VN",
    siteName: "WanderGoTravel",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
