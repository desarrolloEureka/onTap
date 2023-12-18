'use client';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { Locale } from 'i18n-config';
import Image from 'next/image';

const HomeThree = ({ params: { lang } }: { params: { lang: Locale } }) => {
  return (
    <div>
      <div className='tw-relative tw-h-[500px] tw-w-[400px] tw-ml-[400px] tw-mt-[50px]'>
        <Image
          className='tw-mt-[10px] tw-rounded-2xl'
          src='/images/back_blue.jpg'
          alt='Card'
          width={400}
          height={500}
          style={{ display: 'block', position: 'relative', zIndex: 0 }}
        />

        <Container
          className='tw-shadow-md tw-pt-8 tw-rounded-3xl tw-h-[460px] tw-w-[330px] tw-ml-3 tw-justify-center tw-justify-items-center tw-text-center '
          style={{
            backgroundPosition: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <h1 className='tw-text-white tw-text-sm'>Tu nombre va aquí</h1>
          <Button className='tw-w-[224px] tw-h-[45px] tw-rounded-3xl tw-bg-white '>
            <FacebookIcon /> Facebook
          </Button>
          <Button className='tw-w-[224px] tw-h-[45px] tw-rounded-3xl tw-mt-[10px] tw-bg-white '>
            <InstagramIcon /> Instagram
          </Button>
          <Button className='tw-w-[224px] tw-h-[45px] tw-rounded-3xl tw-mt-[10px] tw-bg-white '>
            <WhatsAppIcon /> WhatsApp
          </Button>
        </Container>
      </div>
    </div>
  );
};
export default HomeThree;
