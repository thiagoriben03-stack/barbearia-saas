"use client";

import { CheckCircle, Calendar, Clock, User, Scissors, Share2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface BookingConfirmationProps {
  barbershop: {
    name: string;
    slug: string;
  };
  appointment: {
    id: string;
    date: Date;
    time: string;
    service: string;
    professional: string;
  };
}

export function BookingConfirmation({ barbershop, appointment }: BookingConfirmationProps) {
  const handleShare = async () => {
    const text = `Agendamento confirmado!\n${barbershop.name}\n${appointment.service} com ${appointment.professional}\n${appointment.date.toLocaleDateString("pt-BR")} às ${appointment.time}`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Copiado para a área de transferência!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-green-500/10 to-[#38BDF8]/10 border-green-500/20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Agendamento confirmado!</h1>
          <p className="text-lg text-gray-400 mb-8">
            Você receberá uma confirmação por WhatsApp em breve
          </p>

          {/* Appointment Details */}
          <div className="bg-[#0A0D12] rounded-2xl p-6 mb-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                <div className="w-12 h-12 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-gray-400">Data</p>
                  <p className="text-lg font-semibold">
                    {appointment.date.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                <div className="w-12 h-12 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-gray-400">Horário</p>
                  <p className="text-lg font-semibold">{appointment.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                <div className="w-12 h-12 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-gray-400">Serviço</p>
                  <p className="text-lg font-semibold">{appointment.service}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-gray-400">Profissional</p>
                  <p className="text-lg font-semibold">{appointment.professional}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" size="lg" onClick={handleShare} className="flex-1">
              <Share2 className="w-5 h-5" />
              Compartilhar
            </Button>
            <a href={`/${barbershop.slug}`} className="flex-1">
              <Button variant="primary" size="lg" className="w-full">
                Fazer outro agendamento
              </Button>
            </a>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#38BDF8]/5 border border-[#38BDF8]/20 rounded-xl">
            <p className="text-sm text-gray-400">
              💡 <strong className="text-white">Dica:</strong> Chegue com 5 minutos de antecedência para não atrasar seu atendimento.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
