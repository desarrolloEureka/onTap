import { Dictionary } from '@/types/dictionary';
import FooterProfile from '@/views/profile/components/FooterProfile';
import FormAddDataUser from '@/views/profile/components/FormAddDataUser';
import FormDataUser from '@/views/profile/components/FormDataUser';
import ModalProfile from '@/views/profile/components/ModalProfile';
import PhotoUser from '@/views/profile/components/PhotoUser';
import { Container } from '@mui/material';
import React, { useState } from 'react';

const Profile = ({
  dictionary,
  isProUser,
}: {
  dictionary: Dictionary;
  isProUser: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(0);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSeeMore = (numItem: number) => {
    if (isDetailOpen === true) {
      setIsDetailOpen(false);
      setItemDetail(0);
    }
    setIsDetailOpen(true);
    setItemDetail(numItem);
  };
  return (
    <div>
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
        <PhotoUser dictionary={dictionary} />
        <div
          className={`tw-flex tw-items-center tw-justify-center ${
            isProUser ? 'tw-h-[1500px]' : 'tw-h-[550px]'
          }`}
        >
          <Container className='tw-bg-white tw-shadow-md tw-rounded-2xl tw-h-[90%] tw-w-[85%] tw-flex tw-items-start tw-justify-center'>
            <FormDataUser dictionary={dictionary} isProUser={isProUser} />

            <FormAddDataUser
              isDetailOpen={isDetailOpen}
              itemDetail={itemDetail}
              handleSeeMore={handleSeeMore}
              dictionary={dictionary}
              isProUser={isProUser}
            />
          </Container>
        </div>

        <FooterProfile handleModal={handleModal} dictionary={dictionary} />
      </div>

      <ModalProfile
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        dictionary={dictionary}
      />
    </div>
  );
};

export default Profile;
