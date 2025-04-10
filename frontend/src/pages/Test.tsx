import CardSkeleton from "../components/ui/CardSkeleton";
import ProductCard from "../components/Card/ProductCard";
// this component is for testing or editing a component

export default function Test() {
  return (
    <div className="p-10">
      <ProductCard/>
      

      <CardSkeleton/>
    </div>
  );
}
