'use client';
import React, { useState } from 'react';
import { Button, Avatar, Box } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Dictionary } from '@/types/dictionary';
import ProfileHook from '../profile/hooks/ProfileHook';
import {
  CareerDataFormValues,
  DataForm,
  DataFormValues,
  EducationDataFormValues,
  IndexDataForm,
  NetworksSubIndexDataForm,
} from '@/types/profile';

import ModalAlertLimit from './ModalAlertLimit';
import FormUrl from './FormUrl';

import LanguageIcon from '@mui/icons-material/Language';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconTikTok from './IconTikTok';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TelegramIcon from '@mui/icons-material/Telegram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import IconMessenger from './IconMessenger';
import IconSnapchat from './IconSnapchat';
import IconTwitch from './IconTwitch';
import IconZoom from './IconZoom';
import IconLine from './IconLine';
import IconGmail from './IconGmail';
import IconWhatsAppB from './IconWhatsAppB';
import IconSkype from './IconSkype';
import IconWeChat from './IconWeChat';
import IconPayPal from './IconPayPal';
import IconVSCO from './IconVSCO';
import IconTumblr from './IconTumblr';
import IconVimeo from './IconVimeo';
import IconSpotify from './IconSpotify';
import IconDeezer from './IconDeezer';
import IconAppleMusic from './IconAppleMusic';
import IconGoogleMaps from './IconGoogleMaps';
import IconTripAdvisor from './IconTripAdvisor';
import IconBooking from './IconBooking';
import IconTinder from './IconTinder';
import IconAmazon from './IconAmazon';
import IconOnlyFans from './IconOnlyFans';
import IconAirbnb from './IconAirbnb';
import { WhatsApp } from '@mui/icons-material';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import ModalIcons from './ModalIcons';

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
  handleModalAlert: ({
    index,
    subindex,
  }: {
    index: string;
    subindex: string;
  }) => void;
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
    isModalIcons,
    handleModalIcons,
    itemUrlSelected,
    itemUrlKey,
    setModalIcons
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
      className={`${value[0] === 'urls' && itemDetail === 4 && labelArray.length > 1
        ? 'tw-h-[350px]'
        : 'tw-h-[250px]'
        } tw-overflow-y-auto tw-w-[100%] tw-bg-[#E9E9E9] tw-rounded-2xl tw-my-3 tw-py-5`}
    >
      <div
        className={`tw-h-[${labelArray.length * 20
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
                    color: '#02AF9B',
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
          <div className='tw-w-[100%] tw-flex tw-flex-col '>
            {labelArray.map((val, key) => {
              const myValue = (user && user.profile && index == value[0]
                ? user.profile[index]
                : undefined) as unknown as DataFormValues;
              return (
                <div
                  key={key}
                  className={`tw-pb-3 ${key !== labelArray.length - 1
                    ? 'tw-border-b-8 tw-border-gray-300 tw-border-t-0 tw-border-x-0 tw-border-solid'
                    : ''
                    }`}
                >
                  <div
                    className={`tw-h-[100%] tw-w-[100%] tw-flex tw-items-center tw-justify-end `}
                  >
                    <div className='tw-h-[100%] tw-w-[91%] tw-flex tw-flex-col'>
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
                        handleModalAlert={({ index, subindex }) =>
                          handleModalAlert({ index, subindex })
                        }
                        myValue={myValue}
                        dataForm={dataForm}
                        index={index}
                        withCheck={true}
                        subLabel={'name' as NetworksSubIndexDataForm}
                      />
                      <Box sx={{ mb: 1 }} className='tw-w-[90%] tw-flex tw-mt-2 tw-justify-start '>
                        <div className='tw-w-[480px]'>
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
                            handleModalAlert={({ index, subindex }) =>
                              handleModalAlert({ index, subindex })
                            }
                            myValue={myValue}
                            dataForm={dataForm}
                            index={index}
                            withCheck={false}
                            subLabel={'url' as NetworksSubIndexDataForm}
                          />
                        </div>
                        <div className='tw-h-[20%] tw-w-0 tw-flex tw-flex-col tw-mr-4'>
                          <div className='tw-h-[40%]  tw-w-[100%] tw-flex tw-mt-4 tw-mb-2'>
                            <div className='tw-h-[100%] tw-w-[15%] tw-flex tw-justify-center tw-items-center '>
                              <Button onClick={() => handleModalIcons(val, key)}>
                                <Avatar
                                  sx={{
                                    backgroundColor: '#ffffff',
                                    width: 38,
                                    height: 38,
                                  }}
                                >
                                  <LanguageIcon
                                    sx={{ color: '#396593' }}
                                  />
                                </Avatar>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* <div className='tw-h-[30px] tw-w-[100%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
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
        </div> */}

      </div>
      <ModalAlertLimit
        isModalAlertLimit={isModalAlertLimit}
        handleModalAlertLimit={handleModalAlertLimit}
        dictionary={dictionary}
      />

      <ModalIcons
        isModalIcons={isModalIcons}
        setModalIcons={setModalIcons}
        dictionary={dictionary}
        value={value}
        val={itemUrlSelected}
        keyItem={itemUrlKey}
        handleDataNetworks={handleDataNetworks}
      />
    </div>
  );
};

export default ItemFormUrl;
