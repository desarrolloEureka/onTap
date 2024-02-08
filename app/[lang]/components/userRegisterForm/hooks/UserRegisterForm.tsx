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
const UserRegisterForm = (dictionary:Dictionary, isBasicPlan: Boolean) => {
    const [dni, setDni] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();    

    return {
        dni,
        setDni,
        email,
        setEmail,
        name,
        setName,
        lastName,
        setLastName
    }
}

export default UserRegisterForm;