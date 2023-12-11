// "use client";
// import useDictionary from "@/hooks/dictionary/useDictionary";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Locale } from "i18n-config";
// import React, { useState } from "react";

// const recoverypassword = ({
//   params: { lang },
// }: {
//   params: { lang: Locale };
// }) => {
//   const { dictionary } = useDictionary({ lang });

//   const [step, setStep] = useState(1);

//   const handleNext = () => {
//     setStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setStep((prevStep) => Math.max(prevStep - 1, 1));
//   };

//   return (
//     <div className='flex tw-flex-col tw-justify-items-center tw-h-max tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
//       <Container className="tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center ">
//         <h1 className=" tw-text-white tw-text-[26px]  ">
//           {dictionary?.recoverPassword.recoverpassword}
//         </h1>
//         <TextField
//           className="tw-h-[52px] tw-w-[386px] tw-text-sm tw-mt-[80px] "
//           required
//           id="outlined-required"
//           label={dictionary?.recoverPassword.mail}
//           defaultValue=""
//           variant="outlined"
//           InputProps={{ className: "tw-rounded-3xl" }}
//         />
//         <Typography
//           className="tw-text-white tw-mt-3 tw-mr-80"
//           variant="body2"
//           color="textSecondary"
//         >
//           {dictionary?.recoverPassword.mail}
//         </Typography>
//         <Button
//           className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl  tw-bg-white tw-mt-[65px]"
//           onClick={handleNext}
//         >
//           {dictionary?.recoverPassword.next}
//         </Button>
//         <Button className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[65px]">
//           {dictionary?.recoverPassword.back}
//         </Button>
//       </Container>
//     </div>
//   );
// };

// export default recoverypassword;
