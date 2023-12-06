import { Dictionary } from '@/types/dictionary';
import { getDictionary } from '@/types/getDictionary';
import { Locale } from 'i18n-config';
import { useCallback, useEffect, useState } from 'react';

const useDictionary = ({ lang }: { lang: Locale }) => {
  const [dictionary, setDictionary] = useState<Dictionary>();

  const dictionaryHandle = useCallback(async () => {
    const dict = await getDictionary(lang);
    setDictionary(dict);
  }, [lang]);

  useEffect(() => {
    !dictionary && dictionaryHandle();
  }, [dictionary, dictionaryHandle]);

  return { dictionary };
};

export default useDictionary;
