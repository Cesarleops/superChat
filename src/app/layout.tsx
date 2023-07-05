import { UserProvider } from "@/context/store";
import "./globals.css";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "Sendy",
  description: "Cesar Leyton",
};

const mainFont = Montserrat({ subsets: ["latin"] });
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
