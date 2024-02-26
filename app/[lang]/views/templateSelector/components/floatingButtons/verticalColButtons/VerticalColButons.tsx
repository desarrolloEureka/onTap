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
  return (
    <Container className='tw-flex tw-px-0 tw-pt-16 tw-pb-3 tw-mt-[48px] tw-flex-col tw-justify-center tw-items-center tw-h-56 tw-w-[180px] tw-overflow-y-scroll no-scrollbar'>
      {data.map((val, key) => {
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
                    marginLeft: 1.5,
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
