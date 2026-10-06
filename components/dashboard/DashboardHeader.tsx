"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  barbershopName: string;
  barbershopSlug: string;
  showBackButton?: boolean;
}

export function DashboardHeader({
  barbershopName,
  barbershopSlug,
  showBackButton = false
}: DashboardHeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/dashboard") return barbershopName;
    if (pathname.includes("/agenda")) return "Agenda";
    if (pathname.includes("/clientes")) return "Clientes";
    if (pathname.includes("/profissionais")) return "Profissionais";
    if (pathname.includes("/servicos")) return "Serviços";
    if (pathname.includes("/configuracoes")) return "Configurações";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-[#0A0D12]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {showBackButton && (
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold truncate">{getPageTitle()}</h1>
            {pathname === "/dashboard" && (
              <p className="text-xs md:text-sm text-gray-400 truncate">
                {barbershopSlug}.seudominio.com
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <Link href="/dashboard/configuracoes">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
