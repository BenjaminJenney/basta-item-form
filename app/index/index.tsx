import Image from "next/image";
import { basta } from "@/app/lib/basta";
import { db } from "@/app/db/data";
import { Sale, SaleItem } from "@bastaai/basta-admin-js";

export default async function Index({saleId, itemId}: {saleId: string, itemId: string}) { 
  
  const item = await basta.getItemFromSale(saleId, itemId);

  if (!item?.id){
    return <h2>No items</h2>;
  };

  return (
    <div>
      <h1>Item</h1>
      <h2>{item.title}</h2>
    </div>
  );
}