import { UserProvider } from "@/context/store";
import "./globals.css";
import { Montserrat, Manrope } from "next/font/google";

export const metadata = {
  title: "Sendy",
  description: "Cesar Leyton",
};

const mainFont = Manrope({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
