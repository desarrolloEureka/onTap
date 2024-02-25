export interface DataFormSorted {
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
  urls?: UrlDataFormValues[];
  other_competencies?: DataFormValues;
  skills?: DataFormValues;
  languages?: DataFormValues;
  achievements_recognitions?: DataFormValues;
}

export type SocialDataForm = {
  name?: DataFormValues;
  last_name?: DataFormValues;
  profession?: DataFormValues;
  occupation?: DataFormValues;
  address?: DataFormValues;
  phones?: DataFormValues[];
  emails?: DataFormValues[];
  urls?: UrlDataFormValues[];
};
export type ProfessionalDataForm = {
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
  urls?: UrlDataFormValues[];
  other_competencies?: DataFormValues;
  skills?: DataFormValues;
  languages?: DataFormValues;
  achievements_recognitions?: DataFormValues;
};
export interface DataForm {
  social?: SocialDataForm;
  professional?: ProfessionalDataForm;
}

export interface DataFormSortedArray {
  social: [string, any][];
  professional: [string, any][];
}

export type DataFormValues = {
  label?: string;
  text?: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
  icon?: string;
  order: number;
};

export type EducationDataFormValues = {
  label?: string;
  title: string;
  institution: string;
  year: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
  icon?: string;
  order: number;
};

export type CareerDataFormValues = {
  label?: string;
  company: string;
  position: string;
  data_init: string;
  data_end: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
  icon?: string;
  order: number;
};

export type UrlDataFormValues = {
  label?: string;
  name: string;
  url: string;
  icon: string;
  checked?: boolean;
  principal?: boolean;
  social?: boolean;
  professional?: boolean;
  order: number;
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
  | 'other_competencies'
  | 'skills'
  | 'languages'
  | 'achievements_recognitions'
  | 'phones'
  | 'emails'
  | 'education'
  | 'professional_career'
  | 'urls';

export type EducationSubIndexDataForm = 'title' | 'institution' | 'year';
export type CareerSubIndexDataForm =
  | 'company'
  | 'position'
  | 'data_init'
  | 'data_end';
export type NetworksSubIndexDataForm = 'name' | 'url' | 'icon';
export type handleDataProps = {
  name: string;
  text: string;
  subindex?:
    | EducationSubIndexDataForm
    | CareerSubIndexDataForm
    | NetworksSubIndexDataForm;
  key?: number;
  currentDataRef?: any;
};
export type handleDataNetworksProps = {
  name: string;
  text: string;
  subindex?: NetworksSubIndexDataForm;
  key?: number;
};

export interface ItemFormParams {
  label: string;
  name: IndexDataForm;
  handleSwitch: (e: any) => void;
  handleData: ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => void;
  checked?: boolean;
  icon?: string;
  deleteAction?: boolean;
  handleDeleteData?: ({ name }: { name: string }) => void;
  handleModalAlert?: ({
    index,
    subindex,
  }: {
    index: string;
    subindex: string;
  }) => void;
  value?: string | undefined;
  myValue?: DataFormValues;
  index: IndexDataForm;
  subindex?: number;
  withCheck?: boolean;
  subLabel?:
    | EducationSubIndexDataForm
    | CareerSubIndexDataForm
    | NetworksSubIndexDataForm;
}
