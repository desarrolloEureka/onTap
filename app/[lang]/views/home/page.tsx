'use client';
import Menu from '@/components/menu/Menu';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Locale } from 'i18n-config';
import HomeContent from './components/homeContent/HomeContent';
import Profile from './components/profile/Profile';
import HomeHook from './hooks/HomeHook';

const Home = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const { handleChange, value, isProUser, CustomTabPanel } = HomeHook();

  return (
    dictionary && (
      <Menu dictionary={dictionary} handleChange={handleChange} value={value}>
        <CustomTabPanel value={value} index={0}>
          <HomeContent dictionary={dictionary} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Profile dictionary={dictionary} isProUser={isProUser} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Profile dictionary={dictionary} isProUser={isProUser} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Item Three
        </CustomTabPanel>
      </Menu>
    )
  );
};

export default Home;
