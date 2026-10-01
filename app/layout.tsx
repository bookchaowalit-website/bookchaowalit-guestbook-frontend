import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = { title: "Guestbook | Bookchaowalit", description: "A local visitor register for notes, hellos, and passing thoughts.", metadataBase: new URL(SITE_URL), robots: { index: true, follow: true } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    {/* THESIS: A guestbook should feel like a place worth signing, not a generic form.
OWN-WORLD: A hotel visitor register / archive folio: warm stock, ruled ink, red seal, numbered pages.
STORY: Arrive at the left page, press the seal, then read the people who passed through.
FIRST VIEWPORT: The register title, a writable folio, and the latest entries share one spread.
FORM: The form is the signing page; fields are lines, the submit action is the seal; direction seed 0b47da04.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
    <Analytics /><SpeedInsights />{children}
  </body></html>;
}
