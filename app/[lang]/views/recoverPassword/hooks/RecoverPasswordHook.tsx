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
  const [alertEmailSend, setAlertEmailSend] = useState('');
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
      if (step == 3 && oobCode && confirmNewPassword) {
        const change = await changePasswordFirebase(oobCode, confirmNewPassword);
        if (change?.message === 'Firebase: Error (auth/invalid-action-code).') {
          setExpired(true);
        } else {
          setExpired(false);
          handle(4);
        }

        setTimeout(() => {
          setExpired(false);
        }, 3500);
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

  const recoverPasswordFireBase = async () => {
    if (email != '') {
      const res = await resetPasswordFirebase(email);
      console.log('res ', res);

      if (res === 'success') {
        setAlertEmailSend('Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.');
      } else if (res === 'user_not_found') {
        setAlertEmailSend('El correo electrónico no está registrado. Por favor, verifica y vuelve a intentarlo.');
      } else if (res === 'send_email_failed') {
        setAlertEmailSend('Hubo un problema al intentar enviar el correo de restablecimiento. Por favor, inténtalo de nuevo.');

      }
      setTimeout(() => {
        setAlertEmailSend('');
      }, 3000);
    } else {
      setAlertEmailSend('');
    }
  }

  /* const recoverPassword = useCallback(async () => {
    if (step == 2 && email != '') {
      const res = await resetPasswordFirebase(email);
      console.log('res ', res);

      if (res === 'success') {
        setAlertEmailSend('Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.');
      } else if (res === 'user_not_found') {
        setAlertEmailSend('El correo electrónico no está registrado. Por favor, verifica y vuelve a intentarlo.');
      } else if (res === 'send_email_failed') {
        setAlertEmailSend('Hubo un problema al intentar enviar el correo de restablecimiento. Por favor, inténtalo de nuevo.');

      }
      setTimeout(() => {
        setAlertEmailSend('');
      }, 3000);
    } else {
      setAlertEmailSend('');
    }
  }, [email, step]); */

  /*   useEffect(() => {
      recoverPassword();
    }, [recoverPassword]); */

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
    alertErrorNotEqual,
    recoverPasswordFireBase
  };
};

export default RecoverPasswordHook;
