
import { Box, IconButton, Modal, Button } from '@mui/material';
import React from 'react';
import { Close } from '@mui/icons-material';
import CookieIcon from '@mui/icons-material/Cookie';

function ModalCookies({
    isModalAlert,
    handleModalAlert,
    handleAceptCookies
}: {
    isModalAlert: boolean;
    handleModalAlert: (e: boolean) => void;
    handleAceptCookies: () => void;
}) {
    return (
        <Modal
            open={isModalAlert}
            onClose={() => handleModalAlert(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            className='tw-flex tw-justify-center tw-items-start tw-mt-3'
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#02AF9B',
                    paddingTop: 2,
                    borderRadius: 3,
                    position: 'relative',
                    outline: 'none',
                }}
            >
                <IconButton
                    className='tw-absolute tw-right-1 tw-top-1'
                    onClick={() => handleModalAlert(false)}
                >
                    <Close className='tw-text-white' />
                </IconButton>
                <div className='tw-w-[90%] tw-h-[20%] tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[100%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-pb-2 '>
                        <CookieIcon className='tw-text-white' style={{ fontSize: 41 }} />
                    </div>
                </div>
                <div className='tw-w-[98%] tw-h-[50%] tw-flex tw-justify-center tw-justify-items-center tw-pb-3'>
                    <div className='tw-w-[95%] tw-h-[90%] tw-flex tw-justify-center tw-justify-items-center tw-ml-[-230px] tw-mr-[-230px]'>
                        <span className="tw-text-center tw-text-white" style={{ fontSize: 14 }}>
                            Usamos cookies para mejorar tu experiencia de navegación de acuerdo a nuestras políticas de tratamiento de datos.
                        </span>
                    </div>
                </div>
                <div className='tw-w-[100%] tw-h-[30%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[100%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-p-[1.9px]'>
                        <Button
                            onClick={() => handleAceptCookies()}
                            className='tw-w-[100%] tw-h-[100%] tw-text-white'
                            type='submit'
                            style={{ textTransform: 'none' }}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalCookies;