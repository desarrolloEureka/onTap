import { Dictionary } from '@/types/dictionary';
import Container from '@mui/material/Container';
import { QRCodeSVG } from 'qrcode.react';
import { GetUser } from '@/reactQuery/users';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useEffect, useState } from 'react';

const ShareQr = ({ dictionary }: { dictionary: Dictionary }) => {
    const { data, error } = GetUser();
    const [copied, setCopied] = useState(false);
    const [urlGlobal, setUrlGlobal] = useState('');

    const copyToClipboard = () => {
        setCopied(true);
        navigator.clipboard.writeText(urlGlobal || '');
    };

    const shareProfile = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Compartir Perfil',
                text: 'Mira este perfil en OneTap:',
                url: urlGlobal || data?.preview,
            })
                .then(() => console.log('Perfil compartido exitosamente'))
                .catch((error) => console.error('Error al compartir:', error));
        } else {
            console.log('Web Share API no está soportada en este navegador');
        }
    };

    useEffect(() => {
        if (data && data.preview) {
            const url = data?.preview;
            const nuevaURL = url && url.replace(/localhost:3000|on-tap-tawny.vercel.app/g, 'backoffice.onetap.com.co');
            setUrlGlobal(nuevaURL);
        }
    }, [data])

    return data && urlGlobal && (
        <div className='tw-flex tw-flex-col tw-h-screen tw-items-center tw-justify-start tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <Container className='tw-bg-white tw-shadow-md tw-h-[390px] tw-w-[390px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-16'>
                <QRCodeSVG value={urlGlobal || data?.preview} size={800} className='tw-m-5' />
            </Container>

            <div className='tw-h-[90px] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center tw-mt-7'>
                <Button className='tw-h-[52%] tw-w-[280px] tw-flex tw-items-center tw-justify-center tw-bg-[#02AF9B] tw-rounded-2xl' onClick={() => copyToClipboard()}>
                    <ContentCopyIcon sx={{ color: 'white' }} />
                    <Typography style={{ textTransform: 'none', paddingLeft: 10 }} className='tw-text-white tw-text-[15px]'>
                        {dictionary.homeView.copyUrlButtonLabel}
                    </Typography>

                </Button>

                <Typography
                    className='tw-text-[#396593] tw-text-xs tw-mt-3'
                    sx={{
                        display: copied ? 'block' : 'none'
                    }}
                >
                    {dictionary.homeView.copyUrlMessageLabel}
                </Typography>
            </div>

            <div className='tw-h-[90px] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                <Button className='tw-h-[52%] tw-w-[280px] tw-flex tw-items-center tw-justify-center tw-bg-[#02AF9B] tw-rounded-2xl' onClick={shareProfile}>
                    <IosShareIcon sx={{ color: 'white' }} />
                    <Typography style={{ textTransform: 'none', paddingLeft: 10 }} className='tw-text-white tw-text-[15px]'>
                        Compartir Perfil
                    </Typography>

                </Button>

                <Typography
                    className='tw-text-[#396593] tw-text-xs tw-mt-3'
                    sx={{
                        display: copied ? 'block' : 'none'
                    }}
                >
                    {dictionary.homeView.copyUrlMessageLabel}
                </Typography>
            </div>


        </div>
    );
};

export default ShareQr;