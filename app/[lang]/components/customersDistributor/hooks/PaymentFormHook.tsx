import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { GetUser } from "@/reactQuery/users";
import { UpdateOrdersInvoicesQuerie } from "@/reactQuery/generalQueries";
import { generatePaymentReference } from "../../../../wompi";
import { GetAllCards } from "@/reactQuery/home";
import { config as configDotenv } from "dotenv";
import { wompiConfig } from "@/firebase/firebaseConfig";

const PaymentFormHook = ({
  userDataPay,
  handleReturnForm,
  isIndividualPay,
}: {
  userDataPay: any;
  handleReturnForm: () => void;
  isIndividualPay: boolean;
}) => {
  const { data, refetch } = GetUser();
  const [flag, setFlag] = useState(false);
  const { data: dataCards } = GetAllCards(flag, data?.uid);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [acceptanceToken, setAcceptanceToken] = useState("");
  const [personalAuthToken, setPersonalAuthToken] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useExistingCard, setUseExistingCard] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
    card_holder: "",
    installments: "",
    idType: "",
    idNumber: "",
  });
  const [paymentSource, setPaymentSource] = useState(null);
  //Errores Modal Pagos
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [cvcError, setCvcError] = useState<string | null>(null);
  const [expMonthError, setExpMonthError] = useState<string | null>(null);
  const [expYearError, setExpYearError] = useState<string | null>(null);
  const [cardHolderError, setCardHolderError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [installmentsError, setInstallmentsError] = useState<string | null>(
    null
  );
  const [idTypeError, setIdTypeError] = useState<string | null>(null);
  const [idNumberError, setIdNumberError] = useState<string | null>(null);
  const [paymentSourceError, setPaymentSourceError] = useState<string | null>(
    null
  );

  const handleUseExistingCardToggle = () => {
    setUseExistingCard(!useExistingCard);
    handleReset();
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSelectCard = (event: any) => {
    const selectedCard = event.target.value;
    setPaymentSource(selectedCard?.paymentSourceId);
  };

  const formatPrice = (value: any) => {
    if (value == null || isNaN(value)) return "";
    const number = Number(value);
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(number);
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

    if (useExistingCard) {
      // Validar solo si existe paymentSource y installments
      if (!paymentSource) {
        setPaymentSourceError("El método de pago es obligatorio.");
        valid = false;
      }

      if (!cardInfo.installments) {
        setInstallmentsError("El número de cuotas es obligatorio.");
        valid = false;
      }

      // Validar aceptación de términos
      if (!isAccepted) {
        setTermsError("Debe aceptar los términos y condiciones.");
        valid = false;
      }
    } else {
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
        setCardHolderError(
          "El nombre del titular de la tarjeta es obligatorio."
        );
        valid = false;
      }

      // Validar número de cuotas (installments)
      if (!cardInfo.installments) {
        setInstallmentsError("El número de cuotas es obligatorio.");
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

      // Validar aceptación de términos
      if (!isAccepted) {
        setTermsError("Debe aceptar los términos y condiciones.");
        valid = false;
      }
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
    setPaymentSourceError(null);

    // Restablecer los estados del formulario
    setAcceptanceToken("");
    setPersonalAuthToken("");
    setIsAccepted(false);
    setError("");
    setCardInfo({
      number: "",
      cvc: "",
      exp_month: "",
      exp_year: "",
      card_holder: "",
      installments: "",
      idType: "",
      idNumber: "",
    });
    setPaymentSource(null);
    setIsSubmitting(false);
    setLoading(false);
  };

  const totalAmountToPay = isIndividualPay
    ? userDataPay?.userOrder?.totalAmount || 0
    : userDataPay.reduce(
        (total: any, item: any) => total + (item.userOrder?.totalAmount || 0),
        0
      );

  const dataRegisterHandle = async () => {
    try {
      const idInvoice = userDataPay?.userInvoice?.uid;
      const idOrden = userDataPay?.userOrder?.uid;
      const result = await UpdateOrdersInvoicesQuerie(idInvoice, idOrden);

      if (result.success) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: `Transacción realizada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
        handleReset();
        handleReturnForm();
      }
    } catch (error) {
      //console.log("Error al registrar al cliente");
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
    }
  };


  

  const updateUserOrderInvoice = async (userData: any) => {
    try {
      const idInvoice = userData.userInvoice?.uid;
      const idOrden = userData.userOrder?.uid;
      // Llamar a la API para actualizar cada usuario individualmente
      UpdateOrdersInvoicesQuerie(idInvoice, idOrden);
    } catch (error) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al procesar la transacción",
        text: "Ocurrió un error al registrar al cliente. Por favor, intenta de nuevo.",
        showConfirmButton: true,
      });
    }
  };

  //Consumo api para obtner los tokens de aceptacion
  const handleAccept = async () => {
    setIsAccepted(!isAccepted);
    if (!isAccepted) {
      try {
        const response = await axios.get(
          `https://sandbox.wompi.co/v1/merchants/${wompiConfig?.WOMPI_PUBLIC_KEY}`
        );
        const { acceptance_token, accept_personal_auth } =
          response.data.data.presigned_acceptance;

        setAcceptanceToken(acceptance_token);
        setPersonalAuthToken(accept_personal_auth);
        setError("");
      } catch (error) {
        console.error("Error al obtener los tokens de aceptación:", error);
        setError(
          "Error al obtener los tokens de aceptación. Intenta nuevamente."
        );
      }
    }
  };

  // Función para tokenizar la tarjeta
  const tokenizeCard = async (cardDetails: any) => {
    const tokenResponse = await axios.post(
      "https://sandbox.wompi.co/v1/tokens/cards",
      cardDetails,
      {
        headers: {
          Authorization: `Bearer ${wompiConfig.WOMPI_PUBLIC_KEY}`,
        },
      }
    );
    return tokenResponse.data.data.id;
  };

  // Función para crear la transacción
  const createTransaction = async (transactionBody: any) => {
    const authToken = paymentSource
      ? `Bearer ${wompiConfig.WOMPI_PRIVATE_KEY}`
      : `Bearer ${wompiConfig.WOMPI_PUBLIC_KEY}`;
    const transactionResponse = await axios.post(
      "https://sandbox.wompi.co/v1/transactions",
      transactionBody,
      {
        headers: { Authorization: authToken },
      }
    );

    return transactionResponse.data;
  };

  // Función principal para manejar el pago
  const handlePayment = async (e: any) => {
    e.preventDefault();
    if (!validateFormPayment()) return;

    setLoading(true);

    try {
      const amount = userDataPay?.userOrder?.totalAmount * 100;
      const reference = generatePaymentReference(userDataPay?.dni);
      const commonTransactionBody = {
        amount_in_cents: amount,
        reference: reference,
        currency: "COP",
        customer_email: userDataPay?.email ?? "cliente@example.com",
        payment_method: {
          type: "CARD",
          installments: cardInfo.installments,
        },
      };

      let transactionBody;
      if (paymentSource) {
        //Usar una tarjeta existente
        transactionBody = {
          ...commonTransactionBody,
          payment_source_id: paymentSource,
        };
      } else {
        const formattedData = {
          number: cardInfo.number,
          cvc: cardInfo.cvc,
          exp_month: String(cardInfo.exp_month).padStart(2, "0"),
          exp_year: String(cardInfo.exp_year).slice(-2),
          card_holder: cardInfo.card_holder,
        };
        const token = await tokenizeCard(formattedData);
        transactionBody = {
          ...commonTransactionBody,
          acceptance_token: acceptanceToken,
          payment_method: {
            ...commonTransactionBody.payment_method,
            token: token,
          },
        };
      }

      // Crear la transacción
      const transactionResponse = await createTransaction(transactionBody);
      checkPaymentStatus(transactionResponse.data.id);
    } catch (error) {
      setLoading(false);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en el pago",
        text: "Ocurrió un error al procesar el pago. Por favor, intenta de nuevo.",
        showConfirmButton: true,
      });
    }
  };

  const handleConsolidatedPayment = async (e: any) => {
    e.preventDefault();
    if (!validateFormPayment()) return;

    setLoading(true);

    try {
      const amount = totalAmountToPay * 100;
      const reference = generatePaymentReference(userDataPay?.dni);
      const commonTransactionBody = {
        amount_in_cents: amount,
        reference: reference,
        currency: "COP",
        customer_email: userDataPay?.email ?? "cliente@example.com",
        payment_method: {
          type: "CARD",
          installments: cardInfo.installments,
        },
      };

      let transactionBody;
      if (paymentSource) {
        transactionBody = {
          ...commonTransactionBody,
          payment_source_id: paymentSource,
        };
      } else {
        const formattedData = {
          number: cardInfo.number,
          cvc: cardInfo.cvc,
          exp_month: String(cardInfo.exp_month).padStart(2, "0"),
          exp_year: String(cardInfo.exp_year).slice(-2),
          card_holder: cardInfo.card_holder,
        };
        const token = await tokenizeCard(formattedData);
        transactionBody = {
          ...commonTransactionBody,
          acceptance_token: acceptanceToken,
          payment_method: {
            ...commonTransactionBody.payment_method,
            token: token,
          },
        };
      }

      // Crear la transacción
      const transactionResponse = await createTransaction(transactionBody);
      const transactionId = transactionResponse.data.id;

      // Verificar el estado del pago consolidado
      await checkPaymentStatus(transactionId);
    } catch (error) {
      setLoading(false);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en el pago",
        text: "Ocurrió un error al procesar el pago. Por favor, intenta de nuevo.",
        showConfirmButton: true,
      });
    }
  };

  const checkPaymentStatus = async (transactionId: any) => {
    const maxAttempts = 10; // Número máximo de intentos
    const interval = 5000; // Tiempo entre intentos en milisegundos
    let attempts = 0;

    return new Promise<void>((resolve, reject) => {
      const intervalId = setInterval(async () => {
        attempts += 1;

        try {
          const response = await fetch(
            `https://sandbox.wompi.co/v1/transactions/${transactionId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${wompiConfig.WOMPI_PRIVATE_KEY}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al consultar el estado del pago");
          }

          const result = await response.json();
          const status = result.data.status;

          if (status === "APPROVED") {
            clearInterval(intervalId);

            if (isIndividualPay) {
              await dataRegisterHandle();
            } else {
              for (const user of userDataPay) {
                await updateUserOrderInvoice(user);
              }
            }
            resolve();
            setLoading(false);
            handleReset();
            handleReturnForm();
            await Swal.fire({
              position: "center",
              icon: "success",
              title: `Pago consolidado realizado con éxito`,
              showConfirmButton: false,
              timer: 2000,
            });
          } else if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: "Verificación fallida",
              text: "No se pudo confirmar el estado del pago. Por favor, intenta más tarde.",
              showConfirmButton: true,
            });
            reject(
              new Error(
                "No se pudo confirmar el estado del pago después de varios intentos."
              )
            );
          }
        } catch (error) {
          clearInterval(intervalId);
          setLoading(false);
          console.error("Error en la verificación del estado del pago:", error);
          reject(error);
        }
      }, interval);
    });
  };

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
    data,
    handleAccept,
    error,
    isAccepted,
    handleInputChange,
    cardInfo,
    handlePayment,
    handleConsolidatedPayment,
    loading,
    installmentsError,
    setInstallmentsError,
    idTypeError,
    setIdTypeError,
    idNumberError,
    setIdNumberError,
    paymentSourceError,
    setPaymentSourceError,
    formatPrice,
    dataCards,
    handleUseExistingCardToggle,
    useExistingCard,
    setUseExistingCard,
    handleSelectCard,
    totalAmountToPay,
  };
};

export default PaymentFormHook;
