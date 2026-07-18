import type { Metadata } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Choudhary Binders & Printers | Premium Printing Solutions in India",
  description:
    "Professional offset printing, digital printing, signage, packaging, branding, and custom printing solutions for businesses across India. Trusted since 1980.",
  keywords: [
    "printing company India",
    "offset printing",
    "digital printing",
    "packaging solutions",
    "corporate branding",
    "custom printing",
    "Choudhary Binders",
  ],
  openGraph: {
    title: "Choudhary Binders & Printers | Premium Printing Solutions",
    description:
      "High-quality printing and branding solutions for businesses across India since 1980.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${spaceMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background font-sans text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Choudhary Binders & Printers",
              description:
                "Professional printing, flex, LED sign boards, outdoor branding and advertising services in Jaipur since 1980.",
              url: "https://choudharybinders.com",
              telephone: "+91-7821013457",
              email: "choudharybinders@gmail.com",
              foundingDate: "1980",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "B-25, Basement, Unnati Tower, Central Spine, Vidhyadhar Nagar",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                postalCode: "302039",
                addressCountry: "IN",
              },
              areaServed: ["Jaipur", "Rajasthan", "India"],
              priceRange: "$$",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
