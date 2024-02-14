import Image from 'next/image';
import Link from 'next/link';

const OneTapLogo = () => {
    return (
        <div className='tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full tw-text-white tw-text-lg tw-font-bold tw-text-center tw-gap-2 tw-p-2 tw-rounded-md tw-shadow-md tw-mb-4'> {/* TODO: Add styles to the class  */}
            <Image
                src='/images/simple_logo.png'
                alt="One Tap"
                width={30}
                height={20}
                priority
            />
            <Link
                href='www.onetap.com.co'
                className="tw-flex tw-justify-center tw-items-center tw-w-[200px] tw-h-[20px] tw-text-white tw-text-lg tw-font-bold tw-text-center"
            >
                www.onetap.com.co
            </Link>
        </div>
    );

}

export default OneTapLogo;