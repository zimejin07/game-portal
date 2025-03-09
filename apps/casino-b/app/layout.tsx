import Providers from "./providers";
import MarketLayout from "@repo/ui/components/MarketLayout";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MarketLayout>{children}</MarketLayout>
        </Providers>
      </body>
    </html>
  );
}
