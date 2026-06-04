"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Medicine } from "@/lib/medicines-data";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicineDetail } from "@/components/MedicineDetail";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function SavedPage() {
  const [savedMedicines, setSavedMedicines] = useState<Medicine[]>([]);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);
  const { toast } = useToast();

  const loadSaved = () => {
    const saved = JSON.parse(localStorage.getItem("saved-medicines") || "[]");
    setSavedMedicines(saved);
  };

  useEffect(() => {
    loadSaved();
    window.addEventListener('storage', loadSaved);
    return () => window.removeEventListener('storage', loadSaved);
  }, []);

  const removeSaved = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSaved = savedMedicines.filter(m => m.id !== id);
    localStorage.setItem("saved-medicines", JSON.stringify(newSaved));
    setSavedMedicines(newSaved);
    toast({ title: "Removed from favorites" });
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <Toaster />
      <header className="px-6 pt-10 pb-6 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-destructive/10 rounded-xl">
            <Heart className="w-6 h-6 text-destructive fill-current" />
          </div>
          <h1 className="text-2xl font-bold">My Favorites</h1>
        </div>
      </header>

      <main className="px-6 py-6 space-y-4">
        {savedMedicines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 bg-white rounded-3xl border-2 border-dashed border-muted">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-muted-foreground">No saved medicines</h3>
              <p className="text-sm text-muted-foreground/60 px-8">Your favorite remedies will appear here for quick access.</p>
            </div>
          </div>
        ) : (
          savedMedicines.map((med) => (
            <div
              key={med.id}
              onClick={() => setSelectedMed(med)}
              className="bg-white p-5 rounded-2xl card-shadow border border-transparent active:scale-[0.98] transition-all cursor-pointer flex justify-between items-center group"
            >
              <div className="flex-1 mr-4">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{med.name}</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">{med.potency}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl"
                  onClick={(e) => removeSaved(e, med.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))
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
