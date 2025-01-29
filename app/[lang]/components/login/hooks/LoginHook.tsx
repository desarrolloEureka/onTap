import ValidatorSession from '@/hooks/validatorSession/ValidatorSession';
import { GetLoginQuery, SendPreView } from '@/reactQuery/users';
import { Dictionary } from '@/types/dictionary';
import { LoginError } from '@/types/login';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const LoginHook = (dictionary: Dictionary) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);
  const [sendLogin, setSendLogin] = useState(false);
  const [isAlert, setIsalert] = useState(false);

  const { data, isLoading, isRefetching } = GetLoginQuery({
    user: email,
    password,
    sendLogin,
  });

  const loginHandle = async () => {
    if (email && password) {
      setErrorForm(null);
      setSendLogin(true);
    } else {
      setSendLogin(false);
      !email
        ? setErrorForm({
          errorType: 1,
          errorMessage: dictionary.loginView.mailMandatory,
        })
        : null;
      !password
        ? setErrorForm({
          errorType: 2,
          errorMessage: dictionary.loginView.passwordMandatory,
        })
        : null;
    }
  };

  const userIsLogged = useCallback(() => {
    if (data) {
      //console.log(data);
      if (data.isAdmin) {
        if (data.isActive === true) {
          router.push('/views/backOffice');
        } else {
          setErrorForm({
            errorType: 3,
            errorMessage: dictionary.loginView.userNotFound,
          });
        }
      } else if (data.is_distributor === true) {
        console.log('Soy distribuidor');
        router.push('/views/backOffice');
      } else {
        if (data.isActive === true && data.isActiveByAdmin === true && data?.subscription?.status === "Active") {
          const urlSplit = window.location.href.split('/');
          const url = `https://backoffice.onetap.com.co/es/views/cardView?uid=${data?.uid}`;
          data && SendPreView(data?.uid, url);
          router.push('/views/home');
        } else if (data?.subscription?.status != "Active") {
          setIsalert(true);
        } else {
          setErrorForm({
            errorType: 3,
            errorMessage: dictionary.loginView.userNotFound,
          });
        }
      }
    } else if (sendLogin) {
      setTimeout(() => {
        setErrorForm({
          errorType: 3,
          errorMessage: dictionary.loginView.userNotFound,
        });
      }, 3200);
      setTimeout(() => {
        setErrorForm(null);
        setSendLogin(false);
      }, 2000);
    }
  }, [data, dictionary.loginView.userNotFound, router, sendLogin]);

  useEffect(() => {
    userIsLogged();
  }, [userIsLogged]);

  return {
    loginHandle,
    setEmail,
    setPassword,
    errorForm,
    isLoading,
    isRefetching,
    email,
    password,
    isAlert,
    setIsalert
  };
};

export default LoginHook;