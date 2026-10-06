import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  iconColor = "text-[#38BDF8]"
}: StatCardProps) {
  const bgColor = iconColor.replace('text-', 'bg-') + '/10';

  return (
    <Card hover>
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <span className="text-xs md:text-sm text-gray-400 font-medium">{label}</span>
        <div className={cn("p-2 md:p-2.5 rounded-lg", bgColor)}>
          <Icon className={cn("w-4 h-4 md:w-5 md:h-5", iconColor)} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-2xl md:text-3xl font-bold truncate">{value}</p>
        {trend && (
          <span className={cn(
            "text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0",
            trend.isPositive ? "text-green-400" : "text-red-400"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </Card>
  );
}
