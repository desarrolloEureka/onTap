'use client';
import React, { useState } from 'react';
import {
    Button,
    Box,
    Modal,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dictionary } from '@/types/dictionary';

const ModalAlertLimit = ({
    isModalAlertLimit,
    handleModalAlertLimit,
    dictionary,
}: {
    isModalAlertLimit: boolean;
    handleModalAlertLimit: (e: boolean) => void;
    dictionary: Dictionary;
}) => {
    return (
        <Modal
            className='tw-flex tw-justify-center tw-justify-items-center tw-pt-[360px] tw-pb-[360px] tw-pl-60 tw-pr-60'
            open={isModalAlertLimit}
            onClose={() => handleModalAlertLimit(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box className='tw-flex tw-flex-col tw-justify-evenly max-sm:tw-w-[90%]  sm:tw-w-[90%]  md:tw-w-[80%] lg:tw-w-[80%] 2xl:tw-w-[40%] tw-rounded-2xl tw-bg-[#02AF9B] tw-relative'>
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
                        onClick={() => handleModalAlertLimit(false)}
                    />
                </div>

                <div className='tw-w-[100%] tw-h-[15%] tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[85%] tw-h-[75%]'>
                        <h4>Alerta</h4>
                    </div>
                </div>

                <div className='tw-w-[100%] tw-h-[85%] tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[90%] tw-h-[90%] tw-flex tw-justify-center tw-justify-items-center '>
                        <span className='tw-pt-14'>
                            No es posible agregar mas datos
                        </span>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalAlertLimit;
