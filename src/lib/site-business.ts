import { contactDetails } from "./site-content";

export const businessInfo = {
  name: "Choudhary Binders & Printers",
  tagline: "Quality • Precision • Perfection",
  location: "Jaipur, Rajasthan",
  countryCode: "IND",
  rating: 4.7,
  ratingCount: 199,
  yearsInBusiness: 48,
  responseTime: "31 mins",
  enquiries: "123k",
  phone: contactDetails.phones[1].display,
  phoneDisplay: "07821013457",
  phoneTel: contactDetails.phones[1].tel,
  whatsapp: "https://wa.me/917821013457",
  whatsappMessage:
    "Hello, I would like to inquire about printing & binding services from Choudhary Binders & Printers.",
  whatsappHref:
    "https://wa.me/917821013457?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20printing%20%26%20binding%20services%20from%20Choudhary%20Binders%20%26%20Printers.",
  email: contactDetails.emails[0],
  emails: contactDetails.emails,
  secondaryEmail: contactDetails.emails[1],
  address: contactDetails.address,
  phones: contactDetails.phones,
  landline: contactDetails.landline,
  logo: "/logo-brand.png",
} as const;

export function buildWhatsAppHref(message?: string) {
  const text = encodeURIComponent(message ?? businessInfo.whatsappMessage);
  return `${businessInfo.whatsapp}?text=${text}`;
}
