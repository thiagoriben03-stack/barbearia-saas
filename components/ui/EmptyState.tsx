import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4">
      {Icon && (
        <div className="mb-4 md:mb-6 p-4 md:p-6 bg-[#38BDF8]/10 rounded-full">
          <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#38BDF8]" />
        </div>
      )}
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 text-center max-w-md">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="md">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
