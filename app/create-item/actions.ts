'use server';

import { z } from "zod";
import { basta } from "../lib/basta";
import { sql } from "@vercel/postgres";
import { PutBlobResult } from "@vercel/blob";

//2018-06-12T19:30
const createItemFormValidator = z.object({
  title: z.string({
    required_error: 'title is required',
    invalid_type_error: 'title must be a string'
  }),
  description: z.string().optional(),
  medium: z.string({
    required_error: 'medium is required',
    invalid_type_error: 'title must be a string'
  }),
  dimensions: z.string({ /* TODO: figure out a better way to form dimensions than just using an html text input */
    required_error: 'dimensions are required',
    invalid_type_error: 'dimensions must be a string',
  }).refine((val) => (val[1] === 'X' || val[1] === 'x') && (val[3] === 'X' || val[3] === 'x'), {message: 'Format should be hXwXd i.e.: 100X50X2'}),
  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }),

  /* TODO: finish validation schema */
});

/** Returns a SaleItem and updates DB with create-item entries
 * @param formData 
 * @remarks SaleItem = {
  allowedBidTypes?: BidType[] | null | undefined;

  // Get list of bids for this item 

  bids: Bid[];

  // Current bid amount for the item as minor currency unit. 

  currentBid?: number | null | undefined;
  
  // Scheduled closing timestamp for the item. 
  
  dates: ItemDates;
  
  // Item description 
  
  description?: string | null | undefined;
  
  // High Estimate of item in minor currency unit. 
  
  highEstimate: number;
  //Id of an item. 
  id: string;
  // Images attached to saleItem 
  images: Image[] | null | undefined;
  // Item number 
  itemNumber: number;
  //Current leader (user id) for the item 
  leaderId?: string | null | undefined;
  // Low Estimate of item in minor currency unit.
  lowEstimate: number;
  // Reserve on the item in minor currency unit.
  reserve?: number | null | undefined;
  // Sale id, as items can be created without having to be associated to a sale.
  saleId: string;
  //Starting bid for the item in minor currency unit.
  startingBid?: number | null | undefined;
  // Status of the item 
  status: ItemStatus;
  // Item title 
  title?: string | null | undefined;
  //Number of bids that have been placed on the item 
  totalBids: number;
}; 
*/
export async function createBastaItemForSale(blob: PutBlobResult, itemFormData: FormData) {
  
  const itemData = Object.fromEntries(itemFormData);
  console.log('itemData: ', itemData);
  console.log('blob: ', blob);
  

}

// saleId: "GENERATED_SALE_ID",
//     title: "Legendary guitar",
//     description:
//       "David Gilmour purchased the guitar, a 1969 model with a maple cap fingerboard and large headstock, in 1970 from Manny's Music in New York City to replace a similar guitar his parents bought him for his 21st birthday, which had been lost while touring with Pink Floyd in the United States in 1968. The Black Strat was originally a sunburst colour, but had been repainted black at Manny's. Since then, it has undergone numerous modifications.",
//     startingBid: 1000,
//     reserve: 200000000,


