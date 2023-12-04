'use client';
import { Locale } from 'i18n-config';
import useHomeHook from '@/views/home/hook/homeHook';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Button } from '@mui/material';
import { SetLangQuery } from '@/reactQuery/lang';
import Login from '@/components/login/Login';
import Menu from '@/components/menu/Menu';

const Home = ({ lang }: { lang: Locale }) => {
  const { dictionary } = useDictionary({ lang });
  const { isLoading, users, error } = useHomeHook();
  const { data } = SetLangQuery(lang);

  return (
    <div>
      {dictionary && <Menu dictionary={dictionary} /> }
      {dictionary && <Login dictionary={dictionary} />}
      <div>Home</div>
      <Button className='tw-bg-red-500' variant='contained'>
        Contained
      </Button>
      <div>{dictionary?.homeTitle}</div>
      <div>{dictionary?.rememberPassweordDescription}</div>
      
      
      <div>{JSON.stringify(users)}</div>
      
      
    </div>
  );
};

export default Home;
