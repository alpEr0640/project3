import z from "zod";
import { productSchema } from "./schema";

export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;

export type Products = z.infer<typeof productsSchema>;