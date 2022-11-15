import * as yup from "yup";

const uploadSchema = yup.object({
    year: yup
        .number()
        .positive("Year cannot be negative")
        .required("Year is required")
        .typeError("Year must be a number"),
    location: yup
        .string()
        .required("Location is required"),
    sport: yup
        .string()
        .required("Sport is required"),
    address: yup
        .string()
        .required("Address is required"),
});

export default uploadSchema;
