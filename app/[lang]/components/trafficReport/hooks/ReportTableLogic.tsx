import { getAllUsers } from '@/firebase/user';
import { useEffect, useState } from 'react';

const ReportTableLogic = () => {
    type UserDataDetail = {
        name: string;
        dni: string;
        email: string;
        views: string;
        DataMetrics?: {
            viewsDate: string;
            viewsTime: string;
            ipAddress: string;
            typeDevice: string;
            so: string;
            cityView: string;
            countryView: string;
            View_Count: number;
        }[];
    };

    const [query, setQuery] = useState<any>([]);
    const [filteredQuery, setFilteredQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    const [seeDetail, setSeeDetail] = useState(false);
    const [dataDetailUserTool, setDataDetailUserTool] = useState<UserDataDetail | null>();
    const [dataDetailUser, setDataDetailUser] = useState<any>([]);
    const [filteredDetail, setFilteredDetail] = useState<any>([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDateDetail, setStartDateDetail] = useState('');
    const [endDateDetail, setEndDateDetail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleBack = async () => {
        setStartDateDetail('');
        setEndDateDetail('');
        setSeeDetail(false);
    }

    const handleSeeDetail = async (dataDetail: any) => {
        setSeeDetail(true);
        setDataDetailUserTool(dataDetail);
        const dataMetrics = dataDetail?.DataMetrics ?? [];
        setDataDetailUser(dataMetrics);
        setFilteredDetail(dataMetrics);
    };

    const handleDateChange = () => {
        const dateStart = startDate ? new Date(startDate) : null;
        const dateEnd = endDate ? new Date(endDate) : null;

        if (dateStart) {
            dateStart.setDate(dateStart.getDate() + 1);
            dateStart.setHours(0, 0, 0, 0);
        }

        if (dateEnd) {
            dateEnd.setDate(dateEnd.getDate() + 1);
            dateEnd.setHours(23, 59, 59, 999);
        }

        if (!dateStart && !dateEnd) {
            setFilteredQuery(query);
            return;
        }

        const filteredData = query.filter((user: { date: string | number | Date; }) => {
            let userDate: Date;

            if (typeof user.date === 'string') {
                const userDateParts = user.date.split('/');
                userDate = new Date(`${userDateParts[2]}-${userDateParts[1]}-${userDateParts[0]}`);
            } else if (typeof user.date === 'number') {
                userDate = new Date(user.date);
            } else {
                userDate = user.date;
            }

            userDate.setDate(userDate.getDate() + 1);

            if (dateStart && dateEnd) {
                return userDate >= dateStart && userDate <= dateEnd;
            } else if (dateStart) {
                return userDate >= dateStart;
            } else if (dateEnd) {
                return userDate <= dateEnd;
            }
            return true;
        });
        setFilteredQuery(filteredData);
    };

    const handleDateChangeDetail = () => {
        const dateStart = startDateDetail ? new Date(startDateDetail) : null;
        const dateEnd = endDateDetail ? new Date(endDateDetail) : null;

        if (dateStart) {
            dateStart.setDate(dateStart.getDate() + 1);
            dateStart.setHours(0, 0, 0, 0);
        }

        if (dateEnd) {
            dateEnd.setDate(dateEnd.getDate() + 1);
            dateEnd.setHours(23, 59, 59, 999);
        }

        if (!dateStart && !dateEnd) {
            setFilteredQuery(query);
            return;
        }

        const filteredData = dataDetailUser && dataDetailUser.filter((user: { viewsDate: string | number | Date; }) => {
            let userDate: Date;
            if (typeof user.viewsDate === 'string') {
                const userDateParts = user.viewsDate.split('/');
                userDate = new Date(`${userDateParts[2]}-${userDateParts[1]}-${userDateParts[0]}`);
            } else if (typeof user.viewsDate === 'number') {
                userDate = new Date(user.viewsDate);
            } else {
                userDate = user.viewsDate;
            }

            if (dateStart && dateEnd) {
                return userDate >= dateStart && userDate <= dateEnd;
            } else if (dateStart) {
                return userDate >= dateStart;
            } else if (dateEnd) {
                return userDate <= dateEnd;
            }
            return true;
        });
        setFilteredDetail(filteredData);
    };

    const handleDeleteFilter = () => {
        setFilteredQuery(query);
        setStartDate('');
        setEndDate('');
    };

    const handleDeleteFilterDetail = () => {
        setFilteredDetail(dataDetailUser);
        setStartDateDetail('');
        setEndDateDetail('');
    };

    useEffect(() => {
        const getquery = async () => {
            const usersDataSanpShot = await getAllUsers();
            const usersData = usersDataSanpShot.docs.map((doc) => {
                const timestamp = doc.data().created;
                const date = new Date(timestamp);
                /* const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours()
                        .toString()
                        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()
                            .toString()
                            .padStart(2, "0")}`; */
                const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${date.getFullYear()}`;

                const formattedHour = `${date.getHours()
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
                    date: formattedDate,
                    hour: formattedHour,
                    optionDetail: doc.data()
                };
            }).filter((user) => !user.is_admin);
            setQuery(usersData);
            setFilteredQuery(usersData);
        };

        getquery();
    }, [flag]);

    return {
        query: filteredQuery,
        flag,
        setFlag,
        seeDetail,
        setSeeDetail,
        dataDetailUser,
        setDataDetailUser,
        handleSeeDetail,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchTerm,
        setSearchTerm,
        handleDateChange,
        startDateDetail,
        setStartDateDetail,
        endDateDetail,
        setEndDateDetail,
        handleDateChangeDetail,
        dataDetailUserTool,
        setDataDetailUserTool,
        filteredDetail,
        setFilteredDetail,
        handleBack,
        handleDeleteFilter,
        handleDeleteFilterDetail
    };
};

export default ReportTableLogic;