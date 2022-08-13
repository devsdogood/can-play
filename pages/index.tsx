import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import styles from "../styles/Upload.module.css";

function DragDropPage() {
  const [files, setFiles] = useState<File[] | null>(null);

  const handleSubmit = () => {
    if (files) {
      var data = new FormData();
      data.append("file", files[0]);

      fetch("/api/form-data", {
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
            <p>Drag and drop a CSV file for coaches</p>
          )}
        </div>
      </div>

      <div id="event">
        <div {...getRootProps({ className: styles.event })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop a CSV file for events</p>
          )}
        </div>
      </div>

      <div id="coach">
        <div {...getRootProps({ className: styles.coach })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop a CSV file for coaches</p>
          )}
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
      </div>
    </section>
  );
}

export default DragDropPage;
