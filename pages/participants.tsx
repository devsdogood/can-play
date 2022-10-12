import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { PrismaClient } from "@prisma/client";
import { parse, differenceInYears } from "date-fns";
import Table from "../components/Table";
import { Participant } from "../model";
import { getGrade } from "../utils/date";

const getAge = (params: GridValueGetterParams) => {
  const dob = parse(params.row.birthdate, "mm/dd/yy", new Date());
  const date = new Date();

  return differenceInYears(date, dob);
};

const columns: GridColDef[] = [
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
  { field: "age", headerName: "Age", valueGetter: getAge },
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

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const participants = await prisma.participants.findMany({
    include: {
      guardians: true
    }
  });

  return {
    props: { participants },
  };
}

type ParticipantsTableProps = {
  participants: Participant[];
};
const ParticipantsTable: React.FC<ParticipantsTableProps> = ({
  participants,
}) => (
  <Table
    columns={columns}
    rows={participants}
    model="participants"
  />
);

export default ParticipantsTable;
