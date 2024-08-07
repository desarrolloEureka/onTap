import { GetAllSocialNetworks } from '@/reactQuery/home';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';

const CustomButton = ({
  name,
  link,
  nameLabel,
  styles,
}: {
  name: string;
  nameLabel?: string;
  link: string;
  styles?: string;
}) => {
  const { data } = GetAllSocialNetworks();
  const isSmallScreen = useMediaQuery('(max-height:780px)');
  const icon = data?.find((val) => val.name === name);
  const regex = /^https?:\/\//i;
  const linkAux = link.trim();
  let urlLink = '';

  if (regex.test(linkAux)) {
    urlLink = linkAux.replace(regex, '');
  } else {
    urlLink = linkAux;
  }
  return (
    icon?.image && (
      <Link
        className={`tw-rounded-full tw-mt-1 tw-drop-shadow-xl ${styles}`}
        style={{ textDecoration: 'none' }}
        href={`https://${urlLink}`}
        target='_blank'
      >
        <div className='tw-flex tw-items-center tw-justify-center tw-flex-col tw-mx-2'>
          <Image className='tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full' src={icon.image} alt={name} width={isSmallScreen ? 45 : 54} height={isSmallScreen ? 45 : 54} />
          <Typography style={{ width: '100%', textDecoration: 'none' }} className='tw-text-white tw-z-10 tw-text-xs tw-flex tw-items-center tw-justify-center tw-capitalize tw-pt-1' color={'white'}>
            {nameLabel ? nameLabel.length > 9 ? nameLabel.substring(0, 6) + '...' : nameLabel : name}
          </Typography>
        </div>
      </Link>
    )
  );
};

export default CustomButton;