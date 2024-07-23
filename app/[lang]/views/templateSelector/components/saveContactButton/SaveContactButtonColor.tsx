import { Box, Button, IconButton, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import vCard from 'vcards-js';
import { ProfessionalDataForm, SocialDataForm } from '@/types/profile';
import { SocialUrls, VCard } from '@/types/vCard';
import { countries } from '@/globals/constants';

const SaveContactButtonColor = ({
  circular,
  colorButton,
  profile,
  second
}: {
  circular?: boolean;
  second?: boolean;
  colorButton?: string;
  profile: SocialDataForm | ProfessionalDataForm;
}) => {
  const isSmallScreen = useMediaQuery('(max-height:780px)');

  const generatorVCard = vCard() as VCard;

  const downloadTxtFile = (vcfText: string) => {
    const element = document.createElement('a');
    const file = new Blob([vcfText], { type: 'text/vcard;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'contact.vcf';
    document.body.appendChild(element);
    element.click();
  };

  const getCountryName = (item: any) => {
    const country = countries.find(country => country.id === item);
    return country ? country.code : '';
  };

  const saveVCard = () => {
    if (profile) {
      // Convertir la imagen a base64
      // var reader = new FileReader();
      // reader.readAsDataURL();
      // reader.onload = function () {
      //   var imageData = reader.result.split(',')[1]; // Obtener solo los datos base64
      // };

      var vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.name?.checked && profile.name?.text ? profile.name?.text : ''} ${profile.last_name?.checked && profile.last_name?.text ? profile.last_name?.text : ''}
      \nN:${profile.last_name?.checked && profile.last_name?.text ? profile.last_name?.text : ''};${profile.name?.checked && profile.name?.text ? profile.name?.text : ''};;;\n`;
      // Agregar cada dirección de correo electrónico
      profile.emails?.forEach((email) => {
        if (email.checked) {
          vCardData += `EMAIL;TYPE=INTERNET:${email.text}\n`;
        }
      });

      // Agregar cada número de teléfono
      profile.phones?.forEach((phone) => {
        if (phone.checked) {
          vCardData += `TEL;TYPE=CELL:${phone.indicative ? getCountryName(phone.indicative) : ''}${phone.text}\n`;
        }
      });

      if (profile.address?.checked) {
        vCardData += `ADR;TYPE=${profile.address?.label}:${profile.address?.text}\n`;
      }

      if (profile.profession?.checked) {
        vCardData += `TITLE:${profile.profession?.text ?? ''}\n`;
      }
      // vCardData += `ORG:${profile.company?.text ?? ''}\n`;
      // vCardData += `ROLE:${profile.position?.text ?? ''}\n`;
      // vCardData += `NOTE:${profile.professional_profile?.text ?? ''}\n`;

      // Agregar cada URL social si están disponibles
      profile.urls?.forEach((url, index) => {
        if (url.checked) {
          vCardData += `item${index}.URL:${url.url}\n`;
          vCardData += `item${index}.X-ABLabel:${url.name}\n`;
        }
      });

      // Agregar la imagen en formato base64
      // vCardData += `PHOTO;ENCODING=b;TYPE=JPEG:${imageData}\n`;

      // Cerrar la vCard
      vCardData += `END:VCARD`;

      downloadTxtFile(vCardData);
    }
  };
  return (
    <Box
      sx={{ position: 'relative' }}
      className={`tw-flex tw-rounded-3xl ${second ? 'tw-h-[100%]' : 'tw-h-[15%]'} tw-w-[100%] tw-content-center ${second ? 'tw-items-center' : 'tw-items-end'}  tw-justify-center`}
    >
      {circular ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a href='#' onClick={saveVCard}>
            <IconButton sx={{ backgroundColor: '#fff', width: 40, height: 40 }}>
              <SaveOutlinedIcon
                style={{
                  color: colorButton ?? undefined,
                  fontSize: '1.5rem',
                  marginLeft: '0rem',
                }}
              />
            </IconButton>
            <Typography className='tw-capitalize' color={'#fff'}>
              guardar Contacto
            </Typography>
          </a>
        </Box>
      ) : (
        <Button
          onClick={saveVCard}
          sx={{ textTransform: 'none' }}
          className={`tw-drop-shadow-xl tw-rounded-2xl tw-bg-white ${isSmallScreen ? 'tw-h-[33px] ' : 'tw-h-[39px] '} `}
          variant='contained'
          startIcon={
            <SaveOutlinedIcon
              style={{
                color: colorButton ?? undefined,
                fontSize: '1.7rem'
              }}
            />
          }
        >
          <Typography className='tw-capitalize' color={colorButton} style={{ fontWeight: 500, fontSize: 17.5 }}>
            guardar Contacto
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default SaveContactButtonColor;
