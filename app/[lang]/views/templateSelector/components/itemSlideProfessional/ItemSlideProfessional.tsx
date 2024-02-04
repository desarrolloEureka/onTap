import { DataFormValues } from '@/types/profile';
import { Button, Typography } from '@mui/material';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const ItemSlideProfessional = ({ item }: { item: DataFormValues[] }) => {
  const clickType = (type: string, url: string) => {
    switch (type) {
      case 'EmailOutlinedIcon':
        window.open('mailto:' + url);
        break;
      case 'LocalPhoneOutlinedIcon':
        window.open('tel:' + url);
        break;
      case 'ExploreOutlinedIcon':
        const newUrl = encodeURI(url);
        window.open(`https://maps.google.com/maps?q=${newUrl}`);
        break;
    }
  };

  return item.map((val, key) => {
    return (
      <Button
        variant='contained'
        sx={{ textTransform: 'none' }}
        className={`tw-drop-shadow-xl tw-w-min tw-rounded-3xl tw-pr-2 tw-h-8 ${
          key > 0 && 'tw-mx-3'
        } tw-px-1 tw-bg-[#fff] tw-my-2`}
        key={key}
        onClick={() => val.icon && val.text && clickType(val.icon, val.text)}
        startIcon={
          val.icon === 'FilePresentOutlinedIcon' ? (
            <FilePresentOutlinedIcon
              style={{
                color: '#679a88',
                fontSize: '1.4rem',
                marginLeft: '0.7rem',
              }}
            />
          ) : val.icon == 'WorkOutlineOutlinedIcon' ? (
            <WorkOutlineOutlinedIcon
              style={{
                color: '#679a88',
                fontSize: '1.4rem',
                marginLeft: '0.7rem',
              }}
            />
          ) : val.icon == 'ExploreOutlinedIcon' ? (
            <ExploreOutlinedIcon
              style={{
                color: '#679a88',
                fontSize: '1.4rem',
                marginLeft: '0.7rem',
              }}
            />
          ) : val.icon === 'LocalPhoneOutlinedIcon' ? (
            <LocalPhoneOutlinedIcon
              style={{
                color: '#679a88',
                fontSize: '1.4rem',
                marginLeft: '0.7rem',
              }}
            />
          ) : (
            val.icon === 'EmailOutlinedIcon' && (
              <EmailOutlinedIcon
                style={{
                  color: '#679a88',
                  fontSize: '1.4rem',
                  marginLeft: '0.7rem',
                }}
              />
            )
          )
        }
      >
        <Typography
          color={'#679a88'}
          className='tw-w-[90%] tw-text-center tw-truncate tw-capitalize'
        >
          {val.text}
        </Typography>
      </Button>
    );
  });
};

export default ItemSlideProfessional;
