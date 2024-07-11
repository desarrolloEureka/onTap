
import Image from 'next/image';

const OneTapLogo = () => {
    return (
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
        </div>
    );
};

export default OneTapLogo;
