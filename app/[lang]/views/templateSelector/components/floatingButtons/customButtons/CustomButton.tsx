import { GetAllSocialNetworks } from '@/reactQuery/home';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

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
  // console.log('icon', icon);

  return (
    icon?.image && (
      <Link
        className={`tw-rounded-full tw-drop-shadow-xl tw-w-[45px] tw-h-[45px] ${styles}`}
        href={`http://${link}`}
      >
        <Image src={icon.image} alt={name} width={45} height={45} />
      </Link>
    )
  );
};

export default CustomButton;
