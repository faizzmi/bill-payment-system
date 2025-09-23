import "./globals.css";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Bill Payment System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
