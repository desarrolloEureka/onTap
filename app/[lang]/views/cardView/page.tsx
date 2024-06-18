'use client';
import { Locale } from 'i18n-config';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import CardViewWhitOutUser from './hooks/CardViewWhitOutUser';
import CardViewHookWithUser from './hooks/CardViewHookWithUser';
import TemplateSelector from '../templateSelector/TemplateSelector';
import CustomCircularProgress from '@/components/customCircularProgress/CustomCircularProgress';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Dictionary } from '@/types/dictionary';
import CardViewUserMobile from './hooks/CardViewUserMobile';
import platform from 'platform';
import { SendDataMetrics } from '@/reactQuery/users';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = useDictionary({ lang })!.dictionary as Dictionary;
  const [isModalAlert, setIsModalAlert] = useState(true);
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const typeParam = searchParams.get('type');
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);
  const [ipAddress, setIpAddress] = useState(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [so, setSO] = useState<string | null>('');
  const [typeDevice, setTypeDevice] = useState<string | null>('');
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const { user, type } = uid && typeParam ?
    CardViewUserMobile({ userUid: uid, typeParam: typeParam })/* Abrir desde el WebView del cel */
    :
    uid ?
      CardViewHookWithUser({ userUid: uid })/* Cuando comparto mi url */
      :
      CardViewWhitOutUser(typeParam);/*  Abrir desde la parte web */

  useEffect(() => {
    if (ipAddress && city && country && currentDate && currentTime && uid) {
      const dataSend = {
        viewsDate: currentDate,
        viewsTime: currentTime,
        ipAddress: ipAddress,
        so: so,
        typeDevice: typeDevice,
        cityView: city,
        countryView: country
      }
      SendDataMetrics(uid, dataSend);
    }
  }, [ipAddress, city, country, currentDate, currentTime, so, typeDevice, uid]);

  useEffect(() => { /// hacerlo con google - geocode (google)
    // Obtener la IP Pública
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
        // Obtener información de geolocalización basada en la dirección IP
        fetch(`https://ip-api.com/json/${data.ip}`)
          .then(response => response.json())
          .then(locationData => {
            setCity(locationData.city || 'No disponible');
            setCountry(locationData.country || 'No disponible');
          })
          .catch(error => {
            console.error('Error al obtener la información de geolocalización:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener la IP:', error);
      });

    // Obtener la Información del Dispositivo
    const platformInfo = platform.parse(navigator.userAgent);
    setSO(platformInfo.os?.family || 'No disponible');
    setTypeDevice(platformInfo.product || 'No disponible');

    // Obtener la Fecha y Hora Actual
    const now = new Date();
    setCurrentDate(now.toLocaleDateString());
    setCurrentTime(now.toLocaleTimeString());
  }, []);

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