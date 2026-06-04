"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { medicines, Medicine } from "@/lib/medicines-data";
import { MedicineDetail } from "@/components/MedicineDetail";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.mainUses.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.mainUses.hi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 bg-background">
      <Toaster />
      <header className="px-6 pt-8 pb-4 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <h1 className="text-3xl font-bold mb-4">Materia Medica</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Filter by name or use..."
            className="h-12 pl-10 rounded-xl bg-white card-shadow border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="px-6 space-y-3">
        {filteredMedicines.map((med) => (
          <div
            key={med.id}
            onClick={() => setSelectedMed(med)}
            className="flex items-center justify-between p-5 bg-white rounded-2xl card-shadow border border-transparent active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex-1 mr-4">
              <h3 className="text-lg font-bold">{med.name}</h3>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{med.potency}</p>
            </div>
            <div className="flex items-center gap-2">
               <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        ))}

        {filteredMedicines.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No medicines match your filter.
          </div>
        )}
      </main>

      <MedicineDetail 
        medicine={selectedMed} 
        isOpen={!!selectedMed} 
        onClose={() => setSelectedMed(null)} 
      />
      <Navigation />
    </div>
  );
}
