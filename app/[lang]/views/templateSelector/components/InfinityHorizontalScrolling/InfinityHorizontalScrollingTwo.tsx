import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { styled } from '@mui/material';
import Image from 'next/image';
import FooterHook from '../footer/hooks/FooterHook';
import { UrlDataFormValues } from '@/types/profile';
import { GetAllSocialNetworks } from '@/reactQuery/home';
import Link from 'next/link';

//Ajustes front del scroll
const CustomHorizontalContainer = styled(Container)`
    &::-webkit-scrollbar {
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
        border: 3px solid #9d9d9d;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const InfinityHorizontalScrollingTwo = ({ socialNetworks, fullSocialIcons }: { socialNetworks: UrlDataFormValues[] | undefined; fullSocialIcons?: boolean; }) => {
    const { data } = GetAllSocialNetworks();
    const { finalArray } = FooterHook({ socialNetworks, fullSocialIcons });
    const isSmallScreenIcons = useMediaQuery('(max-height:780px)');
    const reversedArray = [...finalArray].reverse();
    let urlLink = '';

    //Separa la data, entre dos partes 
    const evenRowItems = reversedArray.filter((_, index) => index % 2 === 0);
    const oddRowItems = reversedArray.filter((_, index) => index % 2 !== 0);

    //Conocer la cantidad de datos, dependiendo de esto se ralizaran ciertos ajustes visuales 
    const evenRowCenter = finalArray.filter((_: any, index: number) => index % 2 === 0).length < 4;
    const oddRowCenter = finalArray.filter((_: any, index: number) => index % 2 !== 0).length < 4;
    const RowCenter = finalArray.length <= 8;
    const regex = /^https?:\/\//i;

    //Retorna la img del icono 
    const getImageSrc = (name: string) => {
        const icon = data && data.find((val: any) => val.name === name);
        return icon && icon.image;
    };

    //Retorna lnk url de cada red social
    const geturl = (link: string) => {
        if (regex.test(link)) {
            urlLink = link.replace(regex, '');
        } else {
            urlLink = link;
        }
        return urlLink && urlLink;
    };

    return reversedArray && (
        <CustomHorizontalContainer className="tw-flex tw-h-[90%] tw-w-[100%] tw-p-0 tw-overflow-scroll tw-z-10 tw-overflow-y-hidden" style={{ transform: 'rotateX(180deg)', justifyContent: RowCenter ? 'center' : '' }}>
            <div className="tw-flex tw-flex-col tw-pt-2" style={{ transform: 'rotateX(180deg)', justifyContent: 'center' }}>
                <div className={`tw-flex tw-h-[50%] ${evenRowCenter ? 'tw-justify-center' : ''}`}>
                    {evenRowItems.map((val, i) => {
                        const imageSrc = getImageSrc(val.icon);
                        const urlLink = geturl(val.url);
                        return imageSrc && urlLink ? (
                            <Link
                                key={i}
                                className="tw-flex tw-h-[90%] tw-w-[80px] tw-px-0 tw-m-1 tw-flex-col tw-items-center tw-justify-center"
                                href={`https://${urlLink}`}
                                style={{ textDecoration: 'none' }}
                                target='_blank'
                            >
                                <Image className="tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full" src={imageSrc} alt={val.name || 'Social Icon'} width={isSmallScreenIcons ? 47 : 58} height={isSmallScreenIcons ? 47 : 58} />
                                <Typography style={{ textDecoration: 'none' }} className="tw-text-white tw-z-10 tw-text-xs tw-flex tw-items-center tw-justify-center tw-capitalize tw-pt-1" color="white">
                                    {val.name ? (val.name.length > 9 ? `${val.name.substring(0, 6)}...` : val.name) : val.name}
                                </Typography>
                            </Link>
                        ) : null;
                    })}
                </div>
                <div className={`tw-flex tw-pt-2 tw-h-[50%] ${oddRowCenter ? 'tw-justify-center' : ''}`}>
                    {oddRowItems.map((val, i) => {
                        const imageSrc = getImageSrc(val.icon);
                        return imageSrc ? (
                            <div
                                key={i}
                                className="tw-flex tw-h-[90%] tw-w-[80px] tw-px-0 tw-m-1 tw-flex-col tw-items-center tw-justify-center"
                            >
                                <Image className='tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full' src={imageSrc} alt={val.name || 'Social Icon'} width={isSmallScreenIcons ? 47 : 58} height={isSmallScreenIcons ? 47 : 58} />
                                <Typography style={{ width: '100%', textDecoration: 'none' }} className='tw-text-white tw-z-10 tw-text-xs tw-flex tw-items-center tw-justify-center tw-capitalize tw-pt-1' color={'white'}>
                                    {val.name ? val.name.length > 9 ? val.name.substring(0, 6) + '...' : val.name : val.name}
                                </Typography>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>
        </CustomHorizontalContainer>
    );
};

export default InfinityHorizontalScrollingTwo;