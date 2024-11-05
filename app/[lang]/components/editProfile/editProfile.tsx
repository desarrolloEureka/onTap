import useDictionary from "@/hooks/dictionary/useDictionary";
import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { Locale } from "i18n-config";
import EditProfileHook from "./hooks/editProfileHook";

const EditProfileDistributor = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { dictionary } = useDictionary({ lang });
  const [logo, setLogo] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    handleEditProfile,
    setFullName,
    setAddress,
    setCity,
    setState,
    errorForm,
    stateUpdate,
    handleBack,
  } = EditProfileHook();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLogo(e.target.files[0]);
    }
  };

  const validatePhoneNumber = (value: string) => {
    // Solo permitir números y limitar a 10 dígitos
    const numericValue = value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(numericValue);
  };

  return (
    <div className="tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url('/images/loginBackground.png')] tw-bg-no-repeat tw-bg-center tw-bg-cover">
      <div className="tw-flex tw-items-center tw-justify-center lg:tw-h-[600px] md:tw-w-[100%]">
        <Container className="tw-bg-[#02AF9B] tw-shadow-md tw-pt-12 tw-px-6 tw-rounded-2xl tw-h-auto tw-w-[754px] tw-flex tw-flex-col tw-items-center tw-justify-center">
          <div className="tw-h-[10%] tw-w-[100%]">
            <h1 className="tw-text-white tw-text-[18px]">
              {dictionary?.editProfile?.editProfileTitle}
            </h1>
          </div>

          <div className="tw-w-[100%] tw-flex tw-flex-col tw-items-center">
            {[
              { label: dictionary?.editProfile?.fullName, setter: setFullName },
              { label: dictionary?.editProfile?.address, setter: setAddress },
              {
                label: dictionary?.editProfile?.phoneNumber,
                setter: validatePhoneNumber,
                value: phoneNumber, // Aquí se pasa el estado del número de teléfono
              },
              {
                label: dictionary?.editProfile?.state,
                setter: setState,
                placeholder: dictionary?.editProfile?.state,
              },
              { label: dictionary?.editProfile?.city, setter: setCity },
            ].map((field, index) => (
              <TextField
                key={index}
                className="tw-h-[52px] tw-w-[386px] tw-my-4 tw-text-sm"
                required
                label={field.label}
                variant="outlined"
                placeholder={field.placeholder}
                value={field.value} // Asignar el valor al campo de teléfono
                onChange={(e) => field.setter(e.target.value)}
              />
            ))}
          </div>

          {errorForm && (
            <span className="tw-text-red-500 tw-mt-2">
              {errorForm.errorMessage} *
            </span>
          )}

          {stateUpdate && (
            <span className="tw-text-blue-600 tw-mt-2">
              {dictionary?.editProfile?.profileUpdated}
            </span>
          )}

          <div className="tw-h-[25%] tw-w-[90%] tw-flex tw-items-center tw-justify-center tw-py-6 ">
            <Button
              className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mx-2"
              onClick={handleEditProfile}
            >
              {dictionary?.homeView?.saveButtonLabel}
            </Button>
            <Button
              className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white  tw-mx-2"
              onClick={handleBack}
            >
              {dictionary?.editProfile?.back}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EditProfileDistributor;
