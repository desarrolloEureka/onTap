import { Dictionary } from "@/types/dictionary";
import { useState } from "react";

/*
Data a recolectar:
{
    "dni": "111023456",
    "email": "email2@gmail.com",
    "name": "name",
    "last_name": "lastname",
    "plan": "basic",
    "gif": true
}

*/
const UserRegisterForm = () => {
    const [dni, setDni] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();    
    const [plan, setPlan] = useState<string>();
    const [errorMailForm, setErrorMailForm] = useState<Boolean>(false);
    const [errorDataForm, setErrorDataForm] = useState<Boolean>(false);

    //etch -> funcion handle data register -> url -> post
    //url inventada mientras no se tenga la url real
    const dataRegisterHandle = async () => {
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
            gif: true
        }
        /*
        const response = await fetch('https://aquiLaURL.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });*/
        console.log(data);
        //useState->showPreviewUrl ->bool :false ->despues true
        const [showPreviewUrl, setShowPreviewUrl] = useState(false);
    }

    return {
        dni,
        setDni,
        email,
        setEmail,
        name,
        setName,
        lastName,
        setLastName,
        plan: 'basic',
        setPlan,
        dataRegisterHandle,
        errorMailForm,
        setErrorMailForm,
        errorDataForm,
        setErrorDataForm
    }
}

export default UserRegisterForm;