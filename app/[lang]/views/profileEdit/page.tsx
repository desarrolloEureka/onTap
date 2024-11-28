'use client';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Locale } from 'i18n-config';
import CustomCircularProgress from '@/components/customCircularProgress/CustomCircularProgress';
import ValidatorSession from '@/hooks/validatorSession/ValidatorSession';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import Profile from './components/profile/Profile';
import HomeHook from './hooks/HomeHook';
import { useSearchParams } from 'next/navigation';

const Home = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const { isLoading } = ValidatorSession({ lang });
  const {
    isLoadingTemplates,
    isModalAlert,
    handleModalAlert,
    isAlertSaveModal,
    setIsAlertSaveModal,
    handleModalSaveAlert,
    setIsChangeData,
    handleNavigate,
    handleCloseXModal
  } = HomeHook();

  const searchParams = useSearchParams();
  const uidUser = searchParams.get('uid');

  return isLoading || isLoadingTemplates ? (
    <CustomCircularProgress isOpen />
  ) : (
    dictionary && (
      <>

        <Profile
          dictionary={dictionary}
          setIsChangeData={setIsChangeData}
          isAlertSaveModal={isAlertSaveModal}
          setIsAlertSaveModal={setIsAlertSaveModal}
          handleModalSaveAlert={handleModalSaveAlert}
          handleNavigate={handleNavigate}
          handleCloseXModal={handleCloseXModal}
          uidUser={uidUser}
          profileType={'social'}
        />

        <CustomModalAlert
          handleModalAlert={handleModalAlert}
          title={dictionary?.homeView?.labelDenyAccess}
          description={dictionary?.homeView?.labelDenyAccessDescription}
          isModalAlert={isModalAlert}
          isClosed={true}
        />
      </>
    )
  );
};

export default Home;