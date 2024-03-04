import { GetAllSocialNetworks } from '@/reactQuery/home';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';

const CustomButton = ({
  name,
  link,
  styles,
}: {
  name: string;
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
        href={`http://${urlLink}`}
      >
        <Image className='tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full' src={icon.image} alt={name} width={isSmallScreenOne ? 50 : 60} height={isSmallScreenOne ? 50 : 60} />
      </Link>
    )
  );
};

export default CustomButton;
