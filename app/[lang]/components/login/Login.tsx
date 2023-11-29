import useDictionary from '@/hooks/dictionary/useDictionary';
import { GetLangQuery } from '@/reactQuery/lang';
import { Container } from '@mui/material';
import { Locale } from 'i18n-config';

const Login = () => {
  const { data } = GetLangQuery();
  const lang = (data ? data.toString() : 'es') as Locale;
  const { dictionary } = useDictionary({ lang });

  return (
    <Container className='tw-bg-primary tw-shadow-md tw-rounded-2xl tw-h-[475px] tw-w[794px]'>
      <h2> {dictionary?.rememberPasswordTitle}</h2>
    </Container>
  );
};

export default Login;
