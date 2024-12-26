import { colombianCitiesData } from '@/types/colombianCitiesData';
import { useState, useEffect } from 'react';

/* interface City {
    city_name: string;
    id: number;
    department: string;
}
 */
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

// Función para obtener departamentos
const getStates = async (authToken: string) => {
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

// Función para obtener ciudades de un departamento
const getCitiesByDepartment = async (authToken: string, department: string) => {
    try {
        const response = await fetch(`https://www.universal-tutorial.com/api/cities/${department}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
};

const transformCitiesData = (data: any) => {
    const transformedData: {
        id: any;
        ciudad: any;
        departamento: any;
        pais: string;
    }[] = [];
    let uniqueId = 1;

    data.forEach((item: any) => {
        item.ciudades.forEach((ciudad: any) => {
            transformedData.push({
                id: uniqueId++,
                ciudad: ciudad,
                departamento: item.departamento,
                pais: "Colombia",
            });
        });
    });
    return transformedData;
};

export type City = {
    id: number;
    ciudad: string;
    departamento: string;
    pais: string;
};

const CitiesHook = () => {
    const [authToken, setAuthToken] = useState<string>('');
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /*const fetchCities = async () => {
            try {
                const token = await getAccessToken();
                setAuthToken(token);
                const departments = await getStates(token);

                // Obtener ciudades de cada departamento y agregar el nombre del departamento
                let allCities: City[] = [];
                for (const department of departments) {
                    const departmentCities = await getCitiesByDepartment(token, department.state_name);
                    const citiesWithDepartment = departmentCities.map((city: any) => ({
                        ...city,
                        department: department.state_name
                    }));
                    allCities = [...allCities, ...citiesWithDepartment];
                }

                // Asignar un id único a cada ciudad y actualizar el estado
                const citiesWithId = allCities.map((city, index) => ({
                    ...city,
                    id: index
                }));

                setCities(citiesWithId);
            } catch (error) {
                console.error("Error fetching cities:", error);
            } finally {
                setLoading(false);
            }
        }; */

        const fetchCities = async () => {
            const citiesData = await transformCitiesData(colombianCitiesData);
            setCities(citiesData);
            setLoading(false);
        }

        fetchCities();
    }, []);

    return {
        cities,
        loading
    };
};

export default CitiesHook;
