import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Save, X, UserPlus, Briefcase } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default async function NovoProfissionalPage() {
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Novo Profissional</h1>
          <p className="text-sm sm:text-base text-gray-400">Adicione um barbeiro à sua equipe</p>
        </div>

        <Card>
          <form action="/api/professionals" method="POST" className="space-y-6">
            <input type="hidden" name="barbershopId" value={barbershop.id} />

            <Input
              label="Nome completo"
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ex: João Silva"
              helperText="Nome que aparecerá nos agendamentos"
            />

            <Input
              label="Telefone"
              id="phone"
              name="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              helperText="Opcional - para contato interno"
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Link href="/dashboard/profissionais" className="flex-1 order-2 sm:order-1">
                <Button type="button" variant="secondary" size="lg" className="w-full">
                  <X className="w-5 h-5" />
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="primary" size="lg" className="flex-1 order-1 sm:order-2">
                <Save className="w-5 h-5" />
                Salvar profissional
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-purple-500/5 border-purple-500/20">
          <div className="flex gap-3">
            <div className="flex-shrink-0 p-2 bg-purple-500/10 rounded-lg h-fit">
              <Briefcase className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-purple-500">Gestão de equipe</h3>
              <p className="text-sm text-gray-400">
                Profissionais cadastrados podem ser vinculados a agendamentos e você poderá acompanhar a performance individual de cada um.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
