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
    <Container className='tw-h-[100%] tw-w-[90%] tw-overflow-y-scroll no-scrollbar'>
      {reversedArray.map((val, key) => {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px', marginLeft: -15 }} key={key}>
            {val.map((value, i) => {
              return (
                <Box sx={{ width: '100%', height: 74, paddingBottom: 2 }} key={i}>
                  <CustomButton name={value.icon} link={value.url} nameLabel={value.name} key={key} styles={`tw-flex tw-flex-col`} />
                </Box>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};
export default VerticalColButtons;
