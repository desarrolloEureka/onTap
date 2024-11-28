import FontsTableLogic from "./hooks/FontsTableLogic";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nombre de Fondo",
    headerAlign: "center",
    align: "center",
    minWidth: 130,
    flex: 1,
  },
  {
    field: "image",
    headerName: "Imagen",
    headerAlign: "center",
    align: "center",
    minWidth: 130,
    flex: 1,
    renderCell: (params) => (
      <div className="tw-flex tw-justify-center tw-items-center">
        <Image src={`${params.value}`} alt="image" width={50} height={100} />
      </div>
    ),
  },
];

const FontsTable = () => {
  const { data } = FontsTableLogic();
  return (
    <div className="tw-shadow-m tw-rounded-2xl tw-h-[600px] tw-w-[99%]  tw-flex tw-flex-col tw-justify-center tw-items-center ">
      <div
        style={{ height: 650, width: "100%" }}
        className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
      >
        <DataGrid
          rows={data ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnSelector
          disableDensitySelector
          disableColumnFilter
          disableRowSelectionOnClick
          ignoreDiacritics={true}
          className="tw-rounded-2xl tw-mb-3"
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
  );
};

export default FontsTable;
