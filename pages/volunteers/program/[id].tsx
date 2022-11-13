import { volunteers, PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Table from "../../../components/Table";
import { volunteerColumns } from "../../../utils/grid-columns";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id as string;

  const prisma = new PrismaClient();
  const slot = await prisma.event_slots.findFirst({
    where: {
      id: id,
    }
  });

  if (!slot) {
    return <div>Slot does not exist</div>
  }

  const volunteers = await prisma.volunteers.findMany({
    where: {
        id: {
          in: slot.volunteers.map(p => p.volunteerId),
        }
    },
    include: {
      guardians: true
    }
  });

  return {
    props: { volunteers },
  };
}

type VolunteersTableProps = {
  volunteers: volunteers[];
};
const VolunteersTable: React.FC<VolunteersTableProps> = ({
  volunteers,
}) => (
  <Table
    columns={volunteerColumns}
    rows={volunteers}
    model="volunteers"
  />
);

export default VolunteersTable;
