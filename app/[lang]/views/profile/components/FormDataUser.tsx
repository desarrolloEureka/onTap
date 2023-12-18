'use client';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import {
  Box,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
} from '@mui/material';
import { useState } from 'react';

import { Dictionary } from '@/types/dictionary';
import { DataForm } from '@/types/profile';
import { profile } from 'app/[lang]/initialData/profileInitialData';
import ItemForm from './ItemForm';
import TextAreaForm from './TextAreaForm';

interface PhoneData {
  [key: string]: { text: string; checked: boolean };
}

const FormDataUser = ({
  isProUser,
  dictionary,
}: {
  isProUser: boolean;
  dictionary: Dictionary;
}) => {
  const [dataForm, setDataForm] = useState<DataForm>(profile);

  const handleSwitch = (value: any) => {
    const isChecked = value.target.checked;
    const dataFormClone = { ...dataForm };
    const index = value.target.name as keyof typeof dataFormClone;
    dataFormClone[index]!.checked = isChecked;
    setDataForm(dataFormClone);
  };

  const handleData = ({ name, text }: { name: string; text: string }) => {
    const dataFormClone = { ...dataForm };
    const index = name as keyof typeof dataFormClone;
    dataFormClone[index]!.text = text;
    setDataForm(dataFormClone);
  };

  const handlePhoneData = (phone: any) => {
    const dataFormClone = { ...dataForm };
    const index = phone.name as keyof typeof dataFormClone;
  };

  console.log('pppp', dataForm);

  return (
    <div className='tw-h-auto tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-mt-6'>
      <div className='tw-h-[100%] tw-w-full tw-flex tw-flex-col'>
        <FormGroup sx={{ m: 1, mt: 1 }}>
          <ItemForm
            label={dictionary?.profileView.labelFirstName}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='name'
          />
          <ItemForm
            label={dictionary?.profileView.labelLastName}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='last_name'
          />
          <ItemForm
            label={dictionary?.profileView.labelProfession}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='profession'
          />
          <ItemForm
            label={dictionary?.profileView.labelOccupation}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='occupation'
          />
          <ItemForm
            label={dictionary?.profileView.labelAddress}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='address'
          />
          <ItemForm
            label={dictionary?.profileView.labelCompany}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='company'
          />
          <ItemForm
            label={dictionary?.profileView.labelPosition}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='position'
          />
          <TextAreaForm
            label={dictionary?.profileView.labelProfessionalProfile}
            handleSwitch={(e: any) => handleSwitch(e)}
            handleData={handleData}
            name='professional_profile'
          />
        </FormGroup>
      </div>
    </div>
  );
  return (
    <div className='tw-h-[70%] tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-mt-6'>
      {isProUser ? (
        <>
          <div className='tw-h-[0.5] tw-w-[100%] tw-flex tw-bg-slate-400'>
            <div className='tw-h-[100%] tw-w-full tw-flex tw-flex-col'>
              <FormControl variant='standard' sx={{ m: 1, mt: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Box sx={{ width: '70%' }}>
                    <Input
                      id='standard-adornment-weight'
                      startAdornment={
                        <PersonOutlinedIcon
                          style={{
                            color: '#62AD9B',
                            fontSize: '1.8rem',
                            marginRight: '1rem',
                          }}
                        />
                      }
                      aria-describedby='standard-weight-helper-text'
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id='standard-weight-helper-text'>
                      {dictionary?.profileView.labelFirstName}
                    </FormHelperText>
                  </Box>
                  <Box className='tw-flex tw-items-center tw-justify-center tw-w-[30%]'>
                    <CustomSwitchGeneral />
                  </Box>
                </Box>
              </FormControl>
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <PersonOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelLastName}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <FilePresentOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelProfession}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <WorkOutlineOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelOccupation}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <ExploreOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelAddress}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <WorkOutlineOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelCompany}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <AttachFileOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.4rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelPosition}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <PersonOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelProfessionalProfile}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <>
                      <AccessibilityOutlinedIcon
                        style={{
                          color: '#62AD9B',
                          fontSize: '1.8rem',
                          marginRight: '1rem',
                        }}
                      />
                      <CircleOutlinedIcon
                        style={{
                          color: '#000000',
                          fontSize: '0.5rem',
                          marginRight: '0.5rem',
                        }}
                      />
                    </>
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <CircleOutlinedIcon
                      style={{
                        color: '#000000',
                        fontSize: '0.5rem',
                        marginRight: '0.5rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <CircleOutlinedIcon
                      style={{
                        color: '#000000',
                        fontSize: '0.5rem',
                        marginRight: '0.5rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <CircleOutlinedIcon
                      style={{
                        color: '#000000',
                        fontSize: '0.5rem',
                        marginRight: '0.5rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />

                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelOtherCompetencies}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <PersonOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />

                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelSkills}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <TranslateIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />

                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelLanguages}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <>
                      <AccessibilityOutlinedIcon
                        style={{
                          color: '#62AD9B',
                          fontSize: '1.8rem',
                          marginRight: '1rem',
                        }}
                      />
                      <CircleOutlinedIcon
                        style={{
                          color: '#000000',
                          fontSize: '0.5rem',
                          marginRight: '0.5rem',
                        }}
                      />
                    </>
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <CircleOutlinedIcon
                      style={{
                        color: '#000000',
                        fontSize: '0.5rem',
                        marginRight: '0.5rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <CircleOutlinedIcon
                      style={{
                        color: '#000000',
                        fontSize: '0.5rem',
                        marginRight: '0.5rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <CircleOutlinedIcon
                      style={{
                        color: '#000000',
                        fontSize: '0.5rem',
                        marginRight: '0.5rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />

                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelRecognitions}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <PersonOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelFirstName}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          {/* <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <PersonOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelLastName}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <FilePresentOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelProfession}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <WorkOutlineOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelOccupation}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div>
          <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
            <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '25ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  startAdornment={
                    <ExploreOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.8rem',
                        marginRight: '1rem',
                      }}
                    />
                  }
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelAddress}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <CustomSwitchGeneral />
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default FormDataUser;
