import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!name) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    // Gera slug único
    let slug = generateSlug(name);
    let slugExists = await prisma.barbershop.findUnique({
      where: { slug },
    });

    // Se slug já existe, adiciona número
    let counter = 1;
    while (slugExists) {
      slug = `${generateSlug(name)}-${counter}`;
      slugExists = await prisma.barbershop.findUnique({
        where: { slug },
      });
      counter++;
    }

    // Cria barbearia
    const barbershop = await prisma.barbershop.create({
      data: {
        name,
        slug,
        ownerId: user.id,
        phone: phone || null,
        address: address || null,
      },
    });

    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  } catch (error) {
    console.error("Erro ao criar barbearia:", error);
    return NextResponse.json(
      { error: "Erro ao criar barbearia" },
      { status: 500 }
    );
  }
}
