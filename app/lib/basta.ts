import { initBasta } from "@bastaai/basta-admin-js";
import { CreateSaleInput } from "@bastaai/basta-admin-js/types/sale";

if (!process.env.BASTA_ACCOUNT_ID || !process.env.BASTA_SECRET_KEY) { 
  throw new Error('missing Basta credentials for initBasta');
}
export const basta = initBasta({ accountId: process.env.BASTA_ACCOUNT_ID, secretKey: process.env.BASTA_SECRET_KEY });


export async function createSale(input: CreateSaleInput) {
  return await basta.sale.create(input)
}