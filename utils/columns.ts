import { GridColDef } from "@mui/x-data-grid";
import { getAge, getGrade } from "./date";

// TODO: share some of these columns with other tables
export const volunteerColumns: GridColDef[] = [
    { field: "Name", headerName: "Name", valueGetter: (params) => params.row.first_name + " " + params.row.last_name },
    { field: "first_name", headerName: "First Name", editable: true },
    { field: "last_name", headerName: "Last Name", editable: true },
    { field: "phone", headerName: "Phone", editable: true },
    { field: "email", headerName: "Email", editable: true },
    { field: "address", headerName: "Address", editable: true },
    { field: "age", headerName: "Age", editable: true },
    { field: "employer", headerName: "Employer", editable: true },
    { field: "school", headerName: "School Attending", editable: true },
    { field: "background_check_date", headerName: "Background Check Date", editable: true },
    { field: "volunteer_preference", headerName: "Volunteer Preference", editable: true },
    { field: "criminal_history", headerName: "Criminal History", editable: true },
    { field: "refused_participation", headerName: "Refused Participation", type: 'boolean',editable: true },
    { field: "signed_waiver", headerName: "Signed Waiver", type: 'boolean', editable: true },
    { field: "mailchimp", headerName: "Mailchimp", editable: true },
    { field: "notes", headerName: "Notes", editable: true },
];

export const guardianColumns: GridColDef[] = [
    { field: "Name", headerName: "Name", valueGetter: (params) => params.row.first_name + " " + params.row.last_name },
    { field: "first_name", headerName: "First Name", editable: true },
    { field: "last_name", headerName: "Last Name", editable: true },
    { field: "email", headerName: "Email", editable: true },
    { field: "address", headerName: "Address", editable: true },
    { field: "employer", headerName: "Employer", editable: true },
    { field: "paymentmethod", headerName: "Payment method", editable: true },
    { field: "mailchimp", headerName: "Mailchimp", editable: true },
    { field: "notes", headerName: "Notes", editable: true },
];
  
export const participantColumns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Participant Name",
      valueGetter: (params) => params.row.first_name + " " + params.row.last_name,
    },
    { field: "first_name", headerName: "First Name", editable: true },
    { field: "last_name", headerName: "Last Name", editable: true },
    {
      field: "contact_name",
      headerName: "Emergency Contact Name",
      editable: true,
    },
    {
      field: "contact_phone",
      headerName: "Emergency Contact Phone",
      editable: true,
    },
    {
      field: "birthdate",
      headerName: "DOB",
      editable: true,
    },
    { field: "age", headerName: "Age", valueGetter: (params) => getAge(params.row.birthdate) },
    { field: "grade", headerName: "Grade", valueGetter: (params) => getGrade(params.row.graduation_year) },
    {
      field: "graduation_year",
      headerName: "Graduation Year",
      valueParser: (value) => parseInt(value),
      editable: true,
    },
    {
      field: "healthSafetyNeeds",
      headerName: "Health/Safety Needs",
      editable: true,
    },
    {
      field: "food_restrictions",
      headerName: "Food Restrictions",
      editable: true,
    },
    {
      field: "transportAssistance",
      headerName: "Transportation Assistance",
      editable: true,
    },
    { field: "notes", headerName: "Notes", editable: true },
];
