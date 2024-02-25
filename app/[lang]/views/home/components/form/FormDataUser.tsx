'use client';
import { Dictionary } from '@/types/dictionary';
import {
  DataFormValues,
  ProfessionalDataForm,
  SocialDataForm,
  handleDataProps,
} from '@/types/profile';
import { UserData } from '@/types/user';
import { FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ItemForm from '../profile/ItemForm';

const FormDataUser = ({
  dictionary,
  handleDataSet,
  isProUser,
  dataForm,
  data,
  handleData,
  user,
  handleSwitch,
}: // dataForm left data form to profile,
{
  dictionary: Dictionary;
  dataForm: SocialDataForm | ProfessionalDataForm;
  handleDataSet: (e: SocialDataForm | ProfessionalDataForm) => void;
  isProUser: boolean;
  data: [string, any][];
  handleData: ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => void;
  user: UserData;
  handleSwitch: (e: any) => void;
}) => {
  // console.log('isProUser FormDataUser', isProUser);

  // const { handleSwitch, user } = ProfileHook({
  //   dictionary,
  //   isProUser,
  // });

  // console.log('dataForm', dataForm);
  // console.log('data>>', data);
  // console.log('isProUser', isProUser);

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
              // console.log('value', value[1]);

              if (
                index == 'name' ||
                index == 'last_name' ||
                index == 'profession' ||
                index == 'occupation' ||
                index == 'address'
              ) {
                // const labelArray:
                //   | DataFormValues[]
                //   | EducationDataFormValues[]
                //   | CareerDataFormValues[] =
                //   value[0] == 'phones' ||
                //   value[0] == 'education' ||
                //   value[0] == 'emails' ||
                //   value[0] == 'urls' ||
                //   value[0] == 'professional_career'
                //     ? value[1]
                //     : null;

                // if (!labelArray) {
                // console.log('user FormDataUser', user);
                const myValue = (user && user.profile
                  ? isProUser
                    ? user.profile.professional?.[index]
                    : user.profile?.social?.[index]
                  : dataForm && dataForm[index]) as unknown as DataFormValues;

                // const myValue = (user && user.profile
                //   ? isProUser
                //     ? user.profile.professional
                //       ? user.profile.professional?.[index]
                //       : dataForm && dataForm[index]
                //     : user.profile.social
                //     ? user.profile?.social?.[index]
                //     : dataForm && dataForm[index]
                //   : dataForm && dataForm[index]) as unknown as DataFormValues;

                return (
                  <ItemForm
                    label={value[1].label}
                    handleSwitch={(e: any) => handleSwitch(e)}
                    handleData={handleData}
                    name={index}
                    checked={value[1].checked}
                    key={key}
                    icon={value[1].icon}
                    myValue={myValue}
                    index={index}
                  />
                );
                // }
              }
            })}
          </Box>
          {isProUser && (
            <Box className='tw-bg-[#e9e9e9] tw-rounded-xl tw-mt-3'>
              <Typography className='tw-text-white tw-bg-[#02af9b] tw-w-[150px] tw-text-center tw-rounded-md tw-text-base tw-mt-3 tw-ml-10'>
                {dictionary.homeView.labelProfessionalData}
              </Typography>
              {data.map((value, key) => {
                if (
                  !Array.isArray(value[1]) &&
                  (value[0] == 'company' ||
                    value[0] == 'position' ||
                    value[0] == 'professional_profile' ||
                    value[0] == 'other_competencies' ||
                    value[0] == 'skills' ||
                    value[0] == 'languages' ||
                    value[0] == 'achievements_recognitions')
                ) {
                  const index = value[0] as keyof typeof dataForm;
                  const myValue = (user && user.profile
                    ? isProUser
                      ? user.profile.professional?.[index]
                      : user.profile?.social?.[index]
                    : dataForm && dataForm[index]) as unknown as DataFormValues;

                  return (
                    <ItemForm
                      label={value[1].label}
                      handleSwitch={(e: any) => handleSwitch(e)}
                      handleData={handleData}
                      name={index}
                      checked={value[1].checked}
                      key={key}
                      icon={value[1].icon}
                      myValue={myValue}
                      index={index}
                    />
                  );
                  // }
                }
              })}
            </Box>
          )}
        </FormGroup>
      </div>
    </div>
  );
};

export default FormDataUser;
