import { CareerDataFormValues, DataFormValues } from '@/types/profile';
import { Box, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { EducationDataFormValues } from '../../../../types/profile';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';

const ItemProfessionalCards = ({
  item,
}: {
  item: DataFormValues[] | EducationDataFormValues[] | CareerDataFormValues[];
}) => {
  return item[0].order == 11 || item[0].order == 12 ? (
    <Carousel height={80} autoPlay={false} navButtonsAlwaysInvisible>
      {item.map((value, key) => {
        const valEducation = (value.order == 11 &&
          value) as EducationDataFormValues;
        const valProfession = (value.order == 12 &&
          value) as CareerDataFormValues;

        return (
          <div key={key}>
            <Box sx={{ display: 'flex', color: 'white' }}>
              {value.order == 11 ? (
                <SchoolOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
              ) : (
                value.order == 12 && (
                  <WorkOutlineOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
                )
              )}
              <Typography
                className='tw-text-xs tw-truncate tw-mb-3 tw-font-bold tw-capitalize truncate'
                color={'white'}
                textAlign={'left'}
              >
                {value.label}
              </Typography>
            </Box>
            {value.order == 11 && (
              <>
                <Typography
                  className='tw-text-xs tw-font-bold tw-capitalize truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Titulo: {valEducation.title}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold tw-capitalize truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Institución: {valEducation.institution}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold tw-capitalize truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Año: {valEducation.year}
                </Typography>
              </>
            )}
            {value.order == 12 && (
              <>
                <Typography
                  className='tw-text-xs tw-font-bold tw-capitalize truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Empresa: {valProfession.company}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold tw-capitalize truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Cargo: {valProfession.position}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold tw-capitalize truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Inicio: {valProfession.data_init}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold tw-capitalize truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Fin: {valProfession.data_end}
                </Typography>
              </>
            )}
          </div>
        );
      })}
    </Carousel>
  ) : (
    item.map((value, key) => {
      const text = value as DataFormValues;
      return (
        <div key={key}>
          <Box sx={{ display: 'flex', color: 'white' }}>
            {value.order == 6 ? (
              <WorkOutlineOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
            ) : value.order == 15 ? (
              <PersonOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
            ) : value.order == 14 || value.order == 17 ? (
              <AccessibilityOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
            ) : (
              value.order == 1 && (
                <SchoolOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
              )
            )}
            <Typography
              className='tw-w-[146px] tw-text-xs tw-mb-3 tw-font-bold tw-capitalize tw-truncate'
              color={'white'}
              textAlign={'left'}
            >
              {text.label}
            </Typography>
          </Box>
          <Typography
            className='tw-text-xs tw-font-bold tw-capitalize truncate'
            textAlign={'left'}
            color={'black'}
          >
            {text.text}
          </Typography>
        </div>
      );
    })
  );
};

export default ItemProfessionalCards;