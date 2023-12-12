'use client';
import React from 'react';
import {
    FormControl,
    FormHelperText,
    Input,
} from '@mui/material';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import TranslateIcon from '@mui/icons-material/Translate';

import { Dictionary } from '@/types/dictionary'

const FormDataUser = ({ isProUser, dictionary }: { isProUser: boolean; dictionary: Dictionary }) => {

    return (
        <div className=' tw-h-[70%] tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-justify-start tw-mt-6'>
            {isProUser ?
                <>
                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                                <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelCompany}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                            <CustomSwitchGeneral />
                        </div>
                    </div>
                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
                        <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                            <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={<AttachFileOutlinedIcon
                                        style={{
                                            color: '#62AD9B',
                                            fontSize: '1.4rem',
                                            marginRight: '1rem',
                                        }}
                                    />}
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelPosition}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                            <CustomSwitchGeneral />
                        </div>
                    </div>

                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelProfessionalProfile}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                            <CustomSwitchGeneral />
                        </div>
                    </div>

                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
                        <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                            <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={<><AccessibilityOutlinedIcon
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
                                                marginRight: '0.5rem'
                                            }}
                                        />
                                    </>
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={
                                        <CircleOutlinedIcon
                                            style={{
                                                color: '#000000',
                                                fontSize: '0.5rem',
                                                marginRight: '0.5rem'
                                            }}
                                        />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={
                                        <CircleOutlinedIcon
                                            style={{
                                                color: '#000000',
                                                fontSize: '0.5rem',
                                                marginRight: '0.5rem'
                                            }}
                                        />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={
                                        <CircleOutlinedIcon
                                            style={{
                                                color: '#000000',
                                                fontSize: '0.5rem',
                                                marginRight: '0.5rem',
                                            }}
                                        />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />

                                <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelOtherCompetencies}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                            <CustomSwitchGeneral />
                        </div>
                    </div>

                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
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
                                    />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />

                                <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelSkills}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                            <CustomSwitchGeneral />
                        </div>
                    </div>

                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
                        <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                            <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={<TranslateIcon
                                        style={{
                                            color: '#62AD9B',
                                            fontSize: '1.8rem',
                                            marginRight: '1rem',
                                        }}
                                    />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />

                                <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelLanguages}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                            <CustomSwitchGeneral />
                        </div>
                    </div>

                    <div className='tw-h-[0.5] tw-w-[90%] tw-flex'>
                        <div className='tw-h-[100%] tw-w-[80%] tw-flex tw-flex-col'>
                            <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '25ch' }}>
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={<><AccessibilityOutlinedIcon
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
                                                marginRight: '0.5rem'
                                            }}
                                        />
                                    </>
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={
                                        <CircleOutlinedIcon
                                            style={{
                                                color: '#000000',
                                                fontSize: '0.5rem',
                                                marginRight: '0.5rem'
                                            }}
                                        />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={
                                        <CircleOutlinedIcon
                                            style={{
                                                color: '#000000',
                                                fontSize: '0.5rem',
                                                marginRight: '0.5rem'
                                            }}
                                        />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <Input
                                    id="standard-adornment-weight"
                                    startAdornment={
                                        <CircleOutlinedIcon
                                            style={{
                                                color: '#000000',
                                                fontSize: '0.5rem',
                                                marginRight: '0.5rem',
                                            }}
                                        />
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />

                                <FormHelperText id="standard-weight-helper-text">{dictionary?.perfilView.labelRecognitions}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-[100%] tw-w-[20%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                            <CustomSwitchGeneral />
                        </div>
                    </div>
                </>
                :
                <>
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
                </>
            }

        </div>
    )
}

export default FormDataUser