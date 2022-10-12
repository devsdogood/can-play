import { differenceInYears, getMonth, getYear, parse } from "date-fns";

export const getAge = (birthdate: string) => {
    const dob = parse(birthdate, "mm/dd/yy", new Date());
    const date = new Date();
  
    return differenceInYears(date, dob);
};

export const getGrade = (graduationYear: number) => {
    const date = new Date();
    const month = getMonth(date);
    const currentYear = getYear(date);
  
    // if after june, add 1 to year
    const year = month >= 6 ? currentYear + 1 : currentYear;
  
    return 12 - (graduationYear - year);
};

export const getGraduationyear = (grade: number) => {
    const date = new Date();
    const month = getMonth(date);
    const currentYear = getYear(date);
  
    // if after june, add 1 to year
    const year = month >= 6 ? currentYear + 1 : currentYear;
  
    return year + (12 - grade);
};
