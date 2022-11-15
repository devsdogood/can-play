import React from "react";
import "filepond/dist/filepond.min.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "../components/form/TabPanel";
import NonCoachForm from "../components/form/ParticipantForm";
import Container from "@mui/material/Container";

function DragDropPage() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={1}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} aria-label="File upload tabs">
          <Tab label="Participants" />
          <Tab label="Volunteers" />
          <Tab label="Coaches" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <NonCoachForm route="participants" />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Volunteer Upload Form (WIP)
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Coach Upload Form (WIP)
      </TabPanel>
    </Container>
  );
}

export default DragDropPage;
