
import Image from 'next/image';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

const OneTapLogo = () => {
    const isSmallScreen = useMediaQuery('(max-height:760px)');
    const paddingClass = isSmallScreen ? 'tw-p-1' : 'tw-p-2';

    return (
        /*  <div className={`tw-justify-center tw-z-30 ${paddingClass} tw-flex tw-item-center tw-mt-1 tw-flex-col tw-w-[180px]`}> */
        <div className={`tw-flex tw-z-30 tw-h-[8%] tw-items-center tw-justify-center`}>
            <div className="tw-items-center tw-w-full tw-flex tw-justify-center tw-z-20">
                <Image
                    src='/images/logo_onetap.png'
                    alt="One Tap"
                    width={50}
                    height={40}
                    priority
                />
            </div>
            {/*  <div className='tw-flex tw-z-30 tw-w-full tw-justify-center'>
                <Link href='https://www.onetap.com.co' target='_blank' className='tw-font-bold tw-text-white tw-text-sm'>
                    www.onetap.com.co
                </Link>
            </div> */}
        </div>
    );
};

export default OneTapLogo;
