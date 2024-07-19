import { getAllUsers } from "@/firebase/user"
import { SendEditData } from "@/reactQuery/users";
import { useEffect, useRef, useState } from "react";
import * as XLSX from 'xlsx';

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
    const apiRef = useRef(null);
    const [query, setQuery] = useState<any>([]);
    const [filteredQuery, setFilteredQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalQR, setIsModalQR] = useState(false);
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalFail, setIsModalFail] = useState(false);
    const [dataUser, setDataUser] = useState<UserData | null>(null);
    const [dni, setDni] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneCode, setPhoneCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [plan, setPlan] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [urlQR, setUrlQR] = useState<string>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleEditData = (dataUser: any) => {
        setDataUser(dataUser);
        setDni(dataUser?.dni || "");
        setName(dataUser?.name || "");
        setEmail(dataUser?.email || "");
        setPhoneCode(dataUser?.indicative || "");
        setPhone(dataUser?.phone || "");
        setPlan(dataUser?.plan || "");
        setType(dataUser?.gif ? dataUser?.gif === true ? "Obsequio" : "Comprador" : "Comprador");
        setIsModalEdit(true);
    }

    const handleSeeQR = (URL: any) => {
        setUrlQR(URL);
        setIsModalQR(true);
    }

    const handleDownloadQR = () => {
        // Obtener el elemento SVG del QR
        const svgElement = document.getElementById('qrcode-svg');

        // Verificar si el elemento encontrado es un SVGElement
        if (!(svgElement instanceof SVGElement)) {
            console.error('Elemento SVG no encontrado');
            return;
        }

        // Tamaño deseado para el SVG y el canvas
        const size = 1500;

        // Margen deseado para el QR dentro del canvas
        const margin = 100;

        // Crear un elemento <canvas> para convertir SVG a imagen
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Verificar si el contexto 2D está disponible
        if (!context) {
            console.error('Contexto 2D no disponible');
            return;
        }

        // Dimensionar el canvas para ajustarse al SVG más los márgenes
        canvas.width = size + 2 * margin;
        canvas.height = size + 2 * margin;

        // Rellenar el canvas con fondo blanco
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar el SVG en el canvas con los márgenes
        const svgXML = new XMLSerializer().serializeToString(svgElement);
        const svg64 = btoa(svgXML);
        const b64Start = 'data:image/svg+xml;base64,';

        const image = new Image();
        image.onload = () => {
            context.drawImage(image, margin, margin, size, size);

            // Obtener la URL de datos del canvas en formato PNG
            const imageDataURL = canvas.toDataURL('image/png');

            // Crear un elemento <a> para descargar
            const downloadLink = document.createElement('a');
            downloadLink.href = imageDataURL;
            downloadLink.download = 'qrcode.png';

            // Añadir el enlace al documento y hacer clic en él
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Limpiar después de la descarga
            document.body.removeChild(downloadLink);
        };

        image.src = b64Start + svg64;
    };

    const exportToExcel = (filteredQuery: any) => {
        try {
            // Validar que filteredQuery sea un array
            if (!Array.isArray(filteredQuery)) {
                throw new Error("filteredQuery debe ser un array");
            }

            // Crear una copia de los datos excluyendo las columnas no deseadas
            const filteredData = filteredQuery.map((user) => {
                const { edit, editDelete, optionEdit, lastName, url, urlQR, ...filteredUser } = user;

                // Acceder a una propiedad específica del objeto url, por ejemplo, url.link
                const urlLink = url ? url.preview : ''; // Manejo de caso en que url podría ser undefined

                // Devolver los datos con la propiedad específica incluida
                return {
                    ...filteredUser,
                    url: urlLink // Reemplazar el objeto url con su propiedad específica
                };
            });

            // Crear una hoja de cálculo a partir de los datos filtrados
            const worksheet = XLSX.utils.json_to_sheet(filteredData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

            // Crear un archivo Blob y descargarlo
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            // Crear un enlace de descarga y hacer clic en él
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(data);
            downloadLink.download = 'Usuarios.xlsx';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
        }
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

    const handleDeleteFilter = () => {
        setFilteredQuery(query);
        setStartDate('');
        setEndDate('');
    };

    const dataRegisterHandle = async () => {
        const res = await SendEditData("" + dataUser?.uid, {
            dni: dni,
            name: name,
            email: email,
            indicative: phoneCode,
            phone: phone,
            plan: plan, gif: type === "Obsequio" ? true : false,
            templateData: plan === 'standard' ? [{
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
        });
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
            const usersDataSanpShot = await getAllUsers();
            const usersData = usersDataSanpShot.docs.map((doc) => {
                const data = doc.data(); // Obtener datos del documento
                const timestamp = doc.data().created;
                const date = new Date(timestamp);
                const formattedHour = `${date.getHours()
                    .toString()
                    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()
                        .toString()
                        .padStart(2, "0")}`;

                //const updatedData = { ...data, formattedDate: date, };

                return {
                    id: doc.data().dni,
                    is_admin: doc.data().is_admin,
                    url: doc.data(),
                    urlQR: doc.data(),
                    name: doc.data().name || "",
                    indicative: doc.data().indicative || "",
                    phone: doc.data().phone || "",
                    email: doc.data().email || "",
                    lastName: doc.data().profile?.last_name?.text || "",
                    //plan: doc.data().plan || "",
                    plan: doc.data(),
                    date: date,
                    //dateFormmatted: updatedData,
                    hour: formattedHour,
                    status: doc.data().isActiveByAdmin === true ? "true" : "false" || "",
                    statusDelete: doc.data().isActiveByAdmin === true ? "true" : "false" || "",
                    edit: { switch: doc.data().isActiveByAdmin === true ? true : false || "", uid: doc.data().uid },
                    editDelete: { switch: doc.data().isActiveByAdmin === true ? true : false || "", uid: doc.data().uid },
                    userType: doc.data(),
                    //userType: doc.data().gif ? doc.data().gif === true ? "Obsequio" : "Comprador" : "Comprador",
                    optionEdit: doc.data()
                };
            })
                .filter((user) => !user.is_admin)
            /* .sort((a, b) => b.date.getTime() - a.date.getTime()); */

            setQuery(usersData);
            setFilteredQuery(usersData);
        };

        getquery();
    }, [flag]);

    return {
        query: filteredQuery,
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
        setIsModalFail,
        handleSeeQR,
        isModalQR,
        setIsModalQR,
        urlQR,
        setUrlQR,
        handleDownloadQR,
        handleDateChange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchTerm,
        setSearchTerm,
        handleDeleteFilter,
        phoneCode,
        setPhoneCode,
        phone,
        setPhone,
        exportToExcel,
        apiRef
    };
};

export default UserTableLogic;