"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface TimeSelectorProps {
  date: Date;
  professionalId: string;
  serviceDuration: number;
  barbershopId: string;
  selectedTime: string | null;
  onSelect: (time: string) => void;
  onBack: () => void;
}

export function TimeSelector({
  date,
  professionalId,
  serviceDuration,
  barbershopId,
  selectedTime,
  onSelect,
  onBack,
}: TimeSelectorProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          date: date.toISOString(),
          professionalId,
          serviceDuration: serviceDuration.toString(),
          barbershopId,
        });

        const response = await fetch(`/api/appointments/available?${params}`);
        const data = await response.json();

        if (data.times) {
          setAvailableTimes(data.times);
        }
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTimes();
  }, [date, professionalId, serviceDuration, barbershopId]);

  return (
    <div>
      <div className="mb-4 md:mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-3 md:mb-4">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Escolha o horário</h2>
        <p className="text-sm md:text-base text-gray-400 capitalize">
          {date.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {loading ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-8 md:py-12">
            <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-[#38BDF8] animate-spin mb-2 md:mb-3" />
            <p className="text-sm md:text-base text-gray-400">Carregando horários disponíveis...</p>
          </div>
        </Card>
      ) : availableTimes.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-8 md:py-12">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3 md:mb-4">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Nenhum horário disponível</h3>
            <p className="text-sm md:text-base text-gray-400 text-center">
              Não há horários livres para esta data. Tente outro dia.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
          {availableTimes.map((time) => {
            const isSelected = time === selectedTime;

            return (
              <button key={time} onClick={() => onSelect(time)} className="w-full">
                <Card
                  hover
                  clickable
                  className={`transition-all ${
                    isSelected ? "ring-2 ring-[#38BDF8] bg-[#38BDF8]/5" : ""
                  }`}
                >
                  <div className="flex flex-col items-center py-2 md:py-3">
                    <Clock
                      className={`w-4 h-4 md:w-5 md:h-5 mb-1 md:mb-2 ${
                        isSelected ? "text-[#38BDF8]" : "text-gray-400"
                      }`}
                    />
                    <span className={`text-base md:text-lg font-bold ${isSelected ? "text-[#38BDF8]" : ""}`}>
                      {time}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#38BDF8] rounded-full flex items-center justify-center mt-1 md:mt-2">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
