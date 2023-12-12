'use client';
import React from 'react';
import {
    Avatar,
    Stack,
    IconButton,
} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Dictionary } from '@/types/dictionary';

const PhotoUser = ({  dictionary }: {  dictionary: Dictionary }) => {
    return (
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
    )
}

export default PhotoUser