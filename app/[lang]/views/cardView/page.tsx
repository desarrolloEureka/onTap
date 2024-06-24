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
  const [ipAddress, setIpAddress] = useState('');
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
      //console.log('dataSend ', dataSend);
      SendDataMetrics(uid, dataSend);
    }
  }, [ipAddress, city, country, currentDate, currentTime, so, typeDevice, uid]);

  useEffect(() => {
    const fetchIpAndLocation = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        setIpAddress(ipData.ip);
      } catch (error) {
        //console.error('Error al obtener la IP:', error);
        setIpAddress('No disponible');
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const googleApiKey = 'AIzaSyAThTZvE3UaSio6WOSoYYegWjgXoTPSaaE';
          try {
            const locationResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`);
            const locationData = await locationResponse.json();

            if (locationData.status === 'OK') {
              const result = locationData.results[0];
              const cityComponent = result.address_components.find((component: { types: string[] }) => component.types.includes('locality'));
              const countryComponent = result.address_components.find((component: { types: string[] }) => component.types.includes('country'));

              setCity(cityComponent?.long_name || 'No disponible');
              setCountry(countryComponent?.long_name || 'No disponible');
            } else {
              //console.error('Error en la respuesta de la API de Google:', locationData.status);
              setCity('No disponible');
              setCountry('No disponible');
            }
          } catch (error) {
            //console.error('Error al obtener la ubicación:', error);
            setCity('No disponible');
            setCountry('No disponible');
          }
        }, (error) => {
          //console.error('Error al obtener la geolocalización:', error);
          setCity('No disponible');
          setCountry('No disponible');
        });
      } else {
        //console.error('La geolocalización no es soportada por este navegador.');
        setCity('No disponible');
        setCountry('No disponible');
      }
    };

    const fetchDeviceInfo = () => {
      try {
        const platformInfo = platform.parse(navigator.userAgent);
        setSO(platformInfo.os?.family || 'No disponible');
        setTypeDevice(platformInfo.product || 'No disponible');
      } catch (error) {
        //console.error('Error al obtener la información del dispositivo:', error);
        setSO('No disponible');
        setTypeDevice('No disponible');
      }
    };

    const fetchCurrentDateTime = () => {
      try {
        const now = new Date();
        setCurrentDate(now.toLocaleDateString());
        setCurrentTime(now.toLocaleTimeString());
      } catch (error) {
        //console.error('Error al obtener la fecha y hora actuales:', error);
        setCurrentDate('No disponible');
        setCurrentTime('No disponible');
      }
    };

    fetchIpAndLocation();
    fetchDeviceInfo();
    fetchCurrentDateTime();
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