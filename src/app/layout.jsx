import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";
import AuthProvider from "../Provider/AuthProvider";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "My App Title",
  description: "WayGO Travel Ticket Management System",
};

<<<<<<< HEAD:src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
=======
export default function RootLayout({ children }) {
>>>>>>> 606c7dcff45fd74a41d6fd0242f87159b36f3a4e:src/app/layout.jsx
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
<<<<<<< HEAD:src/app/layout.tsx
          <Navbar />
=======
          <div className="mb-20">

            <Navbar />
          </div>
>>>>>>> 606c7dcff45fd74a41d6fd0242f87159b36f3a4e:src/app/layout.jsx
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
