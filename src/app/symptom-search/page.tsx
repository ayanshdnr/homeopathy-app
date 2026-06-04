"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { aiSymptomRemedySuggestion, AiSymptomRemedySuggestionOutput } from "@/ai/flows/ai-symptom-remedy-suggestion";
import { Sparkles, Send, BrainCircuit, Loader2, Info } from "lucide-react";
import { MedicineDetail } from "@/components/MedicineDetail";
import { medicines, Medicine } from "@/lib/medicines-data";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SymptomSearchPage() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AiSymptomRemedySuggestionOutput | null>(null);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  const handleSearch = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const output = await aiSymptomRemedySuggestion({ symptoms });
      setResults(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openMedicine = (name: string) => {
    // Try to find the exact match in our database
    const med = medicines.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (med) {
      setSelectedMed(med);
    } else {
      // Create a temporary medicine object if not in database
      const tempMed: Medicine = {
        id: 'temp-' + name,
        name: name,
        mainUses: { 
          en: results?.suggestedRemedies.find(r => r.name === name)?.reason || "No details available.",
          hi: ""
        },
        potency: results?.suggestedRemedies.find(r => r.name === name)?.potency || "30CH",
        dosage: results?.suggestedRemedies.find(r => r.name === name)?.dosage || "Consult a doctor.",
        category: []
      };
      setSelectedMed(tempMed);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <Toaster />
      <header className="px-6 pt-10 pb-6 bg-primary text-white rounded-b-[3rem] card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Symptom Tool</h1>
            <p className="text-xs text-primary-foreground/80 font-medium">Smart Remedy Suggestions</p>
          </div>
        </div>
      </header>

      <main className="px-6 -mt-4">
        <section className="bg-white p-6 rounded-3xl card-shadow border border-primary/5 space-y-4">
          <div className="space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
               Describe Symptoms / लक्षण बताएं
             </label>
             <Textarea
               placeholder="Example: Headache with high fever or बुखार के साथ सिर दर्द..."
               className="min-h-[140px] rounded-2xl border-2 border-primary/10 focus-visible:ring-primary focus:border-primary text-lg"
               value={symptoms}
               onChange={(e) => setSymptoms(e.target.value)}
             />
          </div>
          
          <Button 
            onClick={handleSearch} 
            disabled={loading || !symptoms}
            className="w-full h-14 rounded-2xl bg-primary text-lg flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            Analyze Symptoms
          </Button>

          <Alert className="bg-muted border-none rounded-2xl">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
              Our AI interprets natural language in English and Hindi.
            </AlertDescription>
          </Alert>
        </section>

        <section className="mt-8 pb-10">
          {results && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                 Suggested Remedies
              </h2>
              <div className="space-y-4">
                {results.suggestedRemedies.map((remedy, idx) => (
                  <div
                    key={idx}
                    onClick={() => openMedicine(remedy.name)}
                    className="bg-white p-5 rounded-3xl card-shadow border-l-4 border-l-primary active:scale-[0.98] transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{remedy.name}</h3>
                      {remedy.potency && (
                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">
                          {remedy.potency}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed mb-3">{remedy.reason}</p>
                    {remedy.dosage && (
                      <div className="bg-muted p-3 rounded-xl">
                        <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-widest">Suggested Dosage</p>
                        <p className="text-sm font-medium">{remedy.dosage}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
