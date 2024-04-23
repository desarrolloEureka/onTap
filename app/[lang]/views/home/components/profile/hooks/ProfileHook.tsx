import { validateEmail, validatePhoneNumber } from '@/globals/validateData';
import { GetUser, SendDataUserProfile } from '@/reactQuery/users';
import {
  CareerDataFormValues,
  DataFormSorted,
  DataFormValues,
  EducationDataFormValues,
  IndexDataForm,
  NetworksSubIndexDataForm,
  ProfessionalDataForm,
  SocialDataForm,
  UrlDataFormValues,
  handleDataNetworksProps,
  handleDataProps,
} from '@/types/profile';
import { profile } from 'app/[lang]/initialData/profileInitialData';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Dictionary } from '../../../../../types/dictionary';

const ProfileHook = ({
  dictionary,
  handleDataSet,
  isProUser,
}: {
  dictionary: Dictionary;
  handleDataSet?: (e: SocialDataForm) => void;
  isProUser: boolean;
}) => {
  const { data, error } = GetUser();
  const [dataForm, setDataForm] = useState<SocialDataForm>(profile.social);
  const [objectDataSort, setObjectDataSort] = useState<[string, any][]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [isModalAlertLimit, setIsModalAlertLimit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isSuccessDelete, setSuccessDelete] = useState(false);
  const [isModalIcons, setModalIcons] = useState(false);
  const [itemUrlSelected, setItemUrlSelected] = useState([]);
  const [itemUrlKey, setItemUrlKey] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(0);
  const [isAlertSave, setIsAlertSave] = useState(false);
  const [isAlertEmptyData, setIsEmptyData] = useState(false);

  /* Delete items */
  const [itemDelete, setItemDelete] = useState<
    { index: string; subindex: string } | {}
  >();

  const [isDataSuccess, setIsDataSuccess] = useState(false);
  const [isDataError, setIsDataError] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [noDeleted, setNoDeleted] = useState(false);
  const [isEmailPhoneRight, setisEmailPhoneRight] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [flag, setFlag] = useState(false);

  const handleSendProfile = async (isProUser: boolean) => {
    const userId = data?.uid;
    const emails = dataForm?.emails?.map((email) => email.text);
    const phones = dataForm?.phones?.map((phone) => phone.text);
    const urls = dataForm?.urls?.map((urls) => urls);
    /*  if (emails) {
       const isEmailValid = emails.every((email) =>
         validateEmail(email as string)
       );
       if (!isEmailValid) {
         setStatus(dictionary.profileView.errorEmail);
         setisEmailPhoneRight(true);
         return;
       }
     } 
     if (phones) {
       const isPhoneValid = phones.every((phone) =>
         validatePhoneNumber(phone as string)
       );
       if (!isPhoneValid) {
         setStatus(dictionary.profileView.errorPhone);
         setisEmailPhoneRight(true);
         return;
       }
     }
 
     if (urls) {
       const allObjectsFilled = dataForm?.urls?.every(
         (obj) => obj.name !== '' && obj.url !== '' && obj.icon !== ''
       );
       if (!allObjectsFilled) {
         setStatus(dictionary.profileView.errorEmptyUrl);
         setisEmailPhoneRight(true);
         return;
       }
     }
     */

    if (userId) {
      const isSendDataProfile = await SendDataUserProfile(
        userId,
        dataForm,
        isProUser
      );
      if (isSendDataProfile?.success) {
        setIsDataError(false);
        setIsDataSuccess(true);
      } else {
        setIsDataError(true);
        setIsDataSuccess(false);
      }
    }
  };

  const handleModalAlertLimit = () => {
    setIsModalAlertLimit(!isModalAlertLimit);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalAlert = (itemDelete: {
    index: string;
    subindex: string;
  }) => {
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

  const handleModalIcons = (item: any, key: any) => {
    setItemUrlSelected(item ? item : []);
    setItemUrlKey(key);
    setModalIcons(!isModalIcons);
  };

  const handleModalAux = () => {
    setIsModalAlert(!isModalAlert);
    setNoDeleted(!noDeleted);
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
    setIsAlertSave(true);
    const isChecked = value?.target?.checked;
    const dataFormClone = { ...dataForm };
    const index = value?.target?.name as keyof typeof dataFormClone;

    if (
      index != 'phones' &&
      index != 'emails' &&
      index != 'urls' &&
      (dataFormClone[index]?.label != 'phones' ||
        dataFormClone[index]?.label != 'education' ||
        dataFormClone[index]?.label != 'emails' ||
        dataFormClone[index]?.label != 'professional_career' ||
        dataFormClone[index]?.label != 'urls')
    ) {
      if (dataFormClone[index]?.text?.length === 0 && isChecked === true) {
        setIsEmptyData(true);
      } else {
        dataFormClone[index]!.checked = isChecked;
        setDataForm(dataFormClone);
      }


    } else {
      let dataAux = dataFormClone[index] as DataFormValues[];
      let dataUrl = dataFormClone[index] as UrlDataFormValues[];

      if (dataAux && key != undefined) {
        if (isChecked === true && dataAux[key]) {
          const isEmptyText = dataAux[key].text?.length === 0 && index !== 'urls';
          const isEmptyUrls = index === 'urls' && (dataUrl[key]?.name?.length === 0 || dataUrl[key]?.url?.length === 0 || dataUrl[key]?.icon?.length === 0);

          if (isEmptyText || isEmptyUrls) {
            setIsEmptyData(true);
          } else {
            dataAux[key].checked = isChecked;
            currentDataRef.current.length > 0 &&
              (currentDataRef.current[key].checked = isChecked);
            setDataForm(dataFormClone);
          }
        } else {
          dataAux[key].checked = isChecked;
          currentDataRef.current.length > 0 &&
            (currentDataRef.current[key].checked = isChecked);
          setDataForm(dataFormClone);
        }
      }
    }

    setTimeout(() => {
      setIsAlertSave(false);
    }, 5000);
  };

  const fillFields = (
    index: IndexDataForm,
    key: number,
    text: string,
    subindexUrl?: NetworksSubIndexDataForm
  ) => {
    const dataFormClone = { ...dataForm };
    dataFormClone &&
      index == 'urls' &&
      subindexUrl &&
      (dataFormClone[index]![key][subindexUrl] = text);

    setDataForm(dataFormClone);
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
    key != undefined && subindex && fillFields(index, key, text, subindex);
    setTimeout(() => {
      setModalIcons(!isModalIcons);
    }, 500);
  };

  const handleData = ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => {
    // console.log('sssss', dataForm);
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;
    if (
      index == 'name' ||
      index == 'last_name' ||
      index == 'profession' ||
      index == 'occupation' ||
      index == 'address'
    ) {
      // console.log('currentDataRef', dataFormClone);
      dataFormClone[index]!.text = text;
      currentDataRef.current.text = text;
      // console.log('dataFormClone', dataFormClone);

      setDataForm(dataFormClone);
      setIsDataLoad(true);
    } else {
      if (index == 'phones' || index == 'emails') {
        const dataAux = dataFormClone[index];
        // console.log('currentDataRef', currentDataRef);
        if (dataAux && key != undefined) {
          dataAux[key].text = text;
          currentDataRef.current.length > 0 &&
            (currentDataRef.current[key].text = text);
          dataAux && setDataForm(dataFormClone);
        }
        setIsDataLoad(true);
      } else if (
        index == 'urls' &&
        (subindex == 'name' || subindex == 'url' || subindex == 'icon') &&
        key != undefined
      ) {
        // console.log('key', key);
        // console.log('subindex', subindex);
        // console.log('currentDataRef', currentDataRef);

        currentDataRef.current[key][subindex] = text;
        fillFields(index, key, text, subindex);
      }
    }
  };

  const handleDeleteData = () => {
    setIsDataLoad(false);
    const index =
      itemDelete && 'index' in itemDelete ? itemDelete['index'] : undefined;
    const subindex =
      itemDelete && 'subindex' in itemDelete
        ? itemDelete['subindex']
        : undefined;
    const dataFormClone = { ...dataForm };
    const dataAux: any = dataFormClone[index as keyof typeof dataForm];
    if (
      dataAux?.length > 1 &&
      Array.isArray(dataAux) &&
      subindex !== undefined
    ) {
      dataAux.splice(parseInt(subindex, 10), 1); // Elimina el elemento en la posición subindex
      setDataForm(dataFormClone);

      setTimeout(() => {
        setIsModalAlert(false);
        setSuccessDelete(true);
      }, 500);
    } else {
      setNoDeleted(true);
    }
  };

  const handleAddData = (index: string) => {
    const dataFormClone = { ...dataForm };
    // console.log('index social', index);
    if (index == 'phones' || index == 'emails' || index == 'urls') {
      /* const countProfessional = dataFormClone[index]?.filter(
        (item: any) => item.professional
      ).length;
      const countSocial = dataFormClone[index]?.filter(
        (item: any) => item.social
      ).length;
      const count = social ? countSocial : countProfessional; */

      const count = dataFormClone?.[index]?.length;

      // console.log('count', count);

      if (index === 'phones') {
        if ((count != null || count != undefined) && count < 3) {
          if (count === 0) {
            dataFormClone.phones = [
              {
                label: dictionary.profileView.labelPhone,
                text: '',
                checked: false,
                principal: false,
                social: true,
                professional: true,
                icon: 'LocalPhoneOutlinedIcon',
                order: 9,
              },
            ];
          } else {
            dataFormClone[index]?.unshift({
              label: dataFormClone[index]![0].label,
              text: '',
              checked: false,
              principal: false,
              social: true,
              professional: true,
              icon: 'LocalPhoneOutlinedIcon',
              order: 9,
            });
          }
        } else {
          setIsModalAlertLimit(true);
        }
      }

      // console.log('dataFormClone ', dataFormClone);

      if (index === 'emails') {
        if ((count != null || count != undefined) && count < 3) {
          if (count === 0) {
            dataFormClone.phones = [
              {
                label: dictionary.profileView.labelEmail,
                text: '',
                checked: false,
                principal: false,
                social: true,
                professional: true,
                icon: 'EmailOutlinedIcon',
                order: 10,
              },
            ];
          } else {
            dataFormClone[index]?.unshift({
              label: dataFormClone[index]![0].label,
              text: '',
              checked: false,
              principal: false,
              social: true,
              professional: true,
              icon: 'EmailOutlinedIcon',
              order: 10,
            });
          }
        } else {
          setIsModalAlertLimit(true);
        }
      }
      if (index === 'urls') {
        //if ((count != null || count != undefined) && count < 3) {
        if (count === 0) {
          dataFormClone.urls = [
            {
              label: 'urls',
              name: '',
              url: '',
              icon: '',
              checked: false,
              principal: false,
              social: true,
              professional: true,
              order: 13,
            },
          ];
        } else {
          dataFormClone[index]?.unshift({
            label: dataFormClone[index]![0].label,
            name: '',
            url: '',
            icon: '',
            checked: false,
            principal: false,
            social: true,
            professional: true,
            order: 13,
          });
        }
        /*  } else {
           setIsModalAlertLimit(true);
         } */
      }

      // console.log('dataFormClone', dataFormClone);

      setDataForm(dataFormClone);
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
    setIsAlertSave(true);
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

    setTimeout(() => {
      setIsAlertSave(false);
    }, 5000);
  };

  // console.log('isProUser', isProUser);
  useEffect(() => {
    const data = Object.entries(dataForm as DataFormSorted).toSorted((a, b) => {
      const aa = a[1].length ? a[1][0].order : a[1].order;
      const bb = b[1].length ? b[1][0].order : b[1].order;
      return aa - bb;
    });
    setObjectDataSort(data);
  }, [dataForm, isProUser]);

  useEffect(() => {
    //this flag rerender the main component to show the data on fields
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 1000);
  }, [dataForm]);

  useEffect(() => {
    let myDataForm = null;
    if (data?.profile) {
      myDataForm = data.profile.social ?? profile.social;
    } else {
      myDataForm = profile.social;
    }
    myDataForm && setDataForm(myDataForm);
  }, [data, isProUser]);

  useEffect(() => {
    if (dataForm.name?.label == '') {
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
            dictionary.profileView.labelProfessionalCareer
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

  // objectDataSort && console.log('ooooo', objectDataSort);
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
    noDeleted,
    isModalIcons,
    setModalIcons,
    handleModalIcons,
    itemUrlSelected,
    itemUrlKey,
    status,
    isEmailPhoneRight,
    setisEmailPhoneRight,
    isAlertSave,
    isAlertEmptyData,
    setIsEmptyData
  };
};

export default ProfileHook;
