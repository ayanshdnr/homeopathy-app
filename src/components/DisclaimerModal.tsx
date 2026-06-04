"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldAlert } from "lucide-react";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem("disclaimer-acknowledged");
    if (!acknowledged) {
      setOpen(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem("disclaimer-acknowledged", "true");
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-[90vw] rounded-2xl">
        <AlertDialogHeader className="flex items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <ShieldAlert className="w-6 h-6 text-primary" />
          </div>
          <AlertDialogTitle className="text-xl">Medical Disclaimer</AlertDialogTitle>
          <AlertDialogDescription className="text-base text-left">
            This app is for <strong>information purposes only</strong> and is not a substitute for professional medical advice, diagnosis, or treatment. 
            <br /><br />
            Always consult a qualified homeopathic practitioner or a doctor before starting any new treatment or making decisions about your health.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleAcknowledge}
            className="w-full h-12 rounded-xl text-lg bg-primary hover:bg-primary/90"
          >
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
