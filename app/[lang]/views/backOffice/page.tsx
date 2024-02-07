'use client';
import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { Button } from '@mui/material';
import LogOut from '@/hooks/logOut/LogOut';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';

type Item = {
  id: number;
  name: string;
  image: string;
};

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const [items, setItems] = useState<Array<Item>>([]);
  const { logOut } = LogOut();
  const handleAddItem = (newItem: { name: string; image: string }) => {
    setItems([...items, { id: items.length + 1, ...newItem }]);
  };
  return (
    <div className='tw-container tw-mx-auto tw-p-4'>
      <h1 className='tw-text-4xl tw-font-bold tw-mb-8'> CRUD </h1>
      <ItemForm onAddItem={handleAddItem} dictionary={dictionary} />
      <ItemList items={items} />
      <Button onClick={logOut}>{dictionary?.logOut}</Button>
    </div>
  );
};

export default Page;
