"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { medicines, Medicine } from "@/lib/medicines-data";
import { Input } from "@/components/ui/input";
import { Search, Thermometer, Wind, Zap, Activity, Pill } from "lucide-react";
import { MedicineDetail } from "@/components/MedicineDetail";
import { Toaster } from "@/components/ui/toaster";

const categories = [
  { name: "Fever", icon: Thermometer, color: "bg-orange-50 text-orange-600" },
  { name: "Cold", icon: Wind, color: "bg-blue-50 text-blue-600" },
  { name: "Skin", icon: Zap, color: "bg-purple-50 text-purple-600" },
  { name: "Digestion", icon: Activity, color: "bg-green-50 text-green-600" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory 
      ? med.category.some(c => c.toLowerCase().includes(selectedCategory.toLowerCase()))
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-20">
      <DisclaimerModal />
      <Toaster />
      
      {/* Header */}
      <header className="bg-primary text-white pt-8 pb-12 px-6 rounded-b-[2.5rem] card-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Homeopathy</h1>
            <p className="text-primary-foreground/80 font-medium">Natural Healing Guide</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center">
            <Pill className="w-6 h-6" />
          </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 transition-colors group-focus-within:text-accent" />
          <Input
            placeholder="Search medicines by name..."
            className="h-14 pl-12 bg-white text-foreground rounded-2xl border-none text-lg shadow-lg focus-visible:ring-2 focus-visible:ring-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="px-6 -mt-6">
        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            Common Diseases
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`home-category-btn ${cat.color} ${selectedCategory === cat.name ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              >
                <cat.icon className="w-6 h-6 mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Medicine List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">
              {selectedCategory ? `${selectedCategory} Remedies` : 'Recommended Medicines'}
            </h2>
            <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {filteredMedicines.length} Found
            </span>
          </div>
          
          <div className="space-y-4">
            {filteredMedicines.map((med) => (
              <div
                key={med.id}
                onClick={() => setSelectedMed(med)}
                className="bg-white p-5 rounded-2xl card-shadow border border-transparent hover:border-primary/10 transition-all active:scale-[0.98] cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{med.name}</h3>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-lg">{med.potency}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {med.mainUses.en}
                </p>
                <div className="mt-3 pt-3 border-t border-dashed flex gap-2">
                   {med.category.slice(0, 2).map(c => (
                     <span key={c} className="text-[10px] font-bold uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded-md">
                       {c}
                     </span>
                   ))}
                </div>
              </div>
            ))}
            
            {filteredMedicines.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed">
                <p className="text-muted-foreground font-medium">No medicines found matching your search.</p>
              </div>
            )}
          </div>
        </section>
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
