"use server";

import { ClosingMethod } from "@bastaai/basta-admin-js";
import { basta } from "../lib/basta";
import { db } from "@/app/db/data";
import { FormSchema } from "./validator";
import { DefaultSaleOptions } from "../definitions";
import { redirect } from "next/navigation";


const defaultSaleOptions = {
  currency: "USD",
  bidIncrementTable: {
    rules: [
      { lowRange: 0, highRange: 100000, step: 10000 },
      { lowRange: 100000, highRange: 500000, step: 25000 },
    ],
  },
  closingMethod: ClosingMethod.Overlapping,
  closingTimeCountdown: 60000,
};

/** Returns a basta Sale object */
export async function createBastaAuction(
  formData: FormData,
  options: DefaultSaleOptions = defaultSaleOptions
) {
  const rawFormData = Object.fromEntries(formData);
  const { title, description, openDate, closingDate } = FormSchema.parse({
    title: rawFormData.title,
    description: rawFormData.description,
    openDate: rawFormData.openingDate,
    closingDate: rawFormData.closingDate,
  });

  /* The date input type in the form returns a string in the format "YYYY-MM-DDTHH:MM"
     but basta wants ISO format "YYYY-MM-DDTHH:MM:SS.MSMSZ" */
  const zuluTimeSuffix = ":00.000Z";

  const input = {
    title: title,
    description: description,
    dates: {
      openDate: openDate + zuluTimeSuffix, // It upsets me that 'openDate' and 'closingDate' are not named consistently
      closingDate: closingDate + zuluTimeSuffix,
    },
    ...options,
  };

  const sale = await basta.createSale(input);

  if (!sale?.id) {
    throw new Error("could not make sale!");
  }

  await db.insertSale(sale) ? console.log("sale inserted") : console.error("sale not inserted");

  redirect(`/create-item/${sale.id}`);

  /* Since you are not updating the data displayed in any route yet,
   you do not want to clear this cache and trigger a new request to the server. 
   If you do display this data at some point you can do this with the revalidatePath function from Next.js */
}

export const createCollectionMutation = /* GraphQL */ `
  mutation createCollection(
    $input: CollectionInput!
    $metafields: [MetafieldInput!]!
  ) {
    collectionCreate(input: $input, metafields: $metafields) {
      collection {
        id
      }
    }
  }
`;