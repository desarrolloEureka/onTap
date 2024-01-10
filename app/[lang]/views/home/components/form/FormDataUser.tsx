'use client';
import { FormGroup } from '@mui/material';
import { Dictionary } from '@/types/dictionary';
import {
  CareerDataFormValues,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
} from '@/types/profile';
import ItemForm from '../profile/ItemForm';
import TextAreaForm from '../profile/TextAreaForm';
import ProfileHook from '../profile/hooks/ProfileHook';
import { useRef } from 'react';

interface PhoneData {
  [key: string]: { text: string; checked: boolean };
}

let currentValue = undefined;
let myValue = undefined;
let newValue = undefined;

const FormDataUser = ({
  isProUser,
  dictionary,
  handleDataSet,
  dataForm,
}: {
  isProUser: boolean;
  dictionary: Dictionary;
  dataForm: DataForm;
  handleDataSet: (e: DataForm) => void;
}) => {
  // const dataRef = null as any;
  const { handleSwitch, handleData, data, user, isDataLoad } = ProfileHook({
    dictionary,
    dataForm,
    handleDataSet,
  });
  // dataForm && console.log('data', data);
  // dataForm && console.log('dataForm', dataForm);
  // console.log('dataUser', user);

  console.log('dataRef');

  return (
    <div className='tw-h-auto lg:tw-w-[50%] md:tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-mt-6'>
      <div className='tw-h-[100%] tw-w-full tw-flex tw-flex-col'>
        <FormGroup sx={{ m: 1, mt: 1 }}>
          {data.map((value, key) => {
            const index = value[0] as keyof typeof dataForm;
            const labelArray:
              | DataFormValues[]
              | EducationDataFormValues[]
              | CareerDataFormValues[] =
              value[0] == 'phones' ||
              value[0] == 'education' ||
              value[0] == 'emails' ||
              value[0] == 'urls' ||
              value[0] == 'professional_career'
                ? value[1]
                : null;

            if (!labelArray) {
              if (isProUser) {
                if (
                  value[0] == 'professional_profile' ||
                  value[0] == 'other_competencies' ||
                  value[0] == 'skills' ||
                  value[0] == 'languages' ||
                  value[0] == 'achievements_recognitions'
                ) {
                  // console.log('value[0]', value[0]);
                  // console.log('text', index);

                  const myValue =
                    user && index == value[0]
                      ? user.profile[index]?.text
                      : undefined;
                  // console.log('oooooo', myValue);
                  return (
                    <TextAreaForm
                      label={value[1].label}
                      handleSwitch={(e: any) => handleSwitch(e)}
                      handleData={handleData}
                      name={index}
                      checked={value[1].checked}
                      key={key}
                      icon={value[1].icon}
                      value={myValue}
                    />
                  );
                } else {
                  const myValue = (user && index == value[0]
                    ? user.profile[index]
                    : undefined) as unknown as DataFormValues;
                  return (
                    <ItemForm
                      label={value[1].label}
                      handleSwitch={(e: any) => handleSwitch(e)}
                      handleData={handleData}
                      name={index}
                      checked={value[1].checked}
                      key={key}
                      icon={value[1].icon}
                      value={value[1].text}
                      myValue={myValue}
                    />
                  );
                }
                // return value[0] == 'professional_profile' ||
                //   value[0] == 'other_competencies' ||
                //   value[0] == 'skills' ||
                //   value[0] == 'languages' ||
                //   value[0] == 'achievements_recognitions' ? (
                //   <TextAreaForm
                //     label={value[1].label}
                //     handleSwitch={(e: any) => handleSwitch(e)}
                //     handleData={handleData}
                //     name={index}
                //     checked={value[1].checked}
                //     key={key}
                //     icon={value[1].icon}
                //     value={myValue ?? ''}
                //   />
                // ) : (
                //   <ItemForm
                //     label={value[1].label}
                //     handleSwitch={(e: any) => handleSwitch(e)}
                //     handleData={handleData}
                //     name={index}
                //     checked={value[1].checked}
                //     key={key}
                //     icon={value[1].icon}
                //     value={value[1].text}
                //   />
                // );
              } else {
                // console.log('value[0]', value[0]);
                // console.log('text', index);
                // const myValue = (index == value[0]
                //   ? dataForm[index]
                //   : undefined) as unknown as DataFormValues;

                const myValue = (user && index == value[0]
                  ? user.profile[index]
                  : undefined) as unknown as DataFormValues;
                // dataRef.current = myValue;

                // const newValue =
                //   dataRef.current.text != '' &&
                //   dataRef.current.text != myValue.text
                //     ? dataRef.current.text
                //     : !isDataLoad
                //     ? myValue.text
                //     : dataRef?.current?.text;
                // console.log('index', index);

                // console.log('currentValue', dataRef.current);

                // console.log('myValue', myValue);
                return value[1].social == true ? (
                  <ItemForm
                    label={value[1].label}
                    handleSwitch={(e: any) => handleSwitch(e)}
                    handleData={handleData}
                    name={index}
                    checked={value[1].checked}
                    key={key}
                    icon={value[1].icon}
                    myValue={myValue}
                  />
                ) : null;
              }
            }
          })}
        </FormGroup>
      </div>
    </div>
  );
};

export default FormDataUser;
