import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BookingFlow } from "@/components/booking/BookingFlow";

export default async function NovoAgendamentoPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const barbershop = await prisma.barbershop.findFirst({
    where: { ownerId: user.id },
    include: {
      services: {
        where: { active: true },
        orderBy: { name: "asc" },
      },
      professionals: {
        orderBy: { name: "asc" },
      },
    },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Novo Agendamento</h1>
          <p className="text-sm sm:text-base text-gray-400">Crie um agendamento para um cliente</p>
        </div>

        <BookingFlow
          barbershop={{
            id: barbershop.id,
            name: barbershop.name,
            slug: barbershop.slug,
          }}
          services={barbershop.services}
          professionals={barbershop.professionals}
        />
      </div>
    </div>
  );
}
