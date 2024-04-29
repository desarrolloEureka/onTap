import { Box, Container } from '@mui/system';
import React from 'react';
import CustomButton from '../floatingButtons/customButtons/CustomButton';
import { styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const isSmallScreen = useMediaQuery('(max-height:668px)');
  const reversedArray = finalArray.slice().reverse();

  return (
    <Container className={`${isSmallScreen ? 'tw-h-15' : 'tw-h-24'} tw-h-20 tw-flex tw-w-[310px] tw-overflow-scroll tw-relative no-scrollbar`}>
      {reversedArray.length > 0 &&
        reversedArray.map((val, i) => (
          <CustomButton
            name={val.icon}
            nameLabel={val.name}
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