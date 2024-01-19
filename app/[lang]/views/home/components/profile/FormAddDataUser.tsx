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
}: {
  isDetailOpen: boolean;
  itemDetail: number;
  handleSeeMore: (numItem: number) => void;
  isProUser: boolean;
  dictionary: Dictionary;
  dataForm: DataForm;
  handleDataSet: (e: DataForm) => void;
  handleModalAlert: ({ index, subindex }: { index: string, subindex: string }) => void;
}) => {
  const { data } = ProfileHook({
    dictionary,
    handleDataSet,
  });

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
                    social={false}
                    handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
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
                    handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
                  />
                ) :
                  value[0] == 'professional_career' ? (
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
                      handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
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
                      handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
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
                    handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
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
                    handleModalAlert={({ index, subindex }) => handleModalAlert({ index, subindex })}
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