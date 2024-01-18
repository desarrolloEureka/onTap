import { useState } from 'react';
import { UpdatePassword } from '@/reactQuery/users';
import { LoginError } from '@/types/login';
import { useRouter } from 'next/navigation';

const ChangePasswordHook = () => {
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [sendLogin, setSendLogin] = useState(false);
  const [stateUpdate, setStateUpdate] = useState(false);
  //Errores
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);
  const router = useRouter();

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
          errorMessage: "La contraseña es obligatoria",
        })
        : null;
      !password
        ? setErrorForm({
          errorType: 2,
          errorMessage: "La contraseña de confirmación es obligatorio",
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
