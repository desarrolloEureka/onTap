import { MenuProps } from "@/types/menu";
import Business from "@mui/icons-material/Business";
import Home from "@mui/icons-material/Home";
import People from "@mui/icons-material/People";
import Work from "@mui/icons-material/Work";
import {
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  Toolbar,
} from "@mui/material";
import Image from "next/image";

const Menu = ({ dictionary }: MenuProps) => {
  return (
    <Paper 
     sx={{ width: "100%", backgroundColor: "#62AD9B" }}>
      <Toolbar className=" flex tw-m-auto tw-justify-center tw-h-[139px] tw-w-[1440px]">
        <Image
          className=" tw-absolute tw-left-5 tw-bottom-16 tw-translate-y-1/2"
          src="/images/capa_1.png"
          alt="Logo One Tap"
          width="81"
          height="77"
        />

        <MenuItem className="tw-flex tw-w-[200px] tw-flex-col tw-items-center tw-ml-[-250px] ">
          <IconButton className="tw-text-[24px] ">
            <Home />
          </IconButton>
          <ListItemText className=" tw-text-[14px] tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-text-white ">
            {dictionary.mainTab.tab1}
          </ListItemText>
        </MenuItem>

        <MenuItem className="tw-flex tw-w-[200px] tw-flex-col tw-items-center ">
          <IconButton className="tw-text-[24px] ">
            <Home />
          </IconButton>
          <ListItemText className=" tw-text-[14px] tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-text-white ">
            {dictionary.mainTab.tab2}
          </ListItemText>
        </MenuItem>

        <MenuItem className="tw-flex tw-w-[200px] tw-flex-col tw-items-center ">
          <IconButton className="tw-text-[24px] ">
            <Home />
          </IconButton>
          <ListItemText className=" tw-text-[14px] tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-text-white ">
            {dictionary.mainTab.tab3}
          </ListItemText>
        </MenuItem>

        <MenuItem className="tw-flex tw-w-[200px] tw-flex-col tw-items-center ">
          <IconButton className="tw-text-[24px] ">
            <Home />
          </IconButton>
          <ListItemText className=" tw-text-[14px] tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-text-white ">
            {dictionary.mainTab.tab4}
          </ListItemText>
        </MenuItem>
      </Toolbar>
    </Paper>
  );
};

export default Menu;
