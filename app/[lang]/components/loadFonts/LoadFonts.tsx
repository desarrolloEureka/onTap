'use client';
import React, { useState } from 'react';
import ItemForm from './hooks/ItemForm';
import ItemList from './hooks/ItemList';
import { Container, Typography } from '@mui/material';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Box } from '@mui/system';
import FontsTable from '../fontsTable/FontsTable';

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
            <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full'>
                <Container className='tw-bg-[#02AF9B] tw-shadow-m  tw-rounded-2xl tw-h-[500px] tw-w-[600px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                    <Typography
                        className='tw-text-white  tw-mt-9 tw-w-full tw-mb-6'
                        variant='h4'
                        color='textPrimary'
                        display={'flow'}
                        align='center'
                        fontWeight='bold'
                    >
                        {dictionary?.backOffice.LoadFonts}
                    </Typography>
                    <Box className='tw-w-[400px] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-4 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center '>
                        <Typography variant='h5' color='textPrimary' display={'flow'} align='center' fontWeight='bold'>
                            {dictionary?.backOffice.AddDesaign}
                        </Typography>
                        <ItemForm onAddItem={handleAddItem} dictionary={dictionary} />
                    </Box>
                </Container>
            </div>
            <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full'>
                <FontsTable />
            </div>
        </div>
    );
};

export default LoadFonts;
