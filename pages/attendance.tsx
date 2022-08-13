import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
  } from "@mui/material";
  
const AttendancePage = () => {
    return (
      <>
        <TextField
          id="standard-basic"
          label="Participant Name"
          variant="standard"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Grade</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Grade"
          >
            <MenuItem value={1}>First</MenuItem>
            <MenuItem value={2}>second</MenuItem>
            <MenuItem value={3}>third</MenuItem>
            <MenuItem value={4}>fourth</MenuItem>
            <MenuItem value={5}>fifth</MenuItem>
            <MenuItem value={6}>sixth</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Shirt size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Shirt Size"
          >
            <MenuItem value={"YS"}>youth small</MenuItem>
            <MenuItem value={"YM"}>youth medium</MenuItem>
            <MenuItem value={"YL"}>youth large</MenuItem>
            <MenuItem value={"AS"}>adult small</MenuItem>
            <MenuItem value={"AM"}>adult medium</MenuItem>
          </Select>
        </FormControl>
        <Checkbox /> 6/30
        <Checkbox/> 7/7
        <Checkbox /> 7/14
        <Checkbox /> 7/21
        <Checkbox /> 7/28
        <Checkbox/> 8/4
        <Checkbox /> 8/11
  <TextField id="standard-basic" label="Total Attended" variant="standard" />
    <TextField id="standard-basic" label="Parent/Guardian Name" variant="standard" />
    <TextField id="standard-basic" label="Phone" variant="standard" />
    <TextField id="standard-basic" label="Emergency Contact" variant="standard" />
    <TextField id="standard-basic" label="Food Restrictions" variant="standard" />
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Transportation</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Transportation"
    >
      <MenuItem value={"Walking"}>Walking</MenuItem>
      <MenuItem value={"Car"}>Car</MenuItem>
      <MenuItem value={"Public Transportation"}>Public Transportation</MenuItem>
      <MenuItem value={"Bike"}>Bike</MenuItem>
    </Select>
      <TextField id="standard-basic" label="Email" variant="standard" />
      <TextField id="standard-basic" label="Date Of Birth" variant="standard" type="date" />
      <TextField id="standard-basic" label="Home Address" variant="standard" />
  </FormControl>
  </>
  )};
  
  export default AttendancePage;
  