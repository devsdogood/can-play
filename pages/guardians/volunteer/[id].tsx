import { parentguardians, PrismaClient } from "@prisma/client";
import * as _ from "lodash";
import { GetServerSidePropsContext } from "next";
import Table from "../../../components/Table";
import { guardianColumns } from "../../../utils/grid-columns";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id as string;

  const prisma = new PrismaClient();
  const guardians = await prisma.parentguardians.findMany({
    where: {
        volunteers: {
            some: {
                id
            }
        }
    },
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
