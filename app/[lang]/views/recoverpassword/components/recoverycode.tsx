// "use client";
// import useDictionary from "@/hooks/dictionary/useDictionary";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Locale } from "i18n-config";
// import React, { useState } from "react";

// const recoverycode = ({ params: { lang } }: { params: { lang: Locale } }) => {
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
//       <Container className="tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[134px]">
//         <Typography className="tw-text-white  tw-ml-[20px] tw-text-2xl text-center">
//           {dictionary?.recoveryCode.recoverycode}
//         </Typography>

//         <Typography
//           className="text-black tw-pt-10 h-[38px] w-[250px] text-center "
//           variant="body2"
//           color="textSecondary"
//         >
//           {
//             dictionary?.recoveryCode
//               .enter_the_recovery_code_that_we_have_sent_to_your_email
//           }
//         </Typography>

//         <TextField
//           className="tw-h-[52px] tw-w-[42px] tw-mt-[44px] tw-ml-[40px]  "
//           required
//           id="outlined-required"
//           defaultValue=""
//           variant="outlined"
//           InputProps={{ className: "tw-rounded-xl" }}
//         />

//         <TextField
//           className="tw-h-[52px] tw-w-[42px] tw-mt-[44px] tw-text-sm tw-ml-[20px] "
//           required
//           id="outlined-required"
//           defaultValue=""
//           variant="outlined"
//           InputProps={{ className: "tw-rounded-xl" }}
//         />
//         <TextField
//           className="tw-h-[52px] tw-w-[42px] tw-mt-[44px] tw-text-sm tw-ml-[20px] "
//           required
//           id="outlined-required"
//           defaultValue=""
//           variant="outlined"
//           InputProps={{ className: "tw-rounded-xl" }}
//         />
//         <TextField
//           className="tw-h-[52px]  tw-w-[42px] tw-mt-[44px] tw-text-sm tw-ml-[20px]  "
//           required
//           id="outlined-required"
//           defaultValue=""
//           variant="outlined"
//           InputProps={{ className: "tw-rounded-xl" }}
//         />

//         <Typography className="tw-text-white tw-mt-5 tw-ml-[40px] text-center">
//           {dictionary?.recoveryCode.code}
//         </Typography>
//         <div>
//           <Button className="tw-text-black tw-ml-[10px] tw-mt-7   ">
//             {dictionary?.recoveryCode.resendcode}
//           </Button>
//         </div>
//         <Button
//           className="tw-w-[184px] tw-h-[45px] tw-mt-1 tw-rounded-3xl tw-bg-white  tw-items-center "
//           onClick={handleNext}
//         >
//           {dictionary?.recoveryCode.nextCode}
//         </Button>
//         <Button
//           className="tw-w-[184px] tw-h-[45px] tw-mt-1 tw-rounded-3xl tw-bg-white  tw-items-center "
//           onClick={handleBack}
//         >
//           {dictionary?.recoveryCode.backCode}
//         </Button>
//       </Container>
//     </div>
//   );
// };
// export default recoverycode;
