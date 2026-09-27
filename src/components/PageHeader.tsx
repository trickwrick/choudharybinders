import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "./Container";

export default function PageHeader({ 
  title, 
  tag, 
  breadcrumbTitle 
}: { 
  title: string;
  tag?: string; 
  breadcrumbTitle?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border/60 bg-white">
      <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900" />

      <Container className="relative py-10 sm:py-12 lg:py-14">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/70 sm:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-white">{breadcrumbTitle || title}</li>
          </ol>
        </nav>

        <div className="max-w-2xl">
          {tag && (
            <div className="mb-3">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-xs">
                {tag}
              </span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.65rem]">
            {title}
          </h1>
        </div>
      </Container>
    </div>
  );
}
