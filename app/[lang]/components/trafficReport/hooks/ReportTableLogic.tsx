import { getAllUsers } from '@/firebase/user';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

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

        const formattedDataMetrics = dataMetrics.map((metric: any) => {
            console.log('metric.viewsDate ', metric.viewsDate);

            let day, month, year;

            // Detectar formato
            const parts = metric.viewsDate.split('/');
            if (parts.length === 3) {
                const [part1, part2, part3] = parts.map(Number);
                if (part1 > 12) {
                    // Formato dd/mm/yyyy
                    [day, month, year] = [part1, part2, part3];
                } else if (part2 > 12) {
                    // Formato mm/dd/yyyy
                    [month, day, year] = [part1, part2, part3];
                } else {
                    // Ambiguo, asumimos dd/mm/yyyy por defecto
                    [day, month, year] = [part1, part2, part3];
                }
            }

            let hours = 0,
                minutes = 0,
                seconds = 0;

            const timeParts = metric.viewsTime.split(' ');

            if (timeParts.length === 2) {
                const [hms, period] = timeParts;
                [hours, minutes, seconds] = hms.split(':').map(Number);
                if (period.toLowerCase().includes('p.m.') && hours !== 12) {
                    hours += 12;
                } else if (period.toLowerCase().includes('a.m.') && hours === 12) {
                    hours = 0;
                }
            } else {
                [hours, minutes, seconds] = metric.viewsTime.split(':').map(Number);
            }

            const formattedDate = new Date(year, month - 1, day, hours, minutes, seconds);

            console.log('formattedDate ', formattedDate);

            return {
                ...metric,
                viewsDate: formattedDate,
            };
        });

        setFilteredDetail(formattedDataMetrics);
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

    const exportToExcel = (filteredQuery: any, type: boolean) => {
        // Crear una copia de los datos excluyendo las columnas no deseadas
        const filteredData = filteredQuery.map((user: any) => {
            const { edit, editDelete, optionEdit, lastName, optionDetail, ...filteredUser } = user;
            return filteredUser;
        });

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

        // Crear un archivo Blob y descargarlo
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(data);
        downloadLink.download = type ? 'Usuarios_Metricas.xlsx' : 'Metricas.xlsx';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    useEffect(() => {
        const getquery = async () => {
            const usersDataSanpShot = await getAllUsers();
            const usersData = usersDataSanpShot.docs.map((doc) => {
                const timestamp = doc.data().created;
                const date = new Date(timestamp);

                const formattedHour = `${date.getHours()
                    .toString()
                    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()
                        .toString()
                        .padStart(2, "0")}`;

                //const socialData = doc.data().templateData?.find((item: any) => item.type === 'social');
                //const template = socialData && socialData.id ? socialData.id === 'LB7IVjoanye1dXzhipOG' ? 'Social 2' : socialData.id === 'XfhZLINMOpRTI7cakd8o' ? 'Social 1' : null : null

                return {
                    id: doc.data().dni,
                    is_admin: doc.data().is_admin,
                    is_distributor: doc.data().is_distributor || false,
                    name: doc.data().name,
                    email: doc.data().email || "",
                    lastName: doc.data().profile?.last_name?.text || "",
                    date: date,
                    hour: formattedHour,
                    optionDetail: doc.data(),
                };
            }).filter((user) => (!user.is_admin && !user.is_distributor))

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
        handleDeleteFilterDetail,
        exportToExcel
    };
};

export default ReportTableLogic;