"use client";

import { useState } from "react";
import { ArrowLeft, User, Phone, Mail, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface CustomerFormProps {
  appointment: {
    date: Date;
    time: string;
    service: {
      id: string;
      name: string;
      price: number;
      duration: number;
    };
    professional: {
      id: string;
      name: string;
    };
    barbershopId: string;
  };
  onSuccess: (appointmentId: string) => void;
  onBack: () => void;
}

export function CustomerForm({ appointment, onSuccess, onBack }: CustomerFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const [hours, minutes] = appointment.time.split(":");
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barbershopId: appointment.barbershopId,
          serviceId: appointment.service.id,
          professionalId: appointment.professional.id,
          date: appointmentDate.toISOString(),
          customerName: formData.get("name"),
          customerPhone: formData.get("phone"),
          customerEmail: formData.get("email") || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar agendamento");
      }

      onSuccess(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar agendamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 md:mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-3 md:mb-4">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Seus dados</h2>
        <p className="text-sm md:text-base text-gray-400">Precisamos de algumas informações para confirmar</p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {/* Summary - mobile first */}
        <Card className="bg-[#38BDF8]/5 border-[#38BDF8]/20 md:hidden">
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-1">Resumo do agendamento</h3>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-800">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Serviço</span>
                <span className="font-semibold">{appointment.service.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Profissional</span>
                <span className="font-semibold">{appointment.professional.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Data</span>
                <span className="font-semibold">
                  {appointment.date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Horário</span>
                <span className="font-semibold">{appointment.time}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total</span>
                <span className="text-xl font-bold text-[#38BDF8]">
                  R$ {appointment.service.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="md:grid md:grid-cols-2 md:gap-6">
          {/* Form */}
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <Input
                label="Nome completo"
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: João Silva"
                icon={User}
              />

              <Input
                label="Telefone (WhatsApp)"
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(00) 00000-0000"
                helperText="Enviaremos a confirmação por WhatsApp"
                icon={Phone}
              />

              <Input
                label="E-mail"
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                helperText="Opcional"
                icon={Mail}
              />

              {error && (
                <div className="p-3 md:p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <Button type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  "Confirmar agendamento"
                )}
              </Button>
            </form>
          </Card>

          {/* Summary - desktop */}
          <Card className="hidden md:block bg-[#38BDF8]/5 border-[#38BDF8]/20">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Resumo do agendamento</h3>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-800">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Serviço</span>
                  <span className="font-semibold">{appointment.service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Profissional</span>
                  <span className="font-semibold">{appointment.professional.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Data</span>
                  <span className="font-semibold">
                    {appointment.date.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Horário</span>
                  <span className="font-semibold">{appointment.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Duração</span>
                  <span className="font-semibold">{appointment.service.duration} min</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total</span>
                  <span className="text-2xl font-bold text-[#38BDF8]">
                    R$ {appointment.service.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
