import {
  getAllBackgroundImages,
  getAllSocialNetworks,
  getAllTemplates,
} from '@/firebase/generals';
import { useQuery } from '@tanstack/react-query';

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

const GetAllSocialNetworks = () => {
  return useQuery({
    queryKey: ['social_networks'],
    queryFn: async () => await getAllSocialNetworks(),
    refetchOnWindowFocus: false,
  });
};

export { GetAllTemplates, GetAllBackgroundImages, GetAllSocialNetworks };
