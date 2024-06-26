import { Box, Button, IconButton, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import vCard from 'vcards-js';
import { ProfessionalDataForm, SocialDataForm } from '@/types/profile';
import { SocialUrls, VCard } from '@/types/vCard';

const SaveContactButtonColor = ({
  circular,
  colorButton,
  profile,
}: {
  circular?: boolean;
  colorButton?: string;
  profile: SocialDataForm | ProfessionalDataForm;
}) => {
  const isSmallScreen = useMediaQuery('(max-height:668px)');

  const generatorVCard = vCard() as VCard;

  const downloadTxtFile = (vcfText: string) => {
    const element = document.createElement('a');
    const file = new Blob([vcfText], { type: 'text/vcard;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'contact.vcf';
    document.body.appendChild(element);
    element.click();
  };

  const saveVCardOld = () => {
    if (profile) {
      const urls = {} as SocialUrls;
      const emails = profile.emails?.map((value) => value.text ?? '');
      const phones = profile.phones?.map((value) => value.text ?? '');
      profile.urls?.forEach((value) => (urls[value.icon] = value.url ?? ''));
      console.log('profile.urls', profile.urls);

      console.log('aaaa', urls);
      generatorVCard.firstName = profile.name?.text ?? '';
      generatorVCard.lastName = profile.last_name?.text ?? '';
      generatorVCard.email = emails ?? [];
      generatorVCard.cellPhone = phones ?? [];
      generatorVCard.homeAddress.label = 'Address';
      generatorVCard.homeAddress.street = profile.address?.text ?? '';
      generatorVCard.title = profile.profession?.text ?? '';

      generatorVCard.socialUrls = urls ?? [];
      // generatorVCard.homeAddress = profile.address?.text ?? '';k
      downloadTxtFile(generatorVCard.getFormattedString());
    }
  };
  const saveVCard = () => {
    if (profile) {
      // Convertir la imagen a base64
      // var reader = new FileReader();
      // reader.readAsDataURL();
      // reader.onload = function () {
      //   var imageData = reader.result.split(',')[1]; // Obtener solo los datos base64
      // };

      var vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${
        profile.name?.text ?? ''
      } ${profile.last_name?.text ?? ''}\nN:${profile.last_name?.text ?? ''};${
        profile.name?.text ?? ''
      };;;\n`;
      // Agregar cada dirección de correo electrónico
      profile.emails?.forEach((email) => {
        vCardData += `EMAIL;TYPE=INTERNET:${email.text}\n`;
      });

      // Agregar cada número de teléfono
      profile.phones?.forEach((phone) => {
        vCardData += `TEL;TYPE=CELL:${phone.text}\n`;
      });

      vCardData += `ADR;TYPE=${profile.address?.label}:${profile.address?.text}\n`;
      vCardData += `TITLE:${profile.profession?.text ?? ''}\n`;
      // vCardData += `ORG:${profile.company?.text ?? ''}\n`;
      // vCardData += `ROLE:${profile.position?.text ?? ''}\n`;
      // vCardData += `NOTE:${profile.professional_profile?.text ?? ''}\n`;

      // Agregar cada URL social si están disponibles
      profile.urls?.forEach((url, index) => {
        vCardData += `item${index}.URL:${url.url}\n`;
        vCardData += `item${index}.X-ABLabel:${url.name}\n`;
      });

      // Agregar la imagen en formato base64
      // vCardData += `PHOTO;ENCODING=b;TYPE=JPEG:${imageData}\n`;

      // Cerrar la vCard
      vCardData += `END:VCARD`;
      console.log(vCardData);

      downloadTxtFile(vCardData);
    }
  };

  return (
    <Box
      sx={{ position: 'relative' }}
      className={`tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-rounded-3xl ${
        isSmallScreen ? 'tw-mt-3' : undefined
      }`}
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
          className='tw-drop-shadow-xl tw-rounded-2xl tw-bg-white tw-h-[32px]'
          variant='contained'
          startIcon={
            <SaveOutlinedIcon
              style={{
                color: colorButton ?? undefined,
                fontSize: '1.4rem',
                marginLeft: '0rem',
              }}
            />
          }
        >
          <Typography className='tw-capitalize' color={colorButton}>
            guardar Contacto
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default SaveContactButtonColor;
