import { PrismaClient, volunteers } from "@prisma/client";
import Table from "../../components/Table";
import { volunteerColumns } from "../../utils/columns";

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
    columns={volunteerColumns}
    rows={volunteers}
    model="volunteers"
  />
);

export default VolunteersTable;
