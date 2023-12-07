// "use client";
// import useDictionary from "@/hooks/dictionary/useDictionary";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Locale } from "i18n-config";
// import React, { useState } from "react";

// const createnewpassword = ({
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
//       {/* {dictionary && <Menu dictionary={dictionary} />} */}
//       <Container className="tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[513px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[103px]">
//         <div>
//           <h1 className="tw-mt-[10px] tw-text-white tw-text-3xl">
//             {dictionary?.newPassword.createnewpassword}
//           </h1>
//         </div>
//         <TextField
//           className="tw-h-[52px] tw-w-[386px] tw-mt-10 tw-text-sm  "
//           required
//           id="outlined-required"
//           label={dictionary?.newPassword.newpassword}
//           defaultValue=""
//           variant="outlined"
//           InputProps={{ className: "tw-rounded-3xl" }}
//         />
//         <Typography
//           className="tw-text-white tw-mt-3 tw-mr-60"
//           variant="body2"
//           color="textSecondary"
//         >
//           {dictionary?.newPassword.newpassword}
//         </Typography>
//         <TextField
//           className="tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  "
//           required
//           id="outlined-password"
//           label={dictionary?.newPassword.repeatpassword}
//           type="password"
//           defaultValue=""
//           variant="outlined"
//           InputProps={{ className: "tw-rounded-3xl" }}
//         />
//         <Typography
//           className="tw-text-white tw-mt-3 tw-mr-60"
//           variant="body2"
//           color="textSecondary"
//         >
//           {dictionary?.newPassword.repeatpassword}
//         </Typography>
//         <Button
//           className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[30px] tw-items-center "
//           onClick={handleNext}
//         >
//           {dictionary?.newPassword.nextnewpassword}
//         </Button>
//       </Container>
//     </div>
//   );
// };
// export default createnewpassword;
