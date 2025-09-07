import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "LMS Signup & KYC",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
