
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
            className='tw-flex tw-justify-center tw-items-center'
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#02AF9B',
                    /* paddingLeft: 1,
                    paddingRight: 1, */
                    marginLeft: 2,
                    marginRight: 2,
                    marginTop: 5,
                    paddingTop: 5,
                    borderRadius: 3,
                    position: 'relative',
                }}
            >
                <IconButton
                    className='tw-absolute tw-right-1 tw-top-1'
                    onClick={() => handleModalAlert(false)}
                >
                    <Close className='tw-text-white' />
                </IconButton>

                <div className='tw-w-[90%] tw-h-[20%] tw-flex tw-justify-center tw-justify-items-center tw-pl-1 tw-pr-1'>
                    <div className='tw-w-[100%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-pb-3 '>
                        <CookieIcon className='tw-text-white' style={{ fontSize: 50 }} />
                    </div>
                </div>

                <div className='tw-w-[90%] tw-h-[50%] tw-flex tw-justify-center tw-justify-items-center  tw-pl-7 tw-pr-7 '>
                    <div className='tw-w-[90%] tw-h-[90%] tw-flex tw-justify-center tw-justify-items-center tw-pb-8 '>
                        <span className="tw-text-center">
                            Usamos cookies para mejorar tu experiencia en nuestro sitio.
                        </span>
                    </div>
                </div>

                <div className='tw-w-[100%] tw-h-[30%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid  tw-flex tw-justify-center tw-justify-items-center'>
                    <div className='tw-w-[100%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-p-2'>
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