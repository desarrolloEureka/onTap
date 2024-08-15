import React, { useEffect, useState } from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import ModalCookies from '@/components/customModalAlert/ModalCookies';
import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';
import Container from '@mui/material/Container';
import { Avatar, Typography } from '@mui/material';
import OneTapLogoLink from '@/components/oneTapLogo/OneTapLogoLink';
import BgImage from './bgImage/BgImage';
import ContainerSocialTwo from './container/ContainerSocialTwo';
import InfinityHorizontalScrollingTwo from './InfinityHorizontalScrolling/InfinityHorizontalScrollingTwo';
import SaveContactButtonColor from './saveContactButton/SaveContactButtonColor';
import '../../../styles/fonts.css'

const SocialTwo = ({
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

    return data.profile && data.profile.social ? (
        <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
            <div className={`tw-shadow-md tw-rounded-2xl tw-bg-slate-500`}
                style={{
                    height: isSmallScreen ? windowSize.height : '700px',
                    width: isSmallScreenWidth ? windowSize.width : '380px',
                    overflow: 'hidden',
                }}
            >
                <BgImage background={background} />
                <Container className={`tw-h-[100%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center`}>
                    <div style={{ height: '98%', width: '100%' }}>
                        <div className={`tw-h-[25%] tw-w-[100%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center `}>
                            <div style={{ borderRadius: 12 }} className={`tw-h-[80%] tw-w-[98%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center tw-bg-[#525252] tw-drop-shadow-xl`}>
                                <div className={`tw-h-[95%] tw-w-[91%] tw-flex tw-flex-row tw-content-center tw-items-center tw-justify-center`}>
                                    <div className={`tw-h-[100%] tw-w-[37%] tw-flex tw-flex-col tw-content-center tw-items-start tw-justify-center`}>
                                        <Avatar
                                            alt={'name'}
                                            src={data.image}
                                            variant={'rounded'}
                                            imgProps={{ loading: "lazy" }}
                                            sx={{
                                                width: '110px',
                                                height: '110px',
                                                borderRadius: '100%'
                                            }}
                                        />
                                    </div>
                                    <div className={`tw-h-[100%] tw-w-[63%] tw-flex tw-flex-col tw-content-center tw-items-end tw-justify-center`}>
                                        <div className={`tw-h-[45%] tw-w-[100%] tw-flex tw-flex-row tw-content-center tw-items-center tw-justify-center`}>
                                            <div style={{ borderRadius: 8 }} className={`tw-h-[45%] tw-w-[100%] tw-flex tw-flex-row tw-content-center tw-items-center tw-justify-center tw-bg-[#030124] tw-mt-4`}>
                                                <Typography style={{ fontFamily: 'Canto', fontWeight: 300, fontSize: '17px', color: 'white' }}>{getFullName(data.profile.social)}</Typography>
                                            </div>
                                        </div>
                                        <div style={{ borderTop: '0.5px solid rgba(255, 255, 255, 0.5)' }} className={`tw-h-[55%] tw-w-[100%] tw-flex tw-flex-row tw-items-start tw-justify-center`}>
                                            <div className={`tw-h-[45%] tw-w-[99%] tw-flex tw-flex-row tw-content-center tw-items-center tw-justify-center`}>
                                                <Typography style={{ fontFamily: 'Canto', fontWeight: 300, fontSize: '17px', color: 'white' }}>{data.profile.social?.profession?.checked ? data.profile.social?.profession?.text && data.profile.social?.profession?.text?.length > 22 ? data.profile.social?.profession?.text.substring(0, 22) + '...' : data.profile.social?.profession?.text : ''}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`tw-h-[30%] tw-w-[100%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center`}>
                            <div className={`tw-h-[98%] tw-w-[100%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center`}>
                                <ContainerSocialTwo profile={data.profile} color='#7cab9a' />
                            </div>
                        </div>

                        <div className={`tw-h-[12%] tw-w-[100%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center`}>
                            <div style={{ borderTop: '2px solid #807f90' }} className={`tw-z-10 tw-h-[95%] tw-w-[90%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center`}>
                                {data.profile.social && (
                                    <SaveContactButtonColor colorButton={'#030124'} profile={data.profile.social} second={true} />
                                )}
                            </div>
                        </div>

                        <div className="tw-h-[28%] tw-w-[100%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center">
                            <InfinityHorizontalScrollingTwo socialNetworks={data.profile.social?.urls} />
                        </div>
                        <OneTapLogoLink color={'#030124'} second={true} />
                    </div>
                </Container>
            </div>

            <ModalCookies
                isModalAlert={isCookies}
                //handleModalAlert={() => setIsCookies(false)}
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

export default SocialTwo;
