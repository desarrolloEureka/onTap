'use client';
import React, { useState } from 'react';
import {
    Button,
    Box,
    Modal,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dictionary } from '@/types/dictionary';

const ModalAlert = ({
    isModalAlert,
    handleModalAlert,
    dictionary,
    handleDeleteData,
    itemDelete,
}: {
    isModalAlert: boolean;
    itemDelete: string;
    handleModalAlert: () => void;
    dictionary: Dictionary;
    handleDeleteData?: (name: string) => void;
}) => {

    return (
        <Modal
            className='tw-flex tw-justify-center tw-justify-items-center tw-pt-[360px] tw-pb-[360px] tw-pl-60 tw-pr-60'
            open={isModalAlert}
            onClose={handleModalAlert}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box className='tw-flex tw-flex-col tw-justify-evenly max-sm:tw-w-[90%]  sm:tw-w-[90%]  md:tw-w-[80%] lg:tw-w-[80%] 2xl:tw-w-[40%] tw-rounded-2xl tw-bg-primary tw-relative'>
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
                        onClick={handleModalAlert}
                    />
                </div>

                <div className='tw-w-[100%] tw-h-[15%] tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[85%] tw-h-[75%]'>
                        <h4>{dictionary?.modalDelete.labelAlert}</h4>
                    </div>
                </div>

                <div className='tw-w-[100%] tw-h-[55%] tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[90%] tw-h-[90%] tw-flex tw-justify-center tw-justify-items-center '>
                        <span className='tw-pt-10'>
                            {dictionary?.modalDelete.labelMessage}
                        </span>
                    </div>
                </div>

                <div className='tw-w-[100%] tw-h-[30%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid  tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center  tw-border-r-black tw-border-r-[1px] tw-border-l-0 tw-border-b-0 tw-border-t-0 tw-border-solid'>
                        <Button
                            className="tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom"
                            type="submit"
                            style={{ textTransform: 'none' }}
                            onClick={handleModalAlert}
                        >
                            {dictionary?.modalDelete.buttonCancel}
                        </Button>
                    </div>
                    <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center '>
                        <Button
                            onClick={() => handleDeleteData && handleDeleteData(itemDelete)}
                            className="tw-w-[100%] tw-h-[100%] tw-text-white"
                            type="submit"
                            style={{ textTransform: 'none' }}
                        >
                            {dictionary?.modalDelete.buttonConfirm}
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalAlert;
