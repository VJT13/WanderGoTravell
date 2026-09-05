import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WanderGoTravel - Khám phá trọn vẹn vẻ đẹp Việt Nam",
  description:
    "WanderGoTravel chuyên cung cấp tour du lịch trọn gói khắp Việt Nam: Đà Nẵng, Hội An, Huế, Sapa, Hà Giang, Mộc Châu, Nha Trang, Đà Lạt, Tây Nguyên... Combo tiết kiệm, khách sạn, xe đưa đón chuyên nghiệp.",
  keywords: [
    "du lịch việt nam",
    "du lịch miền trung",
    "du lịch tây bắc",
    "du lịch tây nguyên",
    "tour đà nẵng",
    "tour sapa",
    "tour hội an",
    "tour huế",
    "tour nha trang",
    "wandergotravel",
  ],
  openGraph: {
    title: "WanderGoTravel - Khám phá trọn vẹn vẻ đẹp Việt Nam",
    description:
      "Tour trọn gói, Combo tiết kiệm, Khách sạn, Xe đưa đón - Chuyên du lịch khắp Việt Nam",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  // Intercept extension errors
                  window.addEventListener('error', function(e) {
                    if (e.filename && (e.filename.indexOf('chrome-extension://') !== -1 || e.filename.indexOf('moz-extension://') !== -1)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                      return true;
                    }
                  }, true);
                  window.addEventListener('unhandledrejection', function(e) {
                    var stack = (e && e.reason && e.reason.stack) || '';
                    if (stack.indexOf('chrome-extension://') !== -1 || stack.indexOf('moz-extension://') !== -1) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                      return true;
                    }
                  }, true);

                  // Intercept Bitdefender console.error hydration overlay in Next.js dev
                  var origError = console.error;
                  console.error = function() {
                    for (var i = 0; i < arguments.length; i++) {
                      var str = '';
                      try {
                        str = typeof arguments[i] === 'string' ? arguments[i] : JSON.stringify(arguments[i]);
                      } catch(err) {
                        str = String(arguments[i]);
                      }
                      if (str && (str.indexOf('bis_skin_checked') !== -1 || str.indexOf('bis_register') !== -1)) {
                        return;
                      }
                    }
                    return origError.apply(console, arguments);
                  };

                  var origWarn = console.warn;
                  console.warn = function() {
                    for (var i = 0; i < arguments.length; i++) {
                      var str = '';
                      try {
                        str = typeof arguments[i] === 'string' ? arguments[i] : JSON.stringify(arguments[i]);
                      } catch(err) {
                        str = String(arguments[i]);
                      }
                      if (str && (str.indexOf('bis_skin_checked') !== -1 || str.indexOf('bis_register') !== -1)) {
                        return;
                      }
                    }
                    return origWarn.apply(console, arguments);
                  };
                }

                // Prevent Bitdefender from adding bis_skin_checked to elements
                if (typeof Element !== 'undefined') {
                  var origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, value) {
                    if (name === 'bis_skin_checked' || name === 'bis_register') return;
                    return origSetAttr.apply(this, arguments);
                  };
                }

                // MutationObserver to clean up any bis_skin_checked injected by extension
                if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && (m.attributeName === 'bis_skin_checked' || m.attributeName === 'bis_register')) {
                        m.target.removeAttribute(m.attributeName);
                      }
                    }
                  });
                  observer.observe(document.documentElement, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['bis_skin_checked', 'bis_register'],
                  });
                }
              })();
            `,
          }}
        />
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
