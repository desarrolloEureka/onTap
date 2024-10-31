import { useEffect, useState } from "react";
import {
  saveSubscriptionQuery,
  updateSubscriptionQuery,
} from "@/reactQuery/generalQueries";
import { GetAllSubscriptions } from "@/reactQuery/home";
import Swal from "sweetalert2";
import { Subscription } from "@/types/home";

const useSubscription = () => {
  const [query, setQuery] = useState<any>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [annualFee, setAnnualFee] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feeError, setFeeError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryResult = GetAllSubscriptions(flag);

  useEffect(() => {
    if (queryResult.data) {
      const subscriptionsData = queryResult.data.map((sub: Subscription) => ({
        id: sub.id,
        annual_fee: sub.annual_fee,
        description: sub.description,
      }));
      setQuery(subscriptionsData);
    } else {
      console.warn("No subscriptions found.");
    }
  }, [queryResult.data]);

  const validateSubscription = () => {
    setFeeError("");
    setDescriptionError("");

    let isValid = true;
    if (!annualFee || isNaN(Number(annualFee))) {
      setFeeError(
        "El valor de la suscripción es requerido y debe ser un número válido"
      );
      isValid = false;
    }

    if (description.trim() === "") {
      setDescriptionError("La descripción es requerida");
      isValid = false;
    }

    return isValid;
  };

  const handleEditSubscription = (subscription: Subscription) => {
    if (!subscription) {
      console.error("No se pasó ninguna suscripción para editar.");
      return;
    }

    setIsModalOpen(true);
    setIsEditData(true);
    setAnnualFee(subscription.annual_fee);
    setDescription(subscription.description);
    setSubscription(subscription);
    setError(null);
    setStatus("");
  };

  const handleResetSubscription = () => {
    setAnnualFee("");
    setDescription("");
    setError(null);
    setStatus("");
    setSubscription(null);
    setIsEditData(false);
  };

  const handleSaveSubscription = async () => {
    if (!validateSubscription()) return;

    const newSubscription: Omit<Subscription, "id"> = {
      createdAt: new Date().toISOString(),
      annual_fee: annualFee as number,
      description,
      months_period: 12,
      text_period: "anual",
    };

    try {
      const result = await saveSubscriptionQuery(newSubscription);
      if (result.success) {
        setFlag(!flag);
        handleCloseModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Suscripción guardada con éxito",
          showConfirmButton: false,
          timer: 2000,
        });
        handleResetSubscription();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      console.error("Error al guardar la suscripción:", error);
      setStatus("Error al guardar la suscripción");
    }
  };

  const handleEditData = async () => {
    if (!subscription) {
      console.error("No se pasó ninguna suscripción para editar.");
      return;
    }

    if (!validateSubscription()) return;

    try {
      const dataSend = {
        annual_fee: annualFee,
        description: description,
      };

      const result = await updateSubscriptionQuery(dataSend, subscription.id);
      if (result.success) {
        setIsModalOpen(false);

        Swal.fire({
          title: "Éxito!",
          text: "La suscripción se ha actualizado correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFlag(!flag);
    }
  };

  const handleOpenModal = () => {
    setIsEditData(false);
    setIsModalOpen(true);
    setStatus("");
    setAnnualFee("");
    setDescription("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStatus("");
    handleResetSubscription();
  };

  return {
    query,
    subscriptions,
    subscription,
    annualFee,
    description,
    feeError,
    descriptionError,
    status,
    isModalOpen,
    handleEditData,
    handleOpenModal,
    handleCloseModal,
    handleSaveSubscription,
    handleEditSubscription,
    handleResetSubscription,
    setSubscription,
    setAnnualFee,
    setDescription,
    isSubmitting,
    isEditData,
    validateSubscription,
    setDescriptionError,
  };
};

export default useSubscription;
