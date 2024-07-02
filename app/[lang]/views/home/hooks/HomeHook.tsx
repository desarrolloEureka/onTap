import { GetAllBackgroundImages, GetAllTemplates } from '@/reactQuery/home';
import { TabPanelProps } from '@/types/home';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetUser } from '@/reactQuery/users';
import { useRouter } from 'next/navigation';
import LogOut from '@/hooks/logOut/LogOut';

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, height: '100vh' }}>{children}</Box>}
    </div>
  );
}

const HomeHook = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [isProUser, setIsProUser] = useState(false);
  const [navigationItem, setNavigationItem] = useState(0);
  const { data, isLoading, error } = GetAllTemplates();
  const backgroundImages = GetAllBackgroundImages();
  const datUser = GetUser();
  const { logOut } = LogOut();

  const [isModalAlert, setIsModalAlert] = useState(false);
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);

  const [isAlertSaveModal, setIsAlertSaveModal] = useState(false);
  const [isChangeData, setIsChangeData] = useState(false);
  const handleModalSaveAlert = () => setIsAlertSaveModal(!isAlertSaveModal);
  const [isSubItemNav, setIsSubItemNav] = useState(null);
  const [isModalLogOut, setIsModalLogOut] = useState(false);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setNavigationItem(newValue);
    if (isChangeData) {
      setValue(newValue);
      //setIsAlertSaveModal(true);
    } else {
      //setIsAlertSaveModal(false);
      setIsChangeData(false);
      const plan = datUser?.data?.plan;
      if (plan === 'standard' && newValue === 2) {
        setIsModalAlert(!isModalAlert);
      } else {
        setValue(newValue);
      }
    }
  };

  /*   const handleNavigate = () => {
      setIsAlertSaveModal(false);
  
      if (isChangeData) {
        setTimeout(() => {
          if (isSubItemNav != null) {
            if (isSubItemNav === 1) {
              router.replace('/views/profileRecoverPassword');
            } else if (isSubItemNav === 2) {
              setIsModalLogOut(true);
            } else {
              logOut();
            }
            setIsSubItemNav(null);
            setIsChangeData(false);
          } else {
            setValue(navigationItem);
            setIsChangeData(false);
            setIsAlertSaveModal(false);
          }
        }, 1200);
      } else {
        if (isSubItemNav != null) {
          if (isSubItemNav === 1) {
            router.replace('/views/profileRecoverPassword');
          } else if (isSubItemNav === 2) {
            setIsModalLogOut(true);
          } else {
            logOut();
          }
          setIsSubItemNav(null);
          setIsChangeData(false);
        } else {
          setValue(navigationItem);
          setIsChangeData(false);
          setIsAlertSaveModal(false);
        }
      }
    }; */

  const handleNavigate = () => {
    setValue(navigationItem);
    setIsChangeData(false);
    setIsAlertSaveModal(false);
  };

  const handleAccept = () => {
    setIsAlertSaveModal(false);
    setIsChangeData(false);
    setValue(navigationItem);
  };


  useEffect(() => {
    value === 0 || value == 1 ? setIsProUser(false) : setIsProUser(true);
  }, [value]);

  return {
    handleChange,
    value,
    setIsProUser,
    isProUser,
    CustomTabPanel,
    templates: data,
    isLoadingTemplates: isLoading,
    backgroundImages,
    isModalAlert,
    setIsModalAlert,
    handleModalAlert,
    isAlertSaveModal,
    setIsAlertSaveModal,
    handleModalSaveAlert,
    isChangeData,
    setIsChangeData,
    handleAccept,
    handleNavigate,
    isSubItemNav,
    setIsSubItemNav,
    isModalLogOut,
    setIsModalLogOut
  };
};

export default HomeHook;