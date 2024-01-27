"use client";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";

export default function Form() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

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
      handleUploadUrl: "/blob-api",
    });

    setBlob(newBlob);
  };

  return (
    <form encType="multipart/form-data" className="grid">
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
      <input id="title" type="text" placeholder="title" name="title" />
      <label htmlFor="medium">Medium</label>
      <input id="medium" type="text" placeholder="medium" name="medium" />
      <label htmlFor="dimensions">dimensions</label>
      <input
        id="dimensions"
        type="text"
        placeholder="hXwXd"
        name="dimensions"
      />
      <label htmlFor="year">year</label>
      <input id="year" type="number" name="year" />

      <label htmlFor="description">description</label>
      <textarea id="description" name="description" rows={5} cols={33}>
        Enter description here...
      </textarea>
      <label htmlFor="start-date">start date</label>
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
      />
      <label htmlFor="start-bid">start bid</label>
      <input
        id="start-bid"
        type="number"
        placeholder="start-bid"
        name="start-bid"
      />
      <label htmlFor="reserve">reserve</label>
      <input id="reserve" type="number" placeholder="reserve" name="reserve" />
      <button type="submit">create</button>
    </form>
  );
}

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
