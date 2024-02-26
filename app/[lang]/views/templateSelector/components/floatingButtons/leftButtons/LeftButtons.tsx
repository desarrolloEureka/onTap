import { Box } from '@mui/material';
import React from 'react';
import CustomButton from '../customButtons/CustomButton';
import { UrlDataFormValues } from '@/types/profile';

const LeftButtons = ({
  socialNetworks,
}: {
  socialNetworks: UrlDataFormValues[];
}) => {
  const social = socialNetworks.filter(
    (val) =>
      (val.icon == 'whatsapp' && val.checked) ||
      (val.icon == 'twitter' && val.checked) ||
      (val.icon == 'instagram' && val.checked)
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 90,
      }}
    >
      {social.map((val, key) => {
        const my = (key === 1 || key === 2) && 'tw-mt-5';
        const mx = (key === 0 || key === 2) && 'tw-ml-5';
        // const mx = (key === 0 || key === 2) && 'tw-ml-5 -tw-ml-10';
        return (
          <CustomButton
            name={val.icon}
            link={val.url}
            key={key}
            styles={`${mx}  ${my} tw-w-[90px] tw-flex tw-justify-center`}
          />
        );
      })}
    </Box>
  );
};

export default LeftButtons;
