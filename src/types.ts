
/** Global app types so every component imports from one place */
export type Deal = {
  id: string;
  name: string;
  borrower: string;
  outstanding: string;
  status: "normal" | "warning" | "alert" | null;
};

export type Alert = {
  id: string;
  type: "document" | "covenant" | "payment";
  message: string;
  dealId?: string;
  severity: "high" | "medium" | "low";
};
