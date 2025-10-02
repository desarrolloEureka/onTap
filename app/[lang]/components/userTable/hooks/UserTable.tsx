import { getUsersWithOrdersAndInvoices } from "@/firebase/user";
import { getDocumentReference, saveSubscriptionQuerie, updateSubscriptionsQuery } from "@/reactQuery/generalQueries";
import { checkUserExists, SendEditData } from "@/reactQuery/users";
import { registerUserAuth, registerUserFb } from "app/functions/register";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const UserTableLogic = () => {
  interface UserData {
    dni: string;
    name: string;
    lastName: string;
    email: string;
    plan: string;
    gif: boolean;
    uid: string;
  }
  const apiRef = useRef(null);
  const [query, setQuery] = useState<any>([]);
  const [filteredQuery, setFilteredQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [dataUser, setDataUser] = useState<UserData | null>(null);
  const [status, setStatus] = useState<string>("");

  //Modal editar/registro
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditData, setIsEditData] = useState(false);

  //
  const [isModalQR, setIsModalQR] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [isModalFail, setIsModalFail] = useState(false);
  //Datos
  const [dni, setDni] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("CO+57");
  const [phone, setPhone] = useState<string>("");
  const [plan, setPlan] = useState<string>("");
  const [subscription, setSubscription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  //Extra
  const [urlQR, setUrlQR] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowId, setRowId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  //Error
  const [errorDniForm, setErrorDniForm] = useState<string | null>(null);
  const [errorNameForm, setErrorNameForm] = useState<string | null>(null);
  const [errorLastNameForm, setErrorLastNameForm] = useState<string | null>(null);
  const [errorTypeForm, setErrorTypeForm] = useState<string | null>(null);
  const [errorPlanForm, setErrorPlanForm] = useState<string | null>(null);
  const [errorPhoneForm, setErrorPhoneForm] = useState<string | null>(null);
  const [errorPhoneCodeForm, setErrorPhoneCodeForm] = useState<string | null>(
    null
  );
  const [errorMailForm, setErrorMailForm] = useState<string | null>(null);
  const [errorConfirmEmailForm, setErrorConfirmEmailForm] = useState<
    string | null
  >(null);
  const [errorEmailMismatch, setErrorEmailMismatch] = useState<string | null>(
    null
  );
  const [errorDateForm, setErrorDateForm] = useState("");

  const handleOpenModal = () => {
    setIsEditData(false);
    setIsModalOpen(true);
  };

  const handleEditUser = (dataUser: any) => {
    setDataUser(dataUser);
    setRowId(dataUser.uid);
    setDni(dataUser?.dni != null ? String(dataUser.dni) : "");
    setName(dataUser?.firstName || "");
    setLastName(dataUser?.lastName || "");
    setEmail(dataUser?.email || "");
    setConfirmEmail(dataUser?.email || "");
    setPhoneCode(dataUser?.indicative || "CO+57");
    setPhone(dataUser?.phone || "");
    setPlan(dataUser?.plan || "");
    setSubscription(dataUser?.userSubscription?.uid || "");

    //const dateSource = dataUser?.gif === true ? dataUser?.created : dataUser?.userSubscription?.updatedAt || dataUser?.created || ''
    const dateSource = dataUser?.userSubscription?.created_at || dataUser?.created || ''

    if (dateSource) {
      const date = new Date(dateSource);
      if (isNaN(date.getTime())) {
        setSelectedDate("");
      } else {
        const formattedDate = date.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
      }
    } else {
      setSelectedDate("");
    }

    setType(
      dataUser?.gif
        ? dataUser?.gif === true
          ? "Obsequio"
          : "Comprador"
        : "Comprador"
    );
    setIsEditData(true);
    setIsModalOpen(true);
  };

  //verQR
  const handleSeeQR = (URL: any) => {
    setUrlQR(URL);
    setIsModalQR(true);
  };

  //descargar qr
  const handleDownloadQR = () => {
    // Obtener el elemento SVG del QR
    const svgElement = document.getElementById("qrcode-svg");

    // Verificar si el elemento encontrado es un SVGElement
    if (!(svgElement instanceof SVGElement)) {
      console.error("Elemento SVG no encontrado");
      return;
    }

    // Tamaño deseado para el SVG y el canvas
    const size = 1500;

    // Margen deseado para el QR dentro del canvas
    const margin = 100;

    // Crear un elemento <canvas> para convertir SVG a imagen
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Verificar si el contexto 2D está disponible
    if (!context) {
      console.error("Contexto 2D no disponible");
      return;
    }

    // Dimensionar el canvas para ajustarse al SVG más los márgenes
    canvas.width = size + 2 * margin;
    canvas.height = size + 2 * margin;

    // Rellenar el canvas con fondo blanco
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar el SVG en el canvas con los márgenes
    const svgXML = new XMLSerializer().serializeToString(svgElement);
    const svg64 = btoa(svgXML);
    const b64Start = "data:image/svg+xml;base64,";

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, margin, margin, size, size);

      // Obtener la URL de datos del canvas en formato PNG
      const imageDataURL = canvas.toDataURL("image/png");

      // Crear un elemento <a> para descargar
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataURL;
      downloadLink.download = "qrcode.png";

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
      const filteredData = filteredQuery.map((user: any) => {
        const {
          edit,
          editDelete,
          optionEdit,
          lastName,
          url,
          urlQR,
          socialEdit,
          professionalEdit,
          plan,
          userType,
          ...filteredUser
        } = user;

        const urlLink = url ? url.preview : "";

        const formattedUserType = userType?.idDistributor
          ? "Registrado por distribuidor"
          : userType?.gif
            ? "Obsequio"
            : "Comprador";

        // Devolver los datos con la propiedad específica incluida
        return {
          ...filteredUser,
          url: urlLink,
          plan: plan?.plan ?? "",
          userType: formattedUserType,
        };
      });

      const headers = [
        "date",
        "id",
        "name",
        "indicative",
        "phone",
        "email",
        "plan",
        "userType",
        "paymentDate",
        "nextPaymentDate",
        "autoPaymentAuthorized",
        "url",
      ];

      // Crear una hoja de cálculo a partir de los datos filtrados
      const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: headers });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

      // Crear un archivo Blob y descargarlo
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Crear un enlace de descarga y hacer clic en él
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(data);
      downloadLink.download = "Usuarios.xlsx";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
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

    const filteredData = query.filter((user: { date: string }) => {
      const userDate = new Date(user.date);

      // normalizar fecha de usuario
      userDate.setHours(0, 0, 0, 0);

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
    setStartDate("");
    setEndDate("");
  };

  const handleReset = () => {
    // Restablecer todos los estados relacionados con el formulario de usuario
    setDni("");
    setName("");
    setLastName("");
    setEmail("");
    setConfirmEmail("");
    setPhoneCode("CO+57");
    setPhone("");
    setPlan("");
    setSubscription("");
    setType("");
    setSelectedDate("");

    // Restablecer los errores del formulario
    setErrorDniForm(null);
    setErrorNameForm(null);
    setErrorLastNameForm(null);
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
    setStatus("");
    setDataUser(null);
    setFlag(false);
    setUrlQR("");
    setStartDate("");
    setEndDate("");
    setSearchTerm("");

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
    if (dni.trim() === "") {
      setErrorDniForm("El DNI es obligatorio.");
      valid = false;
    } else {
      setErrorDniForm(null);
    }

    // Validar nombre
    if (name.trim() === "") {
      setErrorNameForm("El nombre es obligatorio.");
      valid = false;
    } else {
      setErrorNameForm(null);
    }

    // Validar Apellido
    if (lastName.trim() === "") {
      setErrorLastNameForm("El apellido es obligatorio.");
      valid = false;
    } else {
      setErrorLastNameForm(null);
    }

    // Validar plan
    if (!plan) {
      setErrorPlanForm("El plan es obligatorio.");
      valid = false;
    } else {
      setErrorPlanForm(null);
    }

    // Validar tipo
    if (!type) {
      setErrorTypeForm("El tipo de usuario es obligatorio.");
      valid = false;
    } else {
      setErrorTypeForm(null);
    }

    // Validar teléfono
    if (phone.trim() === "") {
      setErrorPhoneForm("El teléfono es obligatorio.");
      valid = false;
    } else {
      setErrorPhoneForm(null);
    }

    // Validar código de teléfono
    if (phoneCode.trim() === "") {
      setErrorPhoneCodeForm("El código de teléfono es obligatorio.");
      valid = false;
    } else {
      setErrorPhoneCodeForm(null);
    }

    // Validar correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail === "") {
      setErrorMailForm("El correo electrónico es obligatorio.");
      valid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setErrorMailForm("El correo electrónico no tiene un formato válido.");
      valid = false;
    } else {
      setErrorMailForm(null);
    }

    // Validar confirmación de correo
    const trimmedConfirmEmail = confirmEmail.trim().toLowerCase();
    if (trimmedConfirmEmail === "") {
      setErrorConfirmEmailForm("La confirmación del correo es obligatoria.");
      valid = false;
    } else if (!emailRegex.test(trimmedConfirmEmail)) {
      setErrorConfirmEmailForm(
        "El correo de confirmación no tiene un formato válido."
      );
      valid = false;
    } else {
      setErrorConfirmEmailForm(null);
    }

    // Validar coincidencia de correos
    if (trimmedEmail !== trimmedConfirmEmail) {
      setErrorEmailMismatch(
        "El correo electrónico y su confirmación no coinciden."
      );
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
    setStatus("");

    const trimmedDni = dni.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    try {
      setIsModalOpen(false);
      Swal.fire({
        title: "Registrando usuario...",
        text: "Por favor, espera.",
        allowOutsideClick: false,
        backdrop: true,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup: "tw-z-[9999]"
        }
      });

      // Crear un timestamp para la fecha de creación
      const dateCreated = new Date().getTime();

      // Verificar si el usuario ya existe
      const { exists, field } = await checkUserExists(
        trimmedDni,
        trimmedEmail,
        trimmedPhone
      );
      if (exists) {
        setIsSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Usuario ya existe",
          text: `El usuario con ${field} ya está registrado.`,
        });
        return;
      }

      const documentRefUser: any = getDocumentReference("subscriptions");

      // Registrar usuario en la autenticación
      const result = await registerUserAuth({
        user: trimmedEmail,
        password: trimmedDni,
      });
      result.name = `${name} ${lastName}`;
      result.firstName = name;
      result.lastName = lastName;
      result.plan = plan;
      result.switch_profile = false; // Modo de perfil
      result.gif = type === "Obsequio" ? true : false,
        result.email = trimmedEmail;
      result.phone = trimmedPhone;
      result.indicative = phoneCode;
      result.dni = trimmedDni;
      result.isActiveByAdmin = true;
      result.created = dateCreated;
      result.subscriptionId = documentRefUser.id;
      result.templateData =
        plan === "standard"
          ? [
            {
              type: "social",
              id: "XfhZLINMOpRTI7cakd8o",
              background_id: "7ynTMVt3M6VFV3KykOXQ",
              checked: true,
            },
          ]
          : [
            {
              type: "social",
              id: "XfhZLINMOpRTI7cakd8o",
              background_id: "7ynTMVt3M6VFV3KykOXQ",
              checked: true,
            },
            {
              type: "professional",
              id: "ZESiLxKZFwUOUOgLKt6P",
              background_id: "7ynTMVt3M6VFV3KykOXQ",
              checked: true,
            },
          ];

      // Registrar usuario en la base de datos
      const dataUser = await registerUserFb({ data: result });
      const createdAt = moment().format();
      const nextYearDate = type === "Obsequio" ? moment().add(3, 'months').format() : moment().add(1, 'year').format();

      const dataSend = {
        userUid: dataUser?.uid,
        created_at: createdAt,
        status: 'Active',
        nextPaymentDate: nextYearDate,
        uid: documentRefUser.id,
      };

      await saveSubscriptionQuerie(dataSend);

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
      console.log("Error:", err);
      setStatus("Error al registrar al usuario");
      Swal.close();
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  const handleEditData = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setStatus("");

    try {
      const selectedDateFormatted = moment(selectedDate).toISOString();

      const dataSend = {
        dni,
        name,
        firstName: name,
        lastName: lastName,
        email,
        indicative: phoneCode,
        phone,
        plan,
        type,
        gif: type === "Obsequio" ? true : false,
      };

      const result = await SendEditData(rowId, dataSend, selectedDateFormatted);

      const updatedAt = moment().format();
      const nextYearDate = type === "Obsequio" ? moment(selectedDateFormatted).add(3, 'months').toISOString() : moment(selectedDateFormatted).add(1, 'year').toISOString();
      const statusUser = moment().isAfter(nextYearDate) ? "Inactive" : "Active";

      const dataSendSus = {
        updatedAt,
        status: statusUser,
        nextPaymentDate: nextYearDate,
      };

      subscription && await updateSubscriptionsQuery(dataSendSus, subscription);

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
      setStatus("Error al registrar al usuario");
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  const openEditProfile = (profileType: string, uid: string) => {
    const url = `${window.location.origin
      }/es/views/profileEdit?type=${encodeURIComponent(
        profileType
      )}&uid=${encodeURIComponent(uid)}`;
    window.open(url, "_blank", "noopener noreferrer");
  };

  useEffect(() => {
    const getquery = async () => {
      const usersDataSanpShot = await getUsersWithOrdersAndInvoices();
      const usersData = usersDataSanpShot.map((doc: any) => {
        return {
          id: doc.dni || 1,
          uid: doc.uid || "",
          is_admin: doc.is_admin,
          is_distributor: doc.is_distributor || false,
          url: doc,
          urlQR: doc,
          name: doc.firstName + " " + doc.lastName || "",
          indicative: doc.indicative || "",
          phone: doc.phone || "",
          email: doc.email || "",
          lastName: doc.profile?.last_name?.text || "",
          plan: doc,
          date: doc?.created || "",
          status: doc.isActiveByAdmin === true ? "true" : "false",
          statusDelete:
            doc.isActiveByAdmin === true ? "true" : "false",
          edit: {
            switch: doc.isActiveByAdmin === true ? true : false || "",
            uid: doc.uid,
          },
          editDelete: {
            switch: doc.isActiveByAdmin === true ? true : false || "",
            uid: doc.uid,
          },
          userType: doc,
          //userType: doc.gif ? doc.gif === true ? "Obsequio" : "Comprador" : "Comprador",
          optionEdit: doc,
          //paymentDate: doc.gif === true ? doc?.created || '' : doc?.userSubscription?.updatedAt || doc?.created || '',
          paymentDate: doc?.userSubscription?.created_at || doc?.created || '',
          nextPaymentDate: doc.userSubscription?.nextPaymentDate || '',
          autoPaymentAuthorized: doc?.autoPaymentAuthorized || false,
          userInvoice: doc?.userInvoice || '',
          gif: doc.gif,
          idDistributor: doc.idDistributor,

        };
      })
        .filter((user) =>
          !user.is_admin &&
          !user.is_distributor
          && (
            user.idDistributor
              ? user.userInvoice?.status === "PAID"
              : true
          )
        );
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
    errorLastNameForm,
    errorPlanForm,
    errorTypeForm,
    errorPhoneForm,
    errorPhoneCodeForm,
    errorMailForm,
    errorConfirmEmailForm,
    errorEmailMismatch,
    openEditProfile,
    selectedDate,
    setSelectedDate,
    errorDateForm,
    setErrorDateForm
  };
};

export default UserTableLogic;
