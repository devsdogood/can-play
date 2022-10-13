import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import Raido from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import styles from "../styles/Upload.module.css";
import { RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import Radio from "@mui/material/Radio";

function DragDropPage() {
  const [files, setFiles] = useState<File[] | null>(null);

  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [sport, setSport] = useState("");
  const [programType, setProgramType] = useState("");
  

  const handleSubmit = (route: string) => {
    if (files) {
      var data = new FormData();
      data.append("file", files[0]);

      if (route === "volunteers" || route === "participants"){
        data.append("year", year);
        data.append("location", location);
        data.append("sport", sport);
        // data.append("programType", programType);
      }

      fetch(`/api/upload/${route}`, {
        method: "POST",
        body: data,
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <section>
      <div className={styles.welcomediv}>
        <h1 className={styles.welcome}>Welcome!</h1>
      </div>

      <div id="regestration">
        <div {...getRootProps({ className: styles.regestration })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop a CSV file for participants or gaurdians</p>
          )}
        </div>
        <div className={styles.button1}>
          <Button
            variant="contained"
            onClick={() => handleSubmit("participants")}
          >
            Submit
          </Button>
        </div>
      </div>

      <div id="volunteer">
        <div {...getRootProps({ className: styles.volunteer })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop a CSV file for volunteers</p>
          )}
        </div>
        <div>
        <div className={styles.butto3}>
          <Button
            variant="contained"
            onClick={() => handleSubmit("volunteers")}
          >
            Submit
          </Button>
        </div>
        <div className={styles.options}>
          <TextField id="year" label="Year" variant="outlined" placeholder="2022" className={styles.year} onChange={(e) => setYear(e.target.value)} />
          <TextField id="location" label="Location" variant="outlined" placeholder="200 Example" onChange={(e) => setLocation(e.target.value)} />
          <TextField id="Sport" label="Sport" variant="outlined" placeholder="Football" onChange={(e) => setSport(e.target.value)} />
        </div>
        </div>
      </div>
    </section>
  );
}

export default DragDropPage;
