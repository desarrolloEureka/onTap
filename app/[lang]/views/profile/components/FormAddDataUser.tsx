'use client';
import React from 'react';
import { Button, FormControl, FormHelperText, Input } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Dictionary } from '@/types/dictionary';

const FormAddDataUser = ({
  isDetailOpen,
  itemDetail,
  handleSeeMore,
  isProUser,
  dictionary,
}: {
  isDetailOpen: boolean;
  itemDetail: number;
  handleSeeMore: (numItem: number) => void;
  isProUser: boolean;
  dictionary: Dictionary;
}) => {
  return (
    <div className='tw-h-[95%] tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-justify-start tw-mt-4 '>
      {isProUser ? (
        <>
          {isDetailOpen && itemDetail === 1 ? (
            <div className='tw-h-[25%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherPhone}{' '}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[80%] tw-w-[100%] tw-flex tw-items-center tw-justify-center tw-flex-col'>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <LocalPhoneOutlinedIcon
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
                          {dictionary?.profileView.labelPhone}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <LocalPhoneOutlinedIcon
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
                          {dictionary?.profileView.labelPhone}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <LocalPhoneOutlinedIcon
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
                          {dictionary?.profileView.labelPhone}
                        </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='tw-h-[15%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherPhone}{' '}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[60%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 3, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <LocalPhoneOutlinedIcon
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
                        {dictionary?.profileView.labelPhone}
                      </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isDetailOpen && itemDetail === 2 ? (
            <div className='tw-h-[25%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}{' '}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[80%] tw-w-[100%] tw-flex tw-items-center tw-justify-center tw-flex-col'>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <EmailOutlinedIcon
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
                          {dictionary?.profileView.labelEmail}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>

                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <EmailOutlinedIcon
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
                          {dictionary?.profileView.labelEmail}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>

                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <EmailOutlinedIcon
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
                          {dictionary?.profileView.labelEmail}
                        </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='tw-h-[15%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[60%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 3, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <EmailOutlinedIcon
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
                        {dictionary?.profileView.labelEmail}
                      </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isDetailOpen && itemDetail === 3 ? (
            <div className='tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className='tw-h-[40%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 1, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <>
                            <SchoolOutlinedIcon
                              style={{
                                color: '#62AD9B',
                                fontSize: '1.8rem',
                                marginRight: '0.5rem',
                              }}
                            />
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
                              {dictionary?.profileView.labelTitle}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelInstitute}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelYear}:{' '}
                            </span>
                          </>
                        }
                        aria-describedby='standard-weight-helper-text'
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id='standard-weight-helper-text'>
                        {dictionary?.profileView.labelEducation}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                    <CustomSwitchGeneral />
                  </div>
                </div>

                <div className='tw-h-[40%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 1, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <>
                            <SchoolOutlinedIcon
                              style={{
                                color: '#62AD9B',
                                fontSize: '1.8rem',
                                marginRight: '0.5rem',
                              }}
                            />
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
                              {dictionary?.profileView.labelTitle}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelInstitute}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelYear}:{' '}
                            </span>
                          </>
                        }
                        aria-describedby='standard-weight-helper-text'
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id='standard-weight-helper-text'>
                        {dictionary?.profileView.labelEducation}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                    <CustomSwitchGeneral />
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='tw-h-[20%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[65%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 1, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <>
                            <SchoolOutlinedIcon
                              style={{
                                color: '#62AD9B',
                                fontSize: '1.8rem',
                                marginRight: '0.5rem',
                              }}
                            />
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
                              {dictionary?.profileView.labelTitle}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelInstitute}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelYear}:{' '}
                            </span>
                          </>
                        }
                        aria-describedby='standard-weight-helper-text'
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id='standard-weight-helper-text'>
                        {dictionary?.profileView.labelEducation}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                    <CustomSwitchGeneral />
                  </div>
                </div>
                <div className='tw-h-[15%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                  <Button
                    onClick={() => handleSeeMore(3)}
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isDetailOpen && itemDetail === 4 ? (
            <div className='tw-h-[45%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className='tw-h-[40%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 1, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <>
                            <TimelineIcon
                              style={{
                                color: '#62AD9B',
                                fontSize: '1.8rem',
                                marginRight: '0.5rem',
                              }}
                            />
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
                              {dictionary?.profileView.labelCompany}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelPosition}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelStartDate}:{' '}
                            </span>
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
                          <>
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
                                marginRight: '0.9rem',
                              }}
                            >
                              {dictionary?.profileView.labelEndDate}:{' '}
                            </span>
                          </>
                        }
                        aria-describedby='standard-weight-helper-text'
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id='standard-weight-helper-text'>
                        {dictionary?.profileView.labelCareerPath}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                    <CustomSwitchGeneral />
                  </div>
                </div>

                <div className='tw-h-[40%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 1, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <>
                            <TimelineIcon
                              style={{
                                color: '#62AD9B',
                                fontSize: '1.8rem',
                                marginRight: '0.5rem',
                              }}
                            />
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
                              {dictionary?.profileView.labelCompany}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelPosition}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelStartDate}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelEndDate}:{' '}
                            </span>
                          </>
                        }
                        aria-describedby='standard-weight-helper-text'
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id='standard-weight-helper-text'>
                        {dictionary?.profileView.labelCareerPath}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                    <CustomSwitchGeneral />
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='tw-h-[25%] tw-w-[100%] tw-flex tw-items-center tw-justify-center '>
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[65%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 1, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <>
                            <TimelineIcon
                              style={{
                                color: '#62AD9B',
                                fontSize: '1.8rem',
                                marginRight: '0.5rem',
                              }}
                            />
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
                              {dictionary?.profileView.labelCompany}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelPosition}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelStartDate}:{' '}
                            </span>
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
                          <>
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
                              {dictionary?.profileView.labelEndDate}:{' '}
                            </span>
                          </>
                        }
                        aria-describedby='standard-weight-helper-text'
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id='standard-weight-helper-text'>
                        {dictionary?.profileView.labelCareerPath}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                    <CustomSwitchGeneral />
                  </div>
                </div>
                <div className='tw-h-[15%] tw-w-[100%]  tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                  <Button
                    onClick={() => handleSeeMore(4)}
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {isDetailOpen && itemDetail === 1 ? (
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherPhone}{' '}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[80%] tw-w-[100%] tw-flex tw-items-center tw-justify-center tw-flex-col'>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <LocalPhoneOutlinedIcon
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
                          {dictionary?.profileView.labelPhone}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <LocalPhoneOutlinedIcon
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
                          {dictionary?.profileView.labelPhone}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <LocalPhoneOutlinedIcon
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
                          {dictionary?.profileView.labelPhone}
                        </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherPhone}{' '}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[60%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 3, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <LocalPhoneOutlinedIcon
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
                        {dictionary?.profileView.labelPhone}
                      </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isDetailOpen && itemDetail === 2 ? (
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}{' '}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className='tw-h-[80%] tw-w-[100%] tw-flex tw-items-center tw-justify-center tw-flex-col'>
                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <EmailOutlinedIcon
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
                          {dictionary?.profileView.labelEmail}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>

                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <EmailOutlinedIcon
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
                          {dictionary?.profileView.labelEmail}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                      <CustomSwitchGeneral />
                    </div>
                  </div>

                  <div className='tw-h-[0.3] tw-w-[100%] tw-flex tw-items-start tw-justify-center'>
                    <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, mt: 0, width: '23ch' }}
                      >
                        <Input
                          id='standard-adornment-weight'
                          startAdornment={
                            <EmailOutlinedIcon
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
                          {dictionary?.profileView.labelEmail}
                        </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
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
                      <span style={{ color: '#030124 ', fontSize: '0.6rem', textTransform: 'none' }}>
                        {dictionary?.profileView.addAnotherEmail}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className='tw-h-[60%] tw-w-[100%]  tw-flex tw-items-center tw-justify-center'>
                  <div className='tw-h-[100%] tw-w-[70%] tw-flex tw-flex-col'>
                    <FormControl
                      variant='standard'
                      sx={{ m: 1, mt: 3, width: '25ch' }}
                    >
                      <Input
                        id='standard-adornment-weight'
                        startAdornment={
                          <EmailOutlinedIcon
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
                        {dictionary?.profileView.labelEmail}
                      </FormHelperText>
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
                    <span style={{ color: '#396593 ', fontSize: '0.8rem', textTransform: 'none' }}>
                      {dictionary?.profileView.buttonSeeMore} (2)
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FormAddDataUser;
