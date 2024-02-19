'use client';

import { useSearchParams } from "next/navigation";
import Index from "."


export default function Page() {
  const searchParams = useSearchParams();
  const saleId = searchParams.get("saleid");
  const itemId = searchParams.get("saleItemId");
  if (!saleId) {
    return <div>Missing saleId</div>;
  }
  if (!itemId) {
    return <div>Missing itemId</div>;
  }
  return <div><Index saleId={saleId} itemId={itemId} /></div>;
}