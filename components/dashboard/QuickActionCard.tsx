import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface QuickActionCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg?: string;
  iconColor?: string;
}

export function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
  iconBg = "bg-[#38BDF8]/10",
  iconColor = "text-[#38BDF8]"
}: QuickActionCardProps) {
  return (
    <Link href={href} className="group block">
      <Card hover clickable>
        <div className={`mb-3 md:mb-4 p-2.5 md:p-3 ${iconBg} rounded-xl w-fit group-hover:scale-110 transition-transform duration-200`}>
          <Icon className={`w-6 h-6 md:w-7 md:h-7 ${iconColor}`} />
        </div>
        <h3 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2 group-hover:text-[#38BDF8] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </Card>
    </Link>
  );
}
