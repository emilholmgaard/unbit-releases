import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import LawyersPage, { lawyersMetadata } from "@/components/LawyersPage";

// Only /en/lawyers exists (Danish and English have separate slugs and hreflang to each other).
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  if ((await lang()) !== "en") notFound();
  return lawyersMetadata("en");
}

export default async function Page() {
  if ((await lang()) !== "en") notFound();
  return <LawyersPage locale="en" />;
}
