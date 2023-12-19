export interface DataForm {
  name?: DataFormValues;
  last_name?: DataFormValues;
  profession?: DataFormValues;
  occupation?: DataFormValues;
  address?: DataFormValues;
  company?: DataFormValues;
  position?: DataFormValues;
  professional_profile?: DataFormValues;
  phones?: DataFormValues[];
  emails?: DataFormValues[];
  education?: EducationDataFormValues[];
  professional_career?: CareerDataFormValues[];
}

export type DataFormValues = {
  label?: string;
  text?: string;
  checked?: boolean;
  principal?: boolean;
};

export type EducationDataFormValues = {
  label?: string;
  title: string;
  institution: string;
  year: string;
  checked?: boolean;
  principal?: boolean;
};

export type CareerDataFormValues = {
  label?: string;
  company: string;
  position: string;
  data_init: string;
  data_end: string;
  checked?: boolean;
  principal?: boolean;
};

export type IndexDataForm =
  | 'name'
  | 'last_name'
  | 'profession'
  | 'occupation'
  | 'address'
  | 'company'
  | 'position'
  | 'professional_profile'
  | 'phones'
  | 'emails'
  | 'education'
  | 'professional_career';

export interface ItemFormParams {
  label: string;
  name: IndexDataForm;
  handleSwitch: (e: any) => void;
  handleData: ({ name, text }: { name: string; text: string }) => void;
  checked?: boolean;
}
