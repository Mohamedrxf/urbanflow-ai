import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  padding?: "sm" | "md";
  className?: string;
}

const PADDING_CLASSES = { sm: "p-4", md: "p-6" };

export default function Card({ title, children, padding = "md", className = "" }: CardProps) {
  return (
    <div className={`rounded-xl shadow ${PADDING_CLASSES[padding]} bg-white ${className}`.trim()}>
      {title && <h4 className="text-sm font-medium text-gray-900 mb-3">{title}</h4>}
      {children}
    </div>
  );
}
