'use server';

import { ClosingMethod } from "@bastaai/basta-admin-js";
import { basta } from "../lib/basta";
import { z } from "zod";
import { DefaultSaleOptions } from "../definitions";
import { redirect } from "next/navigation";
import { Sale } from "@bastaai/basta-admin-js/types/sale";

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  openDate: z.coerce.string(),
  closingDate: z.coerce.string(),
});

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

export async function createSale(
  formData: FormData,
  options: DefaultSaleOptions = defaultSaleOptions
) {
  const rawFormData = Object.fromEntries(formData);
  console.log(rawFormData);
  const { title, description, openDate, closingDate } = FormSchema.parse({
    title: rawFormData.title,
    description: rawFormData.description,
    openDate: rawFormData.openingDate,
    closingDate: rawFormData.closingDate,
  });
  //console.log(rawFormData);
  const zuluTimeSuffix = ":00.000Z";
  //console.log(rawFormData.openingDate + '.000Z');
  const input = {
    title: title,
    description: description,
    dates: {
      openDate: openDate + zuluTimeSuffix,
      closingDate: closingDate + zuluTimeSuffix,
    },
    ...options,
  };
  //console.log('input: ', input);
  const sale: Sale = await basta.sale.create(input);

  if (!sale) {
    throw new Error('could not make sale!')
  }

  console.log(`sale made successfully! your saleId is ${ sale.id}`)
  /* Since are not updating the data displayed in any route yet,
   you do not want to clear this cache and trigger a new request to the server. 
   If you do display this data at some point you can do this with the revalidatePath function from Next.js */
   redirect('/create-item');
}
