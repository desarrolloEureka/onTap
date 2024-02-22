import { Dictionary } from '@/types/dictionary';
import { DataForm } from '@/types/profile';
import FormDataUser from '@/views/home/components/form/FormDataUser';
import FooterProfile from '@/views/home/components/profile/FooterProfile';
import FormAddDataUser from '@/views/home/components/profile/FormAddDataUser';
import ModalProfile from '@/views/home/components/profile/ModalProfile';
import ModalSuccessDelete from '@/views/home/components/profile/ModalSuccessDelete';
import PhotoUser from '@/views/home/components/profile/PhotoUser';
import { Container } from '@mui/material';
import ProfileHook from './hooks/ProfileHook';
import ModalAlert from './ModalAlert';

const Profile = ({
  dictionary,
  isProUser,
}: {
  dictionary: Dictionary;
  isProUser: boolean;
}) => {
  // console.log('isProUser>>>>>>>>>>', isProUser);
  const {
    handleModal,
    handleModalAlert,
    handleSeeMore,
    handleDeleteData,
    isDetailOpen,
    itemDetail,
    isModalOpen,
    isModalAlert,
    handleModalAux,
    dataForm,
    setDataForm,
    isSuccessDelete,
    handleSuccessDelete,
    handleSendProfile,
    noDeleted,
    data,
  } = ProfileHook({
    dictionary,
    isProUser,
  });

  const handleDataSet = (data: DataForm) => {
    setDataForm(data);
  };

  // console.log('dataForm ____ Profile', dataForm);

  return (
    <div>
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
        <PhotoUser
          dictionary={dictionary}
          handleDataSet={(e) => handleDataSet(e)}
          isProUser={isProUser}
        />
        <div
          className={`tw-flex tw-items-start tw-justify-center ${
            isProUser
              ? 'lg:tw-h-auto md:tw-w-[100%]'
              : 'lg:tw-h-[930px] md:tw-w-[100%]'
          }`}
        >
          <Container className='tw-bg-white tw-shadow-md tw-rounded-2xl tw-h-[98%] tw-w-[85%] md:tw-flex tw-items-start tw-justify-center'>
            <FormDataUser
              dictionary={dictionary}
              isProUser={isProUser}
              dataForm={dataForm}
              handleDataSet={(e) => handleDataSet(e)}
              data={data}
            />
            <FormAddDataUser
              dictionary={dictionary}
              isProUser={isProUser}
              dataForm={dataForm}
              handleDataSet={(e) => handleDataSet(e)}
              isDetailOpen={isDetailOpen}
              itemDetail={itemDetail}
              handleSeeMore={handleSeeMore}
              handleModalAlert={({ index, subindex }) =>
                handleModalAlert({ index, subindex })
              }
              data={data}
            />
          </Container>
        </div>
        <FooterProfile
          handleModal={handleModal}
          dictionary={dictionary}
          dataForm={dataForm}
          handleDataSet={(e) => handleDataSet(e)}
          isProUser={isProUser}
        />
      </div>

      <ModalProfile
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        dictionary={dictionary}
      />
      <ModalAlert
        isModalAlert={isModalAlert}
        handleModalAlert={handleModalAux}
        dictionary={dictionary}
        handleDeleteData={handleDeleteData}
        noDeleted={noDeleted}
      />
      <ModalSuccessDelete
        isSuccessDelete={isSuccessDelete}
        handleSuccessDelete={handleSuccessDelete}
        dictionary={dictionary}
      />
    </div>
  );
};

export default Profile;
