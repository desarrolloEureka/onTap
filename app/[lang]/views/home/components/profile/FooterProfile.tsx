'use client';
import React from 'react';
import { Button, Container } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { Dictionary } from '@/types/dictionary';
import ProfileHook from './hooks/ProfileHook';
import { DataForm } from '@/types/profile';

const FooterProfile = ({
  handleModal,
  dictionary,
  dataForm,
  handleDataSet,
}: {
  handleModal: () => void;
  dictionary: Dictionary;
  handleDataSet: (e: DataForm) => void;
  dataForm: any;
}) => {
  const { handleSwitchAll } = ProfileHook({
    dictionary,
    handleDataSet,
    dataForm,
  });
  return (
    <div className='tw-h-[110px] tw-flex tw-items-center tw-justify-center '>
      <Container className='tw-h-[90%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>
        <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
          <div className=' tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
            <div className=' tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
              <span
                style={{
                  color: '#000000',
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                {dictionary?.profileView.labelSwitchMain}
              </span>
            </div>
            <div className=' tw-h-[70%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
              <CustomSwitchGeneral
                name='all_true'
                handleSwitch={(e: any) => handleSwitchAll(e)}
              />
            </div>
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
              <span
                style={{
                  color: '#030124 ',
                  fontSize: '0.8rem',
                  textTransform: 'none',
                }}
              >
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