"use server";

import { ClosingMethod } from "@bastaai/basta-admin-js";
import { basta } from "../lib/basta";
import { db } from "@/app/db/data";
import { FormSchema } from "./validator";
import { DefaultSaleOptions } from "../definitions";
import { redirect } from "next/navigation";
import { Sale } from "@bastaai/basta-admin-js/types/sale";
import { revalidatePath } from "next/cache";

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
  //redirect('/create-item');

  /* {
  accountId: 'b8a7f554-30f2-415a-afbd-9e3fe5a033c9',
  closingTimeCountdown: 60000,
  dates: {
    __typename: 'SaleDates',
    closingDate: '2024-01-30T08:00:00Z',
    openDate: '2024-01-29T08:02:00Z'
  },
  id: 'ce01e56e6-1c14660000070004',
  images: [],
  items: [],
  participants: [],
  sequenceNumber: 0,
  title: 'test sale',
  closingMethod: 'OVERLAPPING',
  description: 'my awesome sale',
  incrementTable: { __typename: 'BidIncrementTable', rules: [ [Object], [Object] ] },
  status: 'UNPUBLISHED'
}*/
}
