import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React, { useEffect, useState } from 'react';
import { Dictionary } from '../../../../types/dictionary';
import CustomSwitch from '@/components/customSwitch/CustomSwitch';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import { GetUser } from '@/reactQuery/users';
import { Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Header = ({
  dictionary,
  views,
}: {
  dictionary: Dictionary;
  views: number;
}) => {
  const [isModalAlert, setIsModalAlert] = useState(false);
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);
  const urlSplit = window.location.href.split('/');
  const { data, error } = GetUser();
  const [copied, setCopied] = useState(false);
  const [urlGlobal, setUrlGlobal] = useState('');

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(urlGlobal || '');
  };

  useEffect(() => {
    if (data && data.preview) {
      const url = data?.preview;
      const nuevaURL = url && url.replace(/localhost:3000|on-tap-tawny.vercel.app/g, 'backoffice.onetap.com.co');
      setUrlGlobal(nuevaURL);
    }
  }, [data])

  return (
    <div className='sm:tw-h-[80px] tw-flex'>
      <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col max-sm:tw-mt-2 tw-pt-1'>
        <div className='tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center'>
          <div className='tw-mt-4'>
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
                      marginRight: '0.2rem',
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
            <div className=' tw-h-[20%] tw-w-[50%] tw-flex tw-items-center tw-justify-center tw-pt-2'>
              <div className='tw-text-[#396593]' style={{ fontSize: '0.9rem' }}>
                <Typography className='tw-text-[#396593] tw-w-[200px] tw-text-base'>
                  {dictionary.homeView.views}
                </Typography>
              </div>
            </div>
          </div>
          {/*   <div className='tw-w-[100px] tw-align-middle tw-items-center tw-flex tw-flex-col' onClick={() => copyToClipboard()}>
            <Typography className='tw-text-[#396593] tw-text-sm'>
              {dictionary.homeView.copyUrlButtonLabel}
            </Typography>
            <ContentCopyIcon sx={{ color: '#396593', }} />
            <div>
              <Typography
                className='tw-text-[#396593] tw-text-xs'
                sx={{
                  display: copied ? 'block' : 'none'
                }}
              >
                {dictionary.homeView.copyUrlMessageLabel}
              </Typography>
            </div>
          </div> */}
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
            <CustomSwitch profile={true} handleModalAlert={handleModalAlert} />
          </div>

          <div className=' tw-h-[20%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-text-xs tw-text-black'>
              {dictionary?.homeView?.social} |{' '}
              {dictionary?.homeView?.professionalSwitch}
            </div>
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

      <CustomModalAlert
        handleModalAlert={handleModalAlert}
        title={dictionary?.homeView?.labelDenyAccess}
        description={dictionary?.homeView?.labelDenyAccessDescription}
        isModalAlert={isModalAlert}
        isClosed={true}
      />
    </div>
  );
};

export default Header;
