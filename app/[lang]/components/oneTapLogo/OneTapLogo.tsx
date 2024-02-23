import Image from 'next/image';
import Link from 'next/link';

const OneTapLogo = () => {
    return (
        //lImagen encima del texto
        <div className="tw-justify-center tw-z-10 tw-p-3 tw-flex tw-item-center tw-flex-col tw-w-[180px]">
            <div className="tw-items-center tw-w-full tw-flex tw-justify-center tw-z-20">
                <Image
                    src='/images/onetap_logo_plantilla.png'
                    alt="One Tap"
                    width={65}
                    height={45}
                    priority
                />
            </div>
            <div className='tw-w-full tw-flex tw-justify-center'>
                <Link href='www.onetap.com.co' className='tw-font-bold tw-text-white tw-text-sm'>
                    www.onetap.com.co
                </Link>
            </div>
        </div>
    );

}

export default OneTapLogo;
