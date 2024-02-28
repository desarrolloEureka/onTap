import { Box } from '@mui/system';
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
    <Box sx={{ height: 30, px: 4 }}>
      {finalArray.length > 0 && (
        <MyScrollingElement
          sx={{
            display: 'flex',
            height: 100,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {finalArray.map((val, i) => (
              <CustomButton
                name={val.icon}
                link={val.url}
                styles={'tw-mx-3'}
                key={i}
                
              />
            ))}
          </Box>
        </MyScrollingElement>
      )}
    </Box>
  );
};

export default InfinityHorizontalScrolling;
