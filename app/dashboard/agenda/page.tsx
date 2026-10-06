import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Calendar, Clock, User, Scissors, Filter } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function AgendaPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const barbershop = await prisma.barbershop.findFirst({
    where: { ownerId: user.id },
  });

  if (!barbershop) {
    redirect("/onboarding");
  }

  // Agendamentos de hoje em diante
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointments = await prisma.appointment.findMany({
    where: {
      barbershopId: barbershop.id,
      date: {
        gte: today,
      },
    },
    include: {
      customer: true,
      professional: true,
      service: true,
    },
    orderBy: {
      date: "asc",
    },
    take: 50,
  });

  // Agrupar por data
  const groupedAppointments = appointments.reduce((acc: any, appointment: any) => {
    const dateKey = formatDate(appointment.date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(appointment);
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="min-h-screen bg-[#05070C]">
      <DashboardHeader
        barbershopName={barbershop.name}
        barbershopSlug={barbershop.slug}
        showBackButton
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Agenda</h1>
            <p className="text-sm sm:text-base text-gray-400">
              {appointments.length} agendamento{appointments.length !== 1 && "s"} futuros
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="lg" className="flex-1 sm:flex-none">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
            <Link href="/dashboard/agenda/novo" className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Novo agendamento</span>
                <span className="sm:hidden">Novo</span>
              </Button>
            </Link>
          </div>
        </div>

        {appointments.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Nenhum agendamento futuro"
            description="Comece criando o primeiro agendamento para seus clientes."
            actionLabel="Criar primeiro agendamento"
            actionHref="/dashboard/agenda/novo"
          />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedAppointments).map(([date, dateAppointments]) => (
              <div key={date}>
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gray-800"></div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#0F131C] border border-gray-800 rounded-full">
                    <Calendar className="w-4 h-4 text-[#38BDF8]" />
                    <span className="font-semibold text-sm">{date}</span>
                    <Badge variant="info" size="sm">
                      {(dateAppointments as any[]).length}
                    </Badge>
                  </div>
                  <div className="h-px flex-1 bg-gray-800"></div>
                </div>

                {/* Appointments */}
                <div className="grid gap-4">
                  {(dateAppointments as any[]).map((appointment: any) => (
                    <Card key={appointment.id} hover clickable>
                      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                        {/* Time */}
                        <div className="text-center md:pt-1 w-full md:w-auto">
                          <div className="text-3xl font-bold text-[#38BDF8] leading-none mb-1">
                            {formatTime(appointment.date)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {appointment.service.duration}min
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-full bg-gray-800"></div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
                            <div className="min-w-0 w-full sm:w-auto">
                              <h3 className="text-lg sm:text-xl font-semibold mb-1 truncate">
                                {appointment.customer.name}
                              </h3>
                              <p className="text-sm text-gray-400 truncate">
                                {appointment.customer.phone}
                              </p>
                            </div>
                            <StatusBadge status={appointment.status} />
                          </div>

                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Scissors className="w-4 h-4" />
                              <span className="truncate">{appointment.service.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <User className="w-4 h-4" />
                              <span className="truncate">{appointment.professional.name}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-2 w-full md:w-auto">
                          <Button variant="secondary" size="sm" className="flex-1 md:flex-none">
                            Editar
                          </Button>
                          {appointment.status !== "cancelled" && (
                            <Button variant="ghost" size="sm" className="flex-1 md:flex-none">
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: { variant: "warning" as const, label: "Pendente" },
    confirmed: { variant: "success" as const, label: "Confirmado" },
    cancelled: { variant: "danger" as const, label: "Cancelado" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <Badge variant={config.variant} size="md">
      {config.label}
    </Badge>
  );
}
