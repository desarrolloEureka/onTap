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
  const reversedArray = [...finalArray].reverse();

  return (
    /*  <Container className={`tw-flex tw-h-[15%] tw-w-[85%] tw-overflow-scroll tw-relative no-scrollbar tw-items-center tw-justify-center`}> */
    <Container className={`tw-flex tw-h-[15%] tw-w-[95%] tw-overflow-scroll tw-relative no-scrollbar tw-items-center tw-justify-start`}>
      {reversedArray.length > 0 &&
        reversedArray.map((val, i) => (
          <CustomButton
            key={i}
            name={val.icon}
            nameLabel={val.name}
            link={val.url}
            styles={i === 0 ? 'tw-mr-3' : i === reversedArray.length - 1 ? 'tw-ml-3' : 'tw-mx-3'}
          />
        ))}
    </Container>
  );
};

export default InfinityHorizontalScrolling;