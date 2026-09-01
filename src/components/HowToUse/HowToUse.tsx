import { AlertCircle } from 'lucide-react';
import type { HowToUseStep } from '../../types';

interface HowToUseProps {
  steps: HowToUseStep[];
}

export default function HowToUse({ steps }: HowToUseProps) {
  return (
    <section className="py-16 bg-[#EFE7D5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#5B7138] text-sm font-semibold uppercase tracking-widest mb-2">
            Easy Application
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2F4A24] font-serif-heading mb-3">
            How to Use
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-full border-t-2 border-dashed border-[#5B7138]/30 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#2F4A24] text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-md">
                  {step.step}
                </div>
                <h3 className="font-bold text-[#253022] text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-[#6B4A2D] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Patch Test Reminder */}
        <div className="mt-10 flex items-start gap-3 bg-white rounded-2xl p-5 border border-[#5B7138]/20 shadow-sm">
          <AlertCircle className="text-[#6B4A2D] shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-[#253022] text-sm mb-1">Patch Test Reminder</p>
            <p className="text-sm text-[#6B4A2D] leading-relaxed">
              Always perform a patch test before using a new hair-care product. Apply a small amount
              to the inside of your wrist or behind your ear and wait 24 hours before full
              application.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
