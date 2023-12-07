// "use client";
// import useDictionary from "@/hooks/dictionary/useDictionary";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Locale } from "i18n-config";
// import React, { useState } from "react";
// import Image from "next/image";
// import Box from "@mui/material/Box";

// const passwordmodifiedsuccessfully = ({
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
//       <Container className="tw-relative tw-bg-primary tw-pt-16 tw-shadow-md tw-rounded-2xl tw-h-[618px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[103px]">
//         <div>
//           <h1 className="tw-mt-[10px] tw-text-white tw-text-3xl">
//             {dictionary?.passwordChangedSuccessfully}
//           </h1>
//         </div>

//         <Box className="tw-w-full tw-flex tw-justify-center tw-justify-items-center ">
//           <Image
//             className="tw-mt-[105px]"
//             src="/images/password_change_girl.png"
//             alt="Logo"
//             width={305}
//             height={380}
//           />
//           <Button className=" tw-absolute tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[400px] tw-items-center ">
//             {dictionary?.newPassword.nextnewpassword}
//           </Button>
//         </Box>
//       </Container>
//     </div>
//   );
// };
// export default passwordmodifiedsuccessfully;
