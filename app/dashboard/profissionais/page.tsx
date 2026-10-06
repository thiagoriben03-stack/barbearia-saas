import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Users, Phone, TrendingUp, Star } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function ProfissionaisPage() {
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

  const professionals = await prisma.professional.findMany({
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Profissionais</h1>
            <p className="text-sm sm:text-base text-gray-400">
              {professionals.length} profissiona{professionals.length !== 1 ? "is" : "l"} cadastrado{professionals.length !== 1 && "s"}
            </p>
          </div>
          <Link href="/dashboard/profissionais/novo" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              Novo profissional
            </Button>
          </Link>
        </div>

        {professionals.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Nenhum profissional cadastrado"
            description="Adicione os barbeiros e profissionais que trabalham na sua barbearia."
            actionLabel="Cadastrar primeiro profissional"
            actionHref="/dashboard/profissionais/novo"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {professionals.map((professional: any) => (
              <Card key={professional.id} hover clickable>
                <CardHeader>
                  {/* Avatar */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative mb-3">
                      <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] rounded-full">
                        <span className="text-2xl sm:text-3xl font-bold text-white">
                          {professional.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {professional._count.appointments >= 100 && (
                        <div className="absolute -top-1 -right-1 p-1.5 bg-yellow-500 rounded-full">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-center mb-1">
                      {professional.name}
                    </h3>
                    {professional._count.appointments >= 100 && (
                      <Badge variant="warning" size="sm">
                        Top Performer
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  {professional.phone && (
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-4">
                      <Phone className="w-4 h-4" />
                      <span>{professional.phone}</span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="bg-[#0A0D12] rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-sm text-gray-400">Agendamentos</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-[#38BDF8]">
                      {professional._count.appointments}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    Ver agenda
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
