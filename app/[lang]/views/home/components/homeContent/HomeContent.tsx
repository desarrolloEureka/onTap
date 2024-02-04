import CustomCheckbox from '@/components/customCheckbox/CustomCheckbox';
import {
  GetUser,
  SendBackgroundSelected,
  SendTemplateSelected,
} from '@/reactQuery/users';
import { Dictionary } from '@/types/dictionary';
import { BackgroundImages, TemplateTypes, Templates } from '@/types/home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Checkbox, Grid, Modal, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonTab from '../buttonTab/ButtonTab';
import Header from '../header/Header';
import { TemplateData } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

interface BackgroundType {
  id: string;
  name: string;
  image: string;
}
interface TemplateType {
  id: string;
  name: string;
  image: string;
}

const HomeContent = ({
  dictionary,
  templates,
  backgroundImages,
}: {
  dictionary: Dictionary;
  templates: Templates[];
  backgroundImages: BackgroundImages[];
}) => {
  const queryClient = useQueryClient();
  const [optionSelected, setOptionSelected] = useState<TemplateTypes>('social');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundSelect, setBackgroundSelect] = useState<{ id: string }>();
  const [selectedTemplate, setSelectedTemplate] = useState<string>();
  const [templateSelect, setTemplateSelect] = useState<TemplateType>({
    id: '',
    name: '',
    image: '',
  });
  const { data, error } = GetUser();
  const router = useRouter();

  const handleChangeOption = (option: TemplateTypes) => {
    setOptionSelected(option);
  };

  const handleModal = (item?: Templates) => {
    item && setSelectedTemplate(item.id);
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectBackground = (item: BackgroundType) => {
    const data = {
      id: item.id,
    };
    setBackgroundSelect(data);
  };

  const handleSaveTemplate = async () => {
    const userId = data?.uid;
    const templateData = data?.templateData;
    if (backgroundSelect && userId) {
      const newData = templateData?.map((val) => {
        val.id === selectedTemplate &&
          (val.background_id = backgroundSelect.id);
        return val;
      });
      newData &&
        (await SendTemplateSelected(userId, newData, queryClient).then(() => {
          handleModal();
        }));
    }
  };

  const handlePreview = async (id: string) => {
    const urlSplit = window.location.href.split('/');
    window.open(
      `http://${urlSplit[2]}/es/views/cardView?uid=${data?.uid}&type=${optionSelected}`
    );
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isSmallScreenHeight = useMediaQuery('(max-height: 890px)');
  const screenHeight = useMediaQuery('(max-height: 745px)');
  const isLargeScreen = useMediaQuery('(max-width:600px)');

  return (
    dictionary && (
      <div
        className={`tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center ${
          screenHeight ? '' : 'md:tw-h-screen'
        }`}
      >
        <Header dictionary={dictionary} views={data?.views ?? 0} />
        <div
          className='tw-h-[60px] tw-flex'
          style={{ borderBottom: '1px solid #C2C2C2' }}
        >
          <ButtonTab
            dictionary={dictionary}
            index={'social'}
            optionSelected={optionSelected}
            title={dictionary?.homeView?.social}
            handleChangeOption={handleChangeOption}
          />
          <ButtonTab
            dictionary={dictionary}
            index={'professional'}
            optionSelected={optionSelected}
            title={dictionary?.homeView?.professional}
            handleChangeOption={handleChangeOption}
          />
        </div>

        <div className='tw-flex tw-items-center tw-justify-center'>
          <div className='tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-w-[1300px] xl:tw-w-[1250px]'>
            {templates.map((value, index) => {
              if (value.type === optionSelected) {
                const i: any = value.id;
                const item = data?.templateData?.find((val) => val.id === i);
                return (
                  <div
                    key={index}
                    className={`max-sm:tw-h-[520px] tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                  >
                    <div className='tw-relative tw-rounded-md max-sm:tw-h-[90%] tw-h-[80%] tw-w-[355px] tw-flex tw-items-center tw-justify-center'>
                      <div className='tw-relative tw-rounded-md tw-h-[100%] tw-w-[95%] tw-flex tw-items-center tw-justify-center tw-bg-[#02AF9B]'>
                        <Image
                          priority
                          src={value.image}
                          alt={`Image ${value.image}`}
                          width={197} //247
                          height={425} //475
                        />

                        <div className='tw-absolute tw-w-[350px] tw-h-[460px] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                            <div className='tw-w-[100%] tw-h-[25%] tw-flex tw-items-center tw-justify-center '>
                              <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                                <Button onClick={() => handlePreview(value.id)}>
                                  <div className='tw-w-[40%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                                    <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-center tw-justify-center'>
                                      <VisibilityIcon
                                        style={{
                                          fontSize: '1.6rem',
                                          color: 'white',
                                        }}
                                      />
                                    </div>
                                    <div className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center'>
                                      <span
                                        style={{ fontSize: '9px' }}
                                        className='tw-text-white'
                                      >
                                        {dictionary?.homeView?.labelView} <br />{' '}
                                        {dictionary?.homeView?.labelPrevious}
                                      </span>
                                    </div>
                                  </div>
                                </Button>
                              </div>
                              <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-start tw-justify-end '>
                                <div className='tw-w-[35%] tw-h-[80%] tw-flex tw-items-center tw-justify-center'>
                                  {data && (
                                    <CustomCheckbox
                                      uid={data.uid}
                                      optionSelected={optionSelected}
                                      value={value}
                                      setTemplateSelect={setTemplateSelect}
                                      templates={data.templateData}
                                      checked={item ? item.checked : false}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center'>
                            <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-center '>
                              <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                                <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                  <span
                                    style={{ fontSize: '13px' }}
                                    className='tw-text-white'
                                  >
                                    {dictionary?.homeView?.labelTemplate}{' '}
                                    {index + 1}
                                  </span>
                                </div>
                              </div>
                              <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end  tw-pl-12'>
                                <Button
                                  disabled={item ? !item.checked : true}
                                  style={{ borderRadius: 0 }}
                                  onClick={() => handleModal(value)}
                                  className='tw-w-[60%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'
                                >
                                  <div className='tw-w-[100%] tw-h-[60%] tw-flex tw-items-center tw-justify-center'>
                                    <DynamicFeedOutlinedIcon
                                      style={{
                                        fontSize: '2rem',
                                        color: 'white',
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      textTransform: 'none',
                                      borderRadius: 0,
                                    }}
                                    className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center'
                                  >
                                    <span
                                      style={{ fontSize: '9px' }}
                                      className='tw-text-white'
                                    >
                                      {
                                        dictionary?.homeView
                                          ?.buttonChangeBackground
                                      }{' '}
                                      <br />{' '}
                                      {dictionary?.homeView?.labelBackground}
                                    </span>
                                  </div>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {isModalOpen ? (
          <div
            className='tw-flex tw-justify-center tw-items-center'
            style={{
              zIndex: 1,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          ></div>
        ) : null}
        <Modal
          className='tw-flex tw-justify-center tw-justify-items-center tw-pt-16 tw-pb-16'
          open={isModalOpen}
          onClose={() => handleModal()}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            className={`tw-flex tw-flex-col tw-justify-evenly max-sm:tw-w-[90%] sm:tw-w-[90%] md:tw-w-[80%] lg:tw-w-[80%] 2xl:tw-w-[65%] ${
              isLargeScreen ? 'tw-w-[50%]' : ''
            } tw-rounded-2xl tw-bg-[#02AF9B] tw-relative`}
          >
            <div className='tw-absolute tw-right-1 tw-top-2'>
              <Button
                color='secondary'
                className='tw-h-[100%] tw-w-[100%]'
                startIcon={
                  <CloseIcon
                    style={{
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      marginLeft: '0.5rem',
                    }}
                  />
                }
                onClick={() => handleModal()}
              />
            </div>

            <div className='tw-px-10 tw-pt-10 tw-h-[80%]'>
              <div className='tw-ml-1 tw-mb-8'>
                <Typography style={{ color: 'black' }}>
                  {dictionary?.homeView?.selectModalTitle}
                </Typography>
              </div>

              {/* <div className='tw-overflow-y-auto max-sm:tw-h-[50vh] sm:tw-h-[60vh] isSmallScreenHeight ? sm:tw-h-[70vh] : sm:tw-h-[20vh] '> */}
              {/*sm: tamaño de la pantalla es igual o mayor que 640px:  sm:tw-h-[50vh]' ////  tw-max-sm: el tamaño de la pantalla es igual o menor a  tw-max-sm:tw-h-[50vh]  */}
              <div
                className={`tw-overflow-y-auto ${
                  isSmallScreenHeight ? 'sm:tw-h-[45vh]' : null
                }`}
              >
                <Grid container spacing={2}>
                  {backgroundImages.map((item, index) => {
                    const x = data?.templateData?.find((val) => {
                      return (
                        val.type === optionSelected &&
                        val.background_id === item.id
                      );
                    });

                    return (
                      <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                        <div className='max-sm:tw-h-[185Px] tw-h-[280px] max-sm:tw-w-[130px] tw-relative tw-rounded-md tw-flex tw-items-center tw-justify-center tw-bg-white'>
                          <Image
                            src={item.image}
                            alt={`Image ${item.id}`}
                            width={isSmallScreen ? 60 : 105}
                            height={isSmallScreen ? 133 : 250} //280
                          />
                          <div className='tw-absolute max-sm:tw-w-[125px] tw-w-[275px] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
                            <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                              <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-end'>
                                <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                                  <div className='tw-w-[45%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                    {data && (
                                      <CustomCheckbox
                                        uid={data.uid}
                                        optionSelected={optionSelected}
                                        value={item}
                                        templates={data.templateData}
                                        handleSelectBackground={
                                          handleSelectBackground
                                        }
                                        checked={x ? x.checked : false}
                                        selectedTemplate={selectedTemplate}
                                        handleModal={handleModal}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center '>
                              <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-start '>
                                <div className='max-sm:tw-w-[45%] tw-w-[25%] tw-h-[100%] tw-flex tw-items-center tw-justify-center tw-pl-3'>
                                  <span
                                    style={{ fontSize: '13px' }}
                                    className='tw-text-[#5278a0]'
                                  >
                                    {dictionary?.homeView?.labelBackground}{' '}
                                    {index + 1}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>

              {/* <Grid container spacing={2}>
                {backgroundImages.map((item, index) => (
                  <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                    <div className='max-sm:tw-h-[185Px] tw-h-[280px] max-sm:tw-w-[130px] tw-relative tw-rounded-md tw-flex tw-items-center tw-justify-center tw-bg-white'>
                      <Image
                        src={item.image}
                        alt={`Image ${item.id}`}
                        width={isSmallScreen ? 60 : 115}
                        height={isSmallScreen ? 143 : 260} //280
                      />
                      <div className='tw-absolute max-sm:tw-w-[125px] tw-w-[275px] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-end'>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                              <div className='tw-w-[45%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                <Checkbox
                                  onChange={() => handleSelectBackground(item)}
                                  checked={backgroundSelect.id == item.id}
                                  icon={
                                    <RadioButtonUncheckedOutlinedIcon
                                      style={{
                                        fontSize: '1rem',
                                        color: '#5278a0',
                                      }}
                                    />
                                  }
                                  checkedIcon={
                                    <RadioButtonCheckedOutlinedIcon
                                      style={{
                                        fontSize: '1rem',
                                        color: '#5278a0',
                                      }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center '>
                          <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-start '>
                            <div className='max-sm:tw-w-[45%] tw-w-[25%] tw-h-[100%] tw-flex tw-items-center tw-justify-center '>
                              <span
                                style={{ fontSize: '13px' }}
                                className='tw-text-[#5278a0]'
                              >
                                {dictionary?.homeView.labelBackground}{' '}
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid> */}
            </div>

            {/* <div className='tw-flex tw-justify-start tw-mt-3 tw-pl-10 tw-pt-1 tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid'>
              <Button
                onClick={handleSaveTemplate}
                color='secondary'
                size='medium'
                startIcon={
                  <AddCircleIcon
                    style={{
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      marginLeft: '0.5rem',
                    }}
                  />
                }
              >
                <span
                  style={{
                    color: '#000000 ',
                    fontSize: '1rem',
                    textTransform: 'none',
                  }}
                >
                  {dictionary?.homeView?.saveButtonLabel}
                </span>
              </Button>
            </div> */}
          </Box>
        </Modal>
      </div>
    )
  );
};

export default HomeContent;
