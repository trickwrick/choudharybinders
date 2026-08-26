import type { ObjectId } from "mongodb";
import type { CategoryId } from "@/lib/categories";

export type HeroSlideDoc = {
  _id?: ObjectId | string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  order: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductDoc = {
  _id?: ObjectId | string;
  id: string;
  categoryId: CategoryId;
  title: string;
  image: string;
  images: string[];
  minQty: string;
  price?: number;
  unit?: string;
  specifications: { label: string; value: string }[];
  description: string;
  active: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type InquiryStatus = "new" | "read" | "replied";

export type OrderDetails = {
  variantId?: string;
  variantCode?: string;
  variantLabel?: string;
  variantName?: string;
  sectionTitle?: string;
  printing?: string;
  privacyPacking?: "required" | "not-required";
  fileOption?: "attach-online" | "send-email";
  attachedFileName?: string;
  applicableCost?: number;
  gst?: number;
  amountPayable?: number;
  specialRemark?: string;
  freeDeliveryEligible?: boolean;
};

export type InquiryDoc = {
  _id?: ObjectId | string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
  productTitle?: string;
  categoryId?: string;
  quantity?: number;
  unit?: string;
  orderDetails?: OrderDetails;
  source: "contact" | "product" | "quote" | "order";
  status: InquiryStatus;
  createdAt: Date;
};

export type CategoryProduct = {
  id: string;
  title: string;
  image: string;
  minQty: string;
  price?: number;
  unit?: string;
};

export type CategoryDoc = {
  _id?: ObjectId | string;
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  icon: string;
  subcategories?: string[];
  order: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type HeroSlide = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};
