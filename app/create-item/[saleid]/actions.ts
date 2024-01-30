"use server";
import { z } from "zod";
import { basta } from "../../lib/basta";
import { PutBlobResult } from "@vercel/blob";
import { getMostRecentSaleId } from "../../db/data";
import { v4 as uuidv4 } from "uuid";
import { Image } from "@bastaai/basta-admin-js/types/image";
import type { Item, Sale, SaleItem } from "@bastaai/basta-admin-js";

//2018-06-12T19:30
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

/** Returns a SaleItem and updates DB with create-item entries
 * @param blobs
 * @param formData
 * @remarks
 */
export async function createBastaItemForSale(
  blobs: PutBlobResult[],
  saleid: string,
  itemFormData: FormData
) {
  const itemData = Object.fromEntries(itemFormData);
  try {
    const images: Image[] = [];
    for (const blob of blobs) {
      const image = {
        id: uuidv4(),
        order: 0,
        url: blob.url,
      };
      images.push(image);
    }
    console.log("images: ", images);

    console.log(saleid);
    const bastaItem: Item = await basta.item.create({
      title: itemData.title as string,
      description: itemData.description as string,
    });
    bastaItem.images = images;
    console.log("Item: ", bastaItem);
    const saleItem: SaleItem = await basta.item.createItemForSale(
      bastaItem,
      saleid,
      {
        startingBid: Number(itemData.startBid as string),
        reserve: Number(itemData.reserve as string),
      }
    );
    
    console.log('saleItem: ', saleItem);
    const sale: Sale = await basta.sale.get(saleid); 
    console.log("sale.items: ", sale.items);
  } catch (error) {
    console.error("creating item for sale", error);
  }
}
// /* Image object */
// export type Image = {
//   /** ID of the image, UUID string */
//   id: string;
//   /** DisplayOrder for image */
//   order: number;
//   /** Image URL */
//   url: string;
// };

// saleid: "GENERATED_SALE_ID",
//     title: "Legendary guitar",
//     description:
//       "David Gilmour purchased the guitar, a 1969 model with a maple cap fingerboard and large headstock, in 1970 from Manny's Music in New York City to replace a similar guitar his parents bought him for his 21st birthday, which had been lost while touring with Pink Floyd in the United States in 1968. The Black Strat was originally a sunburst colour, but had been repainted black at Manny's. Since then, it has undergone numerous modifications.",
//     startingBid: 1000,
//     reserve: 200000000,
