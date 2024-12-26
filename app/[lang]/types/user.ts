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
  imagePro: string;
  is_admin: boolean;
  is_distributor?: boolean;
  isDistributor?: boolean;
  name: string;
  fullName?: string;
  switch_activateCard: boolean;
  switch_profile: boolean;
  templateData: TemplateData[];
  user_name: string;
  profile: DataForm;
  views: number;
  isActive: boolean;
  isActiveByAdmin: boolean;
  plan: string;
  gif: boolean;
  dni: string;
  preview: string;
  category?: string;
  idDistributor?: any;
}

export interface User {
  is_distributor: any;
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAdmin: boolean;
  isActive: boolean;
  isActiveByAdmin: boolean;
  accessToken?: string
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
