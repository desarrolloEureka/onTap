import { Box, Container } from '@mui/material';
import React from 'react';
import CustomButton from '../customButtons/CustomButton';
import { UrlDataFormValues } from '@/types/profile';
import { getSocialNetworksOrderedByObject } from '@/globals/functionsTemplateProfessionalOne';

const VerticalColButtons = ({
  socialNetworks,
}: {
  socialNetworks: UrlDataFormValues[];
}) => {
  const { data } = getSocialNetworksOrderedByObject(socialNetworks, 2);
  const reversedArray = data.slice().reverse();

  return (
    <Container className='tw-mt-12 tw-h-[250px] tw-w-[220px] tw-overflow-y-scroll no-scrollbar'>
      {reversedArray.map((val, key) => {
        return (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
            }}
            key={key}
          >
            {val.map((value, i) => {
              return (
                <Box
                  sx={{
                    width: '100%',
                    height: 70,
                    marginLeft: -1,
                  }}
                  key={i}
                >
                  <CustomButton
                    name={value.icon}
                    link={value.url}
                    key={key}
                    styles={`tw-flex tw-flex-col`}
                  />
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Container>
  );
};
export default VerticalColButtons;
