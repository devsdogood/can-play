import { participants, PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Table from "../../../components/Table";
import { participantColumns } from "../../../utils/grid-columns";

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

  const participants = await prisma.participants.findMany({
    where: {
        id: {
          in: slot.participants.map(p => p.participantId),
        }
    },
    include: {
      guardians: true
    }
  });

  return {
    props: { participants },
  };
}

type ParticipantsTableProps = {
  participants: participants[];
};
const ParticipantsTable: React.FC<ParticipantsTableProps> = ({
  participants,
}) => (
  <Table
    columns={participantColumns}
    rows={participants}
    model="participants"
  />
);

export default ParticipantsTable;
