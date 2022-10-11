import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { parse, differenceInYears, getMonth, getYear } from "date-fns";
import { connectToDB } from "../lib/mongodb";
import { Participant } from "../model";

const getAge = (params: GridValueGetterParams) => {
  const dob = parse(params.row.birth_date, "mm/dd/yy", new Date());
  const date = new Date();

  return differenceInYears(date, dob);
};

const getGraduationyear = (params: GridValueGetterParams) => {
  const grade = parseInt(params.row.grade);
  const date = new Date();
  const month = getMonth(date);

  // if after june, add 1 to year
  const year = month >= 6 ? getYear(date) + 1 : getYear(date);

  return year + (12 - grade);
};

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Participant Name",
    valueGetter: (params) => params.row.firstName + " " + params.row.lastName,
  },
  { field: "firstName", headerName: "Participant First Name", editable: true },
  { field: "lastName", headerName: "Participant Last Name", editable: true },
  {
    field: "emergencyContactName",
    headerName: "Emergency Contact Name",
    editable: true,
  },
  {
    field: "emergencyContactPhone",
    headerName: "Emergency Contact Phone",
    editable: true,
  },
  { field: "email", headerName: "Participant Email", editable: true },
  {
    field: "birth_date",
    headerName: "birth_date",
    editable: true,
    type: "date",
  },
  { field: "age", headerName: "Participant Age", valueGetter: getAge },
  { field: "grade", headerName: "Grade", editable: true },
  {
    field: "graduationyear",
    headerName: "Graduation Year",
    valueGetter: getGraduationyear,
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

export async function getServerSideProps() {
  const mongo = await connectToDB();
  const cursor = await mongo.collection("participants").find().toArray();
  const participants = cursor.map((doc) => ({
    ...doc,
    _id: null,
    id: doc._id.toString(),
    firstName: doc.name[0],
    lastName: doc.name[1],
    emergencyContactName: doc.emergency_contact.name[0] + " " + doc.emergency_contact.name[1],
    emergencyContactPhone: doc.emergency_contact.info.phone_number,
  }));

  return {
    props: { participants },
  };
}

type ParticipantsTableProps = {
  participants: Participant[];
};
const ParticipantsTable: React.FC<ParticipantsTableProps> = ({
  participants,
}) => {
  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={participants}
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

export default ParticipantsTable;
