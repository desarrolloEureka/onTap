import { getAllUsers } from "@/firebase/user"
import { useEffect, useState } from "react";
//componet to display the user table using the data from the firebase where filter admin != true
const UserTableLogic = () => {
    const [query, setQuery] = useState<any>([]);
    useEffect(() => {
        const getquery = async () => {
            const usersDataSanpShot = await getAllUsers();
            const usersData = usersDataSanpShot.docs.map((doc) => ({
                id: doc.data().dni,
                is_admin: doc.data().is_admin,
                url: doc.data().preview,
                name:  doc.data().name ,
                email: doc.data().email || '',
                lastName: doc.data().profile?.last_name?.text || '',
                plan: doc.data().plan || '',
            })).filter((user) => !user.is_admin);
            setQuery(usersData);
        }
        getquery();
    }, []);
    return { query };
}

export default UserTableLogic;