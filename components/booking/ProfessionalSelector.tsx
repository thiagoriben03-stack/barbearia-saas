"use client";

import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProfessionalSelectorProps {
  professionals: Array<{
    id: string;
    name: string;
    phone: string | null;
  }>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
}

export function ProfessionalSelector({
  professionals,
  selectedId,
  onSelect,
  onBack,
}: ProfessionalSelectorProps) {
  return (
    <div>
      <div className="mb-4 md:mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-3 md:mb-4">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Escolha o profissional</h2>
        <p className="text-sm md:text-base text-gray-400">Selecione quem irá te atender</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {professionals.map((professional) => {
          const isSelected = professional.id === selectedId;

          return (
            <button
              key={professional.id}
              onClick={() => onSelect(professional.id)}
              className="text-center w-full"
            >
              <Card
                hover
                clickable
                className={`transition-all ${
                  isSelected ? "ring-2 ring-[#38BDF8] bg-[#38BDF8]/5" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-2 md:mb-3">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#38BDF8]"
                          : "bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9]"
                      }`}
                    >
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        {professional.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-[#38BDF8] rounded-full flex items-center justify-center border-2 border-[#0F131C]">
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
                  <h3 className="text-sm md:text-lg font-semibold line-clamp-2">{professional.name}</h3>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
