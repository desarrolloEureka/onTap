import { UrlDataFormValues } from '@/types/profile';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import CustomAvatar from '../avatar/CustomAvatar';
import VerticalColButtons from '../floatingButtons/verticalColButtons/VerticalColButons';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HeroProfessional = ({
  socialNetworks,
  photo,
  name,
  profession,
}: {
  socialNetworks: UrlDataFormValues[] | undefined;
  photo: string;
  name: string;
  profession: string | undefined;
}) => {
  return (
    socialNetworks && (
      <Container className='tw-relative tw-w-[380px] tw-h-[290px]'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>

            <Grid item xs={6}>
              <Item
                sx={{
                  backgroundColor: 'transparent',
                  padding: 0,
                  boxShadow: 'none',
                }}
              >
                <Container className='tw-flex tw-m-0 tw-b-0 tw-px-0 tw-pt-0.5 tw-mr-8 tw-flex-col tw-justify-start tw-items-center tw-h-[300px] tw-z-10'>
                  <CustomAvatar
                    image={photo}
                    name={name}
                    ml={0}
                    size={132}
                    square
                  />
                  <div className='tw-rounded-bl-2xl tw-w-[145px] tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-tr-2xl tw-bg-[#679a88] tw-z-10 tw-py-1.5 tw-px-1 tw-mt-3 tw-mb-2'>
                    <Typography style={{ fontSize: '1.09rem', lineHeight: '1.75rem', zIndex: '10', color: 'white' }}>
                      {name ? name.length > 13 ? name.substring(0, 13) + '...' : name : ''}
                    </Typography>
                  </div>
                  <div className='tw-rounded-bl-2xl tw-w-[145px] tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-tr-2xl tw-bg-[#679a88] tw-z-10 tw-py-1.5 tw-px-1.5 tw-my-2'>
                    <Typography className='tw-z-10  tw-text-white tw-truncate' style={{ fontSize: '1.09rem', lineHeight: '1.75rem' }}>
                      {profession ? profession.length > 3 ? profession.substring(0, 14) + '...' : profession : ''}
                    </Typography>
                  </div>
                </Container>
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item
                sx={{
                  backgroundColor: 'transparent',
                  padding: 0,
                  boxShadow: 'none',
                }}
              >
                <VerticalColButtons socialNetworks={socialNetworks} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  );
};

export default HeroProfessional;
