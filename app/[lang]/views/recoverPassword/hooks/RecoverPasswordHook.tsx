import { changePasswordFirebase, resetPasswordFirebase } from '@/firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const RecoverPasswordHook = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step');
  const oobCode = searchParams.get('oobCode');
  const index = currentStep ? parseInt(currentStep) : 1;
  const [step, setStep] = useState(index);
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [alertEmailSend, setAlertEmailSend] = useState(false);
  const [alertErrorPassword, setAlertErrorPassword] = useState(false);
  const [validatingPassword, setValidatingPassword] = useState(false);
  const [expired, setExpired] = useState(false);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSetEmail = (text: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(text.target.value);
  };

  const finishReset = async (handle: (e: number) => void) => {
    if (validatingPassword && step == 3 && oobCode && confirmNewPassword) {
      const change = await changePasswordFirebase(oobCode, confirmNewPassword);
      if (change != null) {
        setExpired(false);
        handle(4);
      } else {
        setExpired(true);
      }
      setTimeout(() => {
        setExpired(false);
      }, 3000);
    }
  };

  const handleSetNewPassword = (text: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(text.target.value);
  };
  const handleSetConfirmNewPassword = (
    text: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (newPassword == text.target.value) {
      console.log('correctly', text.target.value);
      setConfirmNewPassword(text.target.value);
      setValidatingPassword(true);
    } else if (newPassword.length === text.target.value.length) {
      setValidatingPassword(false);
      setAlertErrorPassword(true);
      setTimeout(() => {
        setAlertErrorPassword(false);
      }, 2000);
    } else {
      setValidatingPassword(false);
    }
  };

  const recoverPassword = useCallback(async () => {
    if (step == 2 && email != '') {
      resetPasswordFirebase(email);
      setAlertEmailSend(true);
      setTimeout(() => {
        setAlertEmailSend(false);
      }, 2000);
    } else {
      setAlertEmailSend(false);
    }
  }, [email, step]);

  useEffect(() => {
    recoverPassword();
  }, [recoverPassword]);

  return {
    handleBack,
    handleNext,
    step,
    handleSetEmail,
    email,
    alertEmailSend,
    handleSetNewPassword,
    handleSetConfirmNewPassword,
    alertErrorPassword,
    validatingPassword,
    finishReset,
    expired,
  };
};

export default RecoverPasswordHook;
