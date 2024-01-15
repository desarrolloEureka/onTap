import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { ItemFormParams, NetworksSubIndexDataForm } from '@/types/profile';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Share } from '@mui/icons-material';

const FormUrl = ({
  label,
  name,
  handleSwitch,
  handleData,
  checked,
  deleteAction,
  icon,
  handleDeleteData,
  handleModalAlert,
  myValue,
  dataForm,
  index,
  subindex,
  withCheck,
  subLabel,
}: ItemFormParams) => {
  const dataRef = useRef<any>(null);

  const value = () => {
    const i = subindex as any;
    if (dataRef.current) {
      return subLabel && dataRef.current[i][subLabel];
    }
  };

  const isChecked = () => {
    const i = subindex as any;
    if (index == 'urls') {
      if (dataRef.current) {
        return dataRef.current[i].checked;
      }
    }
  };

  useEffect(() => {
    if (dataRef.current && myValue) {
      dataRef.current = myValue;
    }
  }, [dataRef, myValue]);

  return (
    <Box className='tw-flex tw-flex-row'>
      <Box className='tw-flex tw-items-center tw-justify-left tw-w-[65%]'>
        <TextField
          className='tw-w-full'
          ref={dataRef}
          id={`${name}-input`}
          variant='standard'
          InputProps={{
            startAdornment: (
              <>
                {withCheck && (
                  <Share
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '0.5rem',
                    }}
                  />
                )}
                <CircleOutlinedIcon
                  style={{
                    color: '#000000',
                    fontSize: '0.5rem',
                    marginRight: '0.3rem',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    marginRight: '0.5rem',
                  }}
                >
                  {label}
                </span>
              </>
            ),
          }}
          onChange={(text: any) => {
            handleData({
              name: name,
              text: text.target.value,
              currentDataRef: dataRef,
              key: subindex,
              subindex: subLabel as NetworksSubIndexDataForm,
            });
          }}
          value={value() ?? ''}
        />
      </Box>
      {withCheck && deleteAction === true && handleModalAlert ? (
        <>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[10%] tw-mt-4'>
            <Button
              className='tw-w-[100%] tw-h-[100%]'
              onClick={() => handleModalAlert({ name: name })}
            >
              <DeleteForeverOutlinedIcon
                style={{
                  color: '#62AD9B',
                  fontSize: '1.7rem',
                }}
              />
            </Button>
          </Box>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[25%] tw-mt-4'>
            <CustomSwitchGeneral
              name={name}
              handleSwitch={(e: any) =>
                handleSwitch({
                  value: e,
                  currentDataRef: dataRef,
                  key: subindex,
                })
              }
              checked={isChecked() ?? false}
            />
          </Box>
        </>
      ) : (
        withCheck && (
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[35%] tw-mt-4'>
            <CustomSwitchGeneral
              name={name}
              handleSwitch={(e: any) => handleSwitch({ e })}
              checked={checked}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default FormUrl;
