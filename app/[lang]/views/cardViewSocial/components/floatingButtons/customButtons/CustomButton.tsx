import { GetAllSocialNetworks } from '@/reactQuery/home';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const CustomButton = ({
  name,
  link,
  index,
  column,
}: {
  name: string;
  link: string;
  index: number;
  column: number;
}) => {
  const { data } = GetAllSocialNetworks();
  const icon = data?.find((val) => val.name === name);
  const my = (index === 1 || index === 2) && 'tw-mt-8';
  const mx =
    (index === 0 || index === 2) && column == 1
      ? 'tw-ml-5'
      : (index == 0 || index == 2) && column == 2 && '-tw-ml-5';

  return (
    icon?.image && (
      <Link
        className={`tw-rounded-full tw-w-[45px] tw-h-[45px] ${my} ${mx}`}
        href={`http://${link}`}
      >
        <Image src={icon.image} alt={name} width={45} height={45} />
      </Link>
    )
  );
};

export default CustomButton;
