import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const barbershopId = formData.get("barbershopId") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    // Verifica se a barbearia pertence ao usuário
    const barbershop = await prisma.barbershop.findFirst({
      where: {
        id: barbershopId,
        ownerId: user.id,
      },
    });

    if (!barbershop) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Cria profissional
    await prisma.professional.create({
      data: {
        name,
        phone: phone || null,
        barbershopId,
      },
    });

    return NextResponse.redirect(
      new URL("/dashboard/profissionais", request.url)
    );
  } catch (error) {
    console.error("Erro ao criar profissional:", error);
    return NextResponse.json(
      { error: "Erro ao criar profissional" },
      { status: 500 }
    );
  }
}
