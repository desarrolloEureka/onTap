import useDictionary from "@/hooks/dictionary/useDictionary";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Locale } from "i18n-config";
import ChangePasswordHook from "./hooks/changePasswordHook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

const ChangePasswordAdmin = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { dictionary } = useDictionary({ lang });
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const {
    handleChangePassword,
    setPassword,
    setPasswordConfirm,
    password,
    passwordConfirm,
    errorForm,
    stateUpdate,
    handleBack,
  } = ChangePasswordHook();

  return (
    <div className="tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url('/images/loginBackground.png')] tw-bg-no-repeat tw-bg-center tw-bg-cover">
      <Container className="tw-bg-white tw-shadow-md tw-pt-12 tw-px-6 tw-rounded-2xl tw-w-[900px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-16">
        <div className="tw-h-[10%] tw-w-[100%] tw-flex tw-items-center tw-justify-center">
          <h1 className="tw-text-black tw-text-3xl tw-font-bold tw-text-center tw-mb-6">
            {dictionary?.changePassword?.updatePassword}
          </h1>
        </div>

        {/* Contenedor combinado para ambos campos de texto */}
        <div className="tw-w-[100%] tw-bg-gray-200 tw-rounded-xl tw-p-10 tw-flex tw-flex-col tw-items-center">
          <TextField
            className="tw-h-[80px] tw-w-[500px] tw-text-sm tw-mb-10"
            required
            id="outlined-password"
            label={dictionary?.newPassword?.nPassword}
            type={showPasswordOne ? "text" : "password"}
            variant="outlined"
            InputProps={{
              className: "tw-rounded-3xl",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordOne(!showPasswordOne)}
                    edge="end"
                  >
                    {showPasswordOne ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password} // Enlaza el valor al estado 'password'
            onChange={(e) => setPassword(e.target.value)} // Controla el cambio
          />
          <TextField
            className="tw-h-[80px] tw-w-[500px] tw-text-sm tw-mb-6"
            required
            id="outlined-password-confirm"
            label={dictionary?.newPassword?.repeatPassword}
            type={showPasswordTwo ? "text" : "password"}
            variant="outlined"
            InputProps={{
              className: "tw-rounded-3xl",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                    edge="end"
                  >
                    {showPasswordTwo ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={passwordConfirm} // Enlaza el valor al estado 'passwordConfirm'
            onChange={(e) => setPasswordConfirm(e.target.value)} // Controla el cambio
          />
        </div>
        {/* manejo de errores y actualizacion */}
        {/* {errorForm?.errorType === 1 && (
          <span className="tw-text-red-500 tw-mt-2">
            {errorForm.errorMessage} *
          </span>
        )}

        {errorForm?.errorType === 2 && (
          <span className="tw-text-red-500 tw-underline tw-mt-2">
            {errorForm.errorMessage}
          </span>
        )}

        {stateUpdate === true && (
          <span className="tw-text-blue-600 tw-mt-2">
            {dictionary?.recoverPassword?.passwordUpdated}
          </span>
        )} */}

        <div className="tw-flex tw-items-center tw-justify-center tw-flex-row tw-mt-6">
          <Button
            variant="text"
            className="tw-text-black tw-mr-20" // Margen derecho entre los botones
            onClick={handleBack}
            sx={{
              padding: "0",
              minWidth: "auto",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
            }}
            startIcon={
              <ArrowBackIcon
                style={{
                  paddingLeft: 1,
                  fontSize: 25,
                  color: "black",
                }}
              />
            }
          >
            <Typography style={{ color: "black" }}>
              {dictionary?.editProfile?.back}
            </Typography>
          </Button>

          <Button
            variant="text"
            className="tw-text-black tw-ml-20" // Agregar margen izquierdo al segundo botón
            onClick={handleChangePassword}
            sx={{
              padding: "0",
              minWidth: "auto",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
            }}
            startIcon={
              <SaveIcon
                style={{
                  paddingLeft: 1,
                  fontSize: 25,
                  color: "black",
                }}
              />
            }
          >
            <Typography style={{ color: "black" }}>
              {dictionary?.homeView?.saveButtonLabel}
            </Typography>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ChangePasswordAdmin;
