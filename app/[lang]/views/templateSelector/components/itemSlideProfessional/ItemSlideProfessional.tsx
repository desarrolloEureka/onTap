import { DataFormValues } from '@/types/profile';
import { Button, Typography } from '@mui/material';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const ItemSlideProfessional = ({
  item,
  index,
}: {
  item: DataFormValues[];
  index: number;
}) => {
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

  return (
    <Button
      variant='contained'
      sx={{ textTransform: 'none' }}
      className={`tw-drop-shadow-xl tw-w-max tw-rounded-3xl tw-h-8 ${
        index > 0 && 'tw-mx-2'
      } ${index === 0 && 'tw-mr-2'} tw-px-4 tw-bg-[#fff] tw-my-2`}
      onClick={() =>
        item[0].icon && item[0].text && clickType(item[0].icon, item[0].text)
      }
      startIcon={
        item[0].icon === 'FilePresentOutlinedIcon' ? (
          <FilePresentOutlinedIcon
            style={{
              color: '#679a88',
              fontSize: '1.4rem',
              marginLeft: '0.7rem',
            }}
          />
        ) : item[0].icon == 'WorkOutlineOutlinedIcon' ? (
          <WorkOutlineOutlinedIcon
            style={{
              color: '#679a88',
              fontSize: '1.4rem',
              marginLeft: '0.7rem',
            }}
          />
        ) : item[0].icon == 'ExploreOutlinedIcon' ? (
          <ExploreOutlinedIcon
            style={{
              color: '#679a88',
              fontSize: '1.4rem',
              marginLeft: '0.7rem',
            }}
          />
        ) : item[0].icon === 'LocalPhoneOutlinedIcon' ? (
          <LocalPhoneOutlinedIcon
            style={{
              color: '#679a88',
              fontSize: '1.4rem',
              marginLeft: '0.7rem',
            }}
          />
        ) : item[0].icon === 'EmailOutlinedIcon' ? (
          <EmailOutlinedIcon
            style={{
              color: '#679a88',
              fontSize: '1.4rem',
              marginLeft: '0.7rem',
            }}
          />
        ) : (
          item[0].icon === 'WorkOutlineOutlinedIcon' && (
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
        className={`tw-w-[100%] tw-text-center tw-truncate ${
          item[0].order != 10 && 'tw-capitalize'
        }`}
      >
        {item[0].text}
      </Typography>
    </Button>
  );
  // });
};

export default ItemSlideProfessional;
