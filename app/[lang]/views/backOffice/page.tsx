'use client';
import React from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserRegister from '@/components/userRegisterForm/UserRegisterForm';
import UserTable from '@/components/userTable/UserTable';
import LoadFonts from '@/components/loadFonts/LoadFonts';
import LoadLogos from '@/components/loadLogos/LoadLogos';
import TrafficReport from '@/components/trafficReport/TrafficReport';
import CategoryRegisterForm from '@/components/categoryRegisterForm/CategoryRegisterForm';
import ProductRegisterForm from '@/components/productRegisterForm/ProductRegisterForm';
import PlanRegisterForm from '@/components/planRegisterForm/PlanRegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
//
import FilterIcon from '@mui/icons-material/Filter';
import GroupIcon from '@mui/icons-material/Group';
import LogOut from '@/hooks/logOut/LogOut';
import TableRowsIcon from '@mui/icons-material/TableRows';
import SettingsIcon from '@mui/icons-material/Settings';
import FirstView from './components/FirstView';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TuneIcon from '@mui/icons-material/Tune';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment'
import Countries from '@/components/countries/Countries';
import Departments from '@/components/departments/Departments';
import Cities from '@/components/cities/Cities';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaterialRegisterForm from '@/components/materials/MaterialRegisterForm';
import ColorRegisterForm from '@/components/colorsRegisterForm/ColorRegisterForm';
import PersonalizationRegisterForm from '@/components/personalizationRegisterForm/PersonalizationRegisterForm';
import DistributorRegisterForm from '@/components/distributorRegisterForm/DistributorRegisterForm';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const [value, setValue] = React.useState(0);
  const { logOut } = LogOut();

  const handleSelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      setValue(parseInt(eventKey, 10));
    }
  };

  // Función para manejar el clic en la imagen
  const handleImageClick = () => {
    setValue(0); // Cambia el valor a 0 para mostrar FirstView
  };

  return (
    <div>
      <Box>
        <div className='tw-flex tw-justify-between tw-items-center tw-bg-[#02AF9B] tw-p-4'>
          <Image
            src='/images/simple_logo.png'
            alt='Logo One Tap'
            width={81}
            height={77}
            priority
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
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

                  <NavDropdown
                    title={
                      <span className="tw-font-bold tw-text-white tw-flex-row" style={{ fontSize: 16 }}>
                        <FormatListBulletedIcon fontSize='small' sx={{ marginRight: '4px', fontSize: 33 }} />
                        {dictionary?.backOffice.ServiceLabel}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white tw-mr-4"
                  >
                    <NavDropdown.Item eventKey="6" style={{ fontSize: 15 }}>
                      <CategoryIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.CategoryLabel}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="7" style={{ fontSize: 15 }}>
                      <StoreIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.ProductsLabelMenu}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="8" style={{ fontSize: 15 }}>
                      <AssignmentIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.PlansLabelMenu}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="12" style={{ fontSize: 15 }}>
                      <BuildIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.MaterialsLabelMenu}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="13" style={{ fontSize: 15 }}>
                      <ColorLensIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.ColorsLabelMenu}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="14" style={{ fontSize: 15 }}>
                      <TuneIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.CustomizationsLabelMenu}
                    </NavDropdown.Item>
                  </NavDropdown>


                  {/* Usuarios */}
                  <NavDropdown
                    title={
                      <span className="tw-font-bold tw-text-white" style={{ fontSize: 16 }}>
                        <GroupIcon fontSize='small' sx={{ marginRight: '4px', fontSize: 31 }} />
                        {dictionary?.backOffice.UsersLabelMenu}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white  tw-mr-4"
                  >
                    {/* <NavDropdown.Item eventKey="1" style={{ fontSize: 15 }}>
                      <PersonAddIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.CreateUser}
                    </NavDropdown.Item> */}
                    <NavDropdown.Item eventKey="2" style={{ fontSize: 15 }}>
                      <PeopleIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.UserTable}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="15" style={{ fontSize: 15 }}>
                      <LocalShippingIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.DistributorLabelMenu}
                    </NavDropdown.Item>
                    <NavDropdown.Item style={{ fontSize: 15 }}>
                      <PeopleIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.DistributorCustomerLabelMenu}
                    </NavDropdown.Item>
                  </NavDropdown>


                  <NavDropdown
                    title={
                      <span className="tw-font-bold tw-text-white" style={{ fontSize: 16 }}>
                        <FilterIcon fontSize='large' sx={{ marginRight: '7px', fontSize: 30 }} />
                        {dictionary?.backOffice.TemplatesLabel}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white  tw-mr-4"
                  >
                    <NavDropdown.Item eventKey="3" style={{ fontSize: 15 }}>
                      <FontDownloadIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.LoadFonts}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4" style={{ fontSize: 15 }}>
                      <AddPhotoAlternateIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.CreateLogo}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link eventKey="5" className="tw-text-white tw-mr-4" style={{ fontSize: 16 }}>
                    <TableRowsIcon fontSize='large' sx={{ marginRight: '7px', fontSize: 32 }} />
                    {dictionary?.backOffice.TrafficReport}
                  </Nav.Link>

                  <NavDropdown
                    title={
                      <span className="tw-font-bold tw-text-white" style={{ fontSize: 16 }}>
                        <FactCheckIcon fontSize='small' sx={{ marginRight: '4px', fontSize: 30 }} />
                        {dictionary?.backOffice.ReportsLabelMenu}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white tw-mr-4"
                  >
                    <NavDropdown.Item style={{ fontSize: 15 }}>
                      <SubscriptionsIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.SubscriptionsLabelMenu}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={
                      <span className="tw-font-bold tw-text-white" style={{ fontSize: 16 }}>
                        <SettingsIcon fontSize='small' sx={{ marginRight: '4px', fontSize: 30 }} />
                        {dictionary?.backOffice.SettingsLabelMenu}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    className="tw-text-white  tw-mr-4"
                  >
                    <NavDropdown.Item style={{ fontSize: 15 }}>
                      <NotificationsIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.NotificationsLabelMenu}
                    </NavDropdown.Item>
                    <NavDropdown.Item style={{ fontSize: 15 }}>
                      <PaymentIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.SubscriptionValueLabelMenu}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="9" style={{ fontSize: 15 }}>
                      <LocationOnIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.CountryLabel}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="10" style={{ fontSize: 15 }}>
                      <LocationOnIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.DepartmentsLabel}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="11" style={{ fontSize: 15 }}>
                      <LocationOnIcon fontSize="small" sx={{ marginRight: '4px' }} />
                      {dictionary?.backOffice.CitiesLabel}
                    </NavDropdown.Item>
                  </NavDropdown>


                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Button onClick={logOut} variant="none" className="tw-text-white tw-bg-transparent tw-border-none tw-mr-2">
            <div className='tw-flex tw-items-center'>
              <LogoutIcon fontSize='large' />
              <Typography className='tw-font-bold' style={{ fontSize: 18 }}>{dictionary?.logOut}</Typography>
            </div>
          </Button>
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
            © {new Date().getFullYear()} Eureka Dreams. Todos los derechos reservados.
          </Typography>
        </div>
      </footer>

    </div>
  );
};

export default Page;