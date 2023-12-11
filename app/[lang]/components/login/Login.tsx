import { LoginProps } from "@/types/login";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Menu from "../menu/Menu";
import Link from "next/link";

const Login = ({ dictionary }: LoginProps) => {
  // const { data } = GetLangQuery();
  // const lang = (data ? data.toString() : "es") as Locale;
  // const { dictionary } = useDictionary({ lang });

  return (
    <>
      <div className='flex tw-flex-col tw-justify-items-center tw-h-max tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
        {/* <Menu dictionary={dictionary} /> */}
        <Container className="tw-bg-primary tw-shadow-m  tw-rounded-2xl tw-h-[618px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center ">
          <Box className="tw-w-full tw-flex tw-justify-center tw-justify-items-center ">
            <Image
              className="tw-mt-14"
              src="/images/logo_onetap_blanco.png"
              alt="Logo"
              width={190}
              height={160}
            />
          </Box>
          <TextField
            className="tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  "
            required
            id="outlined-required"
            label={dictionary.loginView.username}
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-3xl" }}
          />
          <Typography
            className="tw-text-white tw-mt-3 tw-mr-80"
            variant="body2"
            color="textSecondary"
          >
            {dictionary.loginView.username}
          </Typography>
          <TextField
            className="tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  "
            required
            id="outlined-password"
            label={dictionary.loginView.password}
            type="password"
            defaultValue=""
            variant="outlined"
            InputProps={{ className: "tw-rounded-3xl" }}
          />
          <Typography
            className="tw-text-white tw-mt-3 tw-mr-72"
            variant="body2"
            color="textSecondary"
          >
            {dictionary.loginView.password}
          </Typography>
          <Button className="tw-text-white ">
            {dictionary.loginView.login}
          </Button>
          <Button className="tw-text-white ">
          <Link href="/views/recoverpassword">{dictionary.loginView.recoverPassLogin}</Link>
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Login;
