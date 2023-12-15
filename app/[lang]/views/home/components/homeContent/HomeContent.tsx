import { Dictionary } from '@/types/dictionary';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import ButtonTab from '../buttonTab/ButtonTab';
import Header from '../header/Header';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import LogOut from '@/hooks/logOut/LogOut';

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

const HomeContent = ({ dictionary }: { dictionary: Dictionary }) => {
  const [optionSelected, setOptionSelected] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOptions, setDataOptions] = useState(dataList);
  const { logOut } = LogOut();

  const handleChangeOption = (optionNumber: number) => {
    setOptionSelected(optionNumber);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    dictionary && (
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center tw-h-screen">
        <Header dictionary={dictionary} />
        <div
          className='tw-h-[60px] tw-flex'
          style={{ borderBottom: '1px solid #C2C2C2' }}
        >
          <ButtonTab
            dictionary={dictionary}
            index={1}
            optionSelected={optionSelected}
            title={dictionary?.homeView.social}
            handleChangeOption={handleChangeOption}
          />
          <ButtonTab
            dictionary={dictionary}
            index={2}
            optionSelected={optionSelected}
            title={dictionary?.homeView.professional}
            handleChangeOption={handleChangeOption}
          />
          <ButtonTab
            dictionary={dictionary}
            index={3}
            optionSelected={optionSelected}
            title={dictionary?.homeView.corporate}
            handleChangeOption={handleChangeOption}
            disabled
          />
        </div>

        <div className='tw-flex tw-items-center tw-justify-center'>
          <div className='tw-grid tw-grid-cols-3  lg:tw-w-[1300px] xl:tw-w-[1250px]'>
            {optionSelected === 1
              ? dataList[0].images.map((item, index) => (
                  <div
                    key={index}
                    className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                  >
                    <div className='tw-relative tw-rounded-md tw-h-[80%] tw-w-[95%] tw-flex tw-items-center tw-justify-center'>
                      <Image
                        priority={false}
                        src={`/images/${item}`}
                        alt={`Image ${item}`}
                        width={377}
                        height={484}
                      />

                      <div className='tw-absolute tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[25%] tw-flex tw-items-center tw-justify-center '>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                              <div className='tw-w-[40%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                                <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-center tw-justify-center'>
                                  <VisibilityIcon
                                    style={{ fontSize: '1.8rem' }}
                                  />
                                </div>
                                <div className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center'>
                                  <span
                                    style={{ fontSize: '9px' }}
                                    className='tw-text-white'
                                  >
                                    vista <br /> previa
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                              <div className='tw-w-[40%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                <RadioButtonUncheckedOutlinedIcon
                                  style={{ fontSize: '1rem' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-center '>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                              <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                <span
                                  style={{ fontSize: '14px' }}
                                  className='tw-text-white'
                                >
                                  Plantilla {index + 1}
                                </span>
                              </div>
                            </div>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                              <Button
                                style={{ borderRadius: 0 }}
                                onClick={() => handleModal()}
                                className='tw-w-[60%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'
                              >
                                <div className='tw-w-[100%] tw-h-[60%] tw-flex tw-items-center tw-justify-center'>
                                  <DynamicFeedOutlinedIcon
                                    style={{
                                      fontSize: '2rem',
                                      color: 'white',
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    textTransform: 'none',
                                    borderRadius: 0,
                                  }}
                                  className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center'
                                >
                                  <span
                                    style={{ fontSize: '9px' }}
                                    className='tw-text-white'
                                  >
                                    Cambiar fondo <br /> plantilla
                                  </span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : optionSelected === 2
              ? dataList[1].images.map((item, index) => (
                  <div
                    key={index}
                    className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                  >
                    <div className='tw-relative tw-rounded-md tw-h-[80%] tw-w-[95%] tw-flex tw-items-center tw-justify-center'>
                      <Image
                        priority={false}
                        src={`/images/${item}`}
                        alt={`Image ${item}`}
                        width={377}
                        height={484}
                      />

                      <div className='tw-absolute tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[25%] tw-flex tw-items-center tw-justify-center '>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                              <div className='tw-w-[40%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                                <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-center tw-justify-center'>
                                  <VisibilityIcon
                                    style={{ fontSize: '1.8rem' }}
                                  />
                                </div>
                                <div className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center'>
                                  <span
                                    style={{ fontSize: '9px' }}
                                    className='tw-text-white'
                                  >
                                    vista <br /> previa
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                              <div className='tw-w-[40%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                <RadioButtonUncheckedOutlinedIcon
                                  style={{ fontSize: '1rem' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-center '>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                              <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                <span
                                  style={{ fontSize: '14px' }}
                                  className='tw-text-white'
                                >
                                  Plantilla {index + 1}
                                </span>
                              </div>
                            </div>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                              <Button
                                style={{ borderRadius: 0 }}
                                onClick={() => handleModal()}
                                className='tw-w-[60%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'
                              >
                                <div className='tw-w-[100%] tw-h-[60%] tw-flex tw-items-center tw-justify-center'>
                                  <DynamicFeedOutlinedIcon
                                    style={{
                                      fontSize: '2rem',
                                      color: 'white',
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    textTransform: 'none',
                                    borderRadius: 0,
                                  }}
                                  className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center'
                                >
                                  <span
                                    style={{ fontSize: '9px' }}
                                    className='tw-text-white'
                                  >
                                    Cambiar fondo <br /> plantilla
                                  </span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
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

        <Button onClick={logOut}>{dictionary?.logOut}</Button>
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
      </div>
    )
  );
};

export default HomeContent;
