import { flatten } from "lodash";

type ColumnDefinition = Record<string, string | Record<string, string>>;

export const registrationColumns = {
    start: "Start Date &amp; Time",
    end: "End Date &amp; Time",
    parent: {
        name: "Name",
        email: "Email",
        phone: "Parent/Guardian phone number",
        address: "Address",
        employer: "Parent/Guardian employer",
    },
    participant: {
        name: "Participant&#039;s name",
        dob: "Participant&#039;s date of birth",
        food_restrictions: "Please list food restrictions for participant",
    },
    emergency: {
        name: "Emergency contact name (if different)",
        phone: "Emergency contact phone (if different)",
    },
};

export const columnsToArray = (cols: ColumnDefinition): string[] => {
    const vals = Object.values(cols).map(
        col => typeof col === 'string' ? col : Object.values(col)
    );

    return flatten(vals);
}
