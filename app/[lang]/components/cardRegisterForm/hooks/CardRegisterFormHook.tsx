import { saveCardsQuerie } from "@/reactQuery/generalQueries";
import { GetAllCards } from "@/reactQuery/home";
import { GetUser } from "@/reactQuery/users";
import { createPaymentSource, getCardToken } from "app/wompi";
import moment from "moment";
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

const CardRegisterFormHook = () => {
    const { data, refetch } = GetUser();
    const [query, setQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    const { data: dataCards } = GetAllCards(flag, data?.uid);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [cardInfo, setCardInfo] = useState({
        number: '',
        cvc: '',
        exp_month: '',
        exp_year: '',
        card_holder: '',
        idType: '',
        idNumber: '',
    });
    const [loading, setLoading] = useState(false);
    //Errores Modal Pagos
    const [cardNumberError, setCardNumberError] = useState<string | null>(null);
    const [cvcError, setCvcError] = useState<string | null>(null);
    const [expMonthError, setExpMonthError] = useState<string | null>(null);
    const [expYearError, setExpYearError] = useState<string | null>(null);
    const [cardHolderError, setCardHolderError] = useState<string | null>(null);
    const [termsError, setTermsError] = useState<string | null>(null);
    const [installmentsError, setInstallmentsError] = useState<string | null>(null);
    const [idTypeError, setIdTypeError] = useState<string | null>(null);
    const [idNumberError, setIdNumberError] = useState<string | null>(null);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [rowId, setRowId] = useState(null);


    const handleOpenModal = async () => {
        setIsEditData(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        handleReset();
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    };

    const validateFormPayment = () => {
        let valid = true;

        // Resetear errores
        setCardNumberError(null);
        setCvcError(null);
        setExpMonthError(null);
        setExpYearError(null);
        setCardHolderError(null);
        setTermsError(null);
        setInstallmentsError(null);
        setIdTypeError(null);
        setIdNumberError(null);

        // Validar número de tarjeta
        if (!cardInfo.number) {
            setCardNumberError("El número de tarjeta es obligatorio.");
            valid = false;
        } else if (!/^\d{16}$/.test(cardInfo.number)) {
            setCardNumberError("El número de tarjeta debe tener 16 dígitos.");
            valid = false;
        }

        // Validar CVC
        if (!cardInfo.cvc) {
            setCvcError("El CVC es obligatorio.");
            valid = false;
        } else if (!/^\d{3}$/.test(cardInfo.cvc)) {
            setCvcError("El CVC debe tener 3 dígitos.");
            valid = false;
        }

        // Validar mes de expiración
        if (!cardInfo.exp_month) {
            setExpMonthError("El mes de expiración es obligatorio.");
            valid = false;
        }

        // Validar año de expiración
        if (!cardInfo.exp_year) {
            setExpYearError("El año de expiración es obligatorio.");
            valid = false;
        }

        // Validar nombre del titular de la tarjeta
        if (!cardInfo.card_holder) {
            setCardHolderError("El nombre del titular de la tarjeta es obligatorio.");
            valid = false;
        }

        // Validar tipo de identificación (idType)
        if (!cardInfo.idType) {
            setIdTypeError("El tipo de identificación es obligatorio.");
            valid = false;
        }

        // Validar número de identificación (idNumber)
        if (!cardInfo.idNumber) {
            setIdNumberError("El número de identificación es obligatorio.");
            valid = false;
        }

        return valid;
    };

    const handleReset = () => {
        // Restablecer todos los errores del formulario de pago
        setCardNumberError(null);
        setCvcError(null);
        setExpMonthError(null);
        setExpYearError(null);
        setCardHolderError(null);
        setTermsError(null);
        setInstallmentsError(null);
        setIdTypeError(null);
        setIdNumberError(null);

        // Restablecer los estados del formulario
        setIsModalOpen(false);
        setError('');
        setCardInfo({
            number: '',
            cvc: '',
            exp_month: '',
            exp_year: '',
            card_holder: '',
            idType: '',
            idNumber: '',
        });
        setIsSubmitting(false);
        setLoading(false);
    };

    const dataRegisterHandle = async () => {
        try {
            if (!validateFormPayment()) return;

            setLoading(true);

            const createdAt = moment().format();
            const formattedData = {
                number: cardInfo.number,
                cvc: cardInfo.cvc,
                exp_month: String(cardInfo.exp_month).padStart(2, '0'),
                exp_year: String(cardInfo.exp_year).slice(-2),
                card_holder: cardInfo.card_holder,
            };

            // Obtener el token de la tarjeta
            const tokenResponse = await getCardToken(formattedData);
            const paymentResponse = await createPaymentSource(tokenResponse?.token, data?.email);

            const dataSend = {
                paymentSourceId: paymentResponse?.dataCard?.id,
                public_data: paymentResponse?.dataCard?.public_data,
                created_at: createdAt,
                idUser: data?.uid
            };

            const result = await saveCardsQuerie(dataSend);

            if (result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Tarjeta registrado con éxito`,
                    showConfirmButton: false,
                    timer: 2000,
                });
                setIsModalOpen(false);
                handleReset();
            } else {
                setIsModalOpen(false);
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error. Por favor, intenta de nuevo.",
                    showConfirmButton: true,
                });
            }

        } catch (error) {
            setIsModalOpen(false);
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "Ocurrió un error. Por favor, intenta de nuevo.",
                showConfirmButton: true,
            });
        } finally {
            setFlag(!flag);
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (dataCards) {
            let idCounter = 1;
            const formattedData = dataCards.map(doc => {
                return {
                    id: idCounter++,
                    uid: doc.id,
                    optionEdit: doc,
                    created_at: doc.created_at,
                    number: doc?.public_data?.last_four || '',
                };
            });
            setQuery(formattedData);
        }
    }, [dataCards]);

    return {
        cardNumberError,
        setCardNumberError,
        cvcError,
        setCvcError,
        expMonthError,
        setExpMonthError,
        expYearError,
        setExpYearError,
        cardHolderError,
        setCardHolderError,
        termsError,
        setTermsError,
        dataRegisterHandle,
        data: query,
        error,
        handleInputChange,
        cardInfo,
        isModalOpen,
        setIsModalOpen,
        loading,
        installmentsError,
        setInstallmentsError,
        idTypeError,
        setIdTypeError,
        idNumberError,
        setIdNumberError,
        handleOpenModal,
        handleCloseModal
    };
};

export default CardRegisterFormHook;
