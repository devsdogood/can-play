import { Box } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    emergencyContactName: "Joe Jones",
    emergencyContactPhone: "5153333333",
    email: "janedoe@gmail.com",
    birthdate: "7/24/14",
    grade: "2nd",
    healthSafetyNeeds: "",
    foodRestrictions: "none",
    transportAssistance: false,
    notes: "",
  },
  {
    id: 2,
    firstName: "Hank",
    lastName: "Evans",
    emergencyContactName: "",
    emergencyContactPhone: "",
    email: "bobevans@gmail.com",
    birthdate: "2/10/12",
    grade: "5",
    healthSafetyNeeds: "",
    foodRestrictions: "N/A",
    transportAssistance: false,
    notes: "",
  },
  {
    id: 3,
    firstName: "Seth",
    lastName: "Smith",
    emergencyContactName: "Paul Blart",
    emergencyContactPhone: "5154444444",
    email: "samsmith@gmail.com",
    birthdate: "12/13/15",
    grade: "2nd",
    healthSafetyNeeds: "",
    foodRestrictions: "none",
    transportAssistance: false,
    notes: "",
  },
];

const columns: GridColDef[] = [
  { field: "Name", headerName: "Name", editable: true, valueGetter: (params) => params.row.firstName + " " + params.row.lastName },
  { field: "firstName", headerName: "Volunteer First Name", editable: true },
  { field: "lastName", headerName: "Volunteer Last Name", editable: true },
  { field: "parentguardianname", headerName: "Parent/Guardian name(s)", editable: true },
  { field: "emergencyContactPhone", headerName: "Emergency Contact Phone", editable: true },
  { field: "email", headerName: "Participant Email", editable: true, },
  { field: "address", headerName: "address", editable: true },
  { field: "age", headerName: "age", editable: true },
  { field: "healthSafetyNeeds", headerName: "Health/Safety Needs", editable: true },
  { field: "employer", headerName: "employer", editable: true },
  { field: "schoolattending", headerName: "school attending", editable: true },
  { field: "eventsattended", headerName: "events attended", editable: true },
  { field: "practicesattended", headerName: "practices attended", editable: true },
  { field: "hoursserved", headerName: "hours served", editable: true },
  { field: "backgroundcheckneeded", headerName: "background check needed", editable: true },
  { field: "backgroundcheckdate", headerName: "background check date", editable: true },
  { field: "volunteerpreference", headerName: "volunteer preference", editable: true },
  { field: "criminalhistory", headerName: "criminal history", editable: true },
  { field: "refusedparticipation", headerName: "refused participation", editable: true },
  { field: "signedvolunteerwaiver", headerName: "signed volunteer waiver", editable: true },
  { field: "mailchimp", headerName: "mailchimp", editable: true },
  { field: "notes", headerName: "Notes", editable: true },
];

const VolunteersTable = () => {
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

export default VolunteersTable;
