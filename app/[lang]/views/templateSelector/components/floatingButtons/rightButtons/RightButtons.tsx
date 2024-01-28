import { Box } from '@mui/material';
import React from 'react';
import CustomButton from '../customButtons/CustomButton';
import { UrlDataFormValues } from '@/types/profile';

const RightButtons = ({
  socialNetworks,
}: {
  socialNetworks: UrlDataFormValues[];
}) => {
  const social = socialNetworks.filter(
    (val) =>
      (val.icon == 'facebook' && val.checked) ||
      (val.icon == 'tiktok' && val.checked) ||
      (val.icon == 'messenger' && val.checked)
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      {social.map((val, key) => {
        const my = (key === 1 || key === 2) && 'tw-mt-8';
        const mx = (key === 0 || key === 2) && '-tw-ml-5';
        return (
          <CustomButton
            name={val.icon}
            link={val.url}
            key={key}
            styles={`${mx} ${my}`}
          />
        );
      })}
    </Box>
  );
};

export default RightButtons;
