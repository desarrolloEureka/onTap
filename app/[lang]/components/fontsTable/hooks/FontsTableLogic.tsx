import { GetAllBackgroundImages } from "@/reactQuery/home";
import { use, useEffect, useState } from "react";

const FontsTableLogic = () => {
    const usersDataSanpShot = GetAllBackgroundImages();
    const data = usersDataSanpShot.data;
    useEffect(() => {
        console.log(usersDataSanpShot.data);
    },[usersDataSanpShot.data]);
    return { data };
}

export default FontsTableLogic;