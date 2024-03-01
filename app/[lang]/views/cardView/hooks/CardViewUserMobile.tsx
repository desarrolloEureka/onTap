import { useEffect, useState } from 'react';
import { GetUserById, SendViewUser } from '@/reactQuery/users';

const CardViewUserMobile = ({ userUid, typeParam }: { userUid: string, typeParam: string }) => {
    const { data } = GetUserById(userUid);
    const [type, setType] = useState<string | undefined>();

    useEffect(() => {
        if (data) {
            setType(typeParam);
            if (data && data.switch_activateCard) {
                const viewsNow = data.views;
                const viewsNew = viewsNow + 1;
                const userId = data?.uid;
                if (userId) {
                    SendViewUser(userId, viewsNew);
                }
            }
        }
    }, [data, typeParam]);

    return { user: data, type };
};

export default CardViewUserMobile;
