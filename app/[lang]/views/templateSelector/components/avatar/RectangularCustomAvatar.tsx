import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';

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
        <div className='tw-bg-[#396593] tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.3)] tw-relative tw-flex tw-flex-col tw-z-10 tw-items-center tw-w-[80%] tw-h-[230px] tw-rounded-xl tw-mt-5'>
            <Box
                className='tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.3)] tw-z-10 tw-mt-3 tw-rounded-3xl'
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
            <Box className=' tw-flex tw-flex-row tw-w-full tw-align-middle tw- tw-justify-center tw-items-center tw-mt-6'>
                <div className='tw-text-[#396593] tw-flex tw-justify-center tw-items-center tw-mr-2 tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-w-[130px] tw-h-[30px] tw-bg-white tw-rounded-xl tw-truncate tw-text-base'>
                    <Typography className='tw-text-xl'>
                        {name}
                    </Typography>
                </div>

                <div className='tw-text-[#396593] tw-flex tw-justify-center tw-items-center tw-ml-2 tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-w-[130px] tw-h-[30px] tw-bg-white tw-rounded-xl tw-truncate  tw-text-base'>
                    <Typography className='tw-text-xl'>
                        {profession}
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default RectangularCustomAvatar;
