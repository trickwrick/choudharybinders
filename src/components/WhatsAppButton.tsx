import { MessageCircle } from "lucide-react";
import { buildWhatsAppHref } from "@/lib/site-business";

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "solid";
};

const sizeClasses = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-sm sm:text-base",
};

export default function WhatsAppButton({
  message,
  label = "WhatsApp",
  className = "",
  fullWidth = false,
  size = "md",
  variant = "outline",
}: WhatsAppButtonProps) {
  const base =
    variant === "solid"
      ? "bg-[#25D366] text-white shadow-md shadow-[#25D366]/30 hover:bg-[#20bd5a]"
      : "border border-[#25D366] bg-white text-[#128C7E] hover:bg-[#25D366]/5";

  return (
    <a
      href={buildWhatsAppHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors ${sizeClasses[size]} ${base} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <MessageCircle className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </a>
  );
}
