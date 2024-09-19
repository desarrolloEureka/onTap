import { Locale } from 'i18n-config';
import { Dictionary } from './dictionary';

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
  sku: string;
  name: string;
  created_at: string;
  full_price: number;
  status: boolean;
  editable: any;
  prices_matrix: any;
}

export interface Plans {
  id: string;
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

export interface SocialNetworks {
  id: string;
  name: string;
  image: string;
}

export type TemplateTypes = 'social' | 'professional' | 'corporate';
