import {
  CareerDataFormValues,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
} from '@/types/profile';
import { profile } from 'app/[lang]/initialData/profileInitialData';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Dictionary } from '../../../../../types/dictionary';

const ProfileHook = ({
  dictionary,
  handleDataSet,
  dataForm,
}: {
  dictionary: Dictionary;
  handleDataSet: (e: DataForm) => void;
  dataForm: DataForm;
}) => {
  const [allChecked, setAllChecked] = useState(false);

  const handleSwitch = (value: ChangeEvent<HTMLInputElement>) => {
    const isChecked = value.target.checked;
    const dataFormClone = { ...dataForm };
    const index = value.target.name as keyof typeof dataFormClone;
    if (
      index != 'phones' &&
      index != 'education' &&
      index != 'emails' &&
      index != 'professional_career'
    ) {
      dataFormClone[index]!.checked = isChecked;
      handleDataSet(dataFormClone);
    } else {
      let dataAux = dataFormClone[index];
      dataAux?.map((val) => {
        val.checked = !val.checked;
        handleDataSet(dataFormClone);
      });
    }
  };

  const handleData = ({ name, text }: { name: string; text: string }) => {
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;
    if (
      index != 'phones' &&
      index != 'education' &&
      index != 'emails' &&
      index != 'professional_career'
    ) {
      dataFormClone[index]!.text = text;
      handleDataSet(dataFormClone);
    } else {
      let dataAux = dataFormClone[index];
      dataAux?.map((val) => {
        val.text = text;
        handleDataSet(dataFormClone);
      });
    }
  };

  const handleAddData = (index: keyof typeof dataFormClone) => {
    const dataFormClone = { ...dataForm };
    (index == 'phones' || index === 'emails') &&
      dataFormClone[index]?.push({
        label: 'Teléfono',
        text: '',
        checked: false,
        principal: false,
      });
    index == 'education' &&
      dataFormClone[index]?.push({
        label: 'Correo',
        title: '',
        institution: '',
        year: '',
        checked: false,
        principal: false,
      });
    index == 'professional_career' &&
      dataFormClone[index]?.push({
        company: '',
        position: '',
        data_init: '',
        data_end: '',
        checked: false,
        principal: false,
      });
    handleDataSet(dataFormClone);
  };

  const checkedItems = (
    data: DataFormValues[] | EducationDataFormValues[] | CareerDataFormValues[],
    value: string,
    checked?: boolean,
    label?: string
  ) => {
    data.map((el) => {
      el.checked = checked;
      el.label = label ?? el.label;
    });
    return [value, data];
  };

  const checkedItem = (
    data: DataFormValues,
    value: string,
    checked?: boolean,
    label?: string
  ) => {
    data.checked = checked;
    data.label = label ?? data.label;
    return [value, data];
  };

  const validLabel = useCallback(
    (key: string) => {
      let label = '';
      switch (key) {
        case 'name':
          label = dictionary.profileView.labelFirstName;
          break;
        case 'last_name':
          label = dictionary.profileView.labelLastName;
          break;
        case 'profession':
          label = dictionary.profileView.labelProfession;
          break;
        case 'occupation':
          label = dictionary.profileView.labelOccupation;
          break;
        case 'address':
          label = dictionary.profileView.labelAddress;
          break;
        case 'company':
          label = dictionary.profileView.labelCompany;
          break;
        case 'position':
          label = dictionary.profileView.labelPosition;
          break;
        case 'professional_profile':
          label = dictionary.profileView.labelProfessionalProfile;
          break;
        case 'other_competencies':
          label = dictionary.profileView.labelOtherCompetencies;
          break;
        case 'skills':
          label = dictionary.profileView.labelSkills;
          break;
        case 'languages':
          label = dictionary.profileView.labelLanguages;
          break;
        case 'achievements_recognitions':
          label = dictionary.profileView.labelRecognitions;
          break;
      }
      return label;
    },
    [dictionary]
  );

  const handleSwitchAll = (value: ChangeEvent<HTMLInputElement>) => {
    const isChecked = value.target.checked;
    const dataFormClone = { ...dataForm };
    const items = Object.entries(dataFormClone);

    const newData = items.map((value) => {
      if (value[0] == 'phones' || value[0] == 'emails') {
        const data = value[1] as DataFormValues[];
        return checkedItems(data, value[0], isChecked);
      } else if (value[0] == 'education') {
        const data = value[1] as EducationDataFormValues[];
        return checkedItems(data, value[0], isChecked);
      } else if (value[0] == 'professional_career') {
        const data = value[1] as CareerDataFormValues[];
        return checkedItems(data, value[0], isChecked);
      } else {
        const data = value[1] as DataFormValues;
        return checkedItem(data, value[0], isChecked);
      }
    });

    const dataFormChecked = Object.fromEntries(newData);
    handleDataSet(dataFormChecked);
    setAllChecked(true);
  };

  useEffect(() => {
    if (dataForm?.name?.label == '') {
      const dataFormClone = { ...dataForm };
      const items = Object.entries(dataFormClone);
      const newData = items.map((value) => {
        if (value[0] == 'phones') {
          const data = value[1] as DataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            dictionary.profileView.labelPhone
          );
        } else if (value[0] == 'emails') {
          const data = value[1] as DataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            dictionary.profileView.labelEmail
          );
        } else if (value[0] == 'education') {
          const data = value[1] as EducationDataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            dictionary.profileView.labelEducation
          );
        } else if (value[0] == 'professional_career') {
          const data = value[1] as CareerDataFormValues[];
          return checkedItems(
            data,
            value[0],
            false,
            dictionary.profileView.labelProfession
          );
        } else {
          const data = value[1] as DataFormValues;
          const label = validLabel(value[0]);
          return checkedItem(data, value[0], false, label);
        }
      });
      const dataFormChecked = Object.fromEntries(newData);
      handleDataSet(dataFormChecked);
    }
  }, [dataForm, dictionary, handleDataSet, validLabel]);

  useEffect(() => {
    if (allChecked && dataForm) {
      const dataFormClone = { ...dataForm };
      handleDataSet(dataFormClone);
      setAllChecked(false);
    }
  }, [allChecked, dataForm, handleDataSet]);

  return {
    handleSwitch,
    handleData,
    handleAddData,
    handleSwitchAll,
    data: dataForm && Object.entries(dataForm),
  };
};

export default ProfileHook;
