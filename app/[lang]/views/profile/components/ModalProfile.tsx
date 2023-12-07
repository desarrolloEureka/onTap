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
    Box,
    Grid,
    Modal,
    Typography
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
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CustomSwitch from '@/components/customSwitch/CustomSwitch';

const ModalProfile = ({ isModalOpen, handleModal }: { isModalOpen: boolean, handleModal: () => void }) => {
    return (
        <Modal
            className='tw-flex tw-justify-center tw-justify-items-center tw-pt-36 tw-pb-32'
            open={isModalOpen}
            onClose={handleModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box className='tw-flex tw-flex-col tw-justify-evenly tw-w-[80%] tw-rounded-2xl tw-bg-primary tw-relative'>
                <div className='tw-absolute tw-right-1 tw-top-2'>
                    <Button
                        color='secondary'
                        className='tw-h-[100%] tw-w-[100%]'
                        startIcon={
                            <CloseIcon
                                style={{
                                    color: '#ffffff',
                                    fontSize: '1.8rem',
                                    marginLeft: '0.5rem',
                                }}
                            />
                        }
                        onClick={handleModal}
                    />
                </div>

                <div className='tw-w-[100%] tw-h-[15%]  tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[85%] tw-h-[75%]'>
                        <h4>Dato Nuevo</h4>
                    </div>
                </div>

                <div className='tw-w-[100%] tw-h-[75%] tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[85%] tw-h-[95%]'>

                        <div className='tw-h-1/3 tw-w-[100%] tw-flex'>
                            <FormControl variant="standard" sx={{ m: 1, mt: 5, width: '75ch' }}>
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <FormHelperText id="standard-weight-helper-text">Nombre dato</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-1/3 tw-w-[100%] tw-flex'>
                            <FormControl variant="standard" sx={{ m: 1, mt: 1, width: '75ch' }}>
                                <Input
                                    id="standard-adornment-weight"
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <FormHelperText id="standard-weight-helper-text">Url opcional</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='tw-h-1/3 tw-w-[100%] tw-flex'>
                            <div className='tw-h-[90%] tw-w-[10%] tw-flex tw-bg-red-200 tw-justify-center tw-items-center'>
                                <Avatar
                                    sx={{
                                        backgroundColor: '#ffffff', // Fondo circular blanco
                                        width: 45,
                                        height: 45,
                                    }}
                                >
                                    <LocalGroceryStoreOutlinedIcon sx={{ color: '#396593' }} />
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='tw-w-[100%] tw-h-[10%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid  tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[85%] tw-h-[100%] tw-flex tw-justify-start tw-justify-items-center'>
                        <Button
                            color='secondary'
                            size='medium'
                            startIcon={
                                <AddCircleIcon
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '1.8rem',
                                        marginLeft: '0.5rem',
                                    }}
                                />
                            }
                        >
                            <span style={{ color: '#000000 ', fontSize: '1rem' }}>
                                Agregar dato
                            </span>
                        </Button>
                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default ModalProfile;