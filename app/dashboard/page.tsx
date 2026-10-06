import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Calendar, Users, Scissors, Settings, TrendingUp, Copy } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const barbershop = await prisma.barbershop.findFirst({
    where: { ownerId: user.id },
    include: {
      _count: {
        select: {
          appointments: true,
          customers: true,
          professionals: true,
          services: true,
        },
      },
    },
  });

  if (!barbershop) {
    redirect("/onboarding");
  }

  // Agendamentos de hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayAppointments = await prisma.appointment.count({
    where: {
      barbershopId: barbershop.id,
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  // Próximos agendamentos de hoje
  const upcomingToday = await prisma.appointment.findMany({
    where: {
      barbershopId: barbershop.id,
      date: {
        gte: new Date(),
        lt: tomorrow,
      },
      status: { not: "cancelled" },
    },
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      date: "asc",
    },
    take: 3,
  });

  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${barbershop.slug}`;

  return (
    <div className="min-h-screen bg-[#05070C]">
      <DashboardHeader
        barbershopName={barbershop.name}
        barbershopSlug={barbershop.slug}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
          <StatCard
            label="Agendamentos hoje"
            value={todayAppointments}
            icon={Calendar}
            iconColor="text-[#38BDF8]"
          />
          <StatCard
            label="Total de clientes"
            value={barbershop._count.customers}
            icon={Users}
            iconColor="text-green-500"
          />
          <StatCard
            label="Profissionais ativos"
            value={barbershop._count.professionals}
            icon={Scissors}
            iconColor="text-purple-500"
          />
          <StatCard
            label="Serviços disponíveis"
            value={barbershop._count.services}
            icon={TrendingUp}
            iconColor="text-yellow-500"
          />
        </div>

        {/* Próximos agendamentos */}
        {upcomingToday.length > 0 && (
          <Card className="mb-4 md:mb-6 lg:mb-8">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <h2 className="text-base md:text-lg lg:text-xl font-semibold">Próximos hoje</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1">
                  Agendamentos para as próximas horas
                </p>
              </div>
              <Link href="/dashboard/agenda" className="flex-shrink-0">
                <Button variant="secondary" size="sm">
                  Ver todos
                </Button>
              </Link>
            </div>
            <div className="space-y-2 md:space-y-3 mt-4 md:mt-6">
              {upcomingToday.map((appointment: any) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between gap-3 p-3 md:p-4 bg-[#0A0D12] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                    <div className="text-center flex-shrink-0">
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#38BDF8]">
                        {new Date(appointment.date).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate text-sm md:text-base">{appointment.customer.name}</p>
                      <p className="text-xs md:text-sm text-gray-400 truncate">{appointment.service.name}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block px-2 md:px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full whitespace-nowrap">
                      Confirmado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">Acesso rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            <QuickActionCard
              href="/dashboard/agenda"
              icon={Calendar}
              title="Agenda"
              description="Ver e gerenciar agendamentos"
              iconBg="bg-[#38BDF8]/10"
              iconColor="text-[#38BDF8]"
            />
            <QuickActionCard
              href="/dashboard/clientes"
              icon={Users}
              title="Clientes"
              description="CRM e histórico de atendimentos"
              iconBg="bg-green-500/10"
              iconColor="text-green-500"
            />
            <QuickActionCard
              href="/dashboard/profissionais"
              icon={Scissors}
              title="Profissionais"
              description="Gerenciar barbeiros"
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
            />
            <QuickActionCard
              href="/dashboard/servicos"
              icon={TrendingUp}
              title="Serviços"
              description="Catálogo e preços"
              iconBg="bg-yellow-500/10"
              iconColor="text-yellow-500"
            />
            <QuickActionCard
              href="/dashboard/configuracoes"
              icon={Settings}
              title="Configurações"
              description="Dados da barbearia"
              iconBg="bg-gray-500/10"
              iconColor="text-gray-400"
            />
          </div>
        </div>

        {/* Link de agendamento público */}
        <Card>
          <div className="mb-3 md:mb-4">
            <h2 className="text-sm md:text-base lg:text-lg font-semibold mb-1">Link de agendamento público</h2>
            <p className="text-xs md:text-sm text-gray-400">
              Compartilhe com seus clientes para agendamento online
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-2 md:gap-3 mt-3 md:mt-4">
            <div className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-[#0A0D12] border border-gray-700 rounded-lg overflow-hidden">
              <code className="text-xs md:text-sm text-[#38BDF8] break-all">{publicUrl}</code>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="flex-shrink-0"
              onClick={() => {
                navigator.clipboard.writeText(publicUrl);
              }}
            >
              <Copy className="w-4 h-4" />
              Copiar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
