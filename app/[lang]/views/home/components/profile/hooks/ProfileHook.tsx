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
import { profile } from 'app/[lang]/initialData/profileInitialData';
import { GetUser, SendDataUserProfile } from '@/reactQuery/users';

const ProfileHook = ({
  dictionary,
  handleDataSet,
}: {
  dictionary: Dictionary;
  handleDataSet?: (e: DataForm) => void;
}) => {
  const { data, error } = GetUser();
  const dataProfile = data?.profile as DataForm;
  const [dataForm, setDataForm] = useState<DataForm>(
    data ? dataProfile : (profile as DataForm)
  );

  const objectDataSort = Object.entries(dataForm).toSorted((a, b) => {
    // if (
    //   a[0] == 'urls' ||
    //   a[0] == 'emails' ||
    //   a[0] == 'professional_career' ||
    //   a[0] == 'education' ||
    //   a[0] == 'phones'
    // ) {
    //   if (Array.isArray(b[1])) {
    //     if (a[1][0].order > b[1][0].order) {
    //       return 1;
    //     }
    //     if (a[1][0].order < b[1][0].order) {
    //       return -1;
    //     }
    //   }
    // } else {
    //   console.log('b[1]', b[1]);

    //   console.log('a ' + a[1].order + ' >  b ' + b[1].order);

    //   if (a[1].order > b[1].order) {
    //     return 1;
    //   }
    //   if (a[1].order < b[1].order) {
    //     return -1;
    //   }
    // }
    if (!Array.isArray(a[1]) && !Array.isArray(b[1])) {
      //console.log('a[1].count', a[1].order);
      //console.log('b[1].count', b[1].order);
      // console.log('b[1]', b[1]);
      const data = a[1].order - b[1].order;
      //console.log('data 2', data);

      return data;
    } else if (Array.isArray(a[1]) && Array.isArray(b[1])) {
      //console.log('a[1][0].count', a[1][0].order);
      //console.log('b[1][0].count', b[1][0].order);
      const data = a[1][0]?.order - b[1][0]?.order;
      // console.log('data 1', data);

      return data;
    }
    return 0;
  });

  const [allChecked, setAllChecked] = useState(false);
  const [isModalAlertLimit, setIsModalAlertLimit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isSuccessDelete, setSuccessDelete] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(0);
  /* Delete items */
  //const [itemDelete, setItemDelete] = useState<"index" | "subindex" | ''>();
  const [itemDelete, setItemDelete] = useState<
    { index: string; subindex: string } | {}
  >();

  const [isDataSuccess, setIsDataSuccess] = useState(false);
  const [isDataError, setIsDataError] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);

  const handleSendProfile = async () => {
    const userId = data?.uid;
    if (userId) {
      const isSendDataProfile = await SendDataUserProfile(userId, dataForm);
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

  const handleModalAlert = (itemDelete: {
    index: string;
    subindex: string;
  }) => {
    console.log('itemDelete ', itemDelete);
    if (!isModalAlert) {
      setItemDelete(itemDelete);
    } else {
      setItemDelete('');
    }
    setIsModalAlert(!isModalAlert);
  };

  const handleSuccessDelete = () => {
    setSuccessDelete(!isSuccessDelete);
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

  const handleSwitch = ({
    value,
    currentDataRef,
    key,
  }: {
    value: ChangeEvent<HTMLInputElement>;
    currentDataRef?: any;
    key?: number;
  }) => {
    const isChecked = value?.target?.checked;
    const dataFormClone = { ...dataForm };
    const index = value?.target?.name as keyof typeof dataFormClone;
    if (
      index != 'phones' &&
      index != 'education' &&
      index != 'emails' &&
      index != 'professional_career' &&
      index != 'urls' &&
      (dataFormClone[index]?.label != 'phones' ||
        dataFormClone[index]?.label != 'education' ||
        dataFormClone[index]?.label != 'emails' ||
        dataFormClone[index]?.label != 'professional_career' ||
        dataFormClone[index]?.label != 'urls')
    ) {
      // console.log('dataFormClone', dataFormClone[index]);

      dataFormClone[index]!.checked = isChecked;
      handleDataSet && handleDataSet(dataFormClone);
    } else {
      let dataAux = dataFormClone[index] as DataFormValues[];
      console.log('dataAux', dataAux);
      console.log('index', index);
      console.log('key', key);

      if (
        dataAux &&
        key != undefined
        // dataAux[index]?.label == 'phones' &&
        // dataAux[index]?.label == 'education' &&
        // dataAux[index]?.label == 'emails' &&
        // dataAux[index]?.label == 'professional_career' &&
        // dataAux[index]?.label == 'urls'
      ) {
        dataAux[key].checked = isChecked;
        currentDataRef.current[key].checked = isChecked;
        handleDataSet && handleDataSet(dataFormClone);
      }
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
      dataFormClone[index]!.text = text;
      currentDataRef.current.text = text;
      handleDataSet && handleDataSet(dataFormClone);
      setIsDataLoad(true);
    } else {
      if (index == 'phones' || index == 'emails') {
        const dataAux = dataFormClone[index];
        if (dataAux && key != undefined) {
          dataAux[key].text = text;
          currentDataRef.current[key].text = text;
          dataAux && handleDataSet && handleDataSet(dataFormClone);
        }
        setIsDataLoad(true);
      } else if (
        index == 'education' &&
        (subindex == 'title' ||
          subindex == 'year' ||
          subindex == 'institution') &&
        key != undefined
      ) {
        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, subindex);
      } else if (
        index == 'professional_career' &&
        (subindex == 'company' ||
          subindex == 'data_end' ||
          subindex == 'data_init' ||
          subindex == 'position') &&
        key != undefined
      ) {
        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, undefined, subindex);
      } else if (
        index == 'urls' &&
        (subindex == 'name' || subindex == 'url' || subindex == 'icon') &&
        key != undefined
      ) {
        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, undefined, undefined, subindex);
      }
    }
  };

  const handleDeleteData = () => {
    setIsDataLoad(false);
    console.log('itemDelete --> ', itemDelete);

    //const index = itemDelete && itemDelete['index'];
    //const subindex = itemDelete && itemDelete['subindex'];

    const index =
      itemDelete && 'index' in itemDelete ? itemDelete['index'] : undefined;
    const subindex =
      itemDelete && 'subindex' in itemDelete
        ? itemDelete['subindex']
        : undefined;
    const dataFormClone = { ...dataForm };
    //const dataAux = dataFormClone[index];// Trae el array de correos , telefonos
    const dataAux = dataFormClone[index as keyof typeof dataForm];

    console.log('dataAux ', dataAux);
    console.log('subindex ', subindex);
    console.log('index ', index);

    if (Array.isArray(dataAux) && subindex !== undefined) {
      dataAux.splice(parseInt(subindex, 10), 1); // Elimina el elemento en la posición subindex
      handleDataSet && handleDataSet(dataFormClone);

      setTimeout(() => {
        setIsModalAlert(false);
        setSuccessDelete(true);
      }, 500);
    }
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
            order: 9,
          });
        } else {
          handleModalAlertLimit(true);
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
            order: 10,
          });
        } else {
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
            order: 11,
          });
        } else {
          handleModalAlertLimit(true);
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
            order: 12,
          });
        } else {
          handleModalAlertLimit(true);
        }
      }
      if (index === 'urls') {
        if (count && count < 9) {
          dataFormClone[index]?.push({
            label: dataFormClone[index]![0].label,
            name: '',
            url: '',
            icon: '',
            checked: false,
            principal: false,
            social: social,
            professional: !social,
            order: 13,
          });
        } else {
          handleModalAlertLimit(true);
        }
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
  //console.log('objectDataSort', objectDataSort);

  return {
    handleSwitch,
    handleData,
    handleDataNetworks,
    handleAddData,
    handleSwitchAll,
    data: objectDataSort,
    handleDeleteData,
    handleModalAux,
    handleModal,
    handleModalAlert,
    handleSuccessDelete,
    handleSeeMore,
    isDetailOpen,
    itemDetail,
    isModalOpen,
    isModalAlert,
    isSuccessDelete,
    itemDelete,
    isModalAlertLimit,
    handleModalAlertLimit,
    handleSendProfile,
    isDataSuccess,
    setIsDataSuccess,
    isDataError,
    setIsDataError,
    user: data,
    isDataLoad,
    dataForm,
    setDataForm,
  };
};

export default ProfileHook;
