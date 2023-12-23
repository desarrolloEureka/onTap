import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

const CustomCircularProgress = ({ isOpen }: { isOpen: boolean }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Box className='tw-flex tw-justify-center tw-items-center tw-h-screen'>
      <CircularProgress />
    </Box>
  );
};

export default CustomCircularProgress;
