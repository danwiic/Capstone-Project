import DisplayProductCard from "../components/Card/DisplayProductCard";
import DisplayProductSkeleton from "../components/Card/DisplayProductSkeleton";
// this component is for testing or editing a component

export default function Test() {
  return (
    <div className="p-10 flex gap-10">
      <DisplayProductCard
        name="Zebra 879 Black"
        imageUrl="https://i.postimg.cc/4N9KTJYy/Zebra-879-Black-2-399.png"
        stock={1}
        price={20000}
      />

      <DisplayProductSkeleton />
    </div>
  );
}
