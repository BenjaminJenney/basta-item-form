"use client";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import { createBastaItemForSale } from "./actions";
import { basta } from "../lib/basta";

basta.item

export default function ItemForm() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  /** Uploads image file(s) to vercel-blob store */
  const uploadImageBlob = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }


    const file = inputFileRef.current.files[0];
    const newBlob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: '/blob-api',
    });

    setBlob(newBlob);
  };

  return (
    <form encType="multipart/form-data" className="grid" action={createBastaItemForSale}>
      <label htmlFor="images">Images</label>
      <input
        id="images"
        type="file"
        accept="image/*"
        name="images[]"
        onChange={uploadImageBlob}
        ref={inputFileRef}
        multiple
      />
      <label htmlFor="title">Title</label>
      <input id="title" type="text" placeholder="title" name="title" defaultValue='test item'/>
      <label htmlFor="medium">Medium</label>
      <input id="medium" type="text" placeholder="medium" name="medium" defaultValue='acryllic'/>
      <label htmlFor="dimensions">dimensions</label>
      <input
        id="dimensions"
        type="text"
        placeholder="hXwXd"
        name="dimensions"
        defaultValue='10X10X10'
      />
      <label htmlFor="year">year</label>
      <input id="year" type="number" name="year" defaultValue='1997'/>

      <label htmlFor="description">description</label>
      <textarea id="description" name="description" defaultValue="your auction description" rows={5} cols={33} />
      {/*<label htmlFor="start-date">start date</label> 
      <input
        id="start-date"
        type="datetime-local"
        placeholder="start-date"
        name="start-date"
  />
      <label htmlFor="end-date">start date</label>
      <input
        id="end-date"
        type="datetime-local"
        placeholder="end-date"
        name="end-date"
  />*/}
      <label htmlFor="start-bid">start bid</label>
      <input
        id="start-bid"
        type="number"
        placeholder="start-bid"
        name="start-bid"
        defaultValue='20000'
      />
      <label htmlFor="reserve">reserve</label>
      <input id="reserve" type="number" placeholder="reserve" name="reserve" defaultValue='30000' />
      <button type="submit">create</button>
    </form>
  );
}
// /* 
// export type SaleItem = {
//   /**
//    * Allowed BidTypes on the item.
//    * Currently only a single BidType is allowed per item.
//    * Defaults to allowing only Max bids if not supplied.
//    */
//   allowedBidTypes?: BidType[] | null | undefined;
//   /** Get list of bids for this item */
//   bids: Bid[];
//   /** Current bid amount for the item as minor currency unit. */
//   currentBid?: number | null | undefined;
//   /** Scheduled closing timestamp for the item. */
//   dates: ItemDates;
//   /** Item description */
//   description?: string | null | undefined;
//   /** High Estimate of item in minor currency unit. */
//   highEstimate: number;
//   /** Id of an item. */
//   id: string;
//   /** Images attached to saleItem */
//   images: Image[] | null | undefined;
//   /** Item number */
//   itemNumber: number;
//   /** Current leader (user id) for the item */
//   leaderId?: string | null | undefined;
//   /** Low Estimate of item in minor currency unit. */
//   lowEstimate: number;
//   /** Reserve on the item in minor currency unit. */
//   reserve?: number | null | undefined;
//   /** Sale id, as items can be created without having to be associated to a sale. */
//   saleId: string;
//   /** Starting bid for the item in minor currency unit. */
//   startingBid?: number | null | undefined;
//   /** Status of the item */
//   status: ItemStatus;
//   /** Item title */
//   title?: string | null | undefined;
//   /** Number of bids that have been placed on the item */
//   totalBids: number;
// }; */

// /** Image object */
// export type Image = {
//   /** ID of the image, UUID string */
//   id: string;
//   /** DisplayOrder for image */
//   order: number;
//   /** Image URL */
//   url: string;
// };


/* mutation
      `mutation CREATE_ITEM($accountId: String!, $input: CreateItemInput!) {
  createItem(accountId: $accountId, input: $input) {
    id
    saleId
    images {
      id
      url
      order
    }
    description
    title
    valuationAmount
    valuationCurrency
  }
}`; */

/* item
      saleId: saleId,
        title: item.title ?? '',
        description: item.description ?? '',
        startingBid: options.startingBid,
        reserve: options.reserve */