'use client';
import useDictionary from '@/hooks/dictionary/useDictionary';
import CreateNewPassword from '@/views/recoverPassword/components/CreateNewPassword';
import PasswordModifiedSuccessfully from '@/views/recoverPassword/components/PasswordModifiedSuccessfully';
import RecoveryCode from '@/views/recoverPassword/components/RecoveryCode';
import RecoveryPassword from '@/views/recoverPassword/components/RecoveryPassword';
import { Locale } from 'i18n-config';
import Link from 'next/link';
import { useState } from 'react';

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
          params={{ lang: 'es' }}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}

      {step === 2 && (
        <RecoveryCode
          params={{ lang: 'es' }}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 3 && (
        <CreateNewPassword
          params={{ lang: 'es' }}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 4 && (
        <>
          <PasswordModifiedSuccessfully
            params={{ lang: 'es' }}
            handleBack={handleBack}
            handleNext={handleNext}
          />
          <div>
            <Link href='/views/homeThree'>Home 3</Link>
          </div>
          <div>
            <Link href='/views/crudN'>CRUD</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecoverPassword;
