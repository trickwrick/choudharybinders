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
  source: "contact" | "product" | "quote";
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

export type HeroSlide = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};
