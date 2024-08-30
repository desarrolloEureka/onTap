import Image from 'next/image';
import Link from 'next/link';

const OneTapLogo = () => {
    return (
        <div className="tw-flex tw-z-30 tw-h-[8%] tw-items-center tw-justify-center">
            <Link href='https://www.onetap.com.co' target='_blank' className="tw-flex tw-justify-center tw-items-center tw-z-20">
                <Image
                    src='/images/logo_onetap.png'
                    alt="One Tap"
                    width={50}
                    height={40}
                    priority
                />
            </Link>
        </div>
    );
};

export default OneTapLogo;
