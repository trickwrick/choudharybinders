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
  phoneDisplay: "09116013457",
  phoneTel: contactDetails.phones[1].tel,
  whatsapp: "https://wa.me/919116013457",
  whatsappMessage:
    "i would like to enquire about advertising, branding and printing services from choudhary binders and printers",
  whatsappHref:
    "https://wa.me/919116013457?text=i%20would%20like%20to%20enquire%20about%20advertising%2C%20branding%20and%20printing%20services%20from%20choudhary%20binders%20and%20printers",
  email: contactDetails.emails[0],
  emails: contactDetails.emails,
  secondaryEmail: (contactDetails.emails as readonly string[])[1],
  address: contactDetails.address,
  phones: contactDetails.phones,
  landline: contactDetails.landline,
  logo: "/cbp-icon.jpg",
} as const;

export function buildWhatsAppHref(message?: string) {
  const text = encodeURIComponent(message ?? businessInfo.whatsappMessage);
  return `${businessInfo.whatsapp}?text=${text}`;
}
