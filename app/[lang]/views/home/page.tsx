'use client';
import Menu from '@/components/menu/Menu';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Locale } from 'i18n-config';
import HomeContent from './components/homeContent/HomeContent';
import Profile from './components/profile/Profile';
import HomeHook from './hooks/HomeHook';
import CustomCircularProgress from '@/components/customCircularProgress/CustomCircularProgress';
import ValidatorSession from '@/hooks/validatorSession/ValidatorSession';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import ProfileProfessional from './components/profile/ProfileProfessional';
import ShareQr from './components/profile/ShareQr';

const Home = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const { isLoading } = ValidatorSession({ lang });
  const {
    handleChange,
    value,
    CustomTabPanel,
    templates,
    isLoadingTemplates,
    backgroundImages,
    isModalAlert,
    handleModalAlert,
    isAlertSaveModal,
    setIsAlertSaveModal,
    handleModalSaveAlert,
    isChangeData,
    setIsChangeData,
    handleAccept,
    handleNavigate,
    isSubItemNav,
    setIsSubItemNav,
    isModalLogOut,
    setIsModalLogOut,
    handleCloseXModal
  } = HomeHook();

  return isLoading || isLoadingTemplates ? (
    <CustomCircularProgress isOpen />
  ) : (
    dictionary && templates && backgroundImages.data && (
      <>
        <Menu dictionary={dictionary}
          handleChange={handleChange}
          value={value}
          isChangeData={isChangeData}
          setIsAlertSaveModal={setIsAlertSaveModal}
          setIsSubItemNav={setIsSubItemNav}
          isModalLogOut={isModalLogOut}
          setIsModalLogOut={setIsModalLogOut}
        >
          <CustomTabPanel value={value} index={0}>
            <HomeContent
              dictionary={dictionary}
              templates={templates}
              backgroundImages={backgroundImages.data}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>

            <Profile
              dictionary={dictionary}
              setIsChangeData={setIsChangeData}
              isAlertSaveModal={isAlertSaveModal}
              setIsAlertSaveModal={setIsAlertSaveModal}
              handleModalSaveAlert={handleModalSaveAlert}
              handleNavigate={handleNavigate}
              handleCloseXModal={handleCloseXModal}
            />

          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>

            <ProfileProfessional
              dictionary={dictionary}
              setIsChangeData={setIsChangeData}
              isAlertSaveModal={isAlertSaveModal}
              setIsAlertSaveModal={setIsAlertSaveModal}
              handleModalSaveAlert={handleModalSaveAlert}
              handleNavigate={handleNavigate}
              handleCloseXModal={handleCloseXModal}
            />


          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <ShareQr
              dictionary={dictionary}
            ></ShareQr>
          </CustomTabPanel>
        </Menu>

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