import { GridColDef } from "@mui/x-data-grid";
import { parentguardians, PrismaClient } from "@prisma/client";
import * as _ from "lodash";
import Table from "../components/Table";

const columns: GridColDef[] = [
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

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const guardians = await prisma.parentguardians.findMany({
    include: {
      participants: true,
      volunteers: true,
    }
  });

  return {
    props: { guardians },
  };

}

type ParticipantsTableProps = {
  guardians: parentguardians[];
}
const ParticipantsTable: React.FC<ParticipantsTableProps> = ({ guardians }) => (
  <Table
    columns={columns}
    rows={guardians}
    model="parentguardians" 
  />
)

export default ParticipantsTable;
