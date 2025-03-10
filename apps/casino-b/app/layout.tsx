import "@/app/globals.css";
import { MarketProvider } from "@repo/ui";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MarketProvider>{children}</MarketProvider>
        </Providers>
      </body>
    </html>
  );
}
