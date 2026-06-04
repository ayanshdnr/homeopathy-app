"use client";

import { useState, useEffect } from "react";
import { Medicine } from "@/lib/medicines-data";
import { Button } from "@/components/ui/button";
import { Heart, Bell, Clock, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface MedicineDetailProps {
  medicine: Medicine | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MedicineDetail({ medicine, isOpen, onClose }: MedicineDetailProps) {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    if (medicine) {
      const saved = JSON.parse(localStorage.getItem("saved-medicines") || "[]");
      setIsSaved(saved.some((m: Medicine) => m.id === medicine.id));
    }
  }, [medicine]);

  const toggleSave = () => {
    if (!medicine) return;
    const saved = JSON.parse(localStorage.getItem("saved-medicines") || "[]");
    let newSaved;
    if (isSaved) {
      newSaved = saved.filter((m: Medicine) => m.id !== medicine.id);
      setIsSaved(false);
      toast({ title: "Removed from favorites" });
    } else {
      newSaved = [...saved, medicine];
      setIsSaved(true);
      toast({ title: "Saved to favorites" });
    }
    localStorage.setItem("saved-medicines", JSON.stringify(newSaved));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSetReminder = () => {
    if (!reminderTime || !medicine) return;
    
    // Store reminder (simulated)
    const reminders = JSON.parse(localStorage.getItem("med-reminders") || "[]");
    reminders.push({
      id: Date.now(),
      medName: medicine.name,
      time: reminderTime
    });
    localStorage.setItem("med-reminders", JSON.stringify(reminders));

    toast({ 
      title: "Reminder Set", 
      description: `Alarm set for ${medicine.name} at ${reminderTime}`
    });
    setShowReminderPicker(false);

    // Simulated browser notification logic
    setTimeout(() => {
       // In a real mobile app, this would use native push
    }, 1000);
  };

  if (!medicine) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-full sm:h-auto sm:max-w-lg p-0 border-none bg-background rounded-none overflow-y-auto">
        <div className="relative pb-24">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <DialogTitle className="text-xl font-bold text-primary">{medicine.name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={toggleSave}>
              <Heart className={cn("w-6 h-6", isSaved && "fill-destructive text-destructive")} />
            </Button>
          </div>

          <div className="p-6 space-y-8">
            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Main Uses / मुख्य उपयोग</h3>
              <div className="bg-white p-5 rounded-2xl card-shadow space-y-4 border border-primary/5">
                <p className="text-lg leading-relaxed">{medicine.mainUses.en}</p>
                <div className="h-px bg-border/50" />
                <p className="text-lg leading-relaxed font-hindi">{medicine.mainUses.hi}</p>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <section className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Potency</h3>
                <div className="bg-primary/5 p-4 rounded-xl flex items-center gap-3 border border-primary/10">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <span className="font-bold text-primary">{medicine.potency}</span>
                  </div>
                </div>
              </section>
              <section className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dosage</h3>
                <div className="bg-accent/5 p-4 rounded-xl border border-accent/10">
                  <p className="text-sm font-medium">{medicine.dosage}</p>
                </div>
              </section>
            </div>

            <section className="pt-4">
              <Button 
                onClick={() => setShowReminderPicker(true)}
                className="w-full h-14 rounded-2xl bg-primary text-lg flex items-center gap-3"
              >
                <Bell className="w-5 h-5" />
                Set Dosage Reminder
              </Button>
            </section>
          </div>
        </div>

        {showReminderPicker && (
          <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center p-6">
            <div className="bg-white w-full rounded-3xl p-6 space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold flex items-center justify-center gap-2 mb-2">
                  <Clock className="text-primary" /> Set Time
                </h3>
                <p className="text-sm text-muted-foreground">When should we remind you to take {medicine.name}?</p>
              </div>
              <Input 
                type="time" 
                value={reminderTime} 
                onChange={(e) => setReminderTime(e.target.value)}
                className="h-14 text-center text-2xl font-bold rounded-xl border-2 border-primary/20 focus:border-primary"
              />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setShowReminderPicker(false)}>Cancel</Button>
                <Button className="flex-1 h-12 rounded-xl" onClick={handleSetReminder}>Confirm</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
