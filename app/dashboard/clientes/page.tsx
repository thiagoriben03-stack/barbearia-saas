import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Users, Mail, Phone, Search } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function ClientesPage() {
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

  const customers = await prisma.customer.findMany({
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
      createdAt: "desc",
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Clientes</h1>
            <p className="text-sm sm:text-base text-gray-400">
              Gerencie sua base de {customers.length} cliente{customers.length !== 1 && "s"}
            </p>
          </div>
          <Link href="/dashboard/clientes/novo" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              Novo cliente
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        {customers.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente por nome, telefone ou email..."
                className="w-full pl-12 pr-4 py-3 bg-[#0F131C] border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 focus:border-[#38BDF8]"
              />
            </div>
          </div>
        )}

        {customers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Nenhum cliente cadastrado"
            description="Comece adicionando seu primeiro cliente para gerenciar agendamentos e histórico."
            actionLabel="Cadastrar primeiro cliente"
            actionHref="/dashboard/clientes/novo"
          />
        ) : (
          <div className="grid gap-4">
            {customers.map((customer: any) => (
              <Link key={customer.id} href={`/dashboard/clientes/${customer.id}`}>
                <Card hover clickable>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] rounded-full flex-shrink-0">
                        <span className="text-lg sm:text-xl font-bold text-white">
                          {customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold mb-1 truncate">
                          {customer.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{customer.phone}</span>
                          </div>
                          {customer.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="truncate">{customer.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between sm:block sm:text-right ml-0 sm:ml-4">
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-[#38BDF8] mb-1">
                          {customer._count.appointments}
                        </div>
                        <p className="text-xs text-gray-400">agendamentos</p>
                      </div>
                      {customer._count.appointments >= 10 && (
                        <Badge variant="success" size="sm" className="sm:mt-2">
                          VIP
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
