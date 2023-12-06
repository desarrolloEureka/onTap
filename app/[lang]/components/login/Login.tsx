import { LoginProps } from "@/types/login";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Menu from "../menu/Menu";

const Login = ({ dictionary }: LoginProps) => {
  // const { data } = GetLangQuery();
  // const lang = (data ? data.toString() : "es") as Locale;
  // const { dictionary } = useDictionary({ lang });

  return (
   
    <>
      
 <div className='flex tw-flex-col tw-justify-items-center tw-h-max tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Menu dictionary={dictionary} />
      <Container className='tw-bg-primary tw-shadow-md tw-rounded-2xl tw-h-[618px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center '>
        <Box className='tw-w-full tw-flex tw-justify-center tw-justify-items-center '>
          <Image
            className='tw-mt-14'
            src='/images/logo_onetap_blanco.png'
            alt='Logo'
            width={190}
            height={160}
          />
        </Box>
        <TextField
          className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  '
          required
          id='outlined-required'
          label={dictionary.loginView.username}
          defaultValue=''
          variant='outlined'
          InputProps={{ className: 'tw-rounded-3xl' }}
        />
        <Typography
          className='tw-text-white tw-mt-3 tw-mr-80'
          variant='body2'
          color='textSecondary'
        >
          {dictionary.loginView.username}
        </Typography>
        <TextField
          className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  '
          required
          id='outlined-password'
          label={dictionary.loginView.password}
          type='password'
          defaultValue=''
          variant='outlined'
          InputProps={{ className: 'tw-rounded-3xl' }}
        />
        <Typography
          className='tw-text-white tw-mt-3 tw-mr-72'
          variant='body2'
          color='textSecondary'
        >
          {dictionary.loginView.password}
        </Typography>
        <Button className='tw-text-white '>{dictionary.loginView.login}</Button>
      </Container>
    </div>
      <div>
        <div className='flex tw-flex-col tw-justify-items-center tw-h-max tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
        <Menu dictionary={dictionary} />
          <Container className="tw-bg-primary tw-shadow-md tw-pt-20 tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[134px]">
            <h1 className=" tw-text-white tw-text-[26px]  ">
              {dictionary?.recoverPassword.recoverpassword}
            </h1>
            <TextField
              className="tw-h-[52px] tw-w-[386px] tw-text-sm tw-mt-[140px] "
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
            <Button className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[65px]">
              {dictionary?.recoverPassword.next}
            </Button>
          </Container>
        </div>
      </div>
      <div>
        <h1>Haciendo cambiossssss</h1>
      </div>

      <div className='flex tw-flex-col tw-justify-items-center tw-h-max tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
        {dictionary && <Menu dictionary={dictionary} />}
        <Container className="tw-bg-primary tw-shadow-md tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[134px]">
          <Typography className="tw-text-white  tw-ml-[20px] tw-text-2xl text-center">
            {dictionary?.recoveryCode.recoverycode}
          </Typography>

          <Typography
            className="text-black mt-32 h-[38px] w-[250px] text-center "
            variant="body2"
            color="textSecondary"
          >
            {
              dictionary?.recoveryCode
                .enter_the_recovery_code_that_we_have_sent_to_your_email
            }
          </Typography>

          <TextField
            className="tw-h-[52px] tw-w-[42px] tw-mt-[114px] tw-ml-[40px]  "
            required
            id="outlined-required"
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-xl" }}
          />

          <TextField
            className="tw-h-[52px] tw-w-[42px] tw-mt-[114px] tw-text-sm tw-ml-[20px] "
            required
            id="outlined-required"
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-xl" }}
          />
          <TextField
            className="tw-h-[52px] tw-w-[42px] tw-mt-[114px] tw-text-sm tw-ml-[20px] "
            required
            id="outlined-required"
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-xl" }}
          />
          <TextField
            className="tw-h-[52px] tw-w-[42px] tw-mt-[114px] tw-text-sm tw-ml-[20px]  "
            required
            id="outlined-required"
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-xl" }}
          />

          <Typography className="tw-text-white tw-mt-10 tw-ml-[50px] text-center">
            {dictionary?.recoveryCode.code}
          </Typography>

          <Button className="tw-text-black tw-mt-[30px] tw-ml-[220px]   ">
            {dictionary?.recoveryCode.resendcode}
          </Button>
          <Button className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[100px] tw-items-center ">
            {dictionary?.recoveryCode.nextCode}
          </Button>
        </Container>
      </div>

      <div className='flex tw-flex-col tw-justify-items-center tw-h-max tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
        {dictionary && <Menu dictionary={dictionary} />}
        <Container className="tw-bg-primary tw-shadow-md tw-rounded-2xl tw-h-[513px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[103px]">
          <div>
            <h1 className="tw-mt-[10px] tw-text-white tw-text-3xl">
              {dictionary?.newPassword.createnewpassword}
            </h1>
          </div>
          <TextField
            className="tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  "
            required
            id="outlined-required"
            label={dictionary?.newPassword.newpassword}
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-3xl" }}
          />
          <Typography
            className="tw-text-white tw-mt-3 tw-mr-60"
            variant="body2"
            color="textSecondary"
          >
            {dictionary?.newPassword.newpassword}
          </Typography>
          <TextField
            className="tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  "
            required
            id="outlined-password"
            label={dictionary?.newPassword.repeatpassword}
            type="password"
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-3xl" }}
          />
          <Typography
            className="tw-text-white tw-mt-3 tw-mr-60"
            variant="body2"
            color="textSecondary"
          >
            {dictionary?.newPassword.repeatpassword}
          </Typography>
          <Button className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[100px] tw-items-center ">
            {dictionary?.newPassword.nextnewpassword}
          </Button>
        </Container>
      </div>

      <div className='flex tw-flex-col tw-justify-items-center tw-h-max tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
        {dictionary && <Menu dictionary={dictionary} />}
        <Container className="tw-relative tw-bg-primary tw-shadow-md tw-rounded-2xl tw-h-[618px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[103px]">
          <div>
            <h1 className="tw-mt-[10px] tw-text-white tw-text-3xl">
              {dictionary?.passwordChangedSuccessfully}
            </h1>
          </div>

          <Box className="tw-w-full tw-flex tw-justify-center tw-justify-items-center ">
            <Image
              className="tw-mt-44"
              src="/images/password_change_girl.png"
              alt="Logo"
              width={305}
              height={380}
            />
            <Button className=" tw-absolute tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[450px] tw-items-center ">
              {dictionary?.newPassword.nextnewpassword}
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
