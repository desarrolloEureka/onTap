import { getAllUsers } from "@/firebase/user"
import { useEffect, useState } from "react";

const UserTableLogic = () => {
    const [query, setQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const getquery = async () => {
            setQuery([]);
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
                    edit: { switch: doc.data().isActiveByAdmin === true ? true : false || "", uid: doc.data().uid },
                    userType: doc.data().gif ? doc.data().gif === true ? "Obsequio" : "Comprador" : "Comprador"
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
    };
};

export default UserTableLogic;