'use client';
import { useState } from 'react';
import { Locale } from 'i18n-config';
import useHomeHook from '@/views/home/hook/homeHook';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Button } from '@mui/material';
import { SetLangQuery } from '@/reactQuery/lang';
import Login from '@/components/login/Login';
import Menu from '@/components/menu/Menu';
import Image from 'next/image';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { HomeProps } from '@/types/home';

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
    { images: ['plantilla2.png', 'plantilla2.png', 'plantilla2.png', 'plantilla2.png', 'plantilla2.png', 'plantilla2.png'] }
  ];
  /*   const dataListTemplates = [
      { images: ['plantilla2.png', 'plantilla2.png', 'plantilla2.png','plantilla2.png', 'plantilla2.png', 'plantilla2.png'] }
    ];
   */
  /*   const { dictionary } = useDictionary({ lang });
    const { isLoading, users, error } = useHomeHook();
    SetLangQuery(lang);
    const { data } = SetLangQuery(lang); */
  const [dataOptions, setDataOptions] = useState(dataList);
  const [optionSelected, setOptionSelected] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeOption = (optionNumber: number) => {
    setOptionSelected(optionNumber);
  }

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center tw-h-screen">
      {/*  <div>
        {dictionary && <Login dictionary={dictionary} />}
       <Button className='tw-bg-red-500' variant='contained'>
        Contained
      </Button>
      </div>
       */}
      <div className='tw-bg-[#62ae9b] tw-h-[80px] tw-flex'>
      </div>
      <div className='tw-h-[70px] tw-flex'>
        <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col'>
          <div className='tw-bg-white tw-shadow-md tw-rounded-md tw-h-[50%] tw-w-[90px]  tw-flex'>
            <Button disabled color="secondary" className='tw-h-[100%] tw-w-[100%] tw-flex tw-items-center tw-justify-center' startIcon={<RemoveRedEyeIcon style={{ color: '#396593', fontSize: '1.5rem', marginRight: '1rem' }} />}>
              <span style={{ color: '#396593', fontSize: '1rem', fontWeight: 'bold' }}>12</span>
            </Button>
          </div>
          <div className=' tw-h-[20%] tw-w-[45%] tw-flex tw-items-center tw-justify-center'>
            <div className="tw-text-[#396593]" style={{ fontSize: '0.7rem' }}>Titulo
            {dictionary?.homeTitle}</div>
            {/* <div className="tw-text-[#396593]" style={{ fontSize: '0.7rem' }}>Visualizaciones del perfil</div> */}
          </div>
        </div>

        <div className='tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center'>
          <h4 className="tw-text-black">{dictionary?.homeView.title}</h4>
        </div>

        <div className='tw-w-1/3 tw-h-full  tw-flex tw-items-center tw-justify-center'>

          <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col'>
            <div className=' tw-rounded-full tw-h-[55%] tw-w-[90px] tw-bg-[#62ae9b] tw-flex tw-items-center tw-justify-center'>
              <div className=' tw-rounded-full tw-h-[90%] tw-w-[40%] tw-bg-white tw-flex tw-items-center tw-justify-center'>
                <div className="tw-text-black" style={{ fontSize: '0.6rem' }}>Social</div>
              </div>
              <div className=' tw-h-[90%] tw-w-[45%] tw-flex tw-items-center tw-justify-center'>
                <div className="tw-text-xs">PRO</div>
              </div>
            </div>

            <div className='tw-h-[30%] tw-w-[50%] ] tw-flex tw-items-center tw-justify-center'>
              <div className="tw-text-black" style={{ fontSize: '0.7rem' }}>Perfil a mostrar</div>
            </div>
          </div>

          <div className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col'>
            <div className=' tw-rounded-full tw-h-[55%] tw-w-[90px] tw-bg-[#62ae9b] tw-flex tw-items-center tw-justify-center'>
              <div className=' tw-rounded-full tw-h-[90%] tw-w-[40%] tw-bg-white tw-flex tw-items-center tw-justify-center'>
                <div className="tw-text-black" style={{ fontSize: '0.6rem' }}>On</div>
              </div>
              <div className=' tw-h-[90%] tw-w-[45%] tw-flex tw-items-center tw-justify-center'>
                <div className="tw-text-xs">Off</div>
              </div>
            </div>

            <div className='tw-h-[30%] tw-w-[50%] ] tw-flex tw-items-center tw-justify-center'>
              <div className="tw-text-black" style={{ fontSize: '0.7rem' }}>Activar tarjeta</div>
            </div>
          </div>
        </div>
      </div>

      <div className='tw-h-[60px] tw-flex' style={{ borderBottom: '1px solid #C2C2C2' }}>
        <div style={{ borderBottom: optionSelected === 1 ? '2px solid #396593' : 'none', }} className="tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center" onClick={() => handleChangeOption(1)}>
          <div className={`${optionSelected === 1 ? 'tw-text-[#396593] tw-font-bold' : 'tw-text-[#838383] '}`}>Social</div>
        </div>
        <div style={{ borderBottom: optionSelected === 2 ? '2px solid #396593' : 'none', }} className="tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center" onClick={() => handleChangeOption(2)}>
          <div className={`${optionSelected === 2 ? 'tw-text-[#396593]  tw-font-bold' : 'tw-text-[#838383] '}`}>Profesional</div>
        </div>
        <div style={{ borderBottom: optionSelected === 3 ? '2px solid #396593' : 'none', }} className="tw-w-1/3 tw-h-full tw-flex tw-items-center tw-justify-center" onClick={() => handleChangeOption(3)}>
          <div className={`${optionSelected === 3 ? 'tw-text-[#396593]  tw-font-bold' : 'tw-text-[#838383] '}`}>Corporativo</div>
        </div>
      </div>

      <div className="tw-flex tw-items-center tw-justify-center">
        <div className="tw-grid tw-grid-cols-3  lg:tw-w-[1300px] xl:tw-w-[1250px]">
          {optionSelected === 1 ?
            dataList[0].images.map((item, index) => (
              <div key={index} className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`} onClick={() => handleModal()}>
                <div className='tw-rounded-md tw-h-[80%] tw-w-[100px] tw-flex tw-items-center tw-justify-center tw-bg-[#62ae9b] '>
                  <Image src={`/images/${item}`} alt={`Image ${item}`} width={377} height={484} />
                </div>
              </div>
            ))
            :
            optionSelected === 2 ?
              dataList[1].images.map((item, index) => (
                <div key={index} className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`} onClick={() => handleModal()}>
                  <div className='tw-rounded-md tw-h-[80%] tw-w-[120px] tw-flex tw-items-center tw-justify-center '>
                    <Image src={`/images/${item}`} alt={`Image ${item}`} width={387} height={494} />
                  </div>
                </div>
              ))
              :
              dataList[2].images.map((item, index) => (
                <div key={index} className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`} onClick={() => handleModal()}>
                  <div className='tw-rounded-md tw-h-[80%] tw-w-[120px] tw-flex tw-items-center tw-justify-center '>
                    <Image src={`/images/${item}`} alt={`Image ${item}`} width={387} height={494} />
                  </div>
                </div>
              ))
          }
        </div>
      </div>

      {isModalOpen ?
        <div className="tw-flex tw-justify-center tw-items-center " style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>

          <div className='tw-bg-primary tw-shadow-md tw-rounded-2xl tw-h-[845px] tw-w-[996px] tw-flex tw-justify-center tw-items-center tw-flex-col'>

            <div className='tw-h-[10%] tw-w-[85%] tw-flex tw-items-center tw-justify-center'>
              <div className='tw-h-[50%] tw-w-[50%] tw-flex tw-items-center tw-justify-start'>
                <div className="tw-text-black" style={{ fontSize: '1rem' }}>Seleccionar fondo</div>
              </div>

              <div className='tw-h-[50%] tw-w-[50%] tw-flex tw-items-center tw-justify-end'>
                <div className='tw-h-[100%] tw-w-[15%] tw-flex tw-items-center tw-justify-center' onClick={() => handleModal()}>
                  <Button disabled color="secondary" className='tw-h-[100%] tw-w-[100%]' startIcon={<CloseIcon style={{ color: '#ffffff', fontSize: '1.8rem', marginLeft: '0.5rem' }} />}>
                  </Button>
                </div>
              </div>
            </div>

            <div className='tw-items-center tw-justify-center tw-grid tw-grid-cols-3 tw-h-[80%] tw-w-[95%]' >
              {dataListTemplates[0].images.map((item, index) => (
                <div key={index} className={`tw-h-[340px] tw-flex tw-items-center tw-justify-center`}>
                  <div className='tw-rounded-md tw-h-[320px] tw-w-[250px] tw-flex tw-items-center tw-justify-center tw-bg-white'>
                    <Image src={`/images/${item}`} alt={`Image ${item}`} width={228} height={289} />
                  </div>
                </div>
              ))}
            </div>

            <div className='tw-h-[10%] tw-w-[100%] tw-flex tw-items-center tw-justify-center' style={{ borderTop: '1px solid #000000' }}>
              <div className='tw-h-[50%] tw-w-[87%] tw-flex tw-items-center tw-justify-start'>
                < div className='tw-h-[50%] tw-w-[15%] tw-flex tw-items-center tw-justify-start'>
                  <Button disabled color="secondary" className='tw-h-[100%] tw-w-[100%]' startIcon={<AddCircleIcon style={{ color: '#ffffff', fontSize: '1.8rem', marginLeft: '0.5rem' }} />}>
                    <span style={{ color: '#000000 ', fontSize: '1rem' }}>Guardar</span>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
        :
        null
      }
    </div >
  );
};

export default Home;
