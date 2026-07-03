import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { QuizDialog } from "./QuizDialog";

type Ctx = { open: () => void };
const QuizCtx = createContext<Ctx | null>(null);

export function useOpenQuiz() {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useOpenQuiz must be used inside QuizProvider");
  return ctx.open;
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const doOpen = useCallback(() => setOpen(true), []);

  // Exit-intent / dwell auto-trigger (once per session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const KEY = "ez-quiz-auto-shown";
    if (sessionStorage.getItem(KEY)) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      sessionStorage.setItem(KEY, "1");
      setOpen(true);
    };

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) fire();
    };
    const dwellMs = isDesktop ? 45_000 : 30_000;
    const t = window.setTimeout(fire, dwellMs);
    if (isDesktop) document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <QuizCtx.Provider value={{ open: doOpen }}>
      {children}
      <QuizDialog open={open} onOpenChange={setOpen} />
    </QuizCtx.Provider>
  );
}
