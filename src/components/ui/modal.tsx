"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <dialog
          ref={dialogRef}
          onClose={onClose}
          onClick={(e) => {
            if (e.target === dialogRef.current) onClose();
          }}
          className="fixed inset-0 z-50 m-0 flex h-full w-full items-center justify-center bg-transparent p-4 backdrop:bg-patina-espresso/40 open:flex"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg rounded-xl border border-patina-sand bg-patina-cream p-6 shadow-lg"
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-lg text-patina-espresso">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1 text-patina-clay transition-colors hover:bg-patina-linen hover:text-patina-walnut"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}
