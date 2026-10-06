import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Save, X, Scissors, DollarSign, Clock } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default async function NovoServicoPage() {
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

  return (
    <div className="min-h-screen bg-[#05070C]">
      <DashboardHeader
        barbershopName={barbershop.name}
        barbershopSlug={barbershop.slug}
        showBackButton
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Novo Serviço</h1>
          <p className="text-sm sm:text-base text-gray-400">Adicione um novo serviço ao seu catálogo</p>
        </div>

        <Card>
          <form action="/api/services" method="POST" className="space-y-6">
            <input type="hidden" name="barbershopId" value={barbershop.id} />

            <Input
              label="Nome do serviço"
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ex: Corte tradicional, Barba, Corte + Barba"
              helperText="Será exibido para os clientes no agendamento"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Preço (R$)"
                id="price"
                name="price"
                type="number"
                required
                step="0.01"
                min="0"
                placeholder="30.00"
                helperText="Valor cobrado pelo serviço"
              />

              <Input
                label="Duração (minutos)"
                id="duration"
                name="duration"
                type="number"
                required
                min="5"
                step="5"
                placeholder="30"
                helperText="Tempo médio de execução"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Link href="/dashboard/servicos" className="flex-1 order-2 sm:order-1">
                <Button type="button" variant="secondary" size="lg" className="w-full">
                  <X className="w-5 h-5" />
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="primary" size="lg" className="flex-1 order-1 sm:order-2">
                <Save className="w-5 h-5" />
                Salvar serviço
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Card className="bg-[#38BDF8]/5 border-[#38BDF8]/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#38BDF8]/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-sm">Preço justo</h3>
                <p className="text-xs text-gray-400">
                  Defina valores competitivos baseados no mercado local
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-green-500/5 border-green-500/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-sm text-green-500">Duração realista</h3>
                <p className="text-xs text-gray-400">
                  Considere tempo de execução e limpeza entre clientes
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
