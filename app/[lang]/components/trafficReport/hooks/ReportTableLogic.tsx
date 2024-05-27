import { getAllUsers } from '@/firebase/user';
import { GetAllLogosImages } from '@/reactQuery/home';
import { useEffect, useState } from 'react';

const ReportTableLogic = () => {
    const [query, setQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    const [seeDetail, setSeeDetail] = useState(false);
    const [dataDetailUser, setDataDetailUser] = useState(null);
    const { data } = GetAllLogosImages(flag);

    useEffect(() => {
        const getquery = async () => {
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
                    name: doc.data().name,
                    email: doc.data().email || "",
                    lastName: doc.data().profile?.last_name?.text || "",
                    dateRegister: formattedDate,
                    optionDetail: doc.data()
                };
            }).filter((user) => !user.is_admin);
            setQuery(usersData);
        };

        getquery();
    }, [flag]);

    return {
        data: query,
        flag,
        setFlag,
        seeDetail,
        setSeeDetail,
        dataDetailUser,
        setDataDetailUser
    };
};

export default ReportTableLogic;