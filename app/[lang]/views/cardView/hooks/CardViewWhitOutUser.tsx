import { GetUser } from '@/reactQuery/users';
import React from 'react';

const CardViewWhitOutUser = () => {
  const { data } = GetUser();
  return { user: data };
};

export default CardViewWhitOutUser;
