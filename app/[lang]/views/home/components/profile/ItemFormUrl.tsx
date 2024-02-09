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
                  className={`tw-pb-3 ${
                    key !== labelArray.length - 1
                      ? 'tw-border-b tw-border-gray-300 tw-border-t-0 tw-border-x-0 tw-border-solid'
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
                          handleModalAlert={({ index, subindex }) =>
                            handleModalAlert({ index, subindex })
                          }
                          myValue={myValue}
                          dataForm={dataForm}
                          index={index}
                          withCheck={false}
                          subLabel={'url' as NetworksSubIndexDataForm}
                        />
                      </Box>
                    </div>
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
                          <div
                            className='tw-h-[100%] tw-w-[95%] tw-flex tw-justify-center tw-items-center tw-rounded-2xl tw-bg-white tw-mt-2 overflow-x-auto'
                            style={{
                              overflowX: 'auto',
                              scrollbarWidth: 'thin',
                              scrollbarColor: '#aaa #f0f0f0',
                            }}
                          >
                            <div className='tw-h-[40px] tw-w-[95%] tw-flex'>
                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
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
                                    sx={{ color: '#02AF9B' }}
                                  />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'tiktok',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'tiktok' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconTikTok />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
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
                                  <LinkedInIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'messenger',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'messenger' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconMessenger />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
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
                                  <InstagramIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'tiktok',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'tiktok' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconTikTok />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'snapchat',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'snapchat' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconSnapchat />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
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
                                  <TwitterIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'twitch',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'twitch' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconTwitch />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'youTube',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'youTube' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <YouTubeIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'whatsapp',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'whatsapp' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <WhatsApp sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'zoom ',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'zoom' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconZoom />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'line',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'line' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconLine />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'gmail',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'gmail' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconGmail />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'email',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'email' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <EmailIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'phone',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'phone' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <LocalPhoneIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'telegram',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'telegram' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <TelegramIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'whatsappbusiness',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'whatsappbusiness' &&
                                    'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconWhatsAppB />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'skype',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'skype' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconSkype />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'wechat',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'wechat' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconWeChat />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'whatsapp',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'whatsapp' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconPayPal />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'vsco',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'vsco' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconVSCO />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'tumblr',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'tumblr' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconTumblr />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'vimeo',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'vimeo' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconVimeo />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'spotify',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'spotify' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconSpotify />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'deezer',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'deezer' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconDeezer />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'applemusic',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'applemusic' &&
                                    'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconAppleMusic />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'googlemaps',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'googlemaps' &&
                                    'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconGoogleMaps />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'tripadvisor',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'tripadvisor' &&
                                    'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconTripAdvisor />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'booking',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'booking' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconBooking />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'tinder',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'tinder' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconTinder />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'amazon',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'amazon' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconAmazon />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'onlyfans',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'onlyfans' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconOnlyFans />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'airbnb',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'airbnb' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <IconAirbnb />
                                </Button>
                              </div>

                              <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-justify-center tw-items-center'>
                                <Button
                                  onClick={(text: any) =>
                                    handleDataNetworks({
                                      name: value[0],
                                      text: 'pinteres',
                                      subindex: 'icon',
                                      key,
                                    })
                                  }
                                  className={`${
                                    val.icon === 'pinteres' && 'tw-bg-gray-100'
                                  } tw-p-2 tw-min-w-min`}
                                >
                                  <PinterestIcon sx={{ color: '#02AF9B' }} />
                                </Button>
                              </div>
                            </div>
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
