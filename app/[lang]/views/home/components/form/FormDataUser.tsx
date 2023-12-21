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

interface PhoneData {
  [key: string]: { text: string; checked: boolean };
}

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
  const { handleSwitch, handleData, handleAddData, data } = ProfileHook({
    dictionary,
    dataForm,
    handleDataSet,
  });
  // <Button onClick={() => handleAddData('phones')}>phone</Button>
  //       <Button onClick={() => handleAddData('emails')}>email</Button>
  //       <Button onClick={() => handleAddData('education')}>education</Button>
  //       <Button onClick={() => handleAddData('professional_career')}>
  //         career
  //       </Button>
  dataForm && console.log('dataForm', dataForm);
  return (
    <div className='tw-h-auto tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-mt-6'>
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
                value[0] == 'professional_career'
                ? value[1]
                : null;

            if (!labelArray) {
              if (isProUser) {
                return value[0] == 'professional_profile' || value[0] == 'other_competencies' || value[0] == 'skills' || value[0] == 'languages' || value[0] == 'achievements_recognitions' ? (
                  <TextAreaForm
                    label={value[1].label}
                    handleSwitch={(e: any) => handleSwitch(e)}
                    handleData={handleData}
                    name={index}
                    checked={value[1].checked}
                    key={key}
                  />
                ) : (
                  <ItemForm
                    label={value[1].label}
                    handleSwitch={(e: any) => handleSwitch(e)}
                    handleData={handleData}
                    name={index}
                    checked={value[1].checked}
                    key={key}
                  />
                );
              } else {
                return value[1].social == true ? (
                  <ItemForm
                    label={value[1].label}
                    handleSwitch={(e: any) => handleSwitch(e)}
                    handleData={handleData}
                    name={index}
                    checked={value[1].checked}
                    key={key}
                  />
                ) : (
                  null
                );
              }
            } else {
              // return labelArray.map((val) => {
              //   return value[0] == 'phones' || value[0] == 'emails' ? (
              //     <ItemForm
              //       label={val.label!}
              //       handleSwitch={(e: any) => handleSwitch(e)}
              //       handleData={handleData}
              //       name={index}
              //       checked={val.checked}
              //       key={key}
              //     />
              //   ) : (
              //     <TextAreaForm
              //       label={val.label!}
              //       handleSwitch={(e: any) => handleSwitch(e)}
              //       handleData={handleData}
              //       name={index}
              //       checked={val.checked}
              //       key={key}
              //     />
              //   );
              // });
            }
          })}
        </FormGroup>
      </div>
    </div>
  );
};

export default FormDataUser;
