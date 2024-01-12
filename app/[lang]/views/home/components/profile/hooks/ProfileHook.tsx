import {
  CareerDataFormValues,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
  IndexDataForm,
  EducationSubIndexDataForm,
  CareerSubIndexDataForm,
  UrlDataFormValues,
  handleDataProps,
  handleDataNetworksProps,
  NetworksSubIndexDataForm,
} from '@/types/profile';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Dictionary } from '../../../../../types/dictionary';
import {
  GetUser,
  SendDataUserProfile,
  SendSwitchAllForm,
} from '@/reactQuery/users';

const ProfileHook = ({
  dictionary,
  dataForm,
  setDataForm,
  handleDataSet,
}: {
  dictionary: Dictionary;
  dataForm: DataForm;
  setDataForm?: (e: DataForm) => void;
  handleDataSet?: (e: DataForm) => void;
}) => {
  const { data, error } = GetUser();
  const [allChecked, setAllChecked] = useState(false);
  const [isModalAlertLimit, setIsModalAlertLimit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(0);
  const [itemDelete, setItemDelete] = useState('');
  const [isDataSuccess, setIsDataSuccess] = useState(false);
  const [isDataError, setIsDataError] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);

  // const handleDataSet = useCallback(
  //   (data: DataForm) => {
  //     if (setDataForm) setDataForm(data);
  //   },
  //   [setDataForm]
  // );

  const handleSendSwitchAll = async () => {
    const userId = data?.uid;
    const resultArray: { [x: string]: { checked: any } }[] = [];

    Object.entries(dataForm).forEach(([propiedad, valor]) => {
      if (Array.isArray(valor)) {
        // Si es un array
        const arrayData = [];
        valor.forEach((elemento, index) => {
          ///console.log(`${propiedad}[${index}]: ${elemento.checked}`);
          resultArray.push({ [propiedad]: { checked: elemento.checked } });
        });
      } else if (
        typeof valor === 'object' &&
        valor !== null &&
        'checked' in valor
      ) {
        resultArray.push({ [propiedad]: { checked: valor.checked } });
      }
    });
    //console.log("resultArray ", resultArray);

    userId && (await SendSwitchAllForm(userId, resultArray));
  };

  const handleSendProfile = async () => {
    const userId = data?.uid;
    if (userId) {
      const isSendDataProfile = await SendDataUserProfile(userId, dataForm);
      console.log('isSendDataProfile', isSendDataProfile);
      if (isSendDataProfile?.success) {
        setIsDataError(false);
        setIsDataSuccess(true);
      } else {
        setIsDataError(true);
        setIsDataSuccess(false);
      }
    }
  };

  const handleModalAlertLimit = (isOpen: boolean) => {
    setIsModalAlertLimit(isOpen);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalAlert = (name: string) => {
    if (!isModalAlert) {
      setItemDelete(name);
    } else {
      setItemDelete('');
    }

    setIsModalAlert(!isModalAlert);
  };

  const handleModalAux = () => {
    setIsModalAlert(!isModalAlert);
  };

  const handleSeeMore = (numItem: number) => {
    if (itemDetail != 0) {
      setItemDetail(0);
    } else {
      setItemDetail(numItem);
    }
  };

  const handleSwitch = (value: ChangeEvent<HTMLInputElement>) => {
    const isChecked = value.target.checked;
    const dataFormClone = { ...dataForm };
    const index = value.target.name as keyof typeof dataFormClone;
    if (
      index != 'phones' &&
      index != 'education' &&
      index != 'emails' &&
      index != 'professional_career' &&
      index != 'urls'
    ) {
      console.log('if');

      dataFormClone[index]!.checked = isChecked;
      handleDataSet && handleDataSet(dataFormClone);
    } else {
      console.log('else');

      let dataAux = dataFormClone[index];
      dataAux?.map((val) => {
        val.checked = !val.checked;
        handleDataSet && handleDataSet(dataFormClone);
      });
    }
  };

  const fillFields = (
    index: IndexDataForm,
    key: number,
    text: string,
    subindexEducation?: EducationSubIndexDataForm,
    subindexCareer?: CareerSubIndexDataForm,
    subindexUrl?: NetworksSubIndexDataForm
  ) => {
    const dataFormClone = { ...dataForm };
    dataFormClone && index == 'education' && subindexEducation
      ? (dataFormClone[index]![key][subindexEducation] = text)
      : index == 'professional_career'
      ? subindexCareer && (dataFormClone[index]![key][subindexCareer] = text)
      : index == 'urls' &&
        subindexUrl &&
        (dataFormClone[index]![key][subindexUrl] = text);

    handleDataSet && handleDataSet(dataFormClone);
    setIsDataLoad(true);
  };

  const handleDataNetworks = ({
    name,
    text,
    subindex,
    key,
  }: handleDataNetworksProps) => {
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;
    key != undefined &&
      subindex &&
      fillFields(index, key, text, undefined, undefined, subindex);
  };

  const handleData = ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => {
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;
    if (
      index != 'phones' &&
      index != 'education' &&
      index != 'emails' &&
      index != 'urls' &&
      index != 'professional_career'
    ) {
      console.log('index', index);

      dataFormClone[index]!.text = text;
      console.log('currentDataRef>>>', currentDataRef.current);
      currentDataRef.current.text = text;
      // if (
      //   index != 'professional_profile' &&
      //   index != 'other_competencies' &&
      //   index != 'skills' &&
      //   index != 'languages' &&
      //   index != 'achievements_recognitions' &&
      //   dataRef.current
      // ) {
      //   console.log('uuuuuuuuu');

      //   dataRef.current.text = text;
      // }
      handleDataSet && handleDataSet(dataFormClone);
      setIsDataLoad(true);
    } else {
      if (index == 'phones' || index == 'emails') {
        const dataAux = dataFormClone[index];
        dataAux?.map((val) => {
          val.text = text;
          handleDataSet && handleDataSet(dataFormClone);
        });
        setIsDataLoad(true);
      } else if (
        index == 'education' &&
        (subindex == 'title' ||
          subindex == 'year' ||
          subindex == 'institution') &&
        key != undefined
      ) {
        fillFields(index, key, text, subindex);
      } else if (
        index == 'professional_career' &&
        (subindex == 'company' ||
          subindex == 'data_end' ||
          subindex == 'data_init' ||
          subindex == 'position') &&
        key != undefined
      ) {
        fillFields(index, key, text, undefined, subindex);
      }
    }
  };

  const handleDeleteData = ({ name }: { name: string }) => {
    // console.log('handleDeleteData --->  ', name);
    /*    const dataFormClone = { ...dataForm };
       const index = name as keyof typeof dataFormClone;
   
       if (index == 'phones' || index == 'emails') {
         console.log("Eliminar phone / email");
       } */
  };

  const handleAddData = (index: keyof typeof dataForm, social: boolean) => {
    const dataFormClone = { ...dataForm };

    if (
      index == 'phones' ||
      index == 'education' ||
      index == 'emails' ||
      index == 'urls' ||
      index == 'professional_career'
    ) {
      const countProfessional = dataFormClone[index]?.filter(
        (item: any) => item.professional
      ).length;
      const countSocial = dataFormClone[index]?.filter(
        (item: any) => item.social
      ).length;
      const count = social ? countSocial : countProfessional;

      if (index === 'phones') {
        if (count && count < 3) {
          dataFormClone[index]?.push({
            label: dataFormClone[index]![0].label,
            text: '',
            checked: false,
            principal: false,
            social: social,
            professional: !social,
            icon: 'LocalPhoneOutlinedIcon',
          });
        }
      }
      if (index === 'emails') {
        if (count && count < 3) {
          dataFormClone[index]?.push({
            label: dataFormClone[index]![0].label,
            text: '',
            checked: false,
            principal: false,
            social: social,
            professional: !social,
            icon: 'EmailOutlinedIcon',
          });
        }
      }
      if (index === 'education') {
        if (count && count < 3) {
          dataFormClone[index]?.push({
            label: dataFormClone[index]![0].label,
            title: '',
            institution: '',
            year: '',
            checked: false,
            principal: false,
            social: social,
            professional: !social,
            icon: '',
          });
        }
      }
      if (index === 'professional_career') {
        if (count && count < 3) {
          dataFormClone[index]?.push({
            label: dataFormClone[index]![0].label,
            company: '',
            position: '',
            data_init: '',
            data_end: '',
            checked: false,
            principal: false,
            social: social,
            professional: !social,
            icon: '',
          });
        }
      }
      if (index === 'urls') {
        if (count && count < 3) {
          dataFormClone[index]?.push({
            label: dataFormClone[index]![0].label,
            name: '',
            url: '',
            icon: '',
            checked: false,
            principal: false,
            social: social,
            professional: !social,
          });
        }
      }
      if (count && count >= 3) {
        handleModalAlertLimit(true);
      }

      handleDataSet && handleDataSet(dataFormClone);
    }
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

  const handleSwitchAll = (val: ChangeEvent<HTMLInputElement>) => {
    const isChecked = val.target.checked;
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
      } else if (value[0] == 'urls') {
        const data = value[1] as UrlDataFormValues[];
        return checkedItems(data, value[0], isChecked);
      } else {
        const data = value[1] as DataFormValues;
        return checkedItem(data, value[0], isChecked);
      }
    });

    const dataFormChecked = Object.fromEntries(newData);
    handleDataSet && handleDataSet(dataFormChecked);
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
        } else if (value[0] == 'urls') {
          const data = value[1] as UrlDataFormValues[];
          return checkedItems(data, value[0], false, 'urls');
        } else {
          const data = value[1] as DataFormValues;
          const label = validLabel(value[0]);
          return checkedItem(data, value[0], false, label);
        }
      });
      const dataFormChecked = Object.fromEntries(newData);
      handleDataSet && handleDataSet(dataFormChecked);
    }
  }, [dataForm, dictionary, handleDataSet, validLabel]);

  useEffect(() => {
    if (allChecked && dataForm) {
      const dataFormClone = { ...dataForm };
      handleDataSet && handleDataSet(dataFormClone);
      setAllChecked(false);
    }
  }, [allChecked, dataForm, handleDataSet]);

  return {
    handleSwitch,
    handleData,
    handleDataNetworks,
    handleAddData,
    handleSwitchAll,
    data: dataForm && Object.entries(dataForm),
    handleDeleteData,
    handleModalAux,
    handleModal,
    handleModalAlert,
    handleSeeMore,
    isDetailOpen,
    itemDetail,
    isModalOpen,
    isModalAlert,
    itemDelete,
    isModalAlertLimit,
    handleModalAlertLimit,
    handleSendSwitchAll,
    handleSendProfile,
    isDataSuccess,
    setIsDataSuccess,
    isDataError,
    setIsDataError,
    user: data,
    isDataLoad,
  };
};

export default ProfileHook;
