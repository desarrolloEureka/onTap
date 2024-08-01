import { GetAllLogosImages } from '@/reactQuery/home';
import { useEffect, useState } from 'react';

const LogosTableLogic = () => {
    const [query, setQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    //Modal Delete
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [isModalSuccessDelete, setIsModalSuccessDelete] = useState(false);
    const [isModalFailDelete, setIsModalFailDelete] = useState(false);
    const [itemDelte, setItemDelete] = useState(null);
    //Modal Edit
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const [isModalSuccessEdit, setIsModalSuccessEdit] = useState(false);
    const [isModalFailEdit, setIsModalFailEdit] = useState(false);

    const { data } = GetAllLogosImages(flag);

    const closeModalDelete = () => {
        setIsModalDelete(false);
    }

    useEffect(() => {
        if (data) {
            const formattedData = data.map(doc => (
                {
                    id: doc.id,
                    name: doc.name,
                    image: doc.image,
                    optionEdit: doc,
                    optionDelete: doc,
                }));
            setQuery(formattedData);
        }
    }, [data]);

    return {
        data: query,
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
    };
};

export default LogosTableLogic;