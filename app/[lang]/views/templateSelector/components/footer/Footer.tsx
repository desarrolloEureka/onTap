import { Box } from '@mui/material';
import CustomButton from '../floatingButtons/customButtons/CustomButton';
import Carousel from 'react-material-ui-carousel';
import { UrlDataFormValues } from '@/types/profile';
import FooterHook from './hooks/FooterHook';
import InfinityHorizontalScrolling from '../InfinityHorizontalScrolling/InfinityHorizontalScrolling';

const Footer = ({
  socialNetworks,
  fullSocialIcons,
}: {
  socialNetworks: UrlDataFormValues[] | undefined;
  fullSocialIcons?: boolean;
}) => {
  const { finalArray } = FooterHook({ socialNetworks, fullSocialIcons });
  return <InfinityHorizontalScrolling finalArray={finalArray} />;
};

// <Carousel height={50} className='tw-px-3 tw-mb-8' autoPlay={false}>
//   {finalArray?.map((item, j) => {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center' }} key={j}>
//         {item.map((val, i) => (
//           <CustomButton
//             name={val.icon}
//             link={val.url}
//             key={i}
//             styles={'tw-mx-3'}
//           />
//         ))}
//       </Box>
//     );
//   })}
// </Carousel>

export default Footer;
