"use client";
import React, { useEffect, useState } from "react";
import { Locale } from "i18n-config";
import useDictionary from "@/hooks/dictionary/useDictionary";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserRegister from "@/components/userRegisterForm/UserRegisterForm";
import UserTable from "@/components/userTable/UserTable";
import LoadFonts from "@/components/loadFonts/LoadFonts";
import LoadLogos from "@/components/loadLogos/LoadLogos";
import TrafficReport from "@/components/trafficReport/TrafficReport";
import CategoryRegisterForm from "@/components/categoryRegisterForm/CategoryRegisterForm";
import ProductRegisterForm from "@/components/productRegisterForm/ProductRegisterForm";
import PlanRegisterForm from "@/components/planRegisterForm/PlanRegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";

//
import FilterIcon from "@mui/icons-material/Filter";
import GroupIcon from "@mui/icons-material/Group";
import LogOut from "@/hooks/logOut/LogOut";
import TableRowsIcon from "@mui/icons-material/TableRows";
import SettingsIcon from "@mui/icons-material/Settings";
import FirstView from "./components/FirstView";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import TuneIcon from "@mui/icons-material/Tune";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentIcon from "@mui/icons-material/Payment";
import Countries from "@/components/countries/Countries";
import Departments from "@/components/departments/Departments";
import Cities from "@/components/cities/Cities";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MaterialRegisterForm from "@/components/materials/MaterialRegisterForm";
import ColorRegisterForm from "@/components/colorsRegisterForm/ColorRegisterForm";
import PersonalizationRegisterForm from "@/components/personalizationRegisterForm/PersonalizationRegisterForm";
import DistributorRegisterForm from "@/components/distributorRegisterForm/DistributorRegisterForm";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomersDistributorForm from "@/components/customersDistributor/CustomersDistributorForm";
import CustomersCreateForm from "@/components/customersDistributor/CustomersCreateForm";
import Notifications from "@/components/notifications/notifications";
import Suscriptions from "@/components/subscription/subscription";
import ChangePassword from "@/components/changePassword/changePassword";
import EditProfile from "@/components/editProfile/editProfile";
import PaymentForm from "@/components/customersDistributor/PaymentForm";
import CardRegisterForm from "@/components/cardRegisterForm/CardRegisterForm";
import PendingPaymentReports from "@/components/pendingPaymentReports/PendingPaymentReports";
import MadePaymentReports from "@/components/madePaymentReport/madePaymentReports";
import DispatchedDeliveriesReports from "@/components/dispatchedDeliveriesReport/dispatchedDeliveriesReports";
import GeneralReportAdmin from "@/components/generalReportAdmin/generalReportAdmin";
import SubscriptionReport from "@/components/subscriptionReport/SubscriptionReport";

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const [value, setValue] = React.useState(0);
  const { logOut } = LogOut();
  const [isDistributor, setIsDistributor] = useState(false);
  const [userDataPay, setUserDataPay] = useState(null);
  const [isIndividualPay, setIsIndividualPay] = useState(false);
  // Estado para almacenar los datos del usuario para los reportes enviados
  const [userDataReport, setUserDataReport] = useState<any>(null);
  // Estado para determinar si es un reporte individual
  const [isIndividualReport, setIsIndividualReport] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si estamos en el lado del cliente
    if (typeof window !== "undefined") {
      const distributorStatus = localStorage.getItem("isDistributor") === "true";
      setIsDistributor(distributorStatus);
    }
  }, []);

  const handleSelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      setValue(parseInt(eventKey, 10));
    }
  };

  const handleCreateUser = () => {
    setValue(parseInt("17", 10));
  };

  const handlePayUser = (userData: any, isIndividual: boolean) => {
    setUserDataPay(userData);
    setIsIndividualPay(isIndividual);
    setValue(parseInt("22", 10));
  };

  const handleDeliveryUser = (userData: any, isIndividual: boolean) => {
    // Aquí se guardan los datos que serán utilizados en la vista de "reportes enviados"
    setUserDataReport(userData);
    setIsIndividualReport(isIndividual);

    // Se puede ajustar un valor o estado si es necesario, por ejemplo:
    setValue(parseInt("25", 10)); // Ajustar el valor para reflejar que se está manejando un reporte enviado
  };

  const handleReturnForm = () => {
    setValue(parseInt("16", 10));
  };

  // Función para manejar el clic en la imagen
  const handleImageClick = () => {
    setValue(0); // Cambia el valor a 0 para mostrar FirstView
  };

  return (
    <div>
      <Box>
        <div className="tw-flex tw-justify-between tw-items-center tw-bg-[#02AF9B] tw-p-4">
          <Image
            src="/images/simple_logo.png"
            alt="Logo One Tap"
            width={81}
            height={77}
            priority
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
          <Navbar
            bg="none"
            variant="dark"
            expand="lg"
            className="tw-bg-[#02AF9B] tw-text-white tw-font-bold"
          >
            <Container fluid>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="tw-text-white" onSelect={handleSelect}>
                  {!isDistributor && (
                    <NavDropdown
                      title={
                        <span
                          className="tw-font-bold tw-text-white tw-flex-row"
                          style={{ fontSize: 16 }}
                        >
                          <FormatListBulletedIcon
                            fontSize="small"
                            sx={{ marginRight: "4px", fontSize: 33 }}
                          />
                          {dictionary?.backOffice.ServiceLabel}
                        </span>
                      }
                      id="basic-nav-dropdown"
                      className="tw-text-white tw-mr-4"
                    >
                      <NavDropdown.Item eventKey="6" style={{ fontSize: 15 }}>
                        <CategoryIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.CategoryLabel}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="7" style={{ fontSize: 15 }}>
                        <StoreIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.ProductsLabelMenu}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="8" style={{ fontSize: 15 }}>
                        <AssignmentIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.PlansLabelMenu}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="12" style={{ fontSize: 15 }}>
                        <BuildIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.MaterialsLabelMenu}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="13" style={{ fontSize: 15 }}>
                        <ColorLensIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.ColorsLabelMenu}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="14" style={{ fontSize: 15 }}>
                        <TuneIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.CustomizationsLabelMenu}
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {/* Usuarios */}
                  <NavDropdown
                    title={
                      <span
                        className="tw-font-bold tw-text-white"
                        style={{ fontSize: 16 }}
                      >
                        <GroupIcon
                          fontSize="small"
                          sx={{ marginRight: "4px", fontSize: 31 }}
                        />
                        {dictionary?.backOffice.UsersLabelMenu}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white  tw-mr-4"
                  >
                    {!isDistributor ? (
                      <>
                        <NavDropdown.Item eventKey="2" style={{ fontSize: 15 }}>
                          <PeopleIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.UserTable}
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          eventKey="15"
                          style={{ fontSize: 15 }}
                        >
                          <LocalShippingIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.DistributorLabelMenu}
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <NavDropdown.Item eventKey="16" style={{ fontSize: 15 }}>
                        <PeopleIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.DistributorCustomerLabelMenu}
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>

                  {/* Plnatillas */}
                  {!isDistributor && (
                    <NavDropdown
                      title={
                        <span
                          className="tw-font-bold tw-text-white"
                          style={{ fontSize: 16 }}
                        >
                          <FilterIcon
                            fontSize="large"
                            sx={{ marginRight: "7px", fontSize: 30 }}
                          />
                          {dictionary?.backOffice.TemplatesLabel}
                        </span>
                      }
                      id="basic-nav-dropdown"
                      className="tw-text-white  tw-mr-4"
                    >
                      <NavDropdown.Item eventKey="3" style={{ fontSize: 15 }}>
                        <FontDownloadIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.LoadFonts}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="4" style={{ fontSize: 15 }}>
                        <AddPhotoAlternateIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.CreateLogo}
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {/* Reportes */}
                  <NavDropdown
                    title={
                      <span
                        className="tw-font-bold tw-text-white"
                        style={{ fontSize: 16 }}
                      >
                        <FactCheckIcon
                          fontSize="small"
                          sx={{ marginRight: "4px", fontSize: 30 }}
                        />
                        {dictionary?.backOffice.ReportsLabelMenu}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white tw-mr-4"
                  >
                    {!isDistributor ? (
                      <>
                        <NavDropdown.Item eventKey="28" style={{ fontSize: 15 }}>
                          <SubscriptionsIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.SubscriptionsLabelMenu}
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="5" style={{ fontSize: 15 }}>
                          <TableRowsIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.TrafficReport}
                        </NavDropdown.Item>
                        {/* Reporte general OC para el administrador  */}
                        <NavDropdown.Item
                          eventKey="27"
                          style={{ fontSize: 15 }}
                        >
                          <LocalShippingIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.labelGeneralReportAdmin}
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <>
                        <NavDropdown.Item
                          eventKey="25"
                          style={{ fontSize: 15 }}
                        >
                          <PaymentIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.PaymentsMade}
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          eventKey="24"
                          style={{ fontSize: 15 }}
                        >
                          <PaymentIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.PendingPayments}
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          eventKey={"26"}
                          style={{ fontSize: 15 }}
                        >
                          <LocalShippingIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.Deliveries}
                        </NavDropdown.Item>
                        {/*    <NavDropdown.Item style={{ fontSize: 15 }}>
                          <NotificationsIcon
                            fontSize="small"
                            sx={{ marginRight: "4px" }}
                          />
                          {dictionary?.backOffice.NotificationHistory}
                        </NavDropdown.Item> */}
                      </>
                    )}
                  </NavDropdown>

                  {/* Configuracion */}
                  {!isDistributor && (
                    <NavDropdown
                      title={
                        <span
                          className="tw-font-bold tw-text-white"
                          style={{ fontSize: 16 }}
                        >
                          <SettingsIcon
                            fontSize="small"
                            sx={{ marginRight: "4px", fontSize: 30 }}
                          />
                          {dictionary?.backOffice.SettingsLabelMenu}
                        </span>
                      }
                      id="basic-nav-dropdown"
                      className="tw-text-white  tw-mr-4"
                    >
                      <NavDropdown.Item eventKey={18} style={{ fontSize: 15 }}>
                        <NotificationsIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.NotificationsLabelMenu}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey={19} style={{ fontSize: 15 }}>
                        <PaymentIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.SubscriptionValueLabelMenu}
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {/* Locaciones */}
                  {!isDistributor && (
                    <NavDropdown
                      title={
                        <span
                          className="tw-font-bold tw-text-white"
                          style={{ fontSize: 16 }}
                        >
                          <LocationOnIcon
                            fontSize="small"
                            sx={{ marginRight: "4px", fontSize: 30 }}
                          />
                          {dictionary?.backOffice.LocationsLabelMenu}
                        </span>
                      }
                      id="basic-nav-dropdown"
                      className="tw-text-white  tw-mr-4"
                    >
                      <NavDropdown.Item eventKey="9" style={{ fontSize: 15 }}>
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.CountryLabel}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="10" style={{ fontSize: 15 }}>
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.DepartmentsLabel}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="11" style={{ fontSize: 15 }}>
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice.CitiesLabel}
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {/* Mi cuenta */}
                  <NavDropdown
                    title={
                      <span
                        className="tw-font-bold tw-text-white"
                        style={{ fontSize: 16 }}
                      >
                        <AccountCircleIcon
                          fontSize="small"
                          sx={{ marginRight: "4px", fontSize: 30 }}
                        />
                        Mi cuenta
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white tw-mr-4"
                  >
                    {/* Opción para cambiar contraseña */}
                    <NavDropdown.Item eventKey={20} style={{ fontSize: 15 }}>
                      <ManageAccountsIcon
                        fontSize="small"
                        sx={{ marginRight: "4px" }}
                      />
                      Cambiar Contraseña
                    </NavDropdown.Item>

                    {/* Opción de editar perfil, solo visible si es distribuidor */}
                    {isDistributor && (
                      <NavDropdown.Item eventKey={21} style={{ fontSize: 15 }}>
                        <PasswordIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        Editar Perfil
                      </NavDropdown.Item>
                    )}

                    {/* Opción para las tarjetas de pago */}
                    {isDistributor && (
                      <NavDropdown.Item eventKey="23" style={{ fontSize: 15 }}>
                        <PaymentIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.backOffice?.LableCards}
                      </NavDropdown.Item>
                    )}


                    {/* Opción para cerrar sesión */}
                    {isDistributor && (
                      <NavDropdown.Item onClick={logOut} style={{ fontSize: 15 }}>
                        <LogoutIcon
                          fontSize="small"
                          sx={{ marginRight: "4px" }}
                        />
                        {dictionary?.logOut}
                      </NavDropdown.Item>
                    )}

                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="tw-text-white tw-bg-transparent tw-border-none tw-mr-2">
            {!isDistributor && (
              <Button
                onClick={logOut}
                variant="none"
                className="tw-text-white tw-bg-transparent tw-border-none tw-mr-2"
              >
                <div className="tw-flex tw-items-center">
                  <LogoutIcon fontSize="large" />
                  <Typography className="tw-font-bold" style={{ fontSize: 18 }}>
                    {dictionary?.logOut}
                  </Typography>
                </div>
              </Button>
            )}
          </div>
        </div>

        {value === 0 && <FirstView />}
        {value === 1 && <UserRegister />}
        {value === 2 && <UserTable />}
        {value === 3 && <LoadFonts params={{ lang }} />}
        {value === 4 && <LoadLogos params={{ lang }} />}
        {value === 5 && <TrafficReport params={{ lang }} />}
        {value === 6 && <CategoryRegisterForm params={{ lang }} />}
        {value === 7 && <ProductRegisterForm params={{ lang }} />}
        {value === 8 && <PlanRegisterForm params={{ lang }} />}
        {value === 9 && <Countries params={{ lang }} />}
        {value === 10 && <Departments params={{ lang }} />}
        {value === 11 && <Cities params={{ lang }} />}
        {value === 12 && <MaterialRegisterForm params={{ lang }} />}
        {value === 13 && <ColorRegisterForm params={{ lang }} />}
        {value === 14 && <PersonalizationRegisterForm params={{ lang }} />}
        {value === 15 && <DistributorRegisterForm params={{ lang }} />}
        {value === 16 && (
          <CustomersDistributorForm
            handleCreateUser={handleCreateUser}
            handlePayUser={handlePayUser}
          />
        )}
        {value === 17 && (
          <CustomersCreateForm handleReturnForm={handleReturnForm} />
        )}
        {value === 18 && <Notifications params={{ lang }} />}
        {value === 19 && <Suscriptions params={{ lang }} />}
        {value === 20 && <ChangePassword params={{ lang }} />}
        {value === 21 && <EditProfile params={{ lang }} />}
        {value === 22 && (
          <PaymentForm
            userDataPay={userDataPay}
            isIndividualPay={isIndividualPay}
            handleReturnForm={handleReturnForm}
          />
        )}
        {value === 23 && <CardRegisterForm />}
        {value === 24 && (
          <PendingPaymentReports handlePayUser={handlePayUser} />
        )}
        {value === 25 && (
          <MadePaymentReports handleDeliveryUser={handleDeliveryUser} />
        )}
        {value === 26 && (
          <DispatchedDeliveriesReports handlePayUser={handlePayUser} />
        )}
        {value === 27 && <GeneralReportAdmin handlePayUser={handlePayUser} />}
        {value === 28 && <SubscriptionReport params={{ lang }} />}

      </Box>

      {/* Footer */}
      <footer className="tw-bg-[#02AF9B] tw-text-white tw-py-7 tw-text-center tw-border-t tw-border-gray-600">
        <div className="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center">
          <Typography variant="h6" className="tw-mb-2 tw-font-semibold">
            <a
              href="https://eurekadreams.com"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-white hover:tw-text-gray-300 tw-transition tw-duration-200 tw-ease-in-out tw-text-decoration-none"
            >
              Eureka Dreams
            </a>
          </Typography>
          <Typography variant="body2" className="tw-text-gray-200 tw-text-sm">
            © {new Date().getFullYear()} Eureka Dreams. Todos los derechos
            reservados.
          </Typography>
        </div>
      </footer>
    </div>
  );
};

export default Page;
