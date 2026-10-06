import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Save, X } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default async function NovoClientePage() {
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Novo Cliente</h1>
          <p className="text-sm sm:text-base text-gray-400">Adicione um novo cliente à sua base</p>
        </div>

        <Card>
          <form action="/api/customers" method="POST" className="space-y-6">
            <input type="hidden" name="barbershopId" value={barbershop.id} />

            <Input
              label="Nome completo"
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ex: Carlos Santos"
              helperText="Nome que aparecerá nos agendamentos"
            />

            <Input
              label="Telefone (WhatsApp)"
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="(00) 00000-0000"
              helperText="Usado para confirmar agendamentos"
            />

            <Input
              label="E-mail"
              id="email"
              name="email"
              type="email"
              placeholder="cliente@email.com"
              helperText="Opcional - para envio de notificações"
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Link href="/dashboard/clientes" className="flex-1 order-2 sm:order-1">
                <Button type="button" variant="secondary" size="lg" className="w-full">
                  <X className="w-5 h-5" />
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="primary" size="lg" className="flex-1 order-1 sm:order-2">
                <Save className="w-5 h-5" />
                Salvar cliente
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-[#38BDF8]/5 border-[#38BDF8]/20">
          <div className="flex gap-3">
            <div className="flex-shrink-0 p-2 bg-[#38BDF8]/10 rounded-lg h-fit">
              <div className="w-5 h-5 rounded-full bg-[#38BDF8] flex items-center justify-center text-white text-xs font-bold">
                i
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-[#38BDF8]">Dica</h3>
              <p className="text-sm text-gray-400">
                Clientes cadastrados podem ser rapidamente selecionados ao criar novos agendamentos, economizando tempo no atendimento.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
