'use client';
import { useState } from 'react';
import Head from 'next/head';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
type Item = {
  id: number;
  name: string;
  image: string;
};

export default function Home() {
  const [items, setItems] = useState<Array<Item>>([]);

  const handleAddItem = (newItem: { name: string; image: string }) => {
    setItems([...items, { id: items.length + 1, ...newItem }]);
  };

  return (
    <div className='tw-container tw-mx-auto tw-p-4'>
      <Head>
        <title> CRUD </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className='tw-text-4xl tw-font-bold tw-mb-8'> CRUD </h1>

      <ItemForm onAddItem={handleAddItem} />
      <ItemList items={items} />
    </div>
  );
}
