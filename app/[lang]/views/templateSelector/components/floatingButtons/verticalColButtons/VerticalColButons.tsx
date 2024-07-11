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
          <div style={{ display: 'flex', width: '100%' }} key={key}>
            {val.map((value, i) => {
              return (
                <Box sx={{ width: '50%', height: 70, paddingBottom: 2, paddingX: i % 2 === 0 ? 2 : 4, marginLeft: -3,/*  backgroundColor: i % 2 === 0 ? 'black' : 'brown' */ }} key={i}>
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
