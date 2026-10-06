import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const professionalId = searchParams.get("professionalId");
    const serviceDuration = searchParams.get("serviceDuration");
    const barbershopId = searchParams.get("barbershopId");

    if (!date || !professionalId || !serviceDuration || !barbershopId) {
      return NextResponse.json(
        { error: "Parâmetros obrigatórios faltando" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Buscar agendamentos existentes do profissional neste dia
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        professionalId,
        barbershopId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: "cancelled",
        },
      },
      include: {
        service: true,
      },
    });

    // Gerar todos os horários disponíveis (8h às 20h, intervalos de 30min)
    const allTimes: string[] = [];
    const startHour = 8;
    const endHour = 20;

    for (let hour = startHour; hour < endHour; hour++) {
      allTimes.push(`${hour.toString().padStart(2, "0")}:00`);
      allTimes.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    // Filtrar horários ocupados
    const duration = parseInt(serviceDuration);
    const availableTimes = allTimes.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const timeDate = new Date(selectedDate);
      timeDate.setHours(hours, minutes, 0, 0);

      // Verificar se já passou (para hoje)
      const now = new Date();
      if (selectedDate.toDateString() === now.toDateString() && timeDate < now) {
        return false;
      }

      // Verificar conflito com agendamentos existentes
      const hasConflict = existingAppointments.some((appointment) => {
        const appointmentStart = new Date(appointment.date);
        const appointmentEnd = new Date(appointmentStart);
        appointmentEnd.setMinutes(appointmentEnd.getMinutes() + appointment.service.duration);

        const proposedEnd = new Date(timeDate);
        proposedEnd.setMinutes(proposedEnd.getMinutes() + duration);

        // Verifica se há sobreposição
        return (
          (timeDate >= appointmentStart && timeDate < appointmentEnd) ||
          (proposedEnd > appointmentStart && proposedEnd <= appointmentEnd) ||
          (timeDate <= appointmentStart && proposedEnd >= appointmentEnd)
        );
      });

      return !hasConflict;
    });

    return NextResponse.json({ times: availableTimes });
  } catch (error) {
    console.error("Erro ao buscar horários disponíveis:", error);
    return NextResponse.json(
      { error: "Erro ao buscar horários disponíveis" },
      { status: 500 }
    );
  }
}
