import { GetAllSocialNetworks } from "@/reactQuery/home";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

//const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:?#\[\]@!$&'()*+,;=]*)?(\?[;&a-zA-Z0-9%_.~+=-]*)?(#[a-zA-Z0-9-_]*)?$/i;
const regex = /^(https?:\/\/)?(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?$/i;

// Función para validar si la URL es válida
const isValidUrl = (url: string) => {
  // Primero valida con regex
  if (!regex.test(url)) {
    return false;
  }

  try {
    // Luego valida con el constructor URL
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (error) {
    return false;
  }
};

const CustomButton = ({
  name,
  link,
  nameLabel,
  styles,
}: {
  name: string;
  nameLabel?: string;
  link: string;
  styles?: string;
}) => {
  const { data } = GetAllSocialNetworks();
  const isSmallScreen = useMediaQuery("(max-height:780px)");
  const icon = data?.find((val) => val.name === name);

  // Limpia el enlace y asegura que tenga el formato correcto
  const linkAux = link.trim();
  // Asegúrate de que la URL comience con "http://" o "https://"
  const fullUrl = /^https?:\/\//i.test(linkAux)
    ? linkAux
    : `https://${linkAux}`;

  // Verifica si la URL es válida
  const finalUrl = isValidUrl(fullUrl) ? fullUrl : "";

  // Maneja el clic en el enlace y muestra un mensaje de error si la URL es inválida
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isValidUrl(fullUrl)) {
      event.preventDefault();
      alert("La URL proporcionada no es válida."); // Muestra un mensaje de error al usuario
    }
  };

  return (
    icon?.image && (
      <Link
        className={`tw-rounded-full tw-mt-1 tw-drop-shadow-xl ${styles}`}
        style={{ textDecoration: "none" }}
        href={finalUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <div className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-mx-2">
          <Image
            className="tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full"
            src={icon.image}
            alt={name}
            width={isSmallScreen ? 45 : 54}
            height={isSmallScreen ? 45 : 54}
          />
          <Typography
            style={{ width: "100%", textDecoration: "none" }}
            className="tw-text-white tw-z-10 tw-text-xs tw-flex tw-items-center tw-justify-center tw-capitalize tw-pt-1"
            color={"white"}
          >
            {nameLabel && nameLabel.length > 9
              ? nameLabel.substring(0, 6) + "..."
              : nameLabel}
          </Typography>
        </div>
      </Link>
    )
  );
};

export default CustomButton;
