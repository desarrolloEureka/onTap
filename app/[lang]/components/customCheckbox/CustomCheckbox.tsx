import { SendTemplateSelected } from '@/reactQuery/users';
import { TemplateData, UserData } from '@/types/user';
import { Checkbox } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import React, { useRef, useState } from 'react';
import { TemplateTypes } from '@/types/home';
import { GetAllBackgroundImages } from '@/reactQuery/home';

interface TemplateType {
  id: string;
  name: string;
  image: string;
}

interface BackgroundType {
  id: string;
  name: string;
  image: string;
}

const templateData = [
  { type: 'social', id: 'XfhZLINMOpRTI7cakd8o', checked: false },
  { type: 'professional', id: 'ZESiLxKZFwUOUOgLKt6P', checked: true },
];

const CustomCheckbox = ({
  uid,
  value,
  optionSelected,
  setTemplateSelect,
  handleSelectBackground,
  templates,
  checked,
  selectedTemplate,
  handleModal,
}: {
  uid?: string;
  value: any;
  optionSelected: TemplateTypes;
  setTemplateSelect?: (e: TemplateType) => void;
  handleSelectBackground?: (e: BackgroundType) => void;
  templates?: TemplateData[];
  checked: boolean;
  selectedTemplate?: string;
  handleModal?: () => void;
}) => {
  const queryClient = useQueryClient();
  const checkboxRef = useRef<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fakeData, setFakeData] = useState<TemplateData[]>(templates ?? []);
  const backgrounds = GetAllBackgroundImages();
  const firstBackgroundId = backgrounds.data && backgrounds.data.length > 0 ? backgrounds.data[0]?.id : null;

  const handleSaveTemplate = async (background_id: string) => {
    const userId = uid;
    const templateData = templates;

    if (templateData && selectedTemplate && userId) {
      const newData = templateData?.map((val) => {
        val.id === selectedTemplate && (val.background_id = background_id);
        return val;
      });
      newData &&
        (await SendTemplateSelected(userId, newData, queryClient).then(() => {
          handleModal && handleModal();
        }));
    }
  };

  const handleSelectTemplate = async () => {
    if (handleSelectBackground) {
      handleSaveTemplate(checkboxRef?.current?.id);
    } else {
      const userId = uid;
      if (checkboxRef && userId && fakeData.length > 0) {
        const fakeDataClone = [...fakeData];
        const fakeDataCloneFilter = fakeDataClone.filter(
          (val) => val.type !== optionSelected
        );
        fakeDataCloneFilter.push({
          type: optionSelected,
          id: checkboxRef.current.id,
          checked: true,
          //background_id: firstBackgroundId !== null ? firstBackgroundId : undefined,
          background_id: '7ynTMVt3M6VFV3KykOXQ',
        });
        setFakeData(fakeDataCloneFilter);
        await SendTemplateSelected(userId, fakeDataCloneFilter, queryClient);
        setIsUpdate(!isUpdate);
      } else {
        const fakeDataClone = [...fakeData];
        fakeDataClone.push({
          type: optionSelected,
          id: checkboxRef.current.id,
          checked: true,
          //background_id: firstBackgroundId !== null ? firstBackgroundId : undefined,
          background_id: '7ynTMVt3M6VFV3KykOXQ',
        });
        setFakeData(fakeDataClone);
        userId &&
          (await SendTemplateSelected(userId, fakeDataClone, queryClient));
        setIsUpdate(!isUpdate);
      }
    }
  };

  return (
    <Checkbox
      inputRef={checkboxRef}
      checked={checked}
      onChange={handleSelectTemplate}
      id={value.id}
      disabled={checked}
      icon={
        <RadioButtonUncheckedOutlinedIcon
          style={{
            fontSize: handleSelectBackground ? '1rem' : '1.1rem',
            color: handleSelectBackground ? '#5278a0' : '#ffffff ',
          }}
        />
      }
      checkedIcon={
        <RadioButtonCheckedOutlinedIcon
          style={{
            fontSize: handleSelectBackground ? '1rem' : '1.1rem',
            color: handleSelectBackground ? '#5278a0' : '#ffffff ',
          }}
        />
      }
    />
  );
};

export default CustomCheckbox;
