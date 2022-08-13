import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { connectToDB } from "../lib/mongodb";
import { ParentGuardian } from "../model";

const columns: GridColDef[] = [
  { field: "Name", headerName: "Name", editable: true, valueGetter: (params) => params.row.firstName + " " + params.row.lastName },
  { field: "firstName", headerName: "Parents/guardians First Name", editable: true },
  { field: "lastName", headerName: "Parents/guardians Last Name", editable: true },
  { field: "email", headerName: "Parents/guardians Email", editable: true },
  { field: "address", headerName: "Address", editable: true, type:"date" },
  { field: "employer", headerName: "Parents/guardians employer", editable: true },
  { field: "paymentmethod", headerName: "Payment method", editable: true },
  { field: "mailchimp", headerName: "Mailchimp", editable: true },
  { field: "notes", headerName: "Notes", editable: true },
];

export async function getServerSideProps() {
  const mongo = await connectToDB();
  const cursor = await mongo.collection("parentguardians").find().toArray();
  const guardians = cursor.map((doc) => ({
    ...doc,
    _id: null,
    id: doc._id.toString(),
    firstName: doc.name[0],
    lastName: doc.name[1],
    paymentmethod: doc.payment_method.payment_id,
  }));
  return {
    props: { guardians },
  };

}

type ParticipantsTableProps = {
    guardians: ParentGuardian[];
}
const ParticipantsTable: React.FC<ParticipantsTableProps> = ({ guardians }) => {
  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={guardians}
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
