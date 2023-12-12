import { Dictionary } from './dictionary';

export type MenuProps = {
  dictionary: Dictionary;
  handleChange: any;
  value: number;
  children?: React.ReactNode;
};
