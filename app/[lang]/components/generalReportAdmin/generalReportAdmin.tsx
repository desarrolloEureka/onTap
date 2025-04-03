import useDictionary from "@/hooks/dictionary/useDictionary";
import { Typography, Button, TextField, Modal, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
// Iconos
import GetAppIcon from "@mui/icons-material/GetApp";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import GeneralReportAdmin from "./hooks/generalReportAdminHook";
import ReactCountryFlag from "react-country-flag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InfoIcon from "@mui/icons-material/Info";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

const PendingPaymentReports = ({ handlePayUser }: { handlePayUser: any }) => {
  const {
    data,
    formatearFecha,
    flag,
    setFlag,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchTerm,
    setSearchTerm,
    rowId,
    setRowId,
    isSubmitting,
    setIsSubmitting,
    query,
    setQuery,
    filteredQuery,
    setFilteredQuery,
    handleExport,
    handleDateChange,
    apiRef,
    getCountryFlag,
    getCountryName,
    handleDeleteFilter,
    setDistributorFilter,
    distributorFilter,
    distributors,
    paymentStatusFilter,
    setPaymentStatusFilter,
    deliveryStatusFilter,
    setDeliveryStatusFilter,
    handleGetSelectedRows,
    detalleCompra,
    setDetalleCompra,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    formatPrice,
    mostrarDetalleCompra

  } = GeneralReportAdmin({ handlePayUser });
  const dictionary = useDictionary({ lang: "es" });
  const dateToday = new Date().toISOString().split("T")[0];

  const calculateTotalDiscount = () => {
    const planPrice = detalleCompra?.optionPay?.selectedPlan?.finalPrice || 0;
    const materialPrice =
      detalleCompra?.optionPay?.selectedMaterial?.finalPrice || 0;
    const customizacion =
      detalleCompra?.optionPay?.selectedCustomization?.finalPrice || 0;

    // Calculando el total de productos
    const productsPrice =
      detalleCompra?.userOrder?.selectedProducts?.reduce(
        (acc: number, product: any) =>
          acc +
          (product.categoryPrice || 0) +
          (product?.full_price_Discount || 0),
        0
      ) || 0;

    // Devolver el total sumando los precios de todos los elementos
    return planPrice + materialPrice + productsPrice + customizacion;
  };

  const totalDiscount = calculateTotalDiscount();


  const columns: GridColDef[] = [
    {
      field: "detalleCompra",
      headerName: "Detalle de Compra",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Tooltip title="Ver detalles de la compra" arrow>
          <InfoIcon
            style={{ cursor: "pointer", color: "#02AF9B" }}
            onClick={() => mostrarDetalleCompra(params?.row)}
          />
        </Tooltip>
      ),
    },


    {
      field: "paymentDate",
      headerName: "Fecha de Pago",
      minWidth: 180,
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const isPaid = params.row.statusPay === "Pagado";
        return (
          <div className="tw-flex tw-justify-center tw-items-center">
            {isPaid && params.value ? (
              <div>{formatearFecha(params.value)}</div>
            ) : (
              <div>No aplica</div>
            )}
          </div>
        );
      },
    },

    {
      field: "secuencialId",
      headerName: "Referencia",
      minWidth: 210,
      flex: 2,
    },
    {
      field: "deliveryDate",
      headerName: "Fecha de Entrega",
      minWidth: 100,
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const isDelivered = params.row.deliveryStatus === "Entregado";
        return (
          <div className="tw-flex tw-justify-center tw-items-center">
            {isDelivered && params.value ? (
              <div>{formatearFecha(params.value)}</div>
            ) : (
              <div>No aplica</div>
            )}
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "No. Identificación",
      minWidth: 100,
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "name",
      headerName: "Nombres y Apellidos",
      minWidth: 180,
      align: "left",
      flex: 1,
    },
    {
      field: "indicative",
      headerName: "Indicativo",
      minWidth: 90,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && (
            <ReactCountryFlag
              countryCode={getCountryFlag(params.value ? params.value : "")}
              svg
              style={{ marginRight: "5px", width: "29px", height: "20px" }}
            />
          )}
          <div>{getCountryName(params.value)}</div>
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "Teléfono",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Correo",
      minWidth: 180,
      flex: 1,
      align: "left",
    },
    {
      field: "statusPay",
      headerName: "Estado Pago",
      minWidth: 110,
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && <div>{params.value}</div>}
        </div>
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Estado de Entrega",
      minWidth: 110,
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const isDelivered = params.row.deliveryStatus === "Entregado";
        return (
          <div className="tw-flex tw-justify-center tw-items-center">
            {isDelivered ? (
              <span>Entregado</span>
            ) : (
              <span>Pendiente de entrega</span>
            )}
          </div>
        );
      },
    },
    {
      field: "distributorName",
      headerName: "Distribuidor",
      minWidth: 100,
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value || "No asignado"}
        </div>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingLeft: 2,
            paddingRight: 5,
            marginBottom: 0,
            marginTop: 1,
          }}
        >
          {/* Contenedor del filtro de búsqueda */}
          <Box
            sx={{
              width: "35%",
              paddingBottom: 3,
              paddingTop: 0,
              paddingLeft: 4,
            }}
          >
            <Typography
              variant="inherit"
              style={{
                paddingBottom: 8,
                fontSize: 14.4,
                color: "rgba(0, 0, 0, 0.6)",
                paddingLeft: 10,
              }}
            >
              Consulta General
            </Typography>
            <GridToolbarQuickFilter
              sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
                textDecoration: "none",
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#f4f4f4",
                  borderRadius: "8px",
                  textDecoration: "none",
                  "&.MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                },
              }}
            />
          </Box>

          {/* Contenedor de los botones */}
          <Box
            sx={{
              display: "flex",
              gap: 2, // Espacio entre botones
            }}
          >
            <Button
              className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mx-5 tw-mr-4"
              type="submit"
              sx={{
                padding: "0",
                minWidth: "auto",
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              style={{ textTransform: "none" }}
              onClick={handleDateChange}
            >
              <FilterListIcon
                style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
              />
              <Typography style={{ color: "#02AF9B" }}>Filtrar</Typography>
            </Button>

            <Button
              className="tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4"
              type="submit"
              sx={{
                padding: "0",
                minWidth: "auto",
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              style={{ textTransform: "none" }}
              onClick={handleDeleteFilter}
            >
              <DeleteIcon
                style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
              />
              <Typography style={{ color: "#02AF9B" }}>Borrar</Typography>
            </Button>

            <Button
              className="tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4"
              type="submit"
              sx={{
                padding: "0",
                minWidth: "auto",
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              style={{ textTransform: "none" }}
              onClick={handleGetSelectedRows}
            >
              <LocalShippingIcon
                style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
              />
              <Typography style={{ color: "#02AF9B" }}>Entregar</Typography>
            </Button>

            <Button
              className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4"
              type="submit"
              sx={{
                padding: "0",
                minWidth: "auto",
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              style={{ textTransform: "none" }}
              onClick={() => handleExport()}
            >
              <GetAppIcon
                style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
              />
              <Typography style={{ color: "#02AF9B" }}>Exportar</Typography>
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box", // Asegura que padding no afecte el ancho
            overflow: "hidden", // Prevenir que los elementos se desborden
            paddingX: 2, // Añadir padding horizontal de forma más flexible 
            paddingTop: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingRight: 110,
              gap: 2, // Espacio entre elementos
            }}
          >
            <div
              style={{
                flex: 1,
                paddingLeft: 50,
                paddingRight: 15,
              }}
            >
              <TextField
                label="Fecha Inicio"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: dateToday,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div style={{ flex: 1 }}>
              <TextField
                label="Fecha Fin"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: dateToday,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "flex-start",
                flexWrap: "nowrap",
              }}
            >
              {/* Filtro para Distribuidor */}
              <FormControl
                variant="outlined"
                sx={{
                  flex: "1 1 200px",
                  minWidth: 200,
                  margin: "0 8px",
                }}
              >
                <InputLabel id="distributorFilter-label">
                  Distribuidor
                </InputLabel>
                <Select
                  labelId="distributorFilter-label"
                  id="distributorFilter"
                  value={distributorFilter}
                  onChange={(e) => setDistributorFilter(e.target.value)}
                  label="Distribuidor"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: "auto",
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {distributors.length > 0 ? (
                    distributors.map((distributor) => (
                      <MenuItem key={distributor.id} value={distributor.id}>
                        {distributor.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress
                          size={20}
                          style={{ marginRight: "10px", color: "#02AF9B" }}
                        />
                        <Typography variant="body2">Cargando...</Typography>
                      </div>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* Filtro para Estado de Pago */}
              <FormControl
                variant="outlined"
                sx={{
                  flex: "1 1 200px",
                  minWidth: 200,
                  margin: "0 8px",
                }}
              >
                <InputLabel id="paymentStatusFilter-label">
                  Estado de Pago
                </InputLabel>
                <Select
                  labelId="paymentStatusFilter-label"
                  id="paymentStatusFilter"
                  value={paymentStatusFilter || ""}
                  onChange={(e) => setPaymentStatusFilter(e.target.value || "")}
                  label="Estado de Pago"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: "auto",
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  <MenuItem value="">Selecciona un estado de pago</MenuItem>
                  <MenuItem value="Pagado">Pagado</MenuItem>
                  <MenuItem value="Pendiente por pagar">
                    Pendiente por pagar
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Filtro para Estado de Entrega */}
              <FormControl
                variant="outlined"
                sx={{
                  flex: "1 1 200px",
                  minWidth: 200,
                  margin: "0 8px",
                }}
              >
                <InputLabel id="deliveryStatusFilter-label">
                  Estado de Entrega
                </InputLabel>
                <Select
                  labelId="deliveryStatusFilter-label"
                  id="deliveryStatusFilter"
                  value={deliveryStatusFilter || ""}
                  onChange={(e) => setDeliveryStatusFilter(e.target.value)}
                  label="Estado de Entrega"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: "auto",
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  <MenuItem value="">Selecciona un estado de entrega</MenuItem>
                  <MenuItem value="Entregado">Entregado</MenuItem>
                  <MenuItem value="Pendiente de entrega">
                    Pendiente de entrega
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <div className="tw-mt-3 tw-shadow-m tw-rounded-2xl tw-h-[775px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5 ">
        <Typography
          className="tw-text-black tw-w-full"
          variant="h6"
          color="textPrimary"
          display={"flow"}
          align="center"
          fontWeight="bold"
        >
          {dictionary.dictionary?.backOffice?.labelReportAdmin}
        </Typography>
        <div
          style={{ height: 650, width: "100%" }}
          className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
        >
          <DataGrid
            apiRef={apiRef}
            rows={data ?? []}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
              columns: {
                columnVisibilityModel: {
                  status: false,
                  traderName: false,
                },
              },
              sorting: {
                sortModel: [{ field: "paymentDate", sort: "desc" }],
              },
            }}
            pageSizeOptions={[15, 25]}
            className="tw-rounded-2xl"
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter
            disableRowSelectionOnClick
            checkboxSelection
            isRowSelectable={(params) =>
              params.row.deliveryStatus !== "Entregado" &&
              params.row.statusPay !== "Pendiente por pagar"
            }
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#dddddd",
                color: "#000000",
                fontWeight: "bold",
              },
            }}
          />
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
            width: "80vw", // Tamaño del modal más grande
            maxWidth: "1200px",
            height: "80vh", // Ajustar el alto del modal
            overflowY: "auto", // Permitir scroll en caso de que el contenido sea muy largo
          }}
        >
          <IconButton
            className="tw-absolute tw-right-1 tw-top-1"
            onClick={() => handleCloseModal()}
          >
            <Close className="tw-text-white" />
          </IconButton>
          <div className="tw-w-full tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center tw-mx-10">
            <div className="tw-w-11/12 tw-bg-white tw-shadow-lg tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6">
              {/* Título del Modal */}
              <div className="tw-flex tw-items-center tw-justify-center tw-mb-6">
                <Typography
                  variant="h5"
                  className="tw-font-semibold tw-text-gray-800"
                >
                  Detalle Resumen De Compra -
                </Typography>
                {detalleCompra ? (
                  <Typography variant="h5" className="tw-font-semibold tw-text-gray-800 tw-ml-4">
                    {detalleCompra.secuencialId || "No disponible"}
                  </Typography>
                ) : (
                  <Typography variant="h5" className="tw-font-semibold tw-text-gray-800 tw-ml-4">
                    No disponible
                  </Typography>
                )}
              </div>
              {query?.length > 0 ? (
                <table className="tw-w-full tw-table-auto tw-border-collapse">
                  <thead className="tw-bg-gray-100">
                    <tr>
                      <th className="tw-px-6 tw-py-4 tw-text-left tw-font-semibold tw-border-b tw-border-gray-300">
                        Descripción
                      </th>
                      <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                        Cantidad
                      </th>
                      <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                        Precio Venta
                      </th>
                      <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                        Total
                      </th>
                      <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                        Precio Distribuidor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Plan Seleccionado */}
                    <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                      <td className="tw-px-6 tw-py-4">
                        Plan Seleccionado:{" "}
                        <span className="tw-font-medium">
                          {detalleCompra?.optionPay?.selectedPlan?.name}
                        </span>
                      </td>
                      <td className="tw-text-center">1</td>
                      <td className="tw-text-center">{`$${formatPrice(
                        detalleCompra?.optionPay?.selectedPlan?.full_price
                      )}`}</td>
                      <td className="tw-text-center">{`$${formatPrice(
                        detalleCompra?.optionPay?.selectedPlan?.full_price
                      )}`}</td>
                      <td className="tw-text-center">{`$${formatPrice(
                        detalleCompra?.optionPay?.selectedPlan?.finalPrice
                      )}`}</td>
                    </tr>

                    {/* Materiales Seleccionados */}
                    <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                      <td className="tw-px-6 tw-py-4">
                        Materiales Seleccionados:{" "}
                        <span className="tw-font-medium">
                          {detalleCompra?.optionPay?.selectedMaterial?.name}
                        </span>
                      </td>
                      <td className="tw-text-center">1</td>
                      <td className="tw-text-center">{`$${formatPrice(
                        detalleCompra?.optionPay?.selectedMaterial?.full_price
                      )}`}</td>
                      <td className="tw-text-center">{`$${formatPrice(
                        detalleCompra?.optionPay?.selectedMaterial?.full_price
                      )}`}</td>
                      <td className="tw-text-center">{`$${formatPrice(
                        detalleCompra?.optionPay?.selectedMaterial?.finalPrice
                      )}`}</td>
                    </tr>

                    {/* Productos Seleccionados */}
                    {detalleCompra?.userOrder?.selectedProducts?.map(
                      (product: any, index: any) => (
                        <React.Fragment key={index}>
                          <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                            <td className="tw-px-6 tw-py-4">{product.name}</td>
                            <td className="tw-text-center">
                              {product.quantity}
                            </td>
                            <td className="tw-text-center">
                              ${formatPrice(product.full_price)}
                            </td>
                            <td className="tw-text-center">
                              $
                              {formatPrice(
                                product.full_price * product.quantity
                              )}
                            </td>
                            <td className="tw-text-center">
                              ${formatPrice(product.categoryPrice)}
                            </td>
                          </tr>
                          {product.hasPersonalization && (
                            <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50 tw-text-gray-600">
                              <td className="tw-px-6 tw-py-4">
                                Personalización: {product.name}
                              </td>
                              <td className="tw-text-center">1</td>
                              <td className="tw-text-center">
                                ${formatPrice(product?.full_price_custom || 0)}
                              </td>
                              <td className="tw-text-center">
                                ${formatPrice(product?.full_price_custom || 0)}
                              </td>
                              <td className="tw-text-center">
                                $
                                {formatPrice(product?.full_price_Discount || 0)}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    )}

                    {/* Customización Seleccionada */}
                    {detalleCompra?.optionPay?.selectedCustomization ? (
                      <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                        <td className="tw-px-6 tw-py-4">
                          Personalización:{" "}
                          <span className="tw-font-medium">
                            {detalleCompra?.optionPay?.selectedCustomization
                              ?.name || ""}
                          </span>
                        </td>
                        <td className="tw-text-center">1</td>
                        <td className="tw-text-center">{`$${formatPrice(
                          detalleCompra?.optionPay?.selectedCustomization
                            ?.full_price
                        )}`}</td>
                        <td className="tw-text-center">{`$${formatPrice(
                          detalleCompra?.optionPay?.selectedCustomization
                            ?.full_price
                        )}`}</td>
                        <td className="tw-text-center">{`$${formatPrice(
                          detalleCompra?.optionPay?.selectedCustomization
                            ?.finalPrice
                        )}`}</td>
                      </tr>
                    ) : null}
                  </tbody>
                  <tfoot>
                    <tr className="tw-bg-gray-100">
                      <td
                        colSpan={4}
                        className="tw-px-6 tw-py-4 tw-text-right tw-font-bold tw-border-t tw-border-gray-300"
                      >
                        SubTotal:
                      </td>
                      <td className="tw-px-6 tw-py-4 tw-text-center tw-font-bold tw-border-t tw-border-gray-300">
                        $
                        {formatPrice(
                          detalleCompra?.userOrder?.totalAmount || 0
                        )}
                      </td>
                    </tr>
                    <tr className="tw-bg-gray-100">
                      <td
                        colSpan={4}
                        className="tw-px-6 tw-py-4 tw-text-right tw-font-bold tw-border-t tw-border-gray-300"
                      >
                        Total:
                      </td>
                      <td className="tw-px-6 tw-py-4 tw-text-center tw-font-bold tw-border-t tw-border-gray-300">
                        ${formatPrice(totalDiscount || 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <Typography variant="body1" className="tw-text-center tw-my-4">
                  No hay datos para mostrar
                </Typography>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PendingPaymentReports;
