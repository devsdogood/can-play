import { GridColDef } from "@mui/x-data-grid";
import { PrismaClient, volunteers } from "@prisma/client";
import Table from "../components/Table";

// TODO: share some of these columns with other tables
const columns: GridColDef[] = [
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

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const volunteers = await prisma.volunteers.findMany({
    include: {
      guardians: true,
    }
  });

  return {
    props: { volunteers },
  };
}

type VolunteersTableProps = {
  volunteers: volunteers[];
}
const VolunteersTable: React.FC<VolunteersTableProps> = ({ volunteers }) => (
  <Table
    columns={columns}
    rows={volunteers}
    model="volunteers"
  />
);

export default VolunteersTable;
