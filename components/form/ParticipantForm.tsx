import { Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FilePondFile } from "filepond";
import { Form, Field, Formik, ErrorMessage, FormikHelpers } from "formik";
import { TextField } from 'formik-mui';
import { useState } from "react";
import uploadSchema from "../../formik/upload.schema";
import UploadWrapper from "./UploadWrapper";

type ParticipantFormProps = {
    route: "participants" | "volunteers";
};

const NonCoachForm: React.FC<ParticipantFormProps> = ({ route }) => {
    const [files, setFiles] = useState<FilePondFile[]>([]);

    const handleSubmit = async (formValues: Record<string, any>, helpers: FormikHelpers<any>) => {
        if (files.length > 0) {
            // append file to form data
            var data = new FormData();
            data.append("file", files[0].file);

            // add formik values to form data
            Object.entries(formValues).forEach(([k, v]) => data.append(k, v));

            // POST to upload route
            try {
                await fetch(`/api/upload/${route}`, {
                    method: "POST",
                    body: data,
                });
            } catch (e) {
                helpers.setErrors({
                    file: "There was an error processing your file. Please try again or contact administrators."
                });
            }
        } else {
            helpers.setErrors({
                file: "A CSV file is required",
            });
        }

        helpers.setSubmitting(false);
    };

    return (
        <UploadWrapper setFiles={setFiles}>
            <Formik
                initialValues={{
                    year: new Date().getFullYear(),
                    location: "",
                    sport: "",
                    file: "",
                }}
                validationSchema={uploadSchema}
                onSubmit={handleSubmit}
            >
                {({ submitForm, isSubmitting, errors }) => (
                    <Form>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item m={2} xs={12}>
                                <Field
                                    component={TextField}
                                    name="year"
                                    type="text"
                                    label="Year"
                                />
                            </Grid>
                            <Grid item m={2}>
                                <Field
                                    component={TextField}
                                    name="location"
                                    type="text"
                                    label="Location"
                                />
                            </Grid>
                            <Grid item m={2}>
                                <Field
                                    component={TextField}
                                    name="sport"
                                    type="text"
                                    label="Sport"
                                />
                            </Grid>
                            <Grid item m={2}>
                                <Button
                                    onClick={submitForm}
                                    variant="contained"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                                {isSubmitting && <CircularProgress size={14} />}
                            </Grid>
                            <Grid item m={2}>
                                <ErrorMessage name="file">
                                    { msg => <div style={{ color: 'red' }}>Error: {msg}</div> }
                                </ErrorMessage>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </UploadWrapper>
    )
}

export default NonCoachForm;
