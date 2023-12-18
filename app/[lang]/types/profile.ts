export interface DataForm {
  name?: { checked?: boolean; text?: string };
  last_name?: { checked?: boolean; text?: string };
}

export type IndexDataForm =
  | 'name'
  | 'last_name'
  | 'profession'
  | 'occupation'
  | 'address'
  | 'company'
  | 'position'
  | 'professional_profile';

export interface ItemFormParams {
  label: string;
  name: IndexDataForm;
  handleSwitch: (e: any) => void;
  handleData: ({ name, text }: { name: string; text: string }) => void;
}
