import useDictionary from "@/hooks/dictionary/useDictionary";
import {
    Container,
    TextField,
    Typography,
    Select,
    InputLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
    CircularProgress
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PaymentFormHook from "./hooks/PaymentFormHook";

const PaymentForm = ({ userDataPay, handleReturnForm, isIndividualPay }: { userDataPay: any, handleReturnForm: () => void, isIndividualPay: boolean }) => {
    const {
        cardNumberError,
        cvcError,
        expMonthError,
        expYearError,
        cardHolderError,
        termsError,
        handleAccept,
        handleInputChange,
        cardInfo,
        handlePayment,
        handleConsolidatedPayment,
        loading,
        installmentsError,
        idTypeError,
        idNumberError,
        formatPrice,
        dataCards,
        handleUseExistingCardToggle,
        useExistingCard,
        handleSelectCard,
        totalAmountToPay,
        paymentSourceError,
        setPaymentSourceError
    } = PaymentFormHook({ userDataPay, handleReturnForm, isIndividualPay });
    const dictionary = useDictionary({ lang: 'es' });

    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className='tw-mt-3 tw-shadow-m tw-rounded-2xl tw-w-[90%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5'>
                <div style={{ width: 'auto' }} className='tw-shadow-m tw-rounded-2xl tw-m-4 tw-mt-7 tw-min-h-[68vh]'>
                    <Container className='tw-bg-[#02AF9B] tw-shadow-m tw-rounded-2xl tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-2'>

                        <div className='tw-w-[95%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-8 tw-mb-1 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                            <div className='tw-w-[90%] tw-h-[90%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-40 tw-mt-4 tw-mb-5'>
                                <h3 className='tw-mb-4'>Pago</h3>

                                <p>Valor a Pagar: ${formatPrice(totalAmountToPay || 0)}</p>

                                {dataCards && dataCards.length > 0 && (
                                    <div className="tw-w-full tw-flex tw-justify-start tw-items-center tw-my-5">
                                        <FormControlLabel
                                            control={<Checkbox checked={useExistingCard} onChange={handleUseExistingCardToggle} />}
                                            label="Usar tarjeta existente"
                                        />

                                    </div>
                                )}

                                {useExistingCard && dataCards && dataCards.length > 0 ? (
                                    <form className='tw-w-full tw-grid tw-grid-cols-3 tw-grid-rows-2 tw-gap-1'>
                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-0">
                                            <div className="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                <FormControl fullWidth className='tw-mt-4'>
                                                    <InputLabel>Selecciona una tarjeta</InputLabel>
                                                    <Select
                                                        label='Selecciona una tarjeta'
                                                        name="existingCard"
                                                        onChange={handleSelectCard}
                                                        fullWidth
                                                        disabled={loading}
                                                        error={!!paymentSourceError}
                                                    >
                                                        {dataCards && dataCards.map((card: any, index: number) => (
                                                            <MenuItem key={index} value={card}>
                                                                {`**** **** **** ${dataCards && dataCards[0].public_data?.last_four || ''}`}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-col-span-3 tw-mt-4">
                                            <div className="tw-w-[100%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="year-label">Cuotas  </InputLabel>
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
                                                                boxSizing: 'border-box',
                                                                color: 'rgb(211, 47, 47)',
                                                                display: 'block',
                                                                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                                                fontSize: '12px',
                                                                fontStyle: 'normal',
                                                                fontWeight: 400,
                                                                height: '19.9062px',
                                                                letterSpacing: '0.39996px',
                                                                lineHeight: '19.92px',
                                                                marginBlockEnd: '0px',
                                                                marginBlockStart: '3px',
                                                                marginBottom: '0px',
                                                                marginInlineEnd: '14px',
                                                                marginInlineStart: '14px',
                                                                marginLeft: '14px',
                                                                marginRight: '14px',
                                                                marginTop: '3px',
                                                                textAlign: 'left',
                                                                textSizeAdjust: '100%',
                                                                unicodeBidi: 'isolate',
                                                                width: '281.906px',
                                                                WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                                                            }}
                                                        >
                                                            {termsError}
                                                        </p>
                                                    )}
                                                </FormControl>
                                            </div>
                                        </div>
                                    </form>


                                ) : (
                                    <form className='tw-w-full tw-grid tw-grid-cols-3 tw-grid-rows-3 tw-gap-1'>
                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-0">
                                            <div className="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                <TextField
                                                    variant='outlined'
                                                    label='Número de tarjeta'
                                                    value={cardInfo.number}
                                                    className='tw-mr-0'
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
                                                    variant='outlined'
                                                    label='CVC'
                                                    value={cardInfo.cvc}
                                                    className=''
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
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="month-label">Mes de expiración </InputLabel>
                                                    <Select
                                                        label='Mes de expiración'
                                                        className='tw-w-full'
                                                        value={cardInfo.exp_month}
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
                                                            <MenuItem key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="year-label">Año de expiración </InputLabel>
                                                    <Select
                                                        label='Tipo de Documento'
                                                        className='tw-w-full'
                                                        value={cardInfo.exp_year}
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
                                                            <MenuItem key={new Date().getFullYear() + i} value={new Date().getFullYear() + i}>{(new Date().getFullYear() + i).toString().slice(-2)}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-mt-4">
                                            <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                                                <TextField
                                                    variant='outlined'
                                                    label='Nombre del titular'
                                                    value={cardInfo.card_holder}
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
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="year-label">Cuotas  </InputLabel>
                                                    <Select
                                                        label="Cuotas"
                                                        name="installments"
                                                        style={{ height: "48px" }}
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
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="year-label">Tipo de Identificación</InputLabel>
                                                    <Select
                                                        label='Tipo de Documento '
                                                        className='tw-w-full'
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
                                                    variant='outlined'
                                                    label='Número de Identificación'
                                                    name="idNumber"
                                                    fullWidth
                                                    value={cardInfo.idNumber}
                                                    onChange={handleInputChange}
                                                    error={!!idNumberError}
                                                    helperText={idNumberError}
                                                    disabled={loading}
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
                                                                boxSizing: 'border-box',
                                                                color: 'rgb(211, 47, 47)',
                                                                display: 'block',
                                                                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                                                fontSize: '12px',
                                                                fontStyle: 'normal',
                                                                fontWeight: 400,
                                                                height: '19.9062px',
                                                                letterSpacing: '0.39996px',
                                                                lineHeight: '19.92px',
                                                                marginBlockEnd: '0px',
                                                                marginBlockStart: '3px',
                                                                marginBottom: '0px',
                                                                marginInlineEnd: '14px',
                                                                marginInlineStart: '14px',
                                                                marginLeft: '14px',
                                                                marginRight: '14px',
                                                                marginTop: '3px',
                                                                textAlign: 'left',
                                                                textSizeAdjust: '100%',
                                                                unicodeBidi: 'isolate',
                                                                width: '281.906px',
                                                                WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                                                            }}
                                                        >
                                                            {termsError}
                                                        </p>
                                                    )}
                                                </FormControl>
                                            </div>
                                        </div>
                                    </form>
                                )}


                                <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-4 tw-mb-4">
                                    <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                                        <div className="tw-flex tw-justify-center text-red-500">
                                            {loading ? (
                                                <CircularProgress />
                                            ) : (
                                                <button
                                                    className='tw-bg-teal-500 tw-text-white tw-py-2 tw-px-4 tw-rounded'
                                                    onClick={(e) => { isIndividualPay === true ? handlePayment(e) : handleConsolidatedPayment(e) }}
                                                >
                                                    Procesar Pago
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tw-w-[95%] tw-py-4 tw-mb-2 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                            <div className='tw-w-[94%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center'>
                                <div className='tw-w-[50%] tw-h-[100%] tw-flex-row tw-justify-center tw-justify-items-center'>
                                    <Typography className='tw-text-white tw-w-full'>

                                    </Typography>
                                </div>
                                <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-end tw-justify-items-center'>

                                </div>
                            </div>
                        </div>


                    </Container>
                </div>
            </div >
        </div >
    );
}

export default PaymentForm;