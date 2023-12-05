'use client';
import { HomeProps } from '@/types/home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

const Home = ({ dictionary }: HomeProps) => {
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
  /*   const dataListTemplates = [
      { images: ['plantilla2.png', 'plantilla2.png', 'plantilla2.png','plantilla2.png', 'plantilla2.png', 'plantilla2.png'] }
    ];
   */
  const [dataOptions, setDataOptions] = useState(dataList);
  const [optionSelected, setOptionSelected] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeOption = (optionNumber: number) => {
    setOptionSelected(optionNumber);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
        {/*  <div>
        {dictionary && <Login dictionary={dictionary} />}
       <Button className='tw-bg-red-500' variant='contained'>
        Contained
      </Button>
      </div>
       */}
        <div className='tw-bg-[#62ae9b] tw-h-[80px] tw-flex'></div>
        <div className='tw-h-[70px] tw-flex'>
          <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col'>
            <div className='tw-bg-white tw-shadow-md tw-rounded-md tw-h-[50%] tw-w-[90px]  tw-flex'>
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
                Titulo
                {dictionary?.homeTitle}
              </div>
              {/* <div className="tw-text-[#396593]" style={{ fontSize: '0.7rem' }}>Visualizaciones del perfil</div> */}
            </div>
          </div>

          <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'>
            <h4 className='tw-text-black'>{dictionary?.homeView.title}</h4>
          </div>

          <div className='tw-w-1/3 tw-h-full  tw-flex tw-items-center tw-justify-center'>
            <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col'>
              <div className=' tw-rounded-full tw-h-[55%] tw-w-[90px] tw-bg-[#62ae9b] tw-flex tw-items-center tw-justify-center'>
                <div className=' tw-rounded-full tw-h-[90%] tw-w-[40%] tw-bg-white tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-text-black' style={{ fontSize: '0.6rem' }}>
                    Social
                  </div>
                </div>
                <div className=' tw-h-[90%] tw-w-[45%] tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-text-xs'>PRO</div>
                </div>
              </div>

              <div className='tw-h-[30%] tw-w-[50%] ] tw-flex tw-items-center tw-justify-center'>
                <div className='tw-text-black' style={{ fontSize: '0.7rem' }}>
                  Perfil a mostrar
                </div>
              </div>
            </div>

            <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col'>
              <div className=' tw-rounded-full tw-h-[55%] tw-w-[90px] tw-bg-[#62ae9b] tw-flex tw-items-center tw-justify-center'>
                <div className=' tw-rounded-full tw-h-[90%] tw-w-[40%] tw-bg-white tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-text-black' style={{ fontSize: '0.6rem' }}>
                    On
                  </div>
                </div>
                <div className=' tw-h-[90%] tw-w-[45%] tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-text-xs'>Off</div>
                </div>
              </div>

              <div className='tw-h-[30%] tw-w-[50%] ] tw-flex tw-items-center tw-justify-center'>
                <div className='tw-text-black' style={{ fontSize: '0.7rem' }}>
                  Activar tarjeta
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
              Social
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
              Profesional
            </div>
          </div>
          <div
            style={{
              borderBottom: optionSelected === 3 ? '2px solid #396593' : 'none',
            }}
            className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'
            onClick={() => handleChangeOption(3)}
          >
            <div
              className={`${
                optionSelected === 3
                  ? 'tw-text-[#396593]  tw-font-bold'
                  : 'tw-text-[#838383] '
              }`}
            >
              Corporativo
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
      <Modal
        className='tw-flex tw-justify-center tw-justify-items-center tw-pt-14 tw-pb-10'
        open={isModalOpen}
        onClose={handleModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='tw-w-[80%] tw-rounded-2xl tw-bg-primary tw-relative'>
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
            <div className='tw-ml-9'>
              <Typography>Seleccionar</Typography>
            </div>
            <div className='tw-h-[70vh] tw-items-center tw-justify-center tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-mt-3'>
              {dataListTemplates[0].images.map((item, index) => (
                <div
                  key={index}
                  className={`tw-h-[30vh] tw-flex tw-items-center tw-justify-center`}
                >
                  <div className='tw-rounded-md  tw-flex tw-items-center tw-justify-center tw-bg-white'>
                    <Image
                      src={`/images/${item}`}
                      alt={`Image ${item}`}
                      width={200}
                      height={300}
                    />
                  </div>
                </div>
              ))}
            </div>
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
                Guardar
              </span>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
