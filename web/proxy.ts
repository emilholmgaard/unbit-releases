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
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  // e.g. incoming request is /  ->  /da  (or /products -> /da/products)
  const response = NextResponse.redirect(request.nextUrl);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and every path with a file extension (public assets, robots.txt, sitemap.xml, icons, ...)
    "/((?!_next|api|.*\\..*).*)",
  ],
};
