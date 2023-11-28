import Home from '@/views/home/Home';
import { Locale } from 'i18n-config';

const page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  return <Home lang={lang} />;
};

export default page;
