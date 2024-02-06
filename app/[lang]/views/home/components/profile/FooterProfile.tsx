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
}: {
  handleModal: () => void;
  dictionary: Dictionary;
  handleDataSet: (e: DataForm) => void;
  dataForm: any;
}) => {
  const {
    handleSwitchAll,
    handleSendProfile,
    isDataSuccess,
    setIsDataSuccess,
    isDataError,
    setIsDataError,
  } = ProfileHook({
    dictionary,
    handleDataSet,
  });

  return (
    <div className='tw-h-[110px] tw-flex tw-items-center tw-justify-center '>
     {/*  <CustomModalAlert
        isModalAlert={isDataError}
        handleModalAlert={setIsDataError}
        title={dictionary?.generalTitle}
        description={dictionary.profileView.errorDataSend}
        isClosed
      />
      <CustomModalAlert
        isModalAlert={isDataSuccess}
        handleModalAlert={setIsDataSuccess}
        title={dictionary?.generalTitle}
        description={dictionary.profileView.successDataSend}
        isClosed
      /> */}

      <Container className='tw-h-[90%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>
        <div className=' tw-h-[80%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
          <div className=' tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
            <div className=' tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
              <span
                style={{
                  color: '#000000',
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                {dictionary.profileView.labelSwitchMain}
              </span>
            </div>
            <div className=' tw-h-[70%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
              <CustomSwitchGeneral
                name='all_true'
                handleSwitch={(e: any) => handleSwitchAll(e)}
              />
            </div>
          </div>
        </div>
        <div className=' tw-h-[80%] tw-w-[50%] tw-flex  tw-items-end tw-justify-end '>
        {/*   <div className='tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
            <Button
              className='tw-w-[90%] tw-h-[45px]'
              onClick={handleSendProfile}
              color='secondary'
              size='medium'
              startIcon={
                <SaveOutlinedIcon
                  style={{
                    color: '#02AF9B',
                    fontSize: '1.6em',
                    marginLeft: '0rem',
                  }}
                />
              }
            >
              <span
                style={{
                  color: '#030124 ',
                  fontSize: '0.9rem',
                  textTransform: 'none',
                }}
              >
                {dictionary.homeView.saveButtonLabel}
              </span>
            </Button>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default FooterProfile;