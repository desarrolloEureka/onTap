import { getPrincipalProfileOrderedByObject } from '@/globals/functionsTemplateSocialOne';
import { DataForm, DataFormValues } from '@/types/profile';
import { Box, Grid, Paper, styled } from '@mui/material';
import Container from '@mui/material/Container';
import SaveContactButton from '../saveContactButton/SaveContactButton';
import ItemSlideProfessional from '../itemSlideProfessional/ItemSlideProfessional';
import ItemProfessionalCards from '../itemProfessionalCards/ItemProfessionalCards';

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
  const socialData = getPrincipalProfileOrderedByObject(profile, 'social');
  const professionalData = getPrincipalProfileOrderedByObject(
    profile,
    'professional'
  );

  return (
    <Container className='tw-z-10 tw-flex tw-flex-col tw-content-center tw-items-center'>
      <SaveContactButton />
      <Container className='tw-flex tw-p-0 tw-overflow-scroll tw-z-10 tw-my-6 no-scrollbar'>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {socialData.finalArray.map((item, key) => {
            return (
              <ItemSlideProfessional
                item={item as DataFormValues[]}
                key={key}
              />
            );
          })}
        </Box>
      </Container>
      <Container className='tw-z-10 tw-rounded-md tw-p-0 tw-h-[258px] tw-overflow-y-auto no-scrollbar'>
        <Box flexGrow={1}>
          <Grid container spacing={1}>
            {professionalData.finalArray.map((item, key) => {
              return (
                <Grid item xs={6} key={key}>
                  <Item
                    sx={{
                      backgroundColor: '#679a88',
                      height: 120,
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
