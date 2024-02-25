import { GetAllBackgroundImages } from '@/reactQuery/home';
import { useEffect } from 'react';

const FontsTableLogic = () => {
  const usersDataSanpShot = GetAllBackgroundImages();
  const data = usersDataSanpShot.data;
  useEffect(() => {}, [usersDataSanpShot.data]);
  return { data };
};

export default FontsTableLogic;
