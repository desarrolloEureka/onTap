'use client';
import useDictionary from '@/hooks/dictionary/useDictionary';
import CreateNewPassword from '@/views/recoverPassword/components/CreateNewPassword';
import PasswordModifiedSuccessfully from '@/views/recoverPassword/components/PasswordModifiedSuccessfully';
import RecoveryCode from '@/views/recoverPassword/components/RecoveryCode';
import RecoveryPassword from '@/views/recoverPassword/components/RecoveryPassword';
import { Locale } from 'i18n-config';
import Link from 'next/link';
import { useState } from 'react';
import RecoverPasswordHook from './hooks/RecoverPasswordHook';

const RecoverPassword = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { step, handleBack, handleNext, finishReset } = RecoverPasswordHook();
  const { dictionary } = useDictionary({ lang });

  return (
    <div>
      {step === 1 && <RecoveryPassword params={{ lang }} />}

      {step === 2 && (
        <RecoveryCode
          params={{ lang }}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 3 && (
        <CreateNewPassword params={{ lang }} handleNext={handleNext} />
      )}
      {step === 4 && (
        <>
          <PasswordModifiedSuccessfully
            params={{ lang }}
            handleBack={handleBack}
            handleNext={handleNext}
          />
          <div>
            <Link href='/views/homeThree'>
              {dictionary?.recoverPassword?.home3}
            </Link>
          </div>
          <div>
            <Link href='/views/crudN'>{dictionary?.recoverPassword?.CRUD}</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecoverPassword;
