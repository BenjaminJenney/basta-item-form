import { z } from "zod";

const createItemFormValidator = z.object({
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "title must be a string",
  }),
  description: z.string().optional(),
  medium: z.string({
    required_error: "medium is required",
    invalid_type_error: "title must be a string",
  }),
  dimensions: z
    .string({
      /* TODO: figure out a better way to form dimensions */
      required_error: "dimensions are required",
      invalid_type_error: "dimensions must be a string",
    })
    .refine(
      (val) =>
        (val[1] === "X" || val[1] === "x") &&
        (val[3] === "X" || val[3] === "x"),
      { message: "Format should be hXwXd i.e.: 100X50X2" }
    ),
  year: z.number({
    required_error: "year is required",
    invalid_type_error: "year must be a number",
  }),
  
  /* TODO: finish validation schema */
});