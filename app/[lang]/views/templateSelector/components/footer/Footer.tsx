import { Box } from '@mui/material';
import CustomButton from '../floatingButtons/customButtons/CustomButton';
import Carousel from 'react-material-ui-carousel';
import { UrlDataFormValues } from '@/types/profile';
import FooterHook from './hooks/FooterHook';

const Footer = ({
  socialNetworks,
}: {
  socialNetworks: UrlDataFormValues[] | undefined;
}) => {
  const { finalArray } = FooterHook({ socialNetworks });

  return (
    <Box sx={{ height: 30, px: 4 }}>
      <Carousel height={30} className='tw-px-3 tw-mb-8' autoPlay={false}>
        {finalArray?.map((item, j) => {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }} key={j}>
              {item.map((val, i) => (
                <CustomButton
                  name={val.icon}
                  link={val.url}
                  key={i}
                  styles={'tw-mx-2'}
                />
              ))}
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Footer;