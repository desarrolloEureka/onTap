'use client';
import React from 'react';
import { Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Dictionary } from '@/types/dictionary';
import ProfileHook from '../profile/hooks/ProfileHook';
import ItemForm from '../profile/ItemForm';

import {
    CareerDataFormValues,
    DataForm,
    DataFormValues,
    EducationDataFormValues,
    IndexDataForm,
} from '@/types/profile';

const ItemFormBasicInfo = ({
    dictionary,
    dataForm,
    handleDataSet,
    handleSeeMore,
    index,
    label,
    labelArray,
    value,
    itemDetail,
    isDetailOpen,
}: {
    dictionary: Dictionary;
    dataForm: DataForm;
    handleDataSet: (e: DataForm) => void;
    handleSeeMore: (e: number) => void;
    index: IndexDataForm;

    label?: string;
    labelArray: DataFormValues[] | EducationDataFormValues[] | CareerDataFormValues[];
    value: any
    itemDetail: number;
    isDetailOpen: boolean;
}) => {
    const { handleSwitch, handleData, handleAddData, data } = ProfileHook({
        dictionary,
        dataForm,
        handleDataSet,
    });

    return (
        <div className={`${value[0] === 'phones' && itemDetail === 1 && labelArray.length > 1 ? 'tw-h-[300px]' : value[0] === 'emails' && itemDetail === 2 && labelArray.length > 1 ? 'tw-h-[300px]' : 'tw-h-[200px]'} tw-overflow-y-auto tw-w-[100%] tw-bg-[#E9E9E9] tw-rounded-2xl tw-my-3 tw-py-5`}>
            <div className={`tw-h-[${labelArray.length * 20}px]tw-bg-blue-200 tw-flex tw-flex-col tw-justify-around`}>
                <div className='tw-w-[100%]  tw-flex tw-items-center tw-justify-end'>
                    <div className='tw-h-[100%] tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-justify-center '>
                        <Button
                            onClick={() => {
                                if (value[0] === 'phones') {
                                    handleAddData('phones');
                                } else if (value[0] === 'emails') {
                                    handleAddData('emails');
                                }
                            }}
                            color='secondary'
                            size='medium'
                            startIcon={
                                <AddCircleOutlinedIcon
                                    style={{
                                        color: '#62AD9B',
                                        fontSize: '1.4em',
                                        marginLeft: '0rem',
                                    }}
                                />
                            }
                        >
                            <span
                                style={{
                                    color: '#030124 ',
                                    fontSize: '0.6rem',
                                    textTransform: 'none',
                                }}
                            >
                                {value[0] === 'phones' ? dictionary?.profileView.addAnotherPhone : dictionary?.profileView.addAnotherEmail}{' '}
                            </span>
                        </Button>
                    </div>
                </div>

                <div className='tw-min-h-[125px] tw-pb-3'>
                    {labelArray.map((val, key) => {
                        return (
                            <div key={key}>
                                <ItemForm
                                    label={val.label!}
                                    handleSwitch={(e: any) => handleSwitch(e)}
                                    handleData={handleData}
                                    name={index}
                                    checked={val.checked}
                                    key={key}
                                />
                            </div>
                        );
                    })}
                </div>


                <div className='tw-h-[30px] tw-w-[100%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
                    <Button
                        onClick={() => {
                            if (value[0] === 'phones') {
                                handleSeeMore(1);
                            } else if (value[0] === 'emails') {
                                handleSeeMore(2);
                            }
                        }}
                        color='secondary'
                        size='medium'
                        endIcon={
                            <KeyboardArrowDownOutlinedIcon
                                style={{
                                    color: '#396593',
                                    fontSize: '2.5rem',
                                    marginLeft: '-0.7rem',
                                }}
                            />
                        }
                    >
                        <span
                            style={{
                                color: '#396593 ',
                                fontSize: '0.8rem',
                                textTransform: 'none',
                            }}
                        >
                            {dictionary?.profileView.buttonSeeMore} (2)
                        </span>
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ItemFormBasicInfo;
