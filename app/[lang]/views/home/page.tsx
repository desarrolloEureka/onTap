'use client';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from 'i18n-config';
import CustomSwitch from '@/components/customSwitch/CustomSwitch';
import useDictionary from '@/hooks/dictionary/useDictionary';
import HomeHook from './hooks/HomeHook';
import Menu from '@/components/menu/Menu';
import Profile from './profile/Profile';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Home = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const dataList = [
    {
      name: 'Social',
      images: ['plantilla.png', 'plantilla.png', 'plantilla.png'],
    },
    {
      name: 'Profesional',
      images: ['plantilla.png', 'plantilla.png'],
    },
    {
      name: 'Corporativo',
      images: ['plantilla.png'],
    },
  ];

  const dataListTemplates = [
    {
      images: [
        'plantilla2.png',
        'plantilla2.png',
        'plantilla2.png',
        'plantilla2.png',
        'plantilla2.png',
        'plantilla2.png',
      ],
    },
  ];

  const [dataOptions, setDataOptions] = useState(dataList);
  const [optionSelected, setOptionSelected] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProUser, setIsProUser] = useState(true);

  const { HandleNavTab, handleChange, value } = HomeHook();

  const handleChangeOption = (optionNumber: number) => {
    setOptionSelected(optionNumber);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const HomeT = () => {
    return (
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
        <div className='tw-h-[70px] tw-flex'>
          <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col'>
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
                  12
                </span>
              </Button>
            </div>
            <div className=' tw-h-[20%] tw-w-[45%] tw-flex tw-items-center tw-justify-center'>
              <div className='tw-text-[#396593]' style={{ fontSize: '0.7rem' }}>
                {dictionary?.homeView.views}
              </div>
              {/* <div className="tw-text-[#396593]" style={{ fontSize: '0.7rem' }}>Visualizaciones del perfil</div> */}
            </div>
          </div>

          <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'>
            <h4 className='tw-text-black'>{dictionary?.homeView.title}</h4>
          </div>

          <div className='tw-w-1/3 tw-h-full  tw-flex tw-items-center tw-justify-center'>
            <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-start tw-flex-col tw-mt-2'>
              <CustomSwitch />
              <div className=' tw-h-[90%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
                <div className='tw-text-xs tw-text-black'>
                  {dictionary?.homeView.profileSwitchLabel}
                </div>
              </div>
            </div>
            <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-start tw-flex-col tw-mt-2'>
              <CustomSwitch />
              <div className=' tw-h-[90%] tw-w-[70%] tw-flex tw-items-center tw-justify-center'>
                <div className='tw-text-xs tw-text-black'>
                  {dictionary?.homeView.cardSwitchLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className='tw-h-[60px] tw-flex'
          style={{ borderBottom: '1px solid #C2C2C2' }}
        >
          <div
            style={{
              borderBottom: optionSelected === 1 ? '2px solid #396593' : 'none',
            }}
            className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'
            onClick={() => handleChangeOption(1)}
          >
            <div
              className={`${
                optionSelected === 1
                  ? 'tw-text-[#396593] tw-font-bold'
                  : 'tw-text-[#838383] '
              }`}
            >
              {dictionary?.homeView.social}
            </div>
          </div>
          <div
            style={{
              borderBottom: optionSelected === 2 ? '2px solid #396593' : 'none',
            }}
            className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'
            onClick={() => handleChangeOption(2)}
          >
            <div
              className={`${
                optionSelected === 2
                  ? 'tw-text-[#396593]  tw-font-bold'
                  : 'tw-text-[#838383] '
              }`}
            >
              {dictionary?.homeView.professional}
            </div>
          </div>
          <div
            style={{
              borderBottom: optionSelected === 3 ? '2px solid #396593' : 'none',
            }}
            className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'
            onClick={() => handleChangeOption(3)}
          >
            <Link href='/views/profile'>profile</Link>

            <div
              className={`${
                optionSelected === 3
                  ? 'tw-text-[#396593]  tw-font-bold'
                  : 'tw-text-[#838383] '
              }`}
            >
              {dictionary?.homeView.corporate}
            </div>
          </div>
        </div>

        <div className='tw-flex tw-items-center tw-justify-center'>
          <div className='tw-grid tw-grid-cols-3  lg:tw-w-[1300px] xl:tw-w-[1250px]'>
            {optionSelected === 1
              ? dataList[0].images.map((item, index) => (
                  <div
                    key={index}
                    className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                    onClick={() => handleModal()}
                  >
                    <div className='tw-rounded-md tw-h-[80%] tw-w-[100px] tw-flex tw-items-center tw-justify-center tw-bg-[#62ae9b] '>
                      <Image
                        priority={false}
                        src={`/images/${item}`}
                        alt={`Image ${item}`}
                        width={377}
                        height={484}
                      />
                    </div>
                  </div>
                ))
              : optionSelected === 2
              ? dataList[1].images.map((item, index) => (
                  <div
                    key={index}
                    className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                    onClick={() => handleModal()}
                  >
                    <div className='tw-rounded-md tw-h-[80%] tw-w-[120px] tw-flex tw-items-center tw-justify-center '>
                      <Image
                        src={`/images/${item}`}
                        alt={`Image ${item}`}
                        width={387}
                        height={494}
                      />
                    </div>
                  </div>
                ))
              : dataList[2].images.map((item, index) => (
                  <div
                    key={index}
                    className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                    onClick={() => handleModal()}
                  >
                    <div className='tw-rounded-md tw-h-[80%] tw-w-[120px] tw-flex tw-items-center tw-justify-center '>
                      <Image
                        src={`/images/${item}`}
                        alt={`Image ${item}`}
                        width={387}
                        height={494}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {isModalOpen ? (
          <div
            className='tw-flex tw-justify-center tw-items-center '
            style={{
              zIndex: 1,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          ></div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    value === 1 ? setIsProUser(false) : setIsProUser(true);
  }, [value]);

  return (
    dictionary && (
      <>
        <Menu dictionary={dictionary} handleChange={handleChange} value={value}>
          <CustomTabPanel value={value} index={0}>
            <HomeT />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Profile dictionary={dictionary} isProUser={isProUser} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Profile dictionary={dictionary} isProUser={isProUser} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            Item Four
          </CustomTabPanel>
        </Menu>
        <Modal
          className='tw-flex tw-justify-center tw-justify-items-center tw-pt-14 tw-pb-10'
          open={isModalOpen}
          onClose={handleModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className='tw-flex tw-flex-col tw-justify-evenly tw-w-[80%] tw-rounded-2xl tw-bg-primary tw-relative'>
            <div className='tw-absolute tw-right-1 tw-top-2'>
              <Button
                color='secondary'
                className='tw-h-[100%] tw-w-[100%]'
                startIcon={
                  <CloseIcon
                    style={{
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      marginLeft: '0.5rem',
                    }}
                  />
                }
                onClick={handleModal}
              />
            </div>
            <div className='tw-px-16 tw-pt-10'>
              <div className='tw-ml-9 tw-mb-4'>
                <Typography>{dictionary?.homeView.selectModalTitle}</Typography>
              </div>
              <Grid container spacing={2}>
                {dataListTemplates[0].images.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <div className='tw-flex tw-items-center tw-justify-center'>
                      <Image
                        src={`/images/${item}`}
                        alt={`Image ${item}`}
                        width={200}
                        height={250}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className='tw-flex tw-justify-start tw-mt-3 tw-pl-20 tw-pt-1 tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid'>
              <Button
                disabled
                color='secondary'
                size='medium'
                startIcon={
                  <AddCircleIcon
                    style={{
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      marginLeft: '0.5rem',
                    }}
                  />
                }
              >
                <span style={{ color: '#000000 ', fontSize: '1rem' }}>
                  {dictionary?.homeView.saveButtonLabel}
                </span>
              </Button>
            </div>
          </Box>
        </Modal>
      </>
    )
  );
};

export default Home;
