import { participants, PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Table from "../../../components/Table";
import { participantColumns } from "../../../utils/columns";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id as string;

  const prisma = new PrismaClient();
  const participants = await prisma.participants.findMany({
    where: {
        guardians: {
            some: {
                id
            }
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
