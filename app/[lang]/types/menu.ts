import { Dictionary } from './dictionary';

export type MenuProps = {
  dictionary: Dictionary;
  handleChange: any;
  isChangeData: any;
  setIsAlertSave: any;
  handleMyCount: any;
  value: number;
  children?: React.ReactNode;
};
