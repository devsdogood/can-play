import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.program as string;

  const prisma = new PrismaClient();
  const program = await prisma.programs.findUnique({
    where: {
        id,
    },
    include: {
      slots: true,
    }
  });

  if (!program) {
    return <div>Program not found</div>
  }

  const uniqueAttendees = _.uniq(_.flatten(program.slots.map(s => {
    const participantIds = s.participants.map(p => p.participantId);
    const coachIds = s.coaches.map(c => c.coachId);
    const volunteerIds = s.volunteers.map(v => v.volunteerId);

    return [...participantIds, ...coachIds, ...volunteerIds];
  })));

  const columns: GridColDef[] = program.slots.map(s => ({
    field: s.id,
    headerName: `${s.start_date} to ${s.end_date}`,
    type: "boolean",
    editable: true,
    width: 200,
  }));

  columns.unshift({
    field: 'attendee',
    headerName: 'Attendee ID',
    width: 200,
  });

  const rows = uniqueAttendees.map(a => {
    const obj = { id: a, attendee: a };

    columns.forEach(c => {
        if (c.field !== "attendee") {
            // @ts-ignore
            obj[c.field] = false;
        }
    });

    return obj;
  });

  return {
    props: { columns, rows },
  };
}

type AttendanceSheetProps = {
    columns: GridColDef[];
    rows: any[];
}
const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ columns, rows }) => (
    <Box sx={{ height: 400 }}>
        <DataGrid
            columns={columns}
            rows={rows}
        />
    </Box>
);

export default AttendanceSheet;