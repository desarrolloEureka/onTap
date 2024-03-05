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

  /*  const userIsLogged = useCallback(() => {
     setSendLogin(false);
     data
       ? data.isAdmin
         ? router.push('/views/backOffice')
         : router.push('/views/home')
       : sendLogin &&
         setErrorForm({
           errorType: 3,
           errorMessage: dictionary.loginView.userNotFound,
         });
   }, [data, dictionary.loginView.userNotFound, router, sendLogin]); */

  const userIsLogged = useCallback(() => {
    // setSendLogin(false);
    if (data) {
      if (data.isActive === true) {
        if (data.isAdmin) {
          router.push('/views/backOffice');
        } else {
          const urlSplit = window.location.href.split('/');
          const url = `http://${urlSplit[2]}/es/views/cardView?uid=${data?.uid}`;
          data && SendPreView(data?.uid, url);
          router.push('/views/home');
        }
      } else {
       /*  setTimeout(() => { */
          setErrorForm({
            errorType: 3,
            errorMessage: dictionary.loginView.userNotFound,
          });
      /*   }, 4000); */
      }
    } else if (sendLogin) {
      setTimeout(() => {
        setErrorForm({
          errorType: 3,
          errorMessage: dictionary.loginView.userNotFound,
        });
      }, 3000);
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
  };
};

export default LoginHook;
