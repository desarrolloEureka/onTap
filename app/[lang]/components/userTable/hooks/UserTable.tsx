import { getAllUsers } from "@/firebase/user"
import { checkUserExists, SendEditData } from "@/reactQuery/users";
import { registerUserAuth, registerUserFb } from "app/functions/register";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
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
    const [dataUser, setDataUser] = useState<UserData | null>(null);
    const [status, setStatus] = useState<string>('');

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

    const handleReset = () => {
        // Restablecer todos los estados relacionados con el formulario de usuario
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

        // Restablecer los estados de los modales
        setIsModalOpen(false);
        setIsModalQR(false);
        setIsModalSuccess(false);
        setIsModalFail(false);

        // Restablecer el estado de la fila seleccionada
        setRowId(null);

        // Restablecer cualquier estado adicional
        setIsSubmitting(false);
        setStatus('');
        setDataUser(null);
        setFlag(false);
        setUrlQR('');
        setStartDate('');
        setEndDate('');
        setSearchTerm('');

        // Restablecer la consulta filtrada (opcional si aplica a tu caso)
        setFilteredQuery(query);
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
        errorEmailMismatch
    };
};

export default UserTableLogic;