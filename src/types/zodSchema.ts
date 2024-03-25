import { z } from "zod";

export const zodSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Name is required" })
            .max(40, { message: "Max length is 40" }),
        abrv: z
            .string()
            .min(1, { message: "Abrv is required" })
            .max(15, { message: "Max length is 15" })
            .refine((value) => value === value.toUpperCase(), {
                message: "Abrv must be uppercase",
            }),
    })
    .required();

export type TypeZodSchema = z.infer<typeof zodSchema>;
