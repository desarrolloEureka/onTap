import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { ItemFormParams } from '@/types/profile';
import { Box, Button, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import ReactCountryFlag from 'react-country-flag';

import {
  PersonOutlined as PersonOutlinedIcon,
  FilePresentOutlined as FilePresentOutlinedIcon,
  WorkOutlineOutlined as WorkOutlineOutlinedIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  AttachFileOutlined as AttachFileOutlinedIcon,
  AccessibilityOutlined as AccessibilityOutlinedIcon,
  Translate as TranslateIcon,
  LocalPhoneOutlined as LocalPhoneOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  DeleteForeverOutlined as DeleteForeverOutlinedIcon,
  School as SchoolIcon,
  Create as CreateIcon,
  Factory as FactoryIcon,
  NoteAlt as NoteAltIcon,
  Engineering as EngineeringIcon,
  MilitaryTech as MilitaryTechIcon,
  AssignmentInd as AssignmentIndIcon,
} from '@mui/icons-material';
import { countries } from '@/globals/constants';

const labels = {
  name: 'Nombres',
  last_name: 'Apellidos',
  profession: 'Profesión',
  occupation: 'Ocupación',
  address: 'Dirección',
  company: 'Empresa',
  position: 'Cargo',
  professional_profile: 'Perfil Profesional',
  other_competencies: 'Otras Competencias',
  skills: 'Habilidades',
  languages: 'Idiomas',
  achievements_recognitions: 'Logros y reconocimientos',
  phones: 'Telefono',
  emails: 'Correo',
  urls: 'urls',
};

type LabelKey = keyof typeof labels;

const iconComponents: { [key: string]: any } = {
  PersonOutlinedIcon,
  FilePresentOutlinedIcon,
  WorkOutlineOutlinedIcon,
  ExploreOutlinedIcon,
  AttachFileOutlinedIcon,
  AccessibilityOutlinedIcon,
  TranslateIcon,
  LocalPhoneOutlinedIcon,
  EmailOutlinedIcon,
  SchoolIcon,
  CreateIcon,
  FactoryIcon,
  NoteAltIcon,
  EngineeringIcon,
  MilitaryTechIcon,
  AssignmentIndIcon,
};

const ItemForm = ({
  label,
  name,
  handleSwitch,
  handleData,
  checked,
  deleteAction,
  icon,
  handleModalAlert,
  myValue,
  index,
  subindex,
}: ItemFormParams & { label: LabelKey }) => {
  const dataRef = useRef<any>(null);

  const value = () => {
    if (
      index !== 'phones' &&
      index !== 'education' &&
      index !== 'emails' &&
      index !== 'urls' &&
      index !== 'professional_career'
    ) {
      return dataRef?.current?.text ?? myValue?.text;
    } else {
      if (dataRef.current && dataRef.current.length) {
        if (index === 'phones') {
          const res = dataRef.current[subindex as any];
          return res ?? undefined;
        } else {
          const res = dataRef.current[subindex as any].text;
          return res ?? undefined;
        }
      }
    }
  };

  const isChecked = () => {
    const i = subindex as any;
    if (index === 'phones' || index === 'emails') {
      if (dataRef.current && dataRef.current.length > 0) {
        return dataRef.current[i].checked;
      }
    }
  };

  useEffect(() => {
    if (dataRef && myValue) {
      dataRef.current = myValue;
    }
  }, [dataRef, myValue]);

  const IconComponent = icon ? iconComponents[icon] : null;

  return (
    <Box className='tw-flex tw-flex-row'>
      <Box className='tw-flex tw-items-center tw-justify-center tw-w-[65%]'>
        {label === 'phones' && (
          <div className='tw-w-[45%] tw-h-[100%] tw-flex tw-items-end tw-justify-end'>
            <div className='tw-w-[75%] tw-h-[100%] tw-flex tw-items-center tw-justify-end tw-pr-2'>

              <Select
                value={value()?.indicative ? value()?.indicative : ''}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 180,
                    },
                  },
                }}
                onChange={(event) => {
                  dataRef &&
                    handleData({
                      name: name,
                      text: event.target.value as string,
                      currentDataRef: dataRef,
                      key: subindex,
                      type: false
                    });
                }
                }
                style={{ height: '48px', width: '110px' }}

                displayEmpty
                inputProps={{ 'aria-label': 'country code' }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    <ReactCountryFlag countryCode={country.flag} svg style={{ marginRight: '8px' }} />
                    {country.code}
                    {/*  {country.name} ({country.code}) */}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        )}
        <TextField
          ref={dataRef}
          id={`${name}-input`}
          label={labels[label]}
          variant='standard'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {IconComponent && (
                  <IconComponent
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          onChange={(text: any) => {
            dataRef &&
              handleData({
                name: name,
                text: text.target.value,
                currentDataRef: dataRef,
                key: subindex,
                type: true
              });
          }}
          type={name === 'phones' ? 'tel' : name === 'emails' ? 'email' : 'text'}
          value={label === 'phones' ? value()?.text : value()}
        />
      </Box>
      {deleteAction === true && handleModalAlert ? (
        <>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[10%] tw-mt-10'>
            <Button
              className='tw-w-[100%] tw-h-[100%]'
              onClick={() =>
                handleModalAlert({ index: index, subindex: '' + subindex })
              }
            >
              <DeleteForeverOutlinedIcon
                style={{
                  color: '#02AF9B',
                  fontSize: '1.7rem',
                }}
              />
            </Button>
          </Box>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[25%] tw-mt-10'>
            <CustomSwitchGeneral
              name={name}
              handleSwitch={(e: any) => {
                handleSwitch({
                  value: e,
                  currentDataRef: dataRef,
                  key: subindex,
                });
              }}
              checked={isChecked() ?? false}
            />
          </Box>
        </>
      ) : (
        <Box className='tw-flex tw-items-center tw-justify-center tw-w-[35%] tw-mt-10'>
          <CustomSwitchGeneral
            name={name}
            handleSwitch={(e: any) => handleSwitch({ value: e })}
            checked={checked}
          />
        </Box>
      )}
    </Box>
  );
};

export default ItemForm;
