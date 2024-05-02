'use client';
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import LogosTableLogic from './hooks/LogosTableLogic';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogosForm from './hooks/LogosForm';
import { deleteSocialNetwork } from '@/firebase/generals';
import ModalDelete from './hooks/ModalDelete';
import CustomModalAlert from '../customModalAlert/CustomModalAlert';
import ModalEditLogo from './hooks/ModalEditLogo';
import { DeleteSocialNetwork } from '@/reactQuery/home';

const LoadFonts = ({ params: { lang } }: { params: { lang: Locale } }) => {
    const { dictionary } = useDictionary({ lang });
    const { data,
        flag,
        setFlag,
        isModalDelete,
        setIsModalDelete,
        closeModalDelete,
        itemDelte,
        setItemDelete,
        isModalSuccessDelete,
        setIsModalSuccessDelete,
        isModalFailDelete,
        setIsModalFailDelete,
        isModalEdit,
        setIsModalEdit,
        itemEdit,
        setItemEdit,
        isModalSuccessEdit,
        setIsModalSuccessEdit,
        isModalFailEdit,
        setIsModalFailEdit
    } = LogosTableLogic();

    const handleModalLogo = (dataLogo: any) => {
        setItemDelete(dataLogo);
        setIsModalDelete(true);
    };

    const handleDeleteLogo = async (dataLogo: any) => {
        const result = await DeleteSocialNetwork(dataLogo.name, dataLogo.id);
        if (result === true) {
            setIsModalDelete(false);
            setIsModalSuccessDelete(true);
            setFlag(!flag);
        } else {
            setIsModalDelete(false);
            setIsModalFailDelete(true);
        }
    };

    const handleEditLogo = async (dataLogo: any) => {
        setItemEdit(dataLogo);
        setIsModalEdit(true);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nombre del Logo', width: 130 },
        {
            field: 'image', headerName: 'Imagen', width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Image src={`${params.value}`} alt="image" width={55} height={55} />
            )
        },
        {
            field: 'optionEdit', headerName: 'Editar', width: 130,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button style={{ color: 'black' }} onClick={() => handleEditLogo(params?.value)}>
                    <EditIcon />
                </Button>
            )
        },
        {
            field: 'optionDelete', headerName: 'Eliminar', width: 130,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button style={{ color: 'black' }} onClick={() => handleModalLogo(params?.value)}>
                    <DeleteIcon />
                </Button>
            )
        },
    ];

    return (
        <div className='tw-flex  tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")]  tw-flex-col tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className='tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full'>
                <Container className='tw-bg-[#02AF9B] tw-shadow-m tw-mt-6   tw-rounded-2xl tw-h-[350px] tw-w-[580px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                    <Typography
                        className='tw-text-white  tw-mt-9 tw-w-full tw-mb-6'
                        variant='h4'
                        color='textPrimary'
                        display={'flow'}
                        align='center'
                        fontWeight='bold'
                    >
                        {dictionary?.backOffice.logosTitle}
                    </Typography>
                    <Box className='tw-w-[400px] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-4 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center '>
                        <LogosForm dictionary={dictionary} flag={flag} setFlag={setFlag} />
                    </Box>
                </Container>
            </div>
            <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-[630px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                <div style={{ height: 700, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0'>
                    <DataGrid
                        rows={data ?? []}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 15 },
                            },
                        }}
                        pageSizeOptions={[15, 30, 60]}
                        rowHeight={75}
                        checkboxSelection
                        className="tw-rounded-2xl"

                    />
                </div>
            </div>

            <ModalEditLogo
                isModalAlert={isModalEdit}
                handleModalAlert={setIsModalEdit}
                dataLogo={itemEdit}
                handleSaveData={handleDeleteLogo}
                dictionary={dictionary?.backOffice}
                setFlag={setFlag}
                flag={flag}
                setIsModalSuccessEdit={setIsModalSuccessEdit}
                setIsModalFailEdit={setIsModalFailEdit}
            />

            <ModalDelete
                isModalAlert={isModalDelete}
                handleModalAlert={closeModalDelete}
                itemDelete={itemDelte}
                handleDeleteData={handleDeleteLogo}
                dictionary={dictionary?.backOffice}
            />

            <CustomModalAlert
                isModalAlert={isModalSuccessDelete}
                handleModalAlert={setIsModalSuccessDelete}
                title={dictionary?.generalTitle || ''}
                description={dictionary?.backOffice.labelSuccessDelete || ''}
                isClosed
            />

            <CustomModalAlert
                isModalAlert={isModalFailDelete}
                handleModalAlert={setIsModalFailDelete}
                title={dictionary?.generalTitle || ''}
                description={dictionary?.backOffice.labelFailDelete || ''}
                isClosed
            />

            <CustomModalAlert
                isModalAlert={isModalSuccessEdit}
                handleModalAlert={setIsModalSuccessEdit}
                title={dictionary?.generalTitle || ''}
                description={dictionary?.backOffice.labelSuccessEdit || ''}
                isClosed
            />

            <CustomModalAlert
                isModalAlert={isModalFailEdit}
                handleModalAlert={setIsModalFailEdit}
                title={dictionary?.generalTitle || ''}
                description={dictionary?.backOffice.labelFailEdit || ''}
                isClosed
            />

        </div>
    );
};

export default LoadFonts;