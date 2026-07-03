import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";

export function WhatsappFab() {
  const msg = "Olá, Ester! Vim pelo site e gostaria de conversar sobre uma palestra/workshop.";
  return (
    <a
      href={buildWhatsappUrl(msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-2xl shadow-black/40 ring-1 ring-black/10 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
