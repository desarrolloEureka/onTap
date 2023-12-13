"use client";
import useDictionary from "@/hooks/dictionary/useDictionary";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Locale } from "i18n-config";
import Link from "next/link";
import React, { useState } from "react";

const RecoveryPassword = ({
  params: { lang }, handleNext, handleBack
}: {
  params: { lang: Locale };
  handleNext : () => void
  handleBack : () => void
}) => {
  const { dictionary } = useDictionary({ lang });



  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
    <Container className="tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[475px] tw-w-[794px] tw-flex tw-flex-col tw-items-center tw-justify-center   ">
        <h1 className=" tw-text-white tw-text-[26px]  ">
          {dictionary?.recoverPassword.recoverpassword}
        </h1>
        <TextField
          className="tw-h-[52px] tw-w-[386px] tw-text-sm tw-mt-[80px] "
          required
          id="outlined-required"
          label={dictionary?.recoverPassword.mail}
          defaultValue=""
          variant="outlined"
          InputProps={{ className: "tw-rounded-3xl" }}
        />
        <Typography
          className="tw-text-white tw-mt-3 tw-mr-80"
          variant="body2"
          color="textSecondary"
        >
          {dictionary?.recoverPassword.mail}
        </Typography>
        <div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
        <Button
          className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl  tw-bg-white tw-mt-[65px] tw-mx-2"
          onClick={handleNext}
        >
          {dictionary?.recoverPassword.next}
        </Button>
        <Button
           className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl  tw-bg-white tw-mt-[65px] tw-mx-2'
           onClick={handleNext}
           >
            <Link href='/views/login'>
              {dictionary?.recoverPassword.back}
            </Link>
           </Button>
        </div>
      </Container>
    </div>
  );
};

export default RecoveryPassword
