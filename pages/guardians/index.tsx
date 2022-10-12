import { parentguardians, PrismaClient } from "@prisma/client";
import * as _ from "lodash";
import Table from "../../components/Table";
import { guardianColumns } from "../../utils/columns";

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

type GuardiansTableProps = {
  guardians: parentguardians[];
}
const GuardiansTable: React.FC<GuardiansTableProps> = ({ guardians }) => (
  <Table
    columns={guardianColumns}
    rows={guardians}
    model="parentguardians" 
  />
)

export default GuardiansTable;
