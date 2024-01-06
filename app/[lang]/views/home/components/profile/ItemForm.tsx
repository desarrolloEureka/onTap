import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { ItemFormParams } from '@/types/profile';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const ItemForm = ({
  label,
  name,
  handleSwitch,
  handleData,
  checked,
  deleteAction,
  icon,
  handleDeleteData,
  handleModalAlert,
}: ItemFormParams) => {
  return (
    <Box className='tw-flex tw-flex-row'>
      <Box className='tw-flex tw-items-center tw-justify-center tw-w-[65%]'>
        <TextField
          id={`${name}-input`}
          label={label}
          variant='standard'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {icon === 'PersonOutlinedIcon' ? (
                  <PersonOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'FilePresentOutlinedIcon' ? (
                  <FilePresentOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'WorkOutlineOutlinedIcon' ? (
                  <WorkOutlineOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'ExploreOutlinedIcon' ? (
                  <ExploreOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'AttachFileOutlinedIcon' ? (
                  <AttachFileOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'AccessibilityOutlinedIcon' ? (
                  <AccessibilityOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'TranslateIcon' ? (
                  <TranslateIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'LocalPhoneOutlinedIcon' ? (
                  <LocalPhoneOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'EmailOutlinedIcon' ? (
                  <EmailOutlinedIcon
                    style={{
                      color: '#62AD9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : null}
              </InputAdornment>
            ),
          }}
          onChange={(text: any) =>
            handleData({ name: name, text: text.target.value })
          }
        />
      </Box>
      {deleteAction === true && handleModalAlert ? (
        <>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[10%] tw-mt-10'>
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
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[25%] tw-mt-10'>
            <CustomSwitchGeneral
              name={name}
              handleSwitch={(e: any) => handleSwitch(e)}
              checked={checked}
            />
          </Box>
        </>
      ) : (
        <Box className='tw-flex tw-items-center tw-justify-center tw-w-[35%] tw-mt-10'>
          <CustomSwitchGeneral
            name={name}
            handleSwitch={(e: any) => handleSwitch(e)}
            checked={checked}
          />
        </Box>
      )}
    </Box>
  );
};

export default ItemForm;
