import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styles from "../styles/Upload.module.css";

function DragDropPage() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    var data = new FormData();
    data.append("file", acceptedFiles[0]);
    console.log(data.get("file"));
    console.log(acceptedFiles[0]);

    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: data
    // })
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <section className={styles.thing}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
      </div>
    </section>
  );
}

export default DragDropPage;
