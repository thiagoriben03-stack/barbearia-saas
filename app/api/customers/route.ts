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
    const email = formData.get("email") as string;

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

    // Cria cliente
    await prisma.customer.create({
      data: {
        name,
        phone,
        email: email || null,
        barbershopId,
      },
    });

    return NextResponse.redirect(
      new URL("/dashboard/clientes", request.url)
    );
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json(
      { error: "Erro ao criar cliente" },
      { status: 500 }
    );
  }
}
