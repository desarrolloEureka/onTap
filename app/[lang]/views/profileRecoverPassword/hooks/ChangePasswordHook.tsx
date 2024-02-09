import { useState } from 'react';
import { UpdatePassword } from '@/reactQuery/users';
import { LoginError } from '@/types/login';
import { useRouter } from 'next/navigation';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { d } from 'node_modules/@tanstack/react-query-devtools/build/modern/devtools-5fd5b190';

const ChangePasswordHook = () => {
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [sendLogin, setSendLogin] = useState(false);
  const [stateUpdate, setStateUpdate] = useState(false);
  //Errores
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);
  const router = useRouter();
  const dictionary = useDictionary({ lang: 'es'});

  const handleChangePassword = async () => {
    if (password && passwordConfirm && password === passwordConfirm) {
      setErrorForm(null);
      const resUpdate = await UpdatePassword(password);
      setStateUpdate(resUpdate);
    } else {
      setSendLogin(false);
      !setPasswordConfirm
        ? setErrorForm({
          errorType: 1,
          errorMessage: dictionary?.dictionary?.newPassword?.mandatoryPassword || "La contraseña es obligatorio",
        })
        : null;
      !password
        ? setErrorForm({
          errorType: 2,
          errorMessage: dictionary?.dictionary?.newPassword?.mandatoryRepeatPassword || "La contraseña es obligatorio",
        })
        : null;
    }
  }

  const handleBack = async () => {
    router.replace('/views/home');
  }

  return {
    handleChangePassword,
    setPassword,
    setPasswordConfirm,
    errorForm,
    stateUpdate,
    handleBack
  };
};

export default ChangePasswordHook;
