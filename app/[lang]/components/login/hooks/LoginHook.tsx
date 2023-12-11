import { loginFirebase } from '@/firebase/auth';
import { LoginError } from '@/types/login';
import { User } from '@/types/user';
import { UserCredential } from 'firebase/auth';
import React, { useState } from 'react';

const LoginHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);

  const loginHandle = async () => {
    if (email && password) {
      //   const getLogin = await loginFirebase({ user: email, password });
      //   console.log(getLogin.user);
      //   if (getLogin.user) {
      //     // setUser(getLogin.user)
      //   } else {
      //     setUser(null);
      //   }
    } else {
      !email
        ? setErrorForm({
            errorType: 1,
            errorMessage: 'el correo es obligatorio',
          })
        : null;
      !password
        ? setErrorForm({
            errorType: 2,
            errorMessage: 'el password es obligatorio',
          })
        : null;
    }
  };
  return { loginHandle, setEmail, setPassword, errorForm };
};

export default LoginHook;
