import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      barbershopId,
      serviceId,
      professionalId,
      date,
      customerName,
      customerPhone,
      customerEmail,
    } = body;

    // Validação
    if (!barbershopId || !serviceId || !professionalId || !date || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Verificar se a barbearia existe
    const barbershop = await prisma.barbershop.findUnique({
      where: { id: barbershopId },
    });

    if (!barbershop) {
      return NextResponse.json(
        { error: "Barbearia não encontrada" },
        { status: 404 }
      );
    }

    // Buscar ou criar cliente
    let customer = await prisma.customer.findFirst({
      where: {
        barbershopId,
        phone: customerPhone,
      },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          barbershopId,
          name: customerName,
          phone: customerPhone,
          email: customerEmail || null,
        },
      });
    }

    // Criar agendamento
    const appointment = await prisma.appointment.create({
      data: {
        barbershopId,
        customerId: customer.id,
        serviceId,
        professionalId,
        date: new Date(date),
        status: "pending",
      },
      include: {
        customer: true,
        service: true,
        professional: true,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return NextResponse.json(
      { error: "Erro ao criar agendamento" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const barbershopId = searchParams.get("barbershopId");

    if (!barbershopId) {
      return NextResponse.json(
        { error: "barbershopId é obrigatório" },
        { status: 400 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: { barbershopId },
      include: {
        customer: true,
        service: true,
        professional: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar agendamentos" },
      { status: 500 }
    );
  }
}
