"use client";
import useDictionary from "@/hooks/dictionary/useDictionary";
import { Locale } from "i18n-config";
import CustomCircularProgress from "@/components/customCircularProgress/CustomCircularProgress";
import ValidatorSession from "@/hooks/validatorSession/ValidatorSession";
import CustomModalAlert from "@/components/customModalAlert/CustomModalAlert";
import Profile from "./components/profile/Profile";
import ProfileProfessional from "./components/profile/ProfileProfessional";

import HomeHook from "./hooks/HomeHook";
import { useSearchParams } from "next/navigation";

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
    handleCloseXModal,
  } = HomeHook();

  const searchParams = useSearchParams();
  const uidUser = searchParams.get("uid");
  const profileType = searchParams.get("type") || "social";

  // Depuración
  // console.log("profileType:", profileType);

  return isLoading || isLoadingTemplates ? (
    <CustomCircularProgress isOpen />
  ) : (
    dictionary && (
      <>
        {profileType === "social" && (
          <Profile
            dictionary={dictionary}
            setIsChangeData={setIsChangeData}
            isAlertSaveModal={isAlertSaveModal}
            setIsAlertSaveModal={setIsAlertSaveModal}
            handleModalSaveAlert={handleModalSaveAlert}
            handleNavigate={handleNavigate}
            handleCloseXModal={handleCloseXModal}
            uidUser={uidUser}
            profileType={"social"}
          />
        )}

        {profileType === "professional" && (
          <ProfileProfessional
            dictionary={dictionary}
            setIsChangeData={setIsChangeData}
            isAlertSaveModal={isAlertSaveModal}
            setIsAlertSaveModal={setIsAlertSaveModal}
            handleModalSaveAlert={handleModalSaveAlert}
            handleNavigate={handleNavigate}
            handleCloseXModal={handleCloseXModal}
            uidUser={uidUser}
            profileType={"professional"}
          />
        )}

        {profileType !== "social" && profileType !== "professional" && (
          <CustomModalAlert
            handleModalAlert={handleModalAlert}
            title={dictionary?.homeView?.labelDenyAccess}
            description={dictionary?.homeView?.labelDenyAccessDescription}
            isModalAlert={isModalAlert}
            isClosed={true}
          />
        )}
      </>
    )
  );
};

export default Home;
