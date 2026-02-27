"use client";

import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <div className={cn("divide-y divide-neutral-700", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const triggerId = `${id}-trigger-${i}`;
        const panelId = `${id}-panel-${i}`;

        return (
          <div key={i}>
            <button
              id={triggerId}
              className="flex w-full items-center justify-between py-5 text-left text-lg font-medium text-neutral-50 hover:text-accent-400 transition-colors"
              style={{ transitionDuration: "var(--duration-normal)" }}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {item.question}
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-neutral-500 transition-transform",
                  isOpen && "rotate-180"
                )}
                style={{ transitionDuration: "var(--duration-normal)" }}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="grid transition-all"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transitionDuration: "var(--duration-slow)",
              }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-neutral-300 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
