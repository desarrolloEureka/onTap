'use client';
import { Locale } from 'i18n-config';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import CardViewWhitOutUser from './hooks/CardViewWhitOutUser';
import CardViewHookWithUser from './hooks/CardViewHookWithUser';
import TemplateSelector from '../templateSelector/TemplateSelector';
import CustomCircularProgress from '@/components/customCircularProgress/CustomCircularProgress';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const [isModalAlert, setIsModalAlert] = useState(true);
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const type = searchParams.get('type');
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);

  const { user } = uid
    ? CardViewHookWithUser({ userUid: uid })
    : CardViewWhitOutUser();

  return user && type ? (
    user.switch_activateCard ? (
      <TemplateSelector user={user} type={type} />
    ) : (
      <CustomModalAlert
        handleModalAlert={handleModalAlert}
        title='Error'
        description='El usuario no comparte su información en estos momentos'
        isModalAlert={isModalAlert}
      />
    )
  ) : (
    <CustomCircularProgress isOpen />
  );
};

export default Page;

// spanish traduce
