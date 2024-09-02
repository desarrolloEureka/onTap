import React, { useEffect, useState } from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import ModalCookies from '@/components/customModalAlert/ModalCookies';
import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';
import { Avatar, Typography } from '@mui/material';
import SaveContactButtonColor from './saveContactButton/SaveContactButtonColor';
import '../../../styles/fonts.css'
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import ContainerProfessionalTwo from './container/ContainerProfessionalTwo';
import HorizontalScrolling from './InfinityHorizontalScrolling/HorizontalScrolling';
import ContainerCards from './itemProfessionalCards/containerCards';
import BgImage from './bgImage/BgImage';

const ProfessionalTwo = ({
    params: { lang, background, data, handleAceptCookiesPage, isCookies },
}: {
    params: {
        lang: Locale;
        background: BackgroundImages;
        data: UserData;
        handleAceptCookiesPage: () => Promise<void>
        isCookies: boolean
    };
}) => {
    const { dictionary } = useDictionary({ lang });
    const [isDataError, setIsDataError] = useState(true);
    const isSmallScreen = useMediaQuery('(max-height:935px)');
    const isSmallScreenWidth = useMediaQuery('(max-width:440px)');
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleAceptCookies = async () => {
        handleAceptCookiesPage();
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getFullName = (dataProfile: any) => {
        if (dataProfile) {
            const firstName = dataProfile?.name?.checked ? dataProfile?.name?.text : '';
            const lastName = dataProfile?.last_name?.checked ? dataProfile?.last_name?.text : '';
            const fullName = `${firstName} ${lastName}`.trim();
            const name = fullName.length > 22 ? fullName.substring(0, 22) + '...' : fullName
            return name;
        }
        return '';
    };

    return data.profile ? (
        <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
            <div className={`tw-shadow-md tw-rounded-2xl tw-bg-slate-500`}
                style={{
                    height: isSmallScreen ? windowSize.height : '700px',
                    width: isSmallScreenWidth ? windowSize.width : '380px',
                    overflow: 'hidden',
                }}
            >
                <BgImage background={background} />
                <div className={`tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                    <div style={{ height: '100%', width: '100%' }}>

                        <div className={`tw-h-[40%] tw-w-[100%] tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-start`}>
                            <div style={{ borderRadius: 20, boxShadow: '0 6px 6px rgba(0, 0, 0, 0.25)' }} className={`tw-h-[100%] tw-w-[100%] tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-start tw-bg-[#cecece]`}>
                                <div className={`tw-h-[98%] tw-w-[90%] tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center`}>

                                    <div className={`tw-h-[40%] tw-w-[100%] tw-z-10 tw-flex tw-flex-row tw-items-center tw-justify-center`}>
                                        <div className={`tw-h-[100%] tw-w-[40%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                            <Avatar
                                                alt={'name'}
                                                src={data.imagePro}
                                                variant={'rounded'}
                                                imgProps={{ loading: "lazy" }}
                                                sx={{
                                                    width: '100px',
                                                    height: '100px',
                                                    borderRadius: '100%',
                                                    border: '10px solid #030124',
                                                }}
                                            />
                                        </div>
                                        <div className={`tw-h-[100%] tw-w-[60%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                            <div className={`tw-h-[50%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                                <div style={{ borderRadius: 8 }} className={`tw-h-[45%] tw-w-[100%] tw-flex tw-flex-row tw-items-center tw-justify-center tw-bg-[#030124] tw-mt-3`}>
                                                    <Typography style={{ fontFamily: 'Canto', fontWeight: 300, fontSize: '17px', color: 'white' }}>{getFullName(data.profile.professional)}</Typography>
                                                </div>
                                            </div>
                                            <div className={`tw-h-[50%] tw-w-[100%] tw-flex tw-flex-col  tw-items-center tw-justify-start`}>
                                                <div className={`tw-h-[60%] tw-w-[99%] tw-flex tw-flex-row tw-items-center tw-justify-center`}>
                                                    <Typography style={{ fontFamily: 'Canto', fontWeight: 300, fontSize: '17px', color: '#0b092b', textAlign: 'center' }}>
                                                        {data.profile.professional?.profession?.checked ?
                                                            data.profile.professional?.profession?.text ?
                                                                data.profile.professional?.profession?.text?.length > 21 ?
                                                                    data.profile.professional?.profession?.text.substring(0, 21) + '...'
                                                                    : data.profile.professional?.profession?.text
                                                                : ''
                                                            : ''}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`tw-h-[60%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                        <div className={`tw-h-[98%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                            <ContainerProfessionalTwo color='#ffffff' textColor='#416b97' profile={data.profile} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className={`tw-h-[15%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                            <div className={`tw-h-[85%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                <HorizontalScrolling colorText="#000000" socialNetworks={data.profile.professional?.urls} />
                            </div>
                        </div>

                        <div className={`tw-h-[37%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                            <div style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', boxShadow: '0 -6px 6px rgba(0, 0, 0, 0.25)' }} className={`tw-h-[100%] tw-w-[100%] tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#cecece]`}>
                                <div className={`tw-h-[20%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                    <div className={` tw-h-[95%] tw-w-[90%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                        {data.profile.professional && (
                                            <SaveContactButtonColor colorButton={'#396593'} profile={data.profile.professional} second={true} />
                                        )}
                                    </div>
                                </div>

                                <div className={`tw-h-[80%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center`}>
                                    <ContainerCards profile={data.profile} />
                                </div>
                            </div>
                        </div>

                        <OneTapLogo />
                    </div>
                </div>
            </div>
            <ModalCookies
                isModalAlert={isCookies}
                handleAceptCookies={handleAceptCookies}
            />
        </div>
    ) : (
        <CustomModalAlert
            isModalAlert={isDataError}
            handleModalAlert={() => setIsDataError(false)}
            title={dictionary?.generalTitle || ''}
            description={dictionary?.cardView?.dataNotFound || ''}
            isClosed={true}
        />
    );
};

export default ProfessionalTwo;