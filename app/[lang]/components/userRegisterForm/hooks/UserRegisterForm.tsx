
import { checkUserExists } from '@/reactQuery/users';
import { registerUserAuth, registerUserFb } from 'app/functions/register';
import { useState } from 'react';

const UserRegisterForm = () => {
  const [dni, setDni] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState<string>('');
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

  const phoneChangeHandler = (e: any) => {
    setPhone(e);
  };

  const dataRegisterHandle = async () => {
    setErrorMailForm(false);
    setErrorDataForm(false);

    const trimmedDni = dni.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    if (!dni || !email || !name || !lastName || !plan || !phone || !phoneCode) {
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
      isActiveByAdmin: true,
      created: ''
    };

    // Crear un objeto Date y obtener su timestamp
    const dateCreated = new Date();
    const dateCreatedBd = dateCreated.getTime();

    const { exists, field } = await checkUserExists(trimmedDni, trimmedEmail, phone);
    if (exists) {
      if (field === 'dni') {
        setStatus('El No. Identificación ya se encuentra registrado.');
      } else if (field === 'email') {
        setStatus('El correo ya se encuentra registrado.');
      } else if (field === 'phone') {
        setStatus('El teléfono  ya se encuentra registrado.');
      } else {
        setStatus('El usuario ya se encuentra registrado.');
      }
      handleClickOpen();
      return;
    }

    try {
      const result = await registerUserAuth({ user: trimmedEmail, password: trimmedDni });
      result.name = `${name} ${lastName}`;
      result.plan = plan;
      //result.switch_profile = plan === 'standard' ? false : true;
      result.switch_profile = false;// switch Modo
      result.gif = true;
      result.email = trimmedEmail;
      result.phone = trimmedPhone;
      result.indicative = phoneCode;
      result.dni = trimmedDni;
      result.isActiveByAdmin = true;
      result.created = dateCreatedBd;
      result.templateData = plan === 'standard' ? [{
        type: 'social',
        id: 'XfhZLINMOpRTI7cakd8o',
        background_id: '7ynTMVt3M6VFV3KykOXQ',
        checked: true,
      }]
        :
        [{
          type: 'social',
          id: 'XfhZLINMOpRTI7cakd8o',
          background_id: '7ynTMVt3M6VFV3KykOXQ',
          checked: true,
        },
        {
          type: 'professional',
          id: 'ZESiLxKZFwUOUOgLKt6P',
          background_id: '7ynTMVt3M6VFV3KykOXQ',
          checked: true,
        }
        ]

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
          setPhone('');
          setPhoneCode('');
        }).catch((err) => {
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
    phone,
    setPhone,
    phoneCode,
    setPhoneCode,
    phoneChangeHandler
  };
};

export default UserRegisterForm;
