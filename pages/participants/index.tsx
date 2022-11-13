import { participants, PrismaClient } from "@prisma/client";
import Table from "../../components/Table";
import { participantColumns } from "../../utils/grid-columns";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const participants = await prisma.participants.findMany({
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
