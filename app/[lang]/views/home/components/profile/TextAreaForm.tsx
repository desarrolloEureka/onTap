import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { ItemFormParams } from '@/types/profile';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Box, InputAdornment, TextField } from '@mui/material';

import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import { useEffect, useRef } from 'react';

const TextAreaForm = ({
  label,
  name,
  handleSwitch,
  handleData,
  checked,
  myValue,
  icon,
  value,
  dataForm,
  index,
}: ItemFormParams) => {
  const dataRef = useRef<any>(null);
  useEffect(() => {
    if (dataRef.current && myValue && dataForm && index) {
      dataRef.current = myValue;
    }
  }, [dataForm, dataRef, index, myValue]);
  return (
    <Box className='tw-flex tw-flex-row'>
      <Box className='tw-flex tw-items-center tw-justify-center tw-w-[65%]'>
        <TextField
          ref={dataRef}
          id={`${name}-input`}
          label={label}
          multiline
          rows={3}
          variant='standard'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {icon === 'PersonOutlinedIcon' ? (
                  <PersonOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'FilePresentOutlinedIcon' ? (
                  <FilePresentOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'WorkOutlineOutlinedIcon' ? (
                  <WorkOutlineOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'ExploreOutlinedIcon' ? (
                  <ExploreOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'AttachFileOutlinedIcon' ? (
                  <AttachFileOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'AccessibilityOutlinedIcon' ? (
                  <AccessibilityOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'TranslateIcon' ? (
                  <TranslateIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : null}
              </InputAdornment>
            ),
          }}
          onChange={(text: any) => {
            handleData({
              name: name,
              text: text.target.value,
              currentDataRef: dataRef,
            });
          }}
          value={value}
        />
      </Box>
      <Box className='tw-flex tw-items-center tw-justify-center tw-w-[35%] tw-mt-10'>
        <CustomSwitchGeneral
          name={name}
          handleSwitch={(e: any) => handleSwitch(e)}
          checked={checked}
        />
      </Box>
    </Box>
  );
};

export default TextAreaForm;
