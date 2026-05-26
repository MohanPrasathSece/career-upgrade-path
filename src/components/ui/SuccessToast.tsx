// src/components/ui/SuccessToast.tsx
import React, { useEffect } from "react";

interface Props {
  message: string;
  onClose?: () => void;
}

export default function SuccessToast({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center pointer-events-none">
      <div className="bg-primary-foreground text-primary rounded-full px-4 py-2 shadow-lg animate-in fade-in zoom-in-95 duration-200">
        {message}
      </div>
    </div>
  );
}
