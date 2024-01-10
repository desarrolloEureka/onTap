export interface UserData {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAdmin: boolean;
  profile: UserDb;
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
