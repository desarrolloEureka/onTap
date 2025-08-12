import {
  deleteSocialNetwork,
  getAllBackgroundImages,
  getAllCategories,
  getAllColors,
  getAllCustomizations,
  getAllDistributors,
  getAllLogosImages,
  getAllMaterials,
  getAllPlans,
  getAllPlansIndividual,
  getAllProducts,
  getAllSocialNetworks,
  getAllTemplates,
  getBackgroundImage,
  getTemplate,
  saveSocialNetworkImage,
  updateSocialNetwork,
  getAllNotifications,
  getAllSubscriptions,
  getAllCards,
  getLastOrder,
  getAllDefaultPlans,
} from "@/firebase/generals";
import { useQuery } from "@tanstack/react-query";

const GetTemplate = ({
  id,
  setId,
}: {
  id: string | null;
  setId: (e: string | null) => void;
}) =>
  useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      if (id) {
        setId(null);
        return await getTemplate({ id });
      }
      return null;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

const GetBackgroundImage = ({
  id,
  setId,
}: {
  id: string | null | undefined;
  setId: (e: string | null) => void;
}) =>
  useQuery({
    queryKey: ["background_images"],
    queryFn: async () => {
      if (id) {
        setId(null);
        return await getBackgroundImage({ id });
      }
      return null;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

const GetAllTemplates = () =>
  useQuery({
    queryKey: ["templates"],
    queryFn: async () => await getAllTemplates(),
    refetchOnWindowFocus: false,
  });

const GetAllBackgroundImages = (flag?: boolean) => {
  return useQuery({
    queryKey: ["background_images", flag],
    queryFn: async () => await getAllBackgroundImages(),
    refetchOnWindowFocus: false,
  });
};

const GetAllLogosImages = (flag?: boolean) => {
  return useQuery({
    queryKey: ["social_icons", flag],
    queryFn: async () => await getAllLogosImages(),
    refetchOnWindowFocus: false,
  });
};

const GetAllCategories = (flag?: boolean) => {
  return useQuery({
    queryKey: ["categories", flag],
    queryFn: async () => await getAllCategories(),
    refetchOnWindowFocus: false,
  });
};

const GetAllDefaultPlans = (flag?: boolean) => {
  return useQuery({
    queryKey: ["defaultPlans", flag],
    queryFn: async () => await getAllDefaultPlans(),
    refetchOnWindowFocus: false,
  });
};

const GetAllNotifications = (flag?: boolean) => {
  return useQuery({
    queryKey: ["notifications", flag],
    queryFn: async () => await getAllNotifications(),
    refetchOnWindowFocus: false,
  });
};

const GetAllSubscriptions = (flag?: boolean) => {
  return useQuery({
    queryKey: ["subscriptions", flag], // Cambia el queryKey a "subscriptions"
    queryFn: async () => await getAllSubscriptions(), // Llama a la función para obtener todas las suscripciones
    refetchOnWindowFocus: false,
  });
};

const GetAllProducts = (flag?: boolean) => {
  return useQuery({
    queryKey: ["products", flag],
    queryFn: async () => await getAllProducts(),
    refetchOnWindowFocus: false,
  });
};

const GetAllMaterials = (flag?: boolean) => {
  return useQuery({
    queryKey: ["materials", flag],
    queryFn: async () => await getAllMaterials(),
    refetchOnWindowFocus: false,
  });
};

const GetAllPlanes = (flag?: boolean) => {
  return useQuery({
    queryKey: ["plans", flag],
    queryFn: async () => await getAllPlans(),
    refetchOnWindowFocus: false,
  });
};

const GetAllPlanesIndividual = (flag?: boolean) => {
  return useQuery({
    queryKey: ["plans", flag],
    queryFn: async () => await getAllPlansIndividual(),
    refetchOnWindowFocus: false,
  });
};

const GetAllSocialNetworks = () => {
  return useQuery({
    queryKey: ["social_networks"],
    queryFn: async () => await getAllSocialNetworks(),
    refetchOnWindowFocus: false,
  });
};

const GetAllColors = (flag?: boolean) => {
  return useQuery({
    queryKey: ["colors", flag],
    queryFn: async () => await getAllColors(),
    refetchOnWindowFocus: false,
  });
};

const GetAllCustomizations = (flag?: boolean) => {
  return useQuery({
    queryKey: ["customizations", flag],
    queryFn: async () => await getAllCustomizations(),
    refetchOnWindowFocus: false,
  });
};

const GetAllDistributors = (flag?: boolean) => {
  return useQuery({
    queryKey: ["distributors", flag],
    queryFn: async () => await getAllDistributors(),
    refetchOnWindowFocus: false,
  });
};

const GetAllCards = (flag?: boolean, idUser?: any) => {
  return useQuery({
    queryKey: ["cards", flag],
    queryFn: async () => await getAllCards(idUser),
    refetchOnWindowFocus: false,
  });
};

const SaveSocialNetwork = async (imageFile: File, imageName: string) => {
  const res = await saveSocialNetworkImage(imageFile, imageName);
  return res;
};

const DeleteSocialNetwork = async (imageName: string, docId: any) => {
  const res = await deleteSocialNetwork(imageName, docId);
  return res;
};

const UpdateSocialNetwork = async (
  imageFile: File,
  oldImageName: string,
  newImageName: string,
  docId: string
) => {
  const res = await updateSocialNetwork(
    imageFile,
    oldImageName,
    newImageName,
    docId
  );
  return res;
};

const GetLastOrder = (flag?: boolean) => {
  return useQuery({
    queryKey: ["orders", flag],
    queryFn: async () => await getLastOrder(),
    refetchOnWindowFocus: false,
  });
};


export {
  GetAllTemplates,
  GetAllBackgroundImages,
  GetAllSocialNetworks,
  GetAllLogosImages,
  SaveSocialNetwork,
  DeleteSocialNetwork,
  UpdateSocialNetwork,
  GetTemplate,
  GetBackgroundImage,
  GetAllCategories,
  GetAllProducts,
  GetAllPlanes,
  GetAllMaterials,
  GetAllColors,
  GetAllCustomizations,
  GetAllDistributors,
  GetAllPlanesIndividual,
  GetAllNotifications,
  GetAllSubscriptions,
  GetAllCards,
  GetLastOrder,
  GetAllDefaultPlans
};
