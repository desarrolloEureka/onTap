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
  const regex = /^https?:\/\//i;
  let urlLink = ''

  if (regex.test(link)) {
    urlLink = link.replace(regex, '');
  } else {
    urlLink = link;
  }

  console.log("http://" + urlLink);

  return (
    icon?.image && (
      <Link
        className={`tw-rounded-full tw-drop-shadow-xl ${styles}`}
        href={`http://${urlLink}`}
      >
        <Image src={icon.image} alt={name} width={70} height={70} />
      </Link>
    )
  );
};

export default CustomButton;
