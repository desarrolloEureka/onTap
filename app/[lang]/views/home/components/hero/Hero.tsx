import React, { useState } from 'react';
import ButtonTab from '../buttonTab/ButtonTab';
import { Dictionary } from '@/types/dictionary';
import { TemplateTypes } from '@/types/home';

const Hero = ({
  dictionary,
  setOptionSelected,
  optionSelected,
}: {
  dictionary: Dictionary;
  setOptionSelected: (e: TemplateTypes) => void;
  optionSelected: TemplateTypes;
}) => {
  const handleChangeOption = (option: TemplateTypes) => {
    setOptionSelected(option);
  };
  return (
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
  );
};

export default Hero;
