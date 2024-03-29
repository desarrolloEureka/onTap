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
import CardViewUserMobile from './hooks/CardViewUserMobile';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = useDictionary({ lang })!.dictionary as Dictionary;
  const [isModalAlert, setIsModalAlert] = useState(true);
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const typeParam = searchParams.get('type');
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);

  const { user, type } = uid && typeParam ?
    CardViewUserMobile({ userUid: uid, typeParam: typeParam })
    :
    uid ?
      CardViewHookWithUser({ userUid: uid })
      :
      CardViewWhitOutUser(typeParam);

  return user && type ? (
    user.switch_activateCard ? (
      <TemplateSelector user={user} type={type} lang={lang} />
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
