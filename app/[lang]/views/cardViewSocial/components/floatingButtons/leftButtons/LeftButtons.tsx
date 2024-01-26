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
      val.icon == 'whatsapp' || val.icon == 'twitter' || val.icon == 'instagram'
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
              colum={1}
            />
          )
        );
      })}
    </Box>
  );
};

export default LeftButtons;
