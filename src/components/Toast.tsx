"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
      <div
        className={`pointer-events-auto px-8 py-4 rounded-xl shadow-2xl text-white text-lg font-medium transition-all duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        } ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        {type === "success" ? "✓ " : "✗ "}{message}
      </div>
    </div>
  );
}
