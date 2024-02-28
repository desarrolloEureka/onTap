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
        <div className='tw-bg-[#396593] tw-flex tw-flex-col tw-z-10 tw-items-center tw-w-[78%] tw-h-[200px] tw-rounded-md tw-mt-5'>
            <Box
                className='tw-shadow-2xl tw-z-10 tw-mt-3 tw-rounded'
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
                    className=''
                />
            </Box>
            <Box className=' tw-flex tw-flex-row tw-w-full tw-align-middle tw- tw-justify-center tw-items-center tw-mt-4'>
                <div className='tw-text-[#396593] tw-flex tw-justify-center tw-items-center tw-mr-2 tw-shadow-2xl tw-w-[110px] tw-h-[20px] tw-bg-white tw-rounded-xl tw-truncate tw-text-xs'>
                    {name}
                </div>
                
                <div className='tw-text-[#396593] tw-flex tw-justify-center tw-items-center tw-ml-2 tw-shadow-2xl tw-w-[110px] tw-h-[20px] tw-bg-white tw-rounded-xl tw-truncate  tw-text-xs'>
                    {profession}
                </div>
            </Box>
        </div>
    );
};

export default RectangularCustomAvatar;
