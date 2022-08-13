import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import styles from "../styles/Upload.module.css";

function DragDropPage() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    var data = new FormData();
    data.append("file", acceptedFiles[0]);

    fetch('/api/form-data', {
      method: 'POST',
      body: data
    })
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <section className={styles.thing}>
      <div className={styles.welcomediv}>
        <h1 className={styles.welcome}>Welcome!</h1>
      </div>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
    </section>
  );
}

export default DragDropPage;
