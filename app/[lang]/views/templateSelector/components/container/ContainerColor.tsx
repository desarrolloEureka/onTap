import { getPrincipalProfileOrderedByObject } from '@/globals/functionsTemplateSocialOne';
import { DataForm, DataFormValues, SocialDataForm } from '@/types/profile';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Carousel from 'react-material-ui-carousel';
import SaveContactButton from '../saveContactButton/SaveContactButton';
import SaveContactButtonColor from '../saveContactButton/SaveContactButtonColor';

const TemplateContainerColor = ({ profile, color }: { profile: DataForm, color:string }) => {
  const { finalArray } = getPrincipalProfileOrderedByObject(
    profile.social as SocialDataForm,
    'social'
  );
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
          window.open(`https://maps.google.com/maps?q=${newUrl}`);
          break;
      }
    };

    return item.map((val, key) => {
      return (
        <Button
          variant='contained'
          sx={{ textTransform: 'none'}}
          className={`${
            key % 2 == 0 ? 'tw-rounded-s-2xl' : 'tw-rounded-e-2xl'
          } tw-drop-shadow-xl tw-w-full tw-h-8 tw-px-1  tw-bg-[${color}] tw-my-2 tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.2)]`}
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
          <Typography
            style={{ fontSize: val.label === 'Correo' ? '14px' : undefined }}
            className={`tw-w-[90%] tw-text-center tw-truncate ${
              val.order != 10 && 'tw-capitalize'
            }`}
          >
            {val.text}
          </Typography>
        </Button>
      );
    });
  };

  // console.log('finalArray', finalArray);
  return (
    <Container className='tw-z-10 tw-flex tw-pt-2 tw-flex-col tw-content-center tw-items-center'>
      <SaveContactButtonColor colorButton={color} />
      <Container className='tw-z-10 tw-my-4 '>
        {finalArray.length > 0 && finalArray[0].length > 0 && (
          <Carousel height={190} className='tw-px-3' autoPlay={false}>
            {finalArray.map((item, i) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: 190,
                  }}
                  key={i}
                >
                  <Item item={item as DataFormValues[]} />
                </Box>
              );
            })}
          </Carousel>
        )}
      </Container>
    </Container>
  );
};

export default TemplateContainerColor;
