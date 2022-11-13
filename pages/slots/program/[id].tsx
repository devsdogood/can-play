import { event_slots, PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Table from "../../../components/Table";
import { slotColumns } from "../../../utils/grid-columns";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id as string;

  const prisma = new PrismaClient();
  const slots = await prisma.event_slots.findMany({
    where: {
      programs: {
        some: {
          id,
        }
      }
    },
    include: {
      programs: true
    }
  });

  return {
    props: { slots },
  };
}

type SlotsTableProps = {
  slots: event_slots[];
};
const SlotsTable: React.FC<SlotsTableProps> = ({
  slots,
}) => (
  <Table
    columns={slotColumns}
    rows={slots}
    model="slots"
  />
);

export default SlotsTable;
