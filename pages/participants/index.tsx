import { PrismaClient } from "@prisma/client";
import Table from "../../components/Table";
import { Participant } from "../../model";
import { participantColumns } from "../../utils/columns";

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
  participants: Participant[];
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
