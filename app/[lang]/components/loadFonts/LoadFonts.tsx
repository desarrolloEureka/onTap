'use client';
import React, { useState } from 'react';
import ItemForm from './hooks/ItemForm';
import ItemList from './hooks/ItemList';
import { Container } from '@mui/material';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';

type Item = {
    id: number;
    name: string;
    image: string;
};

const LoadFonts = ({ params: { lang } }: { params: { lang: Locale } }) => {
    const { dictionary } = useDictionary({ lang });
    const [items, setItems] = useState<Array<Item>>([]);

    const handleAddItem = (newItem: { name: string; image: string }) => {
        setItems([...items, { id: items.length + 1, ...newItem }]);
    };
    return (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <Container className='tw-bg-[#02AF9B] tw-shadow-m  tw-rounded-2xl tw-h-[700px] tw-w-[794px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                <h1 className='tw-text-4xl tw-font-bold tw-mb-8'> {dictionary?.backOffice.CRUD} </h1>
                <div className='tw-mb-4'>
                    <ItemForm onAddItem={handleAddItem} dictionary={dictionary} />
                </div>
                <div className='tw-mb-4'>
                    <ItemList items={items} />
                </div>
            </Container>
        </div>
    );
};

export default LoadFonts;
