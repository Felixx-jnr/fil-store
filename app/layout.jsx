import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import AuthInitializer from "./AuthInitializer";

export const metadata = {
  title: "Fil Store",
  description:
    "At FIL, we take pride in offering quality products at unbeatable prices, making us the go-to destination for anyone who values quality.(Think quality, think FIL)",
    icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <Providers>
           <AuthInitializer />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
