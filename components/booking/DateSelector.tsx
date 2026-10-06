"use client";

import { ArrowLeft, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface DateSelectorProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  onBack: () => void;
}

export function DateSelector({ selectedDate, onSelect, onBack }: DateSelectorProps) {
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDateLabel = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate.getTime() === today.getTime()) return "Hoje";
    if (targetDate.getTime() === tomorrow.getTime()) return "Amanhã";

    return date.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" });
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div>
      <div className="mb-4 md:mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-3 md:mb-4">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Escolha a data</h2>
        <p className="text-sm md:text-base text-gray-400">Selecione o dia do seu agendamento</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {dates.map((date) => {
          const isSelected = isSameDay(selectedDate, date);
          const dayOfWeek = date.toLocaleDateString("pt-BR", { weekday: "short" });
          const dayNumber = date.getDate();
          const month = date.toLocaleDateString("pt-BR", { month: "short" });

          return (
            <button key={date.toISOString()} onClick={() => onSelect(date)} className="w-full">
              <Card
                hover
                clickable
                className={`transition-all ${
                  isSelected ? "ring-2 ring-[#38BDF8] bg-[#38BDF8]/5" : ""
                }`}
              >
                <div className="flex flex-col items-center py-2">
                  <div
                    className={`p-1.5 md:p-2 rounded-lg mb-1.5 md:mb-2 transition-colors ${
                      isSelected
                        ? "bg-[#38BDF8] text-white"
                        : "bg-[#38BDF8]/10 text-[#38BDF8]"
                    }`}
                  >
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs text-gray-400 capitalize mb-0.5 md:mb-1">{dayOfWeek}</span>
                  <span className="text-xl md:text-2xl font-bold mb-0.5 md:mb-1">{dayNumber}</span>
                  <span className="text-xs text-gray-400 capitalize">{month}</span>
                  {formatDateLabel(date) === "Hoje" && (
                    <span className="text-xs font-semibold text-[#38BDF8] mt-1">Hoje</span>
                  )}
                  {formatDateLabel(date) === "Amanhã" && (
                    <span className="text-xs font-semibold text-[#38BDF8] mt-1">Amanhã</span>
                  )}
                  {isSelected && (
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-[#38BDF8] rounded-full flex items-center justify-center mt-1.5 md:mt-2">
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
    </div>
  );
}
