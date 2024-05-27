import { getAllUsers } from "@/firebase/user"
import { SendEditData } from "@/reactQuery/users";
import { useEffect, useState } from "react";

const UserTableLogic = () => {
    interface UserData {
        dni: string;
        name: string;
        lastName: string;
        email: string;
        plan: string;
        gif: boolean;
        uid: string
    }

    const [query, setQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalFail, setIsModalFail] = useState(false);
    const [dataUser, setDataUser] = useState<UserData | null>(null);
    const [dni, setDni] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [plan, setPlan] = useState<string>('');
    const [type, setType] = useState<string>('');

    const handleEditData = (dataUser: any) => {
        setDataUser(dataUser);
        setDni(dataUser?.dni);
        setName(dataUser?.name);
        setEmail(dataUser?.email);
        setPlan(dataUser?.plan);
        setType(dataUser?.gif ? dataUser?.gif === true ? "Obsequio" : "Comprador" : "Comprador");
        setIsModalEdit(true);
    }

    const dataRegisterHandle = async () => {
        const res = await SendEditData("" + dataUser?.uid, { dni: dni, name: name, email: email, plan: plan, gif: type === "Obsequio" ? true : false });
        if (res === true) {
            setTimeout(() => {
                setIsModalEdit(!isModalEdit);
            }, 500);
            setTimeout(() => {
                setIsModalSuccess(true);
            }, 500);
        } else {
            setTimeout(() => {
                setIsModalEdit(!isModalEdit);
            }, 500);
            setTimeout(() => {
                setIsModalFail(true);
            }, 500);
        }
        setFlag(!flag);
    }

    useEffect(() => {
        const getquery = async () => {
            //setQuery([]);
            const usersDataSanpShot = await getAllUsers();
            const usersData = usersDataSanpShot.docs.map((doc) => {
                const timestamp = doc.data().created;
                const date = new Date(timestamp);
                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours()
                        .toString()
                        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()
                            .toString()
                            .padStart(2, "0")}`;

                return {
                    id: doc.data().dni,
                    is_admin: doc.data().is_admin,
                    url: doc.data().preview,
                    name: doc.data().name,
                    email: doc.data().email || "",
                    lastName: doc.data().profile?.last_name?.text || "",
                    plan: doc.data().plan || "",
                    date: formattedDate,
                    status: doc.data().isActiveByAdmin === true ? "true" : "false" || "",
                    statusDelete: doc.data().isActiveByAdmin === true ? "true" : "false" || "",
                    edit: { switch: doc.data().isActiveByAdmin === true ? true : false || "", uid: doc.data().uid },
                    editDelete: { switch: doc.data().isActiveByAdmin === true ? true : false || "", uid: doc.data().uid },
                    userType: doc.data().gif ? doc.data().gif === true ? "Obsequio" : "Comprador" : "Comprador",
                    optionEdit: doc.data()
                };
            }).filter((user) => !user.is_admin);
            setQuery(usersData);
        };

        getquery();
    }, [flag]);

    return {
        query,
        flag,
        setFlag,
        setQuery,
        handleEditData,
        isModalEdit,
        setIsModalEdit,
        dataUser,
        setDni,
        dni,
        name,
        setName,
        email,
        setEmail,
        plan,
        setPlan,
        type,
        setType,
        dataRegisterHandle,
        isModalSuccess,
        setIsModalSuccess,
        isModalFail,
        setIsModalFail
    };
};

export default UserTableLogic;