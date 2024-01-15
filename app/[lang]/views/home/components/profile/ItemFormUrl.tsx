'use client';
import React, { useState } from 'react';
import { Button, TextField, Avatar, Box } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Dictionary } from '@/types/dictionary';
import ProfileHook from '../profile/hooks/ProfileHook';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SendIcon from '@mui/icons-material/Send';
import IconTikTok from './IconTikTok';

import {
  CareerDataFormValues,
  CareerSubIndexDataForm,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
  IndexDataForm,
  NetworksSubIndexDataForm,
} from '@/types/profile';
import ModalAlertLimit from './ModalAlertLimit';
import FormUrl from './FormUrl';

const ItemFormUrl = ({
  dictionary,
  dataForm,
  handleDataSet,
  handleSeeMore,
  index,
  label,
  labelArray,
  value,
  itemDetail,
  isDetailOpen,
  icon,
  social,
  handleModalAlert,
}: {
  dictionary: Dictionary;
  dataForm: DataForm;
  handleDataSet: (e: DataForm) => void;
  handleSeeMore: (e: number) => void;
  index: IndexDataForm;
  label?: string;
  labelArray:
    | DataFormValues[]
    | EducationDataFormValues[]
    | CareerDataFormValues[];
  value: any;
  itemDetail: number;
  isDetailOpen: boolean;
  icon?: string;
  social: boolean;
  handleModalAlert: (name: string) => void;
}) => {
  const {
    handleSwitch,
    handleDataNetworks,
    handleAddData,
    isModalAlertLimit,
    handleModalAlertLimit,
    handleDeleteData,
    handleData,
    user,
  } = ProfileHook({
    dictionary,
    handleDataSet,
  });

  const [showUrls, setShowUrls] = useState(false);

  const handleOpenUrl = () => {
    setShowUrls(!showUrls);
  };

  return (
    <div
      className={`${
        value[0] === 'urls' && itemDetail === 4 && labelArray.length > 1
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
                handleAddData('urls', false);
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
                {dictionary.profileView.addAnotherURL}{' '}
              </span>
            </Button>
          </div>
        </div>

        <div className='tw-min-h-[125px] tw-pb-3 tw-flex tw-flex-col tw-items-end tw-justify-center'>
          <div className='tw-w-[95%] tw-flex tw-flex-col '>
            {labelArray.map((val, key) => {
              const myValue = (user && index == value[0]
                ? user.profile[index]
                : undefined) as unknown as DataFormValues;
              return (
                <div key={key}>
                  <div className='tw-h-[100%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[90%] tw-flex tw-flex-col'>
                      <FormUrl
                        label={dictionary.profileView.labelDataName + ': '}
                        handleSwitch={(e: any) => handleSwitch(e)}
                        handleData={handleData}
                        name={index}
                        checked={val.checked}
                        subindex={key}
                        icon={val.icon}
                        deleteAction={true}
                        handleDeleteData={handleDeleteData}
                        handleModalAlert={(e: any) => handleModalAlert(e)}
                        myValue={myValue}
                        dataForm={dataForm}
                        index={index}
                        withCheck={true}
                        subLabel={'name' as NetworksSubIndexDataForm}
                      />
                      <Box sx={{ mb: 1 }}>
                        <FormUrl
                          label={dictionary.profileView.labelOptionalUrl + ': '}
                          handleSwitch={(e: any) => handleSwitch(e)}
                          handleData={handleData}
                          name={index}
                          checked={val.checked}
                          subindex={key}
                          icon={val.icon}
                          deleteAction={true}
                          handleDeleteData={handleDeleteData}
                          handleModalAlert={(e: any) => handleModalAlert(e)}
                          myValue={myValue}
                          dataForm={dataForm}
                          index={index}
                          withCheck={false}
                          subLabel={'url' as NetworksSubIndexDataForm}
                        />
                      </Box>
                      {/* <TextField
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
                                {dictionary?.profileView.labelDataName}:{' '}
                              </span>
                            </>
                          ),
                        }}
                        onChange={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: text.target.value,
                            subindex: 'name',
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
                                {dictionary?.profileView.labelOptionalUrl}:{' '}
                              </span>
                            </>
                          ),
                        }}
                        onChange={(text: any) =>
                          handleDataNetworks({
                            name: value[0],
                            text: text.target.value,
                            subindex: 'url',
                            key,
                          })
                        }
                      /> */}
                    </div>

                    {/* <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
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

                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center  '>
                      <CustomSwitchGeneral
                        name={index}
                        handleSwitch={(e: any) => handleSwitch(e)}
                        checked={val.checked}
                      />
                    </div> */}
                  </div>

                  <div className='tw-h-[20%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center '>
                    <div className='tw-h-[40%]  tw-w-[100%] tw-flex tw-mt-4 tw-mb-2'>
                      <div className='tw-h-[100%] tw-w-[15%] tw-flex tw-justify-center tw-items-center '>
                        <Button onClick={handleOpenUrl}>
                          <Avatar
                            sx={{
                              backgroundColor: '#ffffff',
                              width: 38,
                              height: 38,
                            }}
                          >
                            <LocalGroceryStoreOutlinedIcon
                              sx={{ color: '#396593' }}
                            />
                          </Avatar>
                        </Button>
                      </div>
                      <div className='tw-h-[100%] tw-w-[85%] tw-flex tw-justify-center tw-items-center'>
                        {showUrls ? (
                          <div className='tw-h-[100%] tw-w-[90%] tw-flex tw-justify-center tw-items-center tw-rounded-2xl tw-bg-white tw-mt-2'>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button
                                onClick={(text: any) =>
                                  handleDataNetworks({
                                    name: value[0],
                                    text: 'facebook',
                                    subindex: 'icon',
                                    key,
                                  })
                                }
                                className={`${
                                  val.icon === 'facebook' && 'tw-bg-gray-100'
                                } tw-p-2 tw-min-w-min`}
                              >
                                <FacebookOutlinedIcon
                                  sx={{ color: '#62ad9b' }}
                                />
                              </Button>
                            </div>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button
                                onClick={(text: any) =>
                                  handleDataNetworks({
                                    name: value[0],
                                    text: 'twitter',
                                    subindex: 'icon',
                                    key,
                                  })
                                }
                                className={`${
                                  val.icon === 'twitter' && 'tw-bg-gray-100'
                                } tw-p-2 tw-min-w-min`}
                              >
                                <TwitterIcon sx={{ color: '#62ad9b' }} />
                              </Button>
                            </div>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button
                                onClick={(text: any) =>
                                  handleDataNetworks({
                                    name: value[0],
                                    text: 'pending',
                                    subindex: 'icon',
                                    key,
                                  })
                                }
                                className={`${
                                  val.icon === 'pending' && 'tw-bg-gray-100'
                                } tw-p-2 tw-min-w-min`}
                              >
                                <FacebookOutlinedIcon
                                  sx={{ color: '#62ad9b' }}
                                />
                              </Button>
                            </div>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button
                                onClick={(text: any) =>
                                  handleDataNetworks({
                                    name: value[0],
                                    text: 'instagram',
                                    subindex: 'icon',
                                    key,
                                  })
                                }
                                className={`${
                                  val.icon === 'instagram' && 'tw-bg-gray-100'
                                } tw-p-2 tw-min-w-min`}
                              >
                                <InstagramIcon sx={{ color: '#62ad9b' }} />
                              </Button>
                            </div>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button
                                onClick={(text: any) =>
                                  handleDataNetworks({
                                    name: value[0],
                                    text: 'linkedin',
                                    subindex: 'icon',
                                    key,
                                  })
                                }
                                className={`${
                                  val.icon === 'linkedin' && 'tw-bg-gray-100'
                                } tw-p-2 tw-min-w-min`}
                              >
                                <LinkedInIcon sx={{ color: '#62ad9b' }} />
                              </Button>
                            </div>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button
                                onClick={(text: any) =>
                                  handleDataNetworks({
                                    name: value[0],
                                    text: 'tikTok',
                                    subindex: 'icon',
                                    key,
                                  })
                                }
                                className={`${
                                  val.icon === 'tikTok' && 'tw-bg-gray-100'
                                } tw-p-2 tw-min-w-min`}
                              >
                                <IconTikTok />
                              </Button>
                            </div>
                            {/* <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button>
                                <MailOutlinedIcon sx={{ color: '#62ad9b' }} />
                              </Button>
                            </div>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button>
                                <LanguageOutlinedIcon
                                  sx={{ color: '#62ad9b' }}
                                />
                              </Button>
                            </div>
                            <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                              <Button>
                                <SendIcon sx={{ color: '#62ad9b' }} />
                              </Button>
                            </div> */}
                          </div>
                        ) : null}
                      </div>
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
              {dictionary.profileView.buttonSeeMore} (2)
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

export default ItemFormUrl;
