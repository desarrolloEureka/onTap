import { colombianCitiesData } from '@/types/colombianCitiesData';
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

export type Department = {
    id: number;
    departamento: string;
    ciudades: string[];
};

const DepartmentsHook = () => {
    const [authToken, setAuthToken] = useState('');
    //const [departments, setDepartments] = useState([]);
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            /* const token = await getAccessToken();
            setAuthToken(token);
            const departmentsData = await getStates(token);
            setDepartments(departmentsData); */

            const departmentsData = await colombianCitiesData;

            const updatedDepartments = departmentsData.map(department => ({
                ...department,
                pais: "Colombia"
            }));

            setDepartments(updatedDepartments);
        };
        fetchData();
    }, []);

    return {
        departments
    };
};

export default DepartmentsHook;
