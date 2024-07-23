import Link from 'next/link';

const OneTapLogoLink = ({ color }: { color: string }) => {
    return (
        <div className={`tw-flex tw-z-30 tw-h-[8%] tw-items-center tw-justify-center`}>
            <div className='tw-flex tw-z-30 tw-w-full tw-justify-center'>
                <Link href='https://www.onetap.com.co' target='_blank' className='tw-font-bold tw-text-sm' style={{ color: color }}>
                    www.onetap.com.co
                </Link>
            </div>
        </div>
    );
};

export default OneTapLogoLink;
