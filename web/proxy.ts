import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

// Accept-Language tags that should map to a locale we ship (Norwegian Nynorsk/generic "no" -> Bokmål).
const ALIASES: Record<string, string> = { no: "nb", nn: "nb" };

function getLocale(request: NextRequest): string {
  try {
    const headers = { "accept-language": request.headers.get("accept-language") ?? "" };
    const requested = new Negotiator({ headers })
      .languages()
      .filter((tag) => tag !== "*")
      .map((tag) => {
        const [primary, ...rest] = tag.split("-");
        const alias = ALIASES[primary.toLowerCase()];
        return alias ? [alias, ...rest].join("-") : tag;
      });
    return match(requested, [...locales], defaultLocale);
  } catch {
    // Malformed Accept-Language header.
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  // Paths that already carry a supported locale are served as-is.
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return;

  // No locale in the path: serve the best-matching locale's page under the SAME URL (internal rewrite, status 200)
  // instead of redirecting. `/` therefore answers 200 for users and crawlers alike (no 307 hop); crawlers send no
  // Accept-Language and get English. The served page's <link rel="canonical"> points at its own /<locale> URL, and
  // `Vary: Accept-Language` tells caches that the response depends on that header.
  // e.g. incoming request is /  ->  renders /da  (or /products -> /da/products, which 404s if it does not exist)
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and every path with a file extension (public assets, robots.txt, sitemap.xml, icons, ...)
    "/((?!_next|api|.*\\..*).*)",
  ],
};
