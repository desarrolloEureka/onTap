import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Button, Typography } from '@mui/material';
import React from 'react';
import { Dictionary } from '@/types/dictionary';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconTikTok from './IconTikTok';
import XIcon from '@mui/icons-material/X';
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
import { title } from 'process';

const ModalIcons = ({
    isModalIcons,
    setModalIcons,
    dictionary,
    value,
    val,
    keyItem,
    handleDataNetworks
}: {
    isModalIcons: boolean;
    dictionary: Dictionary;
    setModalIcons: (e: boolean) => void;
    handleDataNetworks: (e: any) => void;
    value: any;
    val: any;
    keyItem: any;
}) => {
    return (
        <Modal
            open={isModalIcons}
            onClose={setModalIcons}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            className='tw-flex tw-justify-center tw-items-center'
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#02AF9B',
                    padding: 5,
                    borderRadius: 3,
                    position: 'relative',
                }}
            >
                <IconButton
                    className='tw-absolute tw-right-1 tw-top-1'
                    onClick={() => setModalIcons(false)}
                >
                    <Close className='tw-text-white' />
                </IconButton>

                <div className='tw-w-[100%] tw-h-[80%] tw-flex tw-justify-center tw-justify-items-center tw-pl-3 tw-pr-3'>
                    <div className='tw-grid max-sm:tw-grid-cols-3 sm:tw-grid-cols-4 md:tw-grid-cols-5 lg:tw-grid-cols-5 max-sm:tw-w-[150px] lg:tw-w-[350px] xl:tw-w-[350px]'>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Link
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'www',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'www' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'
                                        } tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <LinkSharpIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Facebook
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'facebook',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'facebook' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'
                                        } tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <FacebookOutlinedIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />

                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    TikTok
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'tiktok',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'tiktok' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'
                                        } tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconTikTok />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    LinkedIn
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'linkedin',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'linkedin' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'
                                        } tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <LinkedInIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Messenger
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'messenger',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'messenger' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'
                                        } tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconMessenger />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Insta
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'instagram',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'instagram' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <InstagramIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Snapchat
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'snapchat',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'snapchat' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconSnapchat />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    X
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'twitter',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'twitter' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <XIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Twitch
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'twitch',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'twitch' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconTwitch />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    YouTube
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'youTube',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'youTube' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <YouTubeIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    WhatsApp
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'whatsapp',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'whatsapp' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <WhatsApp
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Zoom
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'zoom ',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'zoom' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconZoom />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Line
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'line',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'line' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconLine />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Gmail
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'gmail',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'gmail' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconGmail />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Email
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'email',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'email' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <EmailIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Phone
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'phone',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'phone' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <LocalPhoneIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Telegram
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'telegram',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'telegram' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <TelegramIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-xs tw-text-center'>
                                    WhatsApp Business
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'whatsappbusiness',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'whatsappbusiness' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-mb-3 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconWhatsAppB />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[90%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Skype
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'skype',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'skype' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconSkype />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    WeChat
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'wechat',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'wechat' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconWeChat />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    PayPal
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'paypal',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'paypal' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconPayPal />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    VSCO
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'vsco',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'vsco' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconVSCO />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Tumblr
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'tumblr',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'tumblr' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconTumblr />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Vimeo
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'vimeo',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'vimeo' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconVimeo />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Spotify
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'spotify',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'spotify' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconSpotify />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Deezer
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'deezer',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'deezer' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconDeezer />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-xs tw-text-center'>
                                    Apple Music
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'applemusic',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'applemusic' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-mb-3 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconAppleMusic />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Maps
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'googlemaps',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'googlemaps' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconGoogleMaps />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-xs tw-text-center'>
                                    Trip Advisor
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'tripadvisor',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'tripadvisor' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min tw-mb-3`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconTripAdvisor />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Booking
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'booking',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'booking' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconBooking />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Tinder
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'tinder',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'tinder' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconTinder />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Amazon
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'amazon',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'amazon' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconAmazon />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    OnlyFans
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'onlyfans',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'onlyfans' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconOnlyFans />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Airbnb
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'airbnb',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'airbnb' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <IconAirbnb />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                            <div className='tw-h-[100%] tw-w-[40px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <Typography className='tw-text-white tw-text-sm tw-text-center'>
                                    Pinterest
                                </Typography>
                                <Button
                                    onClick={(text: any) =>
                                        handleDataNetworks({
                                            name: value[0],
                                            text: 'pinteres',
                                            subindex: 'icon',
                                            key: keyItem,
                                        })
                                    }
                                    className={`${val.icon === 'pinteres' ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'} tw-p-2 tw-min-w-min`}
                                >
                                    <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                        <PinterestIcon
                                            sx={{ color: '#02AF9B' }}
                                            fontSize='large'
                                        />
                                    </div>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalIcons;