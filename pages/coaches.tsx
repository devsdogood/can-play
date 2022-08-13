import { Box } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "janedoe@gmail.com",
      birthdate: "7/24/14",
      grade: "2nd",
      healthSafetyNeeds: "",
      foodRestrictions: "none",
      transportAssistance: false,
      notes: "",
    },
];

const columns: GridColDef[] = [
    { field: "Name", headerName: "Name", editable: true, valueGetter: (params) => params.row.firstName + " " + params.row.lastName },
    { field: "firstName", headerName: "Coach First Name", editable: true },
    { field: "lastName", headerName: "Coach Last Name", editable: true },
    { field: "phonenumber", headerName: "Phone Number", editable: true },
    { field: "email", headerName: "Email", editable: true },
    { field: "address", headerName: "Address", editable: true, type:"" },
    { field: "employer", headerName: "Employer", editable: true },
    { field: "SchoolAttending", headerName: "School Attending", editable: true },
    { field: "Expertise/Sport(s)", headerName: "Expertise/Sport(s)", editable: true },
    { field: "ProgramsCoached", headerName: "Programs Coached", editable: true },
    { field: "CheckNeeded", headerName: "CHeck Needed", editable: true },
    { field: "BackgoundCheckDate", headerName: "Background Check Date", editable: true },
    { field: "TrainingDate", headerName: "Training Date", editable: true },
    { field: "SignedJobDescription", headerName: "Signed Job Description", editable: true },
    { field: "SignedHandbook", headerName: "Signed Handbook", editable: true },
    { field: "PaymentPreference", headerName: "Payment Preference", editable: true },
    { field: "PaymentInfo", headerName: "Payment Info", editable: true },
    { field: "MailChimp", headerName: "MailChimp", editable: true },
    { field: "notes", headerName: "Notes", editable: true },
];

const CoachesTable = () => {
    return (
      <Box sx={{ height: 400, width: 800 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    );
  };
  
  export default CoachesTable;