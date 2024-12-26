import { useQueryClient } from '@tanstack/react-query';
import { profile } from 'app/[lang]/initialData/profileInitialData';
import { useRouter } from 'next/navigation';

const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logOut = async () => {

    profile.social = {
      name: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: false,
        icon: 'PersonOutlinedIcon',
        order: 1,
      },
      last_name: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: false,
        icon: 'PersonOutlinedIcon',
        order: 2,
      },
      profession: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: false,
        icon: 'FilePresentOutlinedIcon',
        order: 3,
      },
      occupation: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: false,
        icon: 'WorkOutlineOutlinedIcon',
        order: 4,
      },
      address: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: false,
        icon: 'ExploreOutlinedIcon',
        order: 5,
      },
      phones: [{
        label: '',
        text: '',
        checked: false,
        principal: true,
        social: true,
        professional: false,
        icon: 'LocalPhoneOutlinedIcon',
        order: 9,
      }],
      emails: [{
        label: '',
        text: '',
        checked: false,
        principal: true,
        social: true,
        professional: false,
        icon: 'EmailOutlinedIcon',
        order: 10,
      }],
      urls: [{
        label: '',
        name: '',
        url: '',
        icon: '',
        checked: false,
        principal: true,
        social: false,
        professional: false,
        order: 13,
      }],
    }

    profile.professional = {
      name: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: true,
        icon: 'PersonOutlinedIcon',
        order: 1,
      },
      last_name: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: true,
        icon: 'PersonOutlinedIcon',
        order: 2,
      },
      profession: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: true,
        icon: 'FilePresentOutlinedIcon',
        order: 3,
      },
      occupation: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: true,
        icon: 'WorkOutlineOutlinedIcon',
        order: 4,
      },
      address: {
        label: '',
        text: '',
        checked: false,
        social: true,
        professional: true,
        icon: 'ExploreOutlinedIcon',
        order: 5,
      },
      company: {
        label: '',
        text: '',
        checked: false,
        social: false,
        professional: true,
        icon: 'WorkOutlineOutlinedIcon',
        order: 6,
      },
      position: {
        label: '',
        text: '',
        checked: false,
        social: false,
        professional: true,
        icon: 'AttachFileOutlinedIcon',
        order: 7,
      },
      professional_profile: {
        label: '',
        text: '',
        checked: false,
        social: false,
        professional: true,
        icon: 'PersonOutlinedIcon',
        order: 8,
      },
      other_competencies: {
        label: '',
        text: '',
        checked: false,
        social: false,
        professional: true,
        icon: 'AccessibilityOutlinedIcon',
        order: 14,
      },
      skills: {
        label: '',
        text: '',
        checked: false,
        social: false,
        professional: true,
        icon: 'PersonOutlinedIcon',
        order: 15,
      },
      languages: {
        label: '',
        text: '',
        checked: false,
        social: false,
        professional: true,
        icon: 'TranslateIcon',
        order: 16,
      },
      achievements_recognitions: {
        label: '',
        text: '',
        checked: false,
        social: false,
        professional: true,
        icon: 'AccessibilityOutlinedIcon',
        order: 17,
      },
      phones: [{
        label: '',
        text: '',
        checked: false,
        principal: true,
        social: false,
        professional: true,
        icon: 'LocalPhoneOutlinedIcon',
        order: 9,
      }],
      emails: [{
        label: '',
        text: '',
        checked: false,
        principal: true,
        social: false,
        professional: true,
        icon: 'EmailOutlinedIcon',
        order: 10,
      }],
      education: [{
        label: '',
        title: '',
        institution: '',
        year: '',
        checked: false,
        principal: true,
        social: false,
        professional: true,
        icon: '',
        order: 11,
      }],
      professional_career: [{
        label: '',
        company: '',
        position: '',
        data_init: '',
        data_end: '',
        checked: false,
        principal: true,
        social: false,
        professional: true,
        icon: '',
        order: 12,
      }],
      urls: [{
        label: '',
        name: '',
        url: '',
        icon: '',
        checked: false,
        principal: true,
        social: false,
        professional: true,
        order: 13,
      }],
    }

    // Elimina todas las queries almacenadas
    await queryClient.clear();
    await queryClient.invalidateQueries({ queryKey: ['user'] });
    await queryClient.resetQueries({ queryKey: ['user'] });
    queryClient.removeQueries();

    // Limpia localStorage y sessionStorage
    await localStorage.removeItem('@user');
    await localStorage.removeItem('isDistributor');
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
