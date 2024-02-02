import { z } from "zod";

export const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  openDate: z.coerce
    .string()
    .refine((val) => val.length === 16, {
      message: "datetime-local is wrong length",
    })
    .refine(
      (val) =>
        val[4] === "-" && val[7] === "-" && val[10] === "T" && val[13] === ":",
      { message: "format is not HTMLInput datetime-local format" }
    ),
  closingDate: z.coerce
    .string()
    .refine((val) => val.length === 16, {
      message: "datetime-local is wrong length",
    })
    .refine(
      (val) =>
        val[4] === "-" && val[7] === "-" && val[10] === "T" && val[13] === ":",
      { message: "format is not HTMLInput datetime-local format" }
    ),
});