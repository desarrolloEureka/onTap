import { GetUser } from "@/reactQuery/users";

const FirstView = () => {
    const datUser = GetUser();
    const userName = datUser?.data?.name;

    return (
        <div className='tw-flex tw-flex-col tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className='-tw-mt-48'>
                {userName ? (
                    <>
                        <h3 className="tw-text-7xl tw-text-[#02AF9B] text-center">
                            Bienvenido, {userName}
                        </h3>
                        <h3 className="tw-text-7xl tw-text-[#02AF9B] text-center">
                            al BackOffice de One Tap
                        </h3>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default FirstView;
