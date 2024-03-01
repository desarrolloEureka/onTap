import { Box, Container } from '@mui/system';
import React from 'react';
import CustomButton from '../floatingButtons/customButtons/CustomButton';
import { styled } from '@mui/material';

const MyScrollingElement = styled(Box)(() => ({
  overflow: 'auto',
  scrollbarWidth: 'none', // Hide the scrollbar for firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
  },
  '&-ms-overflow-style:': {
    display: 'none', // Hide the scrollbar for IE
  },
}));

const InfinityHorizontalScrolling = ({ finalArray }: { finalArray: any[] }) => {
  return (
      <Container className='tw-h-30 tw-flex tw-w-[310px] tw-overflow-scroll tw-relative no-scrollbar'>
        {finalArray.length > 0 && 
          
            finalArray.map((val, i) => (
              <CustomButton
                name={val.icon}
                link={val.url}
                styles={'tw-mx-3'}
                key={i}
              />
            ))
        }
      </Container>
  );
};

export default InfinityHorizontalScrolling;
