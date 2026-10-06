"use client";

import { Scissors, DollarSign, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

interface ServiceSelectorProps {
  services: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
  }>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ServiceSelector({ services, selectedId, onSelect }: ServiceSelectorProps) {
  return (
    <div>
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Escolha o serviço</h2>
        <p className="text-sm md:text-base text-gray-400">Selecione o serviço que deseja agendar</p>
      </div>

      <div className="grid gap-3 md:gap-4">
        {services.map((service) => {
          const isSelected = service.id === selectedId;

          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id)}
              className="text-left w-full"
            >
              <Card
                hover
                clickable
                className={`transition-all ${
                  isSelected ? "ring-2 ring-[#38BDF8] bg-[#38BDF8]/5" : ""
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div
                    className={`p-2.5 md:p-3 rounded-xl transition-colors flex-shrink-0 ${
                      isSelected
                        ? "bg-[#38BDF8] text-white"
                        : "bg-[#38BDF8]/10 text-[#38BDF8]"
                    }`}
                  >
                    <Scissors className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold mb-1.5 md:mb-2">{service.name}</h3>

                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                      <div className="flex items-center gap-1 md:gap-1.5 text-gray-400">
                        <DollarSign className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="font-semibold text-[#38BDF8]">
                          {formatCurrency(service.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-1.5 text-gray-400">
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span>{service.duration} min</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-[#38BDF8] rounded-full flex items-center justify-center">
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
