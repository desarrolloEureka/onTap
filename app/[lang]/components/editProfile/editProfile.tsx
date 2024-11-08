import { useState } from "react";
import useDictionary from "@/hooks/dictionary/useDictionary";
import {
  Button,
  Container,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Locale } from "i18n-config";
import EditProfileHook from "./hooks/editProfileHook";

import { useRouter } from "next/navigation";

//icons
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import EmailIcon from "@mui/icons-material/Email";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditProfileDistributor = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { dictionary } = useDictionary({ lang });

  // Usamos el hook para manejar todo el estado
  const {
    handleEditProfile,
    errorForm,
    stateUpdate,
    handleBack,
    loading,
    fullName,
    setFullName,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
    city,
    setCity,
    state,
    setState,
    documentType,
    setDocumentType,
    dni,
    setDni,
    email,
    setEmail,
    handleChangeDepartament,
    handleChangeCity,
    departments,
    cities,
  } = EditProfileHook();

  if (loading) {
    return <div>Cargando...</div>; // Puedes mostrar un spinner o texto mientras se cargan los datos
  }

  return (
    <div className="tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url('/images/loginBackground.png')] tw-bg-no-repeat tw-bg-center tw-bg-cover">
      <div className="tw-flex tw-items-center tw-justify-center lg:tw-h-[600px] md:tw-w-[100%]">
        <Container className="tw-bg-white tw-shadow-md tw-pt-12 tw-px-6 tw-rounded-2xl tw-h-auto tw-w-[754px] tw-flex tw-flex-col tw-items-center tw-justify-center">
          <div className="tw-h-[10%] tw-w-[100%] tw-flex tw-items-center tw-justify-center">
            <h1 className="tw-text-black tw-text-3xl tw-font-bold tw-text-center tw-mb-4">
              {dictionary?.editProfile?.editProfileTitle}
            </h1>
          </div>

          <div className="tw-w-[100%] tw-bg-gray-200 tw-rounded-xl tw-p-6">
            {/* Formulario de edición */}
            <TextField
              className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-text-sm tw-mx-auto"
              required
              label={dictionary?.editProfile?.fullName}
              variant="standard"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputLabelProps={{ style: { color: "#02AF9B" } }}
              InputProps={{
                style: { color: "#333", textAlign: "center" },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlinedIcon
                      style={{
                        color: "#02AF9B",
                        fontSize: "1.8rem",
                        marginRight: "1rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-text-sm tw-mx-auto"
              required
              label={dictionary?.editProfile?.address}
              variant="standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              InputLabelProps={{ style: { color: "#02AF9B" } }}
              InputProps={{
                style: { color: "#333", textAlign: "center" },
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon
                      style={{
                        color: "#02AF9B",
                        fontSize: "1.8rem",
                        marginRight: "1rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-text-sm tw-mx-auto"
              required
              label={dictionary?.editProfile?.phoneNumber}
              variant="standard"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              InputLabelProps={{ style: { color: "#02AF9B" } }}
              InputProps={{
                style: { color: "#333", textAlign: "center" },
                startAdornment: (
                  <InputAdornment position="start">
                    <CallIcon
                      style={{
                        color: "#02AF9B",
                        fontSize: "1.8rem",
                        marginRight: "1rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-mx-auto">
              <InputLabel style={{ color: "#02AF9B" }}>
                {dictionary?.editProfile?.documentType}
              </InputLabel>
              <Select
                label={dictionary?.editProfile?.documentType}
                className="tw-w-full"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                variant="standard"
                inputProps={{
                  style: {
                    textAlign: "center",
                    borderBottom: "2px solid #02AF9B",
                  },
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FingerprintIcon
                        style={{
                          color: "#02AF9B",
                          fontSize: "1.8rem",
                          marginRight: "0.5rem", // Menos margen para que el icono no esté tan separado del texto
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="AS">AS</MenuItem>
                <MenuItem value="CC">CC</MenuItem>
                <MenuItem value="CD">CD</MenuItem>
                <MenuItem value="CE">CE</MenuItem>
                <MenuItem value="CN">CN</MenuItem>
                <MenuItem value="MS">MS</MenuItem>
                <MenuItem value="NIT">NIT</MenuItem>
                <MenuItem value="PA">PA</MenuItem>
                <MenuItem value="PE">PE</MenuItem>
                <MenuItem value="RC">RC</MenuItem>
              </Select>
            </FormControl>

            <TextField
              className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-text-sm tw-mx-auto"
              required
              label={dictionary?.editProfile?.dni}
              variant="standard"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              InputLabelProps={{ style: { color: "#02AF9B" } }}
              InputProps={{
                style: { color: "#333", textAlign: "center" },
                startAdornment: (
                  <InputAdornment position="start">
                    <FingerprintIcon
                      style={{
                        color: "#02AF9B",
                        fontSize: "1.8rem",
                        marginRight: "1rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-text-sm tw-mx-auto"
              required
              label={dictionary?.editProfile?.email}
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
              InputLabelProps={{ style: { color: "#02AF9B" } }}
              InputProps={{
                style: { color: "#333", textAlign: "center" },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                      style={{
                        color: "#02AF9B",
                        fontSize: "1.8rem",
                        marginRight: "1rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-mx-auto">
              <InputLabel style={{ color: "#02AF9B" }}>
                {dictionary?.editProfile?.state}
              </InputLabel>
              <Select
                value={state}
                onChange={handleChangeDepartament}
                label={dictionary?.editProfile?.state}
                variant="standard"
                inputProps={{
                  style: {
                    textAlign: "center",
                    borderBottom: "2px solid #02AF9B",
                  },
                }}
              >
                {departments &&
                  departments.map((dep: any) => (
                    <MenuItem key={dep.departamento} value={dep.departamento}>
                      {dep.departamento}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="tw-h-[52px] tw-w-[80%] tw-my-4 tw-mx-auto">
              <InputLabel style={{ color: "#02AF9B" }}>
                {dictionary?.editProfile?.city}
              </InputLabel>
              <Select
                label="Ciudad"
                variant="standard"
                inputProps={{
                  style: {
                    textAlign: "center",
                    borderBottom: "2px solid #02AF9B",
                  },
                }}
                className="tw-w-full"
                value={city}
                //error={!!cityError}
                onChange={handleChangeCity}
              >
                {cities &&
                  cities.map((city: any) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          {/* Botones */}
          <div className="tw-h-[25%] tw-w-[90%] tw-flex tw-items-center tw-justify-center tw-py-6">
            <Button
              variant="text"
              className="tw-text-black tw-mr-20"
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
              className="tw-text-black tw-ml-20"
              onClick={handleEditProfile}
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
    </div>
  );
};

export default EditProfileDistributor;
