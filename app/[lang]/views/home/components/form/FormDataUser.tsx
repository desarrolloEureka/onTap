'use client';
import { Dictionary } from '@/types/dictionary';
import {
  CareerDataFormValues,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
} from '@/types/profile';
import { FormGroup, Typography } from '@mui/material';
import ItemForm from '../profile/ItemForm';
import TextAreaForm from '../profile/TextAreaForm';
import ProfileHook from '../profile/hooks/ProfileHook';
import { Box } from '@mui/system';

const FormDataUser = ({
  dictionary,
  handleDataSet,
  isProUser,
  dataForm,
  data,
}: // dataForm left data form to profile,
{
  dictionary: Dictionary;
  dataForm: DataForm;
  handleDataSet: (e: DataForm) => void;
  isProUser: boolean;
  data: [string, any][];
}) => {
  // console.log('isProUser FormDataUser', isProUser);

  const { handleSwitch, handleData, user } = ProfileHook({
    dictionary,
    handleDataSet,
    isProUser,
  });
  // console.log('dataForm', dataForm);
  // console.log('data>>', data);

  return (
    <div className='tw-h-auto lg:tw-w-[50%] md:tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-mt-6'>
      <div className='tw-h-[100%] tw-w-full tw-flex tw-flex-col'>
        <FormGroup sx={{ m: 1, mt: 1 }}>
          <Box className='tw-bg-[#e9e9e9] tw-rounded-xl tw-mt-3'>
            <Typography className='tw-text-white tw-bg-[#02af9b] tw-w-[150px] tw-text-center tw-rounded-md tw-text-base tw-mt-3 tw-ml-10'>
              {dictionary.homeView.labelPersonalData}
            </Typography>
            {data.map((value, key) => {
              const index = value[0] as keyof typeof dataForm;
              if (
                index == 'name' ||
                index == 'last_name' ||
                index == 'profession' ||
                index == 'occupation' ||
                index == 'address'
              ) {
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
                      /*
                    Validar con Rhonal
                    const myValue =
                        user && user.profile && index == value[0]
                          ? user.profile[index]?.text
                          : undefined;
                      const myValue1 = (user && user.profile && index == value[0]
                        ? user.profile[index]
                        : undefined) as unknown as DataFormValues;
                      return
                    */
                      const myValue =
                        user &&
                        user.profile &&
                        [
                          'name',
                          'last_name',
                          'profession',
                          'occupation',
                          'address',
                        ].includes(index)
                          ? user.profile[index]?.text
                          : undefined;
                      const myValue1 = (user &&
                      user.profile &&
                      [
                        'name',
                        'last_name',
                        'profession',
                        'occupation',
                        'address',
                      ].includes(index)
                        ? user.profile[index]
                        : undefined) as unknown as DataFormValues;
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
                          myValue={myValue1}
                          dataForm={dataForm}
                          index={index}
                        />
                      );
                    } else {
                      const myValue = (user && user.profile && index == value[0]
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
                          dataForm={dataForm}
                          index={index}
                        />
                      );
                    }
                  } else {
                    // console.log('user FormDataUser', user);
                    const myValue = (user && user.profile && index == value[0]
                      ? user.profile[index]
                      : dataForm &&
                        dataForm[index]) as unknown as DataFormValues;
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
                        dataForm={dataForm}
                        index={index}
                      />
                    ) : null;
                  }
                }
              }
            })}
          </Box>
          <Box className='tw-bg-[#e9e9e9] tw-rounded-xl tw-mt-3'>
            {isProUser ? (
              <Typography className='tw-text-white tw-bg-[#02af9b] tw-w-[170px] tw-text-center tw-rounded-md tw-text-base tw-mt-3 tw-ml-10'>
                {dictionary.homeView.labelProfessionalData}
              </Typography>
            ) : null}
            {data.map((value, key) => {
              const index = value[0] as keyof typeof dataForm;
              if (
                index == 'company' ||
                index == 'position' ||
                index == 'phones' ||
                index == 'education' ||
                index == 'emails' ||
                index == 'urls' ||
                index == 'professional_career' ||
                index == 'professional_profile' ||
                index == 'other_competencies' ||
                index == 'skills' ||
                index == 'languages' ||
                index == 'achievements_recognitions'
              ) {
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
                      const myValue =
                        user && user.profile && index == value[0]
                          ? user.profile[index]?.text
                          : undefined;
                      const myValue1 = (user &&
                      user.profile &&
                      index == value[0]
                        ? user.profile[index]
                        : undefined) as unknown as DataFormValues;
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
                          myValue={myValue1}
                          dataForm={dataForm}
                          index={index}
                        />
                      );
                    } else {
                      const myValue = (user && user.profile && index == value[0]
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
                          dataForm={dataForm}
                          index={index}
                        />
                      );
                    }
                  } else {
                    const myValue = (user && user.profile && index == value[0]
                      ? user.profile[index]
                      : undefined) as unknown as DataFormValues;

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
                        dataForm={dataForm}
                        index={index}
                      />
                    ) : null;
                  }
                }
              }
            })}
          </Box>
        </FormGroup>
      </div>
    </div>
  );
};

export default FormDataUser;
