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
      }}
    >
      {social.map((val, key) => {
        return (
          <CustomButton
            name={val.icon}
            link={val.url}
            index={key}
            key={key}
            column={1}
          />
        );
      })}
    </Box>
  );
};

export default LeftButtons;
