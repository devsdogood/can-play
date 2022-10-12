import { programs, PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Table from "../../../components/Table";
import { programColumns } from "../../../utils/columns";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id as string;

  const prisma = new PrismaClient();
  const programs = await prisma.programs.findMany({
    where: {
      slots: {
        some: {
          id,
        }
      }
    },
    include: {
      slots: true
    }
  });

  return {
    props: { programs },
  };
}

type ProgramsTableProps = {
  programs: programs[];
};
const ProgramsTable: React.FC<ProgramsTableProps> = ({
  programs,
}) => (
  <Table
    columns={programColumns}
    rows={programs}
    model="programs"
  />
);

export default ProgramsTable;
