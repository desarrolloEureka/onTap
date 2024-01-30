import { profile } from '../initialData/profileInitialData';
import { DataForm } from './profile';
export interface TemplateData {
  type: string;
  id: string;
  background_id?: string;
  checked: boolean;
}
export interface UserData {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAdmin: boolean;
  background_id: string;
  image: string;
  is_admin: boolean;
  name: string;
  switch_activateCard: boolean;
  switch_profile: boolean;
  templateData: TemplateData[];
  user_name: string;
  profile: DataForm;
  views: number;
}
export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAdmin: boolean;
}

export interface UserDb {
  background_id: string;
  image: string;
  is_admin: boolean;
  name: string;
  switch_activateCard: boolean;
  switch_profile: boolean;
  templateData: {
    background_id: string;
    template_id: string;
  };
  user_name: string;
}
