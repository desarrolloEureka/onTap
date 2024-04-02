import { Box, Button, IconButton, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { ProfessionalDataForm } from '@/types/profile';
import vCard from 'vcards-js';
import { SocialUrls, VCard } from '@/types/vCard';

const SaveContactButton = ({
  circular,
  profile
}: {
  circular?: boolean;
  profile: ProfessionalDataForm;
}) => {
  const generatorVCard = vCard() as VCard;

  const downloadTxtFile = (vcfText: string) => {
    const element = document.createElement('a');
    const file = new Blob([vcfText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'contact.vcf';
    document.body.appendChild(element);
    element.click();
  };

  const saveVCard = () => {
    if (profile) {
      const urls = {} as SocialUrls;
      const emails = profile.emails?.map((value) => value.text ?? '');
      const phones = profile.phones?.map((value) => value.text ?? '');
      profile.urls?.forEach((value) => (urls[value.icon] = value.url ?? ''));
      generatorVCard.firstName = profile.name?.text ?? '';
      generatorVCard.lastName = profile.last_name?.text ?? '';
      generatorVCard.email = emails ?? [];
      generatorVCard.cellPhone = phones ?? [];

      generatorVCard.title = profile.profession?.text ?? '';
      generatorVCard.organization = profile.company?.text ?? '';
      generatorVCard.role = profile.position?.text ?? '';
      generatorVCard.note = profile.professional_profile?.text ?? '';

      generatorVCard.socialUrls = urls ?? [];
      downloadTxtFile(generatorVCard.getFormattedString());
    }
  };

  return (
    <Box sx={{ position: 'relative' }} className='tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-rounded-3xl'>
      {circular ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton sx={{ backgroundColor: '#fff', width: 40, height: 40 }}>
            <SaveOutlinedIcon
              style={{
                color: '#02AF9B',
                fontSize: '1.5rem',
                marginLeft: '0rem',
              }}
            />
          </IconButton>
          <Typography className='tw-capitalize' color={'#fff'}>
            guardar Contacto
          </Typography>
        </Box>
      ) : (
        <Button
          onClick={saveVCard}
          sx={{ textTransform: 'none' }}
          className='tw-drop-shadow-xl tw-rounded-2xl tw-bg-white'
          variant='contained'
          startIcon={
            <SaveOutlinedIcon
              style={{
                color: '#02AF9B',
                fontSize: '1.5rem',
                marginLeft: '0rem',
              }}
            />
          }
        >
          <Typography className='tw-capitalize' color={'#679a88'}>
            guardar Contacto
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default SaveContactButton;
