import * as z from "zod";

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First Name is required." })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Only letters are allowed for first name.",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last Name is required." })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Only letters are allowed for last name.",
    }),
  middleName: z
    .string()
    .trim()
    .regex(new RegExp("^[a-zA-Z]*$"), {
      message: "Only letters are allowed for middle name.",
    })
    .nullable(),
  email: z.string().email({ message: "Invalid email address" }),
  address: z
    .string()
    .trim()
    .min(2, { message: "Address should be at least 2 characters" }),
  mobileNumber: z
    .string()
    .min(10, {
      message: "Mobile number should have at least 10 digits.",
    })
    .max(10, {
      message: "Mobile number can have at most 10 digits",
    })
    .regex(new RegExp("^04\\d+$"), {
      message: "Only digits are allowed for mobile number 04xxxxxxxx",
    }),
  hoursPerWeek: z.coerce
    .number({
      message: "Enter a vlaid number",
    })
    .max(40, {
      message: "Enter a number between 1 and 40.",
    })
    .min(1, {
      message: "Enter a number between 1 and 40.",
    }),
  employmentType: z.string(),
  contractType: z.string(),
  department: z.string(),
  role: z.string().min(1, { message: "Role should be at least 1 character long" })
});

export default schema;
