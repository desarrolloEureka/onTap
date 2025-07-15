import useDictionary from "@/hooks/dictionary/useDictionary";
import {
  Button,
  Container,
  TextField,
  Typography,
  Select,
  InputAdornment,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Autocomplete,
  Box,
  IconButton,
  Modal,
  CircularProgress,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import BadgeIcon from "@mui/icons-material/Badge";
import CustomersCreateFormHook from "./hooks/CustomersCreateFormHook";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReactCountryFlag from "react-country-flag";
import { countries as countriesData } from "../../globals/constants";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import PaymentIcon from "@mui/icons-material/Payment";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import { Close } from "@mui/icons-material";
import Image from "next/image";

const CustomersCreateForm = ({
  handleReturnForm,
  userId
}: {
  handleReturnForm: () => void;
  userId: any;
}) => {
  const {
    documentType,
    setDocumentType,
    documentNumber,
    setDocumentNumber,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    phoneNumber,
    setPhoneNumber,
    phoneCode,
    setPhoneCode,
    address,
    setAddress,
    city,
    state,
    country,
    isActive,
    setIsActive,
    countries,
    departments,
    cities,
    //Paso 2
    selectedPlan,
    setSelectedPlan,
    selectedCombo,
    setSelectedCombo,
    selectedMaterial,
    setSelectedMaterial,
    selectedColor,
    setSelectedColor,
    customization,
    setCustomization,
    customName,
    setCustomName,
    customRole,
    setCustomRole,
    selectedCustomization,
    setSelectedCustomization,
    updatePlan,
    updateDefaultPlan,
    updateMaterial,
    updateColor,
    updateCustomization,
    product,
    setProduct,
    total,
    totalSavings,
    setTotal,
    handleAddProduct,
    handlePersonalizationChange,
    togglePersonalization,
    handleRemoveProduct,
    clearSelectedPlan,
    clearSelectedMaterial,
    clearSelectedCustomization,
    selectedProducts,
    setSelectedProducts,
    filteredProducts,
    handleChangeQuantity,
    selectedComboError,
    selectedPlanError,
    selectedMaterialError,
    selectedCustomizationError,
    selectedColorError,
    customNameError,
    customRoleError,
    errorMessages,
    //Paso 4
    documentTypeError,
    documentNumberError,
    firstNameError,
    lastNameError,
    emailError,
    confirmEmailError,
    phoneNumberError,
    errorPhoneCodeForm,
    addressError,
    cityError,
    stateError,
    countryError,
    isActiveError,
    handleChangeCountry,
    handleChangeDepartament,
    handleChangeCity,
    step,
    setStep,
    handleNextStep,
    dataPlans,
    dataMaterials,
    dataCustomizations,
    dataColors,
    dataProducts,
    formatPrice,
    // Paso 4
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    deliveryFirstName,
    setDeliveryFirstName,
    deliveryLastName,
    setDeliveryLastName,
    deliveryIdType,
    setDeliveryIdType,
    deliveryIdNumber,
    setDeliveryIdNumber,
    deliveryPhoneNumber,
    setDeliveryPhoneNumber,
    deliveryEmail,
    setDeliveryEmail,
    postalCode,
    setPostalCode,
    //Errores Paso 4
    cardNumberError,
    setCardNumberError,
    cvcError,
    setCvcError,
    expMonthError,
    setExpMonthError,
    expYearError,
    setExpYearError,
    cardHolderError,
    setCardHolderError,
    termsError,
    setTermsError,
    deliveryFirstNameError,
    setDeliveryFirstNameError,
    deliveryLastNameError,
    setDeliveryLastNameError,
    deliveryIdTypeError,
    setDeliveryIdTypeError,
    deliveryIdNumberError,
    setDeliveryIdNumberError,
    deliveryPhoneNumberError,
    setDeliveryPhoneNumberError,
    deliveryEmailError,
    setDeliveryEmailError,
    shippingCountryError,
    setShippingCountryError,
    shippingCityError,
    setShippingCityError,
    shippingStateError,
    setShippingStateError,
    postalCodeError,
    setPostalCodeError,
    dataRegisterHandle,
    handleChangeCountryDelivery,
    handleChangeDepartamentDelivery,
    handleChangeCityDelivery,
    countriesDelivery,
    departmentsDelivery,
    citiesDelivery,
    cityDelivery,
    setCityDelivery,
    stateDelivery,
    setStateDelivery,
    countryDelivery,
    setCountryDelivery,
    addressDelivery,
    setAddressDelivery,
    data,
    addressDeliveryError,
    handleAccept,
    error,
    isAccepted,
    handleInputChange,
    cardInfo,
    handlePayment,
    isModalOpen,
    setIsModalOpen,
    handleCloseModal,
    handleOpenModal,
    loading,
    installmentsError,
    setInstallmentsError,
    idTypeError,
    setIdTypeError,
    idNumberError,
    setIdNumberError,
    isChangePlan,
    isExistingUser,
    defaultPlans
  } = CustomersCreateFormHook({ handleReturnForm, userId });
  const dictionary = useDictionary({ lang: "es" });

  return (
    <>
      <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
        <div className="tw-mt-3 tw-shadow-m tw-rounded-2xl tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5">
          <div
            style={{ width: "100%" }}
            className="tw-shadow-m tw-rounded-2xl tw-m-4 tw-mt-7 tw-min-h-[68vh]"
          >
            <Container className="tw-bg-[#02AF9B] tw-shadow-m tw-rounded-2xl tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-2">
              {step === 1 ? (
                <div className="tw-w-[95%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center">
                  <div className="tw-w-[90%] tw-h-[90%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                    <h3 className="tw-mb-9">Información Personal</h3>
                    <form className="tw-w-full">
                      <div className="tw-flex tw-justify-between tw-mb-5">
                        <FormControl
                          fullWidth
                          variant="outlined"
                          className="tw-mr-2"
                        >
                          <InputLabel>Tipo de Documento</InputLabel>
                          <Select
                            label="Tipo de Documento"
                            className="tw-w-full"
                            value={documentType}
                            error={!!documentTypeError}
                            onChange={(e) => setDocumentType(e.target.value)}
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
                          disabled={isExistingUser}
                          variant="standard"
                          label="Número Documento"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <BadgeIcon
                                  style={{
                                    color: "#02AF9B",
                                    fontSize: "1.8rem",
                                    marginRight: "1rem",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          fullWidth
                          className="tw-ml-2"
                          value={documentNumber}
                          error={!!documentNumberError}
                          helperText={documentNumberError}
                          onChange={(e) => setDocumentNumber(e.target.value)}
                        />
                      </div>

                      <div className="tw-flex tw-justify-between tw-mb-6">
                        <TextField
                          variant="standard"
                          label="Nombres"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon
                                  style={{
                                    color: "#02AF9B",
                                    fontSize: "1.8rem",
                                    marginRight: "1rem",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          fullWidth
                          className="tw-mr-2"
                          value={firstName}
                          error={!!firstNameError}
                          helperText={firstNameError}
                          onChange={(e) => setFirstName(e.target.value)}
                        />

                        <TextField
                          variant="standard"
                          label="Apellidos"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon
                                  style={{
                                    color: "#02AF9B",
                                    fontSize: "1.8rem",
                                    marginRight: "1rem",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          fullWidth
                          className="tw-ml-2"
                          value={lastName}
                          error={!!lastNameError}
                          helperText={lastNameError}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>

                      <div className="tw-flex tw-justify-between tw-mb-6">
                        <TextField
                          disabled={isExistingUser}
                          variant="standard"
                          label="Correo"
                          InputProps={{
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
                          fullWidth
                          className="tw-mr-2"
                          value={email}
                          error={!!emailError}
                          helperText={emailError}
                          onChange={(e) => setEmail(e.target.value)}
                          onCopy={(e) => e.preventDefault()}
                          onCut={(e) => e.preventDefault()}
                        />

                        <TextField
                          disabled={isExistingUser}
                          variant="standard"
                          label="Confirmar Correo"
                          InputProps={{
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
                          fullWidth
                          className="tw-ml-2"
                          value={confirmEmail}
                          error={!!confirmEmailError}
                          helperText={confirmEmailError}
                          onChange={(e) => setConfirmEmail(e.target.value)}
                          onCopy={(e) => e.preventDefault()}
                          onCut={(e) => e.preventDefault()}
                          onPaste={(e) => e.preventDefault()}
                        />
                      </div>

                      <div className="tw-flex tw-justify-between tw-mt-6">
                        <FormControl
                          variant="standard"
                          className="tw-mr-2"
                          sx={{ minWidth: 100 }}
                        >
                          <Select
                            variant="outlined"
                            className="tw-w-[100%] tw-text-center"
                            style={{ height: "48px" }}
                            required
                            value={phoneCode} // Asegura que el valor de phoneCode es "CO" inicialmente
                            id="outlined-required"
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 150,
                                },
                              },
                            }}
                            onChange={(e) => setPhoneCode(e.target.value)} // Actualiza el estado phoneCode
                            error={Boolean(errorPhoneCodeForm)}
                          >
                            {countriesData.map((country) => (
                              <MenuItem key={country.id} value={country.id}>
                                {" "}
                                {/* Usa el id del país como valor */}
                                <ReactCountryFlag
                                  countryCode={country.flag} // Muestra la bandera del país
                                  svg
                                  style={{ marginRight: "8px" }}
                                />
                                {country.code} {/* Muestra el indicativo */}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          disabled={isExistingUser}
                          variant="standard"
                          label="Número Celular"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon
                                  style={{
                                    color: "#02AF9B",
                                    fontSize: "1.8rem",
                                    marginRight: "1rem",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          fullWidth
                          className="tw-mb-6"
                          value={phoneNumber}
                          error={!!phoneNumberError}
                          helperText={phoneNumberError}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>

                      <TextField
                        disabled={isExistingUser}
                        variant="standard"
                        label="Dirección"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        className="tw-mb-6"
                        value={address}
                        error={!!addressError}
                        helperText={addressError}
                        onChange={(e) => setAddress(e.target.value)}
                      />

                      <div className="tw-flex tw-justify-between tw-mb-7 tw-mt-2">
                        <FormControl
                          fullWidth
                          variant="outlined"
                          className="tw-mr-2"
                        >
                          <InputLabel>País</InputLabel>
                          <Select
                            label="País"
                            className="tw-w-full"
                            value={country}
                            error={!!countryError}
                            onChange={(e) => handleChangeCountry(e)}
                          >
                            {countries &&
                              countries.map((country: any) => (
                                <MenuItem
                                  key={country.label}
                                  value={country.label}
                                >
                                  {country.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          fullWidth
                          variant="outlined"
                          className="tw-ml-2"
                        >
                          <InputLabel>Departamento</InputLabel>
                          <Select
                            label="Departamento"
                            className="tw-w-full"
                            value={state}
                            error={!!stateError}
                            onChange={handleChangeDepartament}
                          >
                            {departments &&
                              departments.map((dep: any) => (
                                <MenuItem
                                  key={dep.departamento}
                                  value={dep.departamento}
                                >
                                  {dep.departamento}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          fullWidth
                          variant="outlined"
                          className="tw-ml-2"
                        >
                          <InputLabel>Ciudad</InputLabel>
                          <Select
                            label="Ciudad"
                            className="tw-w-full"
                            value={city}
                            error={!!cityError}
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

                      <div className="tw-flex tw-justify-between tw-mb-2 tw-mt-2">
                        <FormControl
                          fullWidth
                          variant="outlined"
                          className="tw-mb-1"
                        >
                          <InputLabel>Estado</InputLabel>
                          <Select
                            label="Estado"
                            className="tw-w-full"
                            value={isActive ? "true" : "false"}
                            error={!!isActiveError}
                            onChange={(e) =>
                              setIsActive(e.target.value === "true")
                            }
                          >
                            <MenuItem value="true">Activo</MenuItem>
                            <MenuItem value="false">Inactivo</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </form>
                  </div>
                </div>
              ) : step === 2 ? (
                <div className="tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center overflow-y-auto tw-overflow-x-hidden">
                  <div className="tw-w-[90%] tw-h-[90%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                    <div className="tw-w-full tw-flex tw-items-center tw-justify-center tw-mb-9">
                      <h3>Agregar Plan</h3>
                    </div>
                    <div className="tw-w-full tw-flex tw-justify-end tw-mb-9">
                      <h6> Precio Venta</h6>
                    </div>
                    <form className="tw-w-full">


                      <div className="tw-flex tw-items-center tw-mb-6">
                        <div className="tw-w-[40%]">
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Plan</InputLabel>
                            <Select
                              label="Plan"
                              value={selectedPlan?.id || ''}
                              error={!!selectedPlanError}
                              //isChangePlan && selectedPlan
                              disabled={isExistingUser && !isChangePlan && selectedPlan?.id === 'VlkI6s5vYErO3rq3hg1D'}
                              onChange={(e) => {
                                updateDefaultPlan(e.target.value);
                              }}
                            >
                              {defaultPlans?.map((plan: any) => (
                                <MenuItem key={plan.id} value={plan.id}>
                                  {plan.name}
                                </MenuItem>
                              ))}
                            </Select>

                          </FormControl>
                        </div>
                        <div className="tw-flex tw-items-center tw-w-[60%] tw-justify-end">
                          <span className="tw-text-right">
                            ${formatPrice(isChangePlan ? selectedPlan?.price ?? 0 : 0)}
                          </span>
                        </div>
                      </div>

                      {/*   <div className="tw-flex tw-items-center tw-mb-6">
                        <div className="tw-w-[40%]">
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Plan</InputLabel>
                            <Select
                              label="Plan"
                              value={selectedPlan}
                              error={!!selectedPlanError}
                              onChange={(e) => { handleChangePlan(e.target.value) }}
                            >
                              <MenuItem value="standard">
                                {dictionary.dictionary?.backOffice.StandardPlan}
                              </MenuItem>
                              <MenuItem value="premium">
                                {dictionary.dictionary?.backOffice.PremiumPlan}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="tw-flex tw-items-center tw-w-[60%] tw-justify-end">

                        </div>
                      </div> */}


                      <div className="tw-flex tw-items-center tw-mb-6">
                        <div className="tw-w-[40%]">
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Combo</InputLabel>
                            <Select
                              label="Combo"
                              value={selectedCombo?.sku || ''}
                              error={!!selectedComboError}
                              onChange={(e) => {
                                const planValue = e.target.value;

                                if (!planValue) {
                                  updatePlan(null); // Limpiar selección
                                  return;
                                }

                                const selectedCombo =
                                  dataPlans?.find((combo: any) => combo.sku === planValue);
                                updatePlan(selectedCombo);
                              }}
                            >
                              <MenuItem value="">
                                <em>No aplica</em>
                              </MenuItem>

                              {dataPlans?.map((cat: any) => (
                                <MenuItem key={cat.name} value={cat.sku}>
                                  {cat.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="tw-flex tw-items-center tw-w-[60%] tw-justify-end">
                          <span className="tw-text-right">
                            ${formatPrice(selectedCombo?.full_price ?? 0)}
                          </span>
                        </div>
                      </div>

                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="tw-mb-6"
                      >
                        <div className="tw-flex tw-justify-between tw-mb-2 tw-mt-4">
                          <TextField
                            variant="standard"
                            label="Nombres"
                            disabled={isExistingUser && !isChangePlan}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon
                                    style={{
                                      color: "#02AF9B",
                                      fontSize: "1.8rem",
                                      marginRight: "1rem",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            fullWidth
                            className="tw-mr-2"
                            value={customName}
                            error={!!customNameError}
                            helperText={customNameError}
                            onChange={(e) => setCustomName(e.target.value)}
                          />

                          <TextField
                            variant="standard"
                            label="Cargo"
                            disabled={isExistingUser && !isChangePlan}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <WorkIcon
                                    style={{
                                      color: "#02AF9B",
                                      fontSize: "1.8rem",
                                      marginRight: "1rem",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            fullWidth
                            className="tw-ml-2"
                            value={customRole}
                            error={!!customRoleError}
                            helperText={customRoleError}
                            onChange={(e) => setCustomRole(e.target.value)}
                          />
                        </div>
                      </FormControl>

                      <div className="tw-flex tw-items-center tw-mb-6">
                        <div className="tw-w-[40%]">
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Material</InputLabel>
                            <Select
                              disabled={!isChangePlan}
                              label="Material"
                              value={selectedMaterial?.sku || ''}
                              error={!!selectedMaterialError}
                              onChange={(e) => {
                                const materialValue = e.target.value;
                                const selectedMaterial =
                                  dataMaterials &&
                                  dataMaterials.find(
                                    (mat) => mat.sku === materialValue
                                  );
                                updateMaterial(selectedMaterial);
                              }}
                            >
                              {dataMaterials &&
                                dataMaterials.map((cat: any) => (
                                  <MenuItem key={cat.name} value={cat.sku}>
                                    {cat.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="tw-w-[60%] tw-flex tw-justify-end">
                          <span className="tw-ml-10">
                            ${formatPrice(selectedMaterial?.full_price ?? 0)}
                          </span>
                        </div>
                      </div>
                      <div className="tw-flex tw-items-center tw-mb-6">
                        <div className="tw-w-[40%]">
                          <FormControl
                            fullWidth
                            variant="outlined"
                            className="tw-mb-6"
                          >
                            <InputLabel>Color</InputLabel>
                            <Select
                              disabled={!isChangePlan}
                              label="Color"
                              value={selectedColor}
                              error={!!selectedColorError}
                              onChange={(e) => {
                                const colorValue = e.target.value;
                                setSelectedColor(colorValue);
                                updateColor(colorValue);
                              }}
                            >
                              {dataColors &&
                                dataColors.map((cat: any) => (
                                  <MenuItem key={cat.name} value={cat.name}>
                                    {cat.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="tw-w-[60%]">
                          <span className="tw-ml-10"></span>
                        </div>
                      </div>

                      {/* <div className="tw-flex tw-items-center tw-mb-6">
                        <div className="tw-flex tw-items-center tw-w-[90%]">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={customization}
                                onChange={(e) =>
                                  updateCustomization(e.target.checked)
                                }
                                disabled={!selectedCombo || !isChangePlan}
                              />
                            }
                            label="¿Personalización?"
                          />
                        </div>
                        <div className="tw-flex tw-items-center tw-justify-end tw-w-full tw-bg-red">
                          <span className="tw-text-right">
                            $
                            {formatPrice(
                              selectedCustomization?.full_price ?? 0
                            )}
                          </span>
                        </div>
                      </div> */}

                      {/*   {customization && (
                        <FormControl
                          fullWidth
                          variant="outlined"
                          className="tw-mb-6"
                        >
                          <div className="tw-flex tw-justify-between tw-mb-2 tw-mt-4">
                            <TextField
                              variant="standard"
                              label="Nombres"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon
                                      style={{
                                        color: "#02AF9B",
                                        fontSize: "1.8rem",
                                        marginRight: "1rem",
                                      }}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              fullWidth
                              className="tw-mr-2"
                              value={customName}
                              error={!!customNameError}
                              helperText={customNameError}
                              onChange={(e) => setCustomName(e.target.value)}
                            />

                            <TextField
                              variant="standard"
                              label="Cargo"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <WorkIcon
                                      style={{
                                        color: "#02AF9B",
                                        fontSize: "1.8rem",
                                        marginRight: "1rem",
                                      }}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              fullWidth
                              className="tw-ml-2"
                              value={customRole}
                              error={!!customRoleError}
                              helperText={customRoleError}
                              onChange={(e) => setCustomRole(e.target.value)}
                            />
                          </div>
                        </FormControl>
                      )}
 */}
                      <div className="tw-flex tw-justify-end tw-mb-6">
                        <span className="tw-text-lg tw-font-semibold">
                          Total: ${formatPrice(total)}
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              ) : step === 3 ? (
                <div className="tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center overflow-y-auto tw-overflow-x-hidden">
                  <div className="tw-w-[90%] tw-h-[90%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                    <h3 className="tw-mb-9">Agregar Productos</h3>

                    <form className="tw-w-full">
                      <div className="tw-flex tw-mt-6 tw-mb-6">
                        <Autocomplete
                          fullWidth
                          options={filteredProducts || []}
                          getOptionLabel={(option) => {
                            return `${option.sku} - ${option.name}`;
                          }}
                          inputValue={product}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              const selectedSku = newValue.sku;
                              setProduct(selectedSku);
                            } else {
                              setProduct("");
                            }
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.sku === value?.sku
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Seleccionar Producto"
                              variant="outlined"
                            />
                          )}
                        />
                        <Button
                          className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2"
                          sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            "&:hover": {
                              backgroundColor: "transparent", // Desactiva el cambio de color al pasar el mouse
                            },
                          }}
                          style={{ textTransform: "none" }}
                          onClick={handleAddProduct}
                        >
                          <AddCircleRoundedIcon
                            style={{
                              marginBottom: 5,
                              fontSize: 30,
                              color: "#02AF9B",
                            }}
                          />
                          <Typography style={{ color: "#02AF9B" }}>
                            Agregar
                          </Typography>
                        </Button>
                      </div>

                      <div className="tw-mt-8 tw-mb-8">
                        <h4 className="tw-text-xl tw-font-semibold tw-mb-4">
                          Productos Agregados:
                        </h4>
                        {selectedProducts.length > 0 ? (
                          <table className="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-lg tw-table-auto tw-border-collapse">
                            <thead>
                              <tr className="tw-bg-gray-100">
                                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-l tw-border-t">
                                  SKU
                                </th>
                                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-t">
                                  Nombre
                                </th>
                                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-t">
                                  Cantidad
                                </th>
                                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-t">
                                  Precio Venta
                                </th>
                                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-t">
                                  {" "}
                                  Precio Distribuidor
                                </th>
                                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-t tw-border-r">
                                  Acciones
                                </th>
                                {/* <th className="tw-px-4 tw-py-2 tw-border-b tw-border-t tw-border-r">
                                  Personalización
                                </th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {selectedProducts.map((product, index) => (
                                <>
                                  <tr
                                    key={index}
                                    className="tw-border-b tw-border-l tw-border-r tw-border-t"
                                  >
                                    <td className="tw-px-4 tw-py-2 ">
                                      {product.sku}
                                    </td>
                                    <td className="tw-px-4 tw-py-2">
                                      {product.name}
                                    </td>
                                    <td className="tw-px-4 tw-py-2">
                                      <input
                                        type="number"
                                        value={product.id === "8Puz5Clemyh4hMIH1H2u" ? 1 : product.quantity || 1}
                                        min="1"
                                        className="tw-border tw-border-gray-300 tw-rounded tw-px-2 tw-w-16"
                                        disabled={product.id === "8Puz5Clemyh4hMIH1H2u"}
                                        onChange={(e) =>
                                          handleChangeQuantity(
                                            index,
                                            parseInt(e.target.value) || 1
                                          )
                                        }
                                      />
                                    </td>
                                    <td className="tw-px-4 tw-py-2">
                                      {formatPrice(
                                        product.totalPrice || product.full_price
                                      )}
                                    </td>
                                    <td className="tw-px-4 tw-py-2">
                                      {formatPrice(
                                        product.categoryPrice ||
                                        product.full_price
                                      )}
                                    </td>
                                    <td className="tw-py-2 tw-flex tw-justify-start tw-items-center">
                                      <DeleteIcon
                                        onClick={() =>
                                          handleRemoveProduct(index)
                                        }
                                        className="tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-10"
                                        fontSize="medium"
                                      />
                                    </td>
                                    {/*  <td className="tw-px-4">
                                      <div className="tw-flex tw-items-center">
                                        <Checkbox
                                          checked={product?.hasPersonalization}
                                          onClick={() =>
                                            togglePersonalization(index)
                                          }
                                          disabled={!product?.customStatus}
                                          className="tw-ml-2"
                                        />
                                        <span className="tw-ml-4 tw-text-lg">
                                          $
                                          {formatPrice(
                                            product?.full_price_custom || 0
                                          )}
                                        </span>
                                      </div>
                                    </td> */}
                                  </tr>
                                  {product.hasPersonalization && (
                                    <tr className="tw-border-b tw-border-l tw-border-r tw-border-t">
                                      <td
                                        colSpan={10}
                                        className="tw-px-4 tw-py-2"
                                      >
                                        <FormControl
                                          fullWidth
                                          variant="outlined"
                                          className="tw-mb-6 tw-mt-1"
                                        >
                                          <div className="tw-flex tw-justify-between tw-mb-2 tw-mt-4">
                                            <TextField
                                              variant="standard"
                                              label="Nombres"
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <PersonIcon
                                                      style={{
                                                        color: "#02AF9B",
                                                        fontSize: "1.8rem",
                                                        marginRight: "1rem",
                                                      }}
                                                    />
                                                  </InputAdornment>
                                                ),
                                              }}
                                              fullWidth
                                              className="tw-mr-2"
                                              error={
                                                !!errorMessages[index]
                                                  ?.customName
                                              }
                                              helperText={
                                                errorMessages[index]?.customName
                                              }
                                              value={product.customName}
                                              onChange={(e) =>
                                                handlePersonalizationChange(
                                                  index,
                                                  "customName",
                                                  e.target.value
                                                )
                                              } // Usar la función
                                            />

                                            <TextField
                                              variant="standard"
                                              label="Cargo"
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <WorkIcon
                                                      style={{
                                                        color: "#02AF9B",
                                                        fontSize: "1.8rem",
                                                        marginRight: "1rem",
                                                      }}
                                                    />
                                                  </InputAdornment>
                                                ),
                                              }}
                                              fullWidth
                                              className="tw-ml-2"
                                              error={
                                                !!errorMessages[index]
                                                  ?.customRole
                                              }
                                              helperText={
                                                errorMessages[index]?.customRole
                                              }
                                              value={product.customRole}
                                              onChange={(e) =>
                                                handlePersonalizationChange(
                                                  index,
                                                  "customRole",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </FormControl>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="tw-text-gray-500">
                            No hay productos agregados.
                          </p>
                        )}
                      </div>

                      <div className="tw-text-right tw-mb-4 tw-pr-14">
                        <span className="tw-text-lg tw-font-semibold">
                          Total: ${formatPrice(total)}
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              ) : step === 4 ? (
                <div className="tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center overflow-y-auto tw-overflow-x-hidden">
                  <div className="tw-w-[90%] tw-h-[98%] tw-flex-row tw-justify-center tw-justify-items-center tw-mt-4">
                    <h3 className="tw-mb-9">Resumen de Combos y Productos</h3>

                    {/* Tabla combinada para Combo, Materiales, Personalización y Productos */}
                    <TableContainer
                      component={Paper}
                      style={{
                        overflowY: "auto",
                        marginTop: "35px",
                        marginBottom: "30px",
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell className="tw-bg-gray-200 tw-font-bold">
                              Descripción
                            </TableCell>
                            <TableCell className="tw-bg-gray-200 tw-font-bold tw-text-center">
                              Cantidad
                            </TableCell>
                            <TableCell className="tw-bg-gray-200 tw-font-bold tw-text-right">
                              Precio Venta
                            </TableCell>
                            <TableCell className="tw-bg-gray-200 tw-font-bold tw-text-right">
                              Total
                            </TableCell>
                            <TableCell className="tw-bg-gray-200 tw-font-bold tw-text-right">
                              Precio Distribuidor
                            </TableCell>
                            <TableCell className="tw-bg-gray-200 tw-font-bold">
                              Acciones
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Mostrar Combo Seleccionado solo si existe */}
                          {selectedCombo && (
                            <TableRow>
                              <TableCell>
                                Combo Seleccionado: {selectedCombo.name}
                              </TableCell>
                              <TableCell className="tw-text-center">
                                1
                              </TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedCombo.full_price
                              )}`}</TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedCombo.full_price
                              )}`}</TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedCombo.finalPrice
                              )}`}</TableCell>
                              <TableCell className="tw-flex tw-justify-start tw-items-center">
                                <DeleteIcon
                                  onClick={() => clearSelectedPlan()}
                                  className="tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5"
                                  fontSize="medium"
                                />
                              </TableCell>
                            </TableRow>
                          )}

                          {/* Mostrar Materiales Seleccionados solo si existe */}
                          {selectedMaterial && (
                            <TableRow>
                              <TableCell>
                                Materiales Seleccionados:{" "}
                                {selectedMaterial.name}
                              </TableCell>
                              <TableCell className="tw-text-center">
                                1
                              </TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedMaterial.full_price
                              )}`}</TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedMaterial.full_price
                              )}`}</TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedMaterial.finalPrice
                              )}`}</TableCell>
                              <TableCell className="tw-flex tw-justify-start tw-items-center">
                                <DeleteIcon
                                  onClick={() => clearSelectedMaterial()}
                                  className="tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5"
                                  fontSize="medium"
                                />
                              </TableCell>
                            </TableRow>
                          )}

                          {/* Mostrar Personalización Seleccionada solo si existe */}
                          {selectedCustomization && (
                            <TableRow>
                              <TableCell>Personalización</TableCell>
                              <TableCell className="tw-text-center">
                                1
                              </TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedCustomization.full_price
                              )}`}</TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedCustomization.full_price
                              )}`}</TableCell>
                              <TableCell className="tw-text-right">{`$${formatPrice(
                                selectedCustomization.finalPrice
                              )}`}</TableCell>
                              <TableCell className="tw-flex tw-justify-start tw-items-center">
                                <DeleteIcon
                                  onClick={() => clearSelectedCustomization()}
                                  className="tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5"
                                  fontSize="medium"
                                />
                              </TableCell>
                            </TableRow>
                          )}

                          {/* Productos Agregados */}
                          {selectedProducts.length > 0
                            ? selectedProducts.map((product, index) => (
                              <>
                                <TableRow key={index}>
                                  <TableCell>{product.name}</TableCell>
                                  <TableCell className="tw-text-center">
                                    {product.quantity}
                                  </TableCell>
                                  <TableCell className="tw-text-right">
                                    ${formatPrice(product.full_price)}
                                  </TableCell>
                                  <TableCell className="tw-text-right">
                                    $
                                    {formatPrice(
                                      product.full_price * product.quantity
                                    )}
                                  </TableCell>
                                  <TableCell className="tw-text-right">
                                    ${formatPrice(product.categoryPrice)}
                                  </TableCell>
                                  <TableCell className="tw-flex tw-justify-start tw-items-center">
                                    <DeleteIcon
                                      onClick={() =>
                                        handleRemoveProduct(index)
                                      }
                                      className="tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5"
                                      fontSize="medium"
                                    />
                                  </TableCell>
                                </TableRow>
                                {product.hasPersonalization && (
                                  <TableRow>
                                    <TableCell className="tw-text-gray-600">
                                      Personalización: {product.name}
                                    </TableCell>
                                    <TableCell className="tw-text-gray-600 tw-text-center">
                                      1
                                    </TableCell>
                                    <TableCell className="tw-text-gray-600 tw-text-right">
                                      $
                                      {formatPrice(
                                        product?.full_price_custom || 0
                                      )}
                                    </TableCell>
                                    <TableCell className="tw-text-gray-600 tw-text-right">
                                      $
                                      {formatPrice(
                                        product?.full_price_custom || 0
                                      )}
                                    </TableCell>
                                    <TableCell className="tw-text-gray-600 tw-text-right">
                                      $
                                      {formatPrice(
                                        product?.full_price_Discount || 0
                                      )}
                                    </TableCell>
                                    <TableCell className="tw-flex tw-justify-start tw-items-center">
                                      <DeleteIcon
                                        className="tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5"
                                        fontSize="medium"
                                      />
                                    </TableCell>
                                  </TableRow>
                                )}
                              </>
                            ))
                            : null}
                        </TableBody>
                      </Table>

                      {/* Total acumulado debajo del Precio Distribuidor */}
                      <div className="tw-flex tw-w-[25%] tw-ml-auto tw-mt-5 tw-mb-3 tw-pr-8 tw-mr-12">
                        <span className="tw-text-lg tw-font-semibold">
                          SubTotal: ${formatPrice(total)}
                        </span>
                      </div>

                      <div className="tw-flex tw-w-[22%] tw-ml-auto tw-mt-5 tw-mb-3 tw-pr-8 tw-mr-12">
                        <span className="tw-text-lg tw-font-semibold">
                          Ahorro: ${formatPrice(total - totalSavings)}
                        </span>
                      </div>
                      <div className="tw-flex tw-w-[35%] tw-ml-auto tw-mt-5 tw-mb-3 tw-pr-8 tw-mr-12">
                        <span className="tw-text-lg tw-font-semibold">
                          Total con descuento: ${formatPrice(totalSavings)}
                        </span>
                      </div>
                    </TableContainer>
                  </div>
                </div>
              ) : (
                <div className="tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-lg tw-rounded-2xl tw-py-8 tw-px-10 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center">
                  <div className="tw-w-full tw-mb-0">
                    <h3 className="tw-mb-9">Datos del Comprador</h3>

                    {/* <h2 className='tw-text-xl tw-font-semibold tw-mb-7 tw-text-center tw-pt-1'></h2> */}
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-10">
                      <TextField
                        variant="standard"
                        label="Nombre"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        value={deliveryFirstName}
                        error={!!deliveryFirstNameError}
                        helperText={deliveryFirstNameError}
                        onChange={(e) => setDeliveryFirstName(e.target.value)}
                      />

                      <TextField
                        variant="standard"
                        label="Apellido"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        value={deliveryLastName}
                        error={!!deliveryLastNameError}
                        helperText={deliveryLastNameError}
                        onChange={(e) => setDeliveryLastName(e.target.value)}
                      />

                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Tipo de Identificación</InputLabel>
                        <Select
                          value={deliveryIdType}
                          onChange={(e) => setDeliveryIdType(e.target.value)}
                          label="Tipo de Identificación"
                          error={!!deliveryIdTypeError}
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
                        {deliveryIdTypeError && (
                          <p className="error-text">{deliveryIdTypeError}</p>
                        )}
                      </FormControl>

                      <TextField
                        variant="standard"
                        label="Número de Documento"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BadgeIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        value={deliveryIdNumber}
                        error={!!deliveryIdNumberError}
                        helperText={deliveryIdNumberError}
                        onChange={(e) => setDeliveryIdNumber(e.target.value)}
                      />

                      <TextField
                        variant="standard"
                        label="Teléfono"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        value={deliveryPhoneNumber}
                        error={!!deliveryPhoneNumberError}
                        helperText={deliveryPhoneNumberError}
                        onChange={(e) => setDeliveryPhoneNumber(e.target.value)}
                      />

                      <TextField
                        variant="standard"
                        label="Correo Electrónico"
                        InputProps={{
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
                        fullWidth
                        value={deliveryEmail}
                        error={!!deliveryEmailError}
                        helperText={deliveryEmailError}
                        onChange={(e) => setDeliveryEmail(e.target.value)}
                      />
                    </div>

                    <h3 className="tw-mb-9">Datos de la Dirección de Envío</h3>

                    {/* <h2 className='tw-text-xl tw-font-semibold tw-mb-7 tw-text-center tw-pt-1'>Datos de la Dirección de Envío</h2> */}
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-5">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>País</InputLabel>
                        <Select
                          value={countryDelivery}
                          label="País"
                          error={!!countryError}
                          onChange={(e) => handleChangeCountryDelivery(e)}
                        >
                          {countriesDelivery &&
                            countriesDelivery.map((country: any) => (
                              <MenuItem
                                key={country.label}
                                value={country.label}
                              >
                                {country.label}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Departamento/Estado</InputLabel>
                        <Select
                          value={stateDelivery}
                          label="Departamento/Estado"
                          error={!!shippingCityError}
                          onChange={handleChangeDepartamentDelivery}
                        >
                          {departmentsDelivery &&
                            departmentsDelivery.map((dep: any) => (
                              <MenuItem
                                key={dep.departamento}
                                value={dep.departamento}
                              >
                                {dep.departamento}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-8">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Ciudad</InputLabel>

                        <Select
                          value={cityDelivery}
                          onChange={handleChangeCityDelivery}
                          label="Departamento/Estado"
                          error={!!shippingStateError}
                        >
                          {citiesDelivery &&
                            citiesDelivery.map((city: any) => (
                              <MenuItem key={city} value={city}>
                                {city}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      <TextField
                        variant="standard"
                        label="Código Postal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        value={postalCode}
                        error={!!postalCodeError}
                        helperText={postalCodeError}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-8">
                      <TextField
                        variant="standard"
                        label="Dirección"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        value={addressDelivery}
                        error={!!addressDeliveryError}
                        helperText={addressDeliveryError}
                        onChange={(e) => setAddressDelivery(e.target.value)}
                        className="md:tw-col-span-2"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="tw-w-[95%] tw-py-4 tw-mb-2 tw-flex tw-flex-col tw-justify-center tw-items-center">
                <div className="tw-w-[94%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center">
                  <div className="tw-w-[50%] tw-h-[100%] tw-flex-row tw-justify-center tw-justify-items-center">
                    <Typography className="tw-text-white tw-w-full">
                      Paso {step}/5
                    </Typography>
                  </div>
                  <div className="tw-w-[50%] tw-h-[100%] tw-flex tw-justify-end tw-justify-items-center">
                    {step === 5 ? (
                      <>
                        <Button
                          variant="text"
                          className="tw-text-black tw-ml-6"
                          onClick={() => setStep(step - 1)}
                          sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                          startIcon={
                            <ArrowBackIosIcon
                              style={{
                                marginRight: -13,
                                fontSize: 25,
                                color: "white",
                              }}
                            />
                          }
                        >
                          <Typography style={{ color: "white" }}>
                            {dictionary.dictionary?.backOffice.backButton}
                          </Typography>
                        </Button>

                        <Button
                          variant="text"
                          className="tw-text-black tw-ml-6"
                          onClick={() => handleOpenModal()}
                          //onClick={() => handleNextStep(step)}

                          sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                          startIcon={
                            <PaymentIcon
                              style={{
                                marginRight: -1,
                                fontSize: 25,
                                color: "white",
                              }}
                            />
                          }
                        >
                          <Typography style={{ color: "white" }}>
                            {"Pagar"}
                          </Typography>
                        </Button>

                        <Button
                          variant="text"
                          className="tw-text-black tw-ml-6"
                          onClick={() => dataRegisterHandle(false)}
                          //onClick={() => handleNextStep(step)}

                          sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                          startIcon={
                            <PaymentIcon
                              style={{
                                marginRight: -1,
                                fontSize: 25,
                                color: "white",
                              }}
                            />
                          }
                        >
                          <Typography style={{ color: "white" }}>
                            {"Pagar Después"}
                          </Typography>
                        </Button>
                      </>
                    ) : (
                      <>
                        {step != 1 && (
                          <Button
                            variant="text"
                            className="tw-text-black tw-ml-6"
                            onClick={() => setStep(step - 1)}
                            sx={{
                              padding: "0",
                              minWidth: "auto",
                              textTransform: "none",
                              display: "flex",
                              alignItems: "center",
                            }}
                            startIcon={
                              <ArrowBackIosIcon
                                style={{
                                  marginRight: -13,
                                  fontSize: 25,
                                  color: "white",
                                }}
                              />
                            }
                          >
                            <Typography style={{ color: "white" }}>
                              {dictionary.dictionary?.backOffice.backButton}
                            </Typography>
                          </Button>
                        )}

                        <Button
                          variant="text"
                          className="tw-text-black tw-ml-6"
                          onClick={() => handleNextStep(step)}
                          sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                          endIcon={
                            <ArrowForwardIosIcon
                              style={{
                                marginLeft: -5,
                                fontSize: 25,
                                color: "white",
                              }}
                            />
                          }
                        >
                          <Typography style={{ color: "white" }}>
                            {dictionary.dictionary?.backOffice.nextButton}
                          </Typography>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Modal
                open={isModalOpen}
                onClose={() => handleCloseModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="tw-flex tw-justify-center tw-items-center"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#02AF9B",
                    padding: 0.5,
                    borderRadius: 3,
                    position: "relative",
                  }}
                >
                  <IconButton
                    className="tw-absolute tw-right-1 tw-top-1"
                    onClick={() => handleCloseModal()}
                  >
                    <Close className="tw-text-white" />
                  </IconButton>
                  <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-1 tw-mt-9 tw-mb-9 tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <div className="tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-5 tw-mt-1 tw-mb-1">
                        <div className="tw-w-full tw-grid tw-grid-cols-3 tw-grid-rows-3 tw-gap-1 tw-px-1 tw-mx-3 tw-my-3">
                          <div className="tw-w-full tw-flex tw-justify-starttw-items-center tw-col-span-3">
                            <Image
                              src="/images/Wompi.png"
                              alt="Imagen"
                              width={100}
                              height={60}
                            />
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 -tw-mt-10">
                            <h3 className="tw-mr-2">Pago</h3>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-0">
                            <div className="tw-w-[98%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center">
                              <TextField
                                variant="outlined"
                                label="Número de tarjeta"
                                className="tw-mr-0"
                                onChange={handleInputChange}
                                name="number"
                                fullWidth
                                inputProps={{ maxLength: 16 }}
                                disabled={loading}
                                error={!!cardNumberError}
                                helperText={cardNumberError}
                              />
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                              <TextField
                                variant="outlined"
                                label="CVC"
                                className=""
                                onChange={handleInputChange}
                                name="cvc"
                                fullWidth
                                inputProps={{ maxLength: 3 }}
                                disabled={loading}
                                error={!!cvcError}
                                helperText={cvcError}
                              />
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                              <FormControl
                                className="tw-mr-0"
                                fullWidth
                                disabled={loading}
                              >
                                <InputLabel id="month-label">
                                  Mes de expiración{" "}
                                </InputLabel>
                                <Select
                                  label="Mes de expiración"
                                  className="tw-w-full"
                                  onChange={handleInputChange}
                                  name="exp_month"
                                  error={!!expMonthError}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 180,
                                      },
                                    },
                                  }}
                                >
                                  {Array.from({ length: 12 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                      {String(i + 1).padStart(2, "0")}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                              <FormControl
                                className="tw-mr-0"
                                fullWidth
                                disabled={loading}
                              >
                                <InputLabel id="year-label">
                                  Año de expiración{" "}
                                </InputLabel>
                                <Select
                                  label="Tipo de Documento"
                                  className="tw-w-full"
                                  onChange={handleInputChange}
                                  name="exp_year"
                                  error={!!expYearError}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 180,
                                      },
                                    },
                                  }}
                                >
                                  {Array.from({ length: 10 }, (_, i) => (
                                    <MenuItem
                                      key={new Date().getFullYear() + i}
                                      value={new Date().getFullYear() + i}
                                    >
                                      {(new Date().getFullYear() + i)
                                        .toString()
                                        .slice(-2)}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                              <TextField
                                variant="outlined"
                                label="Nombre del titular"
                                onChange={handleInputChange}
                                name="card_holder"
                                fullWidth
                                disabled={loading}
                                error={!!cardHolderError}
                                helperText={cardHolderError}
                              />
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                              <FormControl
                                className="tw-mr-0"
                                fullWidth
                                disabled={loading}
                              >
                                <InputLabel id="year-label">Cuotas</InputLabel>
                                <Select
                                  label="Cuotas"
                                  name="installments"
                                  value={cardInfo.installments}
                                  onChange={handleInputChange}
                                  error={!!installmentsError}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 180,
                                      },
                                    },
                                  }}
                                >
                                  {Array.from({ length: 24 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                              <FormControl
                                className="tw-mr-0"
                                fullWidth
                                disabled={loading}
                              >
                                <InputLabel id="year-label">
                                  Tipo de Identificación
                                </InputLabel>
                                <Select
                                  label="Tipo de Documento "
                                  className="tw-w-full"
                                  name="idType"
                                  value={cardInfo.idType}
                                  onChange={handleInputChange}
                                  error={!!idTypeError}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 180,
                                      },
                                    },
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
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                              <TextField
                                variant="outlined"
                                label="Número de Identificación"
                                name="idNumber"
                                fullWidth
                                value={cardInfo.idNumber}
                                onChange={handleInputChange}
                                error={!!idNumberError}
                                helperText={idNumberError}
                              />
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-mt-4">
                            <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-start tw-items-start tw-mt-0">
                              <FormControl>
                                <FormControlLabel
                                  control={<Checkbox onChange={handleAccept} />}
                                  label="Acepto los términos y condiciones"
                                />
                                {termsError && (
                                  <p
                                    style={{
                                      boxSizing: "border-box",
                                      color: "rgb(211, 47, 47)",
                                      display: "block",
                                      fontFamily:
                                        "Roboto, Helvetica, Arial, sans-serif",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      height: "19.9062px",
                                      letterSpacing: "0.39996px",
                                      lineHeight: "19.92px",
                                      marginBlockEnd: "0px",
                                      marginBlockStart: "3px",
                                      marginBottom: "0px",
                                      marginInlineEnd: "14px",
                                      marginInlineStart: "14px",
                                      marginLeft: "14px",
                                      marginRight: "14px",
                                      marginTop: "3px",
                                      textAlign: "left",
                                      textSizeAdjust: "100%",
                                      unicodeBidi: "isolate",
                                      width: "281.906px",
                                      WebkitTapHighlightColor:
                                        "rgba(0, 0, 0, 0)",
                                    }}
                                  >
                                    {termsError}
                                  </p>
                                )}
                              </FormControl>
                            </div>
                          </div>

                          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-4 tw-mb-4">
                            <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                              <div className="tw-flex tw-justify-center text-red-500">
                                {loading ? (
                                  <CircularProgress />
                                ) : (
                                  <button
                                    className="tw-bg-teal-500 tw-text-white tw-py-2 tw-px-4 tw-rounded"
                                    //disabled={!isAccepted}
                                    onClick={handlePayment}
                                  >
                                    Procesar Pago
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomersCreateForm;
