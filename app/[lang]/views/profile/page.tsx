'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  Stack,
  IconButton,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import ModalProfile from './components/ModalProfile';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Locale } from 'i18n-config';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(0);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSeeMore = (numItem: number) => {
    setIsDetailOpen(!isDetailOpen);
    setItemDetail(numItem);
  };

  return (
    <div>
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
        <div className='tw-bg-[#62ae9b] tw-h-[80px] tw-flex'></div>

        <div className='tw-h-[210px] tw-flex tw-items-center tw-justify-center  tw-flex-col'>
          <div className='tw-flex tw-items-center tw-justify-center'>
            <Stack direction="row" spacing={2} className='tw-relative'>
              <Avatar
                alt="Photo User"
                src="/images/profilePhoto.png"
                sx={{
                  width: 125,
                  height: 125,
                  borderRadius: '50%',
                  border: '10px solid #62ad9b',
                }}
              />
              <IconButton
                style={{
                  position: 'absolute',
                  top: 30,
                  right: -15,
                  background: 'transparent',
                  color: '#396593'
                }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Stack>

          </div>
          <div className=' tw-h-[20%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
            <div className='tw-h-[70%] tw-w-[100px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#62ae9b] tw-rounded-tr-xl tw-rounded-bl-xl'>
              <h5 className='tw-text-white'>{dictionary?.perfilView.labelHello} David</h5>
            </div>
          </div>
        </div>

        <div className='tw-h-[550px] tw-flex tw-items-center tw-justify-center'>
          <Container className='tw-bg-white tw-shadow-md tw-rounded-2xl tw-h-[90%] tw-w-[85%] tw-flex tw-items-start tw-justify-center'>
            <div className=' tw-h-[70%] tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-4'>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
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
                    <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelFirstName}</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                  <CustomSwitchGeneral />
                </div>
              </div>

              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
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
                    <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelLastName}</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                  <CustomSwitchGeneral />
                </div>
              </div>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
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
                    <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelProfession}</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                  <CustomSwitchGeneral />
                </div>
              </div>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
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
                    <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelOccupation}</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                  <CustomSwitchGeneral />
                </div>
              </div>
              <div className='tw-h-1/5 tw-w-[90%] tw-flex'>
                <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                  <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
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
                    <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelAddress}</FormHelperText>
                  </FormControl>
                </div>
                <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                  <CustomSwitchGeneral />
                </div>
              </div>
            </div>
            <div className='tw-h-[95%] tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-justify-start tw-mt-4 '>
              {isDetailOpen && itemDetail === 1 ?
                <div className='tw-h-[65%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
                  <div className='tw-h-[95%] tw-w-[90%] tw-flex  tw-rounded-2xl tw-flex-col tw-bg-[#E9E9E9]'>
                    <div className='tw-h-[10%] tw-w-[100%]  tw-flex tw-items-center tw-justify-end'>
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
                          <span style={{ color: '#030124 ', fontSize: '0.5rem' }}>{dictionary?.perfilView.addAnotherPhone} </span>
                        </Button>
                      </div>
                    </div>
                    <div className='tw-h-[80%] tw-w-[100%] tw-flex tw-items-center tw-justify-center tw-flex-col'>
                      <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                        <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                          <FormControl variant="standard" sx={{ m: 1, mt: 0, width: '23ch' }}>
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
                            <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelPhone}</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                          <CustomSwitchGeneral />
                        </div>
                      </div>
                      <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                        <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                          <FormControl variant="standard" sx={{ m: 1, mt: 0, width: '23ch' }}>
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
                            <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelPhone}</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                          <CustomSwitchGeneral />
                        </div>
                      </div>
                      <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                        <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                          <FormControl variant="standard" sx={{ m: 1, mt: 0, width: '23ch' }}>
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
                            <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelPhone}</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                          <CustomSwitchGeneral />
                        </div>
                      </div>
                    </div>
                    <div className='tw-h-[10%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                      <Button
                        onClick={() => handleSeeMore(0)}
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
                        <span style={{ color: '#396593 ', fontSize: '0.8rem' }}>{dictionary?.perfilView.buttonSeeMore} (2)</span>
                      </Button>
                    </div>
                  </div>
                </div>
                :
                <div className='tw-h-[35%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
                  <div className='tw-h-[95%] tw-w-[90%] tw-flex  tw-rounded-2xl tw-flex-col tw-bg-[#E9E9E9]'>
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
                          <span style={{ color: '#030124 ', fontSize: '0.5rem' }}>{dictionary?.perfilView.addAnotherPhone} </span>
                        </Button>
                      </div>
                    </div>
                    <div className='tw-h-[60%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                      <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
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
                          <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelPhone}</FormHelperText>
                        </FormControl>
                      </div>
                      <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                        <CustomSwitchGeneral />
                      </div>
                    </div>
                    <div className='tw-h-[20%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                      <Button
                        onClick={() => handleSeeMore(1)}
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
                        <span style={{ color: '#396593 ', fontSize: '0.8rem' }}>{dictionary?.perfilView.buttonSeeMore} (2)</span>
                      </Button>
                    </div>
                  </div>
                </div>
              }

              {isDetailOpen && itemDetail === 2 ?
                <div className='tw-h-[65%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
                  <div className='tw-h-[95%] tw-w-[90%] tw-flex  tw-rounded-2xl tw-flex-col tw-bg-[#E9E9E9]'>
                    <div className='tw-h-[10%] tw-w-[100%]  tw-flex tw-items-center tw-justify-end'>
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
                          <span style={{ color: '#030124 ', fontSize: '0.5rem' }}>{dictionary?.perfilView.addAnotherEmail} </span>
                        </Button>
                      </div>
                    </div>
                    <div className='tw-h-[80%] tw-w-[100%] tw-flex tw-items-center tw-justify-center tw-flex-col'>

                      <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                        <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                          <FormControl variant="standard" sx={{ m: 1, mt: 0, width: '23ch' }}>
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
                            <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelEmail}</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                          <CustomSwitchGeneral />
                        </div>
                      </div>

                      <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                        <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                          <FormControl variant="standard" sx={{ m: 1, mt: 0, width: '23ch' }}>
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
                            <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelEmail}</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                          <CustomSwitchGeneral />
                        </div>
                      </div>

                      <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                        <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                          <FormControl variant="standard" sx={{ m: 1, mt: 0, width: '23ch' }}>
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
                            <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelEmail}</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                          <CustomSwitchGeneral />
                        </div>
                      </div>

                    </div>
                    <div className='tw-h-[10%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                      <Button
                        onClick={() => handleSeeMore(0)}
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
                        <span style={{ color: '#396593 ', fontSize: '0.8rem' }}>{dictionary?.perfilView.buttonSeeMore} (2)</span>
                      </Button>
                    </div>
                  </div>
                </div>
                :
                <div className='tw-h-[35%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
                  <div className='tw-h-[95%] tw-w-[90%] tw-flex  tw-rounded-2xl tw-flex-col tw-bg-[#E9E9E9]'>
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
                          <span style={{ color: '#030124 ', fontSize: '0.5rem' }}>{dictionary?.perfilView.addAnotherEmail}</span>
                        </Button>
                      </div>
                    </div>
                    <div className='tw-h-[60%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                      <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
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
                          <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelEmail}</FormHelperText>
                        </FormControl>
                      </div>
                      <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                        <CustomSwitchGeneral />
                      </div>
                    </div>
                    <div className='tw-h-[20%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                      <Button
                        onClick={() => handleSeeMore(2)}
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
                        <span style={{ color: '#396593 ', fontSize: '0.8rem' }}>{dictionary?.perfilView.buttonSeeMore} (2)</span>
                      </Button>
                    </div>

                  </div>
                </div>
              }

            </div>
          </Container>
        </div>

        <div className='tw-h-[110px] tw-flex tw-items-center tw-justify-center '>
          <Container className='tw-h-[90%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>

            <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
              <div className=' tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                <CustomSwitchGeneral />
              </div>
            </div>
            <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-end tw-justify-center'>
              <div className='tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
                <Button
                  onClick={handleModal}
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
                  <span style={{ color: '#030124 ', fontSize: '0.8rem' }}>{dictionary?.perfilView.buttonAddData}</span>
                </Button>
              </div>
            </div>

          </Container>
        </div>
      </div >
      {dictionary &&
        <ModalProfile
          isModalOpen={isModalOpen}
          handleModal={handleModal}
          dictionary={dictionary}
        />
      }
    </div >
  );
}

export default Page