import type { ReactNode } from "react";
/** The signature green `<tag>` label from the design. */
export const CodeTag = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`code-tag ${className}`} aria-hidden="true">{children}</span>
);
