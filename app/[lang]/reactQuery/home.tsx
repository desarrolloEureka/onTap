import {
  deleteSocialNetwork,
  getAllBackgroundImages,
  getAllLogosImages,
  getAllSocialNetworks,
  getAllTemplates,
  getBackgroundImage,
  getTemplate,
  saveSocialNetworkImage,
  updateSocialNetwork,
} from '@/firebase/generals';
import { useQuery } from '@tanstack/react-query';

const GetTemplate = ({ id, setId }: { id: string | null, setId: (e: string | null) => void }) =>
  useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      if (id) {
        setId(null);
        return await getTemplate({ id });
      }
      return null
    },
    refetchOnWindowFocus: false,
    enabled: !!id
  });

const GetBackgroundImage = ({ id, setId }: { id: string | null | undefined, setId: (e: string | null) => void }) =>
  useQuery({
    queryKey: ['background_images'],
    queryFn: async () => {
      if (id) {
        setId(null);
        return await getBackgroundImage({ id });
      }
      return null
    },
    refetchOnWindowFocus: false,
    enabled: !!id
  });


const GetAllTemplates = () =>
  useQuery({
    queryKey: ['templates'],
    queryFn: async () => await getAllTemplates(),
    refetchOnWindowFocus: false,
  });

const GetAllBackgroundImages = () => {
  return useQuery({
    queryKey: ['background_images'],
    queryFn: async () => await getAllBackgroundImages(),
    refetchOnWindowFocus: false,
  });
};

const GetAllLogosImages = (flag?: boolean) => {
  return useQuery({
    queryKey: ['social_icons', flag],
    queryFn: async () => await getAllLogosImages(),
    refetchOnWindowFocus: false,
  });
};

const GetAllSocialNetworks = () => {
  return useQuery({
    queryKey: ['social_networks'],
    queryFn: async () => await getAllSocialNetworks(),
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

const UpdateSocialNetwork = async (imageFile: File, oldImageName: string, newImageName: string, docId: string) => {
  const res = await updateSocialNetwork(imageFile, oldImageName, newImageName, docId);
  return res;
};

export { GetAllTemplates, GetAllBackgroundImages, GetAllSocialNetworks, GetAllLogosImages, SaveSocialNetwork, DeleteSocialNetwork, UpdateSocialNetwork, GetTemplate, GetBackgroundImage };
