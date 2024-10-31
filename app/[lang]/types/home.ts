import { Locale } from "i18n-config";
import { Dictionary } from "./dictionary";

export type HomeProps = { dictionary: Dictionary; lang?: Locale };

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface Templates {
  id: string;
  name: string;
  type: TemplateTypes;
  image: string;
}

export interface BackgroundImages {
  id: string;
  name: string;
  image: string;
}

export interface LogosImages {
  id: string;
  name: string;
  image: string;
  editable: string;
  delete: string;
}

export interface Categories {
  id: string;
  name: string;
  created_at: string;
  editable: any;
  status: boolean;
}

export interface Products {
  id: string;
  uid: string;
  sku: string;
  name: string;
  created_at: string;
  full_price: number;
  status: boolean;
  editable: any;
  prices_matrix: any;
  quantity?: any;
  totalPrice?: any;
  categoryPrice?: any;
  hasPersonalization?: boolean;
  customName?: string;
  customRole?: string;
  full_price_custom?: any;
  full_price_Discount?: any;
  customStatus?: any;
}

export interface Plans {
  id: string;
  uid: string;
  sku: string;
  name: string;
  created_at: string;
  full_price: number;
  status: boolean;
  editable: any;
  prices_matrix: any;
  selectedProducts?: any;
  product?: any;
}

export interface Colors {
  id: string;
  sku: string;
  name: string;
  created_at: string;
  editable: any;
  selectedMaterials?: any;
  product?: any;
  image: any;
}

export interface Customizations {
  id: string;
  sku: string;
  name: string;
  created_at: string;
  full_price: number;
  status: boolean;
  editable: any;
  prices_matrix: any;
  type?: any;
  selectedArticle?: any;
}

export interface Distributors {
  address: string;
  category: string;
  city: string;
  country: string;
  created_at: string;
  documentType: string;
  documentNumber: string;
  email: string;
  fullName: string;
  dni: string;
  id: string;
  isActive: boolean;
  phoneNumber: string;
  state: string;
  uid: string;
  editable: any;
}

export interface Notification {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  creator: string;
}

// Define la interfaz para la suscripción
export interface Subscription {
  id: string;
  annual_fee: number;
  description: string;
  createdAt: string;
  updatedAt?: string;
  months_period?: number;
  text_period?: string;
}

export interface SocialNetworks {
  id: string;
  name: string;
  image: string;
}

export type TemplateTypes = "social" | "professional" | "corporate";
