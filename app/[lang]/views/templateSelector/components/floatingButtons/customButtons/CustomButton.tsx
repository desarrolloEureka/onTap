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
  const icon = data?.find((val) => val.name === name);
  const regex = /^https?:\/\//i;
  let urlLink = '';

  if (regex.test(link)) {
    urlLink = link.replace(regex, '');
  } else {
    urlLink = link;
  }

  const isSmallScreenOne = useMediaQuery('(max-height:799px)');

  return (
    icon?.image && (
      <Link
        className={`tw-rounded-full tw-mt-2 tw-drop-shadow-xl ${styles}`}
        style={{ textDecoration: 'none' }}
        href={`https://${urlLink}`}
        target='_blank'
      >
        <div className='tw-flex tw-items-center tw-flex-col'>
          <Image className='tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full' src={icon.image} alt={name} width={isSmallScreenOne ? 47 : 57} height={isSmallScreenOne ? 47 : 57} />
          <Typography style={{ width: '100%', textDecoration: 'none' }} className='tw-text-white tw-z-10 tw-text-xs tw-flex tw-items-center tw-justify-center tw-capitalize tw-pt-0.5 tw-pl-1' color={'white'}>
            {nameLabel ? nameLabel.length > 9 ? nameLabel.substring(0, 9) + '...' : nameLabel : name}
          </Typography>
        </div>

      </Link>
    )
  );
};

export default CustomButton;