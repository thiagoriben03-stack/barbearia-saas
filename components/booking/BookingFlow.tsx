"use client";

import { useState } from "react";
import { ServiceSelector } from "./ServiceSelector";
import { ProfessionalSelector } from "./ProfessionalSelector";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";
import { CustomerForm } from "./CustomerForm";
import { BookingConfirmation } from "./BookingConfirmation";

interface BookingFlowProps {
  barbershop: {
    id: string;
    name: string;
    slug: string;
  };
  services: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
  }>;
  professionals: Array<{
    id: string;
    name: string;
    phone: string | null;
  }>;
}

type Step = "service" | "professional" | "date" | "time" | "customer" | "confirmation";

export function BookingFlow({ barbershop, services, professionals }: BookingFlowProps) {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  const service = services.find((s) => s.id === selectedService);
  const professional = professionals.find((p) => p.id === selectedProfessional);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Progress Steps */}
      <div className="mb-6 sm:mb-8 overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[600px] sm:min-w-0">
          {["Serviço", "Profissional", "Data", "Horário", "Dados"].map((label, index) => {
            const stepIndex = ["service", "professional", "date", "time", "customer"].indexOf(step);
            const isActive = index === stepIndex;
            const isPast = index < stepIndex;

            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-[#38BDF8] text-white"
                        : isPast
                        ? "bg-[#38BDF8]/20 text-[#38BDF8]"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      isActive ? "text-white font-semibold" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < 4 && (
                  <div
                    className={`h-px flex-1 -mt-6 ${
                      isPast ? "bg-[#38BDF8]/20" : "bg-gray-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      {step === "service" && (
        <ServiceSelector
          services={services}
          selectedId={selectedService}
          onSelect={(id) => {
            setSelectedService(id);
            setStep("professional");
          }}
        />
      )}

      {step === "professional" && (
        <ProfessionalSelector
          professionals={professionals}
          selectedId={selectedProfessional}
          onSelect={(id) => {
            setSelectedProfessional(id);
            setStep("date");
          }}
          onBack={() => setStep("service")}
        />
      )}

      {step === "date" && selectedProfessional && (
        <DateSelector
          selectedDate={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);
            setStep("time");
          }}
          onBack={() => setStep("professional")}
        />
      )}

      {step === "time" && selectedDate && selectedProfessional && service && (
        <TimeSelector
          date={selectedDate}
          professionalId={selectedProfessional}
          serviceDuration={service.duration}
          barbershopId={barbershop.id}
          selectedTime={selectedTime}
          onSelect={(time) => {
            setSelectedTime(time);
            setStep("customer");
          }}
          onBack={() => setStep("date")}
        />
      )}

      {step === "customer" && selectedDate && selectedTime && service && professional && (
        <CustomerForm
          appointment={{
            date: selectedDate,
            time: selectedTime,
            service,
            professional,
            barbershopId: barbershop.id,
          }}
          onSuccess={(id) => {
            setAppointmentId(id);
            setStep("confirmation");
          }}
          onBack={() => setStep("time")}
        />
      )}

      {step === "confirmation" && appointmentId && selectedDate && selectedTime && service && (
        <BookingConfirmation
          barbershop={barbershop}
          appointment={{
            id: appointmentId,
            date: selectedDate,
            time: selectedTime,
            service: service.name,
            professional: professional?.name || "",
          }}
        />
      )}
    </div>
  );
}
