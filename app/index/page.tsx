import Index from ".";

export default function Page({ params }: any) {
  return <Index saleId={params.saleId} itemId={params.itemId}/>;
}