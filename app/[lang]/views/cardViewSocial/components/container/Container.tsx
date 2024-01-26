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

const TemplateContainer = ({ profile }: { profile: DataForm }) => {
  const objectArray: DataFormValues[] = [];
  const finalArray: DataFormValues[][] = [];
  let data: any = [];
  const profileFilter = Object.entries(profile).filter((val) => {
    //Filter by social and any other different data to name, last name and urls
    return val[1].length && val[1][0].social && val[1][0].order != 13
      ? val
      : val[1].social && val[1].order != 1 && val[1].order != 2 && val;
  });

  profileFilter.forEach((val) => {
    //remove from the array
    objectArray.push(val[1].length > 0 ? val[1][0] : val[1]);
  });

  const arraySorted: DataFormValues[] = objectArray.sort((x, y) => {
    //array sorted
    if (x.order > y.order) {
      return 1;
    }
    if (x.order < y.order) {
      return -1;
    }
    return 0;
  });
  arraySorted.forEach((val, key) => {
    //array into two arrays
    data.push(val);
    (key == 3 || key == 4) && (finalArray.push(data), (data = []));
  });

  //   const profileFilter = Object.entries(profile).filter((val) =>
  //     val[1].length ? val[1][0].social : val[1].social && val[1].label != ''
  //   );
  //   const newArray: any = [];
  //   let data: any = [];
  //   profileFilter.forEach((val, key) => {
  //     console.log('ooooo', val[1]);
  //     console.log('ppppp', key);

  //     data.push(val[1].length > 0 ? val[1][0] : val[1]);
  //     (key == 3 || key == 7) && (newArray.push(data), (data = []));
  //   });
  //   console.log('newArraySorted', arraySorted);

  //   console.log('profileFilter', profileFilter);
  //   console.log('newArray', finalArray);

  const Item = ({ item }: { item: DataFormValues[] }) => {
    // console.log('item', item);
    return item.map((val, key) => {
      return (
        <Button
          variant='contained'
          className='tw-rounded-s-2xl tw-w-full tw-h-8 tw-px-1  tw-bg-[#679a88] tw-my-1'
          key={key}
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
    <Container className='tw-z-10 tw-flex tw-flex-col tw-content-center tw-items-center tw-h-[400px]'>
      <Button
        className='tw-shadow-lg tw-rounded-2xl tw-bg-slate-400'
        variant='contained'
      >
        Guardar contacto
      </Button>
      <Container className='tw-z-10 tw-h-52 tw-my-8 '>
        <Carousel height={150} className='tw-px-3'>
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
