import React from 'react';
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

const page = () => {
  return (
    <div>
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
        <div className='tw-bg-[#62ae9b] tw-h-[80px] tw-flex'></div>

        <div className='tw-h-[190px] tw-flex tw-items-center tw-justify-center'>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Photo User"
              src="/images/profilePhoto.png"
              sx={{ width: 125, height: 125 }}
            />
          </Stack>
        </div>

        <div className='tw-h-[500px] tw-flex tw-items-center tw-justify-center '>
          <Container className='tw-bg-white tw-shadow-md tw-rounded-2xl tw-h-[90%] tw-w-[85%] tw-flex tw-items-center tw-justify-center'>
            <div className=' tw-h-[85%] tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <Input
                      id="standard-adornment-weight"
                      startAdornment={<PersonOutlinedIcon
                        style={{
                          color: '#62AD9B',
                          fontSize: '1.8rem',
                          marginRight: '1rem',
                        }}
                      />}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Nombres</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-bg-gray-200'>
                  {/*  <CustomSwitch /> */}
                </div>
              </div>

              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <Input
                      id="standard-adornment-weight"
                      startAdornment={<PersonOutlinedIcon
                        style={{
                          color: '#62AD9B',
                          fontSize: '1.8rem',
                          marginRight: '1rem',
                        }}
                      />}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Apellidos</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-bg-gray-200'>
                  {/*  <CustomSwitch /> */}
                </div>
              </div>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <Input
                      id="standard-adornment-weight"
                      startAdornment={<FilePresentOutlinedIcon
                        style={{
                          color: '#62AD9B',
                          fontSize: '1.8rem',
                          marginRight: '1rem',
                        }}
                      />}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Profesión</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-bg-gray-200'>
                  {/*  <CustomSwitch /> */}
                </div>
              </div>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <Input
                      id="standard-adornment-weight"
                      startAdornment={<WorkOutlineOutlinedIcon
                        style={{
                          color: '#62AD9B',
                          fontSize: '1.8rem',
                          marginRight: '1rem',
                        }}
                      />}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Ocupación</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-bg-gray-200'>
                  {/*  <CustomSwitch /> */}
                </div>
              </div>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <Input
                      id="standard-adornment-weight"
                      startAdornment={<ExploreOutlinedIcon
                        style={{
                          color: '#62AD9B',
                          fontSize: '1.8rem',
                          marginRight: '1rem',
                        }}
                      />}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Dirección</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-bg-gray-200'>
                  {/*  <CustomSwitch /> */}
                </div>
              </div>
            </div>

            <div className='tw-h-[85%] tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
              <div className='tw-h-1/2 tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
                <div className='tw-h-[85%] tw-w-[90%] tw-flex  tw-rounded-2xl tw-flex-col tw-bg-[#E9E9E9]'>
                  <div className='tw-h-[20%] tw-w-[100%]  tw-flex tw-items-center tw-justify-end'>
                    <div className='tw-h-[100%] tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-justify-center '>
                      <Button
                        color='secondary'
                        size='medium'
                        startIcon={
                          <AddCircleOutlinedIcon
                            style={{
                              color: '#62AD9B',
                              fontSize: '1.4em',
                              marginLeft: '0rem',
                            }}
                          />
                        }
                      >
                        <span style={{ color: '#030124 ', fontSize: '0.5rem' }}>Agregar otro teléfono </span>
                      </Button>
                    </div>

                  </div>
                  <div className='tw-h-[60%] tw-w-[100%] tw-flex '>
                    <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                        <Input
                          id="standard-adornment-weight"
                          startAdornment={<LocalPhoneOutlinedIcon
                            style={{
                              color: '#62AD9B',
                              fontSize: '1.8rem',
                              marginRight: '1rem',
                            }}
                          />}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                        <FormHelperText id="standard-weight-helper-text">Telefono</FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-bg-gray-200'>
                      {/*  <CustomSwitch /> */}
                    </div>
                  </div>
                  <div className='tw-h-[20%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                    <Button
                      color='secondary'
                      size='medium'
                      endIcon={
                        <KeyboardArrowDownOutlinedIcon
                          style={{
                            color: '#396593',
                            fontSize: '2.5rem',
                            marginLeft: '-0.7rem',
                          }}
                        />
                      }
                    >
                      <span style={{ color: '#396593 ', fontSize: '0.8rem' }}>Ver más (2)</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className='tw-h-1/2 tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                <div className='tw-h-[85%] tw-w-[90%] tw-flex  tw-rounded-2xl tw-flex-col tw-bg-[#E9E9E9]'>

                  <div className='tw-h-[20%] tw-w-[100%] tw-flex tw-items-center tw-justify-end'>
                    <div className='tw-h-[100%] tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-justify-center '>
                      <Button
                        color='secondary'
                        size='medium'
                        startIcon={
                          <AddCircleOutlinedIcon
                            style={{
                              color: '#62AD9B',
                              fontSize: '1.4em',
                              marginLeft: '0rem',
                            }}
                          />
                        }
                      >
                        <span style={{ color: '#030124 ', fontSize: '0.5rem' }}>Agregar otro correo</span>
                      </Button>
                    </div>
                  </div>
                  <div className='tw-h-[60%] tw-w-[100%] tw-flex'>
                    <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                        <Input
                          id="standard-adornment-weight"
                          startAdornment={<EmailOutlinedIcon
                            style={{
                              color: '#62AD9B',
                              fontSize: '1.8rem',
                              marginRight: '1rem',
                            }}
                          />}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                        <FormHelperText id="standard-weight-helper-text">Telefono</FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-bg-gray-200'>
                      {/*  <CustomSwitch /> */}
                    </div>
                  </div>
                  <div className='tw-h-[20%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                    <Button
                      color='secondary'
                      size='medium'
                      endIcon={
                        <KeyboardArrowDownOutlinedIcon
                          style={{
                            color: '#396593',
                            fontSize: '2.5rem',
                            marginLeft: '-0.7rem',
                          }}
                        />
                      }
                    >
                      <span style={{ color: '#396593 ', fontSize: '0.8rem' }}>Ver más (2)</span>
                    </Button>
                  </div>

                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className='tw-h-[110px] tw-flex tw-items-center tw-justify-center '>
          <Container className='tw-h-[90%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>

            <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
              <div className=' tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                <Button
                  color='secondary'
                  size='medium'
                  startIcon={
                    <AddCircleOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.6em',
                        marginLeft: '0rem',
                      }}
                    />
                  }
                >
                  <span style={{ color: '#030124 ', fontSize: '0.8rem' }}>Agregar dato</span>
                </Button>
              </div>
            </div>
            <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-end tw-justify-center'>
              <div className=' tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
                <Button
                  color='secondary'
                  size='medium'
                  startIcon={
                    <AddCircleOutlinedIcon
                      style={{
                        color: '#62AD9B',
                        fontSize: '1.6em',
                        marginLeft: '0rem',
                      }}
                    />
                  }
                >
                  <span style={{ color: '#030124 ', fontSize: '0.8rem' }}>Agregar dato</span>
                </Button>
              </div>
            </div>

          </Container>
        </div>
      </div >
    </div >
  );
}

export default page