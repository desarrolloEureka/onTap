'use client';
import React from 'react';
import { Button, Container } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { Dictionary } from '@/types/dictionary';

const FooterProfile = ({
  handleModal,
  dictionary,
}: {
  handleModal: () => void;
  dictionary: Dictionary;
}) => {
  return (
    <div className='tw-h-[110px] tw-flex tw-items-center tw-justify-center '>
      <Container className='tw-h-[90%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>
        <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
          <div className=' tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
            <CustomSwitchGeneral />
          </div>
        </div>
        <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-end tw-justify-center'>
          <div className='tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
            <Button
              onClick={handleModal}
              color='secondary'
              size='medium'
              startIcon={
                <AddCircleOutlinedIcon
                  style={{
                    color: '#62AD9B',
                    fontSize: '1.6em',
                    marginLeft: '0rem',
                  }}
                />
              }
            >
              <span style={{ color: '#030124 ', fontSize: '0.8rem' }}>
                {dictionary?.profileView.buttonAddData}
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterProfile;
