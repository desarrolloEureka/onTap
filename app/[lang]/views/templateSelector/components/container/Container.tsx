import React from 'react';
import { Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Carousel from 'react-material-ui-carousel';
import { DataForm, DataFormValues } from '@/types/profile';
import Image from 'next/image';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {
  capitalizeFirstLetter,
  getPrincipalSocialNetworksOrderedByObject,
} from '@/globals/fuctions';

const TemplateContainer = ({ profile }: { profile: DataForm }) => {
  const { finalArray } = getPrincipalSocialNetworksOrderedByObject(profile);
  const Item = ({ item }: { item: DataFormValues[] }) => {
    const clickType = (type: string, url: string) => {
      switch (type) {
        case 'EmailOutlinedIcon':
          window.open('mailto:' + url);
          break;
        case 'LocalPhoneOutlinedIcon':
          window.open('tel:' + url);
          break;
        case 'ExploreOutlinedIcon':
          const newUrl = encodeURI(url);
          // console.log(`https://maps.google.com/maps?q=${newUrl}`);

          window.open(`https://maps.google.com/maps?q=${newUrl}`);
          break;
      }
    };
    // console.log('item', item);
    return item.map((val, key) => {
      return (
        <Button
          variant='contained'
          className={`${
            key % 2 == 0 ? 'tw-rounded-s-2xl' : 'tw-rounded-e-2xl'
          } tw-drop-shadow-xl tw-w-full tw-h-8 tw-px-1  tw-bg-[#679a88] tw-my-2`}
          key={key}
          onClick={() => val.icon && val.text && clickType(val.icon, val.text)}
          startIcon={
            val.icon === 'FilePresentOutlinedIcon' ? (
              <FilePresentOutlinedIcon
                style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  marginLeft: '0.7rem',
                }}
              />
            ) : val.icon == 'WorkOutlineOutlinedIcon' ? (
              <WorkOutlineOutlinedIcon
                style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  marginLeft: '0.7rem',
                }}
              />
            ) : val.icon == 'ExploreOutlinedIcon' ? (
              <ExploreOutlinedIcon
                style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  marginLeft: '0.7rem',
                }}
              />
            ) : val.icon === 'LocalPhoneOutlinedIcon' ? (
              <LocalPhoneOutlinedIcon
                style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  marginLeft: '0.7rem',
                }}
              />
            ) : (
              val.icon === 'EmailOutlinedIcon' && (
                <EmailOutlinedIcon
                  style={{
                    color: 'white',
                    fontSize: '1.4rem',
                    marginLeft: '0.7rem',
                  }}
                />
              )
            )
          }
        >
          <Typography className='tw-w-[90%] tw-text-center'>
            {val.text}
          </Typography>
        </Button>
      );
    });
  };

  return (
    <Container className='tw-z-10 tw-flex tw-flex-col tw-content-center tw-items-center '>
      <Button
        sx={{ textTransform: 'none' }}
        className='tw-drop-shadow-xl tw-rounded-2xl tw-bg-white'
        variant='contained'
      >
        <Typography color={'#679a88'}>
          {capitalizeFirstLetter('guardar contacto')}
        </Typography>
      </Button>
      <Container className='tw-z-10 tw-my-8 '>
        <Carousel height={180} className='tw-px-3' autoPlay={false}>
          {finalArray.map((item, i) => {
            return <Item key={i} item={item} />;
          })}
        </Carousel>
      </Container>
    </Container>
  );
};

//     return (
//     <Item key={i} item={item} />
//   )

export default TemplateContainer;
