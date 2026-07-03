export const WHATSAPP_NUMBER = "5547992543200";
export const CONTACT_EMAIL = "contato@esterzen.com";

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
