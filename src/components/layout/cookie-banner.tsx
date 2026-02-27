"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "arinit-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay to not interfere with initial paint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[500] glass rounded-xl p-5"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-sm text-neutral-300 mb-4">
            We use cookies to improve your experience. Essential cookies are always active.{" "}
            <a href="/legal/cookies" className="text-accent-400 hover:underline underline-offset-2">
              Learn more
            </a>
          </p>
          <div className="flex gap-3">
            <Button size="sm" onClick={accept}>
              Accept All
            </Button>
            <Button size="sm" variant="secondary" onClick={reject}>
              Reject Non-Essential
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
