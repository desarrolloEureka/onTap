import { Dictionary } from '@/types/dictionary';
import { Box, Button, Checkbox, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import ButtonTab from '../buttonTab/ButtonTab';
import Header from '../header/Header';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import LogOut from '@/hooks/logOut/LogOut';
import { BackgroundImages, TemplateTypes, Templates } from '@/types/home';

interface BackgroundType {
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
  const [optionSelected, setOptionSelected] = useState<TemplateTypes>('social');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundSelect, setBackgroundSelect] = useState<BackgroundType>({ id: '', name: '', image: '' });
  const { logOut } = LogOut();

  const handleChangeOption = (option: TemplateTypes) => {
    setOptionSelected(option);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectBackground = (item: BackgroundType) => {
    console.log("item ----> ", item);
    setBackgroundSelect(item);
  };

  return (
    dictionary && (
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center tw-h-screen">
        <Header dictionary={dictionary} />
        <div
          className='tw-h-[60px] tw-flex'
          style={{ borderBottom: '1px solid #C2C2C2' }}
        >
          <ButtonTab
            dictionary={dictionary}
            index={'social'}
            optionSelected={optionSelected}
            title={dictionary?.homeView.social}
            handleChangeOption={handleChangeOption}
          />
          <ButtonTab
            dictionary={dictionary}
            index={'professional'}
            optionSelected={optionSelected}
            title={dictionary?.homeView.professional}
            handleChangeOption={handleChangeOption}
          />
          <ButtonTab
            dictionary={dictionary}
            index={'corporate'}
            optionSelected={optionSelected}
            title={dictionary?.homeView.corporate}
            handleChangeOption={handleChangeOption}
            disabled
          />
        </div>

        <div className='tw-flex tw-items-center tw-justify-center'>
          <div className='tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-w-[1300px] xl:tw-w-[1250px]'>
            {templates.map((value, index) => {
              return (
                value.type == optionSelected && (
                  <div
                    key={index}
                    className={`tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                  >
                    <div className='tw-relative tw-rounded-md tw-h-[80%] tw-w-[95%] tw-flex tw-items-center tw-justify-center'>
                      <Image
                        priority
                        src={value.image}
                        alt={`Image ${value.image}`}
                        width={247}
                        height={475}
                      />

                      <div className='tw-absolute tw-w-[235px] tw-h-[460px] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[25%] tw-flex tw-items-center tw-justify-center '>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                              <div className='tw-w-[40%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                                <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-center tw-justify-center'>
                                  <VisibilityIcon
                                    style={{ fontSize: '1.8rem' }}
                                  />
                                </div>
                                <div className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center'>
                                  <span
                                    style={{ fontSize: '9px' }}
                                    className='tw-text-white'
                                  >
                                    {dictionary?.homeView.labelView} <br /> {dictionary?.homeView.labelPrevious}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-start tw-justify-end '>
                              <div className='tw-w-[35%] tw-h-[80%] tw-flex tw-items-center tw-justify-center'>
                                <Checkbox
                                  icon={<RadioButtonUncheckedOutlinedIcon
                                    style={{ fontSize: '1rem', color: "#396593" }}
                                  />}
                                  checkedIcon={<RadioButtonCheckedOutlinedIcon
                                    style={{ fontSize: '1rem', color: "#396593" }}
                                  />}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-center '>

                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                              <div className='tw-w-[55%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                <span
                                  style={{ fontSize: '14px' }}
                                  className='tw-text-white'
                                >
                                  {dictionary?.homeView.labelTemplate} {index + 1}
                                </span>
                              </div>
                            </div>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                              <Button
                                style={{ borderRadius: 0 }}
                                onClick={() => handleModal()}
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
                                    {dictionary?.homeView.buttonChangeBackground} <br /> {dictionary?.homeView.labelTemplate}
                                  </span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>

        <Button onClick={logOut}>{dictionary?.logOut}</Button>
        {isModalOpen ? (
          <div
            className='tw-flex tw-justify-center tw-items-center '
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
          onClose={handleModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className='tw-flex tw-flex-col tw-justify-evenly lg:tw-w-[80%] 2xl:tw-w-[40%] tw-rounded-2xl tw-bg-primary tw-relative'>
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
                onClick={handleModal}
              />
            </div>
            <div className='tw-px-16 tw-pt-10 tw-h-[80%]'>
              <div className='tw-ml-9 tw-mb-8'>
                <Typography style={{ color: 'black' }}>{dictionary?.homeView.selectModalTitle}</Typography>
              </div>
              <Grid container spacing={2}>
                {backgroundImages.map((item, index) => (
                  <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                    <div className=' tw-relative tw-flex tw-items-center tw-justify-center tw-bg-white'>
                      <Image
                        src={item.image}
                        alt={`Image ${item.id}`}
                        width={135}
                        height={280}
                      />
                      <div className='tw-absolute tw-w-[130px] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-end'>
                            <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                              <div className='tw-w-[45%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                <Checkbox
                                  onChange={() => handleSelectBackground(item)}
                                  checked={backgroundSelect.id == item.id}
                                  icon={<RadioButtonUncheckedOutlinedIcon
                                    style={{ fontSize: '1rem', color: "#396593" }}
                                  />}
                                  checkedIcon={<RadioButtonCheckedOutlinedIcon
                                    style={{ fontSize: '1rem', color: "#396593" }}
                                  />}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center'>
                          <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-start'>
                            <div className='tw-w-[45%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                              <span
                                style={{ fontSize: '14px' }}
                                className='tw-text-white'
                              >
                                {dictionary?.homeView.labelBackground} {index + 1}
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className='tw-flex tw-justify-start tw-mt-3 tw-pl-20 tw-pt-1 tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid'>
              <Button
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
                <span style={{ color: '#000000 ', fontSize: '1rem', textTransform: 'none' }}>
                  {dictionary?.homeView.saveButtonLabel}
                </span>
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    )
  );
};

export default HomeContent;