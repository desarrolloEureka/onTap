import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { ItemFormParams } from '@/types/profile';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Box, InputAdornment, TextField } from '@mui/material';

const TextAreaForm = ({
  label,
  name,
  handleSwitch,
  handleData,
}: ItemFormParams) => {
  return (
    <Box className='tw-flex tw-flex-row'>
      <Box className='tw-flex tw-items-center tw-justify-center tw-w-[70%]'>
        <TextField
          id={`${name}-input`}
          label={label}
          multiline
          rows={3}
          variant='standard'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <PersonOutlinedIcon
                  style={{
                    color: '#62AD9B',
                    fontSize: '1.8rem',
                    marginRight: '1rem',
                  }}
                />
              </InputAdornment>
            ),
          }}
          onChange={(text: any) =>
            handleData({ name: name, text: text.target.value })
          }
        />
      </Box>
      <Box className='tw-flex tw-items-center tw-justify-center tw-w-[30%] tw-mt-10'>
        <CustomSwitchGeneral
          name={name}
          handleSwitch={(e: any) => handleSwitch(e)}
        />
      </Box>
    </Box>
  );
};

export default TextAreaForm;
