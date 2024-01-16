import { Dictionary } from '@/types/dictionary';
import { TemplateTypes } from '@/types/home';
import Button from '@mui/material/Button';
import React from 'react';

const ButtonTab = ({
  index,
  dictionary,
  optionSelected,
  title,
  handleChangeOption,
  disabled = false,
}: {
  index: TemplateTypes;
  dictionary: Dictionary;
  optionSelected: TemplateTypes;
  title: string;
  handleChangeOption: (e: TemplateTypes) => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      disabled={disabled}
      style={{
        borderBottom: optionSelected === index ? '2px solid #396593' : 'none',
        borderRadius: 0,
      }}
      className='tw-w-1/2 tw-h-full tw-flex tw-items-center tw-justify-center'
      onClick={() => handleChangeOption(index)}
    >
      <div
        className={`${
          optionSelected === index
            ? 'tw-text-[#396593] tw-font-bold'
            : 'tw-text-[#838383] '
        }`}
        style={{ textTransform: 'none' }}
      >
        {title}
      </div>
    </Button>
  );
};

export default ButtonTab;
