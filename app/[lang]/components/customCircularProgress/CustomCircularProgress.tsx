import { CircularProgress, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CustomCircularProgress = ({ isOpen }: { isOpen: boolean }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal className='tw-flex tw-justify-center tw-items-center' open={open}>
      <CircularProgress />
    </Modal>
  );
};

export default CustomCircularProgress;
