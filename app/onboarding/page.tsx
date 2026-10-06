import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export default async function OnboardingPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Verifica se já tem barbearia cadastrada
  const existingBarbershop = await prisma.barbershop.findFirst({
    where: { ownerId: user.id },
  });

  if (existingBarbershop) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0F131C] border border-gray-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo!</h1>
        <p className="text-gray-400 mb-8">
          Vamos configurar sua barbearia em apenas alguns passos
        </p>

        <form action="/api/onboarding" method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nome da barbearia
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-[#0A0D12] border border-gray-700 rounded-lg focus:outline-none focus:border-[#38BDF8] text-white"
              placeholder="Ex: Barbearia do João"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Telefone (WhatsApp)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 bg-[#0A0D12] border border-gray-700 rounded-lg focus:outline-none focus:border-[#38BDF8] text-white"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-2">
              Endereço
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-4 py-3 bg-[#0A0D12] border border-gray-700 rounded-lg focus:outline-none focus:border-[#38BDF8] text-white"
              placeholder="Rua, número, bairro, cidade"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-[#38BDF8] hover:bg-[#0EA5E9] text-white font-semibold rounded-full transition-colors"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
