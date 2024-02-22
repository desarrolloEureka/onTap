'use client';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { Dictionary } from '@/types/dictionary';
import { DataForm } from '@/types/profile';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Button, Container } from '@mui/material';
import ProfileHook from './hooks/ProfileHook';

const FooterProfile = ({
  handleModal,
  dictionary,
  dataForm,
  handleDataSet,
  isProUser,
}: {
  handleModal: () => void;
  dictionary: Dictionary;
  handleDataSet: (e: DataForm) => void;
  dataForm: any;
  isProUser: boolean;
}) => {
  const {
    handleSwitchAll,
    handleSendProfile,
    isDataSuccess,
    setIsDataSuccess,
    isDataError,
    setIsDataError,
    status,
    isEmailPhoneRight,
    setisEmailPhoneRight,
  } = ProfileHook({
    dictionary,
    handleDataSet,
    isProUser,
  });

  return (
    <div className='tw-h-[110px] tw-flex tw-items-center tw-justify-center'>
      <CustomModalAlert
        isModalAlert={isDataError}
        handleModalAlert={setIsDataError}
        title={dictionary?.generalTitle}
        description={dictionary.profileView.errorDataSend}
        isClosed
      />
      <CustomModalAlert
        isModalAlert={isEmailPhoneRight}
        handleModalAlert={setisEmailPhoneRight}
        title={dictionary?.generalTitle}
        description={status}
        isClosed
      />
      <CustomModalAlert
        isModalAlert={isDataSuccess}
        handleModalAlert={setIsDataSuccess}
        title={dictionary?.generalTitle}
        description={dictionary.profileView.successDataSend}
        isClosed
      />

      <Container className='tw-h-[90%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>
        <div className=' tw-h-[100%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
          <div className=' tw-h-[100%] tw-w-[80%] tw-flex tw-flex-row tw-items-center tw-justify-center'>
            <div className=' tw-h-[100%] max-sm:tw-w-[50%] tw-w-[20%] tw-flex tw-items-center tw-justify-center tw-pt-3 max-md:tw-mr-2'>
              <CustomSwitchGeneral
                name='all_true'
                handleSwitch={(e: any) => handleSwitchAll(e)}
              />
            </div>

            <div className=' tw-h-[100%] max-sm:tw-w-[70%] tw-w-[80%] tw-flex tw-items-center tw-justify-start'>
              <span
                style={{
                  color: '#030124',
                  fontSize: '1rem',
                  textTransform: 'none',
                }}
              >
                {dictionary.profileView.labelSwitchMain}
              </span>
            </div>
          </div>
        </div>
        <div className=' tw-h-[80%] tw-w-[50%] tw-flex  tw-items-end tw-justify-end '>
          <div className='tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
            <Button
              className='tw-w-[90%] tw-h-[45px]'
              onClick={() => handleSendProfile(isProUser)}
              color='secondary'
              size='medium'
              startIcon={
                <SaveOutlinedIcon
                  style={{
                    color: '#02AF9B',
                    fontSize: '1.8rem',
                    marginLeft: '0rem',
                  }}
                />
              }
            >
              <span
                style={{
                  color: '#030124 ',
                  fontSize: '1.2rem',
                  textTransform: 'none',
                }}
              >
                {dictionary.homeView.saveButtonLabel}
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterProfile;
