import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import LawyersPage, { lawyersMetadata } from "@/components/LawyersPage";

// Only /da/advokater exists (Danish and English have separate slugs and hreflang to each other).
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ lang: "da" }];
}

export async function generateMetadata(): Promise<Metadata> {
  if ((await lang()) !== "da") notFound();
  return lawyersMetadata("da");
}

export default async function Page() {
  if ((await lang()) !== "da") notFound();
  return <LawyersPage locale="da" />;
}
