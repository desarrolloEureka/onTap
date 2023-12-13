'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  Stack,
  IconButton,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import ModalProfile from './components/ModalProfile';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Locale } from 'i18n-config';
import PhotoUser from './components/PhotoUser';
import FormDataUser from './components/FormDataUser';
import FormAddDataUser from './components/FormAddDataUser';
import FooterProfile from './components/FooterProfile';
import Menu from '../../components/menu/Menu';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(0);
  const [isProUser, setIsProUser] = useState(true);

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
    dictionary && (
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
    )
  );
};

export default Page;
