import React from 'react';
import { DataForm, DataFormValues, SocialDataForm } from '@/types/profile';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Box, Button, Container, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import SaveContactButtonColor from '../saveContactButton/SaveContactButtonColor';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getPrincipalProfileOrderedByObject } from '@/globals/functionsTemplateSocialOne';
import { countries } from '@/globals/constants';

const TemplateContainerColor = ({ profile, color }: { profile: DataForm; color: string; }) => {
  const { finalArray } = getPrincipalProfileOrderedByObject(profile.social as SocialDataForm, 'social');
  const isSmallScreen = useMediaQuery('(max-height:780px)');

  const getCountryName = (item: any) => {
    const country = countries.find(country => country.id === item);
    return country ? country.code : '';
  };

  const clickType = (type: string, url: string) => {
    switch (type) {
      case 'EmailOutlinedIcon':
        window.open('mailto:' + url);
        break;
      case 'LocalPhoneOutlinedIcon':
        window.open('tel:' + url);
        break;
      case 'ExploreOutlinedIcon':
        let newUrl = url.replace('#', '%23');
        newUrl = encodeURIComponent(url);
        window.open(`https://maps.google.com/maps?q=${newUrl}`);
        break;
    }
  };

  const Item = ({ item }: { item: DataFormValues[] }) => (
    <>
      {item.map((val, key) => (
        <Button
          variant='contained'
          sx={{ textTransform: 'none', backgroundColor: color }}
          className={`tw-rounded-s-2xl tw-rounded-e-2xl tw-drop-shadow-sm tw-w-[90%] ${isSmallScreen ? 'tw-h-[29px]' : 'tw-h-[34px]'} tw-px-1 tw-relative tw-my-2 tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)]`}
          key={key}
          onClick={() => val.icon && val.text && clickType(val.icon, val.label === "phones" ? getCountryName(val.indicative) + "" + val.text : val.text)}
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
            className={`tw-w-[90%] tw-text-center tw-truncate ${val.order != 10 && 'tw-capitalize'
              }`}
          >
            {(val.label === "phones" || val.label === "Telefono" || val.label === "Teléfono") ? getCountryName(val.indicative) + "" + val.text : val.text}
          </Typography>
        </Button>
      ))}
    </>
  );

  return (
    profile.social && (
      <Container className={`tw-h-[40%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center ${isSmallScreen ? 'tw-mt-3.5' : 'tw-mt-0'}`}>
        <SaveContactButtonColor colorButton={color} profile={profile.social} second={false} />
        <Container className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-10 tw-h-[85%]`}>
          {finalArray.length > 0 && finalArray[0].length > 0 && (
            <Carousel
              className={`tw-flex tw-flex-col tw-w-[100%] tw-h-[100%] tw-content-center tw-items-center tw-justify-center`}
              autoPlay={false}
              activeIndicatorIconButtonProps={{
                style: {
                  backgroundColor: '#7cab9a',
                  color: '#7cab9a'
                }
              }}
              indicatorContainerProps={{
                style: {
                  position: 'absolute',
                  top: 0, // Posiciona los indicadores en la parte superior
                  width: '100%',
                  textAlign: 'center',
                  zIndex: 1,
                  height: '30px', // Ajusta la altura del contenedor de indicadores
                  marginTop: isSmallScreen ? '4px' : '15px', // Ajusta el margen superior según sea necesario
                }
              }}
            >
              {finalArray.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Item item={item as DataFormValues[]} />
                </Box>
              ))}
            </Carousel>
          )}
        </Container>
      </Container>
    )
  );
};

export default TemplateContainerColor;
