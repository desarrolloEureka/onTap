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
      val.icon == 'facebook' || val.icon == 'tiktok' || val.icon == 'messenger'
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {social.map((val, key) => {
        return (
          val.checked && (
            <CustomButton
              name={val.icon}
              link={val.url}
              index={key}
              key={key}
              colum={2}
            />
          )
        );
      })}
    </Box>
  );
};

export default RightButtons;
