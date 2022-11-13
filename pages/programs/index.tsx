import { programs, PrismaClient } from "@prisma/client";
import Table from "../../components/Table";
import { programColumns } from "../../utils/grid-columns";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const programs = await prisma.programs.findMany({
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
