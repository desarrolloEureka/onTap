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

export type TemplateTypes = 'social' | 'professional' | 'corporate';
