import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logOut = async () => {
    // Elimina todas las queries almacenadas
    await queryClient.clear();
    await queryClient.invalidateQueries({ queryKey: ['user'] });
    await queryClient.resetQueries({ queryKey: ['user'] });

    // Limpia localStorage y sessionStorage
    await localStorage.removeItem('@user');
    await localStorage.clear();
    await sessionStorage.clear();

    // Limpia cookies si es necesario
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Redirigir a la página de login
    router.replace('/views/login');
  };

  return { logOut };
};

export default useLogOut;
