'use client';
import React from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Dictionary } from '@/types/dictionary';
import ProfileHook from '../profile/hooks/ProfileHook';
import { FormHelperText, Input } from '@mui/material';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import {
  CareerDataFormValues,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
} from '@/types/profile';
import ModalAlertLimit from './ModalAlertLimit';

const ItemFormProfessional = ({
  dictionary,
  dataForm,
  handleDataSet,
  handleSeeMore,
  index,
  checked,
  label,
  labelArray,
  value,
  itemDetail,
  handleModalAlert,
}: {
  dictionary: Dictionary;
  dataForm: DataForm;
  handleDataSet: (e: DataForm) => void;
  handleSeeMore: (e: number) => void;
  index: string;
  checked?: boolean;
  label?: string;
  labelArray:
    | DataFormValues[]
    | EducationDataFormValues[]
    | CareerDataFormValues[];
  value: any;
  itemDetail: number;
  handleModalAlert: (name: string) => void;
}) => {
  const {
    handleSwitch,
    handleData,
    handleAddData,
    isModalAlertLimit,
    handleModalAlertLimit,
  } = ProfileHook({
    dictionary,
    dataForm,
    handleDataSet,
  });

  return (
    <div
      className={`${
        value[0] === 'professional_career' &&
        itemDetail === 4 &&
        labelArray.length > 1
          ? 'tw-h-[350px]'
          : 'tw-h-[250px]'
      } tw-overflow-y-auto tw-w-[100%] tw-bg-[#E9E9E9] tw-rounded-2xl tw-my-3 tw-py-5`}
    >
      <div
        className={`tw-h-[${
          labelArray.length * 20
        }px]tw-bg-blue-200 tw-flex tw-flex-col tw-justify-around`}
      >
        <div className='tw-w-[100%]  tw-flex tw-items-center tw-justify-end'>
          <div className='tw-h-[100%] tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-justify-center '>
            <Button
              onClick={() => {
                handleAddData('professional_career', false);
              }}
              color='secondary'
              size='medium'
              startIcon={
                <AddCircleOutlinedIcon
                  style={{
                    color: '#62AD9B',
                    fontSize: '1.4em',
                    marginLeft: '0rem',
                  }}
                />
              }
            >
              <span
                style={{
                  color: '#030124 ',
                  fontSize: '0.6rem',
                  textTransform: 'none',
                }}
              >
                {dictionary?.profileView.addAnotherTrajectory}{' '}
              </span>
            </Button>
          </div>
        </div>

        <div className='tw-min-h-[125px] tw-pb-3 tw-flex tw-flex-col tw-items-end tw-justify-center'>
          <div className='tw-w-[95%] tw-flex tw-flex-col '>
            {labelArray.map((val, key) => {
              return (
                <div key={key}>
                  <div className='tw-h-[100%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[60%] tw-flex tw-flex-col'>
                      <TextField
                        //id={`${name}-input`}
                        variant='standard'
                        InputProps={{
                          startAdornment: (
                            <>
                              <TimelineIcon
                                style={{
                                  color: '#62AD9B',
                                  fontSize: '1.8rem',
                                  marginRight: '0.5rem',
                                }}
                              />
                              <CircleOutlinedIcon
                                style={{
                                  color: '#000000',
                                  fontSize: '0.5rem',
                                  marginRight: '0.3rem',
                                }}
                              />
                              <span
                                style={{
                                  fontSize: '0.8rem',
                                  marginRight: '0.5rem',
                                }}
                              >
                                {dictionary?.profileView.labelCompany}:{' '}
                              </span>
                            </>
                          ),
                        }}
                        onChange={(text: any) =>
                          handleData({
                            name: value[0],
                            text: text.target.value,
                            subindex: 'company',
                            key,
                          })
                        }
                      />
                      <TextField
                        //id={`${name}-input`}
                        variant='standard'
                        InputProps={{
                          startAdornment: (
                            <>
                              <CircleOutlinedIcon
                                style={{
                                  color: '#000000',
                                  fontSize: '0.5rem',
                                  marginRight: '0.3rem',
                                }}
                              />
                              <span
                                style={{
                                  fontSize: '0.8rem',
                                  marginRight: '0.5rem',
                                }}
                              >
                                {dictionary?.profileView.labelPosition}:{' '}
                              </span>
                            </>
                          ),
                        }}
                        onChange={(text: any) =>
                          handleData({
                            name: value[0],
                            text: text.target.value,
                            subindex: 'position',
                            key,
                          })
                        }
                      />
                      <TextField
                        //id={`${name}-input`}
                        variant='standard'
                        InputProps={{
                          startAdornment: (
                            <>
                              <CircleOutlinedIcon
                                style={{
                                  color: '#000000',
                                  fontSize: '0.5rem',
                                  marginRight: '0.3rem',
                                }}
                              />
                              <span
                                style={{
                                  fontSize: '0.8rem',
                                  marginRight: '0.5rem',
                                }}
                              >
                                {dictionary?.profileView.labelStartDate}:{' '}
                              </span>
                            </>
                          ),
                        }}
                        onChange={(text: any) =>
                          handleData({
                            name: value[0],
                            text: text.target.value,
                            subindex: 'data_init',
                            key,
                          })
                        }
                      />
                      <TextField
                        //id={`${name}-input`}
                        variant='standard'
                        InputProps={{
                          startAdornment: (
                            <>
                              <CircleOutlinedIcon
                                style={{
                                  color: '#000000',
                                  fontSize: '0.5rem',
                                  marginRight: '0.3rem',
                                }}
                              />
                              <span
                                style={{
                                  fontSize: '0.8rem',
                                  marginRight: '0.5rem',
                                }}
                              >
                                {dictionary?.profileView.labelEndDate}:{' '}
                              </span>
                            </>
                          ),
                        }}
                        onChange={(text: any) =>
                          handleData({
                            name: value[0],
                            text: text.target.value,
                            subindex: 'data_end',
                            key,
                          })
                        }
                      />
                      <FormHelperText id='standard-weight-helper-text'>
                        {dictionary?.profileView.labelCareerPath}
                      </FormHelperText>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <Button
                        className='tw-w-[100%] tw-h-[100%]'
                        onClick={() => handleModalAlert(index)}
                      >
                        <DeleteForeverOutlinedIcon
                          style={{
                            color: '#62AD9B',
                            fontSize: '1.8rem',
                          }}
                        />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral
                        name={index}
                        handleSwitch={(e: any) => handleSwitch(e)}
                        checked={val.checked}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='tw-h-[30px] tw-w-[100%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
          <Button
            onClick={() => handleSeeMore(4)}
            color='secondary'
            size='medium'
            endIcon={
              <KeyboardArrowDownOutlinedIcon
                style={{
                  color: '#396593',
                  fontSize: '2.5rem',
                  marginLeft: '-0.7rem',
                }}
              />
            }
          >
            <span
              style={{
                color: '#396593 ',
                fontSize: '0.8rem',
                textTransform: 'none',
              }}
            >
              {dictionary?.profileView.buttonSeeMore} (2)
            </span>
          </Button>
        </div>
      </div>
      <ModalAlertLimit
        isModalAlertLimit={isModalAlertLimit}
        handleModalAlertLimit={handleModalAlertLimit}
        dictionary={dictionary}
      />
    </div>
  );
};

export default ItemFormProfessional;
