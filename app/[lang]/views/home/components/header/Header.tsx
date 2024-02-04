import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React from 'react';
import { Dictionary } from '../../../../types/dictionary';
import CustomSwitch from '@/components/customSwitch/CustomSwitch';

const Header = ({
  dictionary,
  views,
}: {
  dictionary: Dictionary;
  views: number;
}) => {
  return (
    <div className='sm:tw-h-[80px] tw-flex'>
      <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col max-sm:tw-mt-2'>
        <div className='tw-bg-white tw-shadow-inner tw-rounded-md tw-h-[50%] tw-w-[90px]  tw-flex'>
          <Button
            disabled
            color='secondary'
            className='tw-h-[100%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'
            startIcon={
              <RemoveRedEyeIcon
                style={{
                  color: '#396593',
                  fontSize: '1.5rem',
                  marginRight: '1rem',
                }}
              />
            }
          >
            <span
              style={{
                color: '#396593',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {views}
            </span>
          </Button>
        </div>
        <div className=' tw-h-[20%] tw-w-[45%] tw-flex tw-items-center tw-justify-center'>
          <div className='tw-text-[#396593]' style={{ fontSize: '0.7rem' }}>
            {dictionary.homeView.views}
          </div>
        </div>
      </div>

      <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'>
        <h4 className='tw-text-black'>{dictionary.homeView.title}</h4>
      </div>

      <div className='tw-w-1/3 tw-h-full  tw-flex tw-items-center tw-justify-center'>
        <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-start tw-flex-col tw-mt-2'>
          <div className=' tw-h-[20%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-text-xs tw-text-black'>
              {dictionary.homeView.profileSwitchLabel}
            </div>
          </div>
          <div className=' tw-h-[60%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
            <CustomSwitch profile={true} />
          </div>

          <div className=' tw-h-[20%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-text-xs tw-text-black'>Social | PRO</div>
          </div>
        </div>
        <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-start tw-flex-col tw-mt-2'>
          <div className=' tw-h-[20%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-text-xs tw-text-black'>
              {dictionary.homeView.cardSwitchLabel}
            </div>
          </div>

          <div className=' tw-h-[60%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
            <CustomSwitch profile={false} />
          </div>
          <div className=' tw-h-[20%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-text-xs tw-text-black'>Off | On</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
