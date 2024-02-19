import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { db } from "../db/data";

export default async function Index({saleId, itemId}: {saleId: string, itemId: string}) {
  // get the saleId and itemId from the URL
  // use them to fetch the image data for the sale item
  const images: QueryResult | undefined = await db.getImages(saleId, itemId);

  if (!images) {
    return <h2>Images not found</h2>;
  }
  console.log(images.rows[0].url);

  return <h2>saleId: {saleId} itemId: {itemId}</h2>;
}