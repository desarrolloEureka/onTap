
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
    Autocomplete
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import BadgeIcon from '@mui/icons-material/Badge';
import CustomersCreateFormHook from "./hooks/CustomersCreateFormHook";
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReactCountryFlag from "react-country-flag";
import { countries as countriesData } from '../../globals/constants'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import PaymentIcon from '@mui/icons-material/Payment';

const CustomersCreateForm = () => {
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
        selectedPlanError,
        selectedMaterialError,
        selectedCustomizationError,
        selectedColorError,
        customNameError,
        customRoleError,
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
        expiryDateError,
        setExpiryDateError,
        cvvError,
        setCvvError,
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
        data
    } = CustomersCreateFormHook();
    const dictionary = useDictionary({ lang: 'es' });

    return (
        <>
            <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
                <div className='tw-mt-3 tw-shadow-m tw-rounded-2xl tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5'>
                    <Typography
                        className='tw-text-black tw-w-full'
                        variant='h6'
                        color='textPrimary'
                        display={'flow'}
                        align='center'
                        fontWeight='bold'
                    >
                        {/*  {dictionary.dictionary?.backOffice?.LabelCustomersDistributor} */}
                    </Typography>

                    <div style={{ width: '100%' }} className='tw-shadow-m tw-rounded-2xl tw-m-4 tw-mt-7 tw-min-h-[68vh]'>
                        <Container className='tw-bg-[#02AF9B] tw-shadow-m tw-rounded-2xl tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-2'>
                            {step === 1 ?
                                <div className='tw-w-[95%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                    <div className='tw-w-[90%] tw-h-[90%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5'>

                                        <h3 className='tw-mb-9'>Información Personal</h3>

                                        <form className='tw-w-full'>
                                            <div className='tw-flex tw-justify-between tw-mb-5'>
                                                <FormControl fullWidth variant='outlined' className='tw-mr-2'>
                                                    <InputLabel>Tipo de Documento</InputLabel>
                                                    <Select
                                                        label='Tipo de Documento'
                                                        className='tw-w-full'
                                                        value={documentType}
                                                        error={
                                                            !!documentTypeError
                                                        }
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
                                                    variant='standard'
                                                    label='Número Documento'
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>
                                                                <BadgeIcon
                                                                    style={{
                                                                        color: '#02AF9B',
                                                                        fontSize: '1.8rem',
                                                                        marginRight: '1rem',
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                    className='tw-ml-2'
                                                    value={documentNumber}
                                                    error={!!documentNumberError}
                                                    helperText={documentNumberError}
                                                    onChange={(e) => setDocumentNumber(e.target.value)}
                                                />
                                            </div>

                                            <div className='tw-flex tw-justify-between tw-mb-6'>
                                                <TextField
                                                    variant='standard'
                                                    label='Nombres'
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>
                                                                <PersonIcon
                                                                    style={{
                                                                        color: '#02AF9B',
                                                                        fontSize: '1.8rem',
                                                                        marginRight: '1rem',
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                    className='tw-mr-2'
                                                    value={firstName}
                                                    error={!!firstNameError}
                                                    helperText={firstNameError}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />

                                                <TextField
                                                    variant='standard'
                                                    label='Apellidos'
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>
                                                                <PersonIcon
                                                                    style={{
                                                                        color: '#02AF9B',
                                                                        fontSize: '1.8rem',
                                                                        marginRight: '1rem',
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                    className='tw-ml-2'
                                                    value={lastName}
                                                    error={!!lastNameError}
                                                    helperText={lastNameError}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>

                                            <div className='tw-flex tw-justify-between tw-mb-6'>
                                                <TextField
                                                    variant='standard'
                                                    label='Correo'
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>
                                                                <EmailIcon
                                                                    style={{
                                                                        color: '#02AF9B',
                                                                        fontSize: '1.8rem',
                                                                        marginRight: '1rem',
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                    className='tw-mr-2'
                                                    value={email}
                                                    error={!!emailError}
                                                    helperText={emailError}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onCopy={(e) => e.preventDefault()}  // Bloquea copiar
                                                    onCut={(e) => e.preventDefault()}   // Bloquea cortar
                                                />

                                                <TextField
                                                    variant='standard'
                                                    label='Confirmar Correo'
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>
                                                                <EmailIcon
                                                                    style={{
                                                                        color: '#02AF9B',
                                                                        fontSize: '1.8rem',
                                                                        marginRight: '1rem',
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                    className='tw-ml-2'
                                                    value={confirmEmail}
                                                    error={!!confirmEmailError}
                                                    helperText={confirmEmailError}
                                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                                    onCopy={(e) => e.preventDefault()}
                                                    onCut={(e) => e.preventDefault()}
                                                    onPaste={(e) => e.preventDefault()}
                                                />
                                            </div>

                                            <div className='tw-flex tw-justify-between tw-mt-6'>
                                                <FormControl variant='standard' className='tw-mr-2' sx={{ minWidth: 100 }}>
                                                    <Select
                                                        variant='outlined'
                                                        className='tw-w-[100%] tw-text-center'
                                                        style={{ height: '48px' }}
                                                        required
                                                        value={phoneCode}
                                                        id='outlined-required'
                                                        defaultValue=''
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 150,
                                                                },
                                                            },
                                                        }}
                                                        onChange={(e) => setPhoneCode(e.target.value)}
                                                        error={Boolean(errorPhoneCodeForm)}
                                                    >
                                                        {countriesData.map((country) => (
                                                            <MenuItem key={country.id} value={country.id}>
                                                                <ReactCountryFlag countryCode={country.flag} svg style={{ marginRight: '8px' }} />
                                                                {country.code}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <TextField
                                                    variant='standard'
                                                    label='Número Celular'
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>
                                                                <PhoneIcon
                                                                    style={{
                                                                        color: '#02AF9B',
                                                                        fontSize: '1.8rem',
                                                                        marginRight: '1rem',
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    fullWidth
                                                    className='tw-mb-6'
                                                    value={phoneNumber}
                                                    error={!!phoneNumberError}
                                                    helperText={phoneNumberError}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </div>

                                            <TextField
                                                variant='standard'
                                                label='Dirección'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <BusinessIcon
                                                                style={{
                                                                    color: '#02AF9B',
                                                                    fontSize: '1.8rem',
                                                                    marginRight: '1rem',
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                fullWidth
                                                className='tw-mb-6'
                                                value={address}
                                                error={!!addressError}
                                                helperText={addressError}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />

                                            <div className='tw-flex tw-justify-between tw-mb-7 tw-mt-2'>
                                                <FormControl fullWidth variant='outlined' className='tw-mr-2'>
                                                    <InputLabel>País</InputLabel>
                                                    <Select
                                                        label='País'
                                                        className='tw-w-full'
                                                        value={country}
                                                        error={
                                                            !!countryError
                                                        }
                                                        onChange={(e) => handleChangeCountry(e)}
                                                    >
                                                        {countries && countries.map((country: any) => (
                                                            <MenuItem key={country.label} value={country.label}>
                                                                {country.label}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>

                                                <FormControl fullWidth variant='outlined' className='tw-ml-2'>
                                                    <InputLabel>Departamento</InputLabel>
                                                    <Select
                                                        label='Departamento'
                                                        className='tw-w-full'
                                                        value={state}
                                                        error={
                                                            !!stateError
                                                        }
                                                        onChange={handleChangeDepartament}
                                                    >
                                                        {departments && departments.map((dep: any) => (
                                                            <MenuItem key={dep.departamento} value={dep.departamento}>
                                                                {dep.departamento}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <FormControl fullWidth variant='outlined' className='tw-ml-2'>
                                                    <InputLabel>Ciudad</InputLabel>
                                                    <Select
                                                        label='Ciudad'
                                                        className='tw-w-full'
                                                        value={city}
                                                        error={
                                                            !!cityError
                                                        }
                                                        onChange={handleChangeCity}
                                                    >
                                                        {cities && cities.map((city: any) => (
                                                            <MenuItem key={city} value={city}>
                                                                {city}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div className='tw-flex tw-justify-between tw-mb-2 tw-mt-2'>
                                                <FormControl fullWidth variant='outlined' className='tw-mb-1'>
                                                    <InputLabel>Estado</InputLabel>
                                                    <Select
                                                        label='Estado'
                                                        className='tw-w-full'
                                                        value={isActive ? "true" : "false"}
                                                        error={!!isActiveError}
                                                        onChange={(e) => setIsActive(e.target.value === "true")}
                                                    >
                                                        <MenuItem value='true'>Activo</MenuItem>
                                                        <MenuItem value='false'>Inactivo</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                :
                                step === 2 ?
                                    <div className='tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center overflow-y-auto tw-overflow-x-hidden'>
                                        <div className='tw-w-[90%] tw-h-[90%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5'>

                                            <div className='tw-flex tw-items-center tw-mb-9'>
                                                <div className='tw-flex tw-items-center tw-w-[50%]'>
                                                    <h3>Agregar Plan</h3>
                                                </div>
                                                <div className='tw-flex tw-items-end tw-justify-end tw-w-[50%]'>
                                                    <h6> Precio Venta</h6>
                                                </div>
                                            </div>


                                            <form className='tw-w-full'>
                                                <div className="tw-flex tw-items-center tw-mb-6">
                                                    <div className="tw-flex tw-items-center tw-w-[90%]">
                                                        <FormControl fullWidth variant='outlined'>
                                                            <InputLabel>Plan</InputLabel>
                                                            <Select
                                                                label='Plan'
                                                                value={selectedPlan?.sku}
                                                                error={!!selectedPlanError}
                                                                onChange={(e) => {
                                                                    const planValue = e.target.value;
                                                                    const selectedPlan = dataPlans && dataPlans.find(plan => plan.sku === planValue);
                                                                    updatePlan(selectedPlan);
                                                                }}
                                                            >
                                                                {dataPlans && dataPlans.map((cat: any) => (
                                                                    <MenuItem key={cat.name} value={cat.sku}>
                                                                        {cat.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="tw-flex tw-items-center tw-w-[10%] tw-bg-red">
                                                        <span className="tw-ml-10">${formatPrice(selectedPlan?.full_price ?? 0)}</span>
                                                    </div>
                                                </div>

                                                <div className="tw-flex tw-items-center tw-mb-6">
                                                    <div className="tw-flex tw-items-center tw-w-[90%]">
                                                        <FormControl fullWidth variant='outlined'>
                                                            <InputLabel>Material</InputLabel>
                                                            <Select
                                                                label='Material'
                                                                value={selectedMaterial?.sku}
                                                                error={
                                                                    !!selectedMaterialError
                                                                }
                                                                onChange={(e) => {
                                                                    const materialValue = e.target.value;
                                                                    const selectedMaterial = dataMaterials && dataMaterials.find(mat => mat.sku === materialValue);
                                                                    updateMaterial(selectedMaterial);
                                                                }}
                                                            >
                                                                {dataMaterials && dataMaterials.map((cat: any) => (
                                                                    <MenuItem key={cat.name} value={cat.sku}>
                                                                        {cat.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <span className="tw-ml-10">${formatPrice(selectedMaterial?.full_price ?? 0)} </span>
                                                </div>

                                                <div className="tw-flex tw-items-center tw-mb-6">
                                                    <div className="tw-flex tw-items-center tw-w-[90%]">
                                                        <FormControl fullWidth variant='outlined' className='tw-mb-6'>
                                                            <InputLabel>Color</InputLabel>
                                                            <Select
                                                                label='Color'
                                                                value={selectedColor}
                                                                error={
                                                                    !!selectedColorError
                                                                }
                                                                onChange={(e) => {
                                                                    const colorValue = e.target.value;
                                                                    setSelectedColor(colorValue)
                                                                    updateColor(colorValue);
                                                                }}
                                                            >
                                                                {dataColors && dataColors.map((cat: any) => (
                                                                    <MenuItem key={cat.name} value={cat.name}>
                                                                        {cat.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>

                                                    </div>
                                                    <span className="tw-ml-10"></span>
                                                </div>

                                                <div className="tw-flex tw-items-center tw-mb-6">
                                                    <div className="tw-flex tw-items-center tw-w-[90%]">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={customization}
                                                                    onChange={(e) => updateCustomization(e.target.checked)}
                                                                    disabled={!selectedPlan}
                                                                />
                                                            }
                                                            label="¿Personalización?"
                                                        />
                                                    </div>
                                                    <div className="tw-flex tw-items-center tw-w-[10%] tw-bg-red">
                                                        <span className="tw-ml-10">${formatPrice(selectedCustomization?.full_price ?? 0)}</span>
                                                    </div>
                                                </div>

                                                {customization && (
                                                    <FormControl fullWidth variant='outlined' className='tw-mb-6'>
                                                        <div className='tw-flex tw-justify-between tw-mb-2 tw-mt-4'>
                                                            <TextField
                                                                variant='standard'
                                                                label='Nombres'
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position='start'>
                                                                            <PersonIcon
                                                                                style={{
                                                                                    color: '#02AF9B',
                                                                                    fontSize: '1.8rem',
                                                                                    marginRight: '1rem',
                                                                                }}
                                                                            />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                fullWidth
                                                                className='tw-mr-2'
                                                                value={customName}
                                                                error={!!customNameError}
                                                                helperText={customNameError}
                                                                onChange={(e) => setCustomName(e.target.value)}
                                                            />

                                                            <TextField
                                                                variant='standard'
                                                                label='Cargo'
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position='start'>
                                                                            <WorkIcon
                                                                                style={{
                                                                                    color: '#02AF9B',
                                                                                    fontSize: '1.8rem',
                                                                                    marginRight: '1rem',
                                                                                }}
                                                                            />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                fullWidth
                                                                className='tw-ml-2'
                                                                value={customRole}
                                                                error={!!customRoleError}
                                                                helperText={customRoleError}
                                                                onChange={(e) => setCustomRole(e.target.value)}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                )}

                                                <div className='tw-text-right tw-mb-4 tw-pr-14'>
                                                    <span className="tw-text-lg tw-font-semibold">Total: ${formatPrice(total)}</span>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    :
                                    step === 3 ?
                                        <div className='tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center overflow-y-auto tw-overflow-x-hidden'>
                                            <div className='tw-w-[90%] tw-h-[90%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5'>

                                                <h3 className='tw-mb-9'>Agregar Productos</h3>

                                                <form className='tw-w-full'>
                                                    <div className='tw-flex tw-mt-6 tw-mb-6'>
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
                                                                    setProduct('');
                                                                }
                                                            }}
                                                            isOptionEqualToValue={(option, value) => option.sku === value?.sku}
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Seleccionar Producto" variant="outlined" />
                                                            )}
                                                        />
                                                        <Button
                                                            variant='contained'
                                                            color='primary'
                                                            onClick={handleAddProduct}
                                                            className='tw-ml-2'
                                                        >
                                                            Agregar
                                                        </Button>
                                                    </div>

                                                    <div className='tw-mt-8 tw-mb-8'>
                                                        <h4 className='tw-text-xl tw-font-semibold tw-mb-4'>Productos Agregados:</h4>
                                                        {selectedProducts.length > 0 ? (
                                                            <table className='tw-w-full tw-bg-white tw-rounded-lg tw-shadow-lg tw-table-auto tw-border-collapse'>
                                                                <thead>
                                                                    <tr className='tw-bg-gray-100'>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-l tw-border-t'>SKU</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Nombre</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Cantidad</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Precio Venta</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Precio Categoría ({data && data?.category})</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Acciones</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t tw-border-r'>Personalización</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {selectedProducts.map((product, index) => (
                                                                        <>
                                                                            <tr key={index} className='tw-border-b tw-border-l tw-border-r tw-border-t'>
                                                                                <td className='tw-px-4 tw-py-2 '>{product.sku}</td>
                                                                                <td className='tw-px-4 tw-py-2'>{product.name}</td>
                                                                                <td className='tw-px-4 tw-py-2'>
                                                                                    <input
                                                                                        type='number'
                                                                                        value={product.quantity || 1}
                                                                                        min='1'
                                                                                        className='tw-border tw-border-gray-300 tw-rounded tw-px-2 tw-w-16'
                                                                                        onChange={(e) => handleChangeQuantity(index, parseInt(e.target.value) || 1)}
                                                                                    />
                                                                                </td>
                                                                                <td className='tw-px-4 tw-py-2'>{formatPrice(product.totalPrice || product.full_price)}</td>
                                                                                <td className='tw-px-4 tw-py-2'>{formatPrice(product.categoryPrice || product.full_price)}</td>
                                                                                <td className='tw-py-2 tw-flex tw-justify-start tw-items-center'>
                                                                                    <DeleteIcon
                                                                                        onClick={() => handleRemoveProduct(index)}
                                                                                        className='tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-10'
                                                                                        fontSize="medium"
                                                                                    />
                                                                                </td>
                                                                                <td className='tw-px-4'>
                                                                                    <Checkbox
                                                                                        checked={product?.hasPersonalization}
                                                                                        onClick={() => togglePersonalization(index)}
                                                                                        disabled={!product?.customStatus}
                                                                                        className="tw-ml-8"
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                            {product.hasPersonalization && (
                                                                                <tr className='tw-border-b tw-border-l tw-border-r tw-border-t'>
                                                                                    <td colSpan={10} className='tw-px-4 tw-py-2'>
                                                                                        <FormControl fullWidth variant='outlined' className='tw-mb-6 tw-mt-1'>
                                                                                            <div className='tw-flex tw-justify-between tw-mb-2 tw-mt-4'>
                                                                                                <TextField
                                                                                                    variant='standard'
                                                                                                    label='Nombres'
                                                                                                    InputProps={{
                                                                                                        startAdornment: (
                                                                                                            <InputAdornment position='start'>
                                                                                                                <PersonIcon
                                                                                                                    style={{
                                                                                                                        color: '#02AF9B',
                                                                                                                        fontSize: '1.8rem',
                                                                                                                        marginRight: '1rem',
                                                                                                                    }}
                                                                                                                />
                                                                                                            </InputAdornment>
                                                                                                        ),
                                                                                                    }}
                                                                                                    fullWidth
                                                                                                    className='tw-mr-2'
                                                                                                    value={product.customName}
                                                                                                    onChange={(e) => handlePersonalizationChange(index, 'customName', e.target.value)} // Usar la función

                                                                                                />

                                                                                                <TextField
                                                                                                    variant='standard'
                                                                                                    label='Cargo'
                                                                                                    InputProps={{
                                                                                                        startAdornment: (
                                                                                                            <InputAdornment position='start'>
                                                                                                                <WorkIcon
                                                                                                                    style={{
                                                                                                                        color: '#02AF9B',
                                                                                                                        fontSize: '1.8rem',
                                                                                                                        marginRight: '1rem',
                                                                                                                    }}
                                                                                                                />
                                                                                                            </InputAdornment>
                                                                                                        ),
                                                                                                    }}
                                                                                                    fullWidth
                                                                                                    className='tw-ml-2'
                                                                                                    value={product.customRole}
                                                                                                    onChange={(e) => handlePersonalizationChange(index, 'customRole', e.target.value)}
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
                                                            <p className='tw-text-gray-500'>No hay productos agregados.</p>
                                                        )}
                                                    </div>

                                                    {/* <div className='tw-mt-8 tw-mb-8'>
                                                        <h4 className='tw-text-xl tw-font-semibold tw-mb-4'>Productos Agregados:</h4>
                                                        {selectedProducts.length > 0 ? (
                                                            <table className='tw-w-full tw-bg-white tw-rounded-lg tw-shadow-lg tw-table-auto tw-border-collapse'>
                                                                <thead>
                                                                    <tr className='tw-bg-gray-100'>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-l tw-border-t'>SKU</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Nombre</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Cantidad</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Precio Venta</th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t'>Precio Categoría ({data && data?.category})                                                                       </th>
                                                                        <th className='tw-px-4 tw-py-2 tw-border-b tw-border-t tw-border-r '>Acciones</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {selectedProducts.map((product, index) => (
                                                                        <tr key={index} className='tw-border-b tw-border-l tw-border-r tw-border-t'>
                                                                            <td className='tw-px-4 tw-py-2 '>{product.sku}</td>
                                                                            <td className='tw-px-4 tw-py-2'>{product.name}</td>
                                                                            <td className='tw-px-4 tw-py-2'>
                                                                                <input
                                                                                    type='number'
                                                                                    value={product.quantity || 1}
                                                                                    min='1'
                                                                                    className='tw-border tw-border-gray-300 tw-rounded tw-px-2 tw-w-16'
                                                                                    onChange={(e) => handleChangeQuantity(index, parseInt(e.target.value) || 1)}
                                                                                />
                                                                            </td>
                                                                            <td className='tw-px-4 tw-py-2'>{formatPrice(product.totalPrice || product.full_price)}</td>
                                                                            <td className='tw-px-4 tw-py-2'>{formatPrice(product.categoryPrice || product.full_price)}</td>
                                                                            <td className='tw-py-2 tw-flex tw-justify-start tw-items-center'>
                                                                                <DeleteIcon
                                                                                    onClick={() => handleRemoveProduct(index)}
                                                                                    className='tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-10'
                                                                                    fontSize="medium"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        ) : (
                                                            <p className='tw-text-gray-500'>No hay productos agregados.</p>
                                                        )}
                                                    </div> */}


                                                    <div className='tw-text-right tw-mb-4 tw-pr-14'>
                                                        <span className="tw-text-lg tw-font-semibold">Total: ${formatPrice(total)}</span>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                        :
                                        step === 4 ?
                                            <div className='tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center overflow-y-auto tw-overflow-x-hidden'>
                                                <div className='tw-w-[90%] tw-h-[98%] tw-flex-row tw-justify-center tw-justify-items-center tw-mt-4'>
                                                    <h3 className='tw-mb-9'>Resumen de Planes y Productos</h3>

                                                    {/* Tabla combinada para Plan, Materiales, Personalización y Productos */}
                                                    <TableContainer component={Paper} style={{ overflowY: 'auto', marginTop: '35px', marginBottom: '30px' }}>
                                                        <Table stickyHeader>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Descripción</TableCell>
                                                                    <TableCell>Cantidad</TableCell>
                                                                    <TableCell>Precio Venta</TableCell>
                                                                    <TableCell>Total</TableCell>
                                                                    <TableCell>Precio Categoría ({data && data?.category})</TableCell>
                                                                    <TableCell>Acciones</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {/* Mostrar Plan Seleccionado solo si existe */}
                                                                {selectedPlan && (
                                                                    <TableRow>
                                                                        <TableCell>Plan Seleccionado: {selectedPlan.name}</TableCell>
                                                                        <TableCell>1</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedPlan.full_price)}`}</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedPlan.full_price)}`}</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedPlan.finalPrice)}`}</TableCell>
                                                                        <TableCell className='tw-flex tw-justify-start tw-items-center'>
                                                                            <DeleteIcon
                                                                                onClick={() => clearSelectedPlan()}
                                                                                className='tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5'
                                                                                fontSize="medium"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )}

                                                                {/* Mostrar Materiales Seleccionados solo si existe */}
                                                                {selectedMaterial && (
                                                                    <TableRow>
                                                                        <TableCell>Materiales Seleccionados: {selectedMaterial.name}</TableCell>
                                                                        <TableCell>1</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedMaterial.full_price)}`}</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedMaterial.full_price)}`}</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedMaterial.finalPrice)}`}</TableCell>
                                                                        <TableCell className='tw-flex tw-justify-start tw-items-center'>
                                                                            <DeleteIcon
                                                                                onClick={() => clearSelectedMaterial()}
                                                                                className='tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5'
                                                                                fontSize="medium"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )}

                                                                {/* Mostrar Personalización Seleccionada solo si existe */}
                                                                {selectedCustomization && (
                                                                    <TableRow>
                                                                        <TableCell>Personalización</TableCell>
                                                                        <TableCell>1</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedCustomization.full_price)}`}</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedCustomization.full_price)}`}</TableCell>
                                                                        <TableCell>{`$${formatPrice(selectedCustomization.finalPrice)}`}</TableCell>
                                                                        <TableCell className='tw-flex tw-justify-start tw-items-center'>
                                                                            <DeleteIcon
                                                                                onClick={() => clearSelectedCustomization()}
                                                                                className='tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5'
                                                                                fontSize="medium"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )}

                                                                {/* Productos Agregados */}
                                                                {selectedProducts.length > 0 ? (
                                                                    selectedProducts.map((product, index) => (
                                                                        <>
                                                                            <TableRow key={index}>
                                                                                <TableCell>{product.name}</TableCell>
                                                                                <TableCell>{product.quantity}</TableCell>
                                                                                <TableCell>${formatPrice(product.full_price)}</TableCell>
                                                                                <TableCell>${formatPrice(product.full_price * product.quantity)}</TableCell>
                                                                                <TableCell>${formatPrice(product.categoryPrice)}</TableCell>
                                                                                <TableCell className='tw-flex tw-justify-start tw-items-center'>
                                                                                    <DeleteIcon
                                                                                        onClick={() => handleRemoveProduct(index)}
                                                                                        className='tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5'
                                                                                        fontSize="medium"
                                                                                    />
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            {product.hasPersonalization && (
                                                                                <TableRow>
                                                                                    <TableCell className='tw-text-gray-600'>Personalización: {product.name} </TableCell>
                                                                                    <TableCell className='tw-text-gray-600'>1</TableCell>
                                                                                    <TableCell className='tw-text-gray-600'>${formatPrice(product?.full_price_custom || 0)}</TableCell>
                                                                                    <TableCell className='tw-text-gray-600'>${formatPrice(product?.full_price_custom || 0)}</TableCell>
                                                                                    <TableCell className='tw-text-gray-600'>${formatPrice(product?.full_price_Discount || 0)}</TableCell>
                                                                                    <TableCell className='tw-flex tw-justify-start tw-items-center'>
                                                                                        <DeleteIcon
                                                                                            //onClick={() => handleRemoveProduct(index)}
                                                                                            className='tw-cursor-pointer tw-text-red-500 hover:tw-text-red-600 tw-transition tw-ml-5'
                                                                                            fontSize="medium"
                                                                                        />
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            )}
                                                                        </>
                                                                    ))
                                                                ) : (
                                                                    null
                                                                )}
                                                            </TableBody>
                                                        </Table>

                                                        {/* Total acumulado */}
                                                        <div className='tw-text-right tw-mt-5 tw-mb-3 tw-pr-7'>
                                                            <span className="tw-text-lg tw-font-semibold">SubTotal: ${formatPrice(total)}</span>
                                                        </div>
                                                        <div className='tw-text-right tw-mt-5 tw-mb-3 tw-pr-7'>
                                                            <span className="tw-text-lg tw-font-semibold">Ahorro: ${formatPrice(total - totalSavings)}</span>
                                                        </div>
                                                        <div className='tw-text-right tw-mt-5 tw-mb-6 tw-pr-7'>
                                                            <span className="tw-text-lg tw-font-semibold">Total con descuento: ${formatPrice(totalSavings)}</span>
                                                        </div>
                                                    </TableContainer>
                                                </div>
                                            </div>

                                            :
                                            <div className='tw-w-[95%] tw-h-[100%] tw-bg-white tw-shadow-lg tw-rounded-2xl tw-py-8 tw-px-10 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                                <div className='tw-w-full tw-mb-0'>
                                                    <h3 className='tw-mb-9'>Datos del Comprador</h3>

                                                    {/* <h2 className='tw-text-xl tw-font-semibold tw-mb-7 tw-text-center tw-pt-1'></h2> */}
                                                    <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-10'>
                                                        <TextField
                                                            variant='standard'
                                                            label='Nombre'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                        <PersonIcon style={{ color: '#02AF9B', fontSize: '1.8rem', marginRight: '1rem' }} />
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
                                                            variant='standard'
                                                            label='Apellido'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                        <PersonIcon style={{ color: '#02AF9B', fontSize: '1.8rem', marginRight: '1rem' }} />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            fullWidth
                                                            value={deliveryLastName}
                                                            error={!!deliveryLastNameError}
                                                            helperText={deliveryLastNameError}
                                                            onChange={(e) => setDeliveryLastName(e.target.value)}
                                                        />

                                                        <FormControl fullWidth variant='outlined'>
                                                            <InputLabel>Tipo de Identificación</InputLabel>
                                                            <Select
                                                                value={deliveryIdType}
                                                                onChange={(e) => setDeliveryIdType(e.target.value)}
                                                                label='Tipo de Identificación'
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
                                                            {deliveryIdTypeError && <p className='error-text'>{deliveryIdTypeError}</p>}
                                                        </FormControl>

                                                        <TextField
                                                            variant='standard'
                                                            label='Número de Documento'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                        <BadgeIcon
                                                                            style={{
                                                                                color: '#02AF9B',
                                                                                fontSize: '1.8rem',
                                                                                marginRight: '1rem',
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
                                                            variant='standard'
                                                            label='Teléfono'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                        <PhoneIcon style={{ color: '#02AF9B', fontSize: '1.8rem', marginRight: '1rem' }} />
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
                                                            variant='standard'
                                                            label='Correo Electrónico'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                        <EmailIcon style={{ color: '#02AF9B', fontSize: '1.8rem', marginRight: '1rem' }} />
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

                                                    <h3 className='tw-mb-9'>Datos de la Dirección de Envío</h3>

                                                    {/* <h2 className='tw-text-xl tw-font-semibold tw-mb-7 tw-text-center tw-pt-1'>Datos de la Dirección de Envío</h2> */}
                                                    <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-5'>
                                                        <FormControl fullWidth variant='outlined'>
                                                            <InputLabel>País</InputLabel>
                                                            <Select
                                                                value={countryDelivery}
                                                                label='País'
                                                                error={!!countryError}
                                                                onChange={(e) => handleChangeCountryDelivery(e)}
                                                            >
                                                                {countriesDelivery && countriesDelivery.map((country: any) => (
                                                                    <MenuItem key={country.label} value={country.label}>
                                                                        {country.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>

                                                        <FormControl fullWidth variant='outlined'>
                                                            <InputLabel>Departamento/Estado</InputLabel>
                                                            <Select
                                                                value={stateDelivery}
                                                                label='Departamento/Estado'
                                                                error={!!shippingCityError}
                                                                onChange={handleChangeDepartamentDelivery}
                                                            >

                                                                {departmentsDelivery && departmentsDelivery.map((dep: any) => (
                                                                    <MenuItem key={dep.departamento} value={dep.departamento}>
                                                                        {dep.departamento}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                    <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-8'>
                                                        <FormControl fullWidth variant='outlined'>
                                                            <InputLabel>Ciudad</InputLabel>

                                                            <Select
                                                                value={cityDelivery}
                                                                onChange={handleChangeCityDelivery}
                                                                label='Departamento/Estado'
                                                                error={!!shippingStateError}
                                                            >
                                                                {citiesDelivery && citiesDelivery.map((city: any) => (
                                                                    <MenuItem key={city} value={city}>
                                                                        {city}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>

                                                        <TextField
                                                            variant='standard'
                                                            label='Código Postal'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                        <LocationOnIcon
                                                                            style={{
                                                                                color: '#02AF9B',
                                                                                fontSize: '1.8rem',
                                                                                marginRight: '1rem',
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

                                                    <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-8'>
                                                        <TextField
                                                            variant='standard'
                                                            label='Dirección'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                        <LocationOnIcon style={{ color: '#02AF9B', fontSize: '1.8rem', marginRight: '1rem' }} />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            fullWidth
                                                            value={addressDelivery}
                                                            /* error={!!deliveryAddressError}
                                                            helperText={deliveryAddressError} */
                                                            onChange={(e) => setAddressDelivery(e.target.value)}
                                                            className='md:tw-col-span-2'
                                                        />
                                                    </div>


                                                </div>
                                            </div>
                            }
                            <div className='tw-w-[95%] tw-py-4 tw-mb-2 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <div className='tw-w-[94%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center'>
                                    <div className='tw-w-[50%] tw-h-[100%] tw-flex-row tw-justify-center tw-justify-items-center'>
                                        <Typography className='tw-text-white tw-w-full'>
                                            Paso {step}/5
                                        </Typography>
                                    </div>
                                    <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-end tw-justify-items-center'>
                                        {step === 5 ?
                                            <>
                                                <Button
                                                    variant="text"
                                                    className="tw-text-black tw-ml-6"
                                                    onClick={() => setStep(step - 1)}
                                                    sx={{
                                                        padding: '0',
                                                        minWidth: 'auto',
                                                        textTransform: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                    startIcon={
                                                        <ArrowBackIosIcon style={{ marginRight: -13, fontSize: 25, color: 'white' }} />
                                                    }
                                                >
                                                    <Typography style={{ color: 'white' }}>
                                                        {dictionary.dictionary?.backOffice.backButton}
                                                    </Typography>
                                                </Button>
                                                <div id="wompi-button-container"></div>

                                                <Button
                                                    variant="text"
                                                    className="tw-text-black tw-ml-6"
                                                    onClick={() => dataRegisterHandle()}
                                                    sx={{
                                                        padding: '0',
                                                        minWidth: 'auto',
                                                        textTransform: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                    startIcon={<PaymentIcon style={{ marginRight: -1, fontSize: 25, color: 'white' }} />}
                                                >
                                                    <Typography style={{ color: 'white' }}>
                                                        {'Pagar'}
                                                    </Typography>
                                                </Button>
                                            </>
                                            :
                                            <>
                                                {step != 1 && (
                                                    <Button
                                                        variant="text"
                                                        className="tw-text-black tw-ml-6"
                                                        onClick={() => setStep(step - 1)}
                                                        sx={{
                                                            padding: '0',
                                                            minWidth: 'auto',
                                                            textTransform: 'none',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                        startIcon={
                                                            <ArrowBackIosIcon style={{ marginRight: -13, fontSize: 25, color: 'white' }} />
                                                        }
                                                    >
                                                        <Typography style={{ color: 'white' }}>
                                                            {dictionary.dictionary?.backOffice.backButton}
                                                        </Typography>
                                                    </Button>
                                                )}

                                                <Button
                                                    variant="text"
                                                    className="tw-text-black tw-ml-6"
                                                    onClick={() => handleNextStep(step)}
                                                    sx={{
                                                        padding: '0',
                                                        minWidth: 'auto',
                                                        textTransform: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                    endIcon={
                                                        <ArrowForwardIosIcon style={{ marginLeft: -5, fontSize: 25, color: 'white' }} />
                                                    }
                                                >
                                                    <Typography style={{ color: 'white' }}>
                                                        {dictionary.dictionary?.backOffice.nextButton}
                                                    </Typography>
                                                </Button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div >

            </div >
        </>
    );
}

export default CustomersCreateForm;