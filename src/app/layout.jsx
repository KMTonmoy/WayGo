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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <div className="mb-20">

            <Navbar />

          </div>
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
