import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

const RectangularCustomAvatar = ({
    name,
    image,
    ml,
    size,
    rounded,
    square,
    profession,
}: {
    image: string;
    name: string;
    ml: number;
    size: number;
    rounded?: boolean;
    square?: boolean;
    profession?: string;
}) => {
    return (
        <div className='tw-bg-[#396593] tw-flex tw-flex-col tw-z-10 tw-items-center tw-w-[78%] tw-rounded-md'>
            <Box
                className='tw-shadow-xl tw-z-10'
                sx={{
                    borderRadius: rounded ? '100%' : square ? '20%' : '10px',
                    padding: 1,
                    backgroundColor: 'white',
                    height: size,
                    width: size,
                }}
            >
                <Avatar
                    alt={name}
                    src={image}
                    variant={rounded ? 'rounded' : 'square'}
                    sx={{
                        width: size,
                        height: size,
                        borderRadius: rounded ? '100%' : '12%',
                    }}
                />
            </Box>
            <Box className=' tw-flex tw-flex-row tw-w-full tw-align-middle tw- tw-justify-around tw-items-center'>
                <div className='tw-text-[#396593] tw-w-[100px] tw-h-[18px] tw-bg-white tw-rounded-md tw-text-xs tw-text-center'>
                    {name}
                </div>
                <div className='tw-text-[#396593] tw-w-[100px] tw-h-[18px] tw-bg-white tw-rounded-md  tw-text-xs tw-text-center'>
                    {profession}
                </div>
            </Box>
        </div>
    );
};

export default RectangularCustomAvatar;
