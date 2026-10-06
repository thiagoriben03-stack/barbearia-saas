import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BookingFlow } from "@/components/booking/BookingFlow";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicBookingPage({ params }: PageProps) {
  const { slug } = await params;

  const barbershop = await prisma.barbershop.findUnique({
    where: { slug },
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
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#05070C]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0A0D12]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {barbershop.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{barbershop.name}</h1>
              <p className="text-sm text-gray-400">Agende seu horário</p>
            </div>
          </div>
        </div>
      </header>

      {/* Booking Flow */}
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
  );
}
