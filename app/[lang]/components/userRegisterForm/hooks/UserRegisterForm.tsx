
import { Dictionary } from '@/types/dictionary';
import { registerUserAuth, registerUserFb } from 'app/functions/register';
import { set } from 'firebase/database';
import { useState } from 'react';

const UserRegisterForm = () => {
  const [dni, setDni] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [plan, setPlan] = useState<string>('standard');
  const [errorMailForm, setErrorMailForm] = useState<Boolean>(false);
  const [errorDataForm, setErrorDataForm] = useState<Boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dataRegisterHandle = async () => {
    setErrorMailForm(false);
    setErrorDataForm(false);
    if (!dni || !email || !name || !lastName || !plan) {
      setErrorDataForm(true);
      return;
    } else {
      setErrorDataForm(false);
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email || '')) {
      setErrorMailForm(true);
      return;
    } else {
      setErrorMailForm(false);
    }
    const data = {
      dni,
      email,
      name,
      last_name: lastName,
      plan,
      gif: true,
    };

    try {
      const result = await registerUserAuth({ user: email, password: dni });
      result.name = `${name} ${lastName}`;
      result.plan = plan;
      result.switch_profile = plan === 'standard' ? false : true;
      result.gif = true;
      result.email = email;
      result.dni = dni;
      registerUserFb({ data: result })
        .then((res) => {
          setStatus('El usuario se ha registrado correctamente');
          handleClickOpen();
          //Se limpian los campos
          setDni('');
          setEmail('');
          setName('');
          setLastName('');
          setPlan('standard');
        })
        .catch((err) => {
          setStatus('El usuario ya se encuentra registrado');
          handleClickOpen();
        });
    } catch (err) {
      setStatus('El usuario ya se encuentra registrado');
      handleClickOpen();
    }
  };

  return {
    dni,
    setDni,
    email,
    setEmail,
    name,
    setName,
    lastName,
    setLastName,
    plan,
    setPlan,
    dataRegisterHandle,
    errorMailForm,
    setErrorMailForm,
    errorDataForm,
    setErrorDataForm,
    open,
    handleClickOpen,
    handleClose,
    status,
  };
};

export default UserRegisterForm;