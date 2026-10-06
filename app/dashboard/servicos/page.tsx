import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Scissors, Clock, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function ServicosPage() {
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

  const services = await prisma.service.findMany({
    where: {
      barbershopId: barbershop.id,
    },
    include: {
      _count: {
        select: {
          appointments: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-[#05070C]">
      <DashboardHeader
        barbershopName={barbershop.name}
        barbershopSlug={barbershop.slug}
        showBackButton
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Serviços</h1>
            <p className="text-sm sm:text-base text-gray-400">
              {services.length} serviço{services.length !== 1 && "s"} disponíve{services.length !== 1 ? "is" : "l"}
            </p>
          </div>
          <Link href="/dashboard/servicos/novo" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              Novo serviço
            </Button>
          </Link>
        </div>

        {services.length === 0 ? (
          <EmptyState
            icon={Scissors}
            title="Nenhum serviço cadastrado"
            description="Adicione os serviços que sua barbearia oferece com preços e duração."
            actionLabel="Cadastrar primeiro serviço"
            actionHref="/dashboard/servicos/novo"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service) => (
              <Card key={service.id} hover clickable>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-[#38BDF8]/10 rounded-xl">
                      <Scissors className="w-6 h-6 text-[#38BDF8]" />
                    </div>
                    {service._count.appointments >= 50 && (
                      <Badge variant="success" size="sm">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-2">{service.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                        <DollarSign className="w-3 h-3" />
                        <span>Preço</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-[#38BDF8]">
                        {formatCurrency(service.price)}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                        <Clock className="w-3 h-3" />
                        <span>Duração</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold">
                        {service.duration}
                        <span className="text-sm text-gray-400 ml-1">min</span>
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">
                      {service._count.appointments} agendamento{service._count.appointments !== 1 && "s"}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
