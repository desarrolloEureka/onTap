import { countriesTable } from '@/types/formConstant';
import { useState, useEffect } from 'react';

// Función para obtener el token de acceso
const getAccessToken = async () => {
    const response = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "api-token": "UG0BymPNHyZpZS_fXTdN-rE5CFIgKabIWMSVxemhCuWlSMXxQJ2awe3Z3aU1e-t1WTI",
            "user-email": "CtO@eurekadreams.com"
        }
    });
    const data = await response.json();
    return data.auth_token;
};

// Función para obtener países (solo Colombia)
const getCountries = async (authToken: any) => {
    const response = await fetch("https://www.universal-tutorial.com/api/countries/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Accept": "application/json"
        }
    });

    const data = await response.json();
    const dataCountires = data.filter((country: any) => country.country_name === "Colombia");
    return dataCountires;
};

// Función para obtener estados de Colombia
const getStates = async (authToken: any) => {
    const response = await fetch(`https://www.universal-tutorial.com/api/states/Colombia`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
};

// Función para obtener ciudades de un estado
const getCities = async (authToken: any, state: any) => {
    const response = await fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
};

export type Country = {
    id: number;
    label: string;
};

const CountriesHook = () => {
    const [authToken, setAuthToken] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const Countries = await countriesTable;
            setCountries(Countries);
        };
        fetchData();
    }, []);

    return {
        countries
    };
};

export default CountriesHook;
