import { getAllUsers, getUsersWithOrdersAndInvoices } from "@/firebase/user"
import { countries } from "@/globals/constants";
import { checkUserExists, GetUser, SendEditData } from "@/reactQuery/users";
import { gridFilteredSortedRowIdsSelector, gridVisibleColumnFieldsSelector, useGridApiRef } from "@mui/x-data-grid";
import { registerUserAuth, registerUserFb } from "app/functions/register";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

const CustomersDistributorHook = ({ handlePayUser }: { handlePayUser: any }) => {
    interface UserData {
        dni: string;
        name: string;
        lastName: string;
        email: string;
        plan: string;
        gif: boolean;
        uid: string
    }
    const { data, refetch } = GetUser();
    const apiRef = useGridApiRef();
    const [query, setQuery] = useState<any>([]);
    const [filteredQuery, setFilteredQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    const [dataUser, setDataUser] = useState<UserData | null>(null);
    const [status, setStatus] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    //Modal editar/registro
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditData, setIsEditData] = useState(false);

    //
    const [isModalQR, setIsModalQR] = useState(false);
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalFail, setIsModalFail] = useState(false);
    //Datos
    const [dni, setDni] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const [phoneCode, setPhoneCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [plan, setPlan] = useState<string>('');
    const [type, setType] = useState<string>('');
    //Extra
    const [urlQR, setUrlQR] = useState<string>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [rowId, setRowId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    //Error
    const [errorDniForm, setErrorDniForm] = useState<string | null>(null);
    const [errorNameForm, setErrorNameForm] = useState<string | null>(null);
    const [errorPlanForm, setErrorPlanForm] = useState<string | null>(null);
    const [errorPhoneForm, setErrorPhoneForm] = useState<string | null>(null);
    const [errorPhoneCodeForm, setErrorPhoneCodeForm] = useState<string | null>(null);
    const [errorMailForm, setErrorMailForm] = useState<string | null>(null);
    const [errorConfirmEmailForm, setErrorConfirmEmailForm] = useState<string | null>(null);
    const [errorEmailMismatch, setErrorEmailMismatch] = useState<string | null>(null);


    const handleOpenModal = () => {
        setIsEditData(false);
        setIsModalOpen(true);
    };

    const handleEditUser = (dataUser: any) => {
        setDataUser(dataUser);
        setRowId(dataUser.uid);
        setDni(dataUser?.dni || "");
        setName(dataUser?.name || "");
        setEmail(dataUser?.email || "");
        setConfirmEmail(dataUser?.email || "");
        setPhoneCode(dataUser?.indicative || "");
        setPhone(dataUser?.phone || "");
        setPlan(dataUser?.plan || "");
        setType(dataUser?.gif ? dataUser?.gif === true ? "Obsequio" : "Comprador" : "Comprador");
        setIsEditData(true);
        setIsModalOpen(true);
    };

    const handleSeeQR = (URL: any) => {
        setUrlQR(URL);
        setIsModalQR(true);
    };

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
                const { edit, editDelete, optionEdit, lastName, url, userType, optionPay, __check__, ...filteredUser } = user;

                // Devolver los datos con la propiedad específica incluida
                return {
                    ...filteredUser
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

        if (dateStart && dateEnd && dateEnd < dateStart) {
            //console.error('La fecha final debe ser mayor o igual a la fecha inicial');
            return;
        }

        if (!dateStart && !dateEnd) {
            setFilteredQuery(query);
            return;
        }

        const filteredData = query.filter((user: { created_at: string }) => {
            const userDate = new Date(user.created_at);

            // Comparar si la fecha del usuario está dentro del rango
            if (dateStart && userDate < dateStart) return false;
            if (dateEnd && userDate > dateEnd) return false;

            return true;
        });
        setFilteredQuery(filteredData);
    };

    const handleDeleteFilter = () => {
        setFilteredQuery(query);
        setStartDate('');
        setEndDate('');
    };

    const handleReset = () => {
        setDni('');
        setName('');
        setLastName('');
        setEmail('');
        setConfirmEmail('');
        setPhoneCode('');
        setPhone('');
        setPlan('');
        setType('');
        // Restablecer los errores del formulario
        setErrorDniForm(null);
        setErrorNameForm(null);
        setErrorPlanForm(null);
        setErrorPhoneForm(null);
        setErrorPhoneCodeForm(null);
        setErrorMailForm(null);
        setErrorConfirmEmailForm(null);
        setErrorEmailMismatch(null);
        setIsModalOpen(false);
        setIsModalQR(false);
        setIsModalSuccess(false);
        setIsModalFail(false);
        setRowId(null);
        setIsSubmitting(false);
        setStatus('');
        setDataUser(null);
        setFlag(false);
        setUrlQR('');
        setStartDate('');
        setEndDate('');
        setSearchTerm('');
        setFilteredQuery(query);
        setSelectedRows([]);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        handleReset();
    };

    // Función para validar los campos del formulario
    const validateForm = () => {
        let valid = true;

        // Validar DNI
        if (dni.trim() === '') {
            setErrorDniForm('El DNI es obligatorio.');
            valid = false;
        } else {
            setErrorDniForm(null);
        }

        // Validar nombre
        if (name.trim() === '') {
            setErrorNameForm('El nombre es obligatorio.');
            valid = false;
        } else {
            setErrorNameForm(null);
        }

        // Validar plan
        if (!plan) {
            setErrorPlanForm('El plan es obligatorio.');
            valid = false;
        } else {
            setErrorPlanForm(null);
        }

        // Validar teléfono
        if (phone.trim() === '') {
            setErrorPhoneForm('El teléfono es obligatorio.');
            valid = false;
        } else {
            setErrorPhoneForm(null);
        }

        // Validar código de teléfono
        if (phoneCode.trim() === '') {
            setErrorPhoneCodeForm('El código de teléfono es obligatorio.');
            valid = false;
        } else {
            setErrorPhoneCodeForm(null);
        }

        // Validar correo electrónico
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const trimmedEmail = email.trim().toLowerCase();
        if (trimmedEmail === '') {
            setErrorMailForm('El correo electrónico es obligatorio.');
            valid = false;
        } else if (!emailRegex.test(trimmedEmail)) {
            setErrorMailForm('El correo electrónico no tiene un formato válido.');
            valid = false;
        } else {
            setErrorMailForm(null);
        }

        // Validar confirmación de correo
        const trimmedConfirmEmail = confirmEmail.trim().toLowerCase();
        if (trimmedConfirmEmail === '') {
            setErrorConfirmEmailForm('La confirmación del correo es obligatoria.');
            valid = false;
        } else if (!emailRegex.test(trimmedConfirmEmail)) {
            setErrorConfirmEmailForm('El correo de confirmación no tiene un formato válido.');
            valid = false;
        } else {
            setErrorConfirmEmailForm(null);
        }

        // Validar coincidencia de correos
        if (trimmedEmail !== trimmedConfirmEmail) {
            setErrorEmailMismatch('El correo electrónico y su confirmación no coinciden.');
            valid = false;
        } else {
            setErrorEmailMismatch(null);
        }

        return valid;
    };

    // Función para manejar el envío del formulario
    const dataRegisterHandle = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setStatus('');

        const trimmedDni = dni.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPhone = phone.trim();

        try {
            // Crear un timestamp para la fecha de creación
            const dateCreated = new Date().getTime();

            // Verificar si el usuario ya existe
            const { exists, field } = await checkUserExists(trimmedDni, trimmedEmail, trimmedPhone);
            if (exists) {
                setIsSubmitting(false);
                //setError(`El usuario con ${field} ya existe.`);
                return;
            }

            // Registrar usuario en la autenticación
            const result = await registerUserAuth({ user: trimmedEmail, password: trimmedDni });
            result.name = `${name} ${lastName}`;
            result.plan = plan;
            result.switch_profile = false; // Modo de perfil
            result.gif = true;
            result.email = trimmedEmail;
            result.phone = trimmedPhone;
            result.indicative = phoneCode;
            result.dni = trimmedDni;
            result.isActiveByAdmin = true;
            result.created = dateCreated;
            result.templateData = plan === 'standard' ? [{
                type: 'social',
                id: 'XfhZLINMOpRTI7cakd8o',
                background_id: '7ynTMVt3M6VFV3KykOXQ',
                checked: true,
            }] : [{
                type: 'social',
                id: 'XfhZLINMOpRTI7cakd8o',
                background_id: '7ynTMVt3M6VFV3KykOXQ',
                checked: true,
            }, {
                type: 'professional',
                id: 'ZESiLxKZFwUOUOgLKt6P',
                background_id: '7ynTMVt3M6VFV3KykOXQ',
                checked: true,
            }];

            // Registrar usuario en la base de datos
            await registerUserFb({ data: result });

            Swal.fire({
                position: "center",
                icon: "success",
                title: `Usuario registrado con éxito`,
                showConfirmButton: false,
                timer: 2000,
            });

            setIsModalOpen(false);
            handleReset();

        } catch (err) {
            setStatus('Error al registrar al usuario');
        } finally {
            setFlag(!flag);
            setIsSubmitting(false);
        }
    };

    const handleEditData = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        setStatus('');

        try {

            const dataSend = {
                dni,
                name,
                email,
                indicative: phoneCode,
                phone,
                plan,
                type
            };

            const result = await SendEditData(rowId, dataSend);

            if (result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Usuario actualizada con éxito`,
                    showConfirmButton: false,
                    timer: 2000,
                });
                setIsModalOpen(false);
                handleReset();
            } else {
                setStatus(result.message);
            }

        } catch (err) {
            setStatus('Error al registrar al usuario');
        } finally {
            setFlag(!flag);
            setIsSubmitting(false);
        }
    };

    const getCountryFlag = (item: any) => {
        const country = countries.find(country => country.id === item);
        return country ? country.flag : '';
    };

    const getCountryName = (item: any) => {
        const country = countries.find(country => country.id === item);
        return country ? country.code : '';
    };

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    const handleGetSelectedRows = () => {
        const selectedRowIds = apiRef && apiRef.current.getSelectedRows();
        const selectedData = query.filter((row: any) => selectedRowIds.has(row.id));
        handlePayUser(selectedData, false)
        setSelectedRows(selectedData);
    };

    function getExcelData(apiRef: any) {
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
        const data = filteredSortedRowIds.map((id) => {
            const row: { [key: string]: any } = {};
            visibleColumnsField.forEach((field) => {
                row[field] = apiRef.current.getCellParams(id, field).value;
            });
            return row;
        });

        return data;
    }

    const handleExport = () => {
        const data = getExcelData(apiRef);
        exportToExcel(data);
    };

    useEffect(() => {
        const getquery = async () => {
            const usersDataSanpShotAux = await getUsersWithOrdersAndInvoices();
            const usersData = usersDataSanpShotAux.map((doc: any) => {
                return {
                    id: doc.dni || 1,
                    created_at: doc?.created_at || "",
                    name: doc.firstName + " " + doc.lastName || "",
                    indicative: doc.indicative || "",
                    phone: doc.phone || "",
                    email: doc.email || "",
                    plan: doc?.selectedPlan?.name,
                    userType: doc,
                    optionEdit: doc,
                    optionPay: doc,
                    statusPay: doc.userInvoice.status === 'PAID' ? 'Pagado' : 'Pendiente por pagar',
                    userInvoice: doc.userInvoice,
                    userOrder: doc.userOrder,
                    edit: { switch: doc.isActiveByAdmin === true ? true : false || "", uid: doc.uid },
                    idDistributor: doc.idDistributor
                };
                //}).filter((user) => (!user.is_admin && !user.is_distributor))
            }).filter((user: any) => user?.idDistributor === data?.uid);
            setQuery(usersData);
            setFilteredQuery(usersData);
        };
        getquery();
    }, [data?.uid, flag]);

    return {
        data: filteredQuery,
        flag,
        setFlag,
        setQuery,
        handleOpenModal,
        isModalOpen,
        setIsModalOpen,
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
        apiRef,
        handleCloseModal,
        isEditData,
        lastName,
        setLastName,
        confirmEmail,
        setConfirmEmail,
        handleEditData,
        handleEditUser,
        errorDniForm,
        errorNameForm,
        errorPlanForm,
        errorPhoneForm,
        errorPhoneCodeForm,
        errorMailForm,
        errorConfirmEmailForm,
        errorEmailMismatch,
        formatearFecha,
        getCountryFlag,
        getCountryName,
        handleGetSelectedRows,
        handleExport,
        selectedRows,
        filteredQuery
    };
};

export default CustomersDistributorHook;