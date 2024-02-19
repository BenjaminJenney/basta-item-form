"use server";

import { basta } from "../../lib/basta";
import { db } from "@/app/db/data";
import { PutBlobResult } from "@vercel/blob";
import { redirect } from "next/navigation";
import type { CreateItemInput } from "@bastaai/basta-admin-js/types/item";
import { sql } from "@vercel/postgres";
import { isRedirectError } from "next/dist/client/components/redirect";
import { revalidatePath } from "next/cache";

export async function createBastaItemForSale(
  blobs: PutBlobResult[],
  saleid: string,
  itemFormData: FormData
) {
  try {
    const itemData = Object.fromEntries(itemFormData);

    const createItemInput: CreateItemInput = {
      title: itemData.title as string,
      description: itemData.description as string,
    };

    const tmpSale = await basta.getSale(saleid);

    if (!tmpSale) {
      console.error("tmpSale not found");
      return;
    }

    const item = await basta.createItem(createItemInput);

    if (!item) {
      console.error("item not created");
      return;
    }

    const saleItem = await basta.addItemToSale(item, saleid, {
      startingBid: Number(itemData.startBid as string),
      reserve: Number(itemData.reserve as string),
    });

    if (!saleItem) {
      console.error("sale item not created");
      return;
    }

    console.log("\n", "saleItem: ", saleItem, "\n\n");

    const saleItemId = await db.insertItem(saleItem);
    if (!saleItemId) {
      console.error("sale item not inserted into database");
      return;
    }
    //const sale = await basta.sale.get(saleid);
    const sale = await basta.getSale(saleid);

    if (!sale) {
      console.error("sale not found");
      return;
    }

    if (!(sale.items.length > tmpSale.items.length)) {
      console.error("item not added to sale");
      return;
    }

    const imageIds = await db.insertImages(blobs, saleItemId, saleid);

    if (!imageIds?.length) {
      console.error("images not inserted into database");
      return;
    }

    const queryString = `?saleid=${saleid}&saleItemId=${saleItemId}`;

    revalidatePath(`/home${queryString}`);
    redirect(`/home${queryString}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
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
