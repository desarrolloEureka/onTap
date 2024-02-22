'use client';
import React from 'react';
import { Dictionary } from '@/types/dictionary';
import { FormGroup } from '@mui/material';
import ProfileHook from '../profile/hooks/ProfileHook';
import {
  CareerDataFormValues,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
} from '@/types/profile';
import ItemFormBasicInfo from './ItemFormBasicInfo';
import ItemFormEducation from './ItemFormEducation';
import ItemFormProfessional from './ItemFormProfessional';
import ItemFormUrl from './ItemFormUrl';

const FormAddDataUser = ({
  isDetailOpen,
  itemDetail,
  handleSeeMore,
  isProUser,
  dictionary,
  dataForm,
  handleDataSet,
  handleModalAlert,
  data,
}: {
  isDetailOpen: boolean;
  itemDetail: number;
  handleSeeMore: (numItem: number) => void;
  isProUser: boolean;
  dictionary: Dictionary;
  dataForm: DataForm;
  handleDataSet: (e: DataForm) => void;
  handleModalAlert: ({
    index,
    subindex,
  }: {
    index: string;
    subindex: string;
  }) => void;
  data: [string, any][];
}) => {
  // const { data } = ProfileHook({
  //   dictionary,
  //   handleDataSet,
  //   isProUser,
  // });

  return (
    <div className='tw-h-auto lg:tw-w-[50%] md:tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-mt-6'>
      <div className='tw-h-[100%] tw-w-full tw-flex tw-flex-col'>
        <FormGroup sx={{ m: 1, mt: 1 }}>
          {data.map((value, key) => {
            const index = value[0] as keyof typeof dataForm;
            const validation =
              value[0] == 'phones' ||
              value[0] == 'education' ||
              value[0] == 'emails' ||
              value[0] == 'urls' ||
              value[0] == 'professional_career';
            const labelArray:
              | DataFormValues[]
              | EducationDataFormValues[]
              | CareerDataFormValues[] = validation ? value[1] : null;

            // console.log('labelArray', labelArray);

            if (labelArray) {
              if (isProUser) {
                return value[0] == 'phones' || value[0] == 'emails' ? (
                  <ItemFormBasicInfo
                    key={key}
                    dictionary={dictionary}
                    dataForm={dataForm}
                    handleDataSet={(e) => handleDataSet(e)}
                    handleSeeMore={handleSeeMore}
                    index={index}
                    labelArray={labelArray}
                    value={value}
                    itemDetail={itemDetail}
                    isDetailOpen={isDetailOpen}
                    social={true}
                    handleModalAlert={({ index, subindex }) =>
                      handleModalAlert({ index, subindex })
                    }
                    isProUser={isProUser}
                  />
                ) : value[0] == 'education' ? (
                  <ItemFormEducation
                    key={key}
                    dictionary={dictionary}
                    dataForm={dataForm}
                    handleDataSet={(e) => handleDataSet(e)}
                    handleSeeMore={handleSeeMore}
                    index={index}
                    labelArray={labelArray}
                    value={value}
                    itemDetail={itemDetail}
                    isDetailOpen={isDetailOpen}
                    social={false}
                    handleModalAlert={({ index, subindex }) =>
                      handleModalAlert({ index, subindex })
                    }
                    isProUser={isProUser}
                  />
                ) : value[0] == 'professional_career' ? (
                  <ItemFormProfessional
                    key={key}
                    dictionary={dictionary}
                    dataForm={dataForm}
                    handleDataSet={(e) => handleDataSet(e)}
                    handleSeeMore={handleSeeMore}
                    index={index}
                    labelArray={labelArray}
                    value={value}
                    itemDetail={itemDetail}
                    isDetailOpen={isDetailOpen}
                    social={false}
                    handleModalAlert={({ index, subindex }) =>
                      handleModalAlert({ index, subindex })
                    }
                    isProUser={isProUser}
                  />
                ) : (
                  <ItemFormUrl
                    key={key}
                    dictionary={dictionary}
                    dataForm={dataForm}
                    handleDataSet={(e) => handleDataSet(e)}
                    handleSeeMore={handleSeeMore}
                    index={index}
                    labelArray={labelArray}
                    value={value}
                    itemDetail={itemDetail}
                    isDetailOpen={isDetailOpen}
                    social={false}
                    handleModalAlert={({ index, subindex }) =>
                      handleModalAlert({ index, subindex })
                    }
                    isProUser={isProUser}
                  />
                );
              } else {
                return value[0] == 'phones' || value[0] == 'emails' ? (
                  <ItemFormBasicInfo
                    key={key}
                    dictionary={dictionary}
                    dataForm={dataForm}
                    handleDataSet={(e) => handleDataSet(e)}
                    handleSeeMore={handleSeeMore}
                    index={index}
                    labelArray={labelArray}
                    value={value}
                    itemDetail={itemDetail}
                    isDetailOpen={isDetailOpen}
                    social={true}
                    handleModalAlert={({ index, subindex }) =>
                      handleModalAlert({ index, subindex })
                    }
                    isProUser={isProUser}
                  />
                ) : value[0] == 'urls' ? (
                  <ItemFormUrl
                    key={key}
                    dictionary={dictionary}
                    dataForm={dataForm}
                    handleDataSet={(e) => handleDataSet(e)}
                    handleSeeMore={handleSeeMore}
                    index={index}
                    labelArray={labelArray}
                    value={value}
                    itemDetail={itemDetail}
                    isDetailOpen={isDetailOpen}
                    social={false}
                    handleModalAlert={({ index, subindex }) =>
                      handleModalAlert({ index, subindex })
                    }
                    isProUser={isProUser}
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

export default FormAddDataUser;
