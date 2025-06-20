// layout.js
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata = {
  title: "Gala Holder",
  description: "Gala Holder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` text-[#202124] ${roboto.className}  antialiased "`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
