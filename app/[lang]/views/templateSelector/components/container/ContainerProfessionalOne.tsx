import {
  getPrincipalDataSlide,
  getPrincipalProfileOrderedByObject,
} from '@/globals/functionsTemplateProfessionalOne';
import {
  DataForm,
  DataFormValues,
  ProfessionalDataForm,
} from '@/types/profile';
import { Box, Grid, Paper, styled } from '@mui/material';
import Container from '@mui/material/Container';
import SaveContactButton from '../saveContactButton/SaveContactButton';
import ItemSlideProfessional from '../itemSlideProfessional/ItemSlideProfessional';
import ItemProfessionalCards from '../itemProfessionalCards/ItemProfessionalCards';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import useMediaQuery from '@mui/material/useMediaQuery';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TemplateContainerProfessionalOne = ({
  profile,
}: {
  profile: DataForm;
}) => {
  const principalData = getPrincipalDataSlide(
    profile.professional as ProfessionalDataForm,
    'professional'
  );
  const professionalData = getPrincipalProfileOrderedByObject(
    profile.professional as ProfessionalDataForm,
    'professional'
  );

  const isSmallScreenOne = useMediaQuery('(max-height:790px)');

  return profile.professional && (
    <Container className='tw-z-10 tw-flex tw-flex-col tw-content-center tw-items-center tw-mt-9'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
        }}
      >
        <SaveContactButton profile={profile.professional} />
      </Box>
      <Container className='tw-flex tw-p-0 tw-overflow-scroll tw-z-10 tw-my-5 no-scrollbar'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          {principalData.map((item, key) => {
            return (
              <ItemSlideProfessional
                item={item as DataFormValues[]}
                index={key}
                key={key}
              />
            );
          })}
        </Box>
      </Container>
      <Container className={`tw-z-10 tw-rounded-md tw-p-0 ${isSmallScreenOne ? 'tw-h-[230px]' : 'tw-h-[360px] '} tw-overflow-y-auto no-scrollbar tw- tw-pb-12`}>
        <Box flexGrow={1}>
          <Grid container spacing={1}>
            {professionalData.finalArray.map((item, key) => {
              return (
                <Grid item xs={12} key={key} className='tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)]'>
                  <Item
                    sx={{
                      backgroundColor: '#679a88',
                      p: 2,
                    }}
                  >
                    <ItemProfessionalCards item={item} key={key} />
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

export default TemplateContainerProfessionalOne;
