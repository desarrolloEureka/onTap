'use client';
import { Locale } from 'i18n-config';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import CardViewWhitOutUser from './hooks/CardViewWhitOutUser';
import CardViewHookWithUser from './hooks/CardViewHookWithUser';
import TemplateSelector from '../templateSelector/TemplateSelector';
import CustomCircularProgress from '@/components/customCircularProgress/CustomCircularProgress';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Dictionary } from '@/types/dictionary';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = useDictionary({ lang })!.dictionary as Dictionary;
  const [isModalAlert, setIsModalAlert] = useState(true);
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const typeParam = searchParams.get('type');
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);

  const { user, type } = uid
    ? CardViewHookWithUser({ userUid: uid })
    : CardViewWhitOutUser(typeParam);

  return user && type ? (
    user.switch_activateCard ? (
      <TemplateSelector user={user} type={type} />
    ) : (
      <CustomModalAlert
        handleModalAlert={handleModalAlert}
        title={dictionary?.cardView?.labelErrorUser}
        description={dictionary?.cardView?.labelErrorUserDescription}
        isModalAlert={isModalAlert}
      />
    )
  ) : (
    <CustomCircularProgress isOpen />
  );
};

export default Page;

// spanish traduce
