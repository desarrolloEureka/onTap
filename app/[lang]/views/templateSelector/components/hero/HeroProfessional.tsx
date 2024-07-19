import { UrlDataFormValues } from '@/types/profile';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CustomAvatar from '../avatar/CustomAvatar';
import VerticalColButtons from '../floatingButtons/verticalColButtons/VerticalColButons';

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
      <Container className='tw-flex tw-flex-col tw-relative tw-w-[100%] tw-h-[37%]'>
        <div style={{ display: 'flex', height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: '73%', width: '100%' }}>
              <CustomAvatar
                image={photo}
                name={name}
                ml={0}
                size={150}
                square
              />
            </div>
          </div>
          <div style={{ display: 'flex', height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', height: '75%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <VerticalColButtons socialNetworks={socialNetworks} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ height: '90%', width: '98%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <div className={`tw-rounded-bl-2xl tw-rounded-tr-2xl tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-bg-[#679a88] tw-z-10 tw-w-[98%] tw-flex tw-justify-center tw-items-center`} style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                <Typography className='tw-z-10' color={'white'} style={{ fontSize: "18px", lineHeight: '28px' }}>
                  {name ? name.length > 27 ? name.substring(0, 27) + '...' : name : ''}
                </Typography>
              </div>
            </div>
            <div style={{ display: 'flex', height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <div className={`tw-rounded-bl-2xl tw-rounded-tr-2xl tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-bg-[#679a88] tw-z-10 tw-w-[98%] tw-flex tw-justify-center tw-items-center`} style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                <Typography className='tw-z-10' color={'white'} style={{ fontSize: "18px", lineHeight: '28px' }}>
                  {profession ? profession.length > 27 ? profession.substring(0, 27) + '...' : profession : ''}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  );
};

export default HeroProfessional;
