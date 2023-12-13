"use client";
import useDictionary from "@/hooks/dictionary/useDictionary";
import { Locale } from "i18n-config";
import { useState } from "react";
import RecoveryPassword from "./components/RecoveryPassword";
import RecoveryCode from "./components/RecoveryCode";
import CreateNewPassword from "./components/CreateNewPassword";
import PasswordModifiedSuccessfully from "./components/PasswordModifiedSuccessfully";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Image from "next/image";
import Link from "next/link";

const RecoverPassword = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { dictionary } = useDictionary({ lang });
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div>
      {step === 1 && (
        <RecoveryPassword
          params={{ lang: "es" }}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}

      {step === 2 && (
        <RecoveryCode
          params={{ lang: "es" }}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 3 && (
        <CreateNewPassword
          params={{ lang: "es" }}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 4 && (
        <>
          <PasswordModifiedSuccessfully
            params={{ lang: "es" }}
            handleBack={handleBack}
            handleNext={handleNext}
          />
          <div>
            <Link href="/views/homeThree">Home 3</Link>
          </div>
          <div>
            <Link href="/views/crudN">CRUD</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecoverPassword;
