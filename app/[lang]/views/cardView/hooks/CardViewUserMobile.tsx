import { useEffect, useState } from 'react';
import { GetUserById } from '@/reactQuery/users';

const CardViewUserMobile = ({ userUid, typeParam }: { userUid: string, typeParam: string }) => {
    const { data } = GetUserById(userUid);
    const [type, setType] = useState<string | undefined>();

    useEffect(() => {
        if (data) {
            setType(typeParam);
        }
    }, [data, typeParam]);

    return { user: data, type };
};

export default CardViewUserMobile;