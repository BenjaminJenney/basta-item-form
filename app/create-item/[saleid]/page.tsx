import ItemForm from "./item-form";

export default function Page({ params }: { params: {saleid: string} }) {
  const { saleid } = params;
  return <ItemForm saleid={saleid}/>;
}
