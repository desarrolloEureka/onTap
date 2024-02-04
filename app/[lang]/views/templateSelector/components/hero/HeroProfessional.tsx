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
            <Grid item xs={5}>
              <Item
                sx={{
                  backgroundColor: 'transparent',
                  padding: 0,
                  boxShadow: 'none',
                }}
              >
                <Container className='tw-flex tw-m-0 tw-b-0 tw-px-0 tw-pt-6 tw-mr-8 tw-flex-col tw-justify-start tw-items-center tw-h-[300px] tw-z-10'>
                  <CustomAvatar
                    image={photo}
                    name={name}
                    ml={0}
                    size={90}
                    square
                  />
                  <div className='tw-rounded-bl-2xl tw-rounded-tr-2xl tw-bg-[#679a88] tw-z-10 tw-py-1 tw-px-3 tw-drop-shadow-xl tw-my-2'>
                    <Typography className='tw-z-10' color={'white'}>
                      {name}
                    </Typography>
                  </div>
                  <Typography className='tw-z-10 -tw-mt-2 tw-text-white tw-truncate'>
                    {profession}
                  </Typography>
                </Container>
              </Item>
            </Grid>
            <Grid item xs={7}>
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
