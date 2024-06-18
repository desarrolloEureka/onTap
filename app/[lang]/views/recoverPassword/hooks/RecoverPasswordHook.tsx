import { changePasswordFirebase, resetPasswordFirebase } from '@/firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginError } from '@/types/login';
import useDictionary from '@/hooks/dictionary/useDictionary';

const RecoverPasswordHook = () => {
  const dictionary = useDictionary({ lang: 'es' });
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step');
  const oobCode = searchParams.get('oobCode');
  const index = currentStep ? parseInt(currentStep) : 1;
  const [step, setStep] = useState(index);
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [alertEmailSend, setAlertEmailSend] = useState(false);
  const [validatingPassword, setValidatingPassword] = useState(true);
  const [expired, setExpired] = useState(false);

  const [alertErrorPassword, setAlertErrorPassword] = useState<LoginError | null>(null);
  const [alertErrorConfirmNewPassword, setAlertErrorConfirmNewPassword] = useState<LoginError | null>(null);
  const [alertErrorNotEqual, setAlertErrorNotEqual] = useState<LoginError | null>(null);

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
    setAlertErrorPassword(null);
    setAlertErrorConfirmNewPassword(null);
    setAlertErrorNotEqual(null);
    if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
      console.log('oobCode ', oobCode);
      if (step == 3 && oobCode && confirmNewPassword) {
        const change = await changePasswordFirebase(oobCode, confirmNewPassword);
        console.log('change ', change);
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
    } else {
      !newPassword ? setAlertErrorPassword({
        errorType: 1,
        errorMessage:
          dictionary?.dictionary?.newPassword?.mandatoryPassword ||
          'La contraseña es obligatorio',
      }) : null
      !confirmNewPassword ? setAlertErrorConfirmNewPassword({
        errorType: 2,
        errorMessage:
          dictionary?.dictionary?.newPassword?.mandatoryRepeatPassword ||
          'La contraseña de confirmación es obligatoria',
      }) : null
      newPassword != confirmNewPassword ? setAlertErrorNotEqual({
        errorType: 2,
        errorMessage:
          'Las contraseñas no son iguales',
      }) : null
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
    alertErrorPassword,
    validatingPassword,
    finishReset,
    expired,
    setNewPassword,
    setConfirmNewPassword,
    alertErrorConfirmNewPassword,
    alertErrorNotEqual
  };
};

export default RecoverPasswordHook;
